#!/usr/bin/env python

import asyncore
import socket
import struct
import time
from hashlib import sha1
from base64 import encodestring


class WebSocketConnection(asyncore.dispatcher_with_send):

    TEXT = 0x01
    BINARY = 0x02

    def __init__(self, conn, server):
        asyncore.dispatcher_with_send.__init__(self, conn)

        self.server = server
        self.server.sessions.append(self)
        self.readystate = "connecting"
        self.buffer = ""

    def handle_read(self):
        data = self.recv(1024)
        self.buffer += data
        if self.readystate == "connecting":
            self.parse_connecting()
        elif self.readystate == "open":
            self.parse_frame()

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

        if opcode == WebSocketConnection.TEXT:
            s = payload.decode("UTF8")
            self.handler.dispatch(s)
        if opcode == WebSocketConnection.BINARY:
            self.handler.dispatch(payload)
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
            b1 |= WebSocketConnection.TEXT
            payload = s.encode("UTF8")
        elif type(s) == str:
            b1 |= WebSocketConnection.BINARY
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


class EchoHandler(object):
    """
    The EchoHandler repeats each incoming string to the same WebSocket.
    """

    def __init__(self, conn):
        self.conn = conn

    def dispatch(self, data):
        try:
            self.conn.send(data)
        except:
            pass


class WebSocketServer(asyncore.dispatcher):

    def __init__(self, port=80, handlers=None):
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
        session = WebSocketConnection(conn, self)

if __name__ == "__main__":
    print "Starting WebSocket Server"
    WebSocketServer(port=8082, handlers={"/echo": EchoHandler})
    asyncore.loop()
