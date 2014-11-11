/*
  Author: demi6od <demi6d@gmail.com>
  Date: 2013 Oct 21st
  
  Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
  - remove all dependencies of logger element
*/

var demicm = {};
var id = [];
demicm.idBlackList = [0, 4];
cacheVal = null;

// DOM Tree initial
demicm.HEAD_CHILD_NUM = 8;
demicm.BODY_CHILD_NUM = 20;
demicm.FRAG_ELEM_NUM = 5; // Dangling element
demicm.BRANCH_NUM = 3;

demicm.TEXT_NUM = 5;
demicm.FREE_TEXT_NUM = 15; // No reference textNode
demicm.EVENT_ELEM_NUM = 36; // Elems num to set event, less than elemNum
demicm.EVENT_NUM = 30; // Event num for per elem

demicm.CSS_DIVERSE_NUM = 3;

// Heap spray params
demicm.ARRAY_LEN_MAX = 100;
demicm.ARRAY_CNT = 50; // Spray count

// Operate number
demicm.FRONT_OP_CNT = 60; // 60
demicm.BACK_OP_CNT = 40; // 40

demicm.EVENT_OP_CNT = 30; // 30

// Operate rate: n%(n=0~100) probability to run
demicm.PROP_PER = 60; // 60
demicm.FUNC_PER = 40; // 40
demicm.STYLE_PER = 50; // 50
demicm.USE_CACHE_PER = 100; // 100

demicm.LAYOUT_PER = 10;
demicm.CLEAR_PER = 5; // 5
demicm.CLEAR_ALL_PER = 5; // 5
demicm.DOM_PER = 60;
demicm.GC_PER = 20;

demicm.EVENT_OP_PER = 50; // 50
demicm.EVENT_CLEAR_PER = 80; // 80
demicm.EVENT_CLEAR_ALL_PER = 30; // 30 

// Property and function rate
demicm.PROP_DIRTY_PER = 20; // 20
demicm.PROP_NORMAL_PER = 80; // 80
demicm.PROP_RANDOM_PER = 60; // 60

demicm.FUNC_DIRTY_PER = 50;
demicm.FUNC_NORMAL_PER = 80;
demicm.FUNC_RANDOM_PER = 60;

// Max recursion level
demicm.MAX_RECURSION_DEPTH = 4; // 4
demicm.MAX_RET_RECURSION_DEPTH = 3; // 3
demicm.MAX_RECURSION_WIDE = 10; // 10 
demicm.MAX_LOOP = 100 //100

demicm.SPECIAL_FUNC_PARAM_NUM = 4; // 4

/************************************* prelude *************************************/
function prelude() {
    setEnv();

    constructDOMTree();

    addTextNode();
    
    setEvtHandler();

    addCSS();
}

function setEnv() {
    // Set body and document property
    logger.log("document.designMode = 'on'", 'grind', 1);
    document.designMode = 'on';

    logger.log("document.body.contentEditable = 'true'", 'grind', 1);
    document.body.contentEditable = 'true';

    logger.log("document.body.dir = 'rtl'", 'grind', 1);
    document.body.dir = 'rtl';

    logger.log("document.body.draggable = 'true'", 'grind', 1);
    document.body.draggable = 'true';

    logger.log("document.body.spellcheck = 'true'", 'grind', 1);
    document.body.spellcheck = 'true';

    logger.log("document.body.translate = 'true'", 'grind', 1);
    document.body.translate = 'true';
}

function eventHandler() {
    if(percent(demicm.EVENT_OP_PER)) {
        operate(demicm.EVENT_OP_CNT);
    }

    if(percent(demicm.EVENT_CLEAR_PER)) {
        clear();
    }

    if(percent(demicm.EVENT_CLEAR_ALL_PER)) {
        clearAll();
    }

    logger.log( "/-};", "grind", 1 );
}

function setEvtHandler() {
    var noEvtElemIds = [];
    for(var i=0; i<demicm.elemNum; i++) {
        noEvtElemIds[i] = i;
    }

    // Set event handler for no event element
    for(var i=0; i<demicm.EVENT_ELEM_NUM; i++) {
        var setEvtId = randItem(noEvtElemIds);
        removeArrValue(noEvtElemIds, setEvtId);
        // Set all event handlers for setEvtId element
        try {
            for(var j=0; j<demicm.EVENT_NUM; j++) {
                if(getTagName(id[setEvtId]) == 'body') {
                    var rEvt = randItem(demicm.bodyEvtArr); 
                } else if(getTagName(id[setEvtId]) == 'track') {
                    var rEvt = randItem(demicm.trackEvtArr); 
                } else if(getTagName(id[setEvtId]) == 'video' 
                        || getTagName(id[setEvtId]) == 'audio'
                        || getTagName(id[setEvtId]) == 'embed'
                        || getTagName(id[setEvtId]) == 'img'
                        || getTagName(id[setEvtId]) == 'object') {
                    var rEvt = randItem(demicm.trackEvtArr); 
                } else {
                    var rEvt = randItem(demicm.HTMLEvtArr); 
                }
                id[setEvtId][rEvt] = new Function('logger.log("//id_' + setEvtId + '[\'' + rEvt + '\'] = function()", "grind", 1 );logger.log("/-{", "grind", 1 );eventHandler();');
            }
        }
        catch(err) {
            // Swallow the exception and continue...
        }
    }

    // For grinder log bug while refreshing page
    document.onscroll = null;
}

function addTextNode() {
    for(var i=0; i<demicm.TEXT_NUM; i++) {
        try {
            var rStr = randStr(rand(0x100)); 
            var newId = demicm.elemNum + i;

            logger.log('id_' + newId + ' = document.createTextNode("' + rStr + '");', 'grind', 1);
            id[newId] = document.createTextNode(rStr);
            logger.log('id_' + newId + '.id = ' + newId + ';', 'grind', 1);
            id[newId].id = newId;

            var rId = 0;
            // id[0] = documentElem, id[4] = cssNode can't add textNode
            while(rId == 0 || rId == 4) {
                rId = rand(demicm.elemNum);
            }
            logger.log('id_' + rId + '.appendChild(id_' + newId + ');', 'grind', 1);
            id[rId].appendChild(id[newId]);
        }
        catch(err) {
            // Swallow the exception and continue...
        }
    }

    // Add no reference textNode 
    for(var i=0; i<demicm.FREE_TEXT_NUM; i++) {
        try {
            var rStr = randStr(rand(0x100)); 
            var rId = 0;
            // id[0] = documentElem, id[4] = cssNode can't add textNode
            while(rId == 0 || rId == 4) {
                rId = rand(demicm.elemNum);
            }

            logger.log('id_' + rId + '.appendChild(document.createTextNode("' + rStr + '"));', 'grind', 1);
            id[rId].appendChild(document.createTextNode(rStr));
        }
        catch(err) {
            // Swallow the exception and continue...
        }
    }
}

function constructTree(rootType, startId, len, branchNum) {
    for(var i=1; i<=len; i++) {
        if(i<=branchNum) {
            if(rootType == 'body') {
                logger.log('document.body.appendChild(id_' + (i+startId-1) + ');', 'grind', 1);
                document.body.appendChild(id[i+startId-1]);
            }
            else if(rootType == 'head') {
                logger.log('document.head.appendChild(id_' + (i+startId-1) + ');', 'grind', 1);
                document.head.appendChild(id[i+startId-1]);
            }
        }
        else {
            var row = Math.ceil(Math.log(((branchNum-1)/branchNum)*i+1)/Math.log(branchNum));
            var col = Math.ceil((i-branchNum*(Math.pow(branchNum, row-1)-1)/(branchNum-1))/branchNum);
            var parentId = Math.ceil(branchNum*(Math.pow(branchNum, row-2)-1)/(branchNum-1))+col;

            logger.log('id_' + (parentId+startId-1) + '.appendChild(id_' + (i+startId-1) + ');', 'grind', 1);
            id[parentId+startId-1].appendChild(id[i+startId-1]);
        }
    }
}

function constructDOMTree() {
    // Add document, body, head to id[]
    demicm.idTags = ['body', 'head'];

    logger.log('id_0 = document;', 'grind', 1);
    id[0] = document; 
    logger.log('document.id = 0;')
    document.id = 0;

    logger.log('id_1 = document.documentElement;', 'grind', 1);
    id[1] = document.documentElement; 
    logger.log('document.documentElement.id = 1;')
    document.documentElement.id = 1;
    
    logger.log('id_2 = document.head;', 'grind', 1);
    id[2] = document.head; 
    logger.log('document.head.id = 2;', 'grind', 1);
    document.head.id = 2;

    logger.log('id_3 = document.body;', 'grind', 1);
    id[3] = document.body; 
    logger.log('document.body.id = 3;', 'grind', 1);
    document.body.id = 3;

    logger.log('id_4 = document.createElement("style");', 'grind', 1);
    id[4] = document.createElement('style'); 
    logger.log('id_4.id = 4;', 'grind', 1);
    id[4].id = 4;

    demicm.reserveIdNum = id.length;
    var reserveTagNum = demicm.idTags.length;

    demicm.elemNum = demicm.reserveIdNum + demicm.HEAD_CHILD_NUM + demicm.BODY_CHILD_NUM + demicm.FRAG_ELEM_NUM;

    var delta = demicm.reserveIdNum - reserveTagNum;
    // Create elems to id[] with random tag
    for(var i=demicm.reserveIdNum; i<demicm.elemNum; i++) {
        demicm.idTags.push(randItem(demicm.strictTags));

        logger.log('id_' + i + ' = document.createElement("' + demicm.idTags[i-delta] + '");', 'grind', 1);
        id[i] = document.createElement(demicm.idTags[i-delta]);
        logger.log('id_' + i + '.id = ' + i + ';', 'grind', 1);
        id[i].id = i;
    }

    // Construct body and head tree 
    constructTree('body', demicm.reserveIdNum, demicm.BODY_CHILD_NUM, demicm.BRANCH_NUM);
    constructTree('head', demicm.BODY_CHILD_NUM+demicm.reserveIdNum, demicm.HEAD_CHILD_NUM, demicm.BRANCH_NUM);

    // For IE cache
    for(var i=reserveTagNum; i<demicm.idTags.length; i++) {
        try {
            logger.log('document.body.appendChild(document.createElement("' + demicm.idTags[i] + '"));', 'grind', 1);
            document.body.appendChild(document.createElement(demicm.idTags[i])); 
        }
        catch(err) {
            // Swallow the exception and continue...
        }
    }
}

function addCSS() {
    // Set CSS according to tagName
    var cssList = '';
    var tagList = randItem(demicm.idTags);
    for(var i=0; i<demicm.CSS_DIVERSE_NUM; i++) {
        for(var j=0; j<demicm.idTags.length*1.5/demicm.CSS_DIVERSE_NUM; j++) {
            tagList += ', ' + randItem(demicm.idTags);
        }
        cssList += tagList + ' ' + randCSSText() + ' ';
    }

    // Add pseudo class
    cssList += '*:active:first-child:first-letter:first-line:focus:hover:lang(en):link:visited ' + randCSSText();

    logger.log('id_4.innerText = "' + cssList + '";', 'grind', 1);
    id[4].innerText = cssList;

    logger.log('document.documentElement.appendChild(id_4);', 'grind', 1);
    document.documentElement.appendChild(id[4]);
}

/************************************* operate *************************************/
/*
 * Manipulate property and function
 * propStack: props chain
 * retValDepth: ret obj fuzz depth
 * type: 'prop' or 'func'
 */
function propfMan(propStack, retValDepth, type, objName) {
    try {
        // Control recursion operate depth
        if(propStack.length > demicm.MAX_RECURSION_DEPTH) {
            return;
        }

        // Get current fuzz object
        if(objName) {
            var fuzzObjStr = objName;
            var logObjStr = objName;
            for(var i=1; i<propStack.length; i++) {
                fuzzObjStr += '["' + propStack[i] + '"]'; 
                logObjStr += '["' + propStack[i] + '"]'; 
            }
        } else {
            var fuzzObjStr = 'id[' + propStack[0] + ']';
            var logObjStr = 'id_' + propStack[0];
            for(var i=1; i<propStack.length; i++) {
                fuzzObjStr += '["' + propStack[i] + '"]'; 
                logObjStr += '["' + propStack[i] + '"]'; 
            }
        }

        var fuzzObj = eval(fuzzObjStr);
        if(!fuzzObj || inArr(demicm.idBlackList, fuzzObj.id)) {
            return;
        }

        // Recursively operate subobject
        var recursionWide = 0;
        for(var p in fuzzObj) {
            if(typeof fuzzObj[p] == 'object' && !inArr(demicm.propBlackList, p)) {
                if(percent(demicm.PROP_PER)) {
                    propStack.push(p);
                    propfMan(propStack, retValDepth, 'prop');
                }
                if(percent(demicm.FUNC_PER)) {
                    propStack.push(p);
                    propfMan(propStack, retValDepth, 'func');
                }

                if(recursionWide++ > demicm.MAX_RECURSION_WIDE) {
                    break;
                }
            }

            // In case the recursion procedure delete fuzzObj
            var fuzzObj = eval(fuzzObjStr);
            if(!fuzzObj) {
                return;
            }
        }

        var tagName = getTagName(fuzzObj);
        if(tagName == 'none') {
            var propf = randPropfDyn(fuzzObj, type);
        }
        else {
            var propf = randPropf(tagName, type);
        }
        // Assert property number is not 0 or unexpected tagName
        if(!propf || propf == 'none') {
            return;
        }

        // params: rIds[1-n], suppose 10 params is enough
        var rIds = [];
        randIds(rIds, 10);
        if(randIds[0] == 'none') {
            return;
        }

        var bNormalPropf = eval('propf in demicm.' + type + 'Values;');

        eval(type + 'Man(fuzzObj, fuzzObjStr, logObjStr, propf, bNormalPropf, rIds, retValDepth, objName);');
    }
    catch(err) {
        // Swallow the exception and continue...
    }
    finally {
        propStack.pop();
    }
}

function propMan(fuzzObj, fuzzObjStr, logObjStr, prop, bNormalProp, rIds, retValDepth, objName) {
    try {
        // Get value
        if(objName != 'cacheVal') {
            logger.log("cacheVal = " + logObjStr + '["' + prop + '"];', 'grind', 1);
            eval("cacheVal = " + fuzzObjStr + '["' + prop + '"];');
        } else {
            logger.log(logObjStr + '["' + prop + '"];', 'grind', 1);
            eval(fuzzObjStr + '["' + prop + '"];');
        }

        // Set dirty value
        if(bNormalProp && percent(demicm.PROP_DIRTY_PER) && demicm.propValues[prop].dirtyValue.length != 0) {
            var rDirtyValue = randItem(demicm.propValues[prop].dirtyValue);
            logger.log(logObjStr + '["' + prop + '"] = ' + logRevise(rIds[1], 'prop', rDirtyValue) + ';', 'grind', 1);
            eval(fuzzObjStr + '["' + prop + '"] = rDirtyValue;');
        }
        // Set normal value
        else if(bNormalProp && percent(demicm.PROP_NORMAL_PER) && demicm.propValues[prop].normalValue.length != 0) {
            if(inArr(demicm.specialProp, prop)) {
                var rNormalValue = randItem(demicm.propValues[prop].normalValue);
            }
            else {
                rNormalValue = randItem(demicm.propValues[prop].normalValue);
            }
            logger.log(logObjStr + '["' + prop + '"] = ' + logRevise(rIds[1], 'prop', rNormalValue) + ';', 'grind', 1);
            eval(fuzzObjStr + '["' + prop + '"] = rNormalValue;');
        }
        // Set random value
        else if(percent(demicm.PROP_RANDOM_PER)) {
            var randValueTable = {};
            randPropfValue(rIds[1], 'prop', randValueTable);
            var rValue = bNormalProp ? randValueTable[demicm.propValues[prop].type] : randValueTable[typeof fuzzObj[prop]];

            if(rValue != undefined) {
                logger.log(logObjStr + '["' + prop + '"] = ' + logRevise(rIds[1], 'prop', rValue) + ';', 'grind', 1);
                eval(fuzzObjStr + '["' + prop + '"] = rValue;');
            }
            else {
                logger.log(logObjStr + '["' + prop + '"] = null;', 'grind', 1);
                eval(fuzzObjStr + '["' + prop + '"] = null;');
            }
        }
        // Set some value from one object to the value of another
        else if(rand(2) != 0) {
            logger.log(logObjStr + '["' + prop + '"] = id_' + rIds[1] + '["' + prop + '"];', 'grind', 1);
            eval(fuzzObjStr + '["' + prop + '"] = id[rIds[1]][prop];');
        }
        // Set some property to NULL...
        else {
            logger.log(logObjStr + '["' + prop + '"] = null;', 'grind', 1);
            eval(fuzzObjStr + '["' + prop + '"] = null;');
        }
    }
    catch(err) {
        // Swallow the exception and continue...
    }
}

function funcMan(fuzzObj, fuzzObjStr, logObjStr, func, bNormalFunc, rIds, retValDepth, objName) {
    try {
        // Generate parameters
        var paramStr = '';
        if(bNormalFunc) {
            var params = demicm.funcValues[func];
            for(var i=1; i<params.length; i++) {
                // Set dirty value
                if(percent(demicm.FUNC_DIRTY_PER) && params[i].dirtyValue.length != 0) {
                    paramStr += logRevise(rIds[i], 'func', randItem(params[i].dirtyValue)) + ',';
                }
                // Set normal value
                else if(percent(demicm.FUNC_NORMAL_PER) && params[i].normalValue.length != 0) {
                    paramStr += logRevise(rIds[i], 'func', randItem(params[i].normalValue)) + ',';
                }
                // Set random value
                else if(percent(demicm.FUNC_RANDOM_PER) || true) {
                    var randValueTable = {};
                    randPropfValue(rIds[i], 'func', randValueTable);
                    var rValue = randValueTable[params[i].type];

                    if(rValue != undefined) {
                        paramStr += logRevise(rIds[i], 'func', rValue) + ',';
                    }
                    else {
                        paramStr += logRevise(rIds[i], 'func', randValueTable['object']) + ',';
                    }
                }
                else {
                }
            }
        }
        else {
            for(var i=0; i<demicm.SPECIAL_FUNC_PARAM_NUM; i++) {
                // Set dirtyParamVals
                if(rand(2) == 0) {
                    paramStr += logRevise(rIds[i], 'func', randItem(demicm.dirtyParamVals)) + ',';
                }
                // Set random obj
                else {
                    paramStr += logRevise(rIds[i], 'func', id[rIds[i]]) + ',';
                }
            }
        }

        // trim paramStr
        if(paramStr != '') {
            paramStr = paramStr.substr(0, paramStr.length-1);
        }

        logger.log('var retValue = ' +  fuzzObjStr.replace(new RegExp('id\\[', 'm'), 'id_').replace(new RegExp('\\]', 'm'), '') + '["' + func + '"](' + paramStr.replace(new RegExp('id\\[', 'gm'), 'id_').replace(new RegExp('\\]', 'gm'), '') + ');', 'grind', 1);
        var retValue = eval(fuzzObjStr + '["' + func + '"](' + paramStr + ');');

        if(retValue && typeof retValue == 'object') {
            // Return value is new object
            if(!isPosInt(retValue.id)) {
                logger.log('id_' + id.length + ' = retValue;', 'grind', 1);
                id[id.length] = retValue;
                id[id.length-1].id = id.length-1;

                logger.log('retValue = null;', 'grind', 1);
                retValue = null;

                if(retValDepth < demicm.MAX_RET_RECURSION_DEPTH) {
                    if(percent(demicm.PROP_PER)) {
                        propfMan([id.length-1], retValDepth+1, 'prop');
                    }
                    if(percent(demicm.FUNC_PER)) {
                        propfMan([id.length-1], retValDepth+1, 'func');
                    }
                }
            }
            // Return value is old object
            else {
                var retId = retValue.id;

                logger.log('retValue = null;', 'grind', 1);
                retValue = null;

                if(retValDepth < demicm.MAX_RET_RECURSION_DEPTH) {
                    if(percent(demicm.PROP_PER)) {
                        propfMan([retId], retValDepth+2, 'prop');
                    }
                    if(percent(demicm.FUNC_PER)) {
                        propfMan([retId], retValDepth+2, 'func');
                    }
                }
            }
        }
        else {
            logger.log('retValue = null;', 'grind', 1);
            retValue = null;
        }
    }
    catch(err) {
        // Swallow the exception and continue...
    }
}

function styleMan(rId) {
    var rStyle = randStyle();
    var rStyleValue = randStyleValue(rStyle);

    // Only element has style
    if(id[rId] && id[rId].nodeType == 1) {
        logger.log('id_' + rId + '.style["' + rStyle + '"] = "' + rStyleValue + '";', 'grind', 1);
        id[rId].style[rStyle] = rStyleValue;
    }
}

function useCacheVal() {
    if(cacheVal) {
        propfMan([0], Infinity, 'prop', 'cacheVal');
        propfMan([0], Infinity, 'func', 'cacheVal');
    }
}

function layout() {
    try {
        for(var i=0; i<3; i++) {
            var rId = randId();
            if(rId == 'none') {
                return;
            }

            logger.log('id_' + rId + '.offsetParent;', 'grind', 1);
            id[rId].offsetParent;
        }
    }
    catch(err) {
        // Swallow the exception and continue...
    }
}

function clear() {
    try {
        var rId = randId();
        if(rId == 'none') {
            return;
        }

        var count = 0;
        while(!id[rId].parentNode || rId < demicm.reserveIdNum) {
            rId = randId();

            count++;
            if(count > demicm.MAX_LOOP) {
                return;
            }
        }

        switch(rand(8)) {
            case 0:
                var cacheArr = [];
                removeChildren(id[rId], 'delay', cacheArr);

                logger.log('id_' + rId + '.innerHTML = "i";', 'grind', 1);
                id[rId].innerHTML = 'foo';

                removeCache(cacheArr);
                break;

            case 1:
                logger.log('id_' + rId + '.outerHTML = "";', 'grind', 1);
                id[rId].outerHTML = '';

                removeThis(id[rId], 'direct');
                break;

            case 2:
                var cacheArr = [];
                removeChildren(id[rId], 'delay', cacheArr);

                logger.log('id_' + rId + '.innerText = "i";', 'grind', 1);
                id[rId].innerText = 'foo';

                removeCache(cacheArr);
                break;

            case 3:
                logger.log('id_' + rId + '.outerText = "";', 'grind', 1);
                id[rId].outerText = '';
                removeThis(id[rId], 'direct');
                break;

            case 4:
                var cacheArr = [];
                removeChildren(id[rId], 'delay', cacheArr);

                logger.log('id_' + rId + '.innerHTML = ' + 'id_' + rId + '.innerHTML;', 'grind', 1);
                id[rId].innerHTML = id[rId].innerHTML;

                removeCache(cacheArr);
                clearChildrenId(id[rId]);
                break;

            case 5:
                var parentNode = id[rId].parentNode; 
                var currentNode = id[rId];
                var childIdx = 0;
                while(currentNode) {
                    currentNode = currentNode.previousSibling;
                    childIdx++;
                }

                logger.log('id_' + rId + '.outerHTML = ' + 'id_' + rId + '.outerHTML;', 'grind', 1);
                id[rId].outerHTML = id[rId].outerHTML;
                removeThis(id[rId], 'direct');

                currentNode = parentNode.firstChild;
                for(var i=1; i<childIdx; i++) {
                    currentNode = currentNode.nextSibling;
                }
                clearThisId(currentNode);
                parentNode = null;
                currentNode = null;
                break;

            case 6:
                var cacheArr = [];
                removeChildren(id[rId], 'delay', cacheArr);

                logger.log('id_' + rId + '.innerText = ' + 'id_' + rId + '.innerText;', 'grind', 1);
                id[rId].innerText = id[rId].innerText;

                removeCache(cacheArr);
                break;

            case 7:
                logger.log('id_' + rId + '.outerText = ' + 'id_' + rId + '.outerText;', 'grind', 1);
                id[rId].outerText = id[rId].outerText;

                removeThis(id[rId], 'direct');
                break;

            default:
                break;
        }

        logger.log('gc();', 'grind', 1);
        gc();
    }
    catch(err) {
        // Swallow the exception and continue...
    }
}

function clearAll() {
    logger.log('document.write("");', 'grind', 1);
    document.write('');

    for(var i=1; i<id.length; i++) {
        logger.log('id_' + i + ' = null;', 'grind', 1);
        id[i] = null;
    }

    logger.log('gc();', 'grind', 1);
    gc();

    //window.open('', '_self', '');
    //window.close();
}

function DOMMan()
{
    try {
        var rIds = [];
        randIds(rIds, 2);
        if(randIds[0] == 'none') {
            return;
        }

        var randValueTable = {};
        randPropfValue(rIds[1], 'DOM', randValueTable);

        var rBool = randValueTable['boolean'];
        var rStr = randValueTable['string'];
        var rDOMPos = randValueTable['sWhere'];
        var rHTMLCode = randValueTable['HTMLCode'];

        switch(rand(8)) {
            //Node appendChild(in Node newChild)
            case 0:
                logger.log('id_' + rIds[0] + '.appendChild(id_' + rIds[1]  + ');', 'grind', 1);
                id[rIds[0]].appendChild(id[rIds[1]]);
                break;

            // Node insertBefore(in Node newChild, in Node refChild)
            case 1:
                logger.log('id_' + rIds[0] + '.parentNode.insertBefore(id_' + rIds[1]  + ', id_' + rIds[0] + ');', 'grind', 1);
                id[rIds[0]].parentNode.insertBefore(id[rIds[1]], id[rIds[0]]);
                break;

            // Node insertAdjacentElement(in String sWhere, in Node newSibling)
            case 2:
                logger.log('id_' + rIds[0] + '.insertAdjacentElement("' + rDOMPos + '", id_' + rIds[1]  + ');', 'grind', 1);
                id[rIds[0]].insertAdjacentElement(rDOMPos, id[rIds[1]]);
                break;

            // insertAdjacentHTML(in String sWhere, in String htmlCode)
            case 3:
                logger.log('id_' + rIds[0] + '.insertAdjacentHTML("' + rDOMPos + '", "' + rHTMLCode  + '");', 'grind', 1);
                id[rIds[0]].insertAdjacentHTML(rDOMPos, rHTMLCode);
                break;

            // insertAdjacentText(in String sWhere, in String text)
            case 4:
                logger.log('id_' + rIds[0] + '.insertAdjacentText("' + rDOMPos + '", "' + rStr  + '");', 'grind', 1);
                id[rIds[0]].insertAdjacentText(rDOMPos, rStr);
                break;

            // Node removeChild(in Node oldChild)
            case 5:
                if(rand(8) == 0) {
                    logger.log('id_' + rIds[0] + '.parentNode.removeChild(id_' + rIds[0] + ');', 'grind', 1);
                    id[rIds[0]].parentNode.removeChild(id[rIds[0]]);
                    removeThis(id[rIds[0]], 'direct');
                }
                break;

            // Node replaceChild(in Node newChild, in Node oldChild)
            case 6:
                if(rand(8) == 0) {
                    logger.log('id_' + rIds[0] + '.parentNode.replaceChild(id_' + rIds[1]  + ', id_' + rIds[0] + ');', 'grind', 1);
                    id[rIds[0]].parentNode.replaceChild(id[rIds[1]], id[rIds[0]]);
                    removeThis(id[rIds[0]], 'direct');
                }
                break;

            // Node cloneNode(in boolean deep);
            case 7:
                logger.log('var clonedNode = id_' + rIds[1] + '.cloneNode(' + rBool + ');', 'grind', 1);
                var clonedNode = id[rIds[1]].cloneNode(rBool);
                logger.log('id_' + rIds[0] + '.appendChild(clonedNode);', 'grind', 1);
                id[rIds[0]].appendChild(clonedNode);

                logger.log('clonedNode.id = ' + id.length + ';', 'grind', 1);
                clonedNode.id = id.length;
                logger.log('id_' + id.length + ' = clonedNode;', 'grind', 1);
                id[id.length] = clonedNode;

                if(rBool) {
                    clearChildrenId(clonedNode);
                }

                logger.log('clonedNode = null;', 'grind', 1);
                clonedNode = null;
                break;

           default:
                break;
        }
    }
    catch(err) {
        // Swallow the exception and continue...
    }
}

/************************************* finale *************************************/
function finale() {
    /* Spray is not necessary
    logger.log('occupySprayInt(' + demicm.ARRAY_LEN_MAX +', ' + demicm.ARRAY_CNT + ');', 'grind', 1);
    //occupySprayInt(demicm.ARRAY_LEN_MAX, demicm.ARRAY_CNT);
    */
    logger.log('cacheVal = null;', 'grind', 1);
    cacheVal = null;

    logger.log('gc();', 'grind', 1);
    gc();

    reuseElem();
}

function reuseElem() {
    try {
        logger.log('id_1000 = document.createElement("a");', 'grind', 1);
        demicm.relayoutElem = document.createElement('a');
        logger.log('document.body.appendChild(id_1000);', 'grind', 1);
        document.body.appendChild(demicm.relayoutElem); 

        for(var i=0; i<id.length; i++) {
            if(id[i]) {
                propfMan([i], Infinity, 'prop');
                propfMan([i], Infinity, 'func');
                styleMan(i);
            }
        }
    }
    catch(err) {
        // Swallow the exception and continue...
    }

    relayout();
}

function relayout() {
    try {
        logger.log('id_1000.offsetParent;', 'grind', 1);
        demicm.relayoutElem.offsetParent;
        logger.log('id_1000.innerHTML = id_1000.innerHTML;', 'grind', 1);
        demicm.relayoutElem.innerHTML = demicm.relayoutElem.innerHTML;
        logger.log('id_1000.innerHTML = "";', 'grind', 1);
        demicm.relayoutElem.innerHTML = '';
    }
    catch(err) {
        // Swallow the exception and continue...
    }
}

/************************************* outline *************************************/
function operate(count) {
    for(var i=0; i<count; i++) {
        normalOperate();
        specialOperate();
    }
}

function normalOperate() {
    var rId = randId();
    if(rId == 'none') {
        return;
    }

    var propStack = [rId];

    if(percent(demicm.USE_CACHE_PER)) {
        useCacheVal()
    }

    if(percent(demicm.PROP_PER)) {
        propfMan(propStack, 0, 'prop');
    }

    if(percent(demicm.FUNC_PER)) {
        propfMan(propStack, 0, 'func');
    }

    if(percent(demicm.STYLE_PER)) {
        styleMan(rId);
    }
}

function specialOperate() {
    if(percent(demicm.GC_PER)) {
        logger.log('gc();', 'grind', 1);
        gc();
    }

    if(percent(demicm.LAYOUT_PER)) {
        layout();
    }

    if(percent(demicm.CLEAR_PER)) {
        clear();
    }

    if(percent(demicm.CLEAR_ALL_PER)) {
        clearAll();
    }

    if(percent(demicm.DOM_PER)) {
        DOMMan();
    }

    // Vedio Audio Canvas...
}

function demiFront() {
    /* BEGIN FUZZING CODE */
    logger = new LOGGER( "demichrome1" );
    logger.starting();

    prelude();

    logger.log('// we are now begining to fuzz...', 'grind', 1);
    operate(demicm.FRONT_OP_CNT);

    logger.log( "/-demiBack = function(){", "grind", 1 );
    setTimeout('demiBack()', 1);
}

function demiBack() {
    operate(demicm.BACK_OP_CNT);

    finale();

    // For setTimeout
    logger.log( "/-};", "grind", 1 );
    logger.log( "setTimeout('demiBack()',1);", "grind", 1 );

    /* END FUZZING CODE */
    logger.finished();
    // Clean environment
    gc();
    window.location.href = window.location.protocol + '//' + window.location.host + '/grinder';
}


/**************************************Random Stuff**************************************/
// Pick a random number between 0 and n-1
function rand(n) {
	return Math.floor(Math.random()*n);
}

// Pick a random item from array
function randItem(arr)
{
    if(arr.length == 0) {
        return null;
    }
    else {
        return arr[rand(arr.length)];
    }
}

// Pick a random number between -n and n
function srand(n) {
    var arr = [-1, 1];
    return randItem(arr)*rand(n);
}

// Pick either true or false
function randBool() {
	return (rand(2) == 0 ? true : false );
}

// Pick random Hex
function randHex(len){
	var letters = '0123456789ABCDEF'.split('');
	var hex=''
	for (var i=0; i<len; i++ ) {
		hex += randItem(letters);
	}
	return hex;
}

// Pick random ascii string
function randAscii(len) {
    var letters='\t /`_+=-}{][(),.?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var ascii='';
    for(var i=0;i< len;i++) {
        ascii += randItem(letters);
    }
    return ascii;
}

// Pick random HTML entity 
function randHTMLEnt(len) {
    var str = '';
    for(var i=0; i<len; i++) {
        str += '&#' + rand(256) + ';';
    }
    return str;
}

// Pick random unicode string
function randUnicode(len) {
    var str = '';
    for(var i=0; i<len; i++) {
        str += '%u' + randHex(4);
    }
    return escape(str);
}

// Pick random string
function randStr(len) {
    var str = '';
    switch(rand(2)) {
        case 0:
            str = randHTMLEnt(len);
            break;
        case 1:
            str = randAscii(len);
            break;
        case 2:
            // Not use for simplify
            str = randUnicode(len);
            break;
        default:
            break;
    }
    return str;
}

// Generate random html code with text len and tag count
function randHTMLCode(len, count) {
    var str = '';
    var rTags = [];
    for(var i=0; i<count*3; i++) {
        switch(rand(3)) {
            case 0:
                str += randStr(len);
                break;

            case 1:
                var rTag = randItem(demicm.tags);
                if(!inArr(rTags, rTag)) {
                    rTags.push(rTag);
                }
                str += '<' + rTag + '>';
                break;

            case 2:
                var rTagEnd = randItem(rTags);
                if(rand(3) == 0 && rTags.length > 0 && rTagEnd != 'script') {
                    str += '</' + rTagEnd + '>';
                }
                break;

            default:
                break;
        }
    }
    return str;
}

// num/100 probability return true
function percent(num) {
    if(rand(100) < num) {
        return true;
    }
    else {
        return false;
    }
}

/**************************************Element and ID**************************************/
function getTagName(elem) {
    try {
        if(!elem.nodeName || elem.nodeType == 2) {
            return 'none';
        }

        var tag = elem.nodeName.toLowerCase().replace('#','');

        var colonIdx = tag.indexOf(':');
        if(colonIdx != -1) {
            tag = tag.slice(colonIdx+1); 
        }

        if(tag == 'document') {
            tag = 'doc';
        }
        else if(tag == 'document-fragment') {
            tag = 'fragment';
        }

        return tag;
    }
    catch(err) {
    }
}

// Get random id number 
function randId() {
    var randId = rand(id.length);
    var count = 0;
    // Get non-null node id 
    while(!id[randId] || inArr(demicm.idBlackList, randId)) {
        randId = rand(id.length);

        count++;
        if(count > demicm.MAX_LOOP) {
            return 'none';
        }
    }

    // Recover wrong id
    if(id[randId].id != randId) {
        logger.log('id_' + randId + '.id = ' + randId + ';', 'grind', 1);
        id[randId].id = randId;
    }

    return randId;
}

// Get random id index array
function randIds(rIds, len) {
    for(var i=0; i<len; i++) {
        var rId = randId();
        rIds.push(rId);
    }
}

/**************************************prop func style**************************************/
// Get random prop or func name
function randPropf(tag, type) {
    if(!demicm.elemPropf[tag]) {
        return 'none';
    }
    else if(type == 'prop') {
        var props = demicm.elemPropf[tag].prop;
        var propf = randItem(props);
        var count = 0;
        while(inArr(demicm.propBlackList, propf) || demicm.propValues[propf].readOnly) {
            propf = randItem(props);

            count++;
            if(count > demicm.MAX_LOOP) {
                return 'none';
            }
        }
    }
    else if(type == 'func') {
        var funcs = demicm.elemPropf[tag].func;
        var propf = randItem(funcs);
        var count = 0;
        while(inArr(demicm.funcBlackList, propf)) {
            propf = randItem(funcs);

            count++;
            if(count > demicm.MAX_LOOP) {
                return;
            }
        }
    }
    else {
    }

    return propf;
}

// Dynamically get random prop or func name
function randPropfDyn(obj, type) {
    var props = [];
    var funcs = [];
    for(var p in obj) {
        if(typeof obj[p] == 'function') {
            funcs.push(p);
        }
        else {
            props.push(p);
        }
    }

    if(type == 'func') {
        var propf = randItem(funcs);
        var count = 0;
        while(inArr(demicm.funcBlackList, propf)) {
            propf = randItem(funcs);

            count++;
            if(count > demicm.MAX_LOOP) {
                return;
            }
        }
    }
    else {
        var propf = randItem(props);
        var count = 0;
        while(inArr(demicm.propBlackList, propf)) {
            propf = randItem(props);

            count++;
            if(count > demicm.MAX_LOOP) {
                return;
            }
        }
    }

    return propf;
}

// Get random prop value or func params value, rIds[idIdx] as random obj
function randPropfValue(idIdx, type, randTable) {
    // Base random stuff
    var rBool = randBool();
    var rStr = randStr(rand(0x100)); 
    var rObj = id[idIdx];
    switch(rand(3)) {
        case 0:
            var rsNum = srand(100);
            break;
        case 1:
            var rsNum = srand(0x100000000);
            break;
        case 2:
            var rsNum = srand(0x100000000) + 0x100000000;
            break;
        default:
            break;
    }

    // Special random stuff
    var rStrId = String(rand(id.length));
    var rStrColor = 'rgb(' + rand(256) + ',' + rand(256) + ',' + rand(256) + ')'; //rgb(255,0,0)
    var rStrPos = randItem(demicm.num) + ',' + randItem(demicm.num) + ',' + randItem(demicm.num);
    var rDOMPos = randItem(demicm.DOMPos);
    var rHTMLCode = randHTMLCode(0x10, 5);

    // Base table
    var baseTable = {'boolean': rBool, 'number': rsNum, 'string': rStr, 'object': rObj}; 
    extendObj(randTable, baseTable);

    // Special table
    if(type == 'prop') {
        var specTable = {'stringId': rStrId, 'stringHashId': '#'+rStrId, 'stringQueryId': '?id='+rStrId,
            'stringColor': rStrColor, 'stringPos': rStrPos};
    }
    else if(type == 'func') {
        var specTable = {'stringId': rStrId, 'stringHashId': '#'+rStrId, 'stringQueryId': '?id='+rStrId,
            'stringColor': rStrColor, 'stringPos': rStrPos};
    }
    else if(type == 'DOM') {
        var specTable = {'sWhere': rDOMPos, 'HTMLCode': rHTMLCode};
    }
    else {
    }
    extendObj(randTable, specTable);
}

// Get random style
function randStyle() {
    return randItem(demicm.styles);
}

// Get random style value according to style
function randStyleValue(style) {
    var styleValue = demicm.styleValues[style];
    while(isArr(styleValue)) {
        styleValue = randItem(styleValue);
    }
    return styleValue;
}

// Generate random css text 
function randCSSText() {
    var cssText = '{';
    for(var i=0; i<demicm.styles.length; i++) {
        cssText += toCSSStyle(demicm.styles[i]) + ': ' + randStyleValue(demicm.styles[i]) + '; ';
    }
    cssText += '}';
    return cssText;
}

// Change style to CSS style (e.g., backgroundColor -> background-color)
function toCSSStyle(style) {
    var index = style.search(/[A-Z]/);
    while(index != -1) {
        style = style.substring(0, index) + '-' + style.substring(index, index+1).toLowerCase() + style.substring(index+1);
        index = style.search(/[A-Z]/);
    }
    return style;
}

// Revise string for logger
function logRevise(idIdx, type, value) {
    if(typeof value == 'string') {
        return ('"' + value + '"');
    }
    else if(typeof value == 'function') {
        value = String(value);
        return value.substring(9, value.indexOf('('));
    }
    else if(typeof value == 'object') {
        if(type == 'prop') {
            return ('id_' + idIdx);
        }
        else if(type == 'func') {
            return ('id[' + idIdx + ']');
        }
    }
    else {
        return value;
    }
}

/**************************************DOM Node Control**************************************/
// Remove node's reference from id[]
function removeThis(elem, type, cacheArr) {
    if(type == 'direct') {
        removeChildren(elem, type);

        logger.log('id_' + elem.id + '.id = "free";', 'grind', 1);
        logger.log('id_' + elem.id + ' = null;', 'grind', 1);
        id[elem.id] = null;
        elem.id = 'free';
    }
    else if(type == 'delay'){
        removeChildren(elem, type, cacheArr);

        cacheArr.push(elem.id);
    }
    else {
    }
}

function removeChildren(elem, type, cacheArr) {
    try {
        if(!elem || elem.id == '0' || elem.nodeType == 3) {
            return;
        }

        for(var i=0; i<elem.childNodes.length; i++) {
            if(elem.childNodes[i].id && elem.childNodes[i].id != 'free' && elem.childNodes[i].id != 'delete') {
                if(type == 'direct') {
                    removeThis(elem.childNodes[i], type);
                }
                else if(type == 'delay'){
                    removeThis(elem.childNodes[i], type, cacheArr);
                }
            }
        }
    }
    catch(err) {
        // Swallow the exception and continue...
    }
}

function removeCache(cacheArr) {
    for(var i=0; i<cacheArr.length; i++) {
        logger.log('id_' + cacheArr[i] + '.id = "free";', 'grind', 1);
        logger.log('id_' + cacheArr[i] + ' = null;', 'grind', 1);
        id[cacheArr[i]] = null;
        cacheArr[i] = 'free';
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
        for(var i=0; i<elem.childNodes.length; i++) {
            clearThisId(elem.childNodes[i]);
        }
    }
    catch(err) {
        // Swallow the exception and continue...
    }
}

/**************************************Array**************************************/
// Remove item according to value
function removeArrValue(arr, value) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == value) {
            arr.splice(i,1);
        }
    }
}

// Check whether an item is in array
function inArr(arr, searchItem) {
    for (i=0; i<arr.length; i++) {
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
    for(var i=0; i<orignArr.length; i++) {
        var newItem = orignArr[i];
        for(var j=1; j<count; j++) {
            newItem += splitStr + randItem(orignArr);
        }
        newArr.push(newItem);
    }
    return newArr.concat();
}

// Convolute firstArr with secondArr
function convoluteArr(firstArr, secondArr, splitStr, primary) {
    var resultArr = [];
    if(primary == 1) {
        for(var i=0; i<firstArr.length; i++) {
            resultArr.push(firstArr[i] + splitStr + randItem(secondArr));
        }
    }
    else if(primary == 2) {
        for(var i=0; i<secondArr.length; i++) {
            resultArr.push(randItem(firstArr) + splitStr + secondArr[i]);
        }
    }
    else {
    }
    return resultArr.concat();
}

/**************************************Object**************************************/
// Clone object
function cloneObj(obj) {
    var objStr = JSON.stringify(obj);
    var newObj = JSON.parse(objStr);
    return newObj;
}

// Concat object
function extendObj(originObj, newObj, override){
    for(var p in newObj) {
        if(newObj.hasOwnProperty(p) && (!originObj.hasOwnProperty(p) || override)) {
            originObj[p]=newObj[p];
        }
    }
}

// Determine whether is positive integer
function isPosInt(str)
{
    if(str != null && str != undefined) {
        var re = /\d+/i; 
        str = String(str);
        var reStr = str.match(re);
        return (reStr == str);
    }
    return false;
}


demicm.tagBlackList = ['text', 'doc', 'fragment', 'unknown'];

styles= [
    ['background-attachment','fixed','scroll'],
    ['background-color','#b0c4de','none'],
    ['background-image','file:///c:/grinder/node/data/grind.jpg'],
    ['background-position','size','50% 50%','10 10','left top','center top','inherit'],
    ['background-repeat','repeat','repeat-x','repeat-y','no-repeat'],
    ['border','solid','double','groove','dotted','dashed','inset','outset','ridge','hidden','four-sides','5px'],
    ['border-bottom','5px','#b0c4de','thick'],
    ['border-bottom-color','#b0c4de'],
    ['border-bottom-style','solid','double','groove','dotted','dashed','inset','outset','ridge','hidden'],
    ['border-bottom-width','5px','thick'],
    ['border-color','#b0c4de'],
    ['border-left','10px','#ff0000','thin'],
    ['border-left-color','#ff0000'],
    ['border-left-style','solid','double','groove','dotted','dashed','inset','outset','ridge','hidden'],
    ['border-left-width','10px','thin'],
    ['border-right','5px','#b0c4de','thin'],
    ['border-right-color','#b0c4de'],
    ['border-right-style','solid','double','groove','dotted','dashed','inset','outset','ridge','hidden'],
    ['border-right-width','5px','thin'],
    ['border-style','solid','double','groove','dotted','dashed','inset','outset','ridge','hidden','four-sides','thick'],
    ['border-top','5px','#b0c4de','thick'],
    ['border-top-color','#b0c4de'],
    ['border-top-style','solid','double','groove','dotted','dashed','inset','outset','ridge','hidden'],
    ['border-top-width','5px','thick'],
    ['border-width','5px','thick'],
    ['clear','left','right','both'],
    ['color','#b0c4de'],
    ['display','block','inline'],
    ['float','left','right'],
    ['font-family','Georgia'],
    ['font-size','100%','10px','small','inherit'],
    ['font-style','italic','oblique','normal'],
    ['font-variant','small-caps'],
    ['font-weight','bold','900'],
    ['height','100px','auto'],
    ['letter-spacing','2px'],
    ['line-height','2','90%'],
    ['list-style','circle','square','disc','upper-alpha','lower-alpha','upper-roman','lower-roman','decimal','inside','outside','none'],
    ['list-style-image','file:///c:/grinder/fuzzer/background.jpg'],
    ['list-style-position','inside','outside'],
    ['list-style-type','circle','square','disc','upper-alpha','lower-alpha','upper-roman','lower-roman','decimal'],
    ['margin','5px','10%','auto'],
    ['margin-bottom','2px','30%','auto'],
    ['margin-left','5px','50%','auto'],
    ['margin-right','5px','50%','auto'],
    ['margin-top','10px','60%','auto'],
    ['padding','5px','100%','four-sides'],
    ['padding-bottom','10px','100%'],
    ['padding-left','5px','40%'],	
    ['padding-right','6px','100%'],
    ['padding-top','10px','40%'],
    ['position','absolute','relative','100%','100px'],
    ['text-align','right','center','left','justify'],
    ['text-decoration','line-through','overline','underline','none'],
    ['text-indent','5px','5%'],
    ['text-transform','capitalize','lowercase','uppercase'],
    ['vertical-align','vertical-values'],
    ['white-space','nowrap'],
    ['width','100pz','100%','auto'],
    ['word-spacing','2px'],
    ['z-index','1']
];

demicm.elemDic = {
    a          : 'HTMLAnchorElement',
    abbr       : 'HTMLElement',
    address    : 'HTMLElement',
    applet     : 'HTMLAppletElement',
    area       : 'HTMLAreaElement',
    article    : 'HTMLElement',
    aside      : 'HTMLElement',
    audio      : 'HTMLAudioElement',
    b          : 'HTMLElement',
    base       : 'HTMLBaseElement',
    basefont   : 'HTMLElement',
    bdi        : 'HTMLElement',
    bdo        : 'HTMLElement',
    bgsound    : 'HTMLElement',
    blockquote : 'HTMLQuoteElement',
    body       : 'HTMLBodyElement',
    br         : 'HTMLBRElement',
    button     : 'HTMLButtonElement',
    canvas     : 'HTMLCanvasElement',
    caption    : 'HTMLTableCaptionElement',
    cite       : 'HTMLElement',
    code       : 'HTMLElement',
    col        : 'HTMLTableColElement',
    colgroup   : 'HTMLTableColElement',
    command    : 'HTMLCommandElement',
    data       : 'HTMLDataElement',
    datalist   : 'HTMLDataListElement',
    dd         : 'HTMLElement',
    del        : 'HTMLModElement',
    details    : 'HTMLDetailsElement',
    dfn        : 'HTMLElement',
    dialog     : 'HTMLDialogElement',
    div        : 'HTMLDivElement',
    dl         : 'HTMLDListElement',
    dt         : 'HTMLElement',
    em         : 'HTMLElement',
    embed      : 'HTMLEmbedElement',
    fieldset   : 'HTMLFieldSetElement',
    figcaption : 'HTMLElement',
    figure     : 'HTMLElement',
    footer     : 'HTMLElement',
    form       : 'HTMLFormElement',
    h1         : 'HTMLHeadingElement',
    h2         : 'HTMLHeadingElement',
    h3         : 'HTMLHeadingElement',
    h4         : 'HTMLHeadingElement',
    h5         : 'HTMLHeadingElement',
    h6         : 'HTMLHeadingElement',
    head       : 'HTMLHeadElement',
    header     : 'HTMLElement',
    hgroup     : 'HTMLElement',
    hr         : 'HTMLHRElement',
    html       : 'HTMLHtmlElement',
    i          : 'HTMLElement',
    iframe     : 'HTMLIFrameElement',
    img        : 'HTMLImageElement',
    input      : 'HTMLInputElement',
    isindex    : 'HTMLInputElement',
    ins        : 'HTMLModElement',
    kbd        : 'HTMLElement',
    keygen     : 'HTMLKeygenElement',
    label      : 'HTMLLabelElement',
    layer      : 'HTMLElement',
    legend     : 'HTMLLegendElement',
    li         : 'HTMLLIElement',
    link       : 'HTMLLinkElement',
    map        : 'HTMLMapElement',
    mark       : 'HTMLElement',
    marquee    : 'HTMLMarqueeElement',
    menu       : 'HTMLMenuElement',
    meta       : 'HTMLMetaElement',
    meter      : 'HTMLMeterElement',
    nav        : 'HTMLElement',
    noscript   : 'HTMLElement',
    nobr       : 'HTMLElement',
    noembed    : 'HTMLElement',
    noframes   : 'HTMLElement',
    object     : 'HTMLObjectElement',
    ol         : 'HTMLOListElement',
    optgroup   : 'HTMLOptGroupElement',
    option     : 'HTMLOptionElement',
    output     : 'HTMLOutputElement',
    p          : 'HTMLParagraphElement',
    param      : 'HTMLParamElement',
    pre        : 'HTMLPreElement',
    progress   : 'HTMLProgressElement',
    q          : 'HTMLQuoteElement',
    rp         : 'HTMLElement',
    rt         : 'HTMLElement',
    ruby       : 'HTMLElement',
    s          : 'HTMLElement',
    samp       : 'HTMLElement',
    script     : 'HTMLScriptElement',
    section    : 'HTMLElement',
    select     : 'HTMLSelectElement',
    small      : 'HTMLElement',
    source     : 'HTMLSourceElement',
    span       : 'HTMLSpanElement',
    strong     : 'HTMLElement',
    style      : 'HTMLStyleElement',
    sub        : 'HTMLElement',
    summary    : 'HTMLElement',
    sup        : 'HTMLElement',
    table      : 'HTMLTableElement',
    tbody      : 'HTMLTableSectionElement',
    td         : 'HTMLTableDataCellElement',
    textarea   : 'HTMLTextAreaElement',
    tfoot      : 'HTMLTableSectionElement',
    th         : 'HTMLTableHeaderCellElement',
    thead      : 'HTMLTableSectionElement',
    time       : 'HTMLTimeElement',
    title      : 'HTMLTitleElement',
    tr         : 'HTMLTableRowElement',
    track      : 'HTMLTrackElement',
    tt         : 'HTMLElement',
    u          : 'HTMLElement',
    ul         : 'HTMLUListElement',
    var        : 'HTMLElement',
    video      : 'HTMLVideoElement',
    wbr        : 'HTMLElement',

    // Pseudo tag
    unknown    : 'HTMLUnknownElement',
    doc        : 'HTMLDocument',
    text       : 'Text',
    fragment   : 'DocumentFragment',
};

demicm.HTMLEvtArr = [
    'onabort',
    'onblur',
    'oncanplay',
    'oncanplaythrough',
    'onchange',
    'onclick',
    'oncontextmenu',
    'ondblclick',
    'ondrag',
    'ondragend',
    'ondragenter',
    'ondragleave',
    'ondragover',
    'ondragstart',
    'ondrop',
    'ondurationchange',
    'onemptied',
    'onended',
    'onerror',
    'onfocus',
    'onformchange',
    'onforminput',
    'oninput',
    'oninvalid',
    'onkeydown',
    'onkeypress',
    'onkeyup',
    'onload',
    'onloadeddata',
    'onloadedmetadata',
    'onloadstart',
    'onmousedown',
    'onmousemove',
    'onmouseout',
    'onmouseover',
    'onmouseup',
    'onmousewheel',
    'onpause',
    'onplay',
    'onplaying',
    'onprogress',
    'onratechange',
    'onreadystatechange',
    'onscroll',
    'onseeked',
    'onseeking',
    'onselect',
    'onshow',
    'onstalled',
    'onsubmit',
    'onsuspend',
    'ontimeupdate',
    'onvolumechange',
    'onwaiting'
];

demicm.bodyEvtArr = [
    'onafterprint',
    'onbeforeprint',
    'onbeforeunload',
    'onhashchange',
    'onmessage',
    'onoffline',
    'ononline',
    'onpagehide',
    'onpageshow',
    'onpopstate',
    'onresize',
    'onscroll',
    'onstorage',
    'onunload'
];

demicm.mediaEvtArr = [
    'onloadstart',
    'onprogress',
    'onsuspend',
    'onabort',
    'onerror',
    'onemptied',
    'onstalled',
    'onloadedmetadata',
    'onloadeddata',
    'oncanplay',
    'oncanplaythrough',
    'onplaying',
    'onwaiting',
    'onseeking',
    'onseeked',
    'onended',
    'ondurationchange',
    'ontimeupdate',
    'onplay',
    'onpause',
    'onratechange',
    'onvolumechange',
];

demicm.trackEvtArr = [
    'onaddtrack',
    'onremovetrack',
    'oncuechange',
    'onenter',
    'onexit'
];

// Get all tagNames
demicm.tags = [];
demicm.strictTags = [];
function getTags() {
    for(var t in demicm.elemDic) {
        demicm.tags.push(t);

        if(!inArr(demicm.tagBlackList, t)) {
            demicm.strictTags.push(t);
        }
    }
}

// Get element name according to tag name
function getElemName(tag)
{
    return demicm.elemDic[tag];
}

// Get all properties and functions
demicm.elemPropf = {};
function getPropAndFunc() {
    var propf = {prop: '', propType: '', func: ''};

    for(var i=0; i<demicm.tags.length; i++) {
        if(demicm.tags[i] == 'text') {
            var elem = document.createTextNode('demicm');
        }
        else if(demicm.tags[i] == 'fragment') {
            var elem = document.createDocumentFragment();
        }
        else if(demicm.tags[i] == 'doc') {
            var elem = document.createElement(demicm.tags[i]);
            //var elem = document;
        }
        else {
            var elem = document.createElement(demicm.tags[i]);
        }

        var func = [];
        var prop = [];
        var propType = [];

        for(var p in elem) {
            if(typeof elem[p] == 'function') {
                func.push(p);
            }
            else {
                prop.push(p);
                propType.push(typeof elem[p]);
            }
        }
        propf.prop = prop;
        propf.propType = propType;
        propf.func = func;

        demicm.elemPropf[demicm.tags[i]] = cloneObj(propf);
    }
}

// Get all properties and functions distinctively
function getDistPropAndFunc() {
    var props = [];
    var funcs = [];

    console.log('prop:');
    for(var e in demicm.elemPropf) {
        var tmpProp = demicm.elemPropf[e].prop;
        var tmpPropType = demicm.elemPropf[e].propType;
        var tmpFunc = demicm.elemPropf[e].func;

        for(var j=0; j<tmpProp.length; j++) {
            if(props.indexOf(tmpProp[j])==-1) {
                props.push(tmpProp[j]);
                console.log(tmpProp[j] + ':' + tmpPropType[j]);
            }
        }
        for(var j=0; j<tmpFunc.length; j++) {
            if(funcs.indexOf(tmpFunc[j])==-1) {
                funcs.push(tmpFunc[j]);
            }
        }
    }
    
    console.log('\nfunction:\n');
    for(var i=0; i<funcs.length; i++) {
        console.log(funcs[i]);
    }
}

// Prelude 
getTags();
getPropAndFunc();
//getDistPropAndFunc();



// Itterate over an object to simulate 'tickling' the object. This is usefull during
// testcase creating/reduction in order to trigger the origional crash. If you comment
// your fuzzer with log code comments of "/* tickle( OBJ ); */" then these comments
// can be removed to tickle the object. Use where you itterate over an object looking
// for a property/function/...
function tickle( obj )
{
	try
	{
		for( var p in obj )
		{
			try { var tmp = typeof obj[p]; } catch( e2 ){}
		}
	}
	catch( e1 ){}
}

// The logger class used to perform in-memory logging from a fuzzer.
// This is linked with the backend via the injected grinder_logger.dll which
// will hook the JavaScript parseFloat function and intercept any messages
// passed in by the logger class and write them to disk.
function LOGGER( name )
{
	this.name        = name;
	this.browser     = '';
	
	var idx          = 0;
	var unique_types = [];
	var log_xml      = null;
	var log_xml_idx  = null;
	
	this.gc = function()
	{
		if( this.browser == 'IE' )
		{
			CollectGarbage();
		}
		else if( this.browser == 'CM' )
		{
			if( typeof window.gc != 'undefined' )
			{
				window.gc();
			}
			else
			{
				for( f=[], i=0 ; i<30000 ; i++ )
					f.push( new String( "ABCD" ) );
			}
		}
		else
		{
		    //for( i=0; i < 10000; i++ )
			//	var s = new String( unescape( '%u7F7F%u7F7F' ) );
		}
	};
	
	this.get_browser = function()
	{
		if( /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) )
			return "FF";
		else if( /MSIE (\d+\.\d+);/.test(navigator.userAgent) )
			return "IE";
		else if( /Chrome/.test(navigator.userAgent) )
			return "CM";
		else if( /Safari/.test(navigator.userAgent) )
			return "SF";
		else if( /Opera/.test(navigator.userAgent) )
			return "OP";
		else
			return "??";
	};
	
	// Access this instance variable to get the browser...
	this.browser = this.get_browser();

	if( this.browser == 'CM' || this.browser == 'FF' || this.browser == 'SF' )
	{
		log_xml = function( xml )
		{
			parseFloat( unescape( '%uC0DE%uDEAD' + xml + '%u0000' ) );
		};

		log_xml_idx = function( xml, _idx )
		{
			parseFloat( unescape( '%uCAFE%uDEAD' + dword2data( _idx ) + xml + '%u0000' ) );
		};
		
		// You call this to indicate logging is starting...
		this.starting = function()
		{
			parseFloat( unescape( '%uBEEF%uDEAD' + '<fuzzer name="' + xml_escape( this.name ) + '" browser="' + xml_escape( this.browser ) + '">' + '%u0000' ) );
		};
		
		// You call this to indicate logging is finished...
		this.finished = function()
		{
			parseFloat( unescape( '%uF00D%uDEAD' + '</fuzzer>' + '%u0000' ) );
		};
		
		// You call this to trigger an access violation (attempted write to a bad address)...
		this.debugbreak = function()
		{
			parseFloat( unescape( '%uDEAD%uDEAD' + '%u0000' ) );
		};
	}
	else
	{
		log_xml = function( xml )
		{
			parseFloat( unescape( '%uC0DE%uDEAD') + xml );
		};
		
		log_xml_idx = function( xml, _idx )
		{
			parseFloat( unescape( '%uCAFE%uDEAD') + dword2data( _idx ) + xml );
		};
		
		this.starting = function()
		{
			parseFloat( unescape( '%uBEEF%uDEAD') + '<fuzzer name="' + xml_escape( name ) + '" browser="' + xml_escape( this.browser ) + '">' );
		};
		
		this.finished = function()
		{
			parseFloat( unescape( '%uF00D%uDEAD') + '</fuzzer>' );
		};
		
		this.debugbreak = function()
		{
			parseFloat( unescape( '%uDEAD%uDEAD' ) );
		};
	}
	
	// Call this instance method to generate a unique name for a type, e.g.
	//     The first call to unique_id( 'id' ) will first produce 'id_0'
	//     A second call to unique_id( 'id' ) will then produce 'id_1'
	//     A subsequent call to unique_id( 'param' ) will produce 'param_0'
	//     ...and so on...
	this.unique_id = function( type )
	{
		if( typeof unique_types[type] == 'undefined' )
			unique_types[type] = 0;
			
		var result = type + '_' + unique_types[type];

		unique_types[type] += 1;

		return result;
	};
	
	// Call this instance method to retrieve a random id of a previous type.
	this.rand_id = function( type )
	{
		if( typeof unique_types[type] == 'undefined' )
			unique_types[type] = 0;
		
		return type + '_' + rand( unique_types[type] );
	};
	
	// Call this instance method to retrieve the number of ID's of this type
	this.count_id = function( type )
	{
		if( typeof unique_types[type] == 'undefined' )
			return 0;
		
		return unique_types[type];
	};
	
	// Used to log a message from the fuzzer to the log file on disk. This is how we recreate testcases at a later stage.
	// You must log the JavaScript lines of code you wish to record. The message paramater is a string containing a line
	// of JavaScript. The location string parameter is optional, and can describe where in your fuzzer this log message came from.
	// The count number parameter is optional and defines how many times to execute the log message when recreating the testcase.
	// Note: Currently only logging string messages is supported, but future support for logging nested messages via an array
	// of string messages will be supported at a later stage.
	//
	// You can log a line of JavaScript as follows: logger.log( "id_0.src = 'AAAAAAAA';", "tweak_params", 8 );
	// When recreating a testcase this will produce the following (optionally surrounded by a try/catch statement):
	//     for( i=0 ; i<8 ; i++ ) {
	//         id_0.src = 'AAAAAAAA';
	//     }
	//
	// The for() loop is never emmitted if you log a count value of 1.
	//
	// You can log code comments as follows: logger.log( "/* tickle( id_0 ); */", "tweak_params" );
	// When recreating a testcase the code comment will be written as a code comment by default, but also may be uncommented 
	// in order to execute the javascript inside the comment as this may help recreate the crash.
	//
	// You can log regular comments a follows: logger.log( "// This is a message to myself :)" );
	// These will simply be printed as a comment in the testcase and will never be uncommented.
	//
	this.log = function( message, location, count )
	{
		var last_idx = -1;
		
		if( typeof location != 'string' )
			location = '';
		
		if( typeof count != 'number' )
			count = 1;
			
		if( typeof message == 'string' )
		{
			last_idx = log_message( message, location, count );
		}
		else
		{
			if( typeof message.length != 'undefined' && message.length > 0 )
			{
				idx += 1;
				
				xml  = '<log>';
				xml += '<idx>' + idx + '</idx>';
				xml += '<location>' + xml_escape( location ) + '</location>';
				xml += '<count>' + count + '</count>';

				log_xml_idx( xml, idx );
			
				for( var m in message )
					last_idx = this.log( message[m], location, 1 );

				log_xml( '</log>' );
			}
		}
		
		//if( idx == 111 )
		//	this.debugbreak();
			
		return last_idx;
	};
	
	var xml_escape = function( message )
	{
		message = message.replace( /</g, "&lt;" );
		message = message.replace( />/g, "&gt;" );
		message = message.replace( /&/g, "&amp;" );
		message = message.replace( /\"/g, "&quot;" );
		message = message.replace( /\'/g, "&apos;" );
		
		return message;
	};
	
	var log_message = function( message, location, count )
	{
		idx += 1;
		
		xml  = '<log>';
		xml += '<idx>' + idx + '</idx>';
		xml += '<location>' + xml_escape( location ) + '</location>';
		xml += '<message>' + xml_escape( message ) + '</message>';
		xml += '<count>' + count + '</count>';
		xml += '</log>';

		log_xml_idx( xml, idx );
		
		return idx - 1;
	};
	
	var dword2data = function( dword )
	{
		var d = Number( dword ).toString( 16 );
		while( d.length < 8 )
			d = '0' + d;
		return unescape( '%u' + d.substr( 4, 8 ) + '%u' + d.substr( 0, 4 ) );
	};
	
	this.type = function( name, obj, obj_hint )
	{
		if( typeof obj_hint == 'undefined' )
		{
			var id = "?";

			try
			{
				if( typeof obj.id != 'undefined' )
					return obj.id;
			} catch(e){}
	
			obj_hint = "%" + name + "%";
		}

		return obj_hint;
	};
}


demicm.propBlackList = [
    'id', 'innerHTML', 'innerText', 'outerHTML', 'outerText', 'textContent',
    'parentTextEdit', 'lastElementChild', 'firstElementChild', 'nextElementSibling', 'previousElementSibling',
    'ownerDocument', 'nextSibling', 'previousSibling', 'lastChild', 'firstChild', 'childNodes', 'parentNode',
    'parentElement', 'offsetParent', 'contentWindow', 'contentDocument', 'children', 'elements', 'body', 'head',
    'location',
    'URL', 'url', 'href',
    'origin', 'host', 'protocol', 'hostname', 'port', 'pathname',
    'search', 'name', 'history', 'hash', 'opener', 'onbeforeunload', 'onunload', 
    'defaultView', 'Components', 'controllers',
    'style', 'attributes', 'sheet', 'styleSheets', 'classList', // TODO
]; 

demicm.specialProp = ['type'];

demicm.URL = '';

demicm.src = {frame: 'demicmFrame.html', video: 'demicmVideo.avi'};

demicm.inputType = [
    'button', 'checkbox', 'color', 'date', 'datetime', 'datetime-local',
    'month', 'week', 'time', 'email', 'file', 'hidden', 'image', 'number', 'password', 'radio', 'range',
    'reset', 'search', 'submit', 'tel', 'text', 'url'
];

demicm.type = {
    source: demicm.MIMEType, object: demicm.MIMEType, anchor: demicm.MIMEType, 
    button: ['submit', 'button', 'reset', 'menu'], input: demicm.inputType,
    select: ['select-one', 'select-multiple'], ol: ['1', 'a', 'A', 'i', 'I'], menu: ['popup', 'toolbar'],
};
    

demicm.name = {
    meta: ['abstract', 'author', 'classification', 'copyright', 'description', 'distribution', 'web',
    'intranet', 'doc-class', 'doc-rights', 'doc-type', 'DownloadOptions', 'expires', 'generator', 'googlebot',
    'noarchive', 'nofollow', 'noindex', 'nosnippet', 'keywords', 'MSSmartTagsPreventParsing', 'name', 'owner',
    'progid', 'rating', 'refresh', 'reply-to', 'resource-type', 'revisit-after', 'robots', 'Template'], 
    other: 'elemName'
};

demicm.lang = [
    'ab', 'aa', 'af', 'sq', 'am', 'ar', 'hy', 'as', 'ay', 'az', 'ba', 'eu', 'bn', 'dz', 'ji', 'yo', 'zu',
    'bh', 'bi', 'br', 'bg', 'my', 'be', 'km', 'ca', 'zh', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et',
    'fo', 'fa', 'fa', 'fj', 'fi', 'fr', 'fy', 'gl', 'gd', 'gv', 'ka', 'de', 'el', 'kl', 'gn', 'gu', 'ha',
    'he', 'iw', 'hi', 'hu', 'is', 'id', 'in', 'ia', 'ie', 'iu', 'ik', 'ga', 'it', 'ja', 'jv', 'kn', 'ks', 
    'kk', 'rw', 'ky', 'rn', 'ko', 'ku', 'lo', 'la', 'lv', 'li', 'ln', 'lt', 'mk', 'mg', 'ms', 'ml', 'mt', 
    'mi', 'mr', 'mo', 'mn', 'na', 'ne', 'no', 'oc', 'or', 'om', 'ps', 'pl', 'pt', 'pa', 'qu', 'rm', 'ro', 
    'ru', 'sm', 'sg', 'sa', 'sr', 'sh', 'st', 'tn', 'sn', 'sd', 'si', 'ss', 'sk', 'sl', 'so', 'es', 'su',
    'sw', 'sv', 'tl', 'tg', 'ta', 'tt', 'te', 'th', 'bo', 'ti', 'to', 'ts', 'tr', 'tk', 'tw', 'ug', 'uk', 
    'ur', 'uz', 'vi', 'vo', 'cy', 'wo', 'xh', 'yi'
];

demicm.charset = [
    'UTF-8', 'ISO-8859-1', 'ISO-8859-2', 'ISO-8859-3', 'US_ASCII', 'ISO-2022-JP-2', 'latin-greek',
    'GBK', 'GB18030', 'UTF-7', 'UTF-16LE', 'UTF32BE', 'GB2312', 'Big5', 'IBM277', 'windows-874'
];

demicm.MIMEType = [
    'image/jpg', 'image/gif', 'image/tiff', 'application/x-www-form-urlencoded', 'application/json', 'video/ogg',
    'application/ecmascript', 'application/javascript', 'application/x-ecmascript', 'application/x-javascript',
    'application/sql', 'application/rtf', 'audio/mp4', 'audio/mpeg', 'message/global', 'message/http', 'model/mesh', 
    'multipart/ford-data', 'multipart/digest','text/ecmascript', 'text/javascript', 'text/javascript1.0', 
    'text/javascript1.1', 'text/javascript1.2', 'text/javascript1.3', 'text/javascript1.4', 'text/javascript1.5', 
    'text/jscript', 'text/livescript', 'text/x-ecmascript', 'text/x-javascript', 'text/css', 'text/xml', 'text/plain', 
    'text/html', 'application/java-archive', 'application/java-vm', 'application/x-shockwave-flash', 'video/x-msvideo'
];

demicm.dateTime = [
    '2011-11-12T14:54Z', '2011-11-12T14:54:39Z', '2011-11-12T14:54:39.929Z', '2011-11-12T14:54+0000',
    '2011-11-12T14:54:39.929+0000', '2011-11-12T14:54+00:00', '2011-11-12T14:54:39+00:00', '2011-11-12T14:54:39.929+00:00',
    '2011-11-12T06:54-0800', '2011-11-12T06:54:39-0800', '2011-11-12T06:54:39.929-0800', '2011-11-12T06:54-08:00',
    '2011-11-12T06:54:39-08:00', '2011-11-12T06:54:39.929-08:00', '2011-11-12 14:54Z', '2011-11-12 14:54:39Z',
    '2011-11-12 14:54:39.929Z', '2011-11-12 14:54+0000', '2011-11-12 14:54:39+0000', '2011-11-12 14:54:39.929+0000',
    '2011-11-12 14:54+00:00', '2011-11-12 14:54:39+00:00', '2011-11-12 14:54:39.929+00:00', '2011-11-12 06:54-0800',
    '2011-11-12 06:54:39-0800', '2011-11-12 06:54:39.929-0800', '2011-11-12 06:54-08:00', '2011-11-12 06:54:39-08:00',
    '2011-11-12 06:54:39.929-08:00', '2011-W46', '2011', '0001', 'PT4H18M3S', '4h 18m 3s', 'Z', '+0000', '+00:00', '-0800',
    '-08:00', '2011-11-12T14:54', '2011-11-12T14:54:39', '2011-11-12T14:54:39.929', '2011-11-12 14:54', '2011-11-12 14:54:39',
    '2011-11-12 14:54:39.929', '11-12', '14:54', '2011-11-12', '2011-11', '14:54:39', '14:54:39.929', '2011-11-12T14:54:39+0000'
];

demicm.autocomplete = [
    'on', 'off', 'name', 'honorific-prefix', 'given-name', 'additional-name', 'family-name', 
    'honorific-suffix', 'nickname', 'organization-title', 'organization', 'street-address', 'address-line1',
    'address-line2', 'address-line3', 'locality', 'region', 'country', 'country-name', 'postal-code', 'cc-name',
    'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-exp', 'cc-exp-month', 'cc-exp-year',
    'cc-csc', 'cc-type', 'language', 'bday', 'bday-day', 'bday-month', 'bday-year', 'sex', 'url', 'photo', 'tel',
    'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-local-prefix', 'tel-local-suffix',
    'tel-extension', 'email', 'impp', 'shipping', 'billing'
];

demicm.nameSpace = ['http://www.w3.org/1999/xhtml', 'http://www.w3.org/2000/svg'];

demicm.bool = [true, false];

demicm.string = [',', '...', ' ', '', '?', '/', '[]', '{}', '=+-_', ')(*^%$#@!', '`', 'demicm', ];

demicm.alpha = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

demicm.normalNum = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29,
    30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
]; 
demicm.normalPct = ['0%', '5%', '10%', '20%', '30%', '50%', '80%', '100%']; 
demicm.normalNumPct = demicm.normalNum.concat(demicm.normalPct); 
demicm.normalNumPctStar = demicm.normalNumPct.concat(['*']); 

demicm.dirtyNum = [
    0x7f, -0x7f, 0xff, -0xff, 0x7fff, -0x7fff, 0xffff, -0xffff, 0x7fffffff, -0x7fffffff, 0xffffffff, -0xffffffff,
    0, 0.1111, -0.1111, -1, 5e6, -7e6, 8e-6, -8e-6, 2e100, -2e100, 7500000000, -7500000000, 4400000000, -4400000000
];
demicm.dirtyPct = ['0%', '-1%', '-50%', '101%', '500%'];
demicm.dirtyNumPct = demicm.dirtyNum.concat(demicm.dirtyPct);

demicm.negativeNum = [-1, -5, -10, -20, -30, -50, -100, -500];

demicm.intNum = demicm.normalNum.concat(demicm.negativeNum);

demicm.num = demicm.normalNum.concat(demicm.dirtyNum);
demicm.pct = demicm.normalPct.concat(demicm.dirtyPct);
demicm.numPct = demicm.num.concat(demicm.pct);

demicm.dirtyObj = [null, undefined, [], {}];

demicm.propValues = {
    wrap: {type: 'string', normalValue: ['off', 'virtual', 'physical'], dirtyValue: ['physical'], readOnly: false},
    behavior: {type: 'string', normalValue: ['scroll', 'slide', 'alternate'], dirtyValue: ['slide'], readOnly: false},
    direction: {type: 'string', normalValue: ['right', 'left'], dirtyValue: [], readOnly: false},
    contentEditable: {type: 'string', normalValue: ['true', 'false', 'inherit'], dirtyValue: ['true'], readOnly: false},
    accessKey: {type: 'string', normalValue: demicm.alpha, dirtyValue: [], readOnly: false}, 
    dir: {type: 'string', normalValue: ['ltr', 'rtl', 'auto'], dirtyValue: ['rtl'], readOnly: false},
    lang: {type: 'string', normalValue: demicm.lang, dirtyValue: [], readOnly: false}, 
    hreflang: {type: 'string', normalValue: demicm.lang, dirtyValue: [], readOnly: false}, 
    srclang: {type: 'string', normalValue: demicm.lang, dirtyValue: [], readOnly: false}, 
    title: {type: 'string', normalValue: ['demiTitle'], dirtyValue: [], readOnly: false},
    name: {type: 'string', normalValue: ['demicmNodeName'], dirtyValue: [], readOnly: false},
    type: {type: 'string', normalValue: [], dirtyValue: [], readOnly: false},
    wholeText: {type: 'string', normalValue: [], dirtyValue: [], readOnly: true},
    // objectSpec => non-element object
    dataset: {type: 'objectSpec', normalValue: [{id: 'user', user: 'demi6od', dateOfBirty: '1960-10-03'}], dirtyValue: [], readOnly: false},
    classList: {type: 'objectSpec', normalValue: [{0: 'a', 1: 'b', 2: 'c', length: 3}], dirtyValue: [], readOnly: false},
    className: {type: 'string', normalValue: ['demiClassName'], dirtyValue: [], readOnly: false},
    position: {type: 'string', normalValue: ['static', 'relative', 'absolute', 'fixed'], dirtyValue: [], readOnly: false},
    style: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    attributes: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    tagName: {type: 'string', normalValue: ['demiTagName'], dirtyValue: [], readOnly: false},
    textContent: {type: 'string', normalValue: [], dirtyValue: [], readOnly: true},
    localName: {type: 'string', normalValue: [], dirtyValue: [], readOnly: true},
    prefix: {type: 'string', normalValue: ['demicmPrefix'], dirtyValue: [], readOnly: false},
    namespaceURI: {type: 'string', normalValue: demicm.nameSpace, dirtyValue: [], readOnly: false},
    nodeValue: {type: 'string', normalValue: ['demicmTextValue'], dirtyValue: [], readOnly: false},
    nodeName: {type: 'string', normalValue: [], dirtyValue: [], readOnly: true},
    text: {type: 'string', normalValue: 'demicmText', dirtyValue: [], readOnly: false},
    shape: {type: 'string', normalValue: ['rect', 'circ', 'poly'], dirtyValue: [], readOnly: false},
    rev: {type: 'string', normalValue: ['alternate', 'stylesheet', 'start', 'next', 'prev', 'contents', 'index',
        'glossary', 'copyright', 'chapter', 'section', 'subsection', 'appendix', 'help', 'bookmark', 'nofollow',
        'licence', 'tag', 'friend'], dirtyValue: [], readOnly: false},
    rel: {type: 'string', normalValue: ['alternate', 'stylesheet', 'start', 'next', 'prev', 'contents', 'index',
        'glossary', 'copyright', 'chapter', 'section', 'subsection', 'appendix', 'help', 'bookmark', 'nofollow', 
        'licence', 'tag', 'friend'], dirtyValue: [], readOnly: false},
    ping: {type: 'string', normalValue: [], dirtyValue: [], readOnly: false},
    charset: {type: 'string', normalValue: demicm.charset, dirtyValue: [], readOnly: false},
    acceptCharset: {type: 'string', normalValue: demicm.charset, dirtyValue: [], readOnly: false},
    encoding: {type: 'string', normalValue: demicm.charset, dirtyValue: [], readOnly: false},
    alt: {type: 'string', normalValue: ['alt'], dirtyValue: [], readOnly: false},
    standby: {type: 'string', normalValue: ['demicmStandby'], dirtyValue: [], readOnly: false},
    clear: {type: 'string', normalValue: ['left', 'right', 'both'], dirtyValue: ['none'], readOnly: false},
    labels: {type: 'object', normalValue: [], dirtyValue: [], readOnly: false},
    validationMessage: {type: 'string', normalValue: ['demicmValidationFailureMessage'], dirtyValue: [], readOnly: false},
    validity: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    value: {type: 'string', normalValue: ['demicmTextValue'], dirtyValue: [], readOnly: false},
    defaultValue: {type: 'string', normalValue: ['demicmtextValue'], dirtyValue: [], readOnly: false},
    align: {type: 'string', normalValue: ['left', 'right', 'middle', 'top', 'bottom', 'absmiddle', 'baseline', 'absbottom'], 
        dirtyValue: ['center', 'justify', 'char'], readOnly: false},
    vAlign: {type: 'string', normalValue: ['top', 'middle', 'bottom', 'baseline'], dirtyValue: [], readOnly: false},
    ch: {type: 'string', normalValue: demicm.alpha, dirtyValue: [], readOnly: false},
    dateTime: {type: 'string', normalValue: demicm.dateTime, dirtyValue: [], readOnly: false},
    autocomplete: {type: 'string', normalValue: demicm.autocomplete, dirtyValue: ['on'], readOnly: false},
    version: {type: 'string', normalValue: ['-//W3C//DTD HTML 4.01//EN'], dirtyValue: [], readOnly: true},
    srcdoc: {type: 'string', normalValue: ['<a>demiFoo<p>demiBar</p></a>'], dirtyValue: [], readOnly: false},
    scrolling: {type: 'string', normalValue: ['auto', 'yes', 'no'], dirtyValue: ['auto'], readOnly: false},
    sandbox: {type: 'string', normalValue: ['', 'allow-same-origin', 'allow-top-navigation', 'allow-forms', 'allow-scripts'], 
        dirtyValue: [], readOnly: false},
    frameBorder: {type: 'string', normalValue: ['0', '1'], dirtyValue: ['0'], readOnly: false},
    crossOrigin: {type: 'string', normalValue: ['anonymous', 'use-credentials'], dirtyValue: ['use-credentials'], readOnly: false},
    selectionDirection: {type: 'string', normalValue: ['forward', 'backward', 'none'], dirtyValue: [], readOnly: false},
    // objectdate => date object
    valueAsDate: {type: 'objectdate', normalValue: [], dirtyValue: [], readOnly: false},
    placeholder: {type: 'string', normalValue: ['demicmHintText'], dirtyValue: [], readOnly: false},
    pattern: {type: 'string', normalValue: ['.*'], dirtyValue: [], readOnly: false},
    media: {type: 'string', normalValue: ['screen', 'tty', 'tv', 'projection', 'handheld', 'print', 'braille', 'aural', 'all'],
        dirtyValue: [], readOnly: false},
    valueType: {type: 'string', normalValue: ['data', 'ref', 'object'], dirtyValue: [], readOnly: false},
    label: {type: 'string', normalValue: ['demicmLabelText'], dirtyValue: [], readOnly: false},
    rules: {type: 'string', normalValue: ['none', 'groups', 'rows', 'cols', 'all'], dirtyValue: [], readOnly: false},
    frame: {type: 'string', normalValue: ['void', 'above', 'below', 'hsides', 'lhs', 'rhs', 'vsides', 'box', 'border'],
        dirtyValue: [], readOnly: false},
    files: {type: 'objectList', normalValue: [], dirtyValue: [], readOnly: true},
    dirName: {type: 'string', normalValue: ['demicmDirName'], dirtyValue: [], readOnly: false},
    accept: {type: 'string', normalValue: demicm.MIMEType, dirtyValue: [], readOnly: false},
    codeType: {type: 'string', normalValue: demicm.MIMEType, dirtyValue: [], readOnly: false},
    keytype: {type: 'string', normalValue: ['rsa', 'dsa', 'ec'], dirtyValue: [], readOnly: false},
    challenge: {type: 'string', normalValue: ['demicmChallengeValue'], dirtyValue: [], readOnly: false},
    control: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    sheet: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    sizes: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    areas: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    event: {type: 'string', normalValue: [], dirtyValue: [], readOnly: false},
    scope: {type: 'string', normalValue: ['col', 'row', 'colgroup', 'rowgroup'], dirtyValue: [], readOnly: false},

    // stringId
    hash: {type: 'stringHashId', normalValue: ['#6'], dirtyValue: [], readOnly: false},
    search: {type: 'stringQueryId', normalValue: ['?id=6'], dirtyValue: [], readOnly: false},
    useMap: {type: 'stringHashId', normalValue: ['#6'], dirtyValue: [], readOnly: false},
    htmlFor: {type: 'stringId', normalValue: ['6'], dirtyValue: [], readOnly: false},
    headers: {type: 'stringId', normalValue: ['6'], dirtyValue: [], readOnly: false},
    list: {type: 'stringId', normalValue: ['6'], dirtyValue: [], readOnly: false},

    // stringColor => color string type
    alink: {type: 'stringColor', normalValue: demicm.color, dirtyValue: [], readOnly: false},
    vLink: {type: 'stringColor', normalValue: demicm.color, dirtyValue: [], readOnly: false},
    link: {type: 'stringColor', normalValue: demicm.color, dirtyValue: [], readOnly: false},
    bgColor: {type: 'stringColor', normalValue: demicm.color, dirtyValue: [], readOnly: false},
    aLink: {type: 'stringColor', normalValue: demicm.color, dirtyValue: [], readOnly: false},

    // stringPos => position string type
    coords: {type: 'stringPos', normalValue: ['10,10,5', '2,2,5,5'], dirtyValue: ['-1,-1,-1', '-1,-1,-2,-2'], readOnly: false},

    // DOMTree node iterator
    lastElementChild: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    firstElementChild: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    nextElementSibling: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    previousElementSibling: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    offsetParent: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    ownerDocument: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    nextSibling: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    previousSibling: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    lastChild: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    firstChild: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    childNodes: {type: 'objectList', normalValue: [], dirtyValue: [], readOnly: true},
    parentNode: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    parentElement: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    contentWindow: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    contentDocument: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    form: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    // objectList => element collection
    children: {type: 'objectList', normalValue: [], dirtyValue: [], readOnly: true},
    elements: {type: 'objectList', normalValue: [], dirtyValue: [], readOnly: true},

    // meta element
    httpEquiv: {type: 'string', normalValue: ['cache-control', 'content-language', 'content-type', 'date', 'expires', 
        'last-modified', 'location', 'refresh', 'set-cookie', 'window-target'], dirtyValue: [], readOnly: false},
    content: {type: 'string', normalValue: ['text/css', 'iso-8859-1', '31 Dec 2008'], dirtyValue: [], readOnly: false},
    scheme: {type: 'string', normalValue: ['YYYY-MM-DD', 'ISBN'], dirtyValue: [], readOnly: false},

    // Table & Select
    tFoot: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    tHead: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    caption: {type: 'object', normalValue: [], dirtyValue: [], readOnly: true},
    selectedOptions: {type: 'objectList', normalValue: [], dirtyValue: [], readOnly: true},
    tBodies: {type: 'objectList', normalValue: [], dirtyValue: [], readOnly: true},
    cells: {type: 'objectList', normalValue: [], dirtyValue: [], readOnly: true},
    options: {type: 'objectList', normalValue: [], dirtyValue: [], readOnly: true},

    cellPadding: {type: 'number', normalValue: demicm.normalNumPct, dirtyValue: demicm.dirtyNumPct, readOnly: false},
    cellSpacing: {type: 'number', normalValue: demicm.normalNumPct, dirtyValue: demicm.dirtyNumPct, readOnly: false},
    selectedIndex: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    cellIndex: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: true},
    rowIndex: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: true},
    sectionRowIndex: {type: 'number', dirtyValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: true},
    summary: {type: 'string', normalValue: ['demicmSumText'], dirtyValue: [], readOnly: false},
    axis: {type: 'string', normalValue: ['demicmCategoryName'], dirtyValue: [], readOnly: false},
    abbr: {type: 'string', normalValue: ['demicmAbbrText'], dirtyValue: [], readOnly: false},

    // Form
    formNoValidate: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    formMethod: {type: 'string', normalValue: ['get', 'post'], dirtyValue: ['post'], readOnly: false},
    method: {type: 'string', normalValue: ['get', 'post'], dirtyValue: ['post'], readOnly: false},
    formEnctype: {type: 'string', normalValue: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'], 
        dirtyValue: [], readOnly: false},
    enctype: {type: 'string', normalValue: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'], 
        dirtyValue: [], readOnly: false},

    // Audio & Video
    defaultMuted: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [false], readOnly: false},
    muted: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [false], readOnly: false},
    controls: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    autoplay: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    ended: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    paused: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    seeking: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    loop: {type: 'number', normalValue: demicm.normalNum, dirtyValue: ['infinite'], readOnly: false},
    volume: {type: 'number', normalValue: [1.0, 0.5, 0.0], dirtyValue: demicm.dirtyNum, readOnly: false},
    playbackRate: {type: 'number', normalValue: [1, 0.5, 2, -1], dirtyValue: demicm.dirtyNum, readOnly: false},
    defaultPlaybackRate: {type: 'number', normalValue: [1, 0.5, 2, -1], dirtyValue: demicm.dirtyNum, readOnly: false},
    duration: {type: 'number', normalValue: [100], dirtyValue: demicm.dirtyNum, readOnly: true},
    startTime: {type: 'number', normalValue: [0, 5, 10, 100], dirtyValue: demicm.dirtyNum, readOnly: false},
    initialTime: {type: 'number', normalValue: [0, 5, 10, 100], dirtyValue: demicm.dirtyNum, readOnly: false},
    currentTime: {type: 'number', normalValue: [0, 5, 10, 100], dirtyValue: demicm.dirtyNum, readOnly: false},
    readyState: {type: 'number', normalValue: [0, 1, 2, 3, 4], dirtyValue: demicm.dirtyNum, readOnly: false},
    networkState: {type: 'number', normalValue: [0, 1, 2, 3], dirtyValue: demicm.dirtyNum, readOnly: false},
    kind: {type: 'string', normalValue: ['captions', 'chapters', 'descriptions', 'metadata', 'subtitles'], dirtyValue: [], readOnly: false},
    poster: {type: 'string', normalValue: ['demicmImg.gif'], dirtyValue: [], readOnly: false},
    mediaGroup: {type: 'string', normalValue: ['groupName'], dirtyValue: [], readOnly: false},
    preload: {type: 'string', normalValue: ['auto', 'metadata', 'none'], dirtyValue: ['auto'], readOnly: false},
    currentSrc: {type: 'string', normalValue: ['demicmVideo.avi'], dirtyValue: [], readOnly: true},
    textTracks: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    track: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    controller: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    seekable: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    played: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    buffered: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},
    error: {type: 'objectSpec', normalValue: [], dirtyValue: [], readOnly: false},

    // URL related
    href: {type: 'string', normalValue: [demicm.URL+'demicmFuzz.html'], dirtyValue: [], readOnly: false},
    origin: {type: 'string', normalValue: ['http://127.0.0.1:80'], dirtyValue: [], readOnly: false},
    baseURI: {type: 'string', normalValue: ['http://127.0.0.1'], dirtyValue: [], readOnly: false},
    host: {type: 'string', normalValue: ['127.0.0.1:80'], dirtyValue: [], readOnly: false},
    protocol: {type: 'string', normalValue: ['http', 'https', 'ftp', 'file'], dirtyValue: [], readOnly: false},
    hostname: {type: 'string', normalValue: ['127.0.0.1'], dirtyValue: [], readOnly: false},
    port: {type: 'string', normalValue: ['80'], dirtyValue: [], readOnly: false},
    pathname: {type: 'string', normalValue: ['demicm/demicmFuzz.html'], dirtyValue: [], readOnly: false},


    formTarget: {type: 'string', normalValue: ['_blank', '_self', '_parent', '_top', demicm.URL+'demicmTarget.html'],
        dirtyValue: [], readOnly: false},
    target: {type: 'string', normalValue: ['_blank', '_self', '_parent', '_top', demicm.URL+'demicmTarget.html'],
        dirtyValue: [], readOnly: false},

    profile: {type: 'string', normalValue: [demicm.URL+'demicmProfile'], dirtyValue: [], readOnly: false},
    cite: {type: 'string', normalValue: [demicm.URL+'demicmDoc'], dirtyValue: [], readOnly: false},
    lowsrc: {type: 'string', normalValue: [demicm.URL+'demicmImg.gif'], dirtyValue: [], readOnly: false},
    src: {type: 'string', normalValue: [demicm.URL+'demicmImg.gif'], dirtyValue: [], readOnly: false},
    background: {type: 'string', normalValue: [demicm.URL+'demicmImg.gif'], dirtyValue: [], readOnly: false},
    codeBase: {type: 'string', normalValue: [demicm.URL+'java/'], dirtyValue: [], readOnly: false},
    code: {type: 'string', normalValue: [demicm.URL+'demicmCodeBase.class'], dirtyValue: [], readOnly: false},
    archive: {type: 'string', normalValue: [demicm.URL+'demicmAchive.java'], dirtyValue: [], readOnly: false},
    manifest: {type: 'string', normalValue: [demicm.URL+'demicmMani.cache'], dirtyValue: [], readOnly: false},
    data: {type: 'string', normalValue: [demicm.URL+'demicmData.swf'], dirtyValue: [], readOnly: false},
    longDesc: {type: 'string', normalValue: [demicm.URL+'demicmDesc.txt'], dirtyValue: [], readOnly: false},
    download: {type: 'string', normalValue: [demicm.URL+'demicmDownload.txt'], dirtyValue: [], readOnly: false},
    formAction: {type: 'string', normalValue: [demicm.URL+'demicmFuzz.html'], dirtyValue: [], readOnly: false},
    action: {type: 'string', normalValue: [demicm.URL+'demicmFuzz.html'], dirtyValue: [], readOnly: false},

    // boolean type
    noWrap: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [false], readOnly: false},
    default: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    spellcheck: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    isContentEditable: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: true},
    hidden: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    draggable: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    translate: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    noHref: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [false], readOnly: false},
    willValidate: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    disabled: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [false], readOnly: false},
    autofocus: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    open: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    compact: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    noValidate: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    noShade: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    complete: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [false], readOnly: true},
    isMap: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    incremental: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    required: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [false], readOnly: false},
    readOnly: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [false], readOnly: false},
    multiple: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    indeterminate: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [false], readOnly: false},
    checked: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    defaultChecked: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    declare: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    reversed: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    selected: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    defaultSelected: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    defer: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},
    async: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [true], readOnly: false},

    // number type
    border: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    tabIndex: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    childElementCount: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: true},
    scrollHeight: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    scrollWidth: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    scrollTop: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    scrollLeft: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    scrollamount: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    scrolldelay: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    clientHeight: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    clientWidth: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    clientTop: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    clientLeft: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    offsetHeight: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    offsetWidth: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    offsetTop: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    offsetLeft: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    height: {type: 'number', normalValue: demicm.normalNumPct, dirtyValue: demicm.dirtyNumPct, readOnly: false},
    width: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    naturalWidth: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    naturalHeight: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    videoHeight: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    videoWidth: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    marginWidth: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    marginHeight: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    min: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    maxLength: {type: 'number', normalValue: [100, 200, 300], dirtyValue: demicm.dirtyNum, readOnly: false},
    max: {type: 'number', normalValue: [100, 200, 300], dirtyValue: demicm.dirtyNum, readOnly: false},
    nodeType: {type: 'number', normalValue: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], dirtyValue: demicm.dirtyNum, readOnly: false},
    optimum: {type: 'number', normalValue: [5, 10, 15], dirtyValue: demicm.dirtyNum, readOnly: false},
    high: {type: 'number', normalValue: [20, 40], dirtyValue: demicm.dirtyNum, readOnly: false},
    low: {type: 'number', normalValue: [1, 5], dirtyValue: demicm.dirtyNum, readOnly: false},
    span: {type: 'number', normalValue: [1, 5, 10], dirtyValue: demicm.dirtyNum, readOnly: false},
    chOff: {type: 'number', normalValue: [1, 5, 10], dirtyValue: demicm.dirtyNum, readOnly: false},
    length: {type: 'number', normalValue: [128, 256], dirtyValue: demicm.dirtyNum, readOnly: false},
    size: {type: 'number', normalValue: [50, 100], dirtyValue: demicm.dirtyNum, readOnly: false},
    y: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    x: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    vspace: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    hspace: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    selectionEnd: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    selectionStart: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    valueAsNumber: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    step: {type: 'number', normalValue: [-3, 0, 3, 6], dirtyValue: demicm.dirtyNum, readOnly: false},
    start: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    index: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    textLength: {type: 'number', normalValue: [128, 256], dirtyValue: demicm.dirtyNum, readOnly: false},
    rows: {type: 'number', normalValue: demicm.normalNumPctStar, dirtyValue: demicm.dirtyNum, readOnly: false},
    cols: {type: 'number', normalValue: demicm.normalNumPctStar, dirtyValue: demicm.dirtyNum, readOnly: false},
    rowSpan: {type: 'number', normalValue: [1, 5, 10], dirtyValue: demicm.dirtyNum, readOnly: false},
    colSpan: {type: 'number', normalValue: [1, 5, 10], dirtyValue: demicm.dirtyNum, readOnly: false},

    // webkit special
    webkitDisplayingFullscreen: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [], readOnly: false},
    webkitSupportsFullscreen: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [], readOnly: false},
    webkitClosedCaptionsVisible: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [], readOnly: false},
    webkitHasClosedCaptions: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [], readOnly: false},
    webkitPreservesPitch: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [], readOnly: false},
    webkitGrammar: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [], readOnly: false},
    webkitSpeech: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [], readOnly: false},
    webkitdirectory: {type: 'boolean', normalValue: demicm.bool, dirtyValue: [], readOnly: false},
    webkitDroppedFrameCount: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    webkitDecodedFrameCount: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    webkitVideoDecodedByteCount: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    webkitAudioDecodedByteCount: {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum, readOnly: false},
    webkitdropzone: {type: 'string', normalValue: [], dirtyValue: [], readOnly: false},
    webkitPseudo: {type: 'string', normalValue: [], dirtyValue: [], readOnly: false},
    webkitShadowRoot: {type: 'object', normalValue: [], dirtyValue: [], readOnly: false},
    onwebkitneedkey: {type: 'object', normalValue: [], dirtyValue: [], readOnly: false},
    onwebkitkeymessage: {type: 'object', normalValue: [], dirtyValue: [], readOnly: false},
    onwebkitkeyerror: {type: 'object', normalValue: [], dirtyValue: [], readOnly: false},
    onwebkitkeyadded: {type: 'object', normalValue: [], dirtyValue: [], readOnly: false},
    webkitEntries: {type: 'object', normalValue: [], dirtyValue: [], readOnly: false},

    // Enumeration
    ALLOW_KEYBOARD_INPUT: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    ELEMENT_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    ATTRIBUTE_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    TEXT_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    CDATA_SECTION_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    ENTITY_REFERENCE_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    ENTITY_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    PROCESSING_INSTRUCTION_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    COMMENT_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    DOCUMENT_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    DOCUMENT_TYPE_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    DOCUMENT_FRAGMENT_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    NOTATION_NODE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    DOCUMENT_POSITION_DISCONNECTED: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    DOCUMENT_POSITION_PRECEDING: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    DOCUMENT_POSITION_FOLLOWING: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    DOCUMENT_POSITION_CONTAINS: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    DOCUMENT_POSITION_CONTAINED_BY: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    NETWORK_EMPTY: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    NETWORK_IDLE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    NETWORK_LOADING: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    NETWORK_NO_SOURCE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    HAVE_NOTHING: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    HAVE_METADATA: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    HAVE_CURRENT_DATA: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    HAVE_FUTURE_DATA: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    HAVE_ENOUGH_DATA: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    NONE: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    LOADING: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    LOADED: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
    ERROR: {type: 'number', normalValue: [], dirtyValue: [], readOnly: true},
};


demicm.funcBlackList = [
    'appendChild', 'insertBefore', 'removeChild', 'replaceChild', 'cloneNode',
    'insertAdjacentElement', 'insertAdjacentHTML', 'insertAdjacentText',
    'dispatchEvent', 'removeEventListener', 'addEventListener',
    'webkitCancelKeyRequest', 'webkitAddKey', 'webkitGenerateKeyRequest',
    'reload', 'go', 'assign', 'navigate', 'open', 'load', 'close', 'submit', 'click',
    'print', 'alert', 'prompt', 'showModalDialog', 'confirm',
    'setAttributeNode', 'setAttributeNodeNS', 'removeAttributeNode', 'querySelector', 'querySelectorAll', // TODO
];

demicm.DOMPos = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];

demicm.dirtyParamVals = demicm.num.concat([null, undefined, 'pink', screen, Infinity, false, true, eval, [], {}]);

demicm.funcValues = {
    getElementById: [
		{type: 'nodeObj'},
		{type: 'string', normalValue: ['objectId'], dirtyValue: []},
    ],
    getElementsByName: [
		{type: 'nodeList'},
		{type: 'string', normalValue: ['objectName'], dirtyValue: []},
    ],
    getElementsByTagName: [
		{type: 'nodeList'},
		{type: 'string', normalValue: ['tagName'], dirtyValue: []},
    ],
    getElementsByTagNameNS: [
		{type: 'nodeList'},
		{type: 'string', normalValue: demicm.nameSpace, dirtyValue: []},
        {type: 'string', normalValue: ['tagName'], dirtyValue: []},
    ],
    getElementsByClassName: [
		{type: 'nodeList'},
		{type: 'string', normalValue: ['className'], dirtyValue: []},
    ],
    item: [
		{type: 'nodeObj'},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    namedItem: [
		{type: 'nodeObj'},
		{type: 'string', normalValue: ['objectIdOrName'], dirtyValue: []},
    ],
    click: [
		{type: ''},
    ],
    focus: [
		{type: ''},
    ],
    blur: [
		{type: ''},
    ],
    scrollIntoView: [
		{type: ''},
		{type: 'boolean', normalValue: [true, false], dirtyValue: [false]},
    ],
    scrollIntoViewIfNeeded: [
		{type: ''},
		{type: 'boolean', normalValue: [true, false], dirtyValue: [false]},
    ],
    scrollByLines: [
		{type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    scrollByPages: [
		{type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    hasChildNodes: [
		{type: 'boolean'},
    ],
    normalize: [
		{type: ''},
    ],
    isSupported: [
		{type: 'boolean'},
		{type: 'string', normalValue: ['Core'], dirtyValue: []},
        {type: 'string', normalValue: ['1.0', '2.0', '3.0'], dirtyValue: demicm.dirtyNum},
    ],
    lookupPrefix: [
		{type: 'string'},
		{type: 'string', normalValue: ['http://127.0.0.1:8001/grinder/'], dirtyValue: []},
    ],
    lookupNamespaceURI: [
		{type: 'string'},
		{type: 'string', normalValue: ['demicmPrefix'], dirtyValue: []},
    ],
    isDefaultNamespace: [
		{type: 'boolean'},
		{type: 'string', normalValue: demicm.nameSpace, dirtyValue: []},
    ],
    isSameNode: [
		{type: 'boolean'},
		{type: 'nodeObj', normalValue: [], dirtyValue: []},
    ],
    isEqualNode: [
		{type: 'boolean'},
		{type: 'nodeObj', normalValue: [], dirtyValue: []},
    ],
    compareDocumentPosition: [
		{type: 'number'},
		{type: 'nodeObj', normalValue: [], dirtyValue: []},
    ],
    contains: [
		{type: 'boolean'},
		{type: 'nodeObj', normalValue: [], dirtyValue: []},
    ],
    submit: [
		{type: ''},
    ],
    reset: [
		{type: ''},
    ],

    // input element
    stepUp: [
		{type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    stepDown: [
		{type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    select: [
		{type: ''},
    ],
    setRangeText: [
		{type: ''},
		{type: 'string', normalValue: ['text'], dirtyValue: []},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
        {type: 'number', normalValue: [0, 1, 2, 3], dirtyValue: demicm.dirtyNum},
    ],
    setSelectionRange: [
		{type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
        {type: 'string', normalValue: ['forward', 'backward', 'none'], dirtyValue: ['backward']}
    ],

    // Canvas
    toDataURL: [
		{type: 'string'},
		{type: 'string', normalValue: ['image/png', 'image/webp', 'image/jpeg'], dirtyValue: []},
        {type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    getContext: [
		{type: 'contextObj'},
		{type: 'string', normalValue: ['2d', 'webgl'], dirtyValue: []},
    ],

    // SVG
    getSVGDocument: [
		{type: 'SVGDocument'},
    ],

    // Audio & Vedio
    load: [
		{type: ''},
    ],
    canPlayType: [
		{type: 'string'},
		{type: 'string', normalValue: ['video/ogg', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/ogg', 'audio/mp4',
            'video/ogg; codecs="theora, vorbis"', 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"', 
            'video/webm; codecs="vp8.0, vorbis"', 'audio/ogg; codecs="vorbis"', 'audio/mp4; codecs="mp4a.40.5"'], dirtyValue: []},
    ],
    play: [
		{type: ''},
    ],
    pause: [
		{type: ''},
    ],
    addTextTrack: [
		{type: 'textTrackObj_new'},
		{type: 'string', normalValue: ["subtitles", "caption", "descriptions", "chapters", "metadata"], dirtyValue: []},
        {type: 'string', normalValue: ['label'], dirtyValue: []},
        {type: 'string', normalValue: demicm.lang, dirtyValue: []},
    ],

    // Table
    createTHead: [
		{type: 'tHeadObj_new'},
    ],
    deleteTHead: [
		{type: ''},
    ],
    createTFoot: [
		{type: 'tFootObj_new'},
    ],
    deleteTFoot: [
		{type: ''},
    ],
    createTBody: [
		{type: 'tBodyObj_new'},
    ],
    createCaption: [
		{type: 'captionObj_new'},
    ],
    deleteCaption: [
		{type: ''},
    ],
    insertRow: [
		{type: 'rowObj_new'},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    deleteRow: [
		{type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    insertCell: [
		{type: 'cellObj_new'},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    deleteCell: [
		{type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],

    // Select
    add: [
		{type: ''},
		{type: 'optionObj', normalValue: [], dirtyValue: []},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    remove: [
		{type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    checkValidity: [
		{type: 'boolean'},
    ],
    setCustomValidity: [
		{type: ''},
		{type: 'string', normalValue: ['erroText'], dirtyValue: []},
    ],

    // Text
    splitText: [
        {type: 'textNode_new'},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    replaceWholeText: [
        {type: ''},
        {type: 'string', normalValue: [], dirtyValue: []},
    ],
    substringData: [
        {type: 'string'},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    appendData: [
        {type: ''},
        {type: 'string', normalValue: [], dirtyValue: []}
    ],
    insertData: [
        {type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
        {type: 'string', normalValue: [], dirtyValue: []},
    ],
    deleteData: [
        {type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
    ],
    replaceData: [
        {type: ''},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
		{type: 'number', normalValue: demicm.normalNum, dirtyValue: demicm.dirtyNum},
        {type: 'string', normalValue: [], dirtyValue: []},
    ],

    // Attribute
    setAttribute: [
		{type: ''},
		{type: 'string', normalValue: ['attrName'], dirtyValue: []},
		{type: 'string', normalValue: ['attrValue'], dirtyValue: []},
    ],
    setAttributeNS: [
		{type: ''},
		{type: 'string', normalValue: demicm.nameSpace, dirtyValue: []},
		{type: 'string', normalValue: ['attrName'], dirtyValue: []},
		{type: 'string', normalValue: ['attrValue'], dirtyValue: []},
    ],
    setAttributeNode: [
		{type: 'attrObj'},
		{type: 'attrObj', normalValue: [], dirtyValue: []},
    ],
    setAttributeNodeNS: [
		{type: 'attrObj'},
		{type: 'attrObj', normalValue: [], dirtyValue: []},
    ],
    getAttribute: [
		{type: 'string'},
		{type: 'string', normalValue: ['attrName'], dirtyValue: []},
    ],
    getAttributeNS: [
		{type: 'string'},
		{type: 'string', normalValue: demicm.nameSpace, dirtyValue: []},
		{type: 'string', normalValue: ['attrName'], dirtyValue: []},
    ],
    getAttributeNode: [
		{type: 'attrObj'},
		{type: 'string', normalValue: ['attrName'], dirtyValue: []},
    ],
    getAttributeNodeNS: [
		{type: 'attrObj'},
		{type: 'string', normalValue: demicm.nameSpace, dirtyValue: []},
		{type: 'string', normalValue: ['attrName'], dirtyValue: []},
    ],
    removeAttribute: [
		{type: ''},
		{type: 'string', normalValue: ['attrName'], dirtyValue: []},
    ],
    removeAttributeNS: [
		{type: ''},
		{type: 'string', normalValue: demicm.nameSpace, dirtyValue: []},
		{type: 'string', normalValue: ['attrName'], dirtyValue: []},
    ],
    removeAttributeNode: [
		{type: 'attrObj'},
		{type: 'attrObj', normalValue: [], dirtyValue: []},
    ],
    hasAttributes: [
		{type: 'boolean'},
    ],
    hasAttribute: [
		{type: 'boolean'},
		{type: 'string', normalValue: ['attributeName'], dirtyValue: []},
    ],
    hasAttributeNS: [
		{type: 'boolean'},
		{type: 'string', normalValue: demicm.nameSpace, dirtyValue: []},
		{type: 'string', normalValue: ['attributeName'], dirtyValue: []},
    ],

    // Event
    /*
    addEventListener: [
		{type: ''},
		{type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []}
    ],
    removeEventListener: [
		{type: ''},
		{type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []}
    ],
    dispatchEvent: [
		{type: ''},
		{type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []}
    ],*/

    // CSS
    querySelector: [
		{type: 'nodeObj'},
		{type: 'string', normalValue: [], dirtyValue: []},
    ],
    querySelectorAll: [
		{type: 'nodeList'},
		{type: 'string', normalValue: [], dirtyValue: []},
    ],
    getClientRects: [
		{type: 'rectList'},
    ],
    getBoundingClientRect: [
		{type: 'rectObj'},
    ],

    // Webkit
    requestAutocomplete: [
		{type: ''},
    ],
    webkitMatchesSelector: [
		{type: 'boolean'},
		{type: 'string', normalValue: ['CSSSelectors'], dirtyValue: []},
    ],
    webkitCreateShadowRoot: [
		{type: 'rootObj_new'},
    ],
    webkitRequestPointerLock: [
		{type: ''},
    ],
    webkitRequestFullScreen: [
		{type: ''},
    ],
    webkitRequestFullscreen: [
		{type: ''},
    ],
    /*
    webkitGenerateKeyRequest: [
		{type: ''},
		{type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []}
    ],
    webkitAddKey: [
		{type: ''},
		{type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []}
    ],
    webkitCancelKeyRequest: [
		{type: ''},
		{type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []},
        {type: , normalValue: [], dirtyValue: []}
    ],
    */
    webkitEnterFullScreen: [
		{type: ''},
    ],
    webkitEnterFullscreen: [
		{type: ''},
    ],
    webkitExitFullScreen: [
		{type: ''},
    ],
    webkitExitFullscreen: [
		{type: ''},
    ]
};


demicm.styleBlackList = [ ];

demicm.color = [
    'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet',
    'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue',
    'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid',
    'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue',
    'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'YellowGreen',
    'GoldenRod', 'Gray', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 
    'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray',
    'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow',
    'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen',
    'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 
    'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise',
    'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 
    'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 
    'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 
    '#ff0000', '#00ff00', '#0000ff', '#043945', 
    'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(24,25,62)', 'rgba(24,56,22,0.5)',
    'hsl(123,65%,75%)', 'hsla(110,45%,29%,0.3)',
];

demicm.familyName = [
    'Georgia', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', 'Arial', 'Helvetica', 'Arial Black',
    'Impact', 'Lucida Sans Unicode', 'Tahoma', 'Verdana', 'Courier New', 'Lucida Console',
];
demicm.genericFamily = ['serif', 'sans-serif', 'cursive', 'fantasy', 'monospace'];
demicm.fontFamilyValue = convoluteArr(demicm.familyName, demicm.genericFamily, ',', 1);

demicm.unit = ['in', 'cm', 'mm', 'em', 'ex', 'pt', 'pc', 'px'];

demicm.lengthUnit = convoluteArr(demicm.intNum, demicm.unit, '', 1);
demicm.lengthUnitDouble = repeatArr(demicm.lengthUnit, ' ', 2);
demicm.lengthUnitTriple = repeatArr(demicm.lengthUnit, ' ', 3);
demicm.lengthUnitQuadruple = repeatArr(demicm.lengthUnit, ' ', 4);
demicm.lengthUnitQuadrupleComma = repeatArr(demicm.lengthUnit, ',', 4);

demicm.normalNumQuadruple = repeatArr(demicm.normalNum, ' ', 4);
demicm.intNumDouble = repeatArr(demicm.intNum, ' ', 2);

demicm.pctDouble = repeatArr(demicm.pct, ' ', 2);

demicm.pos = ['left', 'right', 'top', 'bottom'];
demicm.posDouble = ['left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center top', 'center center', 'center bottom'];

demicm.angle = convoluteArr(demicm.normalNum, ['deg'], '', 1);

demicm.textShadowValue = convoluteArr(demicm.lengthUnitTriple, demicm.color, ' ', 1);
demicm.boxShadowValue = convoluteArr(demicm.lengthUnitQuadruple, demicm.color, ' ', 1);
demicm.boxShadowValue = demicm.boxShadowValue.concat(convoluteArr(demicm.boxShadowValue, ['inset'], ' ', 1));
demicm.enableBackgroundValue = convoluteArr(['new'], demicm.normalNumQuadruple, ' ', 2);
demicm.orientationValue = demicm.angle.concat(convoluteArr(demicm.angle, ['flip'], ' ', 1));
demicm.clipValue = [];
for(var i=0; i<demicm.lengthUnitQuadrupleComma.length; i++) {
    demicm.clipValue.push('rect(' + demicm.lengthUnitQuadrupleComma[i] + ')');
}
demicm.opacityValue = [];
for(var i=0; i<demicm.normalNum.length; i++) {
    demicm.opacityValue.push(demicm.normalNum[i]/100);
}


demicm.styleValues = {
    //parentRule: [ ],
    //length: [ ],
    //cssText: [ ],
    //alignContent: [ ],
    //alignItems: [ ],
    //alignSelf: [ ],
    //alignmentBaseline: [ ],
    //background: [ ],
    backgroundAttachment: ['scroll', 'fixed', 'inherit'],
    backgroundClip: ['border-box', 'padding-box', 'content-box'],
    backgroundColor: [demicm.color, 'transparent', 'inherit'],
    backgroundImage: ['url(' + demicm.URL + 'demicmImg.gif)', 'none', 'inherit'],
    backgroundOrigin: ['padding-box', 'border-box', 'content-box'],
    backgroundPosition: [demicm.lengthUnitDouble, demicm.pctDouble, demicm.posDouble, 'inherit'],
    backgroundPositionX: [demicm.lengthUnit, demicm.pct, demicm.pos, 'inherit'],
    backgroundPositionY: [demicm.lengthUnit, demicm.pct, demicm.pos, 'inherit'],
    backgroundRepeat: ['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'inherit'],
    backgroundRepeatX: ['repeat', 'no-repeat', 'inherit'],
    backgroundRepeatY: ['repeat', 'no-repeat', 'inherit'],
    backgroundSize: [demicm.lengthUnit, demicm.lengthUnitDouble, demicm.pct, demicm.pctDouble, 'cover', 'contain' ],
    baselineShift: ['baseline', 'sub', 'super', demicm.pct, demicm.lengthUnit],
    //border: [],
    //borderBottom: [],
    borderBottomColor: [demicm.color, 'transparent', 'inherit'],
    borderBottomLeftRadius: [demicm.lengthUnit, demicm.pct],
    borderBottomRightRadius: [demicm.lengthUnit, demicm.pct],
    borderBottomStyle: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'inherit'],
    borderBottomWidth: ['thin', 'medium', 'thick', demicm.lengthUnit, 'inherit'],
    borderCollapse: ['collapse', 'separate', 'inherit'],
    //borderColor: [],
    //borderImage: [],
    borderImageOutset: [demicm.lengthUnitDouble, demicm.intNum],
    borderImageRepeat: ['stretch', 'repeat', 'round'],
    borderImageSlice: [demicm.intNumDouble, demicm.pctDouble, 'fill'],
    borderImageSource: ['url(' + demicm.URL + 'demicmImg.gif)', 'none'],
    borderImageWidth: [demicm.intNumDouble, demicm.pctDouble, 'auto'],
    //borderLeft: [],
    borderLeftColor: [demicm.color, 'transparent', 'inherit'],
    borderLeftStyle: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'inherit'],
    borderLeftWidth: ['thin', 'medium', 'thick', demicm.lengthUnit, 'inherit'],
    //borderRadius: [],
    //borderRight: [],
    borderRightColor: [demicm.color, 'transparent', 'inherit'],
    borderRightStyle: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'inherit'],
    borderRightWidth: ['thin', 'medium', 'thick', demicm.lengthUnit, 'inherit'],
    borderSpacing: [demicm.lengthUnit, demicm.lengthUnitDouble, 'inherit'],
    borderStyle: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'inherit'],
    //borderTop: [],
    borderTopColor: [demicm.color, 'transparent', 'inherit'],
    borderTopLeftRadius: [demicm.lengthUnit, demicm.pct],
    borderTopRightRadius: [demicm.lengthUnit, demicm.pct],
    borderTopStyle: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'inherit'],
    borderTopWidth: ['thin', 'medium', 'thick', demicm.lengthUnit, 'inherit'],
    //borderWidth: [],
    bottom: [demicm.lengthUnit, demicm.pct, 'auto', 'inherit'],
    boxShadow: [demicm.boxShadowValue],
    boxSizing: ['content-box', 'border-box', 'inherit'],
    bufferedRendering: ['auto', 'static', 'dynamic'],
    captionSide: ['top', 'bottom'],
    clear: ['left', 'right', 'both', 'none', 'inherit'],
    clip: [demicm.clipValue, 'auto', 'inherit'],
    //clipPath: [ ],
    clipRule: ['nonzero', 'evenodd', 'inherit'],
    color: [demicm.color, 'inherit'],
    colorInterpolation: ['auto', 'sRGB', 'linearRGB'],
    colorInterpolationFilters: ['auto', 'sRGB', 'linearRGB'],
    colorProfile: ['auto', 'sRGB', 'inherit'],
    colorRendering: ['auto', 'optimizeSpeed', 'optimizeQuality', 'inherit'],
    content: ['normal', 'inherit',
        [demicm.string, 'url(' + demicm.URL + 'demicmImg.gif)', demicm.normalNum, 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote']],
    counterIncrement: [demicm.normalNum, 'none', 'inherit'],
    counterReset: [demicm.normalNum, 'none', 'inherit'],
    cursor: ['url(' + demicm.URL + 'demicmImg.gif)', 'auto', 'default', 'pointer', 'crosshair', 'move', 'e-resize', 'ne-resize',
        'nw-resize', 'n-resize', 'se-resize', 'sw-resize', 's-resize', 'w-resize', 'text', 'wait', 'help', 'progress', 'inherit'],
    direction: ['ltr', 'rtl', 'inherit'],
    display: ['none', 'inline', 'block', 'inline-block', 'list-item', 'run-in', 'table', 'inline-table', 'table-row-group', 'table-header-group', 
        'table-footer-group', 'table-row', 'table-column-group', 'table-column', 'table-cell', 'table-caption', 'inheri'],
    dominantBaseline: ['auto', 'use-script', 'no-change', 'reset-size', 'ideographic', 'alphabetic', 'hanging',
        'mathematical', 'central', 'middle', 'text-after-edge', 'text-before-edge', 'inherit'],
    emptyCells: ['show', 'hide', 'inherit'],
    enableBackground: [demicm.enableBackgroundValue, 'accumulate', 'inherit' ],
    fill: [demicm.color],
    fillOpacity: [demicm.opacityValue],
    fillRule: ['nonzero', 'evenodd', 'inherit'],
    //filter: [ ],
    //flex: [],
    flexBasis: [demicm.pct, demicm.lengthUnit, 'initial', 'auto' ],
    flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
    //flexFlow: [],
    flexGrow: [demicm.normalNum, 'inherit'],
    flexShrink: [demicm.normalNum, 'inherit'],
    flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
    float: ['left', 'right', 'none', 'inherit'],
    floodColor: ['currentColor', demicm.color, 'inherit'],
    floodOpacity: [demicm.opacityValue],
    //font: [],
    fontFamily: [demicm.fontFamilyValue, 'inherit'],
    fontSize: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', 'smaller', 'larger', demicm.lengthUnit, demicm.pct, 'inherit'],
    fontStretch: ['normal', 'wider', 'narrower', 'ultra-condensed', 'extra-condensed', 'condensed', 
        'semi-condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded', 'inherit'],
    fontStyle: ['italic', 'oblique', 'normal', 'inherit'],
    fontVariant: ['small-caps', 'normal', 'inherit'],
    fontWeight: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'inherit'],
    glyphOrientationHorizontal: [demicm.angle, 'auto', 'upright', 'inline'],
    glyphOrientationVertical: [demicm.angle, 'auto', 'upright', 'inline'],
    //gridTemplate: [ ],
    height: [demicm.lengthUnit, demicm.pct, 'auto', 'inherit'],
    imageRendering: ['auto', 'crisp-edges', 'pixelated', 'inherit'],
    justifyContent: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
    kerning: ['auto', demicm.lengthUnit, 'inherit' ],
    left: [demicm.lengthUnit, demicm.pct, 'auto', 'inherit'],
    letterSpacing: [demicm.lengthUnit, 'normal', 'inherit'],
    lightingColor: ['currentColor', demicm.color, 'inherit'],
    lineHeight: [demicm.lengthUnit, demicm.pct, 'normal', 'inherit'],
    //listStyle: [],
    listStyleImage: ['url(' + demicm.URL + 'demicmImg.gif)', 'none', 'inherit'],
    listStylePosition: ['inside', 'outside', 'inherit'],
    listStyleType: ['disc', 'circle', 'square', 'decimal', 'decimal-leading-zero', 'lower-roman', 'upper-roman', 
        'lower-greek', 'lower-latin', 'upper-latin', 'armenian', 'georgian', 'none', 'inherit'],
    //margin: [],
    marginBottom: [demicm.lengthUnit, demicm.pct, 'auto', 'inherit'],
    marginLeft: [demicm.lengthUnit, demicm.pct, 'auto', 'inherit'],
    marginRight: [demicm.lengthUnit, demicm.pct, 'auto', 'inherit'],
    marginTop: [demicm.lengthUnit, demicm.pct, 'auto', 'inherit'],
    //marker: [ ],
    //markerEnd: [ ],
    //markerMid: [ ],
    //markerStart: [ ],
    mask: ['url(' + demicm.URL + 'demicmImg.gif) no-repeat fixed 20px 20px padding padding'],
    //maskType: [ ],
    maxHeight: [demicm.lengthUnit, demicm.pct, 'none', 'inherit'],
    maxWidth: [demicm.lengthUnit, demicm.pct, 'none', 'inherit'],
    maxZoom: [demicm.lengthUnit, demicm.pct, 'auto'],
    minHeight: [demicm.lengthUnit, demicm.pct, 'inherit'],
    minWidth: [demicm.lengthUnit, demicm.pct, 'inherit'],
    minZoom: [demicm.lengthUnit, demicm.pct, 'auto'],
    opacity: [demicm.opacityValue],
    order: [demicm.normalNum, 'inherit'],
    orientation: ['from-image', demicm.orientationValue, 'flip'],
    orphans: [demicm.intNum, 'inherit'],
    //outline: [],
    outlineColor: [demicm.color, 'invert', 'inherit'],
    outlineOffset: [demicm.lengthUnit, 'inherit'],
    outlineStyle: ['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'inherit'],
    outlineWidth: ['thin', 'medium', 'thick', demicm.lengthUnit, 'inherit'],
    overflow: ['visible', 'hidden', 'scroll', 'auto', 'inherit'],
    overflowWrap: ['visible', 'hidden', 'scroll', 'auto', 'inherit'],
    overflowX: ['visible', 'hidden', 'scroll', 'auto', 'no-display', 'no-content'],
    overflowY: ['visible', 'hidden', 'scroll', 'auto', 'no-display', 'no-content'],
    //padding: [],
    paddingBottom: [demicm.lengthUnit, demicm.pct, 'inherit'],
    paddingLeft: [demicm.lengthUnit, demicm.pct, 'inherit'],
    paddingRight: [demicm.lengthUnit, demicm.pct, 'inherit'],
    paddingTop: [demicm.lengthUnit, demicm.pct, 'inherit'],
    page: ['auto', 'inherit'],
    pageBreakAfter: ['auto', 'always', 'avoid', 'left', 'right', 'inherit'],
    pageBreakBefore: ['auto', 'always', 'avoid', 'left', 'right', 'inherit'],
    pageBreakInside: ['auto', 'avoid', 'inherit'],
    pointerEvents: ['auto', 'none', 'visiblePainted', 'visibleFill', 'visibleStroke', 'visible', 'painted', 'fill', 'stroke', 'all', 'inherit'],
    position: ['static', 'relative', 'absolute', 'fixed', 'inherit'],
    quotes: ["'<' '>'", "'`' '`'"],
    resize: ['none', 'both', 'horizontal', 'vertical'],
    right: [demicm.lengthUnit, demicm.pct, 'auto', 'inherit'],
    shapeRendering: ['auto', 'optimizeSpeed', 'crispEdges', 'geometricPrecision', 'inherit'],
    size: [demicm.lengthUnit, demicm.lengthUnitDouble, 'auto', 'portrait', 'landscape', 'inherit'],
    speak: ['normal', 'none', 'spell-out', 'inherit'],
    src: ['url(' + demicm.URL + 'demicmImg.gif)'],
    stopColor: [demicm.color, 'transparent', 'inherit'],
    stopOpacity: [demicm.opacityValue],
    stroke: ['none', 'currentColor', demicm.color, 'inherit'],
    strokeDasharray: ['none', 'dasharray', 'inherit'],
    strokeDashoffset: [demicm.lengthUnit, demicm.pct, 'inherit'],
    strokeLinecap: ['butt', 'round', 'bevel'],
    strokeLinejoin: ['miter', 'round', 'bevel', 'inherit'],
    strokeMiterlimit: ['inherit'],
    strokeOpacity: [demicm.opacityValue, 'inherit'],
    strokeWidth: [demicm.lengthUnit, demicm.pct, 'inherit'],
    tabSize: [demicm.lengthUnit, demicm.normalNum],
    tableLayout: ['auto', 'fixed', 'inherit'],
    textAlign: ['left', 'center', 'right', 'justify', 'match-parent', 'start end', 'start', 'end'],
    textAnchor: ['start', 'middle', 'end', 'inherit'],
    textDecoration: ['none', 'underline', 'overline', 'line-through', 'blink', 'inherit'],
    textIndent: [demicm.lengthUnit, demicm.pct, 'inherit'],
    textLineThroughColor: ['currentColor', demicm.color, 'inherit'],
    textLineThroughMode: ['continuous', 'skip-white-space'],
    textLineThroughStyle: ['none', 'solid', 'double', 'dotted', 'dashed', 'dot-dash', 'dot-dot-dash', 'wave'],
    textLineThroughWidth: [demicm.lengthUnit, demicm.pct, 'inherit'],
    textOverflow: ['clip', 'ellipsis', demicm.string],
    textOverlineColor: ['currentColor', demicm.color, 'inherit'],
    textOverlineMode: ['continuous', 'skip-white-space'],
    textOverlineStyle: ['none', 'solid', 'double', 'dotted', 'dashed', 'dot-dash', 'dot-dot-dash', 'wave'],
    textOverlineWidth: [demicm.lengthUnit, demicm.pct, 'inherit'],
    textRendering: ['auto', 'optimizeSpeed', 'optimizeLegibility', 'geometricPrecision'],
    textShadow: [demicm.boxShadowValue],
    textTransform: ['uppercase', 'lowercase', 'capitalize', 'none', 'inherit'],
    textUnderlineColor: ['currentColor', demicm.color, 'inherit'],
    textUnderlineMode: ['continuous', 'skip-white-space'],
    textUnderlineStyle: ['none', 'solid', 'double', 'dotted', 'dashed', 'dot-dash', 'dot-dot-dash', 'wave'],
    textUnderlineWidth: [demicm.lengthUnit, demicm.pct, 'inherit'],
    top: [demicm.lengthUnit, demicm.pct, 'auto', 'inherit'],
    //transition: [],
    transitionDelay: ['1ms'],
    transitionDuration: ['1ms'],
    //transitionProperty: [ ],
    transitionTimingFunction: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'],
    unicodeBidi: ['normal', 'embed', 'bidi-override', 'inherit'],
    unicodeRange: ['U+26', 'U+0025-00FF', 'U+4??', 'U+0025-00FF, U+4??'],
    userZoom: [demicm.lengthUnit, demicm.pct, 'auto'],
    //vectorEffect: [ ],
    verticalAlign: ['baseline', 'sub', 'super', 'top', 'text-top', 'middle', 'bottom', 'text-bottom', demicm.pct, demicm.lengthUnit, 'inherit'],
    visibility: ['visible', 'hidden', 'collapse', 'inherit'],
    whiteSpace: ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'inherit'],
    widows: [demicm.intNum, 'inherit'],
    width: [demicm.lengthUnit, demicm.pct, 'auto', 'inherit'],
    wordBreak: ['normal', 'break-all', 'keep-all'],
    wordSpacing: [demicm.lengthUnit, 'normal', 'inherit'],
    wordWrap: ['normal', 'break-word'],
    writingMode: ['horizontal-tb', 'rl-tb', 'vertical-lr', 'vertical-rl', 'bt-rl', 'bt-lr', 'lr-bt', 'rl-bt', 'lr', 'lr-tb', 'rl', 'tb', 'tb-lr', 'tb-rl'],
    zIndex: [demicm.intNum, 'auto', 'inherit'],
    zoom: [demicm.lengthUnit, demicm.pct, 'auto'],
}

demicm.styles = [];
for(var style in demicm.styleValues) {
    demicm.styles.push(style);
}
