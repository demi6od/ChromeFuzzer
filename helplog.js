/*
 * Author: demi6od <demi6d@gmail.com>
 * Date: 2013 Oct 21st
 * 
 * Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
 * - remove all dependencies of logger element
 */


/************************************** Random Stuff **************************************/
// Pick a random number between 0 and n-1
function rand(n) {
	return Math.floor(Math.random() * n);
}

// Pick a random item from array
function randItem(arr)
{
    if (!arr || arr.length == 0) {
        return null;
    } else {
        return arr[rand(arr.length)];
    }
}

// Pick a random number between -n and n
function srand(n) {
    var arr = [-1, 1];
    return randItem(arr) * rand(n);
}

// Pick either true or false
function randBool() {
	return (rand(2) == 0 ? true : false );
}

// Pick random Hex
function randHex(len){
	var letters = '0123456789ABCDEF'.split('');
	var hex = ''
	for (var i = 0; i < len; i++ ) {
		hex += randItem(letters);
	}
	return hex;
}

// Pick random ascii string
function randAlpha(len) {
    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var ascii = '';
    for (var i = 0;i< len;i++) {
        ascii += randItem(letters);
    }
    return ascii;
}

// Pick random ascii string
function randAscii(len) {
    var letters = '\t /`_+=-][(),.?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var ascii = '';
    for (var i = 0;i< len;i++) {
        ascii += randItem(letters);
    }
    return ascii;
}

// Pick random HTML entity 
function randHTMLEnt(len) {
    var str = '';
    for (var i = 0; i < len; i++) {
        str += '&#' + rand(256) + ';';
    }
    return str;
}

// Pick random unicode string
function randUnicode(len) {
    var str = '';
    for (var i = 0; i < len; i++) {
        str += '%u' + randHex(4);
    }
    return escape(str);
}

// Pick random string
function randStr(len) {
    var str = '';
    switch (rand(3)) {
        case 0:
            str = randHTMLEnt(len);
            break;
        case 1:
            str = randAscii(len);
            break;
        case 2:
            str = randAlpha(len);
            break;
        case 3:
            // Not use for simplify
            str = randUnicode(len);
            break;
        default:
            logger.log('// Warning: randStr default', 'grind', 1);
            break;
    }
    return str;
}

// Generate random html code with text len and tag count
function randHTMLCode(len, count) {
    var str = '';
    var rTags = [];
    for (var i = 0; i < count * 3; i++) {
        switch (rand(3)) {
            case 0:
                str += randStr(len);
                break;
            case 1:
                var rTag = randItem(demicm.tags);
                if (!inArr(rTags, rTag)) {
                    rTags.push(rTag);
                }
                str += '<' + rTag + '>';
                break;
            case 2:
                var rTagEnd = randItem(rTags);
                if (rand(3) == 0 && rTags.length > 0 && rTagEnd != 'script') {
                    str += '</' + rTagEnd + '>';
                }
                break;
            default:
                logger.log('// Warning: randHTMLCode default', 'grind', 1);
                break;
        }
    }
    return str;
}

// num / 100 probability return true
function percent(num) {
    return (rand(100) < num);
}

/************************************** Element and ID **************************************/
function getTagName(elem) {
    try {
        if (!elem) {
            return 'none';
        } else if ((elem.toStringBack && elem.toStringBack() == '[object DocumentType]') 
            || (!elem.toStringBack && elem.toString() == '[object DocumentType]')) {
            return 'DocumentType';
        // Special object
        } else if (!elem.nodeName) {
            if (elem.constructor) {
                return elem.constructor.name;
            } else {
                return 'none';
            }
        } else {
            var tag = elem.nodeName.toLowerCase().replace('#', '');

            var colonIdx = tag.indexOf(':');
            if (colonIdx != -1) {
                tag = tag.slice(colonIdx + 1); 
            }

            tag = tag.replace('-', '');

            return tag;
        }
    }
    catch (e) {
        logger.log('// Error: getTagName: ' + e.message, 'grind', 1);
    }
}

// Get random id number 
function randId(noTxt, isDOM, inDOM) {
    if (!id || id.length == 0) {
        return 'none';
    }

    var count = 0;
    // Get non-null node id 
    do {
        var rId = rand(id.length);

        count++;
        if (count > demicm.MAX_LOOP) {
            return 'none';
        }
    } while (!id[rId] 
        || inArr(demicm.idBlackList, rId) 
        || (noTxt && getTagName(id[rId]) == 'text')
        || (inDOM && document && !elemInDOM(id[rId]))
        || (isDOM && (!id[rId].parentNode || rId < demicm.reserveIdNum)))

    // Recover wrong id
    try {
        if (id[rId].id != rId) {
            logger.log('id_' + rId + '.id = ' + rId + ';', 'grind', 1);
            id[rId].id = rId;
        }
    } catch (e) {
        return 'none';
    }

    return rId;
}

// Get random id index array
function randIds(rIds, len) {
    for (var i = 0; i < len; i++) {
        var rId = randId();
        rIds.push(rId);
    }
}

function randObjId(type) {
    if (type == 'spec') {
        var ids = idS;
    } else if (type == 'ret') {
        var ids = idR;
    } else {
        logger.log('// Warning: randObjId else', 'grind', 1);
    }

    // Get non-null id 
    var count = 0;
    do {
        var rId = rand(ids.length);

        count++;
        if (count > demicm.MAX_LOOP) {
            return 'none';
        }
    } while (!ids[rId])

    return rId;
}

function randObjIds(rObjIds, len, type) {
    if (type == 'spec') {
        var ids = idS;
    } else if (type == 'ret') {
        var ids = idR;
    } else {
        logger.log('// Warning: randObjId else', 'grind', 1);
    }

    for (var i = 0; i < len; i++) {
        var rObjId = randObjId(type);
        rObjIds.push(rObjId);
    }
}

/************************************** prop func style **************************************/
// Get object props and funcs
function getPropf(obj, type, propTypes) {
    var items = [];
    for (var p in obj) {
        try {
            if ((typeof obj[p] == 'function' || typeof obj[p] == 'object') && p.substr(0, 2) == 'on') {
                if (type == 'evt' && !inArr(demicm.evtBlackList, p)) {
                    items.push(p);
                }
            } else if (typeof obj[p] == 'function') {
                if (type == 'func' && !inArr(demicm.funcBlackList, p)) {
                    items.push(p);
                }
            } else if (p.indexOf('_') == -1) {
                if (type == 'prop' && !inArr(demicm.propBlackList, p)) {
                    items.push(p);
                    if (propTypes) {
                        propTypes.push(typeof obj[p]);
                    }
                }
            }
        } catch (e) {
            logger.log('// Error: getPropf: ' + e.message, 'grind', 1);
        }
    }

    return items;
}

function updatePropfCache(obj) {
    var propf = {props: '', propTypes: '', funcs: '', evts: ''};

    var propTypes = [];
    var props = getPropf(obj, 'prop', propTypes);
    var funcs = getPropf(obj, 'func');
    var evts = getPropf(obj, 'evt');

    propf.props = props;
    propf.propTypes = propTypes;
    propf.funcs = funcs;
    propf.evts = evts;

    var tagName = getTagName(obj);
    demicm.propfCache[tagName] = cloneObj(propf);

    if (!inArr(demicm.tags, tagName)) {
        demicm.tags.push(tagName);
    }
}

// Get random prop or func name
function randPropf(tag, obj, type) {
    try {
        if (!demicm.propfCache[tag]) {
            return null;
        } else if (type == 'prop') {
            var propf = randItem(demicm.propfCache[tag].props);
        } else if (type == 'func') {
            var propf = randItem(demicm.propfCache[tag].funcs);
        } else if (type == 'evt') {
            var propf = randItem(demicm.propfCache[tag].evts);
        } else {
            logger.log('// Warning: randPropf else', 'grind', 1);
        }

        // If no propf, try update cache
        if (obj && (!propf || obj[propf] == undefined)) {
            updatePropfCache(obj);
            propf = randPropf(tag, null, type);
        }

        return propf;
    } catch (e) {
        return null;
    }
}

// Dynamically get random prop or func name
function randPropfDyn(obj, type) {
    var propfs = getPropf(obj, type);
    return randItem(propfs);
}

// Get random prop value or func params value, rIds[idIdx] as random obj
function randPropfVal(idIdx, idRIdx, type, randTable) {
    // Base random stuff
    var rBool = randBool();
    var rStr = randStr(rand(0x100)); 
    var rObj = id[idIdx];
    var rObjR = idR[idRIdx];
    switch (rand(4)) {
        case 0:
            var rsNum = srand(5);
            break;
        case 1:
            var rsNum = srand(10);
            break;
        case 2:
            var rsNum = srand(100);
            break;
        case 3:
            var rsNum = srand(0x100000000) + 0x100000000;
            break;
        default:
            logger.log('// Warning: randPropfVal default', 'grind', 1);
            break;
    }

    // Special random stuff
    var rStrId = rand(id.length).toString();
    var rStrColor = 'rgb(' + rand(256) + ',' + rand(256) + ',' + rand(256) + ')'; //rgb(255,0,0)
    var rStrPos = randItem(demicm.num) + ',' + randItem(demicm.num) + ',' + randItem(demicm.num);
    var rDOMPos = randItem(demicm.DOMPos);
    var rHTMLCode = randHTMLCode(0x10, 5);

    // Base table
    var baseTable = {'boolean': rBool, 'number': rsNum, 'string': rStr, 'object': rObj, 'objectR': rObjR}; 
    extendObj(randTable, baseTable);

    // Special table
    var specTable = {};
    if (type == 'prop') {
        var specTable = {'stringId': rStrId, 'stringHashId': '#' + rStrId, 'stringQueryId': '?id=' + rStrId,
            'stringColor': rStrColor, 'stringPos': rStrPos};
    } else if (type == 'func') {
        var specTable = {'stringId': rStrId, 'stringHashId': '#' + rStrId, 'stringQueryId': '?id=' + rStrId,
            'stringColor': rStrColor, 'stringPos': rStrPos};
    } else if (type == 'DOM') {
        var specTable = {'sWhere': rDOMPos, 'HTMLCode': rHTMLCode};
    } else {
        logger.log('// Warning: randPropfVal else', 'grind', 1);
    }
    extendObj(randTable, specTable);
}

// Get random style
function randStyle() {
    return randItem(demicm.styles);
}

// Get random style value according to style
function randStyleVal(style) {
    var styleVal = demicm.styleDic[style];
    while (isArr(styleVal)) {
        styleVal = randItem(styleVal);
    }
    return styleVal;
}

// Generate random css text 
function randCSSText() {
    var cssText = '{';
    for (var i = 0; i < demicm.styles.length; i++) {
        cssText += toCSSStyle(demicm.styles[i]) + ': ' + randStyleVal(demicm.styles[i]) + '; ';
    }
    cssText += '}';
    return cssText;
}

// Change style to CSS style (e.g., backgroundColor -> background-color)
function toCSSStyle(style) {
    var index = style.search(/[A-Z]/);
    while (index != -1) {
        style = style.substring(0, index) + '-' + style.substring(index, index + 1).toLowerCase() + style.substring(index + 1);
        index = style.search(/[A-Z]/);
    }
    return style;
}

// Revise string for logger
function logRevise(idIdx, idRIdx, type, value, objType) {
    if (typeof value == 'string') {
        if (value.substring(0, 5) == 'eval:') {
            if (type == 'param') {
                return value.substring(5);
            } else {
                return value.substring(5).replace('demicm.', '');
            }
        } else {
            return ('"' + value + '"');
        }
    } else if (typeof value == 'function') {
        if (value.name == '') {
            if (value.toStringBack) {
                return value.toStringBack();
            } else {
                return value.toString();
            }
        } else {
            return value.name;
        }
    } else if (typeof value == 'object') {
        if (type == 'prop' || type == 'func') {
            if (objType == 'ret') {
                return ('id_' + (idRIdx + demicm.RET_OFFSET));
            } else if (objType == 'node') {
                return ('id_' + idIdx);
            }
        } else if (type == 'param') {
            if (objType == 'ret') {
                return ('idR[' + idRIdx + ']');
            } else if (objType == 'node') {
                return ('id[' + idIdx + ']');
            }
        }
    } else {
        return value;
    }
}

/************************************** DOM Node Control **************************************/
// Remove node's reference from id[]
function removeThis(elem, type, caches) {
    if (type == 'direct') {
        removeChildren(elem, type);

        logger.log('id_' + elem.id + '.id = "free";', 'grind', 1);
        logger.log('id_' + elem.id + ' = null;', 'grind', 1);
        id[elem.id] = null;
        elem.id = 'free';
    } else if (type == 'delay'){
        removeChildren(elem, type, caches);

        caches.push(elem.id);
    } else {
        logger.log('// Warning: removeThis else', 'grind', 1);
    }
}

function removeChildren(elem, type, caches) {
    try {
        if (!elem || elem.id == '0' || elem.nodeType == 3) {
            return;
        }

        for (var i = 0; i < elem.childNodes.length; i++) {
            if (elem.childNodes[i].id && elem.childNodes[i].id != 'free' && elem.childNodes[i].id != 'delete') {
                if (type == 'direct') {
                    removeThis(elem.childNodes[i], type);
                } else if (type == 'delay'){
                    removeThis(elem.childNodes[i], type, caches);
                }
            }
        }
    }
    catch (e) {
        // Swallow the exception and continue...
    }
}

function removeCache(caches) {
    for (var i = 0; i < caches.length; i++) {
        logger.log('id_' + caches[i] + '.id = "free";', 'grind', 1);
        logger.log('id_' + caches[i] + ' = null;', 'grind', 1);
        id[caches[i]] = null;
        caches[i] = 'free';
    }
}

// Clear element id prop
function clearThisId(elem) {
    clearChildrenId(elem);
    logger.log('id_' + elem.id + '.id = "delete";', 'grind', 1);
    elem.id = 'delete';
}

function clearChildrenId(elem) {
    try {
        for (var i = 0; i < elem.childNodes.length; i++) {
            clearThisId(elem.childNodes[i]);
        }
    }
    catch (e) {
        // Swallow the exception and continue...
    }
}

/************************************** Array **************************************/
// Remove item according to value
function removeArrVal(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            arr.splice(i,1);
            break;
        }
    }
}

// Check whether an item is in array
function inArr(arr, searchItem) {
    for (var i = 0; i < arr.length; i++) {
        if ( searchItem == arr[i] ) {
            return true;
        }
    }
    return false;
}

// Check whether an object is array
function isArr(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

// Convolute array with itself
function repeatArr(orignArr, splitStr, count) {
    var newArr = [];
    for (var i = 0; i < orignArr.length; i++) {
        var newItem = orignArr[i];
        for (var j = 1; j < count; j++) {
            newItem += splitStr + randItem(orignArr);
        }
        newArr.push(newItem);
    }
    return newArr.concat();
}

// Convolute firstArr with secondArr
function convoluteArr(firstArr, secondArr, splitStr, primary) {
    var resultArr = [];
    if (primary == 1) {
        for (var i = 0; i < firstArr.length; i++) {
            resultArr.push(firstArr[i] + splitStr + randItem(secondArr));
        }
    } else if (primary == 2) {
        for (var i = 0; i < secondArr.length; i++) {
            resultArr.push(randItem(firstArr) + splitStr + secondArr[i]);
        }
    } else {
        logger.log('// Warning: convoluteArr else', 'grind', 1);
    }
    return resultArr.concat();
}

/************************************** Object **************************************/
// Clone object
function cloneObj(obj) {
    var objStr = JSON.stringify(obj);
    var newObj = JSON.parse(objStr);
    return newObj;
}

// Concat object
function extendObj(originObj, newObj, override) {
    for (var p in newObj) {
        if (newObj.hasOwnProperty(p) && (!originObj.hasOwnProperty(p) || override)) {
            originObj[p] = newObj[p];
        }
    }
}

// Determine whether is positive integer
function isPosInt(str) {
    if (str != null && str != undefined && typeof str != 'object') {
        var re = /\d+/i; 
        str = str.toString();
        var reStr = str.match(re);
        return (reStr == str);
    } else {
        return false;
    }
}

function elemInDOM(elem) {
    if (document.contains) {
        try {
            return document.contains(elem);
        } catch (e) {
            return false;
        }
    } else {
        while (elem = elem.parentNode) {
            if (elem == document) {
                return true;
            }
        }
        return false;
    }
}

/************************************** Write local file **************************************/
function writeFileCM(fileName, fileContent, isFlush) {
    if (!demicm.contentBuf) {
        demicm.contentBuf = '';
        demicm.writeCnt = 0;
    }
    demicm.contentBuf += fileContent + '\n';
    demicm.writeCnt++;

    if (isFlush || demicm.writeCnt % 30000 == 0) {
        var today=new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var time = h + 'h' + m + 'm' + s + 's';

        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
            fs.root.getFile(fileName + '_' + time +'.bin', {create: true}, function(fileEntry) { // test.bin is filename
                fileEntry.createWriter(function(fileWriter) {
                    var blob = new Blob([demicm.contentBuf], { type: "text/plain" });
                    fileWriter.addEventListener("writeend", function() {
                        // navigate to file, will download
                        location.href = fileEntry.toURL();
                    }, false);
                    fileWriter.write(blob);
                }, function() {});
            }, function() {});
        }, function() {});
    }
}

function writeFileIE(filePath, fileContent, isClear) {
    try {
        var fso = new ActiveXObject("Scripting.FileSystemObject");

        if (isClear) {
            var file = fso.OpenTextFile(filePath, 2, true);
        } else {
            var file = fso.OpenTextFile(filePath, 8, true);
        }

        file.WriteLine(fileContent);

        file.Close();
    } catch (e) {
        if (e.number == -2146827859) {
            alert('Unable to access local files due to browser security settings. ' + 
                    'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' + 
                    'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"'); 
        }
    }
}
