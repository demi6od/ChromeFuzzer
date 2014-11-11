var i = 0;

onconnect = function(e) {
    port = e.ports[0];  
    port.onmessage = function(e) {
        port.postMessage(i); 
    }
    timedCount();
}

function timedCount() {
    i++;
    port.postMessage(i);
    setTimeout('timedCount()', 100);
}

