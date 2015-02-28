#!/usr/bin/env python

import datetime
import asyncore
import socket
import struct
import time
from hashlib import sha1
from base64 import encodestring
import os
import re
import glob

gFuzzerDic = {}
gHashDic = {}
gLastHashDic = {}

gCurDir = os.getcwd()

class SocketConnection(asyncore.dispatcher_with_send):

    TEXT = 0x01
    BINARY = 0x02

    def __init__(self, conn, server):
        asyncore.dispatcher_with_send.__init__(self, conn)

        self.server = server
        self.server.sessions.append(self)
        self.readystate = "connecting"
        self.buffer = ""

        self.socketType = ""
        self.fuzzerId = ""
        self.crashLog = ""
        self.crashHash = ""
        self.logFile = ""
        self.testCase = ""

    def handle_read(self):
        data = self.recv(1024)
        self.buffer += data

        #print data

        if self.socketType == "":
            # |--fuzzer id (2 bytes)--|--socket type (10 byte)--|
            if data[2: 12] == "CppSocket":
                self.socketType = "CppSocket"
                self.fuzzerId = data[0: 2];
                self.buffer = "";
                gFuzzerDic[self.fuzzerId] = False
                print "[+] Fuzzer " + self.fuzzerId + " connected at " + str(datetime.datetime.now())
            else:
                self.socketType = "WebSocket"
                self.parse_connecting()

        elif self.socketType == "WebSocket":
            if self.readystate == "connecting":
                self.parse_connecting()
            elif self.readystate == "open":
                self.parse_frame()

        elif self.socketType == "CppSocket":
                self.parseCrashData()

        else:
            print "[*] Warning: handle_read else, type = " + self.socketType

    def parseCrashData(self):
        match = re.search(r'hashBegin\.(\w{8}\.\w{8})\.hashEnd', self.buffer)
        if match:
            self.crashHash = match.group(1)
            self.crashLog = self.buffer
            self.buffer = ""
            self.createCrashFile()
        else:
            pass

    def parseLogData(self, data):
        """Parse log data to create testcase"""

        global gHashDic
        global gFuzzerDic
        global gLastHashDic
        global gCurDir

        #print "[+] WebSocket receive: " + data

        if self.fuzzerId == "":
            self.fuzzerId = data
            self.handler.dispatch("shake")
            return

        logBegin = ("<!doctype html>\n"
                    "<html>\n"
                    "    <head>\n"
                    "        <meta http-equiv='Cache-Control' content='no-cache'/>\n"
                    "        <title>demi6od</title>\n"
                    "        <style>\n"
                    "        </style>\n"
                    "        <script>\n"
                    "            function testcase() {\n")

        logEnd = (  "            }\n"
                    "        </script>\n"
                    "    </head>\n"
                    "    <body onload='testcase();'>\n"
                    "    </body>\n"
                    "</html>\n")

        logHead = "logData:"
        if data == "crash?":
            if gFuzzerDic[self.fuzzerId]:
                self.handler.dispatch("yes")
                gFuzzerDic[self.fuzzerId] = False
                print "[+] Create testcase: " + gLastHashDic[self.fuzzerId]
                self.logFile = open(gCurDir + "\\crash\\" + gLastHashDic[self.fuzzerId] + ".html", 'wb+')
                self.testCase = logBegin
            else:
                self.handler.dispatch("no")
        elif data[0: len(logHead)] == logHead:
            logData = data[len(logHead): ]
            if logData == "end":
                self.testCase += logEnd
                self.testCase = pairBrace(self.testCase)
                self.logFile.write(self.testCase)
                self.logFile.close()
                print "[+] Finish receiving testcase data"
                self.handler.dispatch("finish")
            else:
                self.testCase += logData
                self.handler.dispatch("continue")

        else:
            print "[*] Warning: parseLogData else, data = " + data

    def createCrashFile(self):
        global gHashDic
        global gFuzzerDic
        global gCurDir
        global gLastHashDic

        if self.crashHash in gHashDic:
            gHashDic[self.crashHash] += 1
        else:
            gHashDic[self.crashHash] = 0

        gLastHashDic[self.fuzzerId] = self.crashHash + "." + str(gHashDic[self.crashHash])

        print "[+] Create crash file: " + gLastHashDic[self.fuzzerId] + " at " + str(datetime.datetime.now())
        crashFile = open(gCurDir + "\\crash\\" + gLastHashDic[self.fuzzerId] + ".crash", 'wb+')
        crashFile.write(self.crashLog)
        crashFile.close()

        gFuzzerDic[self.fuzzerId] = True

    def handle_close(self):
        self.server.sessions.remove(self)
        self.close()

    def parse_connecting(self):
        """
        Parse a WebSocket handshake. This is not a full HTTP request parser!
        """
        header_end = self.buffer.find("\r\n\r\n")
        if header_end == -1:
            return
        else:
            header = self.buffer[:header_end]
            # remove header and four bytes of line endings from buffer
            self.buffer = self.buffer[header_end + 4:]
            header_lines = header.split("\r\n")
            headers = {}

            # validate HTTP request and construct location
            method, path, protocol = header_lines[0].split(" ")
            if method != "GET" or protocol != "HTTP/1.1" or path[0] != "/":
                self.terminate()
                return

            # parse headers
            for line in header_lines[1:]:
                key, value = line.split(": ")
                headers[key] = value

            headers["Location"] = "ws://" + headers["Host"] + path

            self.readystate = "open"
            self.handler = self.server.handlers.get(path, None)(self)

            self.send_server_handshake_10(headers)

    def terminate(self):
        self.ready_state = "closed"
        self.close()

    def send_server_handshake_10(self, headers):
        """
        Send the WebSocket Protocol draft HyBi-10 handshake response
        """
        key = headers["Sec-WebSocket-Key"]

        # write out response headers
        self.send_bytes("HTTP/1.1 101 Switching Protocols\r\n")
        self.send_bytes("Upgrade: WebSocket\r\n")
        self.send_bytes("Connection: Upgrade\r\n")
        self.send_bytes("Sec-WebSocket-Accept: %s\r\n" % self.hash_key(key))

        if "Sec-WebSocket-Protocol" in headers:
            protocol = headers["Sec-WebSocket-Protocol"]
            self.send_bytes("Sec-WebSocket-Protocol: %s\r\n" % protocol)

    def hash_key(self, key):
        guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
        combined = key + guid
        hashed = sha1(combined).digest()
        return encodestring(hashed)

    def parse_frame(self):
        """
        Parse a WebSocket frame. If there is not a complete frame in the
        buffer, return without modifying the buffer.
        """
        buf = self.buffer
        payload_start = 2

        # try to pull first two bytes
        if len(buf) < 3:
            return
        b = ord(buf[0])
        fin = b & 0x80      # 1st bit
        # next 3 bits reserved
        opcode = b & 0x0f   # low 4 bits
        b2 = ord(buf[1])
        mask = b2 & 0x80    # high bit of the second byte
        length = b2 & 0x7f    # low 7 bits of the second byte

        # check that enough bytes remain
        if len(buf) < payload_start + 4:
            return
        elif length == 126:
            length, = struct.unpack(">H", buf[2:4])
            payload_start += 2
        elif length == 127:
            length, = struct.unpack(">I", buf[2:6])
            payload_start += 4

        if mask:
            mask_bytes = [ord(b) for b in buf[payload_start:payload_start + 4]]
            payload_start += 4

        # is there a complete frame in the buffer?
        if len(buf) < payload_start + length:
            return

        # remove leading bytes, decode if necessary, dispatch
        payload = buf[payload_start:payload_start + length]
        self.buffer = buf[payload_start + length:]

        # use xor and mask bytes to unmask data
        if mask:
            unmasked = [mask_bytes[i % 4] ^ ord(b)
                            for b, i in zip(payload, range(len(payload)))]
            payload = "".join([chr(c) for c in unmasked])

        if opcode == SocketConnection.TEXT:
            s = payload.decode("UTF8")
            self.parseLogData(s)
        if opcode == SocketConnection.BINARY:
            self.parseLogData(payload)
        return True

    def send(self, s):
        """
        Encode and send a WebSocket message
        """

        message = ""
        # always send an entire message as one frame (fin)
        b1 = 0x80

        # in Python 2, strs are bytes and unicodes are strings
        if type(s) == unicode:
            b1 |= SocketConnection.TEXT
            payload = s.encode("UTF8")
        elif type(s) == str:
            b1 |= SocketConnection.BINARY
            payload = s

        message += chr(b1)

        # never mask frames from the server to the client
        b2 = 0
        length = len(payload)
        if length < 126:
            b2 |= length
            message += chr(b2)
        elif length < (2 ** 16) - 1:
            b2 |= 126
            message += chr(b2)
            l = struct.pack(">H", length)
            message += l
        else:
            l = struct.pack(">Q", length)
            b2 |= 127
            message += chr(b2)
            message += l

        message += payload

        if self.readystate == "open":
            self.send_bytes(message)

    def send_bytes(self, bytes):
        try:
            asyncore.dispatcher_with_send.send(self, bytes)
        except:
            pass


class FuzzHandler(object):
    """Dispatch UTF8 decoded data"""

    def __init__(self, conn):
        self.conn = conn

    def dispatch(self, data):
        try:
            self.conn.send(data.decode("UTF8"))
        except:
            pass


class SocketServer(asyncore.dispatcher):

    def __init__(self, port = 80, handlers = None):
        asyncore.dispatcher.__init__(self)
        self.handlers = handlers
        self.sessions = []
        self.port = port
        self.create_socket(socket.AF_INET, socket.SOCK_STREAM)
        self.set_reuse_addr()
        self.bind(("", port))
        self.listen(5)

    def handle_accept(self):
        conn, addr = self.accept()
        session = SocketConnection(conn, self)

def pairBrace(htmlSrc):
    # Strip braces in string
    htmlSrcStrip = re.sub(r'"[^"]*"', '', htmlSrc)

    # Count brace delta
    openBraceCnt = len(re.findall(r'\{', htmlSrcStrip))
    closeBraceCnt = len(re.findall(r'\}', htmlSrcStrip))
    delta = openBraceCnt - closeBraceCnt

    # Pair delta braces
    for i in range(0, delta):
        htmlSrc = re.sub(r'</script> *\s* *</head>', '}</script>\n</head>', htmlSrc)

    return htmlSrc

def getHashDic():
    """Get exist files hashes"""

    global gHashDic
    global gCurDir
    hashes = []

    crashList = glob.glob(gCurDir + '\\crash\\*.crash')
    for fname in crashList:
        match = re.search(r'\\(\w{8}\.\w{8})\.(\d*)\.crash', fname)
        fileName = match.group(0)[1:]
        hashVal = match.group(1) 
        hashIdx = int(match.group(2)) 

        if hashVal in gHashDic:
            if gHashDic[hashVal] < hashIdx:
                gHashDic[hashVal] = hashIdx
        else:
            gHashDic[hashVal] = hashIdx


if __name__ == "__main__":
    if not os.path.exists("crash"):
        os.makedirs("crash")
    getHashDic()

    #gFuzzerDic["01"] = True
    print "Starting fuzzing server"
    SocketServer(port = 8882, handlers = {"/fuzz": FuzzHandler})
    asyncore.loop()
