#!/usr/bin/env python
import glob
import os
import sys 
import re

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
    htmlName = fname[0:-3] + "html"
    os.system('ruby testcase.rb --log="' + fname + '" --save="' + htmlName + '"')
    if os.path.exists(htmlName):
        pairBrace(htmlName)
            
def main():
    if len(sys.argv) != 2:
        print ("GenHTML.py testNumber")
        return

    number = sys.argv[1]
    os.chdir("z:\\node");
    curDir = os.getcwd()

    logList=glob.glob("Z:\\test\\test" + number + "\\*.log")
    for fname in logList:
        genPoc(fname)

    print ("mission complete!")

if __name__ == "__main__":
    main()
