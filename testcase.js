// Test wrong id
function testId() {
    for (var i=0; i<id.length; i++) {
        if (id[i]) {
            if (id[i].id != i) {
                console.log('warning: id_' + i + '.id = ' + id[i].id);
            }
        }
    }
}

// Test random stuff
function testRand() {
    var arr = [0, 1, 2, 3, 4];
    console.log('rand:' + rand(10));
    console.log('srand:' + srand(10));
    console.log('randBool:' + randBool());
    console.log('randItem:' + rand(arr.length));
    console.log('randHex:' + randHex(10));
    console.log('randAscii:' + randAscii(10));
    document.body.innerHTML = randHTMLStr(10);
    console.log('randUnicode:' + randUnicode(10));
    console.log('randStr:' + randStr(10));
    for (var i=0; i<100; i++) {
        console.log('percent:' + percent(99));
    }
}

function testArr() {
    var arr = [0, 1, 2, 3, 4];
    console.log(inArr(arr, 2));

    removeArrValue(arr, 2);
    console.log(inArr(arr, 2));
    console.log(arr);
}

function printArr(arr) {
    for (var i=0; i<arr.length; i++) {
        console.log(arr[i]);
    }
}

function testPropf() {
    var propTypes = [];
    console.log(getPropf(document, 'prop', propTypes));
    console.log(propTypes);
    console.log(getPropf(document, 'func'));
    console.log(getPropf(document, 'evt'));

    console.log('randPropfDyn: document');
    console.log(randPropfDyn(document, 'prop'));
    console.log(randPropfDyn(document, 'func'));
    console.log('');

    console.log('randPropf: body');
    console.log(randPropf('body', 'prop'));
    console.log(randPropf('body', 'func'));
}

function testCase() {
    getPropAndFunc();
    testPropf();
}
