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
demicm.BROWSER = 'CM';

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
demicm.REF_TAG_PER = 35; // 40 Ref elem percent
demicm.TAG_PROP_NUM = 10; // 10
demicm.TAG_ORDER_PER = 50; // 50

// DOM Tree initial
demicm.INI_ELEM_NUM = 12; // Initial all elem number
demicm.REF_ELEM_PER = 35; // 40 Ref elem percent
demicm.BODY_RATIO = 5; 
demicm.HEAD_RATIO = 3; 
demicm.HTML_RATIO = 2; 
demicm.DANGLE_RATIO = 1; 

demicm.TEXT_NUM = 15; // TextNode number
demicm.REF_TEXT_PER = 10; // 15 ref elem percent

demicm.EVENT_NUM = 20; // 30 Event num for per elem
demicm.EVENT_ELEM_PER = 30; // 50 Elems percent to set event
demicm.FIRE_EVENT_PER = 5; // 5 | 10 

demicm.CALL_BACK_ELEM_PER = 20; // 20 | 30 Elems percent to set callback

demicm.CSS_DIVERSE_NUM = 3; // 3

demicm.PROP_STY_INI_NUM = 3; // 3

demicm.MULTI_ELEM_NUM = 5; // 5

// Operate number
demicm.FRONT_OP_CNT = 35; // 30 | 60
demicm.BACK_OP_CNT = 20; // 20 | 40
demicm.EVENT_OP_CNT = 10; // 10 | 20
demicm.CALL_BACK_OP_CNT = 8; // 8 | 20
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
demicm.EVENT_MAN_PER = 60; // 60 | 80
demicm.EVENT_OP_PER = 50; // 50 | 60
demicm.EVENT_CLEAR_PER = 60; // 60 | 80
demicm.EVENT_CLEAR_ALL_PER = 20; // 20 | 30

// Callback
demicm.CALL_BACK_OP_PER = 50; // 50 | 60
demicm.CALL_BACK_CLEAR_PER = 60; // 60 | 80
demicm.CALL_BACK_CLEAR_ALL_PER = 20; // 20 | 30

demicm.CALL_BACK_JS_OP_PER = 80; // 80 | 100
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

    try {
        appendSpecElem();
    } catch(e) {
        logger.log('// Error: appendSpecElem: ' + e.message, 'grind', 1);
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
        logger.log('id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ' = document.createAttribute("' + rStr + '");', 'grind', 1);
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
    logger = new LOGGER('01');
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
            for (i = 0; i < 100000; i++) {
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
            + 'window.location.href = window.location.protocol + "//" + window.location.host + "/grinder";\', 200);}', 100);
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
            + 'window.location.href = window.location.protocol + "//" + window.location.host + "/grinder";\', 200);}', 200);
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
    window.location.href = window.location.protocol + "//" + window.location.host + "/grinder";
}

