var i = 0;

onmessage = function(e) {
    postMessage(i); 
}

function timedCount() {
    i++;
    postMessage(i);
    setTimeout('timedCount()', 100);
}

timedCount();

