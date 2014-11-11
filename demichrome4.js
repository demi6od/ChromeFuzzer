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
demicm.idBlackList = [];

// Id offset for non-elem object
demicm.SPEC_OFFSET = 2000;
demicm.RET_OFFSET = 3000;

// Special object
var idS = [];
demicm.rangeId = 0; // range
demicm.selId = 1; // selection
demicm.niId = 2; // nodeIterator
demicm.twId = 3; // treeWalker
demicm.curItrNodeId = 4; // currentIterateNode
demicm.curTreeNodeId = 5; // currentTreeNode

demicm.styleId = 6;
demicm.relayoutId = 7;
demicm.docId = 8;
demicm.winId = 9;
demicm.attrId = 10;
demicm.nodeMapId = 11;

// Prop or func return object
var idR = [];
// Ret object tag kinds
demicm.tagRs = [];

// Fuzzer type
demicm.IS_DEBUG = false;
demicm.IS_LOG_DEBUG = false;
demicm.IS_FUZZ_RANGE = true;
demicm.IS_FUZZ_SPEC = true;

// Fuzzer status
demicm.fuzzStat = 'start';

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
demicm.PROP_PER = 50; // 50
demicm.FUNC_PER = 40; // 40
demicm.STYLE_PER = 40; // 40
demicm.RET_PER = 80; // 80

demicm.LAYOUT_PER = 10; // 10
demicm.CLEAR_PER = 10; // 10
demicm.CLEAR_ALL_PER = 3; // 3
demicm.DOM_PER = 50; // 50
demicm.GC_PER = 20; // 20

demicm.WIN_DOC_PER = 20; // 20
demicm.ATTR_PER = 100; // 100
demicm.SET_ATTR_PER = 20; // 20

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
demicm.MAX_REC_DEPTH = 3; // 3
demicm.MAX_RET_REC_DEPTH = 3; // 3
demicm.MAX_REC_WIDE_CNT = 500; // 500 
demicm.MAX_REC_WIDE = 50; // 50 

demicm.MAX_LOOP = 100 // 100
demicm.MAX_ARR_LOOP = 1 // 1
demicm.MAX_ITR = 10 // 10
demicm.MAX_RET_ARR_CNT = 50 // 50

demicm.SPECIAL_FUNC_PARAM_NUM = 4; // 4

/************************************* range *************************************/
function constructNodeIterator() {
    try {
        var rId = randId('doc');
        if (rId == 'none') {
            return;
        }
        console.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) 
            + ' = document.createNodeIterator(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);');
        idS[demicm.niId] = document.createNodeIterator(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch(e) {
        console.log('// Error: constructNodeIterator: ' + e.message);
    }
}

function constructTreeWalker() {
    try {
        var rId = randId('doc');
        if (rId == 'none') {
            return;
        }
        console.log('id_' + (demicm.twId + demicm.SPEC_OFFSET) 
            + ' = document.createTreeWalker(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);');
        idS[demicm.twId] = document.createTreeWalker(id[rId], NodeFilter.SHOW_ALL, null, false);
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
        var rId = randId('doc');
        if (rId == 'none') {
            return;
        }
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setStart(id_' + rId + ', 0);');
        idS[demicm.rangeId].setStart(id[rId], 0);

        rId = randId('doc');
        if (rId == 'none') {
            return;
        }
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setEnd(id_' + rId + ', 0);');
        idS[demicm.rangeId].setEnd(id[rId], 0);
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
        var rId = randId('doc');
        if (rId == 'none') {
            return;
        }
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.selectNodeContents(id_' + rId + ');');
        idS[demicm.rangeId].selectNodeContents(id[rId]);

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
        console.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.referenceNode;');
        idS[demicm.curItrNodeId] = idS[demicm.niId].referenceNode;

        if (idS[demicm.curItrNodeId]) {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        console.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.root;');
        idS[demicm.curItrNodeId] = idS[demicm.niId].root;

        var count = 0;
        while (idS[demicm.curItrNodeId] && count < demicm.MAX_ITR)  {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            console.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();');
            idS[demicm.curItrNodeId] = idS[demicm.niId].nextNode();

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
        console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.currentNode;');
        idS[demicm.curTreeNodeId] = idS[demicm.twId].currentNode;

        if (idS[demicm.curTreeNodeId]) {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.root;');
        idS[demicm.curTreeNodeId] = idS[demicm.twId].root;

        var count = 0;
        while (idS[demicm.curTreeNodeId] && count < demicm.MAX_ITR)  {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                    + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();');
            idS[demicm.curTreeNodeId] = idS[demicm.twId].nextNode();

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
            switch (rand(2)) {
                case 0:
                    console.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();');
                    idS[demicm.curItrNodeId] = idS[demicm.niId].nextNode();
                    break;
                case 1:
                    console.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.previousNode();');
                    idS[demicm.curItrNodeId] = idS[demicm.niId].previousNode();
                    break;
            }

            propfMan([demicm.niId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curItrNodeId]) {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
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
            switch (rand(7)) {
                case 0:
                    console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].nextNode();
                    break;
                case 1:
                    console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousNode();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].previousNode();
                    break;
                case 2:
                    console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousSibling();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].previousSibling();
                    break;
                case 3:
                    console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextSibling();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].nextSibling();
                    break;
                case 4:
                    console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.firstChild();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].firstChild();
                    break;
                case 5:
                    console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.lastChild();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].lastChild();
                    break;
                case 6:
                    console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.parentNode();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].parentNode();
                    break;	
            }

            propfMan([demicm.twId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curTreeNodeId]) {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
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

        var rId = randId('doc');
        if (rId == 'none') {
            return;
        }
        switch (rand(4)) {
            case 0:
                console.log('var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.cloneContents();');
                var documentFragment = idS[demicm.rangeId].cloneContents();

                console.log('id_' + rId + '.appendChild(documentFragment);');
                id[rId].appendChild(documentFragment);

                console.log('documentFragment = null;');
                break;
            case 1:
                console.log('var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.extractContents();');
                var documentFragment = idS[demicm.rangeId].extractContents();

                console.log('id_' + rId + '.appendChild(documentFragment);');
                id[rId].appendChild(documentFragment);

                console.log('documentFragment = null;');
                break;
            case 2:
                var rHTMLCode = randHTMLCode(0x10, 5);
                console.log('var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) 
                    + '.createContextualFragment("' + rHTMLCode + '");');
                var documentFragment = idS[demicm.rangeId].createContextualFragment(rHTMLCode);

                console.log('id_' + rId + '.appendChild(documentFragment);');
                id[rId].appendChild(documentFragment);

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
        console.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.curItrNodeId] = null;
        console.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.detach();');
        idS[demicm.niId].detach();
        console.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.niId] = null;
        console.log('gc();');
        // gc();

        treeIteration();
        console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.curTreeNodeId] = null;
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
        console.log('[+] objMan(' + type + ')');
    }

    if (type == 'spec') {
        var rObjId = randObjId(idS);
    } else if (type == 'ret') {
        var rObjId = randObjId(idR);
    } else {
        console.log('// Warning: objMan else');
    }

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

    if (demicm.IS_FUZZ_SPEC) {
        constructSpec();
    }

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

    console.log('document.documentElement.contentEditable = "true";');
    document.documentElement.contentEditable = 'true';

    console.log('document.documentElement.dir = "rtl";');
    document.documentElement.dir = 'rtl';

    console.log('document.documentElement.draggable = "true";');
    document.documentElement.draggable = 'true';

    console.log('document.documentElement.spellcheck = "true";');
    document.documentElement.spellcheck = 'true';

    console.log('document.documentElement.translate = "true";');
    document.documentElement.translate = 'true';

    // Set at least one idR item for propfMan
    console.log('var id_' + demicm.RET_OFFSET + ' = null;');
    idR[0] = null;

    // Set props and funcs cache
    getPropAndFunc();
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
        try {
            // Set EVENT_NUM event handlers for setEvtId element
            var tagName = getTagName(id[setEvtId]); 
            if (!inArr(demicm.tags, tagName)) {
                updatePropfCache(id[setEvtId]);
            }
            for (var j = 0; j < demicm.EVENT_NUM; j++) {
                var rEvt = randPropf(tagName, id[setEvtId], 'evt');
                id[setEvtId][rEvt] = new Function('console.log("//id_' + setEvtId 
                    + '[\'' + rEvt + '\'] = function()");console.log("/-{");eventHandler();');
            }
        } catch(e) {
            console.log('// Error: setEvtHandler: ' + e.message);
        }
    }
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
                console.log('document.body.appendChild(id_' + (i + startId - 1) + ');');
                document.body.appendChild(id[i + startId - 1]);
            } else if (rootType == 'head') {
                console.log('document.head.appendChild(id_' + (i + startId - 1) + ');');
                document.head.appendChild(id[i + startId - 1]);
            }
        } else {
            var row = Math.ceil(Math.log(((branchNum - 1) / branchNum) * i+1) / Math.log(branchNum));
            var col = Math.ceil((i - branchNum * (Math.pow(branchNum, row - 1) - 1) / (branchNum - 1)) / branchNum);
            var parentId = Math.ceil(branchNum * (Math.pow(branchNum, row - 2) - 1) / (branchNum - 1)) + col;

            console.log('id_' + (parentId + startId - 1) + '.appendChild(id_' + (i + startId - 1) + ');');
            id[parentId + startId - 1].appendChild(id[i + startId - 1]);
        }
    }
}

function constructDOMTree() {
    // Add document, body, head to id[]
    demicm.idTags = ['body', 'head'];

    console.log('id_0 = document.documentElement;');
    id[0] = document.documentElement; 
    console.log('document.documentElement.id = 0;');
    document.documentElement.id = 0;
    
    console.log('id_1 = document.head;');
    id[1] = document.head; 
    console.log('document.head.id = 1;');
    document.head.id = 1;

    console.log('id_2 = document.body;');
    id[2] = document.body; 
    console.log('document.body.id = 2;');
    document.body.id = 2;

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
            console.log('document.documentElement.appendChild(document.createElement("' + demicm.idTags[i] + '"));');
            document.documentElement.appendChild(document.createElement(demicm.idTags[i])); 
        } catch(e) {
            console.log('// Error: constructDOMTree: ' + e.message);
        }
    }
}

function setAttr() {
    if (demicm.IS_DEBUG) {
        console.log('[+] setAttr()');
    }

    try {
        if (percent(50)) {
            var rStr = randAlpha(10);
        } else {
            var rStr = 'attrName';
        }
        console.log('id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ' = document.createAttribute("'+ rStr + '");');
        idS[demicm.attrId] = document.createAttribute(rStr);

        var rStr = randAlpha(10);
        console.log('id_' + (demicm.attrId + demicm.SPEC_OFFSET) + '.value = "' + rStr + '";');
        idS[demicm.attrId].value = rStr;

        var rId = randId('doc', true);
        if (rId == 'none') {
            return;
        }
        console.log('id_' + rId + '.setAttributeNode(id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ');');
        id[rId].setAttributeNode(idS[demicm.attrId]);

        console.log('id_' + (demicm.nodeMapId + demicm.SPEC_OFFSET) + ' = id_' + rId + '.attributes;');
        idS[demicm.nodeMapId] = id[rId].attributes;
    } catch(e) {
        console.log('// Error: setAttr: ' + e.message);
    }
}

function constructSpec() {
    if (demicm.IS_DEBUG) {
        console.log('[+] constructSpec()');
    }

    try {
        console.log('id_' + (demicm.winId + demicm.SPEC_OFFSET) + ' = window;');
        idS[demicm.winId] = window;

        console.log('id_' + (demicm.docId + demicm.SPEC_OFFSET) + ' = document;');
        idS[demicm.docId] = document;

        setAttr();
    } catch(e) {
        console.log('// Error: constructSpec: ' + e.message);
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

    // Add style elem
    console.log('id_' + (demicm.styleId + demicm.SPEC_OFFSET) + ' = document.createElement("style");');
    idS[demicm.styleId] = document.createElement('style'); 

    console.log('id_' + (demicm.styleId + demicm.SPEC_OFFSET) + '.innerText = "' + cssList + '";');
    idS[demicm.styleId].innerText = cssList;

    console.log('document.documentElement.appendChild(id_' + (demicm.styleId + demicm.SPEC_OFFSET) + ');');
    document.documentElement.appendChild(idS[demicm.styleId]);
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
        var arrCnt = 0;

        //console.log('for (var p in ' + logObjStr + ') { ' + logObjStr + '[p]; }');
        for (var p in fuzzObj) {
            if (fuzzObj[p] 
                && typeof fuzzObj[p] == 'object' 
                && !isPosInt(fuzzObj[p].id) 
                && !inArr(demicm.propBlackList, p)
                && !inArr(idS, fuzzObj[p])) {
                if (isPosInt(p)) {
                    arrCnt++;
                    if (arrCnt > demicm.MAX_ARR_LOOP) {
                        break;
                    }
                }

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
        if (!inArr(demicm.tags, tagName)) {
            updatePropfCache(fuzzObj);
        }
        var propf = randPropf(tagName, fuzzObj, type);

        // Debug
        if (demicm.IS_DEBUG) {
            console.log('[+] FuzzObj: ' + fuzzObjStr + ', propf: ' + propf);
        }

        // Assert property number is not 0 or unexpected tagName
        if (!propf) {
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
        randObjIds(rIdRs, 10, idR);
        if (rIdRs[0] == 'none') {
            if (objType == 'ret') {
                return;
            } else {
                rIdRs = [0,0,0,0,0,0,0,0,0,0];
            }
        }

        var rIdSs = [];
        randObjIds(rIdSs, 10, idS);
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
            console.log('// Warning: propfMan else');
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
        if (demicm.IS_LOG_DEBUG) {
            console.log('log debug:');
            console.log('var retVal = ' + fuzzObjStr + '["' + prop + '"];');
        }
        console.log('var retVal = ' + logObjStr + '["' + prop + '"];');
        eval('var retVal = ' + fuzzObjStr + '["' + prop + '"];');

        // Return value is new object
        var tagR = getTagName(retVal);
        if (retVal 
            && typeof retVal == 'object' 
            && !isPosInt(retVal.id)
            && !inArr(demicm.tagRs, tagR)
            && !inArr(idS, retVal)
            && idR.length < demicm.MAX_RET_ARR_CNT) {
            demicm.tagRs.push(tagR);

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
        if (bNormalFunc) {
            var params = demicm.funcDic[func];
            for (var i = 1; i < params.length; i++) {
                if (percent(demicm.FUNC_DIRTY_PER) && params[i].dirtyVal.length != 0) {
                    // Set dirty value
                    var rVal = randItem(params[i].dirtyVal);
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'node') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'node') + ',';
                } else if (percent(demicm.FUNC_NORMAL_PER) && params[i].normalVal.length != 0) {
                    // Set normal value
                    var rVal = randItem(params[i].normalVal);
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'node') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'node') + ',';
                } else if (percent(demicm.FUNC_RANDOM_PER) || true) {
                    // Set random value
                    var randValTable = {};
                    randPropfVal(rIds[i], rIdRs[i], 'func', randValTable);
                    var rVal = randValTable[params[i].type];

                    if (rVal != undefined) {
                        paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'node') + ',';
                        paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'node') + ',';
                    } else {
                        // Set random ret obj
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
                if (percent(40)) {
                    // Set random ret obj
                    var randValTable = {};
                    randPropfVal(rIds[i], rIdRs[i], 'func', randValTable);
                    var rVal = randValTable['objectR'];
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'ret') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'ret') + ',';
                } else if (percent(30)){
                    // Set random obj
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', id[rIds[i]], 'node') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', id[rIds[i]], 'node') + ',';
                } else if (percent(30)) {
                    // Set funcs
                    var rVal = demicm.func;
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'node') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'node') + ',';
                } else if (percent(100)) {
                    // Set dirtyParamVals
                    var rVal = randItem(demicm.dirtyParamVals);
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'node') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'node') + ',';
                }
            }
        }

        // trim paramStr
        if (paramStr != '') {
            paramStr = paramStr.substr(0, paramStr.length - 1);
            paramLogStr = paramLogStr.substr(0, paramLogStr.length - 1);
        }

        if (demicm.IS_LOG_DEBUG) {
            console.log('log debug:');
            console.log('var retVal = ' + fuzzObjStr + '["' + func + '"](' + paramStr + ');');
        }
        console.log('var retVal = ' +  logObjStr + '["' + func + '"](' + paramLogStr + ');');
        eval('var retVal = ' + fuzzObjStr + '["' + func + '"](' + paramStr + ');');

        // Return value is new object
        var tagR = getTagName(retVal);
        if (retVal 
            && typeof retVal == 'object' 
            && !isPosInt(retVal.id)
            && !inArr(demicm.tagRs, tagR)
            && !inArr(idS, retVal)
            && idR.length < demicm.MAX_RET_ARR_CNT) {
            demicm.tagRs.push(tagR);

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
        var rId = randId('id', false, true);
        if (rId == 'none') {
            return;
        }

        switch (rand(8)) {
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
                console.log('// Warning: clear default');
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
            switch (rand(3)) {
                case 0:
                    console.log('document.write("");');
                    document.write('');
                    break;
                case 1:
                    console.log('document.writeln("");');
                    document.writeln('');
                    break;
                case 2:
                    console.log('document.open("");');
                    document.open('');
                    break;
                default:
                    console.log('// Warning: clearAll default');
                    break;
            }
        } else {
            console.log('document.documentElement.innerHTML = "";');
            document.documentElement.innerHTML = '';
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

        switch (rand(8)) {
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
                console.log('// Warning: DOMMan default');
                break;
        }
    } catch(e) {
        console.log('// Error: DOMMan: ' + e.message);
    }
}

function winDocMan() {
    if (demicm.IS_DEBUG) {
        console.log('[+] winDocMan()');
    }

    try {
        switch (rand(2)) {
            case 0:
                var fId = demicm.docId;
                break;
            case 1:
                var fId = demicm.winId;
                break;
            default:
                console.log('// Warning: winDocMan default');
                break;
        }
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch(e) {
        console.log('// Error: winDocMan: ' + e.message);
    }
}

function attrMan() {
    if (demicm.IS_DEBUG) {
        console.log('[+] attrMan()');
    }

    try {
        if (demicm.SET_ATTR_PER) {
            setAttr();
        }

        switch (rand(2)) {
            case 0:
                var fId = demicm.attrId;
                break;
            case 1:
                var fId = demicm.nodeMapId;
                break;
            default:
                console.log('// Warning: attrMan default');
                break;
        }
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch(e) {
        console.log('// Error: attrMan: ' + e.message);
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

    if (demicm.IS_FUZZ_SPEC) {
        reuseSpec();
    }

    reuseRetElem();
}

function reuseElem() {
    if (demicm.IS_DEBUG) {
        console.log('[+] reuseElem()');
    }

    try {
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

function reuseSpec() {
    if (demicm.IS_DEBUG) {
        console.log('[+] reuseSpec()');
    }

    try {
        for (var i = 0; i < idS.length; i++) {
            console.log('id_' + (i + demicm.SPEC_OFFSET) + ';');
            if (idS[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'prop', 'spec');
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'func', 'spec');

                console.log('id_' + (i + demicm.SPEC_OFFSET) + ' = null;');
                idS[i] = null;
            }
        }

        console.log('gc();');
        // gc();
    } catch(e) {
        console.log('// Error: reuseSpec: ' + e.message);
    }
}

function relayout() {
    if (demicm.IS_DEBUG) {
        console.log('[+] relayout()');
    }

    try {
        console.log('id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + ' = document.createElement("a");');
        idS[demicm.relayoutId] = document.createElement('a');
        console.log('document.documentElement.appendChild(id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + ');');
        document.documentElement.appendChild(idS[demicm.relayoutId]); 

        console.log('id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.offsetParent;');
        idS[demicm.relayoutId].offsetParent;

        console.log('id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML = id_'
            + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML;');
        idS[demicm.relayoutId].innerHTML = idS[demicm.relayoutId].innerHTML;

        console.log('id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML = "";');
        idS[demicm.relayoutId].innerHTML = '';
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

    if (percent(demicm.RET_PER)) {
        objMan('ret');
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

    if (demicm.IS_FUZZ_SPEC) {
        specObjMan();
    }

    if (demicm.IS_FUZZ_RANGE) {
        groupMan();
    }
}

function specObjMan() {
    if (percent(demicm.WIN_DOC_PER)) {
        winDocMan();
    }

    if (percent(demicm.ATTR_PER)) {
        attrMan();
    }

    // Vedio Audio Canvas...
}

function groupMan() {
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

