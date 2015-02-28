function LOGGER(name) {
    this.name = name;
    this.server = "ws://192.168.153.145:8882/fuzz";
    this.logData = "";

    var logCnt = 0;

    this.log = function(data) {
        if (logCnt > 100) {
            localStorage.buffer += localStorage.log;
            localStorage.log = "";
            logCnt = 0;
        }

        if (data.substr(0, 2) == "//") {
            data = data + "\n";
        } else if (data.substr(0, 2) == "/-") {
            data = data.substr(2) + "\n";
        } else {
            data = "try { " + data + " } catch(e){}\n";
        }

        localStorage.log += data;
        logCnt++;
    };

    this.finished = function() {
    };

    this.fuzzing = function() {
        localStorage.clear();
        localStorage.buffer = "";
        localStorage.log = "";
        demiBegin();
    };

    this.starting = function() {
        this.logData = (localStorage.buffer + localStorage.log).toString();

        demicm.websocket = new WebSocket(this.server);

        demicm.websocket.onmessage = function(evt) {
            console.log("[+] Receive data: " + evt.data);

            if (evt.data == "yes" || evt.data == "continue") {
                console.log("send log");
                if (logger.logData.length > 0) {
                    var packetLen = 5000;
                    demicm.websocket.send("logData:" + logger.logData.substr(0, packetLen));
                    logger.logData = logger.logData.substr(packetLen);
                } else {
                    demicm.websocket.send("logData:" + "end");
                }
            } else if (evt.data == "no" || evt.data == "finish") {
                console.log("start fuzzing");
                logger.fuzzing();
            } else if (evt.data == "shake") {
                demicm.websocket.send("crash?");
            } else {
                console.log("[*] Warning: websocket onmessage else");
            }
        };

        demicm.websocket.onopen = function(evt) { 
            console.log("fuzzer name: " + logger.name);
            demicm.websocket.send(logger.name);
        };
    };
}
