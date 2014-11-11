/*
 * Author: demi6od <demi6d@gmail.com>
 * Date: 2013 Oct 21st
 * 
 * Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
 * - remove all dependencies of logger element
 */

// Global object for namespace 
var demicm = {};

// Use id[] to reference elements
var id = [];
demicm.idBlackList = [0, 4];

// Id offset for non-elem object
demicm.SPEC_OFFSET = 2000;
demicm.RET_OFFSET = 3000;

// Special object
var idS = [];
demicm.rangeId = 0; // range
demicm.selId = 1;   // selection
demicm.niId = 2;    // nodeIterator
demicm.twId = 3;    // treeWalker
demicm.cnId = 4;    // currentNode
demicm.clId = 5;    // currentLeaf

// Prop or func return object
var idR = [];

// Fuzzer type
demicm.IS_DEBUG = false;
demicm.IS_FUZZ_RANGE = true;

// DOM Tree initial
demicm.HEAD_CHILD_NUM = 8;
demicm.BODY_CHILD_NUM = 20;
demicm.FRAG_ELEM_NUM = 5; // Dangling element
demicm.BRANCH_NUM = 3;

demicm.TEXT_NUM = 5;
demicm.FREE_TEXT_NUM = 15; // No reference textNode
demicm.EVENT_ELEM_NUM = 36; // Elems num to set event, less than elemNum
demicm.EVENT_NUM = 30; // Event num for per elem

demicm.CSS_DIVERSE_NUM = 3; // 3

// Heap spray params
demicm.ARRAY_LEN_MAX = 100;
demicm.ARRAY_CNT = 50; // Spray count

// Operate number
demicm.FRONT_OP_CNT = 30; // 30 | 60
demicm.BACK_OP_CNT = 20; // 20 | 40

demicm.EVENT_OP_CNT = 10; // 10 | 20

// Operate rate: n%(n = 0~100) probability to run
demicm.PROP_PER = 60; // 60
demicm.FUNC_PER = 50; // 50
demicm.STYLE_PER = 50; // 50
demicm.RET_PER = 100; // 100

demicm.LAYOUT_PER = 10; // 10
demicm.CLEAR_PER = 10; // 10
demicm.CLEAR_ALL_PER = 3; // 3
demicm.DOM_PER = 50; // 50
demicm.GC_PER = 20; // 20

demicm.MOVE_ITR_PER = 80; // 80
demicm.MOVE_TREE_PER = 80; // 80
demicm.SET_ELEM_RANGE_PER = 20; // 20
demicm.ALTER_ELEM_RANGE_PER = 80; // 80
demicm.SET_SELECTION_PER = 20; // 20
demicm.ALTER_SELECTION_PER = 80; // 80

demicm.EVENT_OP_PER = 50; // 50 | 60
demicm.EVENT_CLEAR_PER = 60; // 60 | 80
demicm.EVENT_CLEAR_ALL_PER = 20; // 20 | 30

// Property and function rate
demicm.PROP_DIRTY_PER = 20; // 20
demicm.PROP_NORMAL_PER = 80; // 80
demicm.PROP_RANDOM_PER = 60; // 60

demicm.FUNC_DIRTY_PER = 20;
demicm.FUNC_NORMAL_PER = 80;
demicm.FUNC_RANDOM_PER = 60;

// Max recursion level
demicm.MAX_REC_DEPTH = 4; // 4
demicm.MAX_RET_REC_DEPTH = 3; // 3
demicm.MAX_REC_WIDE_CNT = 500; // 500 
demicm.MAX_REC_WIDE = 50; // 50 

demicm.MAX_LOOP = 100 //100
demicm.MAX_ITR = 10 //10

demicm.SPECIAL_FUNC_PARAM_NUM = 4; // 4

/************************************* range *************************************/
function constructNodeIterator() {
    try {
        var rId = rand(document.all.length);
        console.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) 
            + ' = document.createNodeIterator(document.all[' + rId + '], NodeFilter.SHOW_ALL, null, false);');
        idS[demicm.niId] = document.createNodeIterator(document.all[rId], NodeFilter.SHOW_ALL, null, false);
    } catch(e) {
        console.log('// Error: constructNodeIterator: ' + e.message);
    }
}

function constructTreeWalker() {
    try {
        var rId = rand(document.all.length);
        console.log('id_' + (demicm.twId + demicm.SPEC_OFFSET) 
            + ' = document.createTreeWalker(document.all[' + rId + '], NodeFilter.SHOW_ALL, null, false);');
        idS[demicm.twId] = document.createTreeWalker(document.all[rId], NodeFilter.SHOW_ALL, null, false);
    } catch(e) {
        console.log('// Error: constructTreeWalker: ' + e.message);
    }
}

function constructRange() {
    try {
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ' = document.createRange();');
        idS[demicm.rangeId] = document.createRange();

        setRange();
    } catch(e) {
        console.log('// Error: constructRange: ' + e.message);
    }
}

function setRange() {
    if (demicm.IS_DEBUG) {
        console.log('[+] setRange()');
    }

    try {
        var rId = rand(document.all.length);
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setStart(document.all[' + rId + '], 0);');
        idS[demicm.rangeId].setStart(document.all[rId], 0);

        rId = rand(document.all.length);
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setEnd(document.all[' + rId + '], 0);');
        idS[demicm.rangeId].setEnd(document.all[rId], 0);
    } catch(e) {
        console.log('// Error: setRange: ' + e.message);
    }
}

function constructSelection() {
    try {
        console.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) + ' = window.getSelection();');
        idS[demicm.selId] = window.getSelection();

        setSelection();
    } catch(e) {
        console.log('// Error: constructSelection: ' + e.message);
    }
}

function setSelection() {
    if (demicm.IS_DEBUG) {
        console.log('[+] setSelection()');
    }

    try {
        var rId = rand(document.all.length);
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.selectNodeContents(document.all[' + rId + ']);');
        idS[demicm.rangeId].selectNodeContents(document.all[rId]);

        console.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) + '.removeAllRanges();');
        idS[demicm.selId].removeAllRanges();

        console.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) 
            + '.addRange(id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ');');
        idS[demicm.selId].addRange(idS[demicm.rangeId]);
    } catch(e) {
        console.log('// Error: setSelection: ' + e.message);
    }
}

function nodeIteration() {
    if (demicm.IS_DEBUG) {
        console.log('[+] nodeIteration()');
    }

    try {
        // Fuzz current node
        console.log('id_' + (demicm.cnId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.referenceNode;');
        idS[demicm.cnId] = idS[demicm.niId].referenceNode;

        if (idS[demicm.cnId]) {
            propfMan([demicm.cnId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.cnId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        console.log('id_' + (demicm.cnId + demicm.SPEC_OFFSET) + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.root;');
        idS[demicm.cnId] = idS[demicm.niId].root;

        var count = 0;
        while (idS[demicm.cnId] && count < demicm.MAX_ITR)  {
            propfMan([demicm.cnId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.cnId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            console.log('id_' + (demicm.cnId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();');
            idS[demicm.cnId] = idS[demicm.niId].nextNode();

            count++;
        }
    } catch(e) {
        console.log('// Error: nodeIteration: ' + e.message);
    }
}

function treeIteration() {
    if (demicm.IS_DEBUG) {
        console.log('[+] treeIteration()');
    }

    try {
        // Fuzz current node
        console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.currentNode;');
        idS[demicm.clId] = idS[demicm.twId].currentNode;

        if (idS[demicm.clId]) {
            propfMan([demicm.clId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.clId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.root;');
        idS[demicm.clId] = idS[demicm.twId].root;

        var count = 0;
        while (idS[demicm.clId] && count < demicm.MAX_ITR)  {
            propfMan([demicm.clId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.clId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) 
                    + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();');
            idS[demicm.clId] = idS[demicm.twId].nextNode();

            count++;
        }
    } catch(e) {
        console.log('// Error: treeIteration: ' + e.message);
    }
}

function moveIterator() {
    if (demicm.IS_DEBUG) {
        console.log('[+] moveIterator()');
    }

    try {
        var rMoves = rand(3) + 1;
        for (var i = 0; i < rMoves; i++) {
            switch(rand(2)) {
                case 0:
                    console.log('id_' + (demicm.cnId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();');
                    idS[demicm.cnId] = idS[demicm.niId].nextNode();
                    break;
                case 1:
                    console.log('id_' + (demicm.cnId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.previousNode();');
                    idS[demicm.cnId] = idS[demicm.niId].previousNode();
                    break;
            }

            propfMan([demicm.niId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.cnId]) {
            propfMan([demicm.cnId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.cnId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch(e) {
        console.log('// Error: moveIterator: ' + e.message);
    }
}

function moveTreeWalker() {
    if (demicm.IS_DEBUG) {
        console.log('[+] moveTreeWalker()');
    }

    try {
        var rMoves = rand(3) + 1;
        for (var i = 0; i < rMoves; i++) {
            switch(rand(7)) {
                case 0:
                    console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();');
                    idS[demicm.clId] = idS[demicm.twId].nextNode();
                    break;
                case 1:
                    console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousNode();');
                    idS[demicm.clId] = idS[demicm.twId].previousNode();
                    break;
                case 2:
                    console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousSibling();');
                    idS[demicm.clId] = idS[demicm.twId].previousSibling();
                    break;
                case 3:
                    console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextSibling();');
                    idS[demicm.clId] = idS[demicm.twId].nextSibling();
                    break;
                case 4:
                    console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.firstChild();');
                    idS[demicm.clId] = idS[demicm.twId].firstChild();
                    break;
                case 5:
                    console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.lastChild();');
                    idS[demicm.clId] = idS[demicm.twId].lastChild();
                    break;
                case 6:
                    console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.parentNode();');
                    idS[demicm.clId] = idS[demicm.twId].parentNode();
                    break;	
            }

            propfMan([demicm.twId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.clId]) {
            propfMan([demicm.clId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.clId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch(e) {
        console.log('// Error: moveTreeWalker: ' + e.message);
    }
}		

function alterRange() {
    if (demicm.IS_DEBUG) {
        console.log('[+] alterRange()');
    }

    try {
        propfMan([demicm.rangeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.rangeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

        var rId = rand(document.all.length);
        console.log('var rElem = document.all[' + rId + '];');
        var rElem = document.all[rId];

        switch(rand(4)) {
            case 0:
                console.log('var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.cloneContents();');
                var documentFragment = idS[demicm.rangeId].cloneContents();

                console.log('rElem.appendChild(documentFragment);');
                rElem.appendChild(documentFragment);

                console.log('documentFragment = null;');
                break;
            case 1:
                console.log('var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.extractContents();');
                var documentFragment = idS[demicm.rangeId].extractContents();

                console.log('rElem.appendChild(documentFragment);');
                rElem.appendChild(documentFragment);

                console.log('documentFragment = null;');
                break;
            case 2:
                var rHTMLCode = randHTMLCode(0x10, 5);
                console.log('var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) 
                    + '.createContextualFragment("' + rHTMLCode + '");');
                var documentFragment = idS[demicm.rangeId].createContextualFragment(rHTMLCode);

                console.log('rElem.appendChild(documentFragment);');
                rElem.appendChild(documentFragment);

                console.log('documentFragment = null;');
                break;
            case 3:
                console.log('var rangeCache = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.cloneRange();');
                var rangeCache = idS[demicm.rangeId].cloneRange();

                var type = randItem(['START_TO_START', 'END_TO_END', 'START_TO_END', 'END_TO_START']);
                console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) 
                    + '.compareBoundaryPoints(Range.' + type + ', rangeCache);');
                eval('idS[demicm.rangeId].compareBoundaryPoints(Range.' + type + ', rangeCache);');

                console.log('rangeCache.detach();');
                rangeCache.detach();

                console.log('rangeCache = null;');
                break;						
        }		
        console.log('rElem = null;');
    } catch(e) {
        console.log('// Error: alterRange: ' + e.message);
    }
}

function alterSelection() {
    if (demicm.IS_DEBUG) {
        console.log('[+] alterSelection()');
    }

    try {
        // Execute command on selection
        var cmd = randItem(demicm.commands);
        console.log('document.execCommand(' +  cmd + ');');
        eval('document.execCommand(' +  cmd + ');');

        propfMan([demicm.selId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.selId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

        if (percent(20)) {
            console.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) 
                + '.addRange(id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ');');
            idS[demicm.selId].addRange(idS[demicm.rangeId]);
        }
    } catch(e) {
        console.log('// Error: alterSelection: ' + e.message);
    }
}

function constructGroup() {
    constructNodeIterator();
    constructTreeWalker();
    constructRange();
    constructSelection();
}

function reuseGroup() {
    if (demicm.IS_DEBUG) {
        console.log('[+] reuseGroup()');
    }

    try {
        nodeIteration();
        console.log('id_' + (demicm.cnId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.cnId] = null;
        console.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.detach();');
        idS[demicm.niId].detach();
        console.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.niId] = null;
        console.log('gc();');
        // gc();

        treeIteration();
        console.log('id_' + (demicm.clId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.clId] = null;
        console.log('id_' + (demicm.twId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.twId] = null;
        console.log('gc();');
        // gc();

        alterRange();
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.detach();');
        idS[demicm.rangeId].detach();
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.rangeId] = null;
        console.log('gc();');
        // gc();

        alterSelection();
        console.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.selId] = null;
        console.log('gc();');
        // gc();
    } catch(e) {
        console.log('// Error: reuseGroup: ' + e.message);
    }
}

function objMan(type) {
    if (demicm.IS_DEBUG) {
        console.log('[+] objMan("ret")');
    }

    var rObjId = randObjId(type);
    if (rObjId == 'none') {
        return;
    }

    propfMan([rObjId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', type);
    propfMan([rObjId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', type);
}

/************************************* prelude *************************************/
function prelude() {
    setEnv();

    constructDOMTree();

    addTextNode();

    if (demicm.IS_FUZZ_RANGE) {
        constructGroup();
    }

    setEvtHandler();

    addCSS();
}

function setEnv() {
    // Set body and document property
    console.log('document.designMode = "on";');
    document.designMode = 'on';

    console.log('document.body.contentEditable = "true";');
    document.body.contentEditable = 'true';

    console.log('document.body.dir = "rtl";');
    document.body.dir = 'rtl';

    console.log('document.body.draggable = "true";');
    document.body.draggable = 'true';

    console.log('document.body.spellcheck = "true";');
    document.body.spellcheck = 'true';

    console.log('document.body.translate = "true";');
    document.body.translate = 'true';

    // Set at least one idR item for propfMan
    console.log('var id_' + demicm.RET_OFFSET + ' = null;');
    idR[0] = null;
}

function eventHandler() {
    if (percent(demicm.EVENT_OP_PER)) {
        operate(demicm.EVENT_OP_CNT);
    }

    if (percent(demicm.EVENT_CLEAR_PER)) {
        clear();
    }

    if (percent(demicm.EVENT_CLEAR_ALL_PER)) {
        clearAll();
    }

    console.log('/-};');
}

function setEvtHandler() {
    var noEvtElemIds = [];
    for (var i = 0; i < demicm.elemNum; i++) {
        noEvtElemIds[i] = i;
    }

    // Set event handler for no event element
    for (var i = 0; i < demicm.EVENT_ELEM_NUM; i++) {
        var setEvtId = randItem(noEvtElemIds);
        removeArrVal(noEvtElemIds, setEvtId);
        // Set all event handlers for setEvtId element
        try {
            for (var j = 0; j < demicm.EVENT_NUM; j++) {
                if (getTagName(id[setEvtId]) == 'body') {
                    var rEvt = randEvt('body'); 
                } else if (getTagName(id[setEvtId]) == 'track') {
                    var rEvt = randEvt('track'); 
                } else if (getTagName(id[setEvtId]) == 'video' 
                        || getTagName(id[setEvtId]) == 'audio'
                        || getTagName(id[setEvtId]) == 'embed'
                        || getTagName(id[setEvtId]) == 'img'
                        || getTagName(id[setEvtId]) == 'object') {
                    var rEvt = randEvt('media'); 
                } else {
                    var rEvt = randEvt('html'); 
                }
                id[setEvtId][rEvt] = new Function('console.log("//id_' + setEvtId 
                    + '[\'' + rEvt + '\'] = function()");console.log("/-{");eventHandler();');
            }
        } catch(e) {
            console.log('// Error: setEvtHandler: ' + e.message);
        }
    }

    // For grinder log bug while refreshing page
    document.onscroll = null;
}

function addTextNode() {
    for (var i = 0; i < demicm.TEXT_NUM; i++) {
        try {
            var rStr = randStr(rand(0x100)); 
            var newId = demicm.elemNum + i;

            console.log('id_' + newId + ' = document.createTextNode("' + rStr + '");');
            id[newId] = document.createTextNode(rStr);
            console.log('id_' + newId + '.id = ' + newId + ';');
            id[newId].id = newId;

            var rId = 0;
            // id[0] = documentElem, id[4] = cssNode can't add textNode
            while (rId == 0 || rId == 4) {
                rId = rand(demicm.elemNum);
            }
            console.log('id_' + rId + '.appendChild(id_' + newId + ');');
            id[rId].appendChild(id[newId]);
        } catch(e) {
            console.log('// Error: addTextNode: ' + e.message);
        }
    }

    // Add no reference textNode 
    for (var i = 0; i < demicm.FREE_TEXT_NUM; i++) {
        try {
            var rStr = randStr(rand(0x100)); 
            var rId = 0;
            // id[0] = documentElem, id[4] = cssNode can't add textNode
            while (rId == 0 || rId == 4) {
                rId = rand(demicm.elemNum);
            }

            console.log('id_' + rId + '.appendChild(document.createTextNode("' + rStr + '"));');
            id[rId].appendChild(document.createTextNode(rStr));
        } catch(e) {
            console.log('// Error: addTextNode: ' + e.message);
        }
    }
}

function constructTree(rootType, startId, len, branchNum) {
    for (var i = 1; i <= len; i++) {
        if (i <= branchNum) {
            if (rootType == 'body') {
                console.log('document.body.appendChild(id_' + (i+startId - 1) + ');');
                document.body.appendChild(id[i+startId - 1]);
            } else if (rootType == 'head') {
                console.log('document.head.appendChild(id_' + (i+startId - 1) + ');');
                document.head.appendChild(id[i+startId - 1]);
            }
        } else {
            var row = Math.ceil(Math.log(((branchNum - 1) / branchNum) * i+1) / Math.log(branchNum));
            var col = Math.ceil((i - branchNum * (Math.pow(branchNum, row - 1) - 1) / (branchNum - 1)) / branchNum);
            var parentId = Math.ceil(branchNum * (Math.pow(branchNum, row - 2) - 1) / (branchNum - 1)) + col;

            console.log('id_' + (parentId + startId - 1) + '.appendChild(id_' + (i+startId - 1) + ');');
            id[parentId + startId - 1].appendChild(id[i+startId - 1]);
        }
    }
}

function constructDOMTree() {
    // Add document, body, head to id[]
    demicm.idTags = ['body', 'head'];

    console.log('id_0 = document;');
    id[0] = document; 
    console.log('document.id = 0;');
    document.id = 0;

    console.log('id_1 = document.documentElement;');
    id[1] = document.documentElement; 
    console.log('document.documentElement.id = 1;');
    document.documentElement.id = 1;
    
    console.log('id_2 = document.head;');
    id[2] = document.head; 
    console.log('document.head.id = 2;');
    document.head.id = 2;

    console.log('id_3 = document.body;');
    id[3] = document.body; 
    console.log('document.body.id = 3;');
    document.body.id = 3;

    console.log('id_4 = document.createElement("style");');
    id[4] = document.createElement('style'); 
    console.log('id_4.id = 4;');
    id[4].id = 4;

    demicm.reserveIdNum = id.length;
    var reserveTagNum = demicm.idTags.length;

    demicm.elemNum = demicm.reserveIdNum + demicm.HEAD_CHILD_NUM + demicm.BODY_CHILD_NUM + demicm.FRAG_ELEM_NUM;

    var delta = demicm.reserveIdNum - reserveTagNum;
    // Create elems to id[] with random tag
    for (var i = demicm.reserveIdNum; i < demicm.elemNum; i++) {
        demicm.idTags.push(randItem(demicm.strictTags));

        console.log('id_' + i + ' = document.createElement("' + demicm.idTags[i - delta] + '");');
        id[i] = document.createElement(demicm.idTags[i - delta]);
        console.log('id_' + i + '.id = ' + i + ';');
        id[i].id = i;
    }

    // Construct body and head tree 
    constructTree('body', demicm.reserveIdNum, demicm.BODY_CHILD_NUM, demicm.BRANCH_NUM);
    constructTree('head', demicm.BODY_CHILD_NUM + demicm.reserveIdNum, demicm.HEAD_CHILD_NUM, demicm.BRANCH_NUM);

    // For IE cache
    for (var i = reserveTagNum; i < demicm.idTags.length; i++) {
        try {
            console.log('document.body.appendChild(document.createElement("' + demicm.idTags[i] + '"));');
            document.body.appendChild(document.createElement(demicm.idTags[i])); 
        } catch(e) {
            console.log('// Error: constructDOMTree: ' + e.message);
        }
    }
}

function addCSS() {
    // Set CSS according to tagName
    var cssList = '';
    var tagList = randItem(demicm.idTags);
    for (var i = 0; i < demicm.CSS_DIVERSE_NUM; i++) {
        for (var j = 0; j < demicm.idTags.length * 1.5 / demicm.CSS_DIVERSE_NUM; j++) {
            tagList += ', ' + randItem(demicm.idTags);
        }
        cssList += tagList + ' ' + randCSSText() + ' ';
    }

    // Add pseudo class
    cssList += '*:active:first-child:first-letter:first-line:focus:hover:lang(en):link:visited ' + randCSSText();

    console.log('id_4.innerText = "' + cssList + '";');
    id[4].innerText = cssList;

    console.log('document.documentElement.appendChild(id_4);');
    document.documentElement.appendChild(id[4]);
}

/************************************* operate *************************************/
/*
 * Manipulate property and function
 * propStack: props chain
 * retValDepth: ret obj fuzz depth
 * type: 'prop' or 'func'
 */
function propfMan(propStack, recDepth, retValDepth, type, objType) {
    try {
        // Control recursion operate depth
        if (recDepth <= 0) {
            return;
        }

        // Get current fuzz object
        if (objType == 'node') {
            var fuzzObjStr = 'id[' + propStack[0] + ']';
            var logObjStr = 'id_' + propStack[0];
        } else if (objType == 'ret') {
            var fuzzObjStr = 'idR[' + propStack[0] + ']';
            var logObjStr = 'id_' + (propStack[0] + demicm.RET_OFFSET);
        } else if (objType == 'spec') {
            var fuzzObjStr = 'idS[' + propStack[0] + ']';
            var logObjStr = 'id_' + (propStack[0] + demicm.SPEC_OFFSET);
        }

        for (var i = 1; i < propStack.length; i++) {
            fuzzObjStr += '["' + propStack[i] + '"]'; 
            logObjStr += '["' + propStack[i] + '"]'; 
        }

        eval('var fuzzObj = ' + fuzzObjStr + ';');
        if (!fuzzObj || inArr(demicm.idBlackList, fuzzObj.id)) {
            return;
        }

        // Recursively operate all subobject according to prop probability
        var recWide = 0;
        var recWideCnt = 0;

        console.log('for (var p in ' + logObjStr + ') { ' + logObjStr + '[p]; }');
        for (var p in fuzzObj) {
            if (fuzzObj[p] 
                && typeof fuzzObj[p] == 'object' 
                && !isPosInt(fuzzObj[p].id) 
                && !inArr(demicm.propBlackList, p)) {
                if (percent(demicm.PROP_PER)) {
                    propStack.push(p);
                    propfMan(propStack, recDepth - 1, retValDepth, 'prop', objType);
                    recWide++;
                }
                if (percent(demicm.FUNC_PER)) {
                    propStack.push(p);
                    propfMan(propStack, recDepth - 1, retValDepth, 'func', objType);
                    recWide++;
                }

                if (recWideCnt++ > demicm.MAX_REC_WIDE_CNT || recWide > demicm.MAX_REC_WIDE) {
                    break;
                }
            }

            // In case the recursion procedure delete fuzzObj
            eval('fuzzObj = ' + fuzzObjStr + ';');
            if (!fuzzObj) {
                return;
            }
        }

        var tagName = getTagName(fuzzObj);
        if (tagName != 'none') {
            var propf = randPropf(tagName, type);
        } else {
            var propf = randPropfDyn(fuzzObj, type);
        }

        // Debug
        if (demicm.IS_DEBUG) {
            console.log('[+] FuzzObj: ' + fuzzObjStr + ', propf: ' + propf);
        }

        // Assert property number is not 0 or unexpected tagName
        if (!propf || propf == 'none') {
            return;
        }

        // params: rId?s[1-n], suppose 10 params is enough
        var rIds = [];
        randIds(rIds, 10);
        if (rIds[0] == 'none') {
            if (objType == 'node') {
                return;
            } else {
                rIds = [2,2,2,2,2,2,2,2,2,2];
            }
        }

        var rIdRs = [];
        randObjIds(rIdRs, 10, 'ret');
        if (rIdRs[0] == 'none') {
            if (objType == 'ret') {
                return;
            } else {
                rIdRs = [0,0,0,0,0,0,0,0,0,0];
            }
        }

        var rIdSs = [];
        randObjIds(rIdSs, 10, 'spec');
        if (rIdSs[0] == 'none') {
            if (objType == 'spec') {
                return;
            } else {
                rIdSs = [0,0,0,0,0,0,0,0,0,0];
            }
        }

        eval('var bNormalPropf = propf in demicm.' + type + 'Dic;');

        if (type == 'prop') {
            propMan(fuzzObj, fuzzObjStr, logObjStr, propf, bNormalPropf, rIds, rIdRs, rIdSs, objType);
        } else if (type == 'func') {
            funcMan(fuzzObj, fuzzObjStr, logObjStr, propf, bNormalPropf, rIds, rIdRs, rIdSs
                , recDepth, retValDepth, objType);
        } else {
            console.log(' // Warning: propfMan else');
        }
    } catch(e) {
        console.log('// Error: propfMan: ' + e.message);
    }
    finally {
        propStack.pop();
    }
}

function propMan(fuzzObj, fuzzObjStr, logObjStr, prop, bNormalProp, rIds, rIdRs, rIdSs, objType) {
    try {
        // Get value
        console.log('var retVal = ' + logObjStr + '["' + prop + '"];');
        eval('var retVal = ' + fuzzObjStr + '["' + prop + '"];');

        // Return value is new object
        if (retVal && typeof retVal == 'object' && !isPosInt(retVal.id)) {
            console.log('id_' + (idR.length + demicm.RET_OFFSET) + ' = retVal;');
            idR[idR.length] = retVal;
        }

        // Set dirty value
        if (bNormalProp && percent(demicm.PROP_DIRTY_PER) && demicm.propDic[prop].dirtyVal.length != 0) {
            var rDirtyVal = randItem(demicm.propDic[prop].dirtyVal);
            console.log(logObjStr + '["' + prop + '"] = ' 
                + logRevise(rIds[1], rIdRs[1], 'prop', rDirtyVal, 'node') + ';');
            eval(fuzzObjStr + '["' + prop + '"] = rDirtyVal;');
        // Set normal value
        } else if (bNormalProp && percent(demicm.PROP_NORMAL_PER) && demicm.propDic[prop].normalVal.length != 0) {
            if (inArr(demicm.specialProps, prop) && getTagName(fuzzObj) != 'none') {
                var rNormalVal = randItem(demicm[prop][getTagName(fuzzObj)]);
                if (rNormalVal == null) {
                    rNormalVal = randItem(demicm.propDic[prop].normalVal);
                }
            } else {
                var rNormalVal = randItem(demicm.propDic[prop].normalVal);
            }
            console.log(logObjStr + '["' + prop + '"] = ' 
                + logRevise(rIds[1], rIdRs[1], 'prop', rNormalVal, 'node') + ';');
            eval(fuzzObjStr + '["' + prop + '"] = rNormalVal;');
        // Set random value
        } else if (percent(demicm.PROP_RANDOM_PER)) {
            var randValTable = {};
            randPropfVal(rIds[1], rIdRs[1], 'prop', randValTable);
            var rVal = bNormalProp ? randValTable[demicm.propDic[prop].type] : randValTable[typeof fuzzObj[prop]];

            if (rVal != undefined) {
                console.log(logObjStr + '["' + prop + '"] = ' 
                    + logRevise(rIds[1], rIdRs[1], 'prop', rVal, 'node') + ';');
                eval(fuzzObjStr + '["' + prop + '"] = rVal;');
            } else {
                console.log(logObjStr + '["' + prop + '"] = ' 
                    + logRevise(rIds[1], rIdRs[1], 'prop', randValTable['objectR'], 'ret') + ';');
                eval(fuzzObjStr + '["' + prop + '"] = randValTable["objectR"];');
            }
        // Set some value from one object to the value of another
        } else if (percent(60)) {
            if (objType == 'spec') {
                console.log(logObjStr + '["' + prop + '"] = id_' 
                    + (rIdSs[1] + demicm.SPEC_OFFSET) + '["' + prop + '"];');
                eval(fuzzObjStr + '["' + prop + '"] = idS[rIdSs[1]][prop];');
            } else if (objType == 'ret') {
                console.log(logObjStr + '["' + prop + '"] = id_' + (rIdRs[1] 
                        + demicm.RET_OFFSET) + '["' + prop + '"];');
                eval(fuzzObjStr + '["' + prop + '"] = idR[rIdRs[1]][prop];');
            } else if (objType == 'node') {
                console.log(logObjStr + '["' + prop + '"] = id_' + rIds[1] + '["' + prop + '"];');
                eval(fuzzObjStr + '["' + prop + '"] = id[rIds[1]][prop];');
            } else { 
                console.log('// Warning: propMan: else');
            }
        // Set some property to NULL...
        } else {
            console.log(logObjStr + '["' + prop + '"] = null;');
            eval(fuzzObjStr + '["' + prop + '"] = null;');
        }

        console.log('retVal = null;');
    } catch(e) {
        console.log('// Error: propMan: ' + e.message);
    }
}

function funcMan(fuzzObj, fuzzObjStr, logObjStr, func, bNormalFunc, rIds, rIdRs, rIdSs
    , recDepth, retValDepth, objType) {
    try {
        // Generate parameters
        var paramStr = '';
        var paramLogStr = '';
        console.log('[+] FuncName: ' + func);
        if (bNormalFunc) {
            var params = demicm.funcDic[func];
            for (var i = 1; i < params.length; i++) {
                // Set dirty value
                if (percent(demicm.FUNC_DIRTY_PER) && params[i].dirtyVal.length != 0) {
                    var rVal = randItem(params[i].dirtyVal);
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'node') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'node') + ',';
                // Set normal value
                } else if (percent(demicm.FUNC_NORMAL_PER) && params[i].normalVal.length != 0) {
                    var rVal = randItem(params[i].normalVal);
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'node') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'node') + ',';
                // Set random value
                } else if (percent(demicm.FUNC_RANDOM_PER) || true) {
                    var randValTable = {};
                    randPropfVal(rIds[i], rIdRs[i], 'func', randValTable);
                    var rVal = randValTable[params[i].type];

                    if (rVal != undefined) {
                        paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'node') + ',';
                        paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'node') + ',';
                    } else {
                        rVal = randValTable['objectR'];
                        paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'ret') + ',';
                        paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'ret') + ',';
                    }
                } else {
                    console.log('// Warning: funcMan else');
                }
            }
        } else {
            for (var i = 0; i < demicm.SPECIAL_FUNC_PARAM_NUM; i++) {
                // Set dirtyParamVals
                if (percent(50)) {
                    var rVal = randItem(demicm.dirtyParamVals);
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'node') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'node') + ',';
                // Set random obj
                } else {
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', id[rIds[i]], 'node') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', id[rIds[i]], 'node') + ',';
                }
            }
        }

        // trim paramStr
        if (paramStr != '') {
            paramStr = paramStr.substr(0, paramStr.length - 1);
            paramLogStr = paramLogStr.substr(0, paramLogStr.length - 1);
        }

        console.log('var retVal = ' +  logObjStr + '["' + func + '"](' + paramLogStr + ');');
        eval('var retVal = ' + fuzzObjStr + '["' + func + '"](' + paramStr + ');');

        // Return value is new object
        if (retVal && typeof retVal == 'object' && !isPosInt(retVal.id)) {
            console.log('id_' + (idR.length + demicm.RET_OFFSET) + ' = retVal;');
            idR[idR.length] = retVal;

            if (retValDepth > 0) {
                propfMan([idR.length - 1], recDepth - 1, retValDepth - 1, 'prop', 'ret');
                propfMan([idR.length - 1], recDepth - 1, retValDepth - 1, 'func', 'ret');
            }
        }

        console.log('retVal = null;');
    } catch(e) {
        console.log('// Error: funcMan: ' + e.message);
    }
}

function styleMan(rId) {
    var rStyle = randStyle();
    var rStyleVal = randStyleVal(rStyle);

    // Only element has style
    if (id[rId] && id[rId].nodeType == 1) {
        console.log('id_' + rId + '.style["' + rStyle + '"] = "' + rStyleVal + '";');
        id[rId].style[rStyle] = rStyleVal;
    }
}

function layout() {
    if (demicm.IS_DEBUG) {
        console.log('[+] layout()');
    }

    try {
        for (var i = 0; i < 3; i++) {
            var rId = randId();
            if (rId == 'none') {
                return;
            }

            console.log('id_' + rId + '.offsetParent;');
            id[rId].offsetParent;
        }
    } catch(e) {
        console.log('// Error: layout: ' + e.message);
    }
}

function clear() {
    if (demicm.IS_DEBUG) {
        console.log('[+] clear()');
    }

    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }

        var count = 0;
        while (!id[rId].parentNode || rId < demicm.reserveIdNum) {
            rId = randId();

            count++;
            if (count > demicm.MAX_LOOP) {
                return;
            }
        }

        switch(rand(8)) {
            case 0:
                var caches = [];
                removeChildren(id[rId], 'delay', caches);

                console.log('id_' + rId + '.innerHTML = "demi6od";');
                id[rId].innerHTML = 'demi6od';

                removeCache(caches);
                break;

            case 1:
                console.log('id_' + rId + '.outerHTML = "";');
                id[rId].outerHTML = '';

                removeThis(id[rId], 'direct');
                break;

            case 2:
                var caches = [];
                removeChildren(id[rId], 'delay', caches);

                console.log('id_' + rId + '.innerText = "demi6od";');
                id[rId].innerText = 'demi6od';

                removeCache(caches);
                break;

            case 3:
                console.log('id_' + rId + '.outerText = "";');
                id[rId].outerText = '';
                removeThis(id[rId], 'direct');
                break;

            case 4:
                var caches = [];
                removeChildren(id[rId], 'delay', caches);

                console.log('id_' + rId + '.innerHTML = ' + 'id_' + rId + '.innerHTML;');
                id[rId].innerHTML = id[rId].innerHTML;

                removeCache(caches);
                clearChildrenId(id[rId]);
                break;

            case 5:
                var parentNode = id[rId].parentNode; 
                var currentNode = id[rId];
                var childIdx = 0;
                while (currentNode) {
                    currentNode = currentNode.previousSibling;
                    childIdx++;
                }

                console.log('id_' + rId + '.outerHTML = ' + 'id_' + rId + '.outerHTML;');
                id[rId].outerHTML = id[rId].outerHTML;
                removeThis(id[rId], 'direct');

                currentNode = parentNode.firstChild;
                for (var i = 1; i < childIdx; i++) {
                    currentNode = currentNode.nextSibling;
                }
                clearThisId(currentNode);
                parentNode = null;
                currentNode = null;
                break;

            case 6:
                var caches = [];
                removeChildren(id[rId], 'delay', caches);

                console.log('id_' + rId + '.innerText = ' + 'id_' + rId + '.innerText;');
                id[rId].innerText = id[rId].innerText;

                removeCache(caches);
                break;

            case 7:
                console.log('id_' + rId + '.outerText = ' + 'id_' + rId + '.outerText;');
                id[rId].outerText = id[rId].outerText;

                removeThis(id[rId], 'direct');
                break;

            default:
                console.log(' // Warning: clear default');
                break;
        }

        console.log('gc();');
        // gc();
    } catch(e) {
        console.log('// Error: clear: ' + e.message);
    }
}

function clearAll() {
    if (demicm.IS_DEBUG) {
        console.log('[+] clearAll()');
    }

    try {
        for (var i = 1; i < id.length; i++) {
            if (id[i]) {
                console.log('id_' + i + ' = null;');
                id[i] = null;
            }
        }

        if (percent(60)) {
            console.log('document.write("");');
            document.write('');
        } else {
            console.log('document.body.outerHTML = "";');
            document.body.outerHTML = '';
            console.log('document.head.outerHTML = "";');
            document.head.outerHTML = '';
        }
    } catch(e) {
        console.log('// Error: clearAll: ' + e.message);
    }

    console.log('gc();');
    // gc();

    //window.open('', '_self', '');
    //window.close();
}

function DOMMan() {
    if (demicm.IS_DEBUG) {
        console.log('[+] DOMMan()');
    }

    try {
        var rIds = [];
        randIds(rIds, 2);
        if (rIds[0] == 'none') {
            return;
        }

        var randValTable = {};
        randPropfVal(rIds[1], 0, 'DOM', randValTable);

        var rBool = randValTable['boolean'];
        var rStr = randValTable['string'];
        var rDOMPos = randValTable['sWhere'];
        var rHTMLCode = randValTable['HTMLCode'];

        switch(rand(8)) {
            //Node appendChild(in Node newChild)
            case 0:
                console.log('id_' + rIds[0] + '.appendChild(id_' + rIds[1]  + ');');
                id[rIds[0]].appendChild(id[rIds[1]]);
                break;

            // Node insertBefore(in Node newChild, in Node refChild)
            case 1:
                console.log('id_' + rIds[0] + '.parentNode.insertBefore(id_' + rIds[1]  + ', id_' + rIds[0] + ');');
                id[rIds[0]].parentNode.insertBefore(id[rIds[1]], id[rIds[0]]);
                break;

            // Node insertAdjacentElement(in String sWhere, in Node newSibling)
            case 2:
                console.log('id_' + rIds[0] + '.insertAdjacentElement("' + rDOMPos + '", id_' + rIds[1]  + ');');
                id[rIds[0]].insertAdjacentElement(rDOMPos, id[rIds[1]]);
                break;

            // insertAdjacentHTML(in String sWhere, in String htmlCode)
            case 3:
                console.log('id_' + rIds[0] + '.insertAdjacentHTML("' + rDOMPos + '", "' + rHTMLCode  + '");');
                id[rIds[0]].insertAdjacentHTML(rDOMPos, rHTMLCode);
                break;

            // insertAdjacentText(in String sWhere, in String text)
            case 4:
                console.log('id_' + rIds[0] + '.insertAdjacentText("' + rDOMPos + '", "' + rStr  + '");');
                id[rIds[0]].insertAdjacentText(rDOMPos, rStr);
                break;

            // Node removeChild(in Node oldChild)
            case 5:
                if (percent(10)) {
                    console.log('id_' + rIds[0] + '.parentNode.removeChild(id_' + rIds[0] + ');');
                    id[rIds[0]].parentNode.removeChild(id[rIds[0]]);
                    removeThis(id[rIds[0]], 'direct');
                }
                break;

            // Node replaceChild(in Node newChild, in Node oldChild)
            case 6:
                if (percent(10)) {
                    console.log('id_' + rIds[0] + '.parentNode.replaceChild(id_' + rIds[1]  + ', id_' + rIds[0] + ');');
                    id[rIds[0]].parentNode.replaceChild(id[rIds[1]], id[rIds[0]]);
                    removeThis(id[rIds[0]], 'direct');
                }
                break;

            // Node cloneNode(in boolean deep);
            case 7:
                console.log('var clonedNode = id_' + rIds[1] + '.cloneNode(' + rBool + ');');
                var clonedNode = id[rIds[1]].cloneNode(rBool);
                console.log('id_' + rIds[0] + '.appendChild(clonedNode);');
                id[rIds[0]].appendChild(clonedNode);

                console.log('clonedNode.id = ' + id.length + ';');
                clonedNode.id = id.length;
                console.log('id_' + id.length + ' = clonedNode;');
                id[id.length] = clonedNode;

                if (rBool) {
                    clearChildrenId(clonedNode);
                }

                console.log('clonedNode = null;');
                clonedNode = null;
                break;

           default:
                console.log(' // Warning: DOMMan default');
                break;
        }
    } catch(e) {
        console.log('// Error: DOMMan: ' + e.message);
    }
}

/************************************* finale *************************************/
function finale() {
    if (demicm.IS_DEBUG) {
        console.log('[+] finale()');
    }

    /* Spray is not necessary
    console.log('occupySprayInt(' + demicm.ARRAY_LEN_MAX +', ' + demicm.ARRAY_CNT + ');');
    //occupySprayInt(demicm.ARRAY_LEN_MAX, demicm.ARRAY_CNT);
    */

    console.log('gc();');
    // gc();

    reuseElem();

    if (demicm.IS_FUZZ_RANGE) {
        reuseGroup();
    }

    reuseRetElem();
}

function reuseElem() {
    if (demicm.IS_DEBUG) {
        console.log('[+] reuseElem()');
    }

    try {
        console.log('id_1000 = document.createElement("a");');
        demicm.relayoutElem = document.createElement('a');
        console.log('document.body.appendChild(id_1000);');
        document.body.appendChild(demicm.relayoutElem); 

        for (var i = 0; i < id.length; i++) {
            console.log('id_' + i + ';');
            if (id[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'prop', 'node');
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'func', 'node');
                styleMan(i);
            }
        }

        relayout();

        clearAll();
    } catch(e) {
        console.log('// Error: reuseElem: ' + e.message);
    }
}

function reuseRetElem() {
    if (demicm.IS_DEBUG) {
        console.log('[+] reuseRetElem()');
    }

    try {
        for (var i = 0; i < idR.length; i++) {

            console.log('id_' + (i + demicm.RET_OFFSET) + ';');
            if (idR[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'prop', 'ret');
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'func', 'ret');

                console.log('id_' + (i + demicm.RET_OFFSET) + ' = null;');
                idR[i] = null;
            }
        }

        console.log('gc();');
        // gc();
    } catch(e) {
        console.log('// Error: reuseRetElem: ' + e.message);
    }
}

function relayout() {
    if (demicm.IS_DEBUG) {
        console.log('[+] relayout()');
    }

    try {
        console.log('id_1000.offsetParent;');
        demicm.relayoutElem.offsetParent;

        console.log('id_1000.innerHTML = id_1000.innerHTML;');
        demicm.relayoutElem.innerHTML = demicm.relayoutElem.innerHTML;

        console.log('id_1000.innerHTML = "";');
        demicm.relayoutElem.innerHTML = '';
    } catch(e) {
        console.log('// Error: relayout: ' + e.message);
    }
}

/************************************* outline *************************************/
function operate(count) {
    for (var i = 0; i < count; i++) {
        if (randId() == 'none') {
            return;
        }
        normalOperate();
        specialOperate();
    }
}

function normalOperate() {
    if (percent(demicm.RET_PER)) {
        objMan('ret');
    }

    var rId = randId();
    if (rId == 'none') {
        return;
    }

    if (percent(demicm.PROP_PER)) {
        propfMan([rId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'node');
    }

    if (percent(demicm.FUNC_PER)) {
        propfMan([rId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'node');
    }

    if (percent(demicm.STYLE_PER)) {
        styleMan(rId);
    }
}

function specialOperate() {
    if (percent(demicm.GC_PER)) {
        console.log('gc();');
        // gc();
    }

    if (percent(demicm.LAYOUT_PER)) {
        layout();
    }

    if (percent(demicm.CLEAR_PER)) {
        clear();
    }

    if (percent(demicm.CLEAR_ALL_PER)) {
        clearAll();
    }

    if (percent(demicm.DOM_PER)) {
        DOMMan();
    }

    if (demicm.IS_FUZZ_RANGE) {
        groupOperate();
    }

    // Vedio Audio Canvas...
}

function groupOperate() {
    if (percent(demicm.MOVE_ITR_PER)) {
        moveIterator();
    }

    if (percent(demicm.MOVE_TREE_PER)) {
        moveTreeWalker();
    }

    if (percent(demicm.SET_ELEM_RANGE_PER)) {
        setRange();
    }

    if (percent(demicm.ALTER_ELEM_RANGE_PER)) {
        alterRange();
    }

    if (percent(demicm.SET_SELECTION_PER)) {
        setSelection();
    }

    if (percent(demicm.ALTER_SELECTION_PER)) {
        alterSelection();
    }
}

function demiFront() {
    /* BEGIN FUZZING CODE */
    // logger = new LOGGER('demichrome1');
    // logger.starting();

    prelude();

    console.log('// we are now begining to fuzz...');
    operate(demicm.FRONT_OP_CNT);

    console.log('/-demiBack = function() {');
    setTimeout('demiBack()', 1);
}

function demiBack() {
    if (demicm.IS_DEBUG) {
        console.log('[+] demiBack()');
    }

    operate(demicm.BACK_OP_CNT);

    finale();

    // For setTimeout
    console.log('/-};');
    console.log('setTimeout("demiBack()",1);');

    /* END FUZZING CODE */
    // logger.finished();
    // window.location.href = window.location.protocol + '//' + window.location.host + '/grinder';
}

