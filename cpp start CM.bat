cd E:\cppFuzzer
start cmd.exe /C websocket.py
start cmd.exe /C xmlhttprequest.py
set ASAN_OPTIONS=abort_on_error=1
CFuzz.exe
