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

// Group
demicm.rangeId = 0; // range
demicm.selId = 1; // selection
demicm.niId = 2; // nodeIterator
demicm.twId = 3; // treeWalker
demicm.curItrNodeId = 4; // currentIterateNode
demicm.curTreeNodeId = 5; // currentTreeNode

// Assistance
demicm.styleId = 6;
demicm.relayoutId = 7;

// Special
demicm.winId = 8;
demicm.attrId = 9;
demicm.nodeMapId = 10;

// Multi
demicm.openId = 11;
demicm.ifrId = 12;
demicm.frsId = 13;
demicm.frId = 14;

// Event
demicm.evtId = 15;

// HTML5
demicm.webglId = 16;
demicm.canvas2dId = 17;

// Prop or func return object
var idR = [];
// Ret object tag kinds
demicm.tagRs = [];
demicm.tagRBlackList = ['Window', 'document'];

// Fuzzer type
demicm.BROWSER = 'FF';

demicm.IS_RAND_FUZZ = true;
demicm.IS_DEBUG = false;
demicm.IS_LOG_DEBUG = false;
demicm.IS_FUZZ_GROUP = false;
demicm.IS_FUZZ_MULTI = false;
demicm.IS_FUZZ_SPEC = false;

// Fuzzer status
demicm.fuzzStat = 'start';

// Environment initial
demicm.ENV_PER = 80; // 80
demicm.DES_PER = 60; // 60

// HTML initial
demicm.INI_TAG_NUM = 20; // Initial ref tag number
demicm.REF_TAG_PER = 40; // Ref elem percent
demicm.TAG_PROP_NUM = 10; // 10
demicm.TAG_ORDER_PER = 50; // 50

// DOM Tree initial
demicm.INI_ELEM_NUM = 12; // Initial all elem number
demicm.REF_ELEM_PER = 40; // Ref elem percent
demicm.BODY_RATIO = 5; 
demicm.HEAD_RATIO = 3; 
demicm.HTML_RATIO = 2; 
demicm.DANGLE_RATIO = 1; 

demicm.TEXT_NUM = 15; // TextNode number
demicm.REF_TEXT_PER = 15; // no ref elem percent

demicm.EVENT_NUM = 20; // 30 Event num for per elem
demicm.EVENT_ELEM_PER = 30; // 50 Elems percent to set event
demicm.FIRE_EVENT_PER = 10; // 10

demicm.CALL_BACK_ELEM_PER = 30; // 30 Elems percent to set callback

demicm.CSS_DIVERSE_NUM = 3; // 3

demicm.PROP_STY_INI_NUM = 3; // 3

demicm.MULTI_ELEM_NUM = 5; // 5

// Operate number
demicm.FRONT_OP_CNT = 40; // 30 | 60
demicm.BACK_OP_CNT = 25; // 20 | 40
demicm.EVENT_OP_CNT = 10; // 10 | 20
demicm.CALL_BACK_OP_CNT = 10; // 10 | 20
demicm.CALL_BACK_JS_OP_CNT = 20; // 20

// Operate rate: n%(n = 0~100) probability to run
// Prop, func, style
demicm.PROP_PER = 60; // 60
demicm.PROP_REC_PER = 50; // 50
demicm.FUNC_PER = 50; // 50
demicm.FUNC_REC_PER = 40; // 40
demicm.STYLE_PER = 60; // 60
demicm.RET_PER = 80; // 80

// Prop and func value
demicm.PROP_DIRTY_PER = 20; // 20
demicm.PROP_NORMAL_PER = 80; // 80
demicm.PROP_RANDOM_PER = 60; // 60

demicm.FUNC_DIRTY_PER = 20;
demicm.FUNC_NORMAL_PER = 80;
demicm.FUNC_RANDOM_PER = 60;

// Spec operate
demicm.LAYOUT_PER = 10; // 10
demicm.CLEAR_PER = 10; // 10
demicm.CLEAR_ALL_PER = 3; // 3
demicm.DOM_PER = 50; // 50
demicm.GC_PER = 20; // 20

// Spec object
demicm.WIN_PER = 20; // 20
demicm.ATTR_PER = 100; // 100
demicm.SET_ATTR_PER = 20; // 20

demicm.ADD_WEBGL_PER = 20; // 20
demicm.WEBGL_PER = 80; // 80
demicm.DRAW_WEBGL_PER = 20; // 20

demicm.ADD_CANVAS2D_PER = 20; // 20
demicm.CANVAS2D_PER = 60; // 60

demicm.ADD_NETWORK = 10; // 10

// Multi page
demicm.MULTI_MAN_PER = 40; // 40 
demicm.MULTI_CLEAR_PER = 3; // 3

// Group
demicm.MOVE_ITR_PER = 80; // 80
demicm.MOVE_TREE_PER = 80; // 80
demicm.SET_ELEM_RANGE_PER = 20; // 20
demicm.ALTER_ELEM_RANGE_PER = 80; // 80
demicm.SET_SELECTION_PER = 20; // 20
demicm.ALTER_SELECTION_PER = 80; // 80

// Event
demicm.EVENT_MAN_PER = 80; // 80
demicm.EVENT_OP_PER = 60; // 50 | 60
demicm.EVENT_CLEAR_PER = 60; // 60 | 80
demicm.EVENT_CLEAR_ALL_PER = 20; // 20 | 30

// Callback
demicm.CALL_BACK_OP_PER = 60; // 50 | 60
demicm.CALL_BACK_CLEAR_PER = 60; // 60 | 80
demicm.CALL_BACK_CLEAR_ALL_PER = 20; // 20 | 30

demicm.CALL_BACK_JS_OP_PER = 100; // 100
demicm.CALL_BACK_JS_CLEAR_PER = 80; // 80
demicm.CALL_BACK_JS_CLEAR_ALL_PER = 50; // 50

// Web worker
demicm.WORKER_PER = 20; // 20
demicm.SHARED_WORKER_PER = 20; // 20

// Max recursion level
demicm.MAX_REC_DEPTH = 3; // 3
demicm.MAX_REC_DEPTH_EVT = 2; // 2
demicm.MAX_REC_DEPTH_REU = 2; // 2
demicm.MAX_RET_REC_DEPTH = 3; // 3
demicm.MAX_RET_REC_DEPTH_EVT = 2; // 2
demicm.MAX_RET_REC_DEPTH_REU = 0; // 0
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
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        logger.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) 
            + ' = document.createNodeIterator(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);', 'grind', 1);
        idS[demicm.niId] = document.createNodeIterator(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch (e) {
        logger.log('// Error: constructNodeIterator: ' + e.message, 'grind', 1);
    }
}

function constructTreeWalker() {
    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        logger.log('id_' + (demicm.twId + demicm.SPEC_OFFSET) 
            + ' = document.createTreeWalker(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);', 'grind', 1);
        idS[demicm.twId] = document.createTreeWalker(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch (e) {
        logger.log('// Error: constructTreeWalker: ' + e.message, 'grind', 1);
    }
}

function constructRange() {
    try {
        logger.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ' = document.createRange();', 'grind', 1);
        idS[demicm.rangeId] = document.createRange();

        setRange();
    } catch (e) {
        logger.log('// Error: constructRange: ' + e.message, 'grind', 1);
    }
}

function setRange() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] setRange()', 'grind', 1);
    }

    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        logger.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setStart(id_' + rId + ', 0);', 'grind', 1);
        idS[demicm.rangeId].setStart(id[rId], 0);

        rId = randId();
        if (rId == 'none') {
            return;
        }
        logger.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setEnd(id_' + rId + ', 0);', 'grind', 1);
        idS[demicm.rangeId].setEnd(id[rId], 0);
    } catch (e) {
        logger.log('// Error: setRange: ' + e.message, 'grind', 1);
    }
}

function constructSelection() {
    try {
        logger.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) + ' = window.getSelection();', 'grind', 1);
        idS[demicm.selId] = window.getSelection();

        setSelection();
    } catch (e) {
        logger.log('// Error: constructSelection: ' + e.message, 'grind', 1);
    }
}

function setSelection() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] setSelection()', 'grind', 1);
    }

    try {
        var rId = randId();
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
    } catch (e) {
        logger.log('// Error: setSelection: ' + e.message, 'grind', 1);
    }
}

function nodeIteration() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] nodeIteration()', 'grind', 1);
    }

    try {
        // Fuzz current node
        logger.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.referenceNode;', 'grind', 1);
        idS[demicm.curItrNodeId] = idS[demicm.niId].referenceNode;

        if (idS[demicm.curItrNodeId]) {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        logger.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.root;', 'grind', 1);
        idS[demicm.curItrNodeId] = idS[demicm.niId].root;

        var count = 0;
        while (idS[demicm.curItrNodeId] && count++ < demicm.MAX_ITR)  {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            logger.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();', 'grind', 1);
            idS[demicm.curItrNodeId] = idS[demicm.niId].nextNode();
        }
    } catch (e) {
        logger.log('// Error: nodeIteration: ' + e.message, 'grind', 1);
    }
}

function treeIteration() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] treeIteration()', 'grind', 1);
    }

    try {
        // Fuzz current node
        logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.currentNode;', 'grind', 1);
        idS[demicm.curTreeNodeId] = idS[demicm.twId].currentNode;

        if (idS[demicm.curTreeNodeId]) {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.root;', 'grind', 1);
        idS[demicm.curTreeNodeId] = idS[demicm.twId].root;

        var count = 0;
        while (idS[demicm.curTreeNodeId] && count++ < demicm.MAX_ITR)  {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                    + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();', 'grind', 1);
            idS[demicm.curTreeNodeId] = idS[demicm.twId].nextNode();
        }
    } catch (e) {
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
                    logger.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();', 'grind', 1);
                    idS[demicm.curItrNodeId] = idS[demicm.niId].nextNode();
                    break;
                case 1:
                    logger.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.previousNode();', 'grind', 1);
                    idS[demicm.curItrNodeId] = idS[demicm.niId].previousNode();
                    break;
                default:
                    logger.log('// Warning: moveIterator default', 'grind', 1);
                    break;
            }

            propfMan([demicm.niId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curItrNodeId]) {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
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
                    logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();', 'grind', 1);
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].nextNode();
                    break;
                case 1:
                    logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousNode();', 'grind', 1);
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].previousNode();
                    break;
                case 2:
                    logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousSibling();', 'grind', 1);
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].previousSibling();
                    break;
                case 3:
                    logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextSibling();', 'grind', 1);
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].nextSibling();
                    break;
                case 4:
                    logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.firstChild();', 'grind', 1);
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].firstChild();
                    break;
                case 5:
                    logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.lastChild();', 'grind', 1);
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].lastChild();
                    break;
                case 6:
                    logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.parentNode();', 'grind', 1);
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].parentNode();
                    break;	
                default:
                    logger.log('// Warning: moveTreeWalker default', 'grind', 1);
                    break;
            }

            propfMan([demicm.twId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curTreeNodeId]) {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
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

        var rId = randId();
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

            default:
                logger.log('// Warning: alterRange default', 'grind', 1);
                break;
        }		
    } catch (e) {
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
    } catch (e) {
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
        logger.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
        idS[demicm.curItrNodeId] = null;
        logger.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.detach();', 'grind', 1);
        idS[demicm.niId].detach();
        logger.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
        idS[demicm.niId] = null;
        logger.log('gc();', 'grind', 1);
        gc();

        treeIteration();
        logger.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
        idS[demicm.curTreeNodeId] = null;
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
    } catch (e) {
        logger.log('// Error: reuseGroup: ' + e.message, 'grind', 1);
    }
}

function objMan(type) {
    if (demicm.IS_DEBUG) {
        logger.log('[+] objMan(' + type + ')', 'grind', 1);
    }

    var rObjId = randObjId(type);
    if (rObjId == 'none') {
        return;
    }

    propfMan([rObjId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', type);
    propfMan([rObjId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', type);
}

/************************************* prelude *************************************/
function preludeFirst() {
    setEnv();

    constructDOMTree();

    addTextNode();

    if (demicm.IS_FUZZ_SPEC) {
        constructSpec();
    }

    if (demicm.IS_FUZZ_GROUP) {
        constructGroup();
    }

    if (demicm.IS_FUZZ_MULTI) {
        constructMulti();
    }
}

function preludeSecond() {
    if (demicm.BROWSER == 'CM' || demicm.BROWSER == 'FF') {
        if (percent(demicm.WORKER_PER)) {
            appendWorker();
        }
        if (percent(demicm.SHARED_WORKER_PER)) {
            appendSharedWorker();
        }
    }

    setEvtHandler();

    setCallBack();

    addCSS();

    setPropSty();
}

function setPropSty() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] setProp()', 'grind', 1);
    }

    try {
        for (var j = 0; j < demicm.PROP_STY_INI_NUM; j++) {
            for (var i = 0; i < id.length; i++) {
                if (id[i]) {
                    propfMan([i], 1, 0, 'prop', 'node');
                    styleMan(i);
                }
            }
        }
    } catch (e) {
        logger.log('// Error: setPropStyle: ' + e.message, 'grind', 1);
    }
}

function setEnv() {
    // Set HTML property
    if (percent(demicm.ENV_PER)) {
        logger.log('document.documentElement.contentEditable = "true";', 'grind', 1);
        document.documentElement.contentEditable = 'true';
        logger.log('document.body.contentEditable = "true";', 'grind', 1);
        document.body.contentEditable = 'true';
        logger.log('document.head.contentEditable = "true";', 'grind', 1);
        document.head.contentEditable = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        logger.log('document.documentElement.dir = "rtl";', 'grind', 1);
        document.documentElement.dir = 'rtl';
        logger.log('document.body.dir = "rtl";', 'grind', 1);
        document.body.dir = 'rtl';
        logger.log('document.head.dir = "rtl";', 'grind', 1);
        document.head.dir = 'rtl';
    }

    if (percent(demicm.ENV_PER)) {
        logger.log('document.documentElement.draggable = "true";', 'grind', 1);
        document.documentElement.draggable = 'true';
        logger.log('document.body.draggable = "true";', 'grind', 1);
        document.body.draggable = 'true';
        logger.log('document.head.draggable = "true";', 'grind', 1);
        document.head.draggable = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        logger.log('document.documentElement.spellcheck = "true";', 'grind', 1);
        document.documentElement.spellcheck = 'true';
        logger.log('document.body.spellcheck = "true";', 'grind', 1);
        document.body.spellcheck = 'true';
        logger.log('document.head.spellcheck = "true";', 'grind', 1);
        document.head.spellcheck = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        logger.log('document.documentElement.translate = "true";', 'grind', 1);
        document.documentElement.translate = 'true';
        logger.log('document.body.translate = "true";', 'grind', 1);
        document.body.translate = 'true';
        logger.log('document.head.translate = "true";', 'grind', 1);
        document.head.translate = 'true';
    }

    // Clear body onload event
    logger.log('document.body.onload = null;', 'grind', 1);
    document.body.onload = null;

    // Set at least one idR item for propfMan
    logger.log('var id_' + demicm.RET_OFFSET + ' = null;', 'grind', 1);
    idR[0] = null;

    if ((demicm.BROWSER == 'CM' || demicm.BROWSER == 'FF') && percent(demicm.DES_PER)) {
        logger.log('document.designMode = "on";', 'grind', 1);
        document.designMode = 'on';
    }

    // Set props and funcs cache
    getPropAndFunc();
}

function eventHandler() {
    if (percent(demicm.EVENT_MAN_PER)) {
        logger.log('id_' + (demicm.evtId + demicm.SPEC_OFFSET) + ' = arguments[0];', 'grind', 1);
        idS[demicm.evtId] = arguments[0];

        propfMan([demicm.evtId], demicm.MAX_REC_DEPTH_EVT, demicm.MAX_RET_REC_DEPTH_EVT, 'prop', 'spec');
        propfMan([demicm.evtId], demicm.MAX_REC_DEPTH_EVT, demicm.MAX_RET_REC_DEPTH_EVT, 'func', 'spec');
    }

    if (percent(demicm.EVENT_OP_PER)) {
        operate(demicm.EVENT_OP_CNT);
    }

    if (percent(demicm.EVENT_CLEAR_PER)) {
        clearSub();
    }

    if (percent(demicm.EVENT_CLEAR_ALL_PER)) {
        clearAll();
    }

    logger.log('/-};', 'grind', 1);
}

function setEvtHandler() {
    for (var i = 0; i < id.length; i++) {
        if (!id[i] || getTagName(id[i]) == 'text') {
            continue;
        }
        if (!percent(demicm.EVENT_ELEM_PER)) {
            continue;
        }

        try {
            // Set EVENT_NUM event handlers for i element
            var tagName = getTagName(id[i]); 
            if (!inArr(demicm.tags, tagName)) {
                updatePropfCache(id[i]);
            }
            for (var j = 0; j < demicm.EVENT_NUM; j++) {
                var rEvt = randPropf(tagName, id[i], 'evt');
                if (id[i][rEvt] == null) {
                    id[i][rEvt] = new Function('logger.log("//id_' + i 
                        + '[\'' + rEvt + '\'] = function()", "grind", 1);logger.log("/-{", "grind", 1);eventHandler();');
                }
            }
        } catch (e) {
            logger.log('// Error: setEvtHandler: ' + e.message, 'grind', 1);
        }
    }
}

function callBackJs() {
    logger.log('//callBackJs = function()', 'grind', 1);
    logger.log('/-{', 'grind', 1);

    if (percent(demicm.CALL_BACK_JS_OP_PER)) {
        operate(demicm.CALL_BACK_JS_OP_CNT);
    }

    if (percent(demicm.CALL_BACK_JS_CLEAR_PER)) {
        clearSub();
    }

    if (percent(demicm.CALL_BACK_JS_CLEAR_ALL_PER)) {
        clearAll();
    }

    logger.log('/-};', 'grind', 1);
}

function callBack() {
    if (percent(demicm.CALL_BACK_OP_PER)) {
        operate(demicm.CALL_BACK_OP_CNT);
    }

    if (percent(demicm.CALL_BACK_CLEAR_PER)) {
        clearSub();
    }

    if (percent(demicm.CALL_BACK_CLEAR_ALL_PER)) {
        clearAll();
    }

    logger.log('/-};', 'grind', 1);
}

function setCallBack() {
    // Not set id_0
    for (var i = 1; i < id.length; i++) {
        if (!id[i]) {
            continue;
        }
        if (!percent(demicm.CALL_BACK_ELEM_PER)) {
            continue;
        }

        id[i].toStringBack = id[i].toString;

        id[i].toString = new Function('logger.log("//id_' + i 
            + '.toString = function()", "grind", 1);logger.log("/-{", "grind", 1);callBack();');
        id[i].toLocalString = new Function('logger.log("//id_' + i 
            + '.toLocalString = function()", "grind", 1);logger.log("/-{", "grind", 1);callBack();');
        id[i].valueOf = new Function('logger.log("//id_' + i 
            + '.valueOf = function()", "grind", 1);logger.log("/-{", "grind", 1);callBack();');
    }
}

function addTextNode() {
    for (var i = 0; i < demicm.TEXT_NUM; i++) {
        try {
            var rStr = randStr(rand(0x100)); 
            var rId = randId(true);

            if (percent(demicm.REF_TEXT_PER)) {
                // Add ref textNode 
                logger.log('id_' + id.length + ' = document.createTextNode("' + rStr + '");', 'grind', 1);
                id[id.length] = document.createTextNode(rStr);
                logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
                id[id.length - 1].id = id.length - 1;

                logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
                id[rId].appendChild(id[id.length - 1]);
            } else {
                // Add no ref textNode 
                logger.log('id_' + rId + '.appendChild(document.createTextNode("' + rStr + '"));', 'grind', 1);
                id[rId].appendChild(document.createTextNode(rStr));
            }
        } catch (e) {
            logger.log('// Error: addTextNode: ' + e.message, 'grind', 1);
        }
    }
}

function appendForm(rId, rTxt) {
    // Add form
    logger.log('id_' + id.length + ' = document.createElement("form");', 'grind', 1);
    id[id.length] = document.createElement('form');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var formId = id.length - 1;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Add input text
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "text";', 'grind', 1);
    id[id.length - 1].type = 'text';
    var inputTextId = id.length - 1;

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add label
    logger.log('id_' + id.length + ' = document.createElement("label");', 'grind', 1);
    id[id.length] = document.createElement('label');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.htmlFor = ' + inputTextId + ';', 'grind', 1);
    id[id.length - 1].htmlFor = inputTextId;

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add input password
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "password";', 'grind', 1);
    id[id.length - 1].type = 'password';

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add input checkbox
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "checkbox";', 'grind', 1);
    id[id.length - 1].type = 'checkbox';
    logger.log('id_' + (id.length - 1) + '.name = "checkbox";', 'grind', 1);
    id[id.length - 1].name = 'checkbox';

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "checkbox";', 'grind', 1);
    id[id.length - 1].type = 'checkbox';
    logger.log('id_' + (id.length - 1) + '.name = "checkbox";', 'grind', 1);
    id[id.length - 1].name = 'checkbox';

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add input submit
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "submit";', 'grind', 1);
    id[id.length - 1].type = 'submit';

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add input range
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "range";', 'grind', 1);
    id[id.length - 1].type = 'range';
    logger.log('id_' + (id.length - 1) + '.min = 20;', 'grind', 1);
    id[id.length - 1].min = 20;
    logger.log('id_' + (id.length - 1) + '.max = 120;', 'grind', 1);
    id[id.length - 1].max = 120;
    logger.log('id_' + (id.length - 1) + '.step = 5;', 'grind', 1);
    id[id.length - 1].step = 5;
    logger.log('id_' + (id.length - 1) + '.value = 50;', 'grind', 1);
    id[id.length - 1].value = 50;

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add input number
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "number";', 'grind', 1);
    id[id.length - 1].type = 'number';

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add input email
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "email";', 'grind', 1);
    id[id.length - 1].type = 'email';

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add input url
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "url";', 'grind', 1);
    id[id.length - 1].type = 'url';

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add input search
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "search";', 'grind', 1);
    id[id.length - 1].type = 'search';

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    if (demicm.BROWSER == 'CM' || demicm.BROWSER == 'FF') {
        // Add input color
        logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
        id[id.length] = document.createElement('input');
        logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
        id[id.length - 1].id = id.length - 1;
        logger.log('id_' + (id.length - 1) + '.type = "color";', 'grind', 1);
        id[id.length - 1].type = 'color';

        logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
        id[formId].appendChild(id[id.length - 1]);

        // Add input datetime
        logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
        id[id.length] = document.createElement('input');
        logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
        id[id.length - 1].id = id.length - 1;
        logger.log('id_' + (id.length - 1) + '.type = "datetime";', 'grind', 1);
        id[id.length - 1].type = 'datetime';

        logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
        id[formId].appendChild(id[id.length - 1]);

        // Add input datetime-local
        logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
        id[id.length] = document.createElement('input');
        logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
        id[id.length - 1].id = id.length - 1;
        logger.log('id_' + (id.length - 1) + '.type = "datetime-local";', 'grind', 1);
        id[id.length - 1].type = 'datetime-local';

        logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
        id[formId].appendChild(id[id.length - 1]);

        // Add input time
        logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
        id[id.length] = document.createElement('input');
        logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
        id[id.length - 1].id = id.length - 1;
        logger.log('id_' + (id.length - 1) + '.type = "time";', 'grind', 1);
        id[id.length - 1].type = 'time';

        logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
        id[formId].appendChild(id[id.length - 1]);

        // Add input date
        logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
        id[id.length] = document.createElement('input');
        logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
        id[id.length - 1].id = id.length - 1;
        logger.log('id_' + (id.length - 1) + '.type = "date";', 'grind', 1);
        id[id.length - 1].type = 'date';

        logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
        id[formId].appendChild(id[id.length - 1]);

        // Add input week
        logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
        id[id.length] = document.createElement('input');
        logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
        id[id.length - 1].id = id.length - 1;
        logger.log('id_' + (id.length - 1) + '.type = "week";', 'grind', 1);
        id[id.length - 1].type = 'week';

        logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
        id[formId].appendChild(id[id.length - 1]);

        // Add input month
        logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
        id[id.length] = document.createElement('input');
        logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
        id[id.length - 1].id = id.length - 1;
        logger.log('id_' + (id.length - 1) + '.type = "month";', 'grind', 1);
        id[id.length - 1].type = 'month';

        logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
        id[formId].appendChild(id[id.length - 1]);
    }

    // Add input number
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "number";', 'grind', 1);
    id[id.length - 1].type = 'number';

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add input tel
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "tel";', 'grind', 1);
    id[id.length - 1].type = 'tel';

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add output
    logger.log('id_' + id.length + ' = document.createElement("output");', 'grind', 1);
    id[id.length] = document.createElement('output');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add keygen
    logger.log('id_' + id.length + ' = document.createElement("keygen");', 'grind', 1);
    id[id.length] = document.createElement('keygen');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add fieldset
    logger.log('id_' + id.length + ' = document.createElement("fieldset");', 'grind', 1);
    id[id.length] = document.createElement('fieldset');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var fieldsetId = id.length - 1;

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add legend
    logger.log('id_' + id.length + ' = document.createElement("legend");', 'grind', 1);
    id[id.length] = document.createElement('legend');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[fieldsetId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add input button
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "button";', 'grind', 1);
    id[id.length - 1].type = 'button';

    logger.log('id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[fieldsetId].appendChild(id[id.length - 1]);

    // Add input radio
    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "radio";', 'grind', 1);
    id[id.length - 1].type = 'radio';
    logger.log('id_' + (id.length - 1) + '.name = "radio";', 'grind', 1);
    id[id.length - 1].name = 'radio';

    logger.log('id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[fieldsetId].appendChild(id[id.length - 1]);

    logger.log('id_' + id.length + ' = document.createElement("input");', 'grind', 1);
    id[id.length] = document.createElement('input');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.type = "radio";', 'grind', 1);
    id[id.length - 1].type = 'radio';
    logger.log('id_' + (id.length - 1) + '.name = "radio";', 'grind', 1);
    id[id.length - 1].name = 'radio';

    logger.log('id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[fieldsetId].appendChild(id[id.length - 1]);

    // Add datalist
    logger.log('id_' + id.length + ' = document.createElement("datalist");', 'grind', 1);
    id[id.length] = document.createElement('datalist');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var datalistId = id.length - 1;

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add option
    logger.log('id_' + id.length + ' = document.createElement("option");', 'grind', 1);
    id[id.length] = document.createElement('option');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + datalistId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[datalistId].appendChild(id[id.length - 1]);

    // Add option with no id
    logger.log('id_' + datalistId + '.appendChild(document.createElement("option"));', 'grind', 1);
    id[datalistId].appendChild(document.createElement('option'));
    logger.log('id_' + datalistId + '.appendChild(document.createElement("option"));', 'grind', 1);
    id[datalistId].appendChild(document.createElement('option'));

    // Add textarea
    logger.log('id_' + id.length + ' = document.createElement("textarea");', 'grind', 1);
    id[id.length] = document.createElement('textarea');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add select
    logger.log('id_' + id.length + ' = document.createElement("select");', 'grind', 1);
    id[id.length] = document.createElement('select');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var selId = id.length - 1;

    logger.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[formId].appendChild(id[id.length - 1]);

    // Add option
    logger.log('id_' + id.length + ' = document.createElement("option");', 'grind', 1);
    id[id.length] = document.createElement('option');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + selId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[selId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add option with no id
    logger.log('id_' + selId + '.appendChild(document.createElement("option"));', 'grind', 1);
    id[selId].appendChild(document.createElement('option'));
    logger.log('id_' + selId + '.appendChild(document.createElement("option"));', 'grind', 1);
    id[selId].appendChild(document.createElement('option'));

    // Add optgroup
    logger.log('id_' + id.length + ' = document.createElement("optgroup");', 'grind', 1);
    id[id.length] = document.createElement('optgroup');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var optgroupId = id.length - 1;

    logger.log('id_' + selId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[selId].appendChild(id[id.length - 1]);

    // Add option
    logger.log('id_' + id.length + ' = document.createElement("option");', 'grind', 1);
    id[id.length] = document.createElement('option');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + optgroupId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[optgroupId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add option with no id
    logger.log('id_' + optgroupId + '.appendChild(document.createElement("option"));', 'grind', 1);
    id[optgroupId].appendChild(document.createElement('option'));
    logger.log('id_' + optgroupId + '.appendChild(document.createElement("option"));', 'grind', 1);
    id[optgroupId].appendChild(document.createElement('option'));
}

function appendList(rId, rTxt) {
    // Add ol
    logger.log('id_' + id.length + ' = document.createElement("ol");', 'grind', 1);
    id[id.length] = document.createElement('ol');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var olId = id.length - 1;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Add li
    logger.log('id_' + id.length + ' = document.createElement("li");', 'grind', 1);
    id[id.length] = document.createElement('li');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + olId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[olId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add li with no id
    logger.log('id_' + olId + '.appendChild(document.createElement("li"));', 'grind', 1);
    id[olId].appendChild(document.createElement('li'));
    logger.log('id_' + olId + '.appendChild(document.createElement("li"));', 'grind', 1);
    id[olId].appendChild(document.createElement('li'));

    // Add ul
    logger.log('id_' + id.length + ' = document.createElement("ul");', 'grind', 1);
    id[id.length] = document.createElement('ul');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var ulId = id.length - 1;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Add li
    logger.log('id_' + id.length + ' = document.createElement("li");', 'grind', 1);
    id[id.length] = document.createElement('li');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + ulId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[ulId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add li with no id
    logger.log('id_' + ulId + '.appendChild(document.createElement("li"));', 'grind', 1);
    id[ulId].appendChild(document.createElement('li'));
    logger.log('id_' + ulId + '.appendChild(document.createElement("li"));', 'grind', 1);
    id[ulId].appendChild(document.createElement('li'));

    // Add dl
    logger.log('id_' + id.length + ' = document.createElement("dl");', 'grind', 1);
    id[id.length] = document.createElement('dl');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var dlId = id.length - 1;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Add dt
    logger.log('id_' + id.length + ' = document.createElement("dt");', 'grind', 1);
    id[id.length] = document.createElement('dt');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + dlId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[dlId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add dd
    logger.log('id_' + id.length + ' = document.createElement("dd");', 'grind', 1);
    id[id.length] = document.createElement('dd');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + dlId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[dlId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add dt and dd with no id
    logger.log('id_' + dlId + '.appendChild(document.createElement("dt"));', 'grind', 1);
    id[dlId].appendChild(document.createElement('dt'));
    logger.log('id_' + dlId + '.appendChild(document.createElement("dd"));', 'grind', 1);
    id[dlId].appendChild(document.createElement('dd'));
    logger.log('id_' + dlId + '.appendChild(document.createElement("dt"));', 'grind', 1);
    id[dlId].appendChild(document.createElement('dt'));
    logger.log('id_' + dlId + '.appendChild(document.createElement("dd"));', 'grind', 1);
    id[dlId].appendChild(document.createElement('dd'));
}

function appendCanvas2D(rId, rTxt) {
    // Add canvas
    logger.log('id_' + id.length + ' = document.createElement("canvas");', 'grind', 1);
    id[id.length] = document.createElement('canvas');
    logger.log('id_' + (id.length - 1) + '.width = "320";', 'grind', 1);
    id[id.length - 1].width = '320';
    logger.log('id_' + (id.length - 1) + '.height = "240";', 'grind', 1);
    id[id.length - 1].height = '240';
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var canvasId = id.length - 1;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Get the 2D rendering context
    logger.log('id_' + (demicm.canvas2dId + demicm.SPEC_OFFSET) + ' = id_' + canvasId + '.getContext("2d");', 'grind', 1);
    idS[demicm.canvas2dId] = id[canvasId].getContext('2d');
}

function appendWebGL(rId, rTxt) {
    // Add canvas
    logger.log('id_' + id.length + ' = document.createElement("canvas");', 'grind', 1);
    id[id.length] = document.createElement('canvas');
    logger.log('id_' + (id.length - 1) + '.width = "320";', 'grind', 1);
    id[id.length - 1].width = '320';
    logger.log('id_' + (id.length - 1) + '.height = "240";', 'grind', 1);
    id[id.length - 1].height = '240';
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var canvasId = id.length - 1;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Get the rendering context for WebGL
    logger.log('id_' + (demicm.webglId + demicm.SPEC_OFFSET) + ' = getWebGLContext(id_'+ canvasId + ');', 'grind', 1);
    idS[demicm.webglId] = getWebGLContext(id[canvasId]);
    logger.log('webgl = id_' + (demicm.webglId + demicm.SPEC_OFFSET) + ';', 'grind', 1);
    demicm.webgl = idS[demicm.webglId];

    // Initialize shaders
    // Vertex shader program
    demicm.VSHADER_SOURCE =
        'attribute vec4 a_Position;'
        + 'attribute vec4 a_Color;'
        + 'uniform mat4 u_MvpMatrix;'
        + 'uniform mat4 u_MvpMatrixFromLight;'
        + 'varying vec4 v_PositionFromLight;'
        + 'varying vec4 v_Color;'
        + 'void main() {'
        + '  gl_Position = u_MvpMatrix * a_Position;' 
        + '  v_PositionFromLight = u_MvpMatrixFromLight * a_Position;'
        + '  v_Color = a_Color;'
        + '}';

    // Fragment shader program
    demicm.FSHADER_SOURCE =
        'precision highp float;'
        + 'uniform sampler2D u_ShadowMap;'
        + 'varying vec4 v_PositionFromLight;'
        + 'varying vec4 v_Color;'
        + 'float unpackDepth(const in vec4 rgbaDepth) {'
        + '  const vec4 bitShift = vec4(1.0, 1.0/256.0, 1.0/(256.0*256.0), 1.0/(256.0*256.0*256.0));'
        + '  float depth = dot(rgbaDepth, bitShift);' 
        + '  return depth;'
        + '}'
        + 'void main() {'
        + '  vec3 shadowCoord = (v_PositionFromLight.xyz/v_PositionFromLight.w)/2.0 + 0.5;'
        + '  vec4 rgbaDepth = texture2D(u_ShadowMap, shadowCoord.xy);'
        + '  float depth = unpackDepth(rgbaDepth);'
        + '  float visibility = (shadowCoord.z > depth + 0.0015) ? 0.7 : 1.0;'
        + '  gl_FragColor = vec4(v_Color.rgb * visibility, v_Color.a);'
        + '}';

    logger.log('vshader = webgl.createShader(webgl.VERTEX_SHADER);', 'grind', 1);
    demicm.vshader = demicm.webgl.createShader(demicm.webgl.VERTEX_SHADER);
    logger.log('fshader = webgl.createShader(webgl.FRAGMENT_SHADER);', 'grind', 1);
    demicm.fshader = demicm.webgl.createShader(demicm.webgl.FRAGMENT_SHADER);

    logger.log('webgl.program = createProgram(webgl, "' + demicm.VSHADER_SOURCE + '", "' + demicm.FSHADER_SOURCE + '");', 'grind', 1);
    demicm.webgl.program = createProgram(demicm.webgl, demicm.VSHADER_SOURCE, demicm.FSHADER_SOURCE);

    // Get attributes
    logger.log('webgl.program.u_ShadowMap = webgl.getUniformLocation(webgl.program, "u_ShadowMap");', 'grind', 1);
    demicm.webgl.program.u_ShadowMap = demicm.webgl.getUniformLocation(demicm.webgl.program, 'u_ShadowMap');

    logger.log('webgl.program.a_Position = webgl.getAttribLocation(webgl.program, "a_Position");', 'grind', 1);
    demicm.webgl.program.a_Position = demicm.webgl.getAttribLocation(demicm.webgl.program, 'a_Position');

    logger.log('webgl.program.a_Color = webgl.getAttribLocation(webgl.program, "a_Color");', 'grind', 1);
    demicm.webgl.program.a_Color = demicm.webgl.getAttribLocation(demicm.webgl.program, 'a_Color');

    logger.log('webgl.program.u_MvpMatrix = webgl.getUniformLocation(webgl.program, "u_MvpMatrix");', 'grind', 1);
    demicm.webgl.program.u_MvpMatrix = demicm.webgl.getUniformLocation(demicm.webgl.program, 'u_MvpMatrix');

    logger.log('webgl.program.u_MvpMatrixFromLight = webgl.getUniformLocation(webgl.program, "u_MvpMatrixFromLight");', 'grind', 1);
    demicm.webgl.program.u_MvpMatrixFromLight = demicm.webgl.getUniformLocation(demicm.webgl.program
            , 'u_MvpMatrixFromLight');

    // Create texture
    logger.log('var image = new Image();', 'grind', 1);
    var image = new Image();
    logger.log('texture = webgl.createTexture();', 'grind', 1);
    demicm.texture = demicm.webgl.createTexture();
    logger.log('webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, 1);', 'grind', 1);
    demicm.webgl.pixelStorei(demicm.webgl.UNPACK_FLIP_Y_WEBGL, 1);
    logger.log('webgl.activeTexture(webgl.TEXTURE0);', 'grind', 1);
    demicm.webgl.activeTexture(demicm.webgl.TEXTURE0);
    logger.log('webgl.bindTexture(webgl.TEXTURE_2D, null);', 'grind', 1);
    demicm.webgl.bindTexture(demicm.webgl.TEXTURE_2D, null);
    logger.log('webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGB, webgl.RGB, webgl.UNSIGNED_BYTE, null);', 'grind', 1);
    demicm.webgl.texImage2D(demicm.webgl.TEXTURE_2D, 0, demicm.webgl.RGB, demicm.webgl.RGB, demicm.webgl.UNSIGNED_BYTE, null);

    // Initialize view
    logger.log('framebuffer = webgl.createFramebuffer();', 'grind', 1);
    demicm.framebuffer = demicm.webgl.createFramebuffer();
    logger.log('webgl.bindFramebuffer(webgl.FRAMEBUFFER, null);', 'grind', 1);
    demicm.webgl.bindFramebuffer(demicm.webgl.FRAMEBUFFER, null);
    logger.log('webgl.viewport(0, 0, 240, 320);', 'grind', 1);
    demicm.webgl.viewport(0, 0, 240, 320);
    logger.log('webgl.useProgram(webgl.program);', 'grind', 1);
    demicm.webgl.useProgram(demicm.webgl.program);

    logger.log('webgl.clearColor(0, 0, 0, 1);', 'grind', 1);
    demicm.webgl.clearColor(0, 0, 0, 1);
    logger.log('webgl.enable(webgl.DEPTH_TEST);', 'grind', 1);
    demicm.webgl.enable(demicm.webgl.DEPTH_TEST);

    // Connect attributes to js
    logger.log('webgl.uniform1i(webgl.program.u_ShadowMap, 0);', 'grind', 1);
    demicm.webgl.uniform1i(demicm.webgl.program.u_ShadowMap, 0);

    logger.log('var viewProjMatrixFromLight = new Matrix4();', 'grind', 1);
    var viewProjMatrixFromLight = new Matrix4();
    logger.log('viewProjMatrixFromLight.setPerspective(70.0, 1, 1.0, 200.0);', 'grind', 1);
    viewProjMatrixFromLight.setPerspective(70.0, 1, 1.0, 200.0);
    logger.log('viewProjMatrixFromLight.lookAt(0, 7, 2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);', 'grind', 1);
    viewProjMatrixFromLight.lookAt(0, 7, 2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    logger.log('webgl.uniformMatrix4fv(webgl.program.u_MvpMatrix, false, viewProjMatrixFromLight.elements);', 'grind', 1);
    demicm.webgl.uniformMatrix4fv(demicm.webgl.program.u_MvpMatrix, false, viewProjMatrixFromLight.elements);

    logger.log('var viewProjMatrix = new Matrix4();', 'grind', 1);
    var viewProjMatrix = new Matrix4();
    logger.log('viewProjMatrix.setPerspective(45, 2, 1.0, 100.0);', 'grind', 1);
    viewProjMatrix.setPerspective(45, 2, 1.0, 100.0);
    logger.log('viewProjMatrix.lookAt(0.0, 7.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);', 'grind', 1);
    viewProjMatrix.lookAt(0.0, 7.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    logger.log('webgl.uniformMatrix4fv(webgl.program.u_MvpMatrixFromLight, false, viewProjMatrix.elements);', 'grind', 1);
    demicm.webgl.uniformMatrix4fv(demicm.webgl.program.u_MvpMatrixFromLight, false, viewProjMatrix.elements);

    logger.log('vertices = new Float32Array([-0.8, 3.5, 0.0,  0.8, 3.5, 0.0,  0.0, 3.5, 1.8]);', 'grind', 1);
    demicm.vertices = new Float32Array([-0.8, 3.5, 0.0,  0.8, 3.5, 0.0,  0.0, 3.5, 1.8]);
    logger.log('buffer1 = webgl.createBuffer();', 'grind', 1);
    demicm.buffer1 = demicm.webgl.createBuffer();
    logger.log('webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer1);', 'grind', 1);
    demicm.webgl.bindBuffer(demicm.webgl.ARRAY_BUFFER, demicm.buffer1);
    logger.log('webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);', 'grind', 1);
    demicm.webgl.bufferData(demicm.webgl.ARRAY_BUFFER, demicm.vertices, demicm.webgl.STATIC_DRAW);
    logger.log('webgl.vertexAttribPointer(webgl.program.a_Position,  3, webgl.FLOAT, false, 0, 0);', 'grind', 1);
    demicm.webgl.vertexAttribPointer(demicm.webgl.program.a_Position,  3, demicm.webgl.FLOAT, false, 0, 0);
    logger.log('webgl.enableVertexAttribArray(webgl.program.a_Position);', 'grind', 1);
    demicm.webgl.enableVertexAttribArray(demicm.webgl.program.a_Position);

    logger.log('colors = new Float32Array([1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.0, 0.0]);', 'grind', 1);
    demicm.colors = new Float32Array([1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.0, 0.0]);
    logger.log('buffer2 = webgl.createBuffer();', 'grind', 1);
    demicm.buffer2 = demicm.webgl.createBuffer();
    logger.log('webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer2);', 'grind', 1);
    demicm.webgl.bindBuffer(demicm.webgl.ARRAY_BUFFER, demicm.buffer2);
    logger.log('webgl.bufferData(webgl.ARRAY_BUFFER, colors, webgl.STATIC_DRAW);', 'grind', 1);
    demicm.webgl.bufferData(demicm.webgl.ARRAY_BUFFER, demicm.colors, demicm.webgl.STATIC_DRAW);
    logger.log('webgl.vertexAttribPointer(webgl.program.a_Color,  3, webgl.FLOAT, false, 0, 0);', 'grind', 1);
    demicm.webgl.vertexAttribPointer(demicm.webgl.program.a_Color,  3, demicm.webgl.FLOAT, false, 0, 0);
    logger.log('webgl.enableVertexAttribArray(webgl.program.a_Color);', 'grind', 1);
    demicm.webgl.enableVertexAttribArray(demicm.webgl.program.a_Color);

    logger.log('indices = new Uint8Array([0, 1, 2]);', 'grind', 1);
    demicm.indices = new Uint8Array([0, 1, 2]);
    logger.log('buffer3 = webgl.createBuffer();', 'grind', 1);
    demicm.buffer3 = demicm.webgl.createBuffer();
    logger.log('webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, buffer3);', 'grind', 1);
    demicm.webgl.bindBuffer(demicm.webgl.ELEMENT_ARRAY_BUFFER, demicm.buffer3);
    logger.log('webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, indices, webgl.STATIC_DRAW);', 'grind', 1);
    demicm.webgl.bufferData(demicm.webgl.ELEMENT_ARRAY_BUFFER, demicm.indices, demicm.webgl.STATIC_DRAW);

    logger.log('renderbuffer = webgl.createRenderbuffer();', 'grind', 1);
    demicm.renderbuffer = demicm.webgl.createRenderbuffer();

    // Draw
    drawWebgl();
}

function drawWebgl() {
    try {
        switch (rand(2)) {
            case 0:
                logger.log('webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_BYTE, 0);', 'grind', 1);
                demicm.webgl.drawElements(demicm.webgl.TRIANGLES, demicm.indices.length, demicm.webgl.UNSIGNED_BYTE, 0);
                break;
            case 1:
                logger.log('webgl.drawArrays(webgl.TRIANGLES, 0, indices.length);', 'grind', 1);
                demicm.webgl.drawArrays(demicm.webgl.TRIANGLES, 0, demicm.indices.length);
                break;
            default:
                logger.log('// Warning: drawWebgl default', 'grind', 1);
                break;
        }
    } catch (e) {
        logger.log('// Error: drawWebgl: ' + e.message, 'grind', 1);
    }
}

function appendNetwork(rId, rTxt) {
    try {
        // Add WebSocket
        logger.log('id_' + id.length + ' = new WebSocket("ws://127.0.0.1:8082/echo");', 'grind', 1);
        id[id.length] = new WebSocket('ws://127.0.0.1:8082/echo');
        logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
        id[id.length - 1].id = id.length - 1;

        // Add XMLHttpRequest
        logger.log('id_' + id.length + ' = new XMLHttpRequest();', 'grind', 1);
        id[id.length] = new XMLHttpRequest();
        logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
        id[id.length - 1].id = id.length - 1;
        var xhrId = id.length - 1;

        var rType = 'GET';
        var rAsyn = randItem([true, false]);
        logger.log('id_' + xhrId + '.open("' + rType + '", "http://127.0.0.1:8000", ' + rAsyn + ');', 'grind', 1);
        id[xhrId].open(rType, "http://127.0.0.1:8000", rAsyn);
        logger.log('id_' + xhrId + '.send("' + rTxt + '");', 'grind', 1);
        id[xhrId].send(rTxt);

        logger.log('id_' + id.length + ' = ' + 'id_' + xhrId + '.upload;', 'grind', 1);
        id[id.length] = id[xhrId].upload;
        logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
        id[id.length - 1].id = id.length - 1;
    } catch (e) {
        logger.log('// Error: appendNetwork: ' + e.message, 'grind', 1);
    }
}

function appendStyle(rId, rTxt) {
    // Add style
    logger.log('id_' + id.length + ' = document.createElement("style");', 'grind', 1);
    id[id.length] = document.createElement('style');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    var cssList = '';
    var tagList = randItem(demicm.idTags);
    for (var j = 0; j < demicm.idTags.length / 3; j++) {
        tagList += ', ' + randItem(demicm.idTags);
    }
    cssList += tagList + ' ' + randCSSText() + ' ';

    logger.log('id_' + (id.length - 1) + '.innerText = "' + cssList + '";', 'grind', 1);
    id[id.length - 1].innerText = cssList;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);
}

function appendTable(rId, rTxt) {
    // Add table
    logger.log('id_' + id.length + ' = document.createElement("table");', 'grind', 1);
    id[id.length] = document.createElement('table');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var tabId = id.length - 1;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Add caption
    logger.log('id_' + id.length + ' = document.createElement("caption");', 'grind', 1);
    id[id.length] = document.createElement('caption');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[tabId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add colgroup
    logger.log('id_' + id.length + ' = document.createElement("colgroup");', 'grind', 1);
    id[id.length] = document.createElement('colgroup');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var colgId = id.length - 1;

    logger.log('id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[tabId].appendChild(id[id.length - 1]);

    // Add col
    logger.log('id_' + id.length + ' = document.createElement("col");', 'grind', 1);
    id[id.length] = document.createElement('col');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.span = "2";', 'grind', 1);
    id[id.length - 1].span = '2';

    logger.log('id_' + colgId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[colgId].appendChild(id[id.length - 1]);

    // Add col with no id
    logger.log('id_' + colgId + '.appendChild(document.createElement("col"));', 'grind', 1);
    id[colgId].appendChild(document.createElement('col'));
    logger.log('id_' + colgId + '.appendChild(document.createElement("col"));', 'grind', 1);
    id[colgId].appendChild(document.createElement('col'));

    // Add thead
    logger.log('id_' + id.length + ' = document.createElement("thead");', 'grind', 1);
    id[id.length] = document.createElement('thead');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var theadId = id.length - 1;

    logger.log('id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    logger.log('id_' + id.length + ' = document.createElement("tr");', 'grind', 1);
    id[id.length] = document.createElement('tr');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    logger.log('id_' + theadId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[theadId].appendChild(id[id.length - 1]);

    // Add th
    logger.log('id_' + id.length + ' = document.createElement("th");', 'grind', 1);
    id[id.length] = document.createElement('th');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + trId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[trId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add th with no id
    logger.log('id_' + trId + '.appendChild(document.createElement("th"));', 'grind', 1);
    id[trId].appendChild(document.createElement('th'));
    logger.log('id_' + trId + '.appendChild(document.createElement("th"));', 'grind', 1);
    id[trId].appendChild(document.createElement('th'));

    // Add tfoot
    logger.log('id_' + id.length + ' = document.createElement("tfoot");', 'grind', 1);
    id[id.length] = document.createElement('tfoot');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var tfootId = id.length - 1;

    logger.log('id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    logger.log('id_' + id.length + ' = document.createElement("tr");', 'grind', 1);
    id[id.length] = document.createElement('tr');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    logger.log('id_' + tfootId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[tfootId].appendChild(id[id.length - 1]);

    // Add td
    logger.log('id_' + id.length + ' = document.createElement("td");', 'grind', 1);
    id[id.length] = document.createElement('td');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + trId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[trId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add td with no id
    logger.log('id_' + trId + '.appendChild(document.createElement("td"));', 'grind', 1);
    id[trId].appendChild(document.createElement('td'));
    logger.log('id_' + trId + '.appendChild(document.createElement("td"));', 'grind', 1);
    id[trId].appendChild(document.createElement('td'));

    // Add tbody
    logger.log('id_' + id.length + ' = document.createElement("tbody");', 'grind', 1);
    id[id.length] = document.createElement('tbody');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var tbodyId = id.length - 1;

    logger.log('id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    logger.log('id_' + id.length + ' = document.createElement("tr");', 'grind', 1);
    id[id.length] = document.createElement('tr');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    logger.log('id_' + tbodyId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[tbodyId].appendChild(id[id.length - 1]);

    // Add td
    logger.log('id_' + id.length + ' = document.createElement("td");', 'grind', 1);
    id[id.length] = document.createElement('td');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;

    logger.log('id_' + trId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[trId].appendChild(id[id.length - 1]);
    logger.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));', 'grind', 1);
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add td with no id
    logger.log('id_' + trId + '.appendChild(document.createElement("td"));', 'grind', 1);
    id[trId].appendChild(document.createElement('td'));
    logger.log('id_' + trId + '.appendChild(document.createElement("td"));', 'grind', 1);
    id[trId].appendChild(document.createElement('td'));
}

function appendMap(rId, rTxt) {
    // Add map
    logger.log('id_' + id.length + ' = document.createElement("map");', 'grind', 1);
    id[id.length] = document.createElement('map');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.name = "fuzzMap";', 'grind', 1);
    id[id.length - 1].name = 'fuzzMap';
    var mapId = id.length - 1;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Add area
    logger.log('id_' + id.length + ' = document.createElement("area");', 'grind', 1);
    id[id.length] = document.createElement('area');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.href = "demicmFuzz.html";', 'grind', 1);
    id[id.length - 1].href = 'demicmFuzz.html';

    logger.log('id_' + mapId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[mapId].appendChild(id[id.length - 1]);

    // Add area with no id
    logger.log('id_' + mapId + '.appendChild(document.createElement("area"));', 'grind', 1);
    id[mapId].appendChild(document.createElement('area'));
    logger.log('id_' + mapId + '.appendChild(document.createElement("area"));', 'grind', 1);
    id[mapId].appendChild(document.createElement('area'));

    // Add img
    logger.log('id_' + id.length + ' = document.createElement("img");', 'grind', 1);
    id[id.length] = document.createElement('img');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.src = "demicmImg.gif";', 'grind', 1);
    id[id.length - 1].src = 'demicmImg.gif';
    logger.log('id_' + (id.length - 1) + '.useMap = "#fuzzMap";', 'grind', 1);
    id[id.length - 1].useMap = '#fuzzMap';

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);
}

function appendAudio(rId, rTxt) {
    // Add audio
    logger.log('id_' + id.length + ' = document.createElement("audio");', 'grind', 1);
    id[id.length] = document.createElement('audio');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var audioId = id.length - 1;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Add source
    logger.log('id_' + id.length + ' = document.createElement("source");', 'grind', 1);
    id[id.length] = document.createElement('source');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.src = "demicmAudio.mp3";', 'grind', 1);
    id[id.length - 1].src = 'demicmAudio.mp3';
    logger.log('id_' + (id.length - 1) + '.type = "audio/mp3";', 'grind', 1);
    id[id.length - 1].type = 'audio/mp3';

    logger.log('id_' + audioId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[audioId].appendChild(id[id.length - 1]);
}

function appendVideo(rId, rTxt) {
    // Add video
    logger.log('id_' + id.length + ' = document.createElement("video");', 'grind', 1);
    id[id.length] = document.createElement('video');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.width = "320";', 'grind', 1);
    id[id.length - 1].width = '320';
    logger.log('id_' + (id.length - 1) + '.height = "240";', 'grind', 1);
    id[id.length - 1].height = '240';
    var videoId = id.length - 1;

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Add source
    logger.log('id_' + id.length + ' = document.createElement("source");', 'grind', 1);
    id[id.length] = document.createElement('source');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.src = "demicmVideo.mp4";', 'grind', 1);
    id[id.length - 1].src = 'demicmVideo.mp4';
    logger.log('id_' + (id.length - 1) + '.type = "video/mp4";', 'grind', 1);
    id[id.length - 1].type = 'video/mp4';

    logger.log('id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[videoId].appendChild(id[id.length - 1]);

    // Add track
    logger.log('id_' + id.length + ' = document.createElement("track");', 'grind', 1);
    id[id.length] = document.createElement('track');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.src = "demicmTrack.vtt";', 'grind', 1);
    id[id.length - 1].src = 'demicmTrack.vtt';
    logger.log('id_' + (id.length - 1) + '.kind = "sub";', 'grind', 1);
    id[id.length - 1].kind = 'sub';
    logger.log('id_' + (id.length - 1) + '.srclang = "en";', 'grind', 1);
    id[id.length - 1].srclang = 'en';
    logger.log('id_' + (id.length - 1) + '.label = "English";', 'grind', 1);
    id[id.length - 1].label = 'English';

    logger.log('id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[videoId].appendChild(id[id.length - 1]);

    // Add object
    logger.log('id_' + id.length + ' = document.createElement("object");', 'grind', 1);
    id[id.length] = document.createElement('object');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.data = "demicmVideo.mp4";', 'grind', 1);
    id[id.length - 1].data = 'demicmVideo.mp4';
    logger.log('id_' + (id.length - 1) + '.width = "320";', 'grind', 1);
    id[id.length - 1].width = '320';
    logger.log('id_' + (id.length - 1) + '.height = "240";', 'grind', 1);
    id[id.length - 1].height = '240';
    var objectId = id.length - 1;

    logger.log('id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[videoId].appendChild(id[id.length - 1]);

    // Add embed
    logger.log('id_' + id.length + ' = document.createElement("embed");', 'grind', 1);
    id[id.length] = document.createElement('embed');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.src = "demicmData.swf";', 'grind', 1);
    id[id.length - 1].src = 'demicmData.swf';
    logger.log('id_' + (id.length - 1) + '.width = "320";', 'grind', 1);
    id[id.length - 1].width = '320';
    logger.log('id_' + (id.length - 1) + '.height = "240";', 'grind', 1);
    id[id.length - 1].height = '240';

    logger.log('id_' + objectId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[objectId].appendChild(id[id.length - 1]);
}

function appendWorker() {
    // Add worker
    logger.log('id_' + id.length + ' = new Worker("demicmWorker.js");', 'grind', 1);
    id[id.length] = new Worker('demicmWorker.js');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var workerId = id.length - 1;

    // Add onmessage event
    var rClearId = randId();
    var rClearDOMId = randId(true, false, true);
    logger.log('id_' + workerId + '.onmessage = function () {try {id_' + rClearDOMId 
        + '.outerHTML = arguments[0].data;id_' + rClearId + '.outerText = arguments[0].data; } catch (e) {}};', 'grind', 1);
    id[workerId].onmessage = function () { 
        try {
            id[rClearDOMId].outerHTML = arguments[0].data; 
            id[rClearId].outerText = arguments[0].data; 
        } catch (e) {}
    };

    // Post message
    logger.log('id_' + workerId + '.postMessage("ping");', 'grind', 1);
    id[workerId].postMessage('ping'); 
}

function appendSharedWorker() {
    // Add shared worker
    logger.log('id_' + id.length + ' = new SharedWorker("demicmSharedWorker.js");', 'grind', 1);
    id[id.length] = new SharedWorker('demicmSharedWorker.js');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    var workerId = id.length - 1;

    // Add onmessage event
    var rClearId = randId();
    var rClearDOMId = randId(true, false, true);
    logger.log('id_' + workerId + '.port.onmessage = function () {try {id_' + rClearDOMId 
        + '.outerHTML = arguments[0].data;id_' + rClearId + '.outerText = arguments[0].data; } catch (e) {}};', 'grind', 1);
    id[workerId].port.onmessage = function () { 
        try {
            id[rClearDOMId].outerHTML = arguments[0].data; 
            id[rClearId].outerText = arguments[0].data; 
        } catch (e) {}
    };

    // Post message
    logger.log('id_' + workerId + '.port.postMessage("ping");', 'grind', 1);
    id[workerId].port.postMessage('ping'); 
}

function appendSvg(rId, rTxt) {
    // Add embed svg
    logger.log('id_' + id.length + ' = document.createElement("embed");', 'grind', 1);
    id[id.length] = document.createElement('embed');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.src = "demicmSvg.svg";', 'grind', 1);
    id[id.length - 1].src = 'demicmSvg.svg';
    logger.log('id_' + (id.length - 1) + '.type = "image/svg+xml";', 'grind', 1);
    id[id.length - 1].type = 'image/svg+xml';
    logger.log('id_' + (id.length - 1) + '.width = "320";', 'grind', 1);
    id[id.length - 1].width = '320';
    logger.log('id_' + (id.length - 1) + '.height = "240";', 'grind', 1);
    id[id.length - 1].height = '240';

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);

    // Add img svg
    logger.log('id_' + id.length + ' = document.createElement("img");', 'grind', 1);
    id[id.length] = document.createElement('img');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.src = "demicmSvg.svg";', 'grind', 1);
    id[id.length - 1].src = 'demicmSvg.svg';
    logger.log('id_' + (id.length - 1) + '.type = "image/svg+xml";', 'grind', 1);
    id[id.length - 1].type = 'image/svg+xml';
    logger.log('id_' + (id.length - 1) + '.width = "320";', 'grind', 1);
    id[id.length - 1].width = '320';
    logger.log('id_' + (id.length - 1) + '.height = "240";', 'grind', 1);
    id[id.length - 1].height = '240';

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);
}

function appendXml(rId, rTxt) {
    // Add xml
    logger.log('id_' + id.length + ' = document.createElement("embed");', 'grind', 1);
    id[id.length] = document.createElement('embed');
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
    logger.log('id_' + (id.length - 1) + '.src = "demicmXml.xml";', 'grind', 1);
    id[id.length - 1].src = 'demicmXml.xml';
    logger.log('id_' + (id.length - 1) + '.type = "text/xml";', 'grind', 1);
    id[id.length - 1].type = 'text/xml';
    logger.log('id_' + (id.length - 1) + '.width = "320";', 'grind', 1);
    id[id.length - 1].width = '320';
    logger.log('id_' + (id.length - 1) + '.height = "240";', 'grind', 1);
    id[id.length - 1].height = '240';

    logger.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');', 'grind', 1);
    id[rId].appendChild(id[id.length - 1]);
}

function appendSpecElem() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] appendSpecElem()', 'grind', 1);
    }

    var rId = randId(true, false, true);
    var rTxt = randAlpha(10);
    switch (rand(5)) {
        case 0:
            appendForm(rId, rTxt);
            break;
        case 1:
            appendTable(rId, rTxt);
            break;
        case 2:
            appendMap(rId, rTxt);
            appendList(rId, rTxt);
            break;
        case 3:
            appendAudio(rId, rTxt);
            appendVideo(rId, rTxt);
            break;
        case 4:
            appendSvg(rId, rTxt);
            appendXml(rId, rTxt);
            break;
        default:
            logger.log('// Warning: appendSpecElem default', 'grind', 1);
            break;
    }

    appendStyle(rId, rTxt);

    if(percent(demicm.ADD_NETWORK)) {
        var rId = randId(true, false, true);
        appendNetwork(rId, rTxt);
    }

    if(percent(demicm.ADD_WEBGL_PER)) {
        var rId = randId(true, false, true);
        try {
            appendWebGL(rId, rTxt);
        } catch(e) {
            logger.log('// WebGL Crash: ' + e.message, 'grind', 1);
            demicm.WEBGL_PER = 0;
        }
    } else {
        demicm.WEBGL_PER = 0;
    }

    if(percent(demicm.ADD_CANVAS2D_PER)) {
        var rId = randId(true, false, true);
        appendCanvas2D(rId, rTxt);
    } else {
        demicm.CANVAS2D_PER = 0;
    }
}

function constructHtml(tagNum, type) {
    var htmlStr = "";
    var tagEnds = [];
    var incStep = (100 - demicm.TAG_ORDER_PER) / tagNum;
    var increment = 0;

    for (var i = 0; i < tagNum; i++) {
        var rTag = randItem(demicm.strictTags);
        if (!inArr(demicm.idTags, rTag)) {
            demicm.idTags.push(rTag);
        }

        var tagBeginStr = constructTag(rTag, demicm.TAG_PROP_NUM, type);
        htmlStr += tagBeginStr;

        var tagEndStr = '</' + rTag + '>';
        if (tagEndStr != '</script>') {
            tagEnds.push(tagEndStr);
        }

        if (percent(demicm.TAG_ORDER_PER + increment) && tagEnds.length > 0) {
            var rTagEnd = randItem(tagEnds);
            removeArrVal(tagEnds, rTagEnd);

            htmlStr += rTagEnd;
        }

        increment += incStep;
    }

    while (tagEnds.length > 0) {
        var rTagEnd = randItem(tagEnds);
        removeArrVal(tagEnds, rTagEnd);

        htmlStr += rTagEnd;
    }

    return htmlStr;
}

function constructTag(rTag, tagPropNum, type) {
    logger.log('var rElem = document.createElement("' + rTag + '");', 'grind', 1);
    var rElem = document.createElement(rTag);
    var tagStr = '<' + rTag + ' ';

    if (percent(demicm.REF_TAG_PER)) {
        tagStr += 'id=' + id.length + ' ';
        if (type == 'body') {
            demicm.bodyIds.push(id.length);
        } else if (type == 'head') {
            demicm.headIds.push(id.length);
        } else {
            logger.log('// Warning: constructTag else', 'grind', 1);
        }
        id[id.length] = null;
    }

    for (var i = 0; i < tagPropNum; i++) {
        var cnt = 0;
        do {
            var prop = randPropf(rTag, rElem, 'prop');
            cnt++;
        } while (typeof rElem[prop] == 'object' && cnt < demicm.MAX_LOOP)

        if (cnt == demicm.MAX_LOOP) {
            continue;
        }

        var bNormalProp = prop in demicm.propDic;

        // Set dirty value
        if (bNormalProp && percent(demicm.PROP_DIRTY_PER) && demicm.propDic[prop].dirtyVal.length != 0) {
            var rVal = randItem(demicm.propDic[prop].dirtyVal);
            // Set normal value
        } else if (bNormalProp && demicm.propDic[prop].normalVal.length != 0) {
            if (inArr(demicm.specialProps, prop) && getTagName(rElem) != 'none') {
                var rVal = randItem(demicm[prop][getTagName(rElem)]);
                if (rVal == null) {
                    rVal = randItem(demicm.propDic[prop].normalVal);
                }
            } else {
                var rVal = randItem(demicm.propDic[prop].normalVal);
            }
            // Set random value
        } else {
            var randValTable = {};
            randPropfVal(0, 0, 'prop', randValTable);
            var rVal = bNormalProp ? randValTable[demicm.propDic[prop].type] : randValTable[typeof rElem[prop]];

            if (rVal == undefined) {
                continue;
            }
        }

        if (typeof rVal == 'string') {
            rVal = '"' + rVal + '"';
        }
        tagStr += prop + '=' + rVal + ' ';
    }

    tagStr += '>';
    return tagStr;
}

function constructBaseTree() {
    var totalRat = demicm.BODY_RATIO + demicm.HEAD_RATIO + demicm.HTML_RATIO + demicm.DANGLE_RATIO; 
    var noRefIds = [];

    for (var i = 0; i < demicm.INI_ELEM_NUM; i++) {
        var rTag = randItem(demicm.strictTags);
        if (!inArr(demicm.idTags, rTag)) {
            demicm.idTags.push(rTag);
        }

        var insId = id.length;
        logger.log('id_' + insId + ' = document.createElement("' + rTag + '");', 'grind', 1);
        id[insId] = document.createElement(rTag);

        if (!percent(demicm.REF_ELEM_PER)) {
            noRefIds.push(insId);
        } else {
            logger.log('id_' + insId + '.id = ' + insId + ';', 'grind', 1);
            id[insId].id = insId;
        }

        // Get random parentNode id
        var rRat = rand(totalRat);
        if ((rRat -= demicm.BODY_RATIO) < 0) {
            // Body elems
            var rId = randItem(demicm.bodyIds);
            demicm.bodyIds.push(insId);
        } else if ((rRat -= demicm.HEAD_RATIO) < 0) {
            // Head elems
            var rId = randItem(demicm.headIds);
            demicm.headIds.push(insId);
        } else if ((rRat -= demicm.HTML_RATIO) < 0) {
            // HTML elems
            var rId = randItem(demicm.htmlIds);
            demicm.htmlIds.push(insId);
        } else {
            // Dangling elems
            var rId = randItem(demicm.dangleIds);
            demicm.dangleIds.push(insId);
            if (rId == null) {
                continue;
            }
        }

        if (id[rId]) {
            logger.log('id_' + rId + '.appendChild(id_' + insId + ');', 'grind', 1);
            id[rId].appendChild(id[insId]);
        }
    }

    for (var i = 0; i < noRefIds.length; i++) {
        logger.log('id_' + noRefIds[i] + ' = null;', 'grind', 1);
        id[noRefIds[i]] = null;
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

    demicm.htmlIds = [0];
    demicm.headIds = [1];
    demicm.bodyIds = [2];
    demicm.dangleIds = [];

    // |-----body-ratio-----|---head-ratio---|
    var headTagNum = 0;
    var bodyTagNum = 0;
    var totalRat = demicm.BODY_RATIO + demicm.HEAD_RATIO; 
    for (var i = 0; i < demicm.INI_TAG_NUM; i++) {
        var rRat = rand(totalRat);
        if ((rRat -= demicm.BODY_RATIO) < 0) {
            bodyTagNum++;
        } else {
            headTagNum++;
        }
    }

    var bodyTagStr = constructHtml(bodyTagNum, 'body');
    var headTagStr = constructHtml(headTagNum, 'head');

    logger.log('document.body.innerHTML = "' + bodyTagStr.replace(/"/g, '\\"') + '";', 'grind', 1);
    document.body.innerHTML = bodyTagStr;

    logger.log('document.head.innerHTML = "' + headTagStr.replace(/"/g, '\\"') + '";', 'grind', 1);
    document.head.innerHTML = headTagStr;

    for (var i = 3; i < id.length; i++) {
        logger.log('id_' + i + ' = document.getElementById(' + i + ');', 'grind', 1);
        id[i] = document.getElementById(i);
    }

    constructBaseTree();

    appendSpecElem();
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

        var rId = randId(true);
        if (rId == 'none') {
            return;
        }
        logger.log('id_' + rId + '.setAttributeNode(id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ');', 'grind', 1);
        id[rId].setAttributeNode(idS[demicm.attrId]);

        logger.log('id_' + (demicm.nodeMapId + demicm.SPEC_OFFSET) + ' = id_' + rId + '.attributes;', 'grind', 1);
        idS[demicm.nodeMapId] = id[rId].attributes;
    } catch (e) {
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

        setAttr();
    } catch (e) {
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

        logger.log('// for (var p in ' + logObjStr + ') { ' + logObjStr + '[p]; }', 'grind', 1);
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

                if (percent(demicm.PROP_REC_PER)) {
                    propStack.push(p);
                    propfMan(propStack, recDepth - 1, retValDepth, 'prop', objType);
                    recWide++;
                }
                if (percent(demicm.FUNC_REC_PER)) {
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
            logger.log('// Warning: propfMan else', 'grind', 1);
        }
    } catch (e) {
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
            && !inArr(demicm.tagRBlackList, tagR)
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
    } catch (e) {
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
            // Get func params
            if (inArr(demicm.specialFuncs, func) && getTagName(fuzzObj) != 'none') {
                //var params = demicm.specialFuncs[getTagName(fuzzObj)];
            } else {
                var params = demicm.funcDic[func];
            }

            for (var i = 1; i < params.length; i++) {
                if (percent(demicm.FUNC_DIRTY_PER) && params[i].dirtyVal.length != 0) {
                    // Set dirty value
                    var rVal = randItem(params[i].dirtyVal);
                    paramStr += logRevise(rIds[i], rIdRs[i], 'param', rVal, 'node') + ',';
                    paramLogStr += logRevise(rIds[i], rIdRs[i], 'func', rVal, 'node') + ',';
                } else if (percent(demicm.FUNC_NORMAL_PER) && params[i].normalVal.length != 0) {
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
            && !inArr(demicm.tagRBlackList, tagR)
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
    } catch (e) {
        logger.log('// Error: funcMan: ' + e.message, 'grind', 1);
    }
}

function styleMan(rId) {
    try {
        var rStyle = randStyle();
        var rStyleVal = randStyleVal(rStyle);

        // Only element has style
        if (id[rId] && id[rId].nodeType == 1) {
            logger.log('id_' + rId + '.style["' + rStyle + '"] = "' + rStyleVal + '";', 'grind', 1);
            id[rId].style[rStyle] = rStyleVal;
        }
    } catch (e) {
        logger.log('// Error: styleMan: ' + e.message, 'grind', 1);
    }
}

function layout() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] layout()', 'grind', 1);
    }

    try {
        for (var i = 0; i < 3; i++) {
            var rId = randId(true, false, true);
            if (rId == 'none') {
                return;
            }

            logger.log('id_' + rId + '.offsetParent;', 'grind', 1);
            id[rId].offsetParent;
        }
    } catch (e) {
        logger.log('// Error: layout: ' + e.message, 'grind', 1);
    }
}

function clearSub() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] clearSub()', 'grind', 1);
    }

    try {
        var rId = randId(true, true);
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
                logger.log('// Warning: clearSub default', 'grind', 1);
                break;
        }

        logger.log('gc();', 'grind', 1);
        gc();
    } catch (e) {
        logger.log('// Error: clearSub: ' + e.message, 'grind', 1);
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

        if (demicm.BROWSER == 'IE' || demicm.BROWSER == 'FF') {
            var per = percent(40);
        } else {
            var per = percent(60);
        }
        if (per) {
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
    } catch (e) {
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
    } catch (e) {
        logger.log('// Error: DOMMan: ' + e.message, 'grind', 1);
    }
}

function winMan() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] winMan()', 'grind', 1);
    }

    try {
        propfMan([demicm.winId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.winId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        logger.log('// Error: winMan: ' + e.message, 'grind', 1);
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
    } catch (e) {
        logger.log('// Error: attrMan: ' + e.message, 'grind', 1);
    }
}

function canvas2dMan() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] canvas2dMan()', 'grind', 1);
    }

    try {
        propfMan([demicm.canvas2dId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.canvas2dId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        logger.log('// Error: canvas2dMan: ' + e.message, 'grind', 1);
    }
}

function webglMan() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] webglMan()', 'grind', 1);
    }

    try {
        if (percent(20)) {
            propfMan([demicm.webglId], 1, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }

        propfMan([demicm.webglId], 1, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        logger.log('// Error: webglMan: ' + e.message, 'grind', 1);
    }

    if (percent(demicm.DRAW_WEBGL_PER)) {
        drawWebgl();
    }
}

function fireEvent() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] fireEvent()', 'grind', 1);
    }

    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }

        // params: rId?s[1-n], suppose 10 params is enough
        var rIds = [];
        randIds(rIds, 10);
        if (rIds[0] == 'none') {
            rIds = [2,2,2,2,2,2,2,2,2,2];
        }

        var evtName = randItem(demicm.events);
        var evtFunc = demicm.eventDic[evtName].func;
        var evtParams = demicm.eventDic[evtName].param;
        var rEvtType = randItem(demicm.eventDic[evtName].type);

        logger.log('var evt = document.createEvent("' + evtName + '");', 'grind', 1);
        var evt = document.createEvent(evtName);  

        var evtParam = '';
        var logParam = '';
        for (var i = 0; i < evtParams.length; i++) {
            if (evtParams[i] == 'bool') {
                var rBool = randItem(demicm.bool)
                    logParam += rBool;
                evtParam += rBool;
            } else if (evtParams[i] == 'long') {
                var rLong = randItem(demicm.num);
                logParam += rLong;
                evtParam += rLong;
            } else if (evtParams[i] == 'short') {
                var rShort = randItem(demicm.smallNum)
                    logParam += rShort;
                evtParam += rShort;
            } else if (evtParams[i] == 'string') {
                var rStr = randItem(demicm.dirtyStr)
                    logParam += '"' + rStr + '"';
                evtParam += '"' + rStr + '"';
            } else if (evtParams[i] == 'view') {
                if (demicm.multiType == 0) {
                    // Append window
                    var rView = randItem(['window', 'document.defaultView', 'idS[' + demicm.openId + ']']);
                } else {
                    var rView = randItem(['window', 'document.defaultView']);
                }

                if (rView == 'idS[' + demicm.openId + ']') {
                    logParam += 'id_' + (demicm.openId + demicm.SPEC_OFFSET);
                } else {
                    logParam += rView;
                }
                evtParam += rView;
            } else if (evtParams[i] == 'target') {
                logParam += 'id_' + rIds[0];
                evtParam += 'id[' + rIds[0] + ']';
            } else {
                logger.log('// Warning: fireEvent else ' + evtParams[i], 'grind', 1);
            }

            logParam += ',';
            evtParam += ',';
        }

        // trim paramStr
        if (evtParam != '') {
            logParam = logParam.substr(0, logParam.length - 1);
            evtParam = evtParam.substr(0, evtParam.length - 1);
        }

        logger.log('evt.' + evtFunc + '("' + rEvtType + '",' + logParam + ');', 'grind', 1);
        eval('evt.' + evtFunc + '("' + rEvtType + '",' + evtParam + ');');

        if (document.activeElement && percent(30)) {
            logger.log('document.activeElement.dispatchEvent(evt);', 'grind', 1);
            document.activeElement.dispatchEvent(evt);
        } else {
            logger.log('id_' + rId + '.dispatchEvent(evt);', 'grind', 1);
            id[rId].dispatchEvent(evt);
        }
    } catch (e) {
        logger.log('// Error: fireEvent: ' + e.message, 'grind', 1);
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

    if (demicm.IS_FUZZ_GROUP) {
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
            if (id[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'prop', 'node');
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'func', 'node');
                styleMan(i);
            }
        }

        relayout();

        clearAll();
    } catch (e) {
        logger.log('// Error: reuseElem: ' + e.message, 'grind', 1);
    }
}

function reuseRetElem() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] reuseRetElem()', 'grind', 1);
    }

    try {
        for (var i = 0; i < idR.length; i++) {
            if (idR[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'prop', 'ret');
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'func', 'ret');

                logger.log('id_' + (i + demicm.RET_OFFSET) + ' = null;', 'grind', 1);
                idR[i] = null;
            }
        }

        logger.log('gc();', 'grind', 1);
        gc();
    } catch (e) {
        logger.log('// Error: reuseRetElem: ' + e.message, 'grind', 1);
    }
}

function reuseSpec() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] reuseSpec()', 'grind', 1);
    }

    try {
        for (var i = 0; i < idS.length; i++) {
            if (idS[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'prop', 'spec');
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'func', 'spec');

                if (i != demicm.openId) {
                    logger.log('id_' + (i + demicm.SPEC_OFFSET) + ' = null;', 'grind', 1);
                    idS[i] = null;
                }
            }
        }

        logger.log('gc();', 'grind', 1);
        gc();
    } catch (e) {
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
    } catch (e) {
        logger.log('// Error: relayout: ' + e.message, 'grind', 1);
    }
}

/************************************* outline *************************************/
function operate(count) {
    for (var i = 0; i < count; i++) {
        normalOperate();
        specialOperate();
    }
}

function normalOperate() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] normalOperate()', 'grind', 1);
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
        clearSub();
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

    if (percent(demicm.WEBGL_PER)) {
        webglMan();
    }

    if (percent(demicm.CANVAS2D_PER)) {
        canvas2dMan();
    }

    if (percent(demicm.FIRE_EVENT_PER)) {
        fireEvent();
    }

    if (demicm.IS_FUZZ_GROUP) {
        groupMan();
    }

    if (demicm.IS_FUZZ_MULTI) {
        if (percent(demicm.MULTI_MAN_PER)) {
            multiMan();
        }

        if (percent(demicm.MULTI_CLEAR_PER)) {
            multiClear();
        }
    }
}

function multiClear() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] multiClear()', 'grind', 1);
    }

    try {
        switch (demicm.multiType) {
            case 0:
                var wId = demicm.openId;
                break;
            case 1:
                var fId = demicm.ifrId;
                break;
            case 2:
                var fId = demicm.frId;
                break;
            default:
                logger.log('// Warning: multiClear default', 'grind', 1);
                break;
        }

        switch (rand(2)) {
            case 0:
                if (demicm.multiType == 0) {
                    logger.log('id_' + (wId + demicm.SPEC_OFFSET) + '.document.body.outerHTML = "";', 'grind', 1);
                    idS[wId].document.body.outerHTML = '';
                } else {
                    logger.log('id_' + (fId + demicm.SPEC_OFFSET) + '.contentDocument.body.outerText = "";', 'grind', 1);
                    idS[fId].contentDocument.body.outerText = '';
                }
                break;
            case 1:
                if (demicm.multiType == 0) {
                    logger.log('id_' + (wId + demicm.SPEC_OFFSET) + '.document.write("");', 'grind', 1);
                    idS[wId].document.write('');
                } else {
                    logger.log('id_' + (fId + demicm.SPEC_OFFSET) + '.contentDocument.write("");', 'grind', 1);
                    idS[fId].contentDocument.write('');
                }
                break;
            default:
                logger.log('// Warning: multiClear default', 'grind', 1);
                break;
        }

    } catch (e) {
        logger.log('// Error: multiClear: ' + e.message, 'grind', 1);
    }
}

function multiMan() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] multiMan()', 'grind', 1);
    }

    try {
        var count = 0;
        do {
            switch (rand(4)) {
                case 0:
                    var fId = demicm.openId;
                    break;
                case 1:
                    var fId = demicm.ifrId;
                    break;
                case 2:
                    var fId = demicm.frsId;
                    break;
                case 3:
                    var fId = demicm.frId;
                    break;
                default:
                    logger.log('// Warning: multiMan default', 'grind', 1);
                    break;
            }
        } while (!idS[fId] && count++ < demicm.MAX_ITR)

        if (percent(50)) {  
            propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
        logger.log('// Error: multiMan: ' + e.message, 'grind', 1);
    }
}

function specObjMan() {
    if (percent(demicm.WIN_PER)) {
        winMan();
    }

    if (percent(demicm.ATTR_PER)) {
        attrMan();
    }
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

function appendWindow(rId) {
    if (demicm.BROWSER == 'IE') {
        logger.log('id_' + (demicm.openId + demicm.SPEC_OFFSET) + ' = window.open("demicmTargetIE.html");', 'grind', 1);
        idS[demicm.openId] = window.open('demicmTargetIE.html');
    } else {
        logger.log('id_' + (demicm.openId + demicm.SPEC_OFFSET) + ' = window.open("demicmTarget.html");', 'grind', 1);
        idS[demicm.openId] = window.open('demicmTarget.html');
    }
}

function appendIframe(rId) {
    logger.log('id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + ' = document.createElement("iframe");', 'grind', 1);
    idS[demicm.ifrId] = document.createElement('iframe');
    if (demicm.BROWSER == 'IE') {
        logger.log('id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.src = "demicmFrameIE.html";', 'grind', 1);
        idS[demicm.ifrId].src = 'demicmFrameIE.html';
    } else {
        logger.log('id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.src = "demicmFrame.html";', 'grind', 1);
        idS[demicm.ifrId].src = 'demicmFrame.html';
    }

    logger.log('id_' + rId + '.appendChild(id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + ');', 'grind', 1);
    id[rId].appendChild(idS[demicm.ifrId]);
}

function appendFrame(rId) {
    // Add frame set
    logger.log('id_' + (demicm.frsId + demicm.SPEC_OFFSET) + ' = document.createElement("frameset");', 'grind', 1);
    idS[demicm.frsId] = document.createElement('frameset');
    logger.log('id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.cols = "15%, 10%, 5%";', 'grind', 1);
    idS[demicm.frsId].cols = '15%, 10%, 5%';

    logger.log('id_' + rId + '.appendChild(id_' + (demicm.frsId + demicm.SPEC_OFFSET) + ');', 'grind', 1);
    id[rId].appendChild(idS[demicm.frsId]);

    // Add frame
    logger.log('id_' + (demicm.frId + demicm.SPEC_OFFSET) + ' = document.createElement("frame");', 'grind', 1);
    idS[demicm.frId] = document.createElement('frame');
    if (demicm.BROWSER == 'IE') {
        logger.log('id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.src = "demicmFrameIE.html";', 'grind', 1);
        idS[demicm.frId].src = 'demicmFrameIE.html';
    } else {
        logger.log('id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.src = "demicmFrame.html";', 'grind', 1);
        idS[demicm.frId].src = 'demicmFrame.html';
    }

    logger.log('id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(id_' + (demicm.frId + demicm.SPEC_OFFSET) + ');', 'grind', 1);
    idS[demicm.frsId].appendChild(idS[demicm.frId]);

    // Add frame with no id
    logger.log('id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(document.createElement("frame"));', 'grind', 1);
    idS[demicm.frsId].appendChild(document.createElement('frame'));
    logger.log('id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(document.createElement("frame"));', 'grind', 1);
    idS[demicm.frsId].appendChild(document.createElement('frame'));
}

function constructMulti() {
    try {
        var rId = randId(true, false, true);
        if (demicm.BROWSER == 'IE' || demicm.BROWSER == 'FF') {
            // Not fuzz open window
            demicm.multiType = rand(2) + 1;
        } else {
            demicm.multiType = rand(3);
        }

        switch (demicm.multiType) {
            case 0:
                appendWindow(rId);
                break;
            case 1:
                appendIframe(rId);
                break;
            case 2:
                appendFrame(rId);
                break;
            default:
                logger.log('// Warning: constructMulti default', 'grind', 1);
                break;
        }
    } catch (e) {
        logger.log('// Error: constructMulti: ' + e.message, 'grind', 1);
    }
}

function getWindow() {
    var rDocId = rand(idS[demicm.openId].document.all.length);

    logger.log('id_' + id.length + ' = id_' + (demicm.openId + demicm.SPEC_OFFSET) + '.document.all[' + rDocId + '];', 'grind', 1);
    id[id.length] = idS[demicm.openId].document.all[rDocId];
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
}

function getIframe() {
    var rDocId = rand(idS[demicm.ifrId].contentDocument.all.length);

    logger.log('id_' + id.length + ' = id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.contentDocument.all[' + rDocId + '];', 'grind', 1);
    id[id.length] = idS[demicm.ifrId].contentDocument.all[rDocId];
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
}

function getFrame() {
    var rDocId = rand(idS[demicm.frId].contentDocument.all.length);

    logger.log('id_' + id.length + ' = id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.contentDocument.all[' + rDocId + '];', 'grind', 1);
    id[id.length] = idS[demicm.frId].contentDocument.all[rDocId];
    logger.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';', 'grind', 1);
    id[id.length - 1].id = id.length - 1;
}

function getMultiElems(elemCnt) {
    if (demicm.IS_DEBUG) {
        logger.log('[+] getMultiElems()', 'grind', 1);
    }

    try {
        for (var i = 0; i < elemCnt; i++) {
            switch (demicm.multiType) {
                case 0:
                    getWindow();
                    break;
                case 1:
                    getIframe();
                    break;
                case 2:
                    getFrame();
                    break;
                default:
                    logger.log('// Warning: getMultiElems default', 'grind', 1);
                    break;
            }
        }
    } catch (e) {
        logger.log('// Error: getMultiElems: ' + e.message, 'grind', 1);
    }
}

function demiStart() {
    /* BEGIN FUZZING CODE */
    logger = new LOGGER('demichrome1');
    logger.starting();

    logger.log('// Fuzz start', 'grind', 1);
    
    if (demicm.BROWSER == 'IE') {
        logger.log('gc = function() { CollectGarbage(); arr = new Array(); for (var i = 0; i < 0x3f0; i++) { arr[i] = document.createElement("a"); }'
            + ' for (var i = 0; i < 0x3f0; i++) { arr[i] = ""; } CollectGarbage(); }', 'grind', 1);
        gc = function() { 
            CollectGarbage();

            arr = new Array();
            for (var i = 0; i < 0x3f0; i++) {
                arr[i] = document.createElement('a');
            }

            for (var i = 0; i < 0x3f0; i++) {
                arr[i] = '';
            }

            CollectGarbage();
        }
    } else if (demicm.BROWSER == 'FF') {
        logger.log('gc = function() { var arrs = []; for (i = 0; i < 100000; i++) { arrs[i] = new Array(); } return arrs; }', 'grind', 1);
        gc = function() { 
            var arrs = [];
            for(i = 0; i < 100000; i++) {
                arrs[i] = new Array();
            }
            return arrs;
        }
    }

    if (demicm.IS_RAND_FUZZ) {
        var rBool = randBool();
        logger.log('// demicm.IS_FUZZ_GROUP = ' + rBool + ';', 'grind', 1);
        demicm.IS_FUZZ_GROUP = rBool;

        rBool = randBool();
        logger.log('// demicm.IS_FUZZ_MULTI = ' + rBool + ';', 'grind', 1);
        demicm.IS_FUZZ_MULTI = rBool;

        rBool = randBool();
        logger.log('// demicm.IS_FUZZ_SPEC = ' + rBool + ';', 'grind', 1);
        demicm.IS_FUZZ_SPEC = rBool;
    }

    preludeFirst();

    if (demicm.IS_FUZZ_MULTI) {
        logger.log('/-demiFront = function() {', 'grind', 1);
    } else {
        demiFront();
    }
}

function demiFront() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] demiFront()', 'grind', 1);
    }

    // Clear demiFront function
    logger.log('demiFront = function(){};', 'grind', 1);
    demiFront = function(){};

    if (demicm.IS_FUZZ_MULTI) {
        getMultiElems(demicm.MULTI_ELEM_NUM);
    }

    preludeSecond();

    logger.log('// we are now begining to fuzz...', 'grind', 1);
    operate(demicm.FRONT_OP_CNT);

    if (demicm.BROWSER == 'IE' || demicm.BROWSER == 'FF') {
        setTimeout('try {demiBack();} catch (e) {setTimeout(\'parseFloat(unescape("%uF00D%uDEAD" + "</fuzzer>" + "%u0000"));'
            + 'window.location.href = "http://127.0.0.1:8080/grinder";\', 200);}', 100);
    } else {
        setTimeout('demiBack()', 100);
    }
}

function demiBack() {
    if (demicm.IS_DEBUG) {
        logger.log('[+] demiBack()', 'grind', 1);
    }

    logger.log('/-demiBack = function() {', 'grind', 1);

    operate(demicm.BACK_OP_CNT);

    finale();

    // For setTimeout
    logger.log('/-};', 'grind', 1);
    logger.log('setTimeout("demiBack()",100);', 'grind', 1);

    if (demicm.IS_FUZZ_MULTI) {
        // For demiFront
        logger.log('/-};', 'grind', 1);
    }

    if (demicm.BROWSER == 'IE' || demicm.BROWSER == 'FF') {
        setTimeout('try {demiEnd();} catch (e) {setTimeout(\'parseFloat(unescape("%uF00D%uDEAD" + "</fuzzer>" + "%u0000"));'
            + 'window.location.href = "http://127.0.0.1:8080/grinder";\', 200);}', 200);
    } else {
        setTimeout('demiEnd()', 200);
    }
}

function demiEnd() {
    if (idS[demicm.openId]) {
        idS[demicm.openId].close();
    }

    logger.log('// Fuzz finished', 'grind', 1);

    /* END FUZZING CODE */
    logger.finished();
    window.location.href = "http://127.0.0.1:8080/grinder";
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
/*
 * Author: demi6od <demi6d@gmail.com>
 * Date: 2013 Oct 21st
 * 
 * Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
 * - remove all dependencies of logger element
 */

demicm.evtBlackList = [];
if (demicm.BROWSER == 'IE') {
    demicm.evtBlackList.push('onbeforeunload');
}
if (demicm.IS_FUZZ_GROUP) {
    demicm.evtBlackList.push('onselect');
}

demicm.eventDic = {
    Event: {
        func: 'initEvent',
        param: ['bool', 'bool', 'view', 'long'],
        type: ['abort', 'error', 'load', 'select', 'upload']
    },
    MouseEvent: {
        func: 'initMouseEvent',
        param: ['bool', 'bool', 'view', 'long', 'long', 'long', 'long', 'long', 'bool', 'bool', 'bool', 'bool', 'short', 'target'],
        type: ['click', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mouseout', 'mouseover', 'mouseup']
    },
    KeyboardEvent: {
        func: 'initKeyboardEvent',
        param: ['bool', 'bool', 'view', 'string', 'long', 'string', 'bool', 'string'],
        type: ['keydown', 'keyup']
    },
    FocusEvent: {
        func: 'initEvent',
        param: ['bool', 'bool', 'view', 'long', 'target'],
        type: ['blur', 'focus', 'focusin', 'focusout']
    },
    CompositionEvent: {
        func: 'initCompositionEvent',
        param: ['bool', 'bool', 'view', 'string', 'string'],
        type: ['compositionstart', 'compositionupdate', 'compositionend']
    },
    UIEvent: {
        func: 'initUIEvent',
        param: ['bool', 'bool', 'view', 'long'],
        type: ['resize', 'scroll', 'beforeinput', 'input']
    },
    WheelEvent: {
        func: 'initEvent',
        param: ['bool', 'bool', 'view', 'long', 'long', 'long', 'long', 'long', 'short', 'target', 'string', 'long', 'long', 'long', 'long'],
        type: ['wheel']
    },
}

// Get events
demicm.events = [];
for (var e in demicm.eventDic) {
    demicm.events.push(e);
}


demicm.elemDic = {
    a            : 'HTMLAnchorElement',
    acronym      : 'HTMLElement',
    abbr         : 'HTMLElement',
    address      : 'HTMLElement',
    applet       : 'HTMLAppletElement',
    area         : 'HTMLAreaElement',
    article      : 'HTMLElement',
    aside        : 'HTMLElement',
    audio        : 'HTMLAudioElement',
    b            : 'HTMLElement',
    big          : 'HTMLElement',
    center       : 'HTMLElement',
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
    content      : 'HTMLContentElement',
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
    dir          : 'HTMLDirectoryElement',
    em           : 'HTMLElement',
    embed        : 'HTMLEmbedElement',
    fieldset     : 'HTMLFieldSetElement',
    figcaption   : 'HTMLElement',
    figure       : 'HTMLElement',
    footer       : 'HTMLElement',
    frame        : 'HTMLFrameElement',
    frameset     : 'HTMLFrameSetElement',
    main         : 'HTMLElement',
    form         : 'HTMLFormElement',
    font         : 'HTMLFontElement',
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
    menuitem     : 'HTMLUnknownElement',
    meta         : 'HTMLMetaElement',
    meter        : 'HTMLMeterElement',
    nav          : 'HTMLElement',
    nolayer      : 'HTMLElement',
    plaintext    : 'HTMLElement',
    noscript     : 'HTMLElement',
    nobr         : 'HTMLElement',
    noembed      : 'HTMLElement',
    noframes     : 'HTMLElement',
    picture      : 'HTMLPictureElement',
    object       : 'HTMLObjectElement',
    ol           : 'HTMLOListElement',
    optgroup     : 'HTMLOptGroupElement',
    option       : 'HTMLOptionElement',
    output       : 'HTMLOutputElement',
    p            : 'HTMLParagraphElement',
    param        : 'HTMLParamElement',
    pre          : 'HTMLPreElement',
    listing      : 'HTMLPreElement',
    xmp          : 'HTMLPreElement',
    progress     : 'HTMLProgressElement',
    q            : 'HTMLQuoteElement',
    rp           : 'HTMLElement',
    shadow       : 'HTMLShadowElement',
    rt           : 'HTMLElement',
    image        : 'HTMLUnknownElement',
    rtc          : 'HTMLUnknownElement',
    ruby         : 'HTMLElement',
    rb           : 'HTMLUnknownElement',
    s            : 'HTMLElement',
    strike       : 'HTMLElement',
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
    template     : 'HTMLTemplateElement',

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
    //'"createLink" , false, "http://www.w3c.org"',
    '"delete" , false, "true"',
    '"fontName" , false, "Georgia"',
    '"fontSize" , false, "5"',
    '"foreColor" , false, "blue"',
    '"forwardDelete" , false, "true"',
    '"indent" , false, ""',
    '"insertHorizontalRule" , false, ""',
    //'"insertImage" , false, "demicmImg.gif"',
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
    //'"insertOrderedList" , false, "olist"',
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
    //'"createLink" , true, "http://www.w3c.org"',
    '"delete" , true, "true"',
    '"fontName" , true, "Georgia"',
    '"fontSize" , true, "5"',
    '"foreColor" , true, "blue"',
    '"forwardDelete" , true, "true"',
    '"indent" , true, ""',
    '"insertHorizontalRule" , true, ""',
    //'"insertImage" , true, "demicmImg.gif"',
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

if (demicm.BROWSER == 'CM' || demicm.BROWSER == 'FF') {
    demicm.commands.push('"insertImage" , true, "demicmImg.gif"'); 
    demicm.commands.push('"insertImage" , false, "demicmImg.gif"'); 
    demicm.commands.push('"createLink" , true, "http://www.w3c.org"'); 
    demicm.commands.push('"createLink" , false, "http://www.w3c.org"'); 
}

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
            var elem = document.createNodeIterator(document, NodeFilter.SHOW_ALL, null, false);
        }
        else if (demicm.tags[i] == 'TreeWalker') {
            var elem = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false);
        }
        else {
            if (demicm.tags[i]) {
                var elem = document.createElement(demicm.tags[i]);
            }
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

// Prop dics
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
    'image/jpg', 'image/gif', 'image/tiff', 'image/svg+xml', 'application/x-www-form-urlencoded', 'application/json',
    'application/ecmascript', 'application/javascript', 'application/x-ecmascript', 'application/x-javascript',
    'application/sql', 'application/rtf', 'audio/mp3', 'audio/mpeg', 'message/global', 'message/http', 'model/mesh', 
    'multipart/ford-data', 'multipart/digest','text/ecmascript', 'text/javascript', 'text/javascript1.0', 
    'text/javascript1.1', 'text/javascript1.2', 'text/javascript1.3', 'text/javascript1.4', 'text/javascript1.5', 
    'text/jscript', 'text/livescript', 'text/x-ecmascript', 'text/x-javascript', 'text/css', 'text/xml', 'text/plain', 
    'text/html', 'application/java-archive', 'application/java-vm', 'application/x-shockwave-flash', 'video/x-msvideo',
    'video/ogg', 'video/mp4', 'text/vtt',
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

demicm.str = [',', '...', '\t', ' ', '', '?', '/', '[]', '{}', '=+-_', '()', '`', 'demicm', ];
demicm.normalStr = ['demi6od'];
demicm.dirtyStr = [
    //"javascript: try {document.documentElement.innerHTML = '';} catch(e) {}",
    //"javascript: try {document.write('');} catch(e) {}",
    'javascript: window.top.callBackJs();',
    //"filesystem:http://demi6od:password@127.0.0.1:8000/temporary/path/to/file.png",
];
demicm.dirtyHtml = [
    //"<iframe src='javascript: try {top.document.write(null);} catch(e) {}'></iframe>",
    "<iframe src='javascript: window.top.callBackJs();'></iframe>",
];

demicm.alpha = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

demicm.tinyNum = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1];
demicm.smallNum = [0, 1, 2, 3, 4, 5, 6, 8, 10];
demicm.normalNum = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29,
    30, 40, 50, 60, 70, 80, 90, 100, 200
]; 
demicm.normalPct = ['0%', '5%', '10%', '20%', '30%', '50%', '80%', '100%']; 
demicm.normalNumPct = demicm.normalNum.concat(demicm.normalPct); 
demicm.normalNumPctStar = demicm.normalNumPct.concat(['*']); 

demicm.dirtyNum = [
    0x7f, -0x7f, 0xff, -0xff, 0x7fff, -0x7fff, 0xffff, -0xffff, 0x7fffffff, -0x7fffffff, 0xffffffff, 0xfffffffc, -0xffffffff,
    0, -1, 2e100, -2e100, 0x20000001, 0x10000001, 0x40000001, 0x40000000, 0x3fffffff, 0x80000001, 0x80000000
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
demicm.specialProps = ['type', 'name', 'src', 'rel'];
demicm.specialFuncs = [];

demicm.type = {
    source: demicm.MIMETypes, object: demicm.MIMETypes, a: demicm.MIMETypes, 
    button: ['submit', 'button', 'reset', 'menu'], input: demicm.inputTypes,
    select: ['select-one', 'select-multiple'], ol: ['1', 'a', 'A', 'i', 'I'], menu: ['popup', 'toolbar'],
};
demicm.name = {
    meta: ['abstract', 'author', 'classification', 'copyright', 'description', 'distribution', 'web',
    'intranet', 'doc-class', 'doc-rights', 'doc-type', 'DownloadOptions', 'expires', 'generator', 'googlebot',
    'noarchive', 'nofollow', 'noindex', 'nosnippet', 'keywords', 'MSSmartTagsPreventParsing', 'name', 'owner',
    'progid', 'rating', 'refresh', 'reply-to', 'resource-type', 'revisit-after', 'robots', 'Template'] 
};
demicm.src = {
    iframe:demicm.dirtyStr, frame:demicm.dirtyStr, video:['demicmVideo.mp4'], audio:['demicmAudio.mp3'], image:['demicmImg.gif'],
    source:demicm.dirtyStr, track:['demicmTrack.vtt'], embed:['demicmSvg.svg']
};
demicm.rel = {
    link: ['alternate', 'stylesheet', 'start', 'next', 'prev', 'contents', 'index', 'glossary', 'copyright', 'prerender',
    'chapter', 'section', 'subsection', 'appendix', 'help', 'bookmark', 'nofollow', 'licence', 'tag', 'friend', 'prefetch'],
    a: ['alternate', 'author', 'bookmark', 'help', 'licence', 'next', 'nofollow', 'noreferrer', 'prefetch', 'prev', 'search', 'tag']
};

// Func dics
demicm.DOMPos = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];

demicm.func = function() { return 'demi6od'; };

demicm.dirtyParamVals = demicm.num.concat([null, undefined, 'pink', screen, Infinity, false, true, eval, [], {}, demicm.func]);

// Style dics
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
/*
 * Copyright (c) 2014, Stephen Fewer of Harmony Security (www.harmonysecurity.com)
 * Licensed under a 3 clause BSD license (Please see LICENSE.txt)
 * Source code located at https://github.com/stephenfewer/grinder
 * 
 */

// Pick a random number between 0 and X
function rand( x )
{
	return Math.floor( Math.random() * x );
}

// Pick either true or false
function rand_bool()
{
	return ( rand( 2 ) == 1 ? true : false );
}

// Pick an item from an array
function rand_item( arr )
{
	return arr[ rand( arr.length ) ];
}

// Iterate over an object to simulate 'tickling' the object. This is useful during
// testcase creating/reduction in order to trigger the original crash. If you comment
// your fuzzer with log code comments of "/* tickle( OBJ ); */" then these comments
// can be removed to tickle the object. Use where you iterate over an object looking
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
// This is linked with the back end via the injected grinder_logger.dll which
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
		/*else
		{
		    for( i=0; i < 10000; i++ )
				var s = new String( unescape( '%u7F7F%u7F7F' ) );
		}*/
	};
	
	this.get_browser = function()
	{
		if( /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) )
			return "FF";
		else if( /MSIE (\d+\.\d+);/.test(navigator.userAgent) )
			return "IE";
		else if( /Trident\//.test(navigator.userAgent) )
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
	// You must log the JavaScript lines of code you wish to record. The message parameter is a string containing a line
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
	// The for() loop is never emitted if you log a count value of 1.
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
    'id','idS', 'idR', 'demicm', 'console', 'logger', 'scripts', 'LOGGER',
    'innerHTML', 'innerText', 'outerHTML', 'outerText', 'textContent',
    'parentTextEdit', 'lastElementChild', 'firstElementChild', 'nextElementSibling', 'previousElementSibling',
    'ownerDocument', 'nextSibling', 'previousSibling', 'lastChild', 'firstChild', 'childNodes', 'parentNode',
    'parentElement', 'offsetParent', 'children', 'elements', 'body', 'head', 'all', 'view', 'self', 'window',

    'location',
    'URL', 'url', 'href',
    'origin', 'host', 'protocol', 'hostname', 'port', 'pathname',
    'search', 'name', 'history', 'hash', 'onbeforeunload', 'onunload', 
    'defaultView', 'Components', 'controllers',
    'style', 'attributes', 'sheet', 'styleSheets', 'classList', // TODO

    'logger',
]; 
if (demicm.BROWSER == 'IE') {
    demicm.propBlackList.push('designMode');
}

demicm.propDic = {
    wrap: {type: 'string', normalVal: ['off', 'virtual', 'physical'], dirtyVal: ['physical'], readOnly: false},
    behavior: {type: 'string', normalVal: ['scroll', 'slide', 'alternate'], dirtyVal: ['slide'], readOnly: false},
    direction: {type: 'string', normalVal: ['right', 'left'], dirtyVal: demicm.dirtyStr, readOnly: false},
    contentEditable: {type: 'string', normalVal: ['true', 'false', 'plaintext-only', 'inherit'], dirtyVal: ['true'], readOnly: false},
    accessKey: {type: 'string', normalVal: demicm.alpha, dirtyVal: demicm.dirtyStr, readOnly: false}, 
    dir: {type: 'string', normalVal: ['ltr', 'rtl', 'auto'], dirtyVal: ['rtl'], readOnly: false},
    lang: {type: 'string', normalVal: demicm.langs, dirtyVal: demicm.dirtyStr, readOnly: false}, 
    hreflang: {type: 'string', normalVal: demicm.langs, dirtyVal: demicm.dirtyStr, readOnly: false}, 
    srclang: {type: 'string', normalVal: demicm.langs, dirtyVal: demicm.dirtyStr, readOnly: false}, 
    title: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    name: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    type: {type: 'string', normalVal: demicm.inputTypes, dirtyVal: demicm.dirtyStr, readOnly: false},
    wholeText: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: true},
    // objectSpec => non-element object
    dataset: {type: 'objectSpec', normalVal: [{id: 'user', user: 'demi6od', dateOfBirty: '1960-10-03'}], dirtyVal: [], readOnly: false},
    classList: {type: 'objectSpec', normalVal: [{0: 'a', 1: 'b', 2: 'c', length: 3}], dirtyVal: [], readOnly: false},
    className: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    position: {type: 'string', normalVal: ['static', 'relative', 'absolute', 'fixed'], dirtyVal: demicm.dirtyStr, readOnly: false},
    style: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    attributes: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    tagName: {type: 'string', normalVal: demicm.tags, dirtyVal: demicm.dirtyStr, readOnly: false},
    textContent: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: true},
    localName: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: true},
    prefix: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    namespaceURI: {type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr, readOnly: false},
    nodeVal: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    nodeName: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: true},
    text: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    shape: {type: 'string', normalVal: ['rect', 'circ', 'poly'], dirtyVal: demicm.dirtyStr, readOnly: false},
    rev: {type: 'string', normalVal: ['alternate', 'stylesheet', 'start', 'next', 'prev', 'contents', 'index',
        'glossary', 'copyright', 'chapter', 'section', 'subsection', 'appendix', 'help', 'bookmark', 'nofollow',
        'licence', 'tag', 'friend'], dirtyVal: [], readOnly: false},
    rel: {type: 'string', normalVal: ['alternate', 'stylesheet', 'start', 'next', 'prev', 'contents', 'index',
        'glossary', 'copyright', 'chapter', 'section', 'subsection', 'appendix', 'help', 'bookmark', 'nofollow', 
        'licence', 'tag', 'friend'], dirtyVal: [], readOnly: false},
    ping: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: false},
    charset: {type: 'string', normalVal: demicm.charsets, dirtyVal: demicm.dirtyStr, readOnly: false},
    characterSet: {type: 'string', normalVal: demicm.charsets, dirtyVal: demicm.dirtyStr, readOnly: false},
    defaultCharset: {type: 'string', normalVal: demicm.charsets, dirtyVal: demicm.dirtyStr, readOnly: false},
    acceptCharset: {type: 'string', normalVal: demicm.charsets, dirtyVal: demicm.dirtyStr, readOnly: false},
    encoding: {type: 'string', normalVal: demicm.charsets, dirtyVal: demicm.dirtyStr, readOnly: false},
    alt: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    standby: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    clear: {type: 'string', normalVal: ['left', 'right', 'both'], dirtyVal: ['none'], readOnly: false},
    labels: {type: 'object', normalVal: [], dirtyVal: [], readOnly: false},
    validationMessage: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    validity: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    value: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    defaultVal: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    align: {type: 'string', normalVal: ['left', 'right', 'middle', 'top', 'bottom', 'absmiddle', 'baseline', 'absbottom'], 
        dirtyVal: ['center', 'justify', 'char'], readOnly: false},
    vAlign: {type: 'string', normalVal: ['top', 'middle', 'bottom', 'baseline'], dirtyVal: demicm.dirtyStr, readOnly: false},
    ch: {type: 'string', normalVal: demicm.alpha, dirtyVal: demicm.dirtyStr, readOnly: false},
    dateTime: {type: 'string', normalVal: demicm.dateTimes, dirtyVal: demicm.dirtyStr, readOnly: false},
    autocomplete: {type: 'string', normalVal: demicm.autocompletes, dirtyVal: ['on'], readOnly: false},
    version: {type: 'string', normalVal: ['-//W3C//DTD HTML 4.01//EN'], dirtyVal: demicm.dirtyStr, readOnly: true},
    srcdoc: {type: 'string', normalVal: ["<iframe src='javascript: window.top.callBackJs();'></iframe>"], dirtyVal: demicm.dirtyStr, readOnly: false},
    scrolling: {type: 'string', normalVal: ['auto', 'yes', 'no'], dirtyVal: ['auto'], readOnly: false},
    sandbox: {type: 'string', normalVal: ['', 'allow-same-origin', 'allow-top-navigation', 'allow-forms', 'allow-scripts'], 
        dirtyVal: [], readOnly: false},
    frameBorder: {type: 'string', normalVal: ['0', '1'], dirtyVal: ['0'], readOnly: false},
    crossOrigin: {type: 'string', normalVal: ['anonymous', 'use-credentials'], dirtyVal: ['use-credentials'], readOnly: false},
    selectionDirection: {type: 'string', normalVal: ['forward', 'backward', 'none'], dirtyVal: demicm.dirtyStr, readOnly: false},
    // objectdate => date object
    valueAsDate: {type: 'objectdate', normalVal: [], dirtyVal: [], readOnly: false},
    placeholder: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    pattern: {type: 'string', normalVal: ['.*'], dirtyVal: demicm.dirtyStr, readOnly: false},
    media: {type: 'string', normalVal: ['screen', 'tty', 'tv', 'projection', 'handheld', 'print', 'braille', 'aural', 'all'],
        dirtyVal: [], readOnly: false},
    valueType: {type: 'string', normalVal: ['data', 'ref', 'object'], dirtyVal: demicm.dirtyStr, readOnly: false},
    label: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    rules: {type: 'string', normalVal: ['none', 'groups', 'rows', 'cols', 'all'], dirtyVal: demicm.dirtyStr, readOnly: false},
    frame: {type: 'string', normalVal: ['void', 'above', 'below', 'hsides', 'lhs', 'rhs', 'vsides', 'box', 'border'],
        dirtyVal: [], readOnly: false},
    files: {type: 'objectList', normalVal: [], dirtyVal: [], readOnly: true},
    dirName: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    accept: {type: 'string', normalVal: demicm.MIMETypes, dirtyVal: demicm.dirtyStr, readOnly: false},
    codeType: {type: 'string', normalVal: demicm.MIMETypes, dirtyVal: demicm.dirtyStr, readOnly: false},
    keytype: {type: 'string', normalVal: ['rsa', 'dsa', 'ec'], dirtyVal: demicm.dirtyStr, readOnly: false},
    challenge: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    control: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    sheet: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    sizes: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    areas: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    event: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: false},
    scope: {type: 'string', normalVal: ['col', 'row', 'colgroup', 'rowgroup'], dirtyVal: demicm.dirtyStr, readOnly: false},

    // stringId
    hash: {type: 'stringHashId', normalVal: ['#6'], dirtyVal: [], readOnly: false},
    search: {type: 'stringQueryId', normalVal: ['?id=6'], dirtyVal: [], readOnly: false},
    useMap: {type: 'stringHashId', normalVal: ['#fuzzMap'], dirtyVal: [], readOnly: false},
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
    content: {type: 'string', normalVal: ['text/css', 'iso-8859-1', '31 Dec 2008'], dirtyVal: demicm.dirtyStr, readOnly: false},
    scheme: {type: 'string', normalVal: ['YYYY-MM-DD', 'ISBN'], dirtyVal: demicm.dirtyStr, readOnly: false},

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
    sectionRowIndex: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: true},
    summary: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    axis: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    abbr: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},

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
    volume: {type: 'number', normalVal: demicm.tinyNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    playbackRate: {type: 'number', normalVal: [1, 0.5, 2, -1], dirtyVal: demicm.dirtyNum, readOnly: false},
    defaultPlaybackRate: {type: 'number', normalVal: [1, 0.5, 2, -1], dirtyVal: demicm.dirtyNum, readOnly: false},
    duration: {type: 'number', normalVal: [100], dirtyVal: demicm.dirtyNum, readOnly: true},
    startTime: {type: 'number', normalVal: [0, 5, 10, 100], dirtyVal: demicm.dirtyNum, readOnly: false},
    initialTime: {type: 'number', normalVal: [0, 5, 10, 100], dirtyVal: demicm.dirtyNum, readOnly: false},
    currentTime: {type: 'number', normalVal: [0, 5, 10, 100], dirtyVal: demicm.dirtyNum, readOnly: false},
    readyState: {type: 'number', normalVal: [0, 1, 2, 3, 4], dirtyVal: demicm.dirtyNum, readOnly: false},
    networkState: {type: 'number', normalVal: [0, 1, 2, 3], dirtyVal: demicm.dirtyNum, readOnly: false},
    kind: {type: 'string', normalVal: ['captions', 'chapters', 'descriptions', 'metadata', 'subtitles'], dirtyVal: demicm.dirtyStr, readOnly: false},
    poster: {type: 'string', normalVal: ['demicmImg.gif'], dirtyVal: demicm.dirtyStr, readOnly: false},
    mediaGroup: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: false},
    preload: {type: 'string', normalVal: ['auto', 'metadata', 'none'], dirtyVal: ['auto'], readOnly: false},
    currentSrc: {type: 'string', normalVal: ['demicmVideo.mp4'], dirtyVal: demicm.dirtyStr, readOnly: true},
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

    // Canvas
    fillStyle: {type: 'string', normalVal: ['#FF1122', '#00FF22', '#1100FF'], dirtyVal: ['#FFFFFF'], readOnly: false},
    strokeStyle: {type: 'string', normalVal: ['#FF1122', '#00FF22', '#1100FF'], dirtyVal: ['#FFFFFF'], readOnly: false},
    lineCap: {type: 'string', normalVal: ['butt', 'round', 'square'], dirtyVal: demicm.dirtyStr, readOnly: false},
    lineJoin: {type: 'string', normalVal: ['bevel', 'round', 'miter'], dirtyVal: demicm.dirtyStr, readOnly: false},
    shadowColor: {type: 'string', normalVal: demicm.color, dirtyVal: demicm.dirtyStr, readOnly: false},
    shadowBlur: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    shadowOffsetX: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    shadowOffsetY: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    lineWidth: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    miterLimit: {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    font: {type: 'string', normalVal: ['italic small-caps bold 12px arial'], dirtyVal: demicm.dirtyStr, readOnly: false},
    textAlign: {type: 'string', normalVal: ['center', 'end', 'left', 'right', 'start'], dirtyVal: demicm.dirtyStr, readOnly: false},
    textBaseline: {type: 'string', normalVal: ['alphabetic', 'top', 'hanging', 'middle', 'ideographic', 'bottom'], dirtyVal: demicm.dirtyStr, readOnly: false},
    globalAlpha: {type: 'number', normalVal: demicm.tinyNum, dirtyVal: demicm.dirtyNum, readOnly: false},
    globalCompositeOperation: {type: 'string', normalVal: ['source-over', 'source-atop', 'source-in', 'source-out', 'destination-over', 'destination-atop', 'destination-in', 'destination-out', 'lighter', 'copy', 'xor'], dirtyVal: demicm.dirtyStr, readOnly: false},


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
    status: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: true},
    defaultstatus: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: true},
    defaultStatus: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: true},
    p: {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr, readOnly: true},
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
    baseURI: {type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr, readOnly: true},
    documentURI: {type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr, readOnly: true},
    cookie: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: false},
    domain: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: true},
    location: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: true},
    inputEncoding: {type: 'string', normalVal: demicm.charsets, dirtyVal: demicm.dirtyStr, readOnly: false},
    implementation: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: true},
    xmlVersion: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    xmlEncoding: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    styleSheets: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: false},
    lastModified: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: true},
    readyState: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: true},
    URL: {type: 'string', normalVal: [], dirtyVal: [], readOnly: true},
    referrer: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: true},
    doctype: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: true},
    docMode: {type: 'objectSpec', normalVal: [], dirtyVal: [], readOnly: true},
    currentScript: {type: 'object', normalVal: [], dirtyVal: [], readOnly: true},
    strictErrorChecking: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    xmlStandalone: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    async: {type: 'boolean', normalVal: demicm.bool, dirtyVal: [true], readOnly: false},
    vlinkColor: {type: 'string', normalVal: demicm.color, dirtyVal: demicm.dirtyStr, readOnly: false},
    linkColor: {type: 'string', normalVal: demicm.color, dirtyVal: demicm.dirtyStr, readOnly: false},
    alinkColor: {type: 'string', normalVal: demicm.color, dirtyVal: demicm.dirtyStr, readOnly: false},
    fgColor: {type: 'string', normalVal: demicm.color, dirtyVal: demicm.dirtyStr, readOnly: false},
    bgColor: {type: 'string', normalVal: demicm.color, dirtyVal: demicm.dirtyStr, readOnly: false},
    compatMode: {type: 'string', normalVal: ['FrontCompat', 'BackCompat'], dirtyVal: demicm.dirtyStr, readOnly: false},

    // URL related
    href: {type: 'string', normalVal: [demicm.URL + 'demicmFuzz.html'], dirtyVal: demicm.dirtyStr, readOnly: false},
    origin: {type: 'string', normalVal: ['http://127.0.0.1:80'], dirtyVal: demicm.dirtyStr, readOnly: false},
    baseURI: {type: 'string', normalVal: ['http://127.0.0.1'], dirtyVal: demicm.dirtyStr, readOnly: false},
    host: {type: 'string', normalVal: ['127.0.0.1:80'], dirtyVal: demicm.dirtyStr, readOnly: false},
    protocol: {type: 'string', normalVal: ['http', 'https', 'ftp', 'file', 'javascript'], dirtyVal: [], readOnly: false},
    hostname: {type: 'string', normalVal: ['127.0.0.1'], dirtyVal: demicm.dirtyStr, readOnly: false},
    port: {type: 'string', normalVal: ['80'], dirtyVal: demicm.dirtyStr, readOnly: false},
    pathname: {type: 'string', normalVal: ['demicmFuzz.html'], dirtyVal: demicm.dirtyStr, readOnly: false},

    formTarget: {type: 'string', normalVal: ['_blank', '_self', '_parent', '_top', demicm.URL + 'demicmFuzz.html'],
        dirtyVal: demicm.dirtyStr, readOnly: false},
    target: {type: 'string', normalVal: ['_blank', '_self', '_parent', '_top', demicm.URL + 'demicmFuzz.html'],
        dirtyVal: demicm.dirtyStr, readOnly: false},

    profile: {type: 'string', normalVal: [demicm.URL + 'demicmProfile'], dirtyVal: demicm.dirtyStr, readOnly: false},
    cite: {type: 'string', normalVal: [demicm.URL + 'demicmDoc'], dirtyVal: demicm.dirtyStr, readOnly: false},
    lowsrc: {type: 'string', normalVal: demicm.dirtyStr, dirtyVal: demicm.dirtyStr, readOnly: false},
    src: {type: 'string', normalVal: demicm.dirtyStr, dirtyVal: demicm.dirtyStr, readOnly: false},
    background: {type: 'string', normalVal: [demicm.URL + 'demicmImg.gif'], dirtyVal: demicm.dirtyStr, readOnly: false},
    codeBase: {type: 'string', normalVal: [demicm.URL + 'java/'], dirtyVal: demicm.dirtyStr, readOnly: false},
    code: {type: 'string', normalVal: [demicm.URL + 'demicmCodeBase.class'], dirtyVal: demicm.dirtyStr, readOnly: false},
    archive: {type: 'string', normalVal: [demicm.URL + 'demicmAchive.java'], dirtyVal: demicm.dirtyStr, readOnly: false},
    manifest: {type: 'string', normalVal: [demicm.URL + 'demicmMani.cache'], dirtyVal: demicm.dirtyStr, readOnly: false},
    data: {type: 'string', normalVal: [demicm.URL + 'demicmData.swf'], dirtyVal: demicm.dirtyStr, readOnly: false},
    longDesc: {type: 'string', normalVal: [demicm.URL + 'demicmDesc.txt'], dirtyVal: demicm.dirtyStr, readOnly: false},
    download: {type: 'string', normalVal: [demicm.URL + 'demicmDownload.txt'], dirtyVal: demicm.dirtyStr, readOnly: false},
    formAction: {type: 'string', normalVal: [demicm.URL + 'demicmFuzz.html'], dirtyVal: demicm.dirtyStr, readOnly: false},
    action: {type: 'string', normalVal: [demicm.URL + 'demicmFuzz.html'], dirtyVal: demicm.dirtyStr, readOnly: false},

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
    webkitdropzone: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: false},
    webkitPseudo: {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr, readOnly: false},
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
    // Auto func black list begin
    'constructNodeIterator', 'constructTreeWalker', 'constructRange', 'setRange', 'constructSelection', 
    'setSelection', 'nodeIteration', 'treeIteration', 'moveIterator', 'moveTreeWalker', 'alterRange', 
    'alterSelection', 'constructGroup', 'reuseGroup', 'objMan', 'preludeFirst', 'preludeSecond', 
    'setPropSty', 'setEnv', 'eventHandler', 'setEvtHandler', 'callBackJs', 'callBack', 
    'setCallBack', 'addTextNode', 'appendForm', 'appendList', 'appendCanvas2D', 'appendWebGL', 
    'drawWebgl', 'appendNetwork', 'appendStyle', 'appendTable', 'appendMap', 'appendAudio', 
    'appendVideo', 'appendWorker', 'appendSharedWorker', 'appendSvg', 'appendXml', 'appendSpecElem', 
    'constructHtml', 'constructTag', 'constructBaseTree', 'constructDOMTree', 'setAttr', 'constructSpec', 
    'addCSS', 'propfMan', 'propMan', 'funcMan', 'styleMan', 'layout', 
    'clearSub', 'clearAll', 'DOMMan', 'winMan', 'attrMan', 'canvas2dMan', 
    'webglMan', 'fireEvent', 'finale', 'reuseElem', 'reuseRetElem', 'reuseSpec', 
    'relayout', 'operate', 'normalOperate', 'specialOperate', 'multiClear', 'multiMan', 
    'specObjMan', 'groupMan', 'appendWindow', 'appendIframe', 'appendFrame', 'constructMulti', 
    'getWindow', 'getIframe', 'getFrame', 'getMultiElems', 'demiStart', 'demiFront', 
    'demiBack', 'demiEnd', 'rand', 'randItem', 'srand', 'randBool', 
    'randHex', 'randAlpha', 'randAscii', 'randHTMLEnt', 'randUnicode', 'randStr', 
    'randHTMLCode', 'percent', 'getTagName', 'randId', 'randIds', 'randObjId', 
    'randObjIds', 'getPropf', 'updatePropfCache', 'randPropf', 'randPropfDyn', 'randPropfVal', 
    'randStyle', 'randStyleVal', 'randCSSText', 'toCSSStyle', 'logRevise', 'removeThis', 
    'removeChildren', 'removeCache', 'clearThisId', 'clearChildrenId', 'removeArrVal', 'inArr', 
    'isArr', 'repeatArr', 'convoluteArr', 'cloneObj', 'extendObj', 'isPosInt', 
    'elemInDOM', 'writeFileCM', 'writeFileIE', 'getTags', 'getElemName', 'getPropAndFunc', 
    'getDistPropAndFunc', 'rand', 'rand_bool', 'rand_item', 'tickle', 'LOGGER', 
    'testId', 'testRand', 'testArr', 'printArr', 'testPropf', 'testCase', 
    'testcase', 'testCase', 
    // Auto func black list end

    // Grinder server special func result
    //'getEntries', 'getEntriesByType', 'getEntriesByName', 'webkitGetEntries', 'webkitGetEntriesByType', 'webkitGetEntriesByName',

    // IE
    'showHelp',

    // Firefox
    'AddSearchProvider', 'addSearchEngine', 'mozRequestFullScreen',

    'parseFloat',
    'appendChild', 'insertBefore', 'removeChild', 'replaceChild', 'cloneNode',
    'insertAdjacentElement', 'insertAdjacentHTML', 'insertAdjacentText',
    'dispatchEvent', 'removeEventListener', 'addEventListener',
    'toString', 'toStringBack', 'toLocalString', 'valueOf',
    'webkitCancelKeyRequest', 'webkitAddKey', 'webkitGenerateKeyRequest',
    'write', 'writeln', 'open',
    'reload', 'go', 'assign', 'navigate', 'load', 'close', 'submit', 'click',
    'print', 'alert', 'prompt', 'showModalDialog', 'confirm',
    'setAttributeNode', 'setAttributeNodeNS', 'removeAttributeNode',  // TODO
];

// First parameter is return value
demicm.funcDic = {
    getElementById: [
		{type: 'object'},
		{type: 'string', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyStr},
    ],
    getElementsByName: [
		{type: 'objectList'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    getElementsByTagName: [
		{type: 'objectList'},
		{type: 'string', normalVal: demicm.tags, dirtyVal: demicm.dirtyStr},
    ],
    getElementsByTagNameNS: [
		{type: 'objectList'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
        {type: 'string', normalVal: demicm.tags, dirtyVal: demicm.dirtyStr},
    ],
    getElementsByClassName: [
		{type: 'objectList'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    item: [
		{type: 'object'},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    namedItem: [
		{type: 'object'},
		{type: 'string', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: ['Core'], dirtyVal: demicm.dirtyStr},
        {type: 'string', normalVal: ['1.0', '2.0', '3.0'], dirtyVal: demicm.dirtyNum},
    ],
    lookupPrefix: [
		{type: 'string'},
		{type: 'string', normalVal: ['http://127.0.0.1:8080/grinder/'], dirtyVal: demicm.dirtyStr},
    ],
    lookupNamespaceURI: [
		{type: 'string'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    isDefaultNamespace: [
		{type: 'boolean'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: ['image/png', 'image/webp', 'image/jpeg'], dirtyVal: demicm.dirtyStr},
        {type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    getContext: [
		{type: 'contextObj'},
		{type: 'string', normalVal: ['2d', 'webgl'], dirtyVal: demicm.dirtyStr},
    ],

    // SVG
    getSVGDocument: [
		{type: 'SVGDocument'},
    ],

    // Audio & Video
    load: [
		{type: ''},
    ],
    canPlayType: [
		{type: 'string'},
		{type: 'string', normalVal: ['video/ogg', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/ogg', 'audio/mp4',
            'video/ogg; codecs=\'theora, vorbis\'', 'video/mp4; codecs=\'avc1.4D401E, mp4a.40.2\'', 
            'video/webm; codecs=\'vp8.0, vorbis\'', 'audio/ogg; codecs=\'vorbis\'', 'audio/mp4; codecs=\'mp4a.40.5\''], dirtyVal: []},
    ],
    play: [
		{type: ''},
    ],
    pause: [
		{type: ''},
    ],
    addTextTrack: [
		{type: 'objectTextTrack'},
		{type: 'string', normalVal: ['subtitles', 'caption', 'descriptions', 'chapters', 'metadata'], dirtyVal: demicm.dirtyStr},
        {type: 'string', normalVal: ['label'], dirtyVal: demicm.dirtyStr},
        {type: 'string', normalVal: demicm.langs, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],

    // Text
    splitText: [
        {type: 'object'},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    replaceWholeText: [
        {type: ''},
        {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr},
    ],
    substringData: [
        {type: 'string'},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    appendData: [
        {type: ''},
        {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr}
    ],
    insertData: [
        {type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
        {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr},
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
        {type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: demicm.dirtyHtml, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: ['character', 'word', 'sentence', 'line', 'paragraph', 'lineboundary', 'sentenceboundary', 'paragraphboundary', 'documentboundary'], dirtyVal: ['character', 'word', 'sentence', 'line', 'paragraph', 'lineboundary', 'sentenceboundary', 'paragraphboundary', 'documentboundary']},
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
        {type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    btoa: [
        {type: 'string'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    open: [
        {type: 'objectWindow'},
		{type: 'string', normalVal: [demicm.URL + 'demicmFuzz.html'], dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: ['_blank', '_self', '_parent', '_top'], dirtyVal: demicm.dirtyStr},
    ],
    stop: [
        {type: ''},
    ],
    setInterval: [
        {type: 'number'},
		{type: 'string', normalVal: ['document;'], dirtyVal: demicm.dirtyStr},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'string', normalVal: ['JavaScript', 'JScript', 'VBScript'], dirtyVal: ['JavaScript']},
    ],
    setTimeout: [
        {type: 'number'},
		{type: 'string', normalVal: ['document;'], dirtyVal: demicm.dirtyStr},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'string', normalVal: ['JavaScript', 'JScript', 'VBScript'], dirtyVal: ['JavaScript']},
    ],
    postMessage: [
        {type: ''},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: [demicm.URL + 'demicmFuzz.html'], dirtyVal: demicm.dirtyStr},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    matchMedia: [
        {type: 'boolean'},
        {type: 'string', normalVal: ['(min-width: 400px)'], dirtyVal: demicm.dirtyStr},
    ],
    find: [
        {type: 'boolean'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: ['pseudoElt'], dirtyVal: demicm.dirtyStr},
    ],
    getMatchedCSSRules: [
        {type: 'objectStyle'},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'string', normalVal: ['pseudoClass'], dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    createComment: [
        {type: 'objectComment'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    createCDATASection: [
        {type: 'objectCDATA'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    createEntityReference: [
        {type: 'objectEntity'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    createDocumentFragment: [
        {type: 'objectDocumentFragment'},
    ],
    createEvent: [
        {type: 'objectEvent'},
		{type: 'string', normalVal: ['HTMLEvents', 'MouseEvents', 'UIEvents'], dirtyVal: demicm.dirtyStr},
    ],
    createExpression: [
        {type: 'objectXPath'},
        {type: 'string', normalVal: ['/body/a'], dirtyVal: demicm.dirtyStr},
        {type: 'object', normalVal: [function(prefix){return 'http://www.w3.org/1999/xhtml';}], dirtyVal: []},
    ],
    evaluate: [
        {type: 'objectXPath'},
        {type: 'string', normalVal: ['/body/a'], dirtyVal: demicm.dirtyStr},
		{type: 'object', normalVal: [], dirtyVal: []},
        {type: 'object', normalVal: [function(prefix){return 'http://www.w3.org/1999/xhtml';}], dirtyVal: []},
    ],
    createDocumentFragment: [
        {type: 'objectDocumentFragment'},
    ],
    createProcessingInstruction: [
        {type: 'objectProc'},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: demicm.dirtyStr},
    ],
    loadXML: [
        {type: 'objectXML'},
		{type: 'string', normalVal: ['<tag>demi6od</tag>'], dirtyVal: demicm.dirtyStr},
    ],
    queryCommandEnabled: [
        {type: 'boolean'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: demicm.dirtyStr},
    ],
    queryCommandIndeterm: [
        {type: 'boolean'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: demicm.dirtyStr},
    ],
    queryCommandState: [
        {type: 'boolean'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: demicm.dirtyStr},
    ],
    queryCommandSupported: [
        {type: 'boolean'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: demicm.dirtyStr},
    ],
    queryCommandText: [
        {type: 'string'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: demicm.dirtyStr},
    ],
    queryCommandValue: [
        {type: 'objectSpec'},
		{type: 'string', normalVal: demicm.cmdNames, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: ['2d'], dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: ['animation'], dirtyVal: demicm.dirtyStr},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    getOverrideStyle: [
        {type: 'objectStyle'},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'string', normalVal: ['pseudoElt'], dirtyVal: demicm.dirtyStr},
    ],
    createNSResolver: [
        {type: 'objectXPathResolver'},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],

    // Nodemap
    getNamedItem: [
		{type: 'object'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    getNamedItemNS: [
		{type: 'object'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    removeNamedItem: [
		{type: 'object'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    removeNamedItemNS: [
		{type: 'object'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    setNamedItem: [
		{type: 'object'},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    setNamedItemNS: [
		{type: 'object'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    item: [
		{type: 'object'},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],

    // Attribute
    setAttribute: [
		{type: ''},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    setAttributeNS: [
		{type: ''},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    getAttributeNS: [
		{type: 'string'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    getAttributeNode: [
		{type: 'objectAttr'},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    getAttributeNodeNS: [
		{type: 'objectAttr'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    removeAttribute: [
		{type: ''},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    removeAttributeNS: [
		{type: ''},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    hasAttributeNS: [
		{type: 'boolean'},
		{type: 'string', normalVal: demicm.nameSpaces, dirtyVal: demicm.dirtyStr},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: demicm.tags, dirtyVal: demicm.dirtyStr},
    ],
    querySelectorAll: [
		{type: 'objectList'},
		{type: 'string', normalVal: demicm.tags, dirtyVal: demicm.dirtyStr},
    ],
    getClientRects: [
		{type: 'objectRectList'},
    ],
    getBoundingClientRect: [
		{type: 'objectRect'},
    ],

    // Web Storage
    setItem: [
		{type: 'object'},
		{type: 'string', normalVal: [], dirtyVal: demicm.dirtyStr},
    ],
    querySelectorAll: [
		{type: 'objectList'},
		{type: 'string', normalVal: demicm.tags, dirtyVal: demicm.dirtyStr},
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
		{type: 'string', normalVal: demicm.tags, dirtyVal: demicm.dirtyStr},
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
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'object', normalVal: [], dirtyVal: []},
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
    ],

    // Network
    open: [
        {type: ''},
		{type: 'string', normalVal: ['GET', 'POST', 'PUT'], dirtyVal: []},
		{type: 'string', normalVal: ['http://127.0.0.1:8000'], dirtyVal: ['http://127.0.0.1:8000']},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
    ],
    send: [
        {type: ''},
		{type: 'object', normalVal: ['GET', 'POST', 'PUT'], dirtyVal: demicm.dirtyStr},
    ],
    setRequestHeader: [
        {type: ''},
		{type: 'string', normalVal: ['cache-control', 'content-language', 'content-type', 'date', 'expires', 'last-modified', 'location', 'refresh', 'set-cookie', 'window-target'], dirtyVal: []},
		{type: 'string', normalVal: demicm.MIMETypes, dirtyVal: []},
    ],

    // Canvas2D
    createRadialGradient: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    addColorStop: [
		{type: ''},
		{type: 'number', normalVal: demicm.tinyNum, dirtyVal: demicm.dirtyNum},
		{type: 'string', normalVal: demicm.color, dirtyVal: demicm.dirtyStr},
    ],
    createPattern: [
		{type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'string', normalVal: ['repeat', 'repeat-x','no-repeat', 'repeat-y'], dirtyVal: demicm.dirtyStr},
    ],
    clearRect: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    rotate: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    setTransform: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    measureText: [
		{type: ''},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
    ],
    strokeText: [
		{type: ''},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    fillText: [
		{type: ''},
		{type: 'string', normalVal: demicm.str, dirtyVal: demicm.dirtyStr},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    transform: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    putImageData: [
		{type: ''},
		{type: 'object', normalVal: [], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    getImageData: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    createImageData: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    translate: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    scale: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    isPointInStroke: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    isPointInPath: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    lineTo: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    ellipse: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
    ],
    arcTo: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    arc: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
    ],
    bezierCurveTo: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    quadraticCurveTo: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    moveTo: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    strokeRect: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    clip: [
		{type: ''},
    ],
    closePath: [
		{type: ''},
    ],
    beginPath: [
		{type: ''},
    ],
    stroke: [
		{type: ''},
    ],
    fill: [
		{type: ''},
    ],
    save: [
		{type: ''},
    ],
    resetTransform: [
		{type: ''},
    ],
    restore: [
		{type: ''},
    ],
    fillRect: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    rect: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    createLinearGradient: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],

    // WebGL
    isContextLost: [
		{type: 'boolean'},
    ],
    frontFace: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.CCW', 'eval:demicm.webgl.CW'], dirtyVal: []},
    ],
    cullFace: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.FRONT', 'eval:demicm.webgl.BACK', 'eval:demicm.webgl.FRONT_AND_BACK'], dirtyVal: []},
    ],
    polygonOffset: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    lineWidth: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    clear: [
		{type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    stencilMask: [
		{type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    stencilMaskSeparate: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.FRONT', 'eval:demicm.webgl.BACK', 'eval:demicm.webgl.FRONT_AND_BACK'], dirtyVal: []},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    clearStencil: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    depthMask: [
		{type: ''},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
    ],
    colorMask: [
		{type: ''},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
    ],
    clearColor: [
		{type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    clearDepth: [
		{type: ''},
		{type: 'number', normalVal: demicm.tinyNum, dirtyVal: demicm.dirtyNum},
    ],
    depthRange: [
		{type: ''},
		{type: 'number', normalVal: demicm.tinyNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.tinyNum, dirtyVal: demicm.dirtyNum},
    ],
    getActiveUniform: [
		{type: 'object'},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    getActiveAttrib: [
		{type: 'object'},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    enableVertexAttribArray: [
		{type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    disableVertexAttribArray: [
		{type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    viewport: [
		{type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    scissor: [
		{type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    activeTexture: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE0', 'eval:demicm.webgl.TEXTURE1', 'eval:demicm.webgl.TEXTURE2'], dirtyVal: []},
    ],
    getShaderParameter: [
		{type: 'object'},
		{type: 'object', normalVal: ['eval:demicm.vshader', 'eval:demicm.fshader'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.DELETE_STATUS', 'eval:demicm.webgl.COMPILE_STATUS', 'eval:demicm.webgl.SHADER_TYPE'], dirtyVal: []},
    ],
    getProgramParameter: [
		{type: 'object'},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.DELETE_STATUS', 'eval:demicm.webgl.LINK_STATUS', 'eval:demicm.webgl.VALIDATE_STATUS', 'eval:demicm.webgl.ATTACHED_SHADERS', 'eval:demicm.webgl.ACTIVE_ATTRIBUTES', 'eval:demicm.webgl.ACTIVE_UNIFORMS'], dirtyVal: []},
    ],
    getShaderSource: [
		{type: 'string'},
		{type: 'object', normalVal: ['eval:demicm.vshader', 'eval:demicm.fshader'], dirtyVal: []},
    ],
    getShaderInfoLog: [
		{type: 'string'},
		{type: 'object', normalVal: ['eval:demicm.vshader', 'eval:demicm.fshader'], dirtyVal: []},
    ],
    shaderSource: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.vshader', 'eval:demicm.fshader'], dirtyVal: []},
		{type: 'string', normalVal: ['eval:demicm.VSHADER_SOURCE', 'eval:demicm.FSHADER_SOURCE'], dirtyVal: demicm.dirtyStr},
    ],
    isShader: [
		{type: 'boolean'},
		{type: 'object', normalVal: ['eval:demicm.vshader', 'eval:demicm.fshader'], dirtyVal: []},
    ],
    useProgram: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
    ],
    validateProgram: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
    ],
    linkProgram: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
    ],
    deleteProgram: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
    ],
    isProgram: [
		{type: 'boolean'},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
    ],
    getProgramInfoLog: [
		{type: 'string'},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
    ],
    getAttachedShaders: [
		{type: 'objectList'},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
    ],
    attachShader: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
		{type: 'object', normalVal: ['eval:demicm.vshader', 'eval:demicm.fshader'], dirtyVal: []},
    ],
    detachShader: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
		{type: 'object', normalVal: ['eval:demicm.vshader', 'eval:demicm.fshader'], dirtyVal: []},
    ],
    compileShader: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.vshader', 'eval:demicm.fshader'], dirtyVal: []},
    ],
    deleteShader: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.vshader', 'eval:demicm.fshader'], dirtyVal: []},
    ],
    createShader: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.webgl.VERTEX_SHADER', 'eval:demicm.webgl.FRAGMENT_SHADER'], dirtyVal: []},
    ],
    createProgram: [
		{type: ''},
    ],
    getUniform: [
		{type: 'number'},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
		{type: 'object', normalVal: ['eval:demicm.webgl.program.u_MvpMatrix', 'eval:demicm.webgl.program.u_MvpMatrixFromLight'], dirtyVal: []},
    ],
    getVertexAttrib: [
		{type: 'object'},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: ['eval:demicm.webgl.CURRENT_VERTEX_ATTRIB', 'eval:demicm.webgl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING', 'eval:demicm.webgl.VERTEX_ATTRIB_ARRAY_ENABLED', 'eval:demicm.webgl.VERTEX_ATTRIB_ARRAY_SIZE', 'eval:demicm.webgl.VERTEX_ATTRIB_ARRAY_STRIDE', 'eval:demicm.webgl.VERTEX_ATTRIB_ARRAY_TYPE', 'eval:demicm.webgl.VERTEX_ATTRIB_ARRAY_NORMALIZED'], dirtyVal: []},
    ],
    getVertexAttribOffset: [
		{type: 'number'},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'object', normalVal: ['eval:demicm.webgl.VERTEX_ATTRIB_ARRAY_POINTER'], dirtyVal: []},
    ],
    vertexAttribPointer: [
		{type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: ['eval:demicm.webgl.BYTE', 'eval:demicm.webgl.SHORT', 'eval:demicm.webgl.UNSIGNED_BYTE', 'eval:demicm.webgl.UNSIGNED_SHORT', 'eval:demicm.webgl.FIXED', 'eval:demicm.webgl.FLOAT'], dirtyVal: []},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [true]},
		{type: 'number', normalVal: [32, 64, 128], dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: [32, 64, 128], dirtyVal: demicm.dirtyNum},
    ],
    getUniformLocation: [
		{type: 'number'},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
		{type: 'string', normalVal: ['u_MvpMatrix', 'u_MvpMatrixFromLight'], dirtyVal: demicm.dirtyStr},
    ],
    getAttribLocation: [
		{type: 'number'},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
		{type: 'string', normalVal: ['a_Position', 'a_Color'], dirtyVal: demicm.dirtyStr},
    ],
    bindAttribLocation: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.webgl.program'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'string', normalVal: ['a_Position', 'a_Color'], dirtyVal: demicm.dirtyStr},
    ],
    createBuffer: [
		{type: 'object'},
    ],
    getExtension: [
		{type: 'object'},
		{type: 'string', normalVal: ["ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_frag_depth", "EXT_shader_texture_lod", "EXT_texture_filter_anisotropic", "WEBKIT_EXT_texture_filter_anisotropic", "OES_element_index_uint", "OES_standard_derivatives", "OES_texture_float", "OES_texture_float_linear", "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBKIT_WEBGL_compressed_texture_s3tc", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_depth_texture", "WEBKIT_WEBGL_depth_texture", "WEBGL_draw_buffers", "WEBGL_lose_context", "WEBKIT_WEBGL_lose_context"] , dirtyVal: demicm.dirtyStr},
    ],
    deleteBuffer: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.buffer1', 'eval:demicm.buffer2', 'eval:demicm.buffer3'], dirtyVal: []},
    ],
    isBuffer: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.buffer1', 'eval:demicm.buffer2', 'eval:demicm.buffer3'], dirtyVal: []},
    ],
    bindBuffer: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.ARRAY_BUFFER', 'eval:demicm.webgl.ELEMENT_ARRAY_BUFFER'], dirtyVal: []},
		{type: 'object', normalVal: ['eval:demicm.buffer1', 'eval:demicm.buffer2', 'eval:demicm.buffer3'], dirtyVal: []},
    ],
    bufferSubData: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.ARRAY_BUFFER', 'eval:demicm.webgl.ELEMENT_ARRAY_BUFFER'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: ['eval:demicm.vertices', 'eval:demicm.colors', 'eval:demicm.indices'], dirtyVal: []},
    ],
    getBufferParameter: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.ARRAY_BUFFER', 'eval:demicm.webgl.ELEMENT_ARRAY_BUFFER'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.BUFFER_SIZE', 'eval:demicm.webgl.USAGE'], dirtyVal: []},
    ],
    bufferData: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.ARRAY_BUFFER', 'eval:demicm.webgl.ELEMENT_ARRAY_BUFFER'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: ['eval:demicm.webgl.STATIC_DRAW', 'eval:demicm.webgl.STREAM_DRAW', 'eval:demicm.webgl.DYNAMIC_DRAY'], dirtyVal: []},
    ],
    checkFramebufferStatus: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.FRAMEBUFFER'], dirtyVal: []},
    ],
    createFramebuffer: [
		{type: 'object'},
    ],
    isRenderbuffer: [
		{type: 'boolean'},
        {type: 'object', normalVal: ['eval:demicm.renderbuffer'], dirtyVal: []},
    ],
    deleteRenderbuffer: [
		{type: ''},
        {type: 'object', normalVal: ['eval:demicm.renderbuffer'], dirtyVal: []},
    ],
    readPixels: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: ['eval:demicm.webgl.RGBA'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.UNSIGNED_BYTE'], dirtyVal: []},
		{type: 'object', normalVal: [], dirtyVal: []},
    ],
    renderbufferStorage: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.RENDERBUFFER'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.DEPTH_COMPONENT16', 'eval:demicm.webgl.RGBA4', 'eval:demicm.webgl.RGBA5_A1', 'eval:demicm.webgl.RGB565', 'eval:demicm.webgl.STENCIL_INDEX8'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    getParameter: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.ALPHA_BITS', 'eval:demicm.webgl.ARRAY_BUFFER_BINDING', 'eval:demicm.webgl.RANGE', 'eval:demicm.webgl.LINE_WIDTH'], dirtyVal: []},
    ],
    getRenderbufferParameter: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.RENDERBUFFER'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.RENDERBUFFER_RED_SIZE', 'eval:demicm.webgl.RENDERBUFFER_GREEN_SIZE', 'eval:demicm.webgl.RENDERBUFFER_BLUE_SIZE', 'eval:demicm.webgl.RENDERBUFFER_ALPHA_SIZE', 'eval:demicm.webgl.RENDERBUFFER_DEPTH_SIZE', 'eval:demicm.webgl.RENDERBUFFER_STENCIL_SIZE', ], dirtyVal: []},
    ],
    bindRenderbuffer: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.RENDERBUFFER'], dirtyVal: []},
        {type: 'object', normalVal: ['eval:demicm.renderbuffer'], dirtyVal: []},
    ],
    getFramebufferAttachmentParameter: [
		{type: 'object'},
		{type: 'number', normalVal: ['eval:demicm.webgl.FRAMEBUFFER'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.COLOR_ATTACHMENT0', 'eval:demicm.webgl.DEPTH_ATTACHMENT', 'eval:demicm.webgl.STENCIL_ATTACHMENT'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE', 'eval:demicm.webgl.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME', 'eval:demicm.webgl.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL', 'eval:demicm.webgl.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE'], dirtyVal: []},
    ],
    framebufferTexture2D: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.FRAMEBUFFER'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.COLOR_ATTACHMENT0', 'eval:demicm.webgl.DEPTH_ATTACHMENT', 'eval:demicm.webgl.STENCIL_ATTACHMENT'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_2D', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_POSITIVEX', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_POSITIVEY', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_POSITIVEZ', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_NEGATIVEX', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_NEGATIVEY', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_NEGATIVEZ'], dirtyVal: []},
        {type: 'object', normalVal: ['eval:demicm.texture'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    framebufferRenderbuffer: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.FRAMEBUFFER'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.COLOR_ATTACHMENT0', 'eval:demicm.webgl.DEPTH_ATTACHMENT', 'eval:demicm.webgl.STENCIL_ATTACHMENT'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.RENDERBUFFER'], dirtyVal: []},
        {type: 'object', normalVal: ['eval:demicm.renderbuffer'], dirtyVal: []},
    ],
    isFramebuffer: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.framebuffer'], dirtyVal: []},
    ],
    deleteFramebuffer: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.framebuffer'], dirtyVal: []},
    ],
    bindFramebuffer: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.FRAMEBUFFER'], dirtyVal: []},
		{type: 'object', normalVal: ['eval:demicm.framebuffer'], dirtyVal: []},
    ],
    bindRenderbuffer: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.RENDERBUFFER'], dirtyVal: []},
		{type: 'object', normalVal: ['eval:demicm.renderbuffer'], dirtyVal: []},

    ],
    copyTexSubImage2D: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_2D', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_POSITIVEX', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_POSITIVEY', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_POSITIVEZ', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_NEGATIVEX', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_NEGATIVEY', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_NEGATIVEZ'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    copyTexImage2D: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_2D', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_POSITIVEX', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_POSITIVEY', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_POSITIVEZ', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_NEGATIVEX', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_NEGATIVEY', 'eval:demicm.webgl.TEXTURE_CUBE_MAP_NEGATIVEZ'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: ['eval:demicm.webgl.ALPHA', 'eval:demicm.webgl.LUMINANCE', 'eval:demicm.webgl.LUMINANCE_ALPHA', 'eval:demicm.webgl.RGB', 'eval:demicm.webgl.RGBA'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    generateMipmap: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_2D', 'eval:demicm.webgl.TEXTURE_CUBE_MAP'], dirtyVal: []},
    ],
    isTexture: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.texture'], dirtyVal: []},
    ],
    deleteTexture: [
		{type: ''},
		{type: 'object', normalVal: ['eval:demicm.texture'], dirtyVal: []},
    ],
    createTexture: [
		{type: 'object'},
    ],
    texParameteri: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_2D', 'eval:demicm.webgl.TEXTURE_CUBE_MAP'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_WRAP_S', 'eval:demicm.webgl.TEXTURE_WRAP_T', 'eval:demicm.webgl.TEXTURE_MIN_FILTER', 'eval:demicm.webgl.TEXTURE_MAG_FILTER'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    texParameterf: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_2D', 'eval:demicm.webgl.TEXTURE_CUBE_MAP'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_WRAP_S', 'eval:demicm.webgl.TEXTURE_WRAP_T', 'eval:demicm.webgl.TEXTURE_MIN_FILTER', 'eval:demicm.webgl.TEXTURE_MAG_FILTER'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    getTexParameter: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_2D', 'eval:demicm.webgl.TEXTURE_CUBE_MAP'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_WRAP_S', 'eval:demicm.webgl.TEXTURE_WRAP_T', 'eval:demicm.webgl.TEXTURE_MIN_FILTER', 'eval:demicm.webgl.TEXTURE_MAG_FILTER'], dirtyVal: []},
    ],
    enable: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.BLEND', 'eval:demicm.webgl.CULL_FACE', 'eval:demicm.webgl.DEPTH_TEST', 'eval:demicm.webgl.DITHER', 'eval:demicm.webgl.POLYGON_OFFSET_FILL', 'eval:demicm.webgl.SAMPLE_ALPHA_TO_COVERAGE', 'eval:demicm.webgl.SAMPLE_COVERAGE', 'eval:demicm.webgl.SCISSOR_TEST', 'eval:demicm.webgl.STENCIL_TEST'], dirtyVal: []},
    ],
    pixelStorei: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.UNPACK_ALIGNMENT', 'eval:demicm.webgl.PACK_ALIGNMENT', 'eval:demicm.webgl.UNPACK_FLIP_Y_WEBGL', 'eval:demicm.webgl.UNPACK_PREMUTIPLY_ALPHA_WEBGL', 'eval:demicm.webgl.UNPACK_COLORSPACE_CONVERSION_WEBGL'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    isEnabled: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.BLEND', 'eval:demicm.webgl.CULL_FACE', 'eval:demicm.webgl.DEPTH_TEST', 'eval:demicm.webgl.DITHER', 'eval:demicm.webgl.POLYGON_OFFSET_FILL', 'eval:demicm.webgl.SAMPLE_ALPHA_TO_COVERAGE', 'eval:demicm.webgl.SAMPLE_COVERAGE', 'eval:demicm.webgl.SCISSOR_TEST', 'eval:demicm.webgl.STENCIL_TEST'], dirtyVal: []},
    ],
    disable: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.BLEND', 'eval:demicm.webgl.CULL_FACE', 'eval:demicm.webgl.DEPTH_TEST', 'eval:demicm.webgl.DITHER', 'eval:demicm.webgl.POLYGON_OFFSET_FILL', 'eval:demicm.webgl.SAMPLE_ALPHA_TO_COVERAGE', 'eval:demicm.webgl.SAMPLE_COVERAGE', 'eval:demicm.webgl.SCISSOR_TEST', 'eval:demicm.webgl.STENCIL_TEST'], dirtyVal: []},
    ],
    getError: [
		{type: 'number'},
    ],
    hint: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.GENERATE_MIPMAP_HINT'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.FASTEST', 'eval:demicm.webgl.NICEST', 'eval:demicm.webgl.DONT_CARE'], dirtyVal: []},
    ],
    flush: [
		{type: ''},
    ],
    finish: [
		{type: ''},
    ],
    createRenderbuffer: [
		{type: 'object'},
    ],
    getContextAttributes: [
		{type: 'object'},
    ],
    bindTexture: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.TEXTURE_2D', 'eval:demicm.webgl.TEXTURE_CUBE_MAP'], dirtyVal: []},
		{type: 'object', normalVal: ['eval:demicm.texture'], dirtyVal: []},
    ],
    drawElements: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.POINTS', 'eval:demicm.webgl.LINE_STRIP', 'eval:demicm.webgl.LINE_LOOP', 'eval:demicm.webgl.LINES', 'eval:demicm.webgl.TRIANGLE_STRIP', 'eval:demicm.webgl.TRIANGLE_FAN', 'eval:demicm.webgl.TRIANGLES'], dirtyVal: []},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: ['eval:demicm.webgl.UNSIGNED_BYTE', 'eval:demicm.webgl.UNSIGNED_SHORT'], dirtyVal: []},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    drawArrays: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.POINTS', 'eval:demicm.webgl.LINE_STRIP', 'eval:demicm.webgl.LINE_LOOP', 'eval:demicm.webgl.LINES', 'eval:demicm.webgl.TRIANGLE_STRIP', 'eval:demicm.webgl.TRIANGLE_FAN', 'eval:demicm.webgl.TRIANGLES'], dirtyVal: []},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    blendColor: [
		{type: ''},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.smallNum, dirtyVal: demicm.dirtyNum},
    ],
    blendEquation: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.FUNC_ADD', 'eval:demicm.webgl.FUNC_SUBTRACT', 'eval:demicm.webgl.FUNC_REVERSE_SUBTRACT'], dirtyVal: []},
    ],
    blendEquationSeparate: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.FUNC_ADD', 'eval:demicm.webgl.FUNC_SUBTRACT', 'eval:demicm.webgl.FUNC_REVERSE_SUBTRACT'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.FUNC_ADD', 'eval:demicm.webgl.FUNC_SUBTRACT', 'eval:demicm.webgl.FUNC_REVERSE_SUBTRACT'], dirtyVal: []},
    ],
    blendFunc: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.ZERO', 'eval:demicm.webgl.ONE', 'eval:demicm.webgl.SRC_COLOR', 'eval:demicm.webgl.ONE_MINUX_SRC_COLOR', 'eval:demicm.webgl.DST_COLOR', 'eval:demicm.webgl.ONE_MINUX_DST_COLOR', 'eval:demicm.webgl.SRC_ALPHA', 'eval:demicm.webgl.ONE_MINUX_SRC_ALPHA', 'eval:demicm.webgl.DST_ALPHA', 'eval:demicm.webgl.ONE_MINUX_DST_ALPHA', 'eval:demicm.webgl.CONSTANT_ALPHA', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_ALPHA', 'eval:demicm.webgl.CONSTANT_COLOR', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_COLOR', 'eval:demicm.webgl.SRC_ALPHA_SATURATE'], dirtyVal: ['eval:demicm.webgl.SRC_ALPHA_SATURATE']},
		{type: 'number', normalVal: ['eval:demicm.webgl.ZERO', 'eval:demicm.webgl.ONE', 'eval:demicm.webgl.SRC_COLOR', 'eval:demicm.webgl.ONE_MINUX_SRC_COLOR', 'eval:demicm.webgl.DST_COLOR', 'eval:demicm.webgl.ONE_MINUX_DST_COLOR', 'eval:demicm.webgl.SRC_ALPHA', 'eval:demicm.webgl.ONE_MINUX_SRC_ALPHA', 'eval:demicm.webgl.DST_ALPHA', 'eval:demicm.webgl.ONE_MINUX_DST_ALPHA', 'eval:demicm.webgl.CONSTANT_ALPHA', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_ALPHA', 'eval:demicm.webgl.CONSTANT_COLOR', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_COLOR'], dirtyVal: []},
    ],
    blendFuncSeparate: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.ZERO', 'eval:demicm.webgl.ONE', 'eval:demicm.webgl.SRC_COLOR', 'eval:demicm.webgl.ONE_MINUX_SRC_COLOR', 'eval:demicm.webgl.DST_COLOR', 'eval:demicm.webgl.ONE_MINUX_DST_COLOR', 'eval:demicm.webgl.SRC_ALPHA', 'eval:demicm.webgl.ONE_MINUX_SRC_ALPHA', 'eval:demicm.webgl.DST_ALPHA', 'eval:demicm.webgl.ONE_MINUX_DST_ALPHA', 'eval:demicm.webgl.CONSTANT_ALPHA', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_ALPHA', 'eval:demicm.webgl.CONSTANT_COLOR', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_COLOR', 'eval:demicm.webgl.SRC_ALPHA_SATURATE'], dirtyVal: ['eval:demicm.webgl.SRC_ALPHA_SATURATE']},
		{type: 'number', normalVal: ['eval:demicm.webgl.ZERO', 'eval:demicm.webgl.ONE', 'eval:demicm.webgl.SRC_COLOR', 'eval:demicm.webgl.ONE_MINUX_SRC_COLOR', 'eval:demicm.webgl.DST_COLOR', 'eval:demicm.webgl.ONE_MINUX_DST_COLOR', 'eval:demicm.webgl.SRC_ALPHA', 'eval:demicm.webgl.ONE_MINUX_SRC_ALPHA', 'eval:demicm.webgl.DST_ALPHA', 'eval:demicm.webgl.ONE_MINUX_DST_ALPHA', 'eval:demicm.webgl.CONSTANT_ALPHA', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_ALPHA', 'eval:demicm.webgl.CONSTANT_COLOR', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_COLOR'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.ZERO', 'eval:demicm.webgl.ONE', 'eval:demicm.webgl.SRC_COLOR', 'eval:demicm.webgl.ONE_MINUX_SRC_COLOR', 'eval:demicm.webgl.DST_COLOR', 'eval:demicm.webgl.ONE_MINUX_DST_COLOR', 'eval:demicm.webgl.SRC_ALPHA', 'eval:demicm.webgl.ONE_MINUX_SRC_ALPHA', 'eval:demicm.webgl.DST_ALPHA', 'eval:demicm.webgl.ONE_MINUX_DST_ALPHA', 'eval:demicm.webgl.CONSTANT_ALPHA', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_ALPHA', 'eval:demicm.webgl.CONSTANT_COLOR', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_COLOR', 'eval:demicm.webgl.SRC_ALPHA_SATURATE'], dirtyVal: ['eval:demicm.webgl.SRC_ALPHA_SATURATE']},
		{type: 'number', normalVal: ['eval:demicm.webgl.ZERO', 'eval:demicm.webgl.ONE', 'eval:demicm.webgl.SRC_COLOR', 'eval:demicm.webgl.ONE_MINUX_SRC_COLOR', 'eval:demicm.webgl.DST_COLOR', 'eval:demicm.webgl.ONE_MINUX_DST_COLOR', 'eval:demicm.webgl.SRC_ALPHA', 'eval:demicm.webgl.ONE_MINUX_SRC_ALPHA', 'eval:demicm.webgl.DST_ALPHA', 'eval:demicm.webgl.ONE_MINUX_DST_ALPHA', 'eval:demicm.webgl.CONSTANT_ALPHA', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_ALPHA', 'eval:demicm.webgl.CONSTANT_COLOR', 'eval:demicm.webgl.ONE_MINUX_CONSTANT_COLOR'], dirtyVal: []},
    ],
    stencilFunc: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.NEVER', 'eval:demicm.webgl.ALWAYS', 'eval:demicm.webgl.LESS', 'eval:demicm.webgl.EQUAL', 'eval:demicm.webgl.LEQUAL', 'eval:demicm.webgl.GREATER', 'eval:demicm.webgl.GEQUAL', 'eval:demicm.webgl.NOTEQUAL'], dirtyVal: []},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
    ],
    depthFunc: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.NEVER', 'eval:demicm.webgl.ALWAYS', 'eval:demicm.webgl.LESS', 'eval:demicm.webgl.EQUAL', 'eval:demicm.webgl.LEQUAL', 'eval:demicm.webgl.GREATER', 'eval:demicm.webgl.GEQUAL', 'eval:demicm.webgl.NOTEQUAL'], dirtyVal: []},
    ],
    sampleCoverage: [
		{type: ''},
		{type: 'number', normalVal: demicm.normalNum, dirtyVal: demicm.dirtyNum},
		{type: 'boolean', normalVal: demicm.bool, dirtyVal: [false]},
    ],
    stencilOp: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.KEEP', 'eval:demicm.webgl.ZERO', 'eval:demicm.webgl.REPLACE', 'eval:demicm.webgl.INCR', 'eval:demicm.webgl.DECR', 'eval:demicm.webgl.INVERT', 'eval:demicm.webgl.INCR_WRAP', 'eval:demicm.webgl.DECR_WRAP'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.KEEP', 'eval:demicm.webgl.ZERO', 'eval:demicm.webgl.REPLACE', 'eval:demicm.webgl.INCR', 'eval:demicm.webgl.DECR', 'eval:demicm.webgl.INVERT', 'eval:demicm.webgl.INCR_WRAP', 'eval:demicm.webgl.DECR_WRAP'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.KEEP', 'eval:demicm.webgl.ZERO', 'eval:demicm.webgl.REPLACE', 'eval:demicm.webgl.INCR', 'eval:demicm.webgl.DECR', 'eval:demicm.webgl.INVERT', 'eval:demicm.webgl.INCR_WRAP', 'eval:demicm.webgl.DECR_WRAP'], dirtyVal: []},
    ],
    stencilOpSeparate: [
		{type: ''},
		{type: 'number', normalVal: ['eval:demicm.webgl.FRONT', 'eval:demicm.webgl.BACK', 'eval:demicm.webgl.FRONT_AND_BACK'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.KEEP', 'eval:demicm.webgl.ZERO', 'eval:demicm.webgl.REPLACE', 'eval:demicm.webgl.INCR', 'eval:demicm.webgl.DECR', 'eval:demicm.webgl.INVERT', 'eval:demicm.webgl.INCR_WRAP', 'eval:demicm.webgl.DECR_WRAP'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.KEEP', 'eval:demicm.webgl.ZERO', 'eval:demicm.webgl.REPLACE', 'eval:demicm.webgl.INCR', 'eval:demicm.webgl.DECR', 'eval:demicm.webgl.INVERT', 'eval:demicm.webgl.INCR_WRAP', 'eval:demicm.webgl.DECR_WRAP'], dirtyVal: []},
		{type: 'number', normalVal: ['eval:demicm.webgl.KEEP', 'eval:demicm.webgl.ZERO', 'eval:demicm.webgl.REPLACE', 'eval:demicm.webgl.INCR', 'eval:demicm.webgl.DECR', 'eval:demicm.webgl.INVERT', 'eval:demicm.webgl.INCR_WRAP', 'eval:demicm.webgl.DECR_WRAP'], dirtyVal: []},
    ],
};
/*
 * Author: demi6od <demi6d@gmail.com>
 * Date: 2013 Oct 21st
 * 
 * Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
 * - remove all dependencies of logger element
 */

demicm.styleBlackList = [ ];

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
        [demicm.str, 'url(' + demicm.URL + 'demicmImg.gif)', demicm.normalNum, 'open-quote', 'close-quote', 'no-open-quote', 'no-close-quote']],
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
    quotes: ['\'<\' \'>\'', '\'`\' \'`\''],
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
    textOverflow: ['clip', 'ellipsis', demicm.str],
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
