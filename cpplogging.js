function LOGGER(name) {
    this.name = name;
    this.server = "ws://192.168.153.145:8882/fuzz";
    this.logData = "";

    var logCnt = 0;
    var logIdx = 0;

    this.log = function(data) {
        if (logCnt > 100) {
            logIdx++;
            logCnt = 0;
        }

        if (data.substr(0, 2) == "//") {
            data = data + "\n";
        } else if (data.substr(0, 2) == "/-") {
            data = data.substr(2) + "\n";
        } else {
            data = "try { " + data + " } catch(e){}\n";
        }

        if (!localStorage[logIdx]) {
            localStorage[logIdx] = "";
        }

        localStorage[logIdx] += data;
        logCnt++;
    };

    this.finished = function() {
    };

    this.fuzzing = function() {
        localStorage.clear();
        demiBegin();
    };

    this.starting = function() {
        for (var i = 0; ; i++) {
            if (localStorage[i]) {
                this.logData += localStorage[i].toString();
            } else {
                break;
            }
        }

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
