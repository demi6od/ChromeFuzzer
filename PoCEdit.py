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
            
def main():
    curDir = os.getcwd()
    htmlList = glob.glob(curDir + '\\*.html')

    for fname in htmlList:
        pairBrace(fname)

if __name__ == "__main__":
    main()
