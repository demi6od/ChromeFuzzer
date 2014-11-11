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
demicm.curNodeId = 4; // currentNode
demicm.curLeafId = 5; // currentLeaf

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
        logger.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) 
            + ' = document.createNodeIterator(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);', 'grind', 1);
        idS[demicm.niId] = document.createNodeIterator(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch(e) {
        logger.log('// Error: constructNodeIterator: ' + e.message, 'grind', 1);
    }
}

function constructTreeWalker() {
    try {
        var rId = randId('doc');
        if (rId == 'none') {
            return;
        }
        logger.log('id_' + (demicm.twId + demicm.SPEC_OFFSET) 
            + ' = document.createTreeWalker(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);', 'grind', 1);
        idS[demicm.twId] = document.createTreeWalker(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch(e) {
        logger.log('// Error: constructTreeWalker: ' + e.message, 'grind', 1);
    }
}

function constructRange() {
    try {
        logger.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ' = document.createRange();', 'grind', 1);
        idS[demicm.rangeId] = document.createRange();

        setRange();
    } catch(e) {
        logger.log('// Error: constructRange: ' + e.message, 'grind', 1);
    }
}

function setRange() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] setRange()', 'grind', 1);
    }

    try {
        var rId = randId('doc');
        if (rId == 'none') {
            return;
        }
        logger.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setStart(id_' + rId + ', 0);', 'grind', 1);
        idS[demicm.rangeId].setStart(id[rId], 0);

        rId = randId('doc');
        if (rId == 'none') {
            return;
        }
        logger.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setEnd(id_' + rId + ', 0);', 'grind', 1);
        idS[demicm.rangeId].setEnd(id[rId], 0);
    } catch(e) {
        logger.log('// Error: setRange: ' + e.message, 'grind', 1);
    }
}

function constructSelection() {
    try {
        logger.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) + ' = window.getSelection();', 'grind', 1);
        idS[demicm.selId] = window.getSelection();

        setSelection();
    } catch(e) {
        logger.log('// Error: constructSelection: ' + e.message, 'grind', 1);
    }
}

function setSelection() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] setSelection()', 'grind', 1);
    }

    try {
        var rId = randId('doc');
        if (rId == 'none') {
            return;
        }
        logger.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.selectNodeContents(id_' + rId + ');', 'grind', 1);
        idS[demicm.rangeId].selectNodeContents(id[rId]);

        logger.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) + '.removeAllRanges();', 'grind', 1);
        idS[demicm.selId].removeAllRanges();

        logger.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) 
            + '.addRange(id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ');', 'grind', 1);
        idS[demicm.selId].addRange(idS[demicm.rangeId]);
    } catch(e) {
        logger.log('// Error: setSelection: ' + e.message, 'grind', 1);
    }
}

function nodeIteration() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] nodeIteration()', 'grind', 1);
    }

    try {
        // Fuzz current node
        logger.log('id_' + (demicm.curNodeId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.referenceNode;', 'grind', 1);
        idS[demicm.curNodeId] = idS[demicm.niId].referenceNode;

        if (idS[demicm.curNodeId]) {
            propfMan([demicm.curNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        logger.log('id_' + (demicm.curNodeId + demicm.SPEC_OFFSET) + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.root;', 'grind', 1);
        idS[demicm.curNodeId] = idS[demicm.niId].root;

        var count = 0;
        while (idS[demicm.curNodeId] && count < demicm.MAX_ITR)  {
            propfMan([demicm.curNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            logger.log('id_' + (demicm.curNodeId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();', 'grind', 1);
            idS[demicm.curNodeId] = idS[demicm.niId].nextNode();

            count++;
        }
    } catch(e) {
        logger.log('// Error: nodeIteration: ' + e.message, 'grind', 1);
    }
}

function treeIteration() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] treeIteration()', 'grind', 1);
    }

    try {
        // Fuzz current node
        logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.currentNode;', 'grind', 1);
        idS[demicm.curLeafId] = idS[demicm.twId].currentNode;

        if (idS[demicm.curLeafId]) {
            propfMan([demicm.curLeafId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curLeafId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.root;', 'grind', 1);
        idS[demicm.curLeafId] = idS[demicm.twId].root;

        var count = 0;
        while (idS[demicm.curLeafId] && count < demicm.MAX_ITR)  {
            propfMan([demicm.curLeafId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curLeafId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) 
                    + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();', 'grind', 1);
            idS[demicm.curLeafId] = idS[demicm.twId].nextNode();

            count++;
        }
    } catch(e) {
        logger.log('// Error: treeIteration: ' + e.message, 'grind', 1);
    }
}

function moveIterator() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] moveIterator()', 'grind', 1);
    }

    try {
        var rMoves = rand(3) + 1;
        for (var i = 0; i < rMoves; i++) {
            switch (rand(2)) {
                case 0:
                    logger.log('id_' + (demicm.curNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();', 'grind', 1);
                    idS[demicm.curNodeId] = idS[demicm.niId].nextNode();
                    break;
                case 1:
                    logger.log('id_' + (demicm.curNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.previousNode();', 'grind', 1);
                    idS[demicm.curNodeId] = idS[demicm.niId].previousNode();
                    break;
            }

            propfMan([demicm.niId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curNodeId]) {
            propfMan([demicm.curNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch(e) {
        logger.log('// Error: moveIterator: ' + e.message, 'grind', 1);
    }
}

function moveTreeWalker() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] moveTreeWalker()', 'grind', 1);
    }

    try {
        var rMoves = rand(3) + 1;
        for (var i = 0; i < rMoves; i++) {
            switch (rand(7)) {
                case 0:
                    logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();', 'grind', 1);
                    idS[demicm.curLeafId] = idS[demicm.twId].nextNode();
                    break;
                case 1:
                    logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousNode();', 'grind', 1);
                    idS[demicm.curLeafId] = idS[demicm.twId].previousNode();
                    break;
                case 2:
                    logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousSibling();', 'grind', 1);
                    idS[demicm.curLeafId] = idS[demicm.twId].previousSibling();
                    break;
                case 3:
                    logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextSibling();', 'grind', 1);
                    idS[demicm.curLeafId] = idS[demicm.twId].nextSibling();
                    break;
                case 4:
                    logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.firstChild();', 'grind', 1);
                    idS[demicm.curLeafId] = idS[demicm.twId].firstChild();
                    break;
                case 5:
                    logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.lastChild();', 'grind', 1);
                    idS[demicm.curLeafId] = idS[demicm.twId].lastChild();
                    break;
                case 6:
                    logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.parentNode();', 'grind', 1);
                    idS[demicm.curLeafId] = idS[demicm.twId].parentNode();
                    break;	
            }

            propfMan([demicm.twId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curLeafId]) {
            propfMan([demicm.curLeafId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curLeafId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch(e) {
        logger.log('// Error: moveTreeWalker: ' + e.message, 'grind', 1);
    }
}		

function alterRange() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] alterRange()', 'grind', 1);
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
                logger.log('var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.cloneContents();', 'grind', 1);
                var documentFragment = idS[demicm.rangeId].cloneContents();

                logger.log('id_' + rId + '.appendChild(documentFragment);', 'grind', 1);
                id[rId].appendChild(documentFragment);

                logger.log('documentFragment = null;', 'grind', 1);
                break;
            case 1:
                logger.log('var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.extractContents();', 'grind', 1);
                var documentFragment = idS[demicm.rangeId].extractContents();

                logger.log('id_' + rId + '.appendChild(documentFragment);', 'grind', 1);
                id[rId].appendChild(documentFragment);

                logger.log('documentFragment = null;', 'grind', 1);
                break;
            case 2:
                var rHTMLCode = randHTMLCode(0x10, 5);
                logger.log('var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) 
                    + '.createContextualFragment("' + rHTMLCode + '");', 'grind', 1);
                var documentFragment = idS[demicm.rangeId].createContextualFragment(rHTMLCode);

                logger.log('id_' + rId + '.appendChild(documentFragment);', 'grind', 1);
                id[rId].appendChild(documentFragment);

                logger.log('documentFragment = null;', 'grind', 1);
                break;
            case 3:
                logger.log('var rangeCache = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.cloneRange();', 'grind', 1);
                var rangeCache = idS[demicm.rangeId].cloneRange();

                var type = randItem(['START_TO_START', 'END_TO_END', 'START_TO_END', 'END_TO_START']);
                logger.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) 
                    + '.compareBoundaryPoints(Range.' + type + ', rangeCache);', 'grind', 1);
                eval('idS[demicm.rangeId].compareBoundaryPoints(Range.' + type + ', rangeCache);');

                logger.log('rangeCache.detach();', 'grind', 1);
                rangeCache.detach();

                logger.log('rangeCache = null;', 'grind', 1);
                break;						
        }		
    } catch(e) {
        logger.log('// Error: alterRange: ' + e.message, 'grind', 1);
    }
}

function alterSelection() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] alterSelection()', 'grind', 1);
    }

    try {
        // Execute command on selection
        var cmd = randItem(demicm.commands);
        logger.log('document.execCommand(' +  cmd + ');', 'grind', 1);
        eval('document.execCommand(' +  cmd + ');');

        propfMan([demicm.selId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.selId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

        if (percent(20)) {
            logger.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) 
                + '.addRange(id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ');', 'grind', 1);
            idS[demicm.selId].addRange(idS[demicm.rangeId]);
        }
    } catch(e) {
        logger.log('// Error: alterSelection: ' + e.message, 'grind', 1);
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
        logger.log('[+] reuseGroup()', 'grind', 1);
    }

    try {
        nodeIteration();
        logger.log('id_' + (demicm.curNodeId + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
        idS[demicm.curNodeId] = null;
        logger.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.detach();', 'grind', 1);
        idS[demicm.niId].detach();
        logger.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
        idS[demicm.niId] = null;
        logger.log('gc();', 'grind', 1);
        gc();

        treeIteration();
        logger.log('id_' + (demicm.curLeafId + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
        idS[demicm.curLeafId] = null;
        logger.log('id_' + (demicm.twId + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
        idS[demicm.twId] = null;
        logger.log('gc();', 'grind', 1);
        gc();

        alterRange();
        logger.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.detach();', 'grind', 1);
        idS[demicm.rangeId].detach();
        logger.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
        idS[demicm.rangeId] = null;
        logger.log('gc();', 'grind', 1);
        gc();

        alterSelection();
        logger.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
        idS[demicm.selId] = null;
        logger.log('gc();', 'grind', 1);
        gc();
    } catch(e) {
        logger.log('// Error: reuseGroup: ' + e.message, 'grind', 1);
    }
}

function objMan(type) {
    if (demicm.IS_DEBUG) {
        logger.log('[+] objMan(' + type + ')', 'grind', 1);
    }

    if (type == 'spec') {
        var rObjId = randObjId(idS);
    } else if (type == 'ret') {
        var rObjId = randObjId(idR);
    } else {
        logger.log('// Warning: objMan else', 'grind', 1);
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
    logger.log('document.designMode = "on";', 'grind', 1);
    document.designMode = 'on';

    logger.log('document.documentElement.contentEditable = "true";', 'grind', 1);
    document.documentElement.contentEditable = 'true';

    logger.log('document.documentElement.dir = "rtl";', 'grind', 1);
    document.documentElement.dir = 'rtl';

    logger.log('document.documentElement.draggable = "true";', 'grind', 1);
    document.documentElement.draggable = 'true';

    logger.log('document.documentElement.spellcheck = "true";', 'grind', 1);
    document.documentElement.spellcheck = 'true';

    logger.log('document.documentElement.translate = "true";', 'grind', 1);
    document.documentElement.translate = 'true';

    // Set at least one idR item for propfMan
    logger.log('var id_' + demicm.RET_OFFSET + ' = null;', 'grind', 1);
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

    logger.log('/-};', 'grind', 1);
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
                id[setEvtId][rEvt] = new Function('logger.log("//id_' + setEvtId 
                    + '[\'' + rEvt + '\'] = function()", "grind", 1);logger.log("/-{", "grind", 1);eventHandler();');
            }
        } catch(e) {
            logger.log('// Error: setEvtHandler: ' + e.message, 'grind', 1);
        }
    }
}

function addTextNode() {
    for (var i = 0; i < demicm.TEXT_NUM; i++) {
        try {
            var rStr = randStr(rand(0x100)); 
            var newId = demicm.elemNum + i;

            logger.log('id_' + newId + ' = document.createTextNode("' + rStr + '");', 'grind', 1);
            id[newId] = document.createTextNode(rStr);
            logger.log('id_' + newId + '.id = ' + newId + ';', 'grind', 1);
            id[newId].id = newId;

            var rId = 0;
            // id[0] = documentElem, id[4] = cssNode can't add textNode
            while (rId == 0 || rId == 4) {
                rId = rand(demicm.elemNum);
            }
            logger.log('id_' + rId + '.appendChild(id_' + newId + ');', 'grind', 1);
            id[rId].appendChild(id[newId]);
        } catch(e) {
            logger.log('// Error: addTextNode: ' + e.message, 'grind', 1);
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

            logger.log('id_' + rId + '.appendChild(document.createTextNode("' + rStr + '"));', 'grind', 1);
            id[rId].appendChild(document.createTextNode(rStr));
        } catch(e) {
            logger.log('// Error: addTextNode: ' + e.message, 'grind', 1);
        }
    }
}

function constructTree(rootType, startId, len, branchNum) {
    for (var i = 1; i <= len; i++) {
        if (i <= branchNum) {
            if (rootType == 'body') {
                logger.log('document.body.appendChild(id_' + (i + startId - 1) + ');', 'grind', 1);
                document.body.appendChild(id[i + startId - 1]);
            } else if (rootType == 'head') {
                logger.log('document.head.appendChild(id_' + (i + startId - 1) + ');', 'grind', 1);
                document.head.appendChild(id[i + startId - 1]);
            }
        } else {
            var row = Math.ceil(Math.log(((branchNum - 1) / branchNum) * i+1) / Math.log(branchNum));
            var col = Math.ceil((i - branchNum * (Math.pow(branchNum, row - 1) - 1) / (branchNum - 1)) / branchNum);
            var parentId = Math.ceil(branchNum * (Math.pow(branchNum, row - 2) - 1) / (branchNum - 1)) + col;

            logger.log('id_' + (parentId + startId - 1) + '.appendChild(id_' + (i + startId - 1) + ');', 'grind', 1);
            id[parentId + startId - 1].appendChild(id[i + startId - 1]);
        }
    }
}

function constructDOMTree() {
    // Add document, body, head to id[]
    demicm.idTags = ['body', 'head'];

    logger.log('id_0 = document.documentElement;', 'grind', 1);
    id[0] = document.documentElement; 
    logger.log('document.documentElement.id = 0;', 'grind', 1);
    document.documentElement.id = 0;
    
    logger.log('id_1 = document.head;', 'grind', 1);
    id[1] = document.head; 
    logger.log('document.head.id = 1;', 'grind', 1);
    document.head.id = 1;

    logger.log('id_2 = document.body;', 'grind', 1);
    id[2] = document.body; 
    logger.log('document.body.id = 2;', 'grind', 1);
    document.body.id = 2;

    demicm.reserveIdNum = id.length;
    var reserveTagNum = demicm.idTags.length;

    demicm.elemNum = demicm.reserveIdNum + demicm.HEAD_CHILD_NUM + demicm.BODY_CHILD_NUM + demicm.FRAG_ELEM_NUM;

    var delta = demicm.reserveIdNum - reserveTagNum;
    // Create elems to id[] with random tag
    for (var i = demicm.reserveIdNum; i < demicm.elemNum; i++) {
        demicm.idTags.push(randItem(demicm.strictTags));

        logger.log('id_' + i + ' = document.createElement("' + demicm.idTags[i - delta] + '");', 'grind', 1);
        id[i] = document.createElement(demicm.idTags[i - delta]);
        logger.log('id_' + i + '.id = ' + i + ';', 'grind', 1);
        id[i].id = i;
    }

    // Construct body and head tree 
    constructTree('body', demicm.reserveIdNum, demicm.BODY_CHILD_NUM, demicm.BRANCH_NUM);
    constructTree('head', demicm.BODY_CHILD_NUM + demicm.reserveIdNum, demicm.HEAD_CHILD_NUM, demicm.BRANCH_NUM);

    // For IE cache
    for (var i = reserveTagNum; i < demicm.idTags.length; i++) {
        try {
            logger.log('document.documentElement.appendChild(document.createElement("' + demicm.idTags[i] + '"));', 'grind', 1);
            document.documentElement.appendChild(document.createElement(demicm.idTags[i])); 
        } catch(e) {
            logger.log('// Error: constructDOMTree: ' + e.message, 'grind', 1);
        }
    }
}

function setAttr() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] setAttr()', 'grind', 1);
    }

    try {
        if (percent(50)) {
            var rStr = randAlpha(10);
        } else {
            var rStr = 'attrName';
        }
        logger.log('id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ' = document.createAttribute("'+ rStr + '");', 'grind', 1);
        idS[demicm.attrId] = document.createAttribute(rStr);

        var rStr = randAlpha(10);
        logger.log('id_' + (demicm.attrId + demicm.SPEC_OFFSET) + '.value = "' + rStr + '";', 'grind', 1);
        idS[demicm.attrId].value = rStr;

        var rId = randId('doc', true);
        if (rId == 'none') {
            return;
        }
        logger.log('id_' + rId + '.setAttributeNode(id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ');', 'grind', 1);
        id[rId].setAttributeNode(idS[demicm.attrId]);

        logger.log('id_' + (demicm.nodeMapId + demicm.SPEC_OFFSET) + ' = id_' + rId + '.attributes;', 'grind', 1);
        idS[demicm.nodeMapId] = id[rId].attributes;
    } catch(e) {
        logger.log('// Error: setAttr: ' + e.message, 'grind', 1);
    }
}

function constructSpec() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] constructSpec()', 'grind', 1);
    }

    try {
        logger.log('id_' + (demicm.winId + demicm.SPEC_OFFSET) + ' = window;', 'grind', 1);
        idS[demicm.winId] = window;

        logger.log('id_' + (demicm.docId + demicm.SPEC_OFFSET) + ' = document;', 'grind', 1);
        idS[demicm.docId] = document;

        setAttr();
    } catch(e) {
        logger.log('// Error: constructSpec: ' + e.message, 'grind', 1);
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
    logger.log('id_' + (demicm.styleId + demicm.SPEC_OFFSET) + ' = document.createElement("style");', 'grind', 1);
    idS[demicm.styleId] = document.createElement('style'); 

    logger.log('id_' + (demicm.styleId + demicm.SPEC_OFFSET) + '.innerText = "' + cssList + '";', 'grind', 1);
    idS[demicm.styleId].innerText = cssList;

    logger.log('document.documentElement.appendChild(id_' + (demicm.styleId + demicm.SPEC_OFFSET) + ');', 'grind', 1);
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
            logger.log('[+] FuzzObj: ' + fuzzObjStr + ', propf: ' + propf, 'grind', 1);
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
            logger.log('// Warning: propfMan else', 'grind', 1);
        }
    } catch(e) {
        logger.log('// Error: propfMan: ' + e.message, 'grind', 1);
    }
    finally {
        propStack.pop();
    }
}

function propMan(fuzzObj, fuzzObjStr, logObjStr, prop, bNormalProp, rIds, rIdRs, rIdSs, objType) {
    try {
        // Get value
        if (demicm.IS_LOG_DEBUG) {
            logger.log('log debug:', 'grind', 1);
            logger.log('var retVal = ' + fuzzObjStr + '["' + prop + '"];', 'grind', 1);
        }
        logger.log('var retVal = ' + logObjStr + '["' + prop + '"];', 'grind', 1);
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

            logger.log('id_' + (idR.length + demicm.RET_OFFSET) + ' = retVal;', 'grind', 1);
            idR[idR.length] = retVal;
        }

        // Set dirty value
        if (bNormalProp && percent(demicm.PROP_DIRTY_PER) && demicm.propDic[prop].dirtyVal.length != 0) {
            var rDirtyVal = randItem(demicm.propDic[prop].dirtyVal);
            logger.log(logObjStr + '["' + prop + '"] = ' 
                + logRevise(rIds[1], rIdRs[1], 'prop', rDirtyVal, 'node') + ';', 'grind', 1);
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
            logger.log(logObjStr + '["' + prop + '"] = ' 
                + logRevise(rIds[1], rIdRs[1], 'prop', rNormalVal, 'node') + ';', 'grind', 1);
            eval(fuzzObjStr + '["' + prop + '"] = rNormalVal;');
        // Set random value
        } else if (percent(demicm.PROP_RANDOM_PER)) {
            var randValTable = {};
            randPropfVal(rIds[1], rIdRs[1], 'prop', randValTable);
            var rVal = bNormalProp ? randValTable[demicm.propDic[prop].type] : randValTable[typeof fuzzObj[prop]];

            if (rVal != undefined) {
                logger.log(logObjStr + '["' + prop + '"] = ' 
                    + logRevise(rIds[1], rIdRs[1], 'prop', rVal, 'node') + ';', 'grind', 1);
                eval(fuzzObjStr + '["' + prop + '"] = rVal;');
            } else {
                logger.log(logObjStr + '["' + prop + '"] = ' 
                    + logRevise(rIds[1], rIdRs[1], 'prop', randValTable['objectR'], 'ret') + ';', 'grind', 1);
                eval(fuzzObjStr + '["' + prop + '"] = randValTable["objectR"];');
            }
        // Set some value from one object to the value of another
        } else if (percent(60)) {
            if (objType == 'spec') {
                logger.log(logObjStr + '["' + prop + '"] = id_' 
                    + (rIdSs[1] + demicm.SPEC_OFFSET) + '["' + prop + '"];', 'grind', 1);
                eval(fuzzObjStr + '["' + prop + '"] = idS[rIdSs[1]][prop];');
            } else if (objType == 'ret') {
                logger.log(logObjStr + '["' + prop + '"] = id_' + (rIdRs[1] 
                        + demicm.RET_OFFSET) + '["' + prop + '"];', 'grind', 1);
                eval(fuzzObjStr + '["' + prop + '"] = idR[rIdRs[1]][prop];');
            } else if (objType == 'node') {
                logger.log(logObjStr + '["' + prop + '"] = id_' + rIds[1] + '["' + prop + '"];', 'grind', 1);
                eval(fuzzObjStr + '["' + prop + '"] = id[rIds[1]][prop];');
            } else { 
                logger.log('// Warning: propMan: else', 'grind', 1);
            }
        // Set some property to NULL...
        } else {
            logger.log(logObjStr + '["' + prop + '"] = null;', 'grind', 1);
            eval(fuzzObjStr + '["' + prop + '"] = null;');
        }

        logger.log('retVal = null;', 'grind', 1);
    } catch(e) {
        logger.log('// Error: propMan: ' + e.message, 'grind', 1);
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
                    logger.log('// Warning: funcMan else', 'grind', 1);
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
            logger.log('log debug:', 'grind', 1);
            logger.log('var retVal = ' + fuzzObjStr + '["' + func + '"](' + paramStr + ');', 'grind', 1);
        }
        logger.log('var retVal = ' +  logObjStr + '["' + func + '"](' + paramLogStr + ');', 'grind', 1);
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

            logger.log('id_' + (idR.length + demicm.RET_OFFSET) + ' = retVal;', 'grind', 1);
            idR[idR.length] = retVal;

            if (retValDepth > 0) {
                propfMan([idR.length - 1], recDepth - 1, retValDepth - 1, 'prop', 'ret');
                propfMan([idR.length - 1], recDepth - 1, retValDepth - 1, 'func', 'ret');
            }
        }

        logger.log('retVal = null;', 'grind', 1);
    } catch(e) {
        logger.log('// Error: funcMan: ' + e.message, 'grind', 1);
    }
}

function styleMan(rId) {
    var rStyle = randStyle();
    var rStyleVal = randStyleVal(rStyle);

    // Only element has style
    if (id[rId] && id[rId].nodeType == 1) {
        logger.log('id_' + rId + '.style["' + rStyle + '"] = "' + rStyleVal + '";', 'grind', 1);
        id[rId].style[rStyle] = rStyleVal;
    }
}

function layout() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] layout()', 'grind', 1);
    }

    try {
        for (var i = 0; i < 3; i++) {
            var rId = randId();
            if (rId == 'none') {
                return;
            }

            logger.log('id_' + rId + '.offsetParent;', 'grind', 1);
            id[rId].offsetParent;
        }
    } catch(e) {
        logger.log('// Error: layout: ' + e.message, 'grind', 1);
    }
}

function clear() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] clear()', 'grind', 1);
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

                logger.log('id_' + rId + '.innerHTML = "demi6od";', 'grind', 1);
                id[rId].innerHTML = 'demi6od';

                removeCache(caches);
                break;

            case 1:
                logger.log('id_' + rId + '.outerHTML = "";', 'grind', 1);
                id[rId].outerHTML = '';

                removeThis(id[rId], 'direct');
                break;

            case 2:
                var caches = [];
                removeChildren(id[rId], 'delay', caches);

                logger.log('id_' + rId + '.innerText = "demi6od";', 'grind', 1);
                id[rId].innerText = 'demi6od';

                removeCache(caches);
                break;

            case 3:
                logger.log('id_' + rId + '.outerText = "";', 'grind', 1);
                id[rId].outerText = '';
                removeThis(id[rId], 'direct');
                break;

            case 4:
                var caches = [];
                removeChildren(id[rId], 'delay', caches);

                logger.log('id_' + rId + '.innerHTML = ' + 'id_' + rId + '.innerHTML;', 'grind', 1);
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

                logger.log('id_' + rId + '.outerHTML = ' + 'id_' + rId + '.outerHTML;', 'grind', 1);
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

                logger.log('id_' + rId + '.innerText = ' + 'id_' + rId + '.innerText;', 'grind', 1);
                id[rId].innerText = id[rId].innerText;

                removeCache(caches);
                break;

            case 7:
                logger.log('id_' + rId + '.outerText = ' + 'id_' + rId + '.outerText;', 'grind', 1);
                id[rId].outerText = id[rId].outerText;

                removeThis(id[rId], 'direct');
                break;

            default:
                logger.log('// Warning: clear default', 'grind', 1);
                break;
        }

        logger.log('gc();', 'grind', 1);
        gc();
    } catch(e) {
        logger.log('// Error: clear: ' + e.message, 'grind', 1);
    }
}

function clearAll() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] clearAll()', 'grind', 1);
    }

    try {
        for (var i = 1; i < id.length; i++) {
            if (id[i]) {
                logger.log('id_' + i + ' = null;', 'grind', 1);
                id[i] = null;
            }
        }

        if (percent(60)) {
            switch (rand(3)) {
                case 0:
                    logger.log('document.write("");', 'grind', 1);
                    document.write('');
                    break;
                case 1:
                    logger.log('document.writeln("");', 'grind', 1);
                    document.writeln('');
                    break;
                case 2:
                    logger.log('document.open("");', 'grind', 1);
                    document.open('');
                    break;
                default:
                    logger.log('// Warning: clearAll default', 'grind', 1);
                    break;
            }
        } else {
            logger.log('document.documentElement.innerHTML = "";', 'grind', 1);
            document.documentElement.innerHTML = '';
        }
    } catch(e) {
        logger.log('// Error: clearAll: ' + e.message, 'grind', 1);
    }

    logger.log('gc();', 'grind', 1);
    gc();

    //window.open('', '_self', '');
    //window.close();
}

function DOMMan() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] DOMMan()', 'grind', 1);
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
                if (percent(10)) {
                    logger.log('id_' + rIds[0] + '.parentNode.removeChild(id_' + rIds[0] + ');', 'grind', 1);
                    id[rIds[0]].parentNode.removeChild(id[rIds[0]]);
                    removeThis(id[rIds[0]], 'direct');
                }
                break;

            // Node replaceChild(in Node newChild, in Node oldChild)
            case 6:
                if (percent(10)) {
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

                if (rBool) {
                    clearChildrenId(clonedNode);
                }

                logger.log('clonedNode = null;', 'grind', 1);
                clonedNode = null;
                break;

           default:
                logger.log('// Warning: DOMMan default', 'grind', 1);
                break;
        }
    } catch(e) {
        logger.log('// Error: DOMMan: ' + e.message, 'grind', 1);
    }
}

function winDocMan() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] winDocMan()', 'grind', 1);
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
                logger.log('// Warning: winDocMan default', 'grind', 1);
                break;
        }
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch(e) {
        logger.log('// Error: winDocMan: ' + e.message, 'grind', 1);
    }
}

function attrMan() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] attrMan()', 'grind', 1);
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
                logger.log('// Warning: attrMan default', 'grind', 1);
                break;
        }
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch(e) {
        logger.log('// Error: attrMan: ' + e.message, 'grind', 1);
    }
}

/************************************* finale *************************************/
function finale() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] finale()', 'grind', 1);
    }

    /* Spray is not necessary
    logger.log('occupySprayInt(' + demicm.ARRAY_LEN_MAX +', ' + demicm.ARRAY_CNT + ');', 'grind', 1);
    //occupySprayInt(demicm.ARRAY_LEN_MAX, demicm.ARRAY_CNT);
    */

    logger.log('gc();', 'grind', 1);
    gc();

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
        logger.log('[+] reuseElem()', 'grind', 1);
    }

    try {
        for (var i = 0; i < id.length; i++) {
            logger.log('id_' + i + ';', 'grind', 1);
            if (id[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'prop', 'node');
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'func', 'node');
                styleMan(i);
            }
        }

        relayout();

        clearAll();
    } catch(e) {
        logger.log('// Error: reuseElem: ' + e.message, 'grind', 1);
    }
}

function reuseRetElem() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] reuseRetElem()', 'grind', 1);
    }

    try {
        for (var i = 0; i < idR.length; i++) {
            logger.log('id_' + (i + demicm.RET_OFFSET) + ';', 'grind', 1);
            if (idR[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'prop', 'ret');
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'func', 'ret');

                logger.log('id_' + (i + demicm.RET_OFFSET) + ' = null;', 'grind', 1);
                idR[i] = null;
            }
        }

        logger.log('gc();', 'grind', 1);
        gc();
    } catch(e) {
        logger.log('// Error: reuseRetElem: ' + e.message, 'grind', 1);
    }
}

function reuseSpec() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] reuseSpec()', 'grind', 1);
    }

    try {
        for (var i = 0; i < idS.length; i++) {
            logger.log('id_' + (i + demicm.SPEC_OFFSET) + ';', 'grind', 1);
            if (idS[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'prop', 'spec');
                propfMan([i], demicm.MAX_REC_DEPTH, 0, 'func', 'spec');

                logger.log('id_' + (i + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
                idS[i] = null;
            }
        }

        logger.log('gc();', 'grind', 1);
        gc();
    } catch(e) {
        logger.log('// Error: reuseSpec: ' + e.message, 'grind', 1);
    }
}

function relayout() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] relayout()', 'grind', 1);
    }

    try {
        logger.log('id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + ' = document.createElement("a");', 'grind', 1);
        idS[demicm.relayoutId] = document.createElement('a');
        logger.log('document.documentElement.appendChild(id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + ');', 'grind', 1);
        document.documentElement.appendChild(idS[demicm.relayoutId]); 

        logger.log('id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.offsetParent;', 'grind', 1);
        idS[demicm.relayoutId].offsetParent;

        logger.log('id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML = id_'
            + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML;', 'grind', 1);
        idS[demicm.relayoutId].innerHTML = idS[demicm.relayoutId].innerHTML;

        logger.log('id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML = "";', 'grind', 1);
        idS[demicm.relayoutId].innerHTML = '';
    } catch(e) {
        logger.log('// Error: relayout: ' + e.message, 'grind', 1);
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
        logger.log('gc();', 'grind', 1);
        gc();
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
    logger = new LOGGER('demichrome1');
    logger.starting();

    prelude();

    logger.log('// we are now begining to fuzz...', 'grind', 1);
    operate(demicm.FRONT_OP_CNT);

    logger.log('/-demiBack = function() {', 'grind', 1);
    setTimeout('demiBack()', 1);
}

function demiBack() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] demiBack()', 'grind', 1);
    }

    operate(demicm.BACK_OP_CNT);

    finale();

    // For setTimeout
    logger.log('/-};', 'grind', 1);
    logger.log('setTimeout("demiBack()",1);', 'grind', 1);

    /* END FUZZING CODE */
    logger.finished();
    window.location.href = window.location.protocol + '//' + window.location.host + '/grinder';
}

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
    var letters = '\t /`_+=-}{][(),.?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
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
        } else if (elem.toString() == '[object DocumentType]') {
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
    catch(err) {
    }
}

// Get random id number 
function randId(type, noTxt, isDOM) {
    var count = 0;
    // Get non-null node id 
    do {
        if (!type || type == 'id') {
            if (id.length == 0) {
                return 'none';
            }
            var rId = rand(id.length);
        } else if (type == 'doc') {
            if (document.all.length == 0) {
                return 'none';
            }
            var rDocId = rand(document.all.length);
            var rId = document.all[rDocId].id;
        }

        count++;
        if (count > demicm.MAX_LOOP) {
            return 'none';
        }
    } while (!id[rId] 
        || inArr(demicm.idBlackList, rId) 
        || (noTxt && getTagName(id[rId]) == 'text')
        || (isDOM && (!id[rId].parentNode || rId < demicm.reserveIdNum)))

    // Recover wrong id
    if (id[rId].id != rId) {
        logger.log('id_' + rId + '.id = ' + rId + ';', 'grind', 1);
        id[rId].id = rId;
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

function randObjId(ids) {
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

function randObjIds(rObjIds, len, ids) {
    for (var i = 0; i < len; i++) {
        var rObjId = randObjId(ids);
        rObjIds.push(rObjId);
    }
}

/************************************** prop func style **************************************/
// Get object props and funcs
function getPropf(obj, type, propTypes) {
    var items = [];
    for (var p in obj) {
        if (typeof obj[p] == 'function') {
            if (type == 'func' && !inArr(demicm.funcBlackList, p)) {
                items.push(p);
            }
        } else if (typeof obj[p] == 'object' && p.substr(0, 2) == 'on') {
            if (type == 'evt' && !inArr(demicm.evtBlackList, p)) {
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
    if (obj && !propf) {
        updatePropfCache(obj);
        propf = randPropf(tag, null, type);
    }

    return propf;
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
    var rStrId = String(rand(id.length));
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
        return ('"' + value + '"');
    } else if (typeof value == 'function') {
        if (value.name == '') {
            return value.toString();
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
    catch(err) {
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
    catch(err) {
        // Swallow the exception and continue...
    }
}

/************************************** Array **************************************/
// Remove item according to value
function removeArrVal(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            arr.splice(i,1);
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
    if (str != null && str != undefined) {
        var re = /\d+/i; 
        str = String(str);
        var reStr = str.match(re);
        return (reStr == str);
    }
    return false;
}
/*
 * Author: demi6od <demi6d@gmail.com>
 * Date: 2013 Oct 21st
 * 
 * Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
 * - remove all dependencies of logger element
 */

demicm.evtBlackList = [];
if (demicm.IS_FUZZ_RANGE) {
    demicm.evtBlackList.push('onselect');
}

demicm.elemDic = {
    a            : 'HTMLAnchorElement',
    abbr         : 'HTMLElement',
    address      : 'HTMLElement',
    applet       : 'HTMLAppletElement',
    area         : 'HTMLAreaElement',
    article      : 'HTMLElement',
    aside        : 'HTMLElement',
    audio        : 'HTMLAudioElement',
    b            : 'HTMLElement',
    base         : 'HTMLBaseElement',
    basefont     : 'HTMLElement',
    bdi          : 'HTMLElement',
    bdo          : 'HTMLElement',
    bgsound      : 'HTMLElement',
    blockquote   : 'HTMLQuoteElement',
    body         : 'HTMLBodyElement',
    br           : 'HTMLBRElement',
    button       : 'HTMLButtonElement',
    canvas       : 'HTMLCanvasElement',
    caption      : 'HTMLTableCaptionElement',
    cite         : 'HTMLElement',
    code         : 'HTMLElement',
    col          : 'HTMLTableColElement',
    colgroup     : 'HTMLTableColElement',
    command      : 'HTMLCommandElement',
    data         : 'HTMLDataElement',
    datalist     : 'HTMLDataListElement',
    dd           : 'HTMLElement',
    del          : 'HTMLModElement',
    details      : 'HTMLDetailsElement',
    dfn          : 'HTMLElement',
    dialog       : 'HTMLDialogElement',
    div          : 'HTMLDivElement',
    dl           : 'HTMLDListElement',
    dt           : 'HTMLElement',
    em           : 'HTMLElement',
    embed        : 'HTMLEmbedElement',
    fieldset     : 'HTMLFieldSetElement',
    figcaption   : 'HTMLElement',
    figure       : 'HTMLElement',
    footer       : 'HTMLElement',
    form         : 'HTMLFormElement',
    h1           : 'HTMLHeadingElement',
    h2           : 'HTMLHeadingElement',
    h3           : 'HTMLHeadingElement',
    h4           : 'HTMLHeadingElement',
    h5           : 'HTMLHeadingElement',
    h6           : 'HTMLHeadingElement',
    head         : 'HTMLHeadElement',
    header       : 'HTMLElement',
    hgroup       : 'HTMLElement',
    hr           : 'HTMLHRElement',
    html         : 'HTMLHtmlElement',
    i            : 'HTMLElement',
    iframe       : 'HTMLIFrameElement',
    img          : 'HTMLImageElement',
    input        : 'HTMLInputElement',
    isindex      : 'HTMLInputElement',
    ins          : 'HTMLModElement',
    kbd          : 'HTMLElement',
    keygen       : 'HTMLKeygenElement',
    label        : 'HTMLLabelElement',
    layer        : 'HTMLElement',
    legend       : 'HTMLLegendElement',
    li           : 'HTMLLIElement',
    link         : 'HTMLLinkElement',
    map          : 'HTMLMapElement',
    mark         : 'HTMLElement',
    marquee      : 'HTMLMarqueeElement',
    menu         : 'HTMLMenuElement',
    meta         : 'HTMLMetaElement',
    meter        : 'HTMLMeterElement',
    nav          : 'HTMLElement',
    noscript     : 'HTMLElement',
    nobr         : 'HTMLElement',
    noembed      : 'HTMLElement',
    noframes     : 'HTMLElement',
    object       : 'HTMLObjectElement',
    ol           : 'HTMLOListElement',
    optgroup     : 'HTMLOptGroupElement',
    option       : 'HTMLOptionElement',
    output       : 'HTMLOutputElement',
    p            : 'HTMLParagraphElement',
    param        : 'HTMLParamElement',
    pre          : 'HTMLPreElement',
    progress     : 'HTMLProgressElement',
    q            : 'HTMLQuoteElement',
    rp           : 'HTMLElement',
    rt           : 'HTMLElement',
    ruby         : 'HTMLElement',
    s            : 'HTMLElement',
    samp         : 'HTMLElement',
    script       : 'HTMLScriptElement',
    section      : 'HTMLElement',
    select       : 'HTMLSelectElement',
    small        : 'HTMLElement',
    source       : 'HTMLSourceElement',
    span         : 'HTMLSpanElement',
    strong       : 'HTMLElement',
    style        : 'HTMLStyleElement',
    sub          : 'HTMLElement',
    summary      : 'HTMLElement',
    sup          : 'HTMLElement',
    table        : 'HTMLTableElement',
    tbody        : 'HTMLTableSectionElement',
    td           : 'HTMLTableDataCellElement',
    textarea     : 'HTMLTextAreaElement',
    tfoot        : 'HTMLTableSectionElement',
    th           : 'HTMLTableHeaderCellElement',
    thead        : 'HTMLTableSectionElement',
    time         : 'HTMLTimeElement',
    title        : 'HTMLTitleElement',
    tr           : 'HTMLTableRowElement',
    track        : 'HTMLTrackElement',
    tt           : 'HTMLElement',
    u            : 'HTMLElement',
    ul           : 'HTMLUListElement',
    var          : 'HTMLElement',
    video        : 'HTMLVideoElement',
    wbr          : 'HTMLElement',
    html         : 'HTMLHtmlElement',

    // Pseudo tag
    unknown          : 'HTMLUnknownElement',
    document         : 'HTMLDocument',
    Window           : 'Window',
    NamedNodeMap     : 'NamedNodeMap',
    attr             : 'Attr',
    text             : 'Text',
    documentfragment : 'DocumentFragment',
    Range            : 'Range',
    Selection        : 'Selection',
    NodeIterator     : 'NodeIterator',
    TreeWalker       : 'TreeWalker',
    DocumentType     : 'DocumentType',
};

// Pseudo tag
demicm.tagBlackList = ['text', 'document', 'documentfragment', 'Window', 'attr', 'NamedNodeMap',
    'unknown', 'Range', 'Selection', 'NodeIterator', 'TreeWalker', 'DocumentType'];

demicm.commands = [
    // Second argument is false
    '"backColor" , false, "red"',
    '"bold" , false, "true"',
    '"createLink" , false, "http://www.w3c.org"',
    '"delete" , false, "true"',
    '"fontName" , false, "Georgia"',
    '"fontSize" , false, "5"',
    '"foreColor" , false, "blue"',
    '"forwardDelete" , false, "true"',
    '"indent" , false, ""',
    '"insertHorizontalRule" , false, ""',
    '"insertImage" , false, "demicmImg.gif"',
    '"insertHTML" , false, "<p>HTML</p>"',
    '"insertLineBreak" , false, "true"',
    '"justifyFull" , false, true',
    '"justifyRight" , false, ""',
    '"justifyLeft" , false, ""',
    '"justifyCenter" , false, ""',
    '"italic" , false, "true"',
    '"insertText" , false, "text"',
    '"insertParagraph" , false, "paragraph"',
    '"insertUnorderedList" , false, "ulist"',
    '"insertOrderedList" , false, "olist"',
    '"justifyNone" , false, true',
    '"outdent" , false, ""',
    '"removeFormat" , false, true',
    '"selectAll" , false, ""',
    '"styleWithCSS" , false, "width:100px;"',
    '"unselect" , false, ""',
    '"useCSS" , false, true',
    '"undo" , false, ""',
    '"underline" , false, ""',
    '"superscript" , false, "true"',
    '"subscript" , false, "true"',
    '"strikeThrough" , false, ""',

    // Second argument is true
    '"backColor" , true, "red"',
    '"bold" , true, "true"',
    '"createLink" , true, "http://www.w3c.org"',
    '"delete" , true, "true"',
    '"fontName" , true, "Georgia"',
    '"fontSize" , true, "5"',
    '"foreColor" , true, "blue"',
    '"forwardDelete" , true, "true"',
    '"indent" , true, ""',
    '"insertHorizontalRule" , true, ""',
    '"insertImage" , true, "demicmImg.gif"',
    '"insertHTML" , true, "<p>HTML</p>"',
    '"insertLineBreak" , true, "true"',
    '"justifyFull" , true, true',
    '"justifyRight" , true, ""',
    '"justifyLeft" , true, ""',
    '"justifyCenter" , true, ""',
    '"italic" , true, "true"',
    '"insertText" , true, "text"',
    '"insertParagraph" , true, "paragraph"',
    '"insertUnorderedList" , true, "ulist"',
    '"insertOrderedList" , true, "olist"',
    '"justifyNone" , true, true',
    '"outdent" , true, ""',
    '"removeFormat" , true, true',
    '"selectAll" , true, ""',
    '"styleWithCSS" , true, "width:100px;"',
    '"unselect" , true, ""',
    '"useCSS" , true, true',
    '"undo" , true, ""',
    '"underline" , true, ""',
    '"superscript" , true, "true"',
    '"subscript" , true, "true"',
    '"strikeThrough" , true, ""',
];

demicm.cmdNames = [];
for (var i = 0; i < demicm.commands.length; i++) {
    demicm.cmdNames.push(demicm.commands[i].substring(1, demicm.commands[i].indexOf(' ') - 1));
}

// Get all tagNames
demicm.tags = [];
demicm.strictTags = [];
function getTags() {
    for (var t in demicm.elemDic) {
        demicm.tags.push(t);

        if (!inArr(demicm.tagBlackList, t)) {
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
demicm.propfCache = {};
function getPropAndFunc() {
    for (var i = 0; i < demicm.tags.length; i++) {
        if (demicm.tags[i] == 'text') {
            var elem = document.createTextNode('demicm');
        }
        else if (demicm.tags[i] == 'DocumentType') {
            var elem = document.doctype;
        }
        else if (demicm.tags[i] == 'documentfragment') {
            var elem = document.createDocumentFragment();
        }
        else if (demicm.tags[i] == 'attr') {
            var elem = document.createAttribute('attr');
        }
        else if (demicm.tags[i] == 'NamedNodeMap') {
            var elem = document.documentElement.attributes;
        }
        else if (demicm.tags[i] == 'Window') {
            var elem = window;
        }
        else if (demicm.tags[i] == 'document') {
            var elem = document;
        }
        else if (demicm.tags[i] == 'Range') {
            var elem = document.createRange();
        }
        else if (demicm.tags[i] == 'Selection') {
            var elem = window.getSelection();
        }
        else if (demicm.tags[i] == 'NodeIterator') {
            var elem = document.createNodeIterator(document);
        }
        else if (demicm.tags[i] == 'TreeWalker') {
            var elem = document.createTreeWalker(document);
        }
        else {
            var elem = document.createElement(demicm.tags[i]);
        }

        updatePropfCache(elem);
    }
}

// Get all properties and functions distinctively
function getDistPropAndFunc() {
    var props = [];
    var funcs = [];

    console.log('prop:');
    for (var e in demicm.propfCache) {
        var tmpProp = demicm.propfCache[e].props;
        var tmpPropType = demicm.propfCache[e].propTypes;
        var tmpFunc = demicm.propfCache[e].funcs;

        for (var j = 0; j < tmpProp.length; j++) {
            if (props.indexOf(tmpProp[j]) == -1) {
                props.push(tmpProp[j]);
                console.log(tmpProp[j] + ':' + tmpPropType[j]);
            }
        }
        for (var j = 0; j < tmpFunc.length; j++) {
            if (funcs.indexOf(tmpFunc[j]) == -1) {
                funcs.push(tmpFunc[j]);
            }
        }
    }
    
    console.log('\nfunction:\n');
    for (var i = 0; i < funcs.length; i++) {
        console.log(funcs[i]);
    }
}

// Prelude 
getTags();
//getDistPropAndFunc();


/*
 * Copyright (c) 2012, Stephen Fewer of Harmony Security (www.harmonysecurity.com)
 * Licensed under a 3 clause BSD license (Please see LICENSE.txt)
 * Source code located at https://github.com/stephenfewer/grinder
 * 
 */

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
/*
 * Author: demi6od <demi6d@gmail.com>
 * Date: 2013 Oct 21st
 * 
 * Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
 * - remove all dependencies of logger element
 */

demicm.propBlackList = [
    'id','idS', 'idR', 'demicm', 'console', 'logger', 'scripts',
    'innerHTML', 'innerText', 'outerHTML', 'outerText', 'textContent',
    'parentTextEdit', 'lastElementChild', 'firstElementChild', 'nextElementSibling', 'previousElementSibling',
    'ownerDocument', 'nextSibling', 'previousSibling', 'lastChild', 'firstChild', 'childNodes', 'parentNode',
    'parentElement', 'offsetParent', 'contentWindow', 'contentDocument', 'children', 'elements', 'body', 'head',
    'location',
    'URL', 'url', 'href',
    'origin', 'host', 'protocol', 'hostname', 'port', 'pathname',
    'search', 'name', 'history', 'hash', 'onbeforeunload', 'onunload', 
    'defaultView', 'Components', 'controllers',
    'style', 'attributes', 'sheet', 'styleSheets', 'classList', // TODO
]; 

demicm.URL = '';

demicm.langs = [
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

demicm.charsets = [
    'UTF-8', 'ISO-8859-1', 'ISO-8859-2', 'ISO-8859-3', 'US_ASCII', 'ISO-2022-JP-2', 'latin-greek',
    'GBK', 'GB18030', 'UTF-7', 'UTF-16LE', 'UTF32BE', 'GB2312', 'Big5', 'IBM277', 'windows-874'
];

demicm.inputTypes = [
    'button', 'checkbox', 'color', 'date', 'datetime', 'datetime-local',
    'month', 'week', 'time', 'email', 'file', 'hidden', 'image', 'number', 'password', 'radio', 'range',
    'reset', 'search', 'submit', 'tel', 'text', 'url'
];

demicm.MIMETypes = [
    'image/jpg', 'image/gif', 'image/tiff', 'application/x-www-form-urlencoded', 'application/json', 'video/ogg',
    'application/ecmascript', 'application/javascript', 'application/x-ecmascript', 'application/x-javascript',
    'application/sql', 'application/rtf', 'audio/mp4', 'audio/mpeg', 'message/global', 'message/http', 'model/mesh', 
    'multipart/ford-data', 'multipart/digest','text/ecmascript', 'text/javascript', 'text/javascript1.0', 
    'text/javascript1.1', 'text/javascript1.2', 'text/javascript1.3', 'text/javascript1.4', 'text/javascript1.5', 
    'text/jscript', 'text/livescript', 'text/x-ecmascript', 'text/x-javascript', 'text/css', 'text/xml', 'text/plain', 
    'text/html', 'application/java-archive', 'application/java-vm', 'application/x-shockwave-flash', 'video/x-msvideo'
];

demicm.dateTimes = [
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

demicm.autocompletes = [
    'on', 'off', 'name', 'honorific-prefix', 'given-name', 'additional-name', 'family-name', 
    'honorific-suffix', 'nickname', 'organization-title', 'organization', 'street-address', 'address-line1',
    'address-line2', 'address-line3', 'locality', 'region', 'country', 'country-name', 'postal-code', 'cc-name',
    'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-exp', 'cc-exp-month', 'cc-exp-year',
    'cc-csc', 'cc-type', 'language', 'bday', 'bday-day', 'bday-month', 'bday-year', 'sex', 'url', 'photo', 'tel',
    'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-local-prefix', 'tel-local-suffix',
    'tel-extension', 'email', 'impp', 'shipping', 'billing'
];

demicm.nameSpaces = ['http://www.w3.org/1999/xhtml', 'http://www.w3.org/2000/svg'];

demicm.bool = [true, false];

demicm.string = [',', '...', '\t', ' ', '', '?', '/', '[]', '{}', '=+-_', '()', '`', 'demicm', ];

demicm.alpha = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

demicm.smallNum = [0, 1, 2, 3, 4, 5, 6, 8, 10];
demicm.normalNum = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29,
    30, 40, 50, 60, 70, 80, 90, 100, 200
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

//demicm.dirtyObj = [null, undefined, [], {}];

// Some prop of different elem with different meaning 
demicm.specialProps = ['type', 'name', 'src'];

demicm.type = {
    source: demicm.MIMETypes, object: demicm.MIMETypes, a: demicm.MIMETypes, 
    button: ['submit', 'button', 'reset', 'menu'], input: demicm.inputTypes,
    select: ['select-one', 'select-multiple'], ol: ['1', 'a', 'A', 'i', 'I'], menu: ['popup', 'toolbar'],
};
demicm.name = {
    meta: ['abstract', 'author', 'classification', 'copyright', 'description', 'distribution', 'web',
    'intranet', 'doc-class', 'doc-rights', 'doc-type', 'DownloadOptions', 'expires', 'generator', 'googlebot',
    'noarchive', 'nofollow', 'noindex', 'nosnippet', 'keywords', 'MSSmartTagsPreventParsing', 'name', 'owner',
    'progid', 'rating', 'refresh', 'reply-to', 'resource-type', 'revisit-after', 'robots', 'Template'], 
    other: 'elemName'
};
demicm.src = {frame: 'demicmFrame.html', video: 'demicmVideo.avi'};
    

demicm.propDic = {
    wrap: {type: 'string', normalVal: ['off', 'virtual', 'physical'], dirtyVal: ['physical'], readOnly: false},
    behavior: {type: 'string', normalVal: ['scroll', 'slide', 'alternate'], dirtyVal: ['slide'], readOnly: false},
    direction: {type: 'string', normalVal: ['right', 'left'], dirtyVal: [], readOnly: false},
    contentEditable: {type: 'string', normalVal: ['true', 'false', 'inherit'], dirtyVal: ['true'], readOnly: false},
    accessKey: {type: 'string', normalVal: demicm.alpha, dirtyVal: [], readOnly: false}, 
    dir: {type: 'string', normalVal: ['ltr', 'rtl', 'auto'], dirtyVal: ['rtl'], readOnly: false},
    lang: {type: 'string', normalVal: demicm.langs, dirtyVal: [], readOnly: false}, 
    hreflang: {type: 'string', normalVal: demicm.langs, dirtyVal: [], readOnly: false}, 
    srclang: {type: 'string', normalVal: demicm.langs, dirtyVal: [], readOnly: false}, 
    title: {type: 'string', normalVal: ['demiTitle'], dirtyVal: [], readOnly: false},
    name: {type: 'string', normalVal: ['demicmNodeName'], dirtyVal: [], readOnly: false},
    type: {type: 'string', normalVal: demicm.inputTypes, dirtyVal: [], readOnly: false},
    wholeText: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    // objectSpec => non-element object
    dataset: {type: 'objectSpec', normalVal: [{id: 'user', user: 'demi6od', dateOfBirty: '1960-10-03'}], dirtyVal: [], readOnly: false},
    classList: {type: 'objectSpec', normalVal: [{0: 'a', 1: 'b', 2: 'c', length: 3}], dirtyVal: [], readOnly: false},
    className: {type: 'string', normalVal: ['demiClassName'], dirtyVal: [], readOnly: false},
    position: {type: 'string', normalVal: ['static', 'relative', 'absolute', 'fixed'], dirtyVal: [], readOnly: false},
    style: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    attributes: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    tagName: {type: 'string', normalVal: demicm.tags, dirtyVal: [], readOnly: false},
    textContent: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    localName: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    prefix: {type: 'string', normalVal: ['demicmPrefix'], dirtyVal: [], readOnly: false},
    namespaceURI: {type: 'string', normalVal: demicm.nameSpaces, dirtyVal: [], readOnly: false},
    nodeVal: {type: 'string', normalVal: ['demicmTextVal'], dirtyVal: [], readOnly: false},
    nodeName: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    text: {type: 'string', normalVal: 'demicmText', dirtyVal: [], readOnly: false},
    shape: {type: 'string', normalVal: ['rect', 'circ', 'poly'], dirtyVal: [], readOnly: false},
    rev: {type: 'string', normalVal: ['alternate', 'stylesheet', 'start', 'next', 'prev', 'contents', 'index',
        'glossary', 'copyright', 'chapter', 'section', 'subsection', 'appendix', 'help', 'bookmark', 'nofollow',
        'licence', 'tag', 'friend'], dirtyVal: [], readOnly: false},
    rel: {type: 'string', normalVal: ['alternate', 'stylesheet', 'start', 'next', 'prev', 'contents', 'index',
        'glossary', 'copyright', 'chapter', 'section', 'subsection', 'appendix', 'help', 'bookmark', 'nofollow', 
        'licence', 'tag', 'friend'], dirtyVal: [], readOnly: false},
    ping: {type: 'string', normalVal: [], dirtyVal: [], readOnly: false},
    charset: {type: 'string', normalVal: demicm.charsets, dirtyVal: [], readOnly: false},
    characterSet: {type: 'string', normalVal: demicm.charsets, dirtyVal: [], readOnly: false},
    defaultCharset: {type: 'string', normalVal: demicm.charsets, dirtyVal: [], readOnly: false},
    acceptCharset: {type: 'string', normalVal: demicm.charsets, dirtyVal: [], readOnly: false},
    encoding: {type: 'string', normalVal: demicm.charsets, dirtyVal: [], readOnly: false},
    alt: {type: 'string', normalVal: ['alt'], dirtyVal: [], readOnly: false},
    standby: {type: 'string', normalVal: ['demicmStandby'], dirtyVal: [], readOnly: false},
    clear: {type: 'string', normalVal: ['left', 'right', 'both'], dirtyVal: ['none'], readOnly: false},
    labels: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    validationMessage: {type: 'string', normalVal: ['demicmValidationFailureMessage'], dirtyVal: [], readOnly: false},
    validity: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    value: {type: 'string', normalVal: ['demicmTextVal'], dirtyVal: [], readOnly: false},
    defaultVal: {type: 'string', normalVal: ['demicmtextVal'], dirtyVal: [], readOnly: false},
    align: {type: 'string', normalVal: ['left', 'right', 'middle', 'top', 'bottom', 'absmiddle', 'baseline', 'absbottom'], 
        dirtyVal: ['center', 'justify', 'char'], readOnly: false},
    vAlign: {type: 'string', normalVal: ['top', 'middle', 'bottom', 'baseline'], dirtyVal: [], readOnly: false},
    ch: {type: 'string', normalVal: demicm.alpha, dirtyVal: [], readOnly: false},
    dateTime: {type: 'string', normalVal: demicm.dateTimes, dirtyVal: [], readOnly: false},
    autocomplete: {type: 'string', normalVal: demicm.autocompletes, dirtyVal: ['on'], readOnly: false},
    version: {type: 'string', normalVal: ['-//W3C//DTD HTML 4.01//EN'], dirtyVal: [], readOnly: true},
    srcdoc: {type: 'string', normalVal: ['<a>demiFoo<p>demiBar</p></a>'], dirtyVal: [], readOnly: false},
    scrolling: {type: 'string', normalVal: ['auto', 'yes', 'no'], dirtyVal: ['auto'], readOnly: false},
    sandbox: {type: 'string', normalVal: ['', 'allow-same-origin', 'allow-top-navigation', 'allow-forms', 'allow-scripts'], 
        dirtyVal: [], readOnly: false},
    frameBorder: {type: 'string', normalVal: ['0', '1'], dirtyVal: ['0'], readOnly: false},
    crossOrigin: {type: 'string', normalVal: ['anonymous', 'use-credentials'], dirtyVal: ['use-credentials'], readOnly: false},
    selectionDirection: {type: 'string', normalVal: ['forward', 'backward', 'none'], dirtyVal: [], readOnly: false},
    // objectdate => date object
    valueAsDate: {type: 'objectdate', normalVal: [], dirtyVal: [], readOnly: false},
    placeholder: {type: 'string', normalVal: ['demicmHintText'], dirtyVal: [], readOnly: false},
    pattern: {type: 'string', normalVal: ['.*'], dirtyVal: [], readOnly: false},
    media: {type: 'string', normalVal: ['screen', 'tty', 'tv', 'projection', 'handheld', 'print', 'braille', 'aural', 'all'],
        dirtyVal: [], readOnly: false},
    valueType: {type: 'string', normalVal: ['data', 'ref', 'object'], dirtyVal: [], readOnly: false},
    label: {type: 'string', normalVal: ['demicmLabelText'], dirtyVal: [], readOnly: false},
    rules: {type: 'string', normalVal: ['none', 'groups', 'rows', 'cols', 'all'], dirtyVal: [], readOnly: false},
    frame: {type: 'string', normalVal: ['void', 'above', 'below', 'hsides', 'lhs', 'rhs', 'vsides', 'box', 'border'],
        dirtyVal: [], readOnly: false},
    files: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    dirName: {type: 'string', normalVal: ['demicmDirName'], dirtyVal: [], readOnly: false},
    accept: {type: 'string', normalVal: demicm.MIMETypes, dirtyVal: [], readOnly: false},
    codeType: {type: 'string', normalVal: demicm.MIMETypes, dirtyVal: [], readOnly: false},
    keytype: {type: 'string', normalVal: ['rsa', 'dsa', 'ec'], dirtyVal: [], readOnly: false},
    challenge: {type: 'string', normalVal: ['demicmChallengeVal'], dirtyVal: [], readOnly: false},
    control: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    sheet: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    sizes: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    areas: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    event: {type: 'string', normalVal: [], dirtyVal: [], readOnly: false},
    scope: {type: 'string', normalVal: ['col', 'row', 'colgroup', 'rowgroup'], dirtyVal: [], readOnly: false},

    // stringId
    hash: {type: 'stringHashId', normalVal: ['#6'], dirtyVal: [], readOnly: false},
    search: {type: 'stringQueryId', normalVal: ['?id=6'], dirtyVal: [], readOnly: false},
    useMap: {type: 'stringHashId', normalVal: ['#6'], dirtyVal: [], readOnly: false},
    htmlFor: {type: 'stringId', normalVal: ['6'], dirtyVal: [], readOnly: false},
    headers: {type: 'stringId', normalVal: ['6'], dirtyVal: [], readOnly: false},
    list: {type: 'stringId', normalVal: ['6'], dirtyVal: [], readOnly: false},

    // stringColor => color string type
    alink: {type: 'stringColor', normalVal: demicm.color, dirtyVal: [], readOnly: false},
    vLink: {type: 'stringColor', normalVal: demicm.color, dirtyVal: [], readOnly: false},
    link: {type: 'stringColor', normalVal: demicm.color, dirtyVal: [], readOnly: false},
    bgColor: {type: 'stringColor', normalVal: demicm.color, dirtyVal: [], readOnly: false},
    aLink: {type: 'stringColor', normalVal: demicm.color, dirtyVal: [], readOnly: false},

    // stringPos => position string type
    coords: {type: 'stringPos', normalVal: ['10,10,5', '2,2,5,5'], dirtyVal: ['-1,-1,-1', '-1,-1,-2,-2'], readOnly: false},

    // DOMTree node iterator
    lastElementChild: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    firstElementChild: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    nextElementSibling: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    previousElementSibling: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    offsetParent: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    ownerDocument: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    nextSibling: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    previousSibling: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    lastChild: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    firstChild: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    childNodes: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    parentNode: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    parentElement: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    contentWindow: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    contentDocument: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    form: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    // objectList => element collection
    children: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    elements: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},

    // meta element
    httpEquiv: {type: 'string', normalVal: ['cache-control', 'content-language', 'content-type', 'date', 'expires', 
        'last-modified', 'location', 'refresh', 'set-cookie', 'window-target'], dirtyVal: [], readOnly: false},
    content: {type: 'string', normalVal: ['text/css', 'iso-8859-1', '31 Dec 2008'], dirtyVal: [], readOnly: false},
    scheme: {type: 'string', normalVal: ['YYYY-MM-DD', 'ISBN'], dirtyVal: [], readOnly: false},

    // Table & Select
    tFoot: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    tHead: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    caption: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    selectedOptions: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    tBodies: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    cells: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    options: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},

    cellPadding: {type: 'number', normalVal: demicm.normalNumPct, dirtyVal: demicm.dirtyNumPct, readOnly: false},
    cellSpacing: {type: 'number', normalVal: demicm.normalNumPct, dirtyVal: demicm.dirtyNumPct, readOnly: false},
    selectedIndex: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    cellIndex: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    rowIndex: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    sectionRowIndex: {type: 'number', dirtyVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    summary: {type: 'string', normalVal: ['demicmSumText'], dirtyVal: [], readOnly: false},
    axis: {type: 'string', normalVal: ['demicmCategoryName'], dirtyVal: [], readOnly: false},
    abbr: {type: 'string', normalVal: ['demicmAbbrText'], dirtyVal: [], readOnly: false},

    // Form
    formNoValidate: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    formMethod: {type: 'string', normalVal: ['get', 'post'], dirtyVal: ['post'], readOnly: false},
    method: {type: 'string', normalVal: ['get', 'post'], dirtyVal: ['post'], readOnly: false},
    formEnctype: {type: 'string', normalVal: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'], 
        dirtyVal: [], readOnly: false},
    enctype: {type: 'string', normalVal: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'], 
        dirtyVal: [], readOnly: false},

    // Audio & Video
    defaultMuted: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: false},
    muted: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: false},
    controls: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    autoplay: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    ended: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    paused: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    seeking: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    loop: {type: 'number', normalVal: demicm.normalNum, dirtyVal: ['infinite'], readOnly: false},
    volume: {type: 'number', normalVal: [1.0, 0.5, 0.0], dirtyVal: demicm.dirtyNum, readOnly: false},
    playbackRate: {type: 'number', normalVal: [1, 0.5, 2, -1], dirtyVal: demicm.dirtyNum, readOnly: false},
    defaultPlaybackRate: {type: 'number', normalVal: [1, 0.5, 2, -1], dirtyVal: demicm.dirtyNum, readOnly: false},
    duration: {type: 'number', normalVal: [100], dirtyVal: demicm.dirtyNum, readOnly: true},
    startTime: {type: 'number', normalVal: [0, 5, 10, 100], dirtyVal: demicm.dirtyNum, readOnly: false},
    initialTime: {type: 'number', normalVal: [0, 5, 10, 100], dirtyVal: demicm.dirtyNum, readOnly: false},
    currentTime: {type: 'number', normalVal: [0, 5, 10, 100], dirtyVal: demicm.dirtyNum, readOnly: false},
    readyState: {type: 'number', normalVal: [0, 1, 2, 3, 4], dirtyVal: demicm.dirtyNum, readOnly: false},
    networkState: {type: 'number', normalVal: [0, 1, 2, 3], dirtyVal: demicm.dirtyNum, readOnly: false},
    kind: {type: 'string', normalVal: ['captions', 'chapters', 'descriptions', 'metadata', 'subtitles'], dirtyVal: [], readOnly: false},
    poster: {type: 'string', normalVal: ['demicmImg.gif'], dirtyVal: [], readOnly: false},
    mediaGroup: {type: 'string', normalVal: ['groupName'], dirtyVal: [], readOnly: false},
    preload: {type: 'string', normalVal: ['auto', 'metadata', 'none'], dirtyVal: ['auto'], readOnly: false},
    currentSrc: {type: 'string', normalVal: ['demicmVideo.avi'], dirtyVal: [], readOnly: true},
    textTracks: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    track: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    controller: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    seekable: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    played: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    buffered: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    error: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},

    // Range 
    collapsed: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: true},
    commonAncestorContainer: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    startContainer: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    endContainer: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    startOffset: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    endOffset: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    
    // Selection 
    isCollapsed: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: true},
    anchorNode: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    focusNode: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    extentNode: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    baseNode: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    anchorOffset: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    focusOffset: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    extentOffset: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    baseOffset: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    rangeCount: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},

    // NodeIterator and TreeWalker
    expandEntityReferences: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: true},
    pointerBeforeReferenceNode: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: true},
    root: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    filter: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    referenceNode: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    currentNode: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    whatToShow: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},

    // Attribute
    isId: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: true},
    specified: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: true},
    offscreenBuffering: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: true},
    frames: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    history: {type: 'objectHis', normalVal: [], dirtyVal: [], readOnly: false},

    // Window
    closed: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: true},
    offscreenBuffering: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: true},
    frames: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    history: {type: 'objectHis', normalVal: [], dirtyVal: [], readOnly: false},
    navigator: {type: 'objectNavi', normalVal: [], dirtyVal: [], readOnly: false},
    clientInformation: {type: 'objectNavi', normalVal: [], dirtyVal: [], readOnly: false},
    opener: {type: 'objectWin', normalVal: [], dirtyVal: [], readOnly: false},
    parent: {type: 'objectWin', normalVal: [], dirtyVal: [], readOnly: false},
    self: {type: 'objectWin', normalVal: [], dirtyVal: [], readOnly: false},
    top: {type: 'objectWin', normalVal: [], dirtyVal: [], readOnly: false},
    screen: {type: 'objectScr', normalVal: [], dirtyVal: [], readOnly: false},
    localStorage: {type: 'objectSto', normalVal: [], dirtyVal: [], readOnly: false},
    sessionStorage: {type: 'objectSto', normalVal: [], dirtyVal: [], readOnly: false},
    indexedDB: {type: 'objectDB', normalVal: [], dirtyVal: [], readOnly: false},
    crypto: {type: 'objectCry', normalVal: [], dirtyVal: [], readOnly: false},
    CSS: {type: 'objectCSS', normalVal: [], dirtyVal: [], readOnly: false},
    performance: {type: 'objectPer', normalVal: [], dirtyVal: [], readOnly: false},
    console: {type: 'objectCon', normalVal: [], dirtyVal: [], readOnly: false},
    styleMedia: {type: 'objectSty', normalVal: [], dirtyVal: [], readOnly: false},
    toolbar: {type: 'objectBar', normalVal: [], dirtyVal: [], readOnly: false},
    statusbar: {type: 'objectBar', normalVal: [], dirtyVal: [], readOnly: false},
    scrollbars: {type: 'objectBar', normalVal: [], dirtyVal: [], readOnly: false},
    personalbar: {type: 'objectBar', normalVal: [], dirtyVal: [], readOnly: false},
    menubar: {type: 'objectBar', normalVal: [], dirtyVal: [], readOnly: false},
    locationbar: {type: 'objectBar', normalVal: [], dirtyVal: [], readOnly: false},
    applicationCache: {type: 'objectCache', normalVal: [], dirtyVal: [], readOnly: false},
    devicePixelRatio: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    innerHeight: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    innerWidth: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    outerHeight: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    outerWidth: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    pageXOffset: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    pageYOffset: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    screenX: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    screenY: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    screenLeft: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    screenTop: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    status: {type: 'string', normalVal: ['status'], dirtyVal: [], readOnly: true},
    defaultstatus: {type: 'string', normalVal: ['status'], dirtyVal: [], readOnly: true},
    defaultStatus: {type: 'string', normalVal: ['status'], dirtyVal: [], readOnly: true},
    p: {type: 'string', normalVal: ['p'], dirtyVal: [], readOnly: true},
    external: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    chrome: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    elem: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    frameElement: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},

    // Document
    anchors: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    scripts: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    plugins: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    embeds: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    applets: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    forms: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    images: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    links: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    activeElement: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    defaultView: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    preferredStylesheetSet: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    selectedStylesheetSet : {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    baseURI: {type: 'string', normalVal: demicm.nameSpaces, dirtyVal: [], readOnly: true},
    documentURI: {type: 'string', normalVal: demicm.nameSpaces, dirtyVal: [], readOnly: true},
    cookie: {type: 'string', normalVal: [], dirtyVal: [], readOnly: false},
    domain: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    location: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    inputEncoding: {type: 'string', normalVal: demicm.charsets, dirtyVal: [], readOnly: false},
    implementation: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: true},
    xmlVersion: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    xmlEncoding: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    styleSheets: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    lastModified: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    readyState: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    URL: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    referrer: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    doctype: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: true},
    docMode: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: true},
    currentScript: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    strictErrorChecking: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    xmlStandalone: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    async: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    vlinkColor: {type: 'string', normalVal: demicm.color, dirtyVal: [], readOnly: false},
    linkColor: {type: 'string', normalVal: demicm.color, dirtyVal: [], readOnly: false},
    alinkColor: {type: 'string', normalVal: demicm.color, dirtyVal: [], readOnly: false},
    fgColor: {type: 'string', normalVal: demicm.color, dirtyVal: [], readOnly: false},
    bgColor: {type: 'string', normalVal: demicm.color, dirtyVal: [], readOnly: false},
    compatMode: {type: 'string', normalVal: ['FrontCompat', 'BackCompat'], dirtyVal: [], readOnly: false},

    // URL related
    href: {type: 'string', normalVal: [demicm.URL + 'demicmFuzz.html'], dirtyVal: [], readOnly: false},
    origin: {type: 'string', normalVal: ['http://127.0.0.1:80'], dirtyVal: [], readOnly: false},
    baseURI: {type: 'string', normalVal: ['http://127.0.0.1'], dirtyVal: [], readOnly: false},
    host: {type: 'string', normalVal: ['127.0.0.1:80'], dirtyVal: [], readOnly: false},
    protocol: {type: 'string', normalVal: ['http', 'https', 'ftp', 'file'], dirtyVal: [], readOnly: false},
    hostname: {type: 'string', normalVal: ['127.0.0.1'], dirtyVal: [], readOnly: false},
    port: {type: 'string', normalVal: ['80'], dirtyVal: [], readOnly: false},
    pathname: {type: 'string', normalVal: ['demicmFuzz.html'], dirtyVal: [], readOnly: false},

    formTarget: {type: 'string', normalVal: ['_blank', '_self', '_parent', '_top', demicm.URL + 'demicmTarget.html'],
        dirtyVal: [], readOnly: false},
    target: {type: 'string', normalVal: ['_blank', '_self', '_parent', '_top', demicm.URL + 'demicmTarget.html'],
        dirtyVal: [], readOnly: false},

    profile: {type: 'string', normalVal: [demicm.URL + 'demicmProfile'], dirtyVal: [], readOnly: false},
    cite: {type: 'string', normalVal: [demicm.URL + 'demicmDoc'], dirtyVal: [], readOnly: false},
    lowsrc: {type: 'string', normalVal: [demicm.URL + 'demicmImg.gif'], dirtyVal: [], readOnly: false},
    src: {type: 'string', normalVal: [demicm.URL + 'demicmImg.gif'], dirtyVal: [], readOnly: false},
    background: {type: 'string', normalVal: [demicm.URL + 'demicmImg.gif'], dirtyVal: [], readOnly: false},
    codeBase: {type: 'string', normalVal: [demicm.URL + 'java/'], dirtyVal: [], readOnly: false},
    code: {type: 'string', normalVal: [demicm.URL + 'demicmCodeBase.class'], dirtyVal: [], readOnly: false},
    archive: {type: 'string', normalVal: [demicm.URL + 'demicmAchive.java'], dirtyVal: [], readOnly: false},
    manifest: {type: 'string', normalVal: [demicm.URL + 'demicmMani.cache'], dirtyVal: [], readOnly: false},
    data: {type: 'string', normalVal: [demicm.URL + 'demicmData.swf'], dirtyVal: [], readOnly: false},
    longDesc: {type: 'string', normalVal: [demicm.URL + 'demicmDesc.txt'], dirtyVal: [], readOnly: false},
    download: {type: 'string', normalVal: [demicm.URL + 'demicmDownload.txt'], dirtyVal: [], readOnly: false},
    formAction: {type: 'string', normalVal: [demicm.URL + 'demicmFuzz.html'], dirtyVal: [], readOnly: false},
    action: {type: 'string', normalVal: [demicm.URL + 'demicmFuzz.html'], dirtyVal: [], readOnly: false},

    // boolean type
    noWrap: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: false},
    default: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    spellcheck: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    isContentEditable: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: true},
    hidden: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    draggable: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    translate: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    noHref: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: false},
    willValidate: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    disabled: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: false},
    autofocus: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    open: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    compact: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    noValidate: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    noShade: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    complete: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: true},
    isMap: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    incremental: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    required: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: false},
    readOnly: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: false},
    multiple: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    indeterminate: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [false], readOnly: false},
    checked: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    defaultChecked: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    declare: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    reversed: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    selected: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    defaultSelected: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    defer: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    async: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},

    // number type
    border: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    tabIndex: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    childElementCount: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    scrollHeight: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    scrollWidth: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    scrollTop: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    scrollLeft: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    scrollamount: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    scrolldelay: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    clientHeight: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    clientWidth: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    clientTop: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    clientLeft: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    offsetHeight: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    offsetWidth: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    offsetTop: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    offsetLeft: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    height: {type: 'number', normalVal: demicm.normalNumPct, dirtyVal: demicm.dirtyNumPct, readOnly: false},
    width: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    naturalWidth: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    naturalHeight: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    videoHeight: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    videoWidth: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    marginWidth: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    marginHeight: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    min: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    maxLength: {type: 'number', normalVal: [100, 200, 300], dirtyVal: demicm.dirtyNum, readOnly: false},
    max: {type: 'number', normalVal: [100, 200, 300], dirtyVal: demicm.dirtyNum, readOnly: false},
    nodeType: {type: 'number', normalVal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], dirtyVal: demicm.dirtyNum, readOnly: false},
    optimum: {type: 'number', normalVal: [5, 10, 15], dirtyVal: demicm.dirtyNum, readOnly: false},
    high: {type: 'number', normalVal: [20, 40], dirtyVal: demicm.dirtyNum, readOnly: false},
    low: {type: 'number', normalVal: [1, 5], dirtyVal: demicm.dirtyNum, readOnly: false},
    span: {type: 'number', normalVal: [1, 5, 10], dirtyVal: demicm.dirtyNum, readOnly: false},
    chOff: {type: 'number', normalVal: [1, 5, 10], dirtyVal: demicm.dirtyNum, readOnly: false},
    length: {type: 'number', normalVal: [128, 256], dirtyVal: demicm.dirtyNum, readOnly: false},
    size: {type: 'number', normalVal: [50, 100], dirtyVal: demicm.dirtyNum, readOnly: false},
    y: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    x: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    vspace: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    hspace: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    selectionEnd: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    selectionStart: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    valueAsNumber: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    step: {type: 'number', normalVal: [-3, 0, 3, 6], dirtyVal: demicm.dirtyNum, readOnly: false},
    start: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    index: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    textLength: {type: 'number', normalVal: [128, 256], dirtyVal: demicm.dirtyNum, readOnly: false},
    rows: {type: 'number', normalVal: demicm.normalNumPctStar, dirtyVal: demicm.dirtyNum, readOnly: false},
    cols: {type: 'number', normalVal: demicm.normalNumPctStar, dirtyVal: demicm.dirtyNum, readOnly: false},
    rowSpan: {type: 'number', normalVal: [1, 5, 10], dirtyVal: demicm.dirtyNum, readOnly: false},
    colSpan: {type: 'number', normalVal: [1, 5, 10], dirtyVal: demicm.dirtyNum, readOnly: false},

    // webkit special
    webkitDisplayingFullscreen: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitSupportsFullscreen: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitClosedCaptionsVisible: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitHasClosedCaptions: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitPreservesPitch: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitGrammar: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitSpeech: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitdirectory: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitDroppedFrameCount: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    webkitDecodedFrameCount: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    webkitVideoDecodedByteCount: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    webkitAudioDecodedByteCount: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    webkitdropzone: {type: 'string', normalVal: [], dirtyVal: [], readOnly: false},
    webkitPseudo: {type: 'string', normalVal: [], dirtyVal: [], readOnly: false},
    webkitShadowRoot: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    webkitFullscreenElement: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    webkitFullscreenEnabled: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitCurrentFullScreenElement: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    webkitNotifications: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    webkitFullScreenKeyboardInputAllowed: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitHidden: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    webkitPointerLockElement: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    webkitIsFullScreen: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [], readOnly: false},
    onwebkitneedkey: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    onwebkitkeymessage: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    onwebkitkeyerror: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    onwebkitkeyadded: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    webkitEntries: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    webkitStorageInfo: {type: 'objectSto', normalVal: [], dirtyVal: [], readOnly: false},

    // Enumeration
    ALLOW_KEYBOARD_INPUT: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    ELEMENT_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    ATTRIBUTE_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    TEXT_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    CDATA_SECTION_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    ENTITY_REFERENCE_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    ENTITY_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    PROCESSING_INSTRUCTION_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    COMMENT_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    DOCUMENT_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    DOCUMENT_TYPE_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    DOCUMENT_FRAGMENT_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    NOTATION_NODE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    DOCUMENT_POSITION_DISCONNECTED: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    DOCUMENT_POSITION_PRECEDING: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    DOCUMENT_POSITION_FOLLOWING: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    DOCUMENT_POSITION_CONTAINS: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    DOCUMENT_POSITION_CONTAINED_BY: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    NETWORK_EMPTY: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    NETWORK_IDLE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    NETWORK_LOADING: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    NETWORK_NO_SOURCE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    HAVE_NOTHING: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    HAVE_METADATA: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    HAVE_CURRENT_DATA: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    HAVE_FUTURE_DATA: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    HAVE_ENOUGH_DATA: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    NONE: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    LOADING: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    LOADED: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
    ERROR: {type: 'number', normalVal: [], dirtyVal: [], readOnly: true},
};
/*
 * Author: demi6od <demi6d@gmail.com>
 * Date: 2013 Oct 21st
 * 
 * Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
 * - remove all dependencies of logger element
 */

demicm.funcBlackList = [
    // demichrome.js
    'constructNodeIterator', 'constructTreeWalker', 'constructRange', 'setRange', 'constructSelection',
    'setSelection', 'nodeIteration', 'treeIteration', 'moveIterator', 'moveTreeWalker', 'alterRange',
    'alterSelection', 'constructGroup', 'reuseGroup', 'objMan', 'prelude', 'setEnv', 'eventHandler',
    'setEvtHandler', 'addTextNode', 'constructTree', 'constructDOMTree', 'constructSpec', 'addCSS',
    'funcMan', 'styleMan', 'layout', 'clear', 'clearAll', 'DOMMan', 'winDocMan', 'attrMan', 'finale',
    'reuseElem', 'reuseRetElem', 'relayout', 'operate', 'normalOperate', 'specialOperate', 'groupOperate',
    'demiFront', 'demiBack', 'propfMan','propMan',

    // dict.js
    'getTags', 'getElemName', 'getPropAndFunc', 'getDistPropAndFunc',

    // help.js
    'rand', 'randItem', 'srand', 'randBool', 'randHex', 'randAlpha', 'randAscii', 'randHTMLEnt', 'randUnicode',
    'randStr', 'randHTMLCode', 'percent', 'getTagName', 'randId', 'randIds', 'randObjId', 'randObjIds','isPosInt',
    'getPropf', 'updatePropfCache', 'randPropf', 'randPropfDyn', 'randPropfVal', 'randStyle', 'randStyleVal',
    'randCSSText', 'toCSSStyle', 'logRevise', 'removeThis', 'removeChildren', 'removeCache', 'clearThisId',
    'clearChildrenId', 'removeArrVal', 'inArr', 'isArr', 'repeatArr', 'convoluteArr', 'cloneObj', 'extendObj',

    // testcase.js
    'testcase', 'testCase',
    // logging.js
    'LOGGER', 'tickle', 'log_xml', 'log_xml_idx', 'gc', 

    // Grinder server special func result
    //'getEntries', 'getEntriesByType', 'getEntriesByName', 'webkitGetEntries', 'webkitGetEntriesByType', 'webkitGetEntriesByName',

    'appendChild', 'insertBefore', 'removeChild', 'replaceChild', 'cloneNode',
    'insertAdjacentElement', 'insertAdjacentHTML', 'insertAdjacentText',
    'dispatchEvent', 'removeEventListener', 'addEventListener',
    'webkitCancelKeyRequest', 'webkitAddKey', 'webkitGenerateKeyRequest',
    'write', 'writeln',
    'reload', 'go', 'assign', 'navigate', 'open', 'load', 'close', 'submit', 'click',
    'print', 'alert', 'prompt', 'showModalDialog', 'confirm',
    'setAttributeNode', 'setAttributeNodeNS', 'removeAttributeNode', 'querySelector', 'querySelectorAll', // TODO
];

demicm.DOMPos = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];

demicm.func = function() { return 'demi6od'; };

demicm.dirtyParamVals = demicm.num.concat([null, undefined, 'pink', screen, Infinity, false, true, eval, [], {}, demicm.func]);

// First parameter is return value
demicm.funcDic = {
    getElementById: [
		{type: 'object'},
		{type: 'string', normalVal: ['objectId'], dirtyVal: []},
    ],
    getElementsByName: [
		{type: 'objectList'},
		{type: 'string', normalVal: ['objectName'], dirtyVal: []},
    ],
    getElementsByTagName: [
		{type: 'objectList'},
		{type: 'string', normalVal: ['tagName'], dirtyVal: []},
    ],
    getElementsByTagNameNS: [
		{type: 'objectList'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
        {type: 'string', normalVal: ['tagName'], dirtyVal: []},
    ],
    getElementsByClassName: [
		{type: 'objectList'},
		{type: 'string', normalVal: ['className'], dirtyVal: []},
    ],
    item: [
		{type: 'object'},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    namedItem: [
		{type: 'object'},
		{type: 'string', normalVal: ['objectIdOrName'], dirtyVal: []},
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
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [false]},
    ],
    scrollIntoViewIfNeeded: [
		{type: ''},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [false]},
    ],
    scrollByLines: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    scrollByPages: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    scroll: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    scrollTo: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    scrollBy: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    resizeBy: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    resizeTo: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    moveBy: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    moveTo: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    hasChildNodes: [
		{type: 'boolean'},
    ],
    normalize: [
		{type: ''},
    ],
    isSupported: [
		{type: 'boolean'},
		{type: 'string', normalVal: ['Core'], dirtyVal: []},
        {type: 'string', normalVal: ['1.0', '2.0', '3.0'], dirtyVal: demicm.dirtyNum},
    ],
    lookupPrefix: [
		{type: 'string'},
		{type: 'string', normalVal: ['http://127.0.0.1:8001/grinder/'], dirtyVal: []},
    ],
    lookupNamespaceURI: [
		{type: 'string'},
		{type: 'string', normalVal: ['demicmPrefix'], dirtyVal: []},
    ],
    isDefaultNamespace: [
		{type: 'boolean'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
    ],
    isSameNode: [
		{type: 'boolean'},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    isEqualNode: [
		{type: 'boolean'},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    compareDocumentPosition: [
		{type: 'number'},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    contains: [
		{type: 'boolean'},
		{type: 'object', normalVal: [], dirtyVal: []},
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
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    stepDown: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    select: [
		{type: ''},
    ],
    setRangeText: [
		{type: ''},
		{type: 'string', normalVal: ['text'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
        {type: 'number', normalVal: [0, 1, 2, 3], dirtyVal: demicm.dirtyNum},
    ],
    setSelectionRange: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
        {type: 'string', normalVal: ['forward', 'backward', 'none'], dirtyVal: ['backward']}
    ],

    // Canvas
    toDataURL: [
		{type: 'string'},
		{type: 'string', normalVal: ['image/png', 'image/webp', 'image/jpeg'], dirtyVal: []},
        {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    getContext: [
		{type: 'contextObj'},
		{type: 'string', normalVal: ['2d', 'webgl'], dirtyVal: []},
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
		{type: 'string', normalVal: ['video/ogg', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/ogg', 'audio/mp4',
            'video/ogg; codecs="theora, vorbis"', 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"', 
            'video/webm; codecs="vp8.0, vorbis"', 'audio/ogg; codecs="vorbis"', 'audio/mp4; codecs="mp4a.40.5"'], dirtyVal: []},
    ],
    play: [
		{type: ''},
    ],
    pause: [
		{type: ''},
    ],
    addTextTrack: [
		{type: 'objectTextTrack'},
		{type: 'string', normalVal: ["subtitles", "caption", "descriptions", "chapters", "metadata"], dirtyVal: []},
        {type: 'string', normalVal: ['label'], dirtyVal: []},
        {type: 'string', normalVal: demicm.langs, dirtyVal: []},
    ],

    // Table
    createTHead: [
		{type: 'objectTHead'},
    ],
    deleteTHead: [
		{type: ''},
    ],
    createTFoot: [
		{type: 'objectTFoot'},
    ],
    deleteTFoot: [
		{type: ''},
    ],
    createTBody: [
		{type: 'objectTBody'},
    ],
    createCaption: [
		{type: 'objectCaption'},
    ],
    deleteCaption: [
		{type: ''},
    ],
    insertRow: [
		{type: 'objectRow'},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    deleteRow: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    insertCell: [
		{type: 'objectCell'},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    deleteCell: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],

    // Select
    add: [
		{type: ''},
		{type: 'objectOption', normalVal: [], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    remove: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    checkValidity: [
		{type: 'boolean'},
    ],
    setCustomValidity: [
		{type: ''},
		{type: 'string', normalVal: ['erroText'], dirtyVal: []},
    ],

    // Text
    splitText: [
        {type: 'object'},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    replaceWholeText: [
        {type: ''},
        {type: 'string', normalVal: [], dirtyVal: []},
    ],
    substringData: [
        {type: 'string'},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    appendData: [
        {type: ''},
        {type: 'string', normalVal: [], dirtyVal: []}
    ],
    insertData: [
        {type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
        {type: 'string', normalVal: [], dirtyVal: []},
    ],
    deleteData: [
        {type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    replaceData: [
        {type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
        {type: 'string', normalVal: [], dirtyVal: []},
    ],

    // Range 
    deleteContents: [
        {type: ''},
    ],
    collapse: [
        {type: ''},
    ],
    cloneContents: [
        {type: 'objectDocumentFragment'},
    ],
    documentFragment: [
        {type: 'objectDocumentFragment'},
    ],
    createContextualFragment: [
        {type: 'objectDocumentFragment'},
		{type: 'string', normalVal: ['<a>htmlCode</a>'], dirtyVal: []},
    ],
    surroundContents: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    selectNode: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    selectNodeContents: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    insertNode: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    setStartAfter: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    setStartBefore: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    setEndAfter: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    setEndBefore: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    compareNode: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    comparePoint: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    getBoundingClientRect: [
        {type: 'object'},
    ],
    getClientRects: [
        {type: 'object'},
    ],
    intersectsNode: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    isPointInRange: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    toString: [
        {type: 'string'},
    ],
    cloneRange: [
        {type: 'object'},
    ],
    expand: [
        {type: 'boolean'},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],

    // Selection 
    collapse: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'number', normalVal: [0, 1], dirtyVal: demicm.dirtyNum},
    ],
    getRangeAt: [
        {type: 'object'},
		{type: 'number', normalVal: [0], dirtyVal: demicm.dirtyNum},
    ],
    extend: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'number', normalVal: [0, 1, 2, 3, 4, 5, 8, 10], dirtyVal: demicm.dirtyNum},
    ],
    modify: [
        {type: ''},
		{type: 'string', normalVal: ['move', 'extend'], dirtyVal: ['move', 'extend']},
		{type: 'string', normalVal: ['forward', 'backward', 'left', 'right'], dirtyVal: ['forward', 'backward', 'left', 'right']},
		{type: 'string', normalVal: ["character", "word", "sentence", "line", "paragraph", "lineboundary", "sentenceboundary", "paragraphboundary", "documentboundary"], dirtyVal: ["character", "word", "sentence", "line", "paragraph", "lineboundary", "sentenceboundary", "paragraphboundary", "documentboundary"]},
    ],
    collapseToStart: [
        {type: ''},
    ],
    collapseToEnd: [
        {type: ''},
    ],
    removeAllRanges: [
        {type: ''},
    ],
    empty: [
        {type: ''},
    ],
    selectAllChildren: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    addRange: [
        {type: ''},
		{type: 'objectRange', normalVal: [], dirtyVal: []},
    ],
    containsNode: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [false]},
    ],
    deleteFromDocument: [
        {type: ''},
    ],
    toString: [
        {type: 'string'},
    ],
    setPosition: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    setBaseAndExtent: [
        {type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'number', normalVal: [0], dirtyVal: demicm.dirtyNum},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'number', normalVal: [1], dirtyVal: demicm.dirtyNum},
    ],

    // NodeIterator and TreeWalker
    parentNode: [
        {type: 'object'},
    ],
    firstChild: [
        {type: 'object'},
    ],
    lastChild: [
        {type: 'object'},
    ],
    previousSibling: [
        {type: 'object'},
    ],
    nextSibling: [
        {type: 'object'},
    ],
    previousNode: [
        {type: 'object'},
    ],
    nextNode: [
        {type: 'object'},
    ],
    detach: [
        {type: ''},
    ],

    // Window
    clearTimeout: [
        {type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    clearInterval: [
        {type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    atob: [
        {type: 'string'},
        {type: 'string', normalVal: ['SGVsbG8gV29ybGQh'], dirtyVal: []},
    ],
    btoa: [
        {type: 'string'},
		{type: 'string', normalVal: ['demi6od'], dirtyVal: []},
    ],
    open: [
        {type: 'objectWindow'},
		{type: 'string', normalVal: [demicm.URL + 'demicmFuzz.html'], dirtyVal: []},
    ],
    stop: [
        {type: ''},
    ],
    setInterval: [
        {type: 'number'},
		{type: 'string', normalVal: ['document;'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'string', normalVal: ['JavaScript', 'JScript', 'VBScript'], dirtyVal: ['JavaScript']},
    ],
    setTimeout: [
        {type: 'number'},
		{type: 'string', normalVal: ['document;'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'string', normalVal: ['JavaScript', 'JScript', 'VBScript'], dirtyVal: ['JavaScript']},
    ],
    postMessage: [
        {type: ''},
		{type: 'string', normalVal: ['message'], dirtyVal: []},
		{type: 'string', normalVal: [demicm.URL + 'demicmFuzz.html'], dirtyVal: []},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    matchMedia: [
        {type: 'boolean'},
        {type: 'string', normalVal: ['(min-width: 400px)'], dirtyVal: []},
    ],
    find: [
        {type: 'boolean'},
		{type: 'string', normalVal: ['findStr'], dirtyVal: []},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
    ],
    requestAnimationFrame: [
        {type: 'number'},
        {type: 'object', normalVal: [demicm.func], dirtyVal: []},
    ],
    webkitRequestAnimationFrame: [
        {type: 'number'},
        {type: 'object', normalVal: [demicm.func], dirtyVal: []},
    ],
    cancelAnimationFrame: [
        {type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    webkitCancelAnimationFrame: [
        {type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    webkitCancelRequestAnimationFrame: [
        {type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    getComputedStyle: [
        {type: 'objectStyle'},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'string', normalVal: ['pseudoElt'], dirtyVal: []},
    ],
    getMatchedCSSRules: [
        {type: 'objectStyle'},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'string', normalVal: ['pseudoClass'], dirtyVal: []},
    ],

    // Document
    adoptNode: [
        {type: 'object'},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    importNode: [
        {type: 'object'},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
    ],
    renameNode: [
        {type: 'object'},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
		{type: 'string', normalVal: ['nodeName'], dirtyVal: []},
    ],
    open: [
        {type: 'object'},
    ],
    close: [
        {type: 'object'},
    ],
    clear: [
        {type: 'object'},
    ],
    write: [
        {type: 'object'},
    ],
    writeln: [
        {type: 'object'},
    ],
    hasFocus: [
        {type: 'boolean'},
    ],
    normalizeDocument: [
        {type: 'object'},
    ],
    createAttribute: [
        {type: 'objectAttr'},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    createComment: [
        {type: 'objectComment'},
		{type: 'string', normalVal: ['commentStr'], dirtyVal: []},
    ],
    createCDATASection: [
        {type: 'objectCDATA'},
		{type: 'string', normalVal: ['CDATAStr'], dirtyVal: []},
    ],
    createEntityReference: [
        {type: 'objectEntity'},
		{type: 'string', normalVal: ['entityName'], dirtyVal: []},
    ],
    createDocumentFragment: [
        {type: 'objectDocumentFragment'},
    ],
    createEvent: [
        {type: 'objectEvent'},
		{type: 'string', normalVal: ['HTMLEvents', 'MouseEvents', 'UIEvents'], dirtyVal: []},
    ],
    createExpression: [
        {type: 'objectXPath'},
        {type: 'string', normalVal: ['/body/a'], dirtyVal: []},
        {type: 'object', normalVal: [function(prefix){return 'http://www.w3.org/1999/xhtml';}], dirtyVal: []},
    ],
    evaluate: [
        {type: 'objectXPath'},
        {type: 'string', normalVal: ['/body/a'], dirtyVal: []},
		{type: 'object', normalVal: [], dirtyVal: []},
        {type: 'object', normalVal: [function(prefix){return 'http://www.w3.org/1999/xhtml';}], dirtyVal: []},
    ],
    createDocumentFragment: [
        {type: 'objectDocumentFragment'},
    ],
    createProcessingInstruction: [
        {type: 'objectProc'},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: []},
    ],
    loadXML: [
        {type: 'objectXML'},
		{type: 'string', normalVal: ['<tag>demi6od</tag>'], dirtyVal: []},
    ],
    queryCommandEnabled: [
        {type: 'boolean'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: []},
    ],
    queryCommandIndeterm: [
        {type: 'boolean'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: []},
    ],
    queryCommandState: [
        {type: 'boolean'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: []},
    ],
    queryCommandSupported: [
        {type: 'boolean'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: []},
    ],
    queryCommandText: [
        {type: 'string'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: []},
    ],
    queryCommandValue: [
        {type: 'objectSpec'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: []},
    ],
    elementFromPoint: [
        {type: 'object'},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    caretPositionFromPoint: [
        {type: 'objectRange'},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    getCSSCanvasContext: [
        {type: 'objectCSS'},
		{type: 'string', normalVal: ['2d'], dirtyVal: []},
		{type: 'string', normalVal: ['animation'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    getOverrideStyle: [
        {type: 'objectStyle'},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'string', normalVal: ['pseudoElt'], dirtyVal: []},
    ],
    createNSResolver: [
        {type: 'objectXPathResolver'},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],

    // Nodemap
    getNamedItem: [
		{type: 'object'},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    getNamedItemNS: [
		{type: 'object'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    removeNamedItem: [
		{type: 'object'},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    removeNamedItemNS: [
		{type: 'object'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    setNamedItem: [
		{type: 'object'},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    setNamedItemNS: [
		{type: 'object'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    item: [
		{type: 'object'},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],

    // Attribute
    setAttribute: [
		{type: ''},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
		{type: 'string', normalVal: ['attrVal'], dirtyVal: []},
    ],
    setAttributeNS: [
		{type: ''},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
		{type: 'string', normalVal: ['attrVal'], dirtyVal: []},
    ],
    setAttributeNode: [
		{type: 'objectAttr'},
		{type: 'objectAttr', normalVal: [], dirtyVal: []},
    ],
    setAttributeNodeNS: [
		{type: 'objectAttr'},
		{type: 'objectAttr', normalVal: [], dirtyVal: []},
    ],
    getAttribute: [
		{type: 'string'},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    getAttributeNS: [
		{type: 'string'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    getAttributeNode: [
		{type: 'objectAttr'},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    getAttributeNodeNS: [
		{type: 'objectAttr'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    removeAttribute: [
		{type: ''},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    removeAttributeNS: [
		{type: ''},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
		{type: 'string', normalVal: ['attrName'], dirtyVal: []},
    ],
    removeAttributeNode: [
		{type: 'objectAttr'},
		{type: 'objectAttr', normalVal: [], dirtyVal: []},
    ],
    hasAttributes: [
		{type: 'boolean'},
    ],
    hasAttribute: [
		{type: 'boolean'},
		{type: 'string', normalVal: ['attributeName'], dirtyVal: []},
    ],
    hasAttributeNS: [
		{type: 'boolean'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: []},
		{type: 'string', normalVal: ['attributeName'], dirtyVal: []},
    ],

    // Event
    /*
    addEventListener: [
		{type: ''},
		{type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []}
    ],
    removeEventListener: [
		{type: ''},
		{type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []}
    ],
    dispatchEvent: [
		{type: ''},
		{type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []}
    ],*/

    // CSS
    querySelector: [
		{type: 'object'},
		{type: 'string', normalVal: [], dirtyVal: []},
    ],
    querySelectorAll: [
		{type: 'objectList'},
		{type: 'string', normalVal: [], dirtyVal: []},
    ],
    getClientRects: [
		{type: 'objectRectList'},
    ],
    getBoundingClientRect: [
		{type: 'objectRect'},
    ],

    // Webkit
    requestAutocomplete: [
		{type: ''},
    ],
    webkitMatchesSelector: [
		{type: 'boolean'},
		{type: 'string', normalVal: ['CSSSelectors'], dirtyVal: []},
    ],
    webkitCreateShadowRoot: [
		{type: 'objectRoot'},
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
    webkitRequestFileSystem: [
		{type: ''},
    ],
    webkitResolveLocalFileSystemURL: [
		{type: ''},
    ],
    webkitConvertPointFromPageToNode: [
		{type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    webkitConvertPointFromNodeToPage: [
		{type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    /*
    webkitGenerateKeyRequest: [
		{type: ''},
		{type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []}
    ],
    webkitAddKey: [
		{type: ''},
		{type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []}
    ],
    webkitCancelKeyRequest: [
		{type: ''},
		{type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []},
        {type: , normalVal: [], dirtyVal: []}
    ],
    */
    webkitEnterPointerLock: [
		{type: ''},
    ],
    webkitCancelFullScreen: [
		{type: ''},
    ],
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
/*
 * Author: demi6od <demi6d@gmail.com>
 * Date: 2013 Oct 21st
 * 
 * Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
 * - remove all dependencies of logger element
 */

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
demicm.fontFamilyVal = convoluteArr(demicm.familyName, demicm.genericFamily, ',', 1);

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

demicm.textShadowVal = convoluteArr(demicm.lengthUnitTriple, demicm.color, ' ', 1);
demicm.boxShadowVal = convoluteArr(demicm.lengthUnitQuadruple, demicm.color, ' ', 1);
demicm.boxShadowVal = demicm.boxShadowVal.concat(convoluteArr(demicm.boxShadowVal, ['inset'], ' ', 1));
demicm.enableBackgroundVal = convoluteArr(['new'], demicm.normalNumQuadruple, ' ', 2);
demicm.orientationVal = demicm.angle.concat(convoluteArr(demicm.angle, ['flip'], ' ', 1));
demicm.clipVal = [];
for(var i=0; i<demicm.lengthUnitQuadrupleComma.length; i++) {
    demicm.clipVal.push('rect(' + demicm.lengthUnitQuadrupleComma[i] + ')');
}
demicm.opacityVal = [];
for(var i=0; i<demicm.normalNum.length; i++) {
    demicm.opacityVal.push(demicm.normalNum[i]/100);
}


demicm.styleDic = {
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
    boxShadow: [demicm.boxShadowVal],
    boxSizing: ['content-box', 'border-box', 'inherit'],
    bufferedRendering: ['auto', 'static', 'dynamic'],
    captionSide: ['top', 'bottom'],
    clear: ['left', 'right', 'both', 'none', 'inherit'],
    clip: [demicm.clipVal, 'auto', 'inherit'],
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
    enableBackground: [demicm.enableBackgroundVal, 'accumulate', 'inherit' ],
    fill: [demicm.color],
    fillOpacity: [demicm.opacityVal],
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
    floodOpacity: [demicm.opacityVal],
    //font: [],
    fontFamily: [demicm.fontFamilyVal, 'inherit'],
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
    opacity: [demicm.opacityVal],
    order: [demicm.normalNum, 'inherit'],
    orientation: ['from-image', demicm.orientationVal, 'flip'],
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
    stopOpacity: [demicm.opacityVal],
    stroke: ['none', 'currentColor', demicm.color, 'inherit'],
    strokeDasharray: ['none', 'dasharray', 'inherit'],
    strokeDashoffset: [demicm.lengthUnit, demicm.pct, 'inherit'],
    strokeLinecap: ['butt', 'round', 'bevel'],
    strokeLinejoin: ['miter', 'round', 'bevel', 'inherit'],
    strokeMiterlimit: ['inherit'],
    strokeOpacity: [demicm.opacityVal, 'inherit'],
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
    textShadow: [demicm.boxShadowVal],
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
for(var style in demicm.styleDic) {
    demicm.styles.push(style);
}
