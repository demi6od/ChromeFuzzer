"""
Author: Chen Zhang (demi6od) <demi6d@gmail.com>
Date: 2013 Oct 21st
"""

#!/usr/bin/env python
import glob
import os
import sys 
import time
import datetime
import re
import shutil
import codecs

NULL_PTR_THR = 0x400

gCurDir = os.getcwd()
gNodeDir = re.sub(r'\\crashes\\\w+$', '', gCurDir)

def pairBrace(fname):
    htmlFile = open(fname, 'r+')
    htmlSrc = htmlFile.read()

    # Strip braces in string
    htmlSrcStrip = re.sub(r'"[^"]*"', '', htmlSrc)

    # Count brace delta
    openBraceCnt = len(re.findall(r'\{', htmlSrcStrip))
    closeBraceCnt = len(re.findall(r'\}', htmlSrcStrip))
    delta = openBraceCnt - closeBraceCnt

    # Pair delta braces
    for i in range(0, delta):
        htmlSrc = re.sub(r'</script> *\s* *</head>', '}</script>\n</head>', htmlSrc)

    htmlFile.seek(0)
    htmlFile.write(htmlSrc)
    htmlFile.truncate()
    htmlFile.close()
            
def genPoc(fname):
    global gCurDir
    global gNodeDir

    htmlName = fname[0:-3] + "html"
    os.chdir(gNodeDir);
    os.system('ruby testcase.rb --log="' + fname + '" --save="' + htmlName + '"')
    os.chdir(gCurDir);
    if os.path.exists(htmlName):
        pairBrace(htmlName)
            
def main():
    now = datetime.datetime.now()
    nowStr = str(now.year) + ' ' + str(now.month) + ' ' + str(now.day) + ' ' + str(now.hour) + ' ' + str(now.minute)

    # Get lastClassify time
    if not os.path.exists('lastClassify.txt'):
        lastClaFile = open('lastClassify.txt', 'w+')
        lastClaStr = '2010 3 18 18 30'
    else:
        lastClaFile = open('lastClassify.txt', 'r+')
        lastClaStr = lastClaFile.read()
    lastClaTime = time.strptime(lastClaStr, '%Y %m %d %H %M')

    # Update lastClassify time
    lastClaFile.seek(0)
    lastClaFile.write(nowStr)
    lastClaFile.truncate()
    lastClaFile.close()

    crashList = glob.glob(gCurDir + '\\*.crash')
    for fname in crashList:
        modifiedTime = time.localtime(os.stat(fname).st_mtime) 
        if modifiedTime > lastClaTime:
            match = re.search(r'\\(\w{8}\.\w{8})\..*$', fname)
            fileName = match.group(0)[1:]
            htmlFileName = fileName.replace('.crash', '.html')
            fileFullHash = match.group(1) 
            fileFirstHash = fileFullHash.split('.')[0] 

            print (fname)
            crashFile = codecs.open(fname, 'r', sys.getdefaultencoding(), 'ignore')
            crashLog = crashFile.read()

            match = re.search(r'Caught a (.*) in process', crashLog)
            if not match:
                continue
            crashType = match.group(1)

            # Detect null point dereference
            if crashType == 'Read Access Violation' or crashType == 'Write Access Violation' or crashType == 'EXCEPTION_ACCESS_VIOLATION':
                match = re.search(r'Code:\s*.+\[.*(eax|ebx|ecx|edx|esi|edi|ebp|esp|eip).*\]', crashLog)
                if match:
                    keyReg = match.group(1)
                    match = re.search(keyReg + r' = 0x(\w{8}) ', crashLog)
                    regVal = match.group(1)
                    if int(regVal, 16) < NULL_PTR_THR:
                        crashType = 'Null Pointer Deference'

            # Copy distinct first hash files
            if not os.path.exists(crashType):
                os.makedirs(crashType)
            cacheFile = open(crashType + '\\cacheList.txt', 'a+')
            cacheFile.seek(0)
            if fileFirstHash + '\n' not in cacheFile.readlines():
                cacheFile.write(fileFirstHash + '\n')
                shutil.copyfile(fileName, crashType + '\\' + fileName) 
                if os.path.exists(htmlFileName):
                    shutil.copyfile(htmlFileName, crashType + '\\' + htmlFileName) 
                #genPoc(gCurDir + '\\' +crashType + '\\' + htmlFileName)
            cacheFile.close()

            # Copy distinct full hash files
            if not os.path.exists(crashType + '\\' + fileFirstHash):
                os.makedirs(crashType + '\\' + fileFirstHash)
            cacheFile = open(crashType + '\\' + fileFirstHash + '\\cacheList.txt', 'a+')
            cacheFile.seek(0)
            if fileFullHash + '\n' not in cacheFile.readlines():
                cacheFile.write(fileFullHash + '\n')
                shutil.copyfile(fileName, crashType + '\\' + fileFirstHash + '\\' + fileName) 
                if os.path.exists(htmlFileName):
                    shutil.copyfile(htmlFileName, crashType + '\\' + fileFirstHash + '\\' + htmlFileName) 
                #genPoc(gCurDir + '\\' + crashType + '\\' + fileFirstHash + '\\' + htmlFileName)
            cacheFile.close()

if __name__ == "__main__":
    main()
