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
        writeFileCM("fuzzlog",'id_' + (demicm.niId + demicm.SPEC_OFFSET) 
            + ' = document.createNodeIterator(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);');
        idS[demicm.niId] = document.createNodeIterator(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: constructNodeIterator: ' + e.message);
    }
}

function constructTreeWalker() {
    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        writeFileCM("fuzzlog",'id_' + (demicm.twId + demicm.SPEC_OFFSET) 
            + ' = document.createTreeWalker(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);');
        idS[demicm.twId] = document.createTreeWalker(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: constructTreeWalker: ' + e.message);
    }
}

function constructRange() {
    try {
        writeFileCM("fuzzlog",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ' = document.createRange();');
        idS[demicm.rangeId] = document.createRange();

        setRange();
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: constructRange: ' + e.message);
    }
}

function setRange() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] setRange()');
    }

    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        writeFileCM("fuzzlog",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setStart(id_' + rId + ', 0);');
        idS[demicm.rangeId].setStart(id[rId], 0);

        rId = randId();
        if (rId == 'none') {
            return;
        }
        writeFileCM("fuzzlog",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setEnd(id_' + rId + ', 0);');
        idS[demicm.rangeId].setEnd(id[rId], 0);
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: setRange: ' + e.message);
    }
}

function constructSelection() {
    try {
        writeFileCM("fuzzlog",'id_' + (demicm.selId + demicm.SPEC_OFFSET) + ' = window.getSelection();');
        idS[demicm.selId] = window.getSelection();

        setSelection();
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: constructSelection: ' + e.message);
    }
}

function setSelection() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] setSelection()');
    }

    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        writeFileCM("fuzzlog",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.selectNodeContents(id_' + rId + ');');
        idS[demicm.rangeId].selectNodeContents(id[rId]);

        writeFileCM("fuzzlog",'id_' + (demicm.selId + demicm.SPEC_OFFSET) + '.removeAllRanges();');
        idS[demicm.selId].removeAllRanges();

        writeFileCM("fuzzlog",'id_' + (demicm.selId + demicm.SPEC_OFFSET) 
            + '.addRange(id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ');');
        idS[demicm.selId].addRange(idS[demicm.rangeId]);
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: setSelection: ' + e.message);
    }
}

function nodeIteration() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] nodeIteration()');
    }

    try {
        // Fuzz current node
        writeFileCM("fuzzlog",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.referenceNode;');
        idS[demicm.curItrNodeId] = idS[demicm.niId].referenceNode;

        if (idS[demicm.curItrNodeId]) {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        writeFileCM("fuzzlog",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.root;');
        idS[demicm.curItrNodeId] = idS[demicm.niId].root;

        var count = 0;
        while (idS[demicm.curItrNodeId] && count++ < demicm.MAX_ITR)  {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            writeFileCM("fuzzlog",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();');
            idS[demicm.curItrNodeId] = idS[demicm.niId].nextNode();
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: nodeIteration: ' + e.message);
    }
}

function treeIteration() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] treeIteration()');
    }

    try {
        // Fuzz current node
        writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.currentNode;');
        idS[demicm.curTreeNodeId] = idS[demicm.twId].currentNode;

        if (idS[demicm.curTreeNodeId]) {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.root;');
        idS[demicm.curTreeNodeId] = idS[demicm.twId].root;

        var count = 0;
        while (idS[demicm.curTreeNodeId] && count++ < demicm.MAX_ITR)  {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                    + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();');
            idS[demicm.curTreeNodeId] = idS[demicm.twId].nextNode();
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: treeIteration: ' + e.message);
    }
}

function moveIterator() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] moveIterator()');
    }

    try {
        var rMoves = rand(3) + 1;
        for (var i = 0; i < rMoves; i++) {
            switch (rand(2)) {
                case 0:
                    writeFileCM("fuzzlog",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();');
                    idS[demicm.curItrNodeId] = idS[demicm.niId].nextNode();
                    break;
                case 1:
                    writeFileCM("fuzzlog",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.previousNode();');
                    idS[demicm.curItrNodeId] = idS[demicm.niId].previousNode();
                    break;
                default:
                    writeFileCM("fuzzlog",'// Warning: moveIterator default');
                    break;
            }

            propfMan([demicm.niId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curItrNodeId]) {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: moveIterator: ' + e.message);
    }
}

function moveTreeWalker() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] moveTreeWalker()');
    }

    try {
        var rMoves = rand(3) + 1;
        for (var i = 0; i < rMoves; i++) {
            switch (rand(7)) {
                case 0:
                    writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].nextNode();
                    break;
                case 1:
                    writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousNode();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].previousNode();
                    break;
                case 2:
                    writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousSibling();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].previousSibling();
                    break;
                case 3:
                    writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextSibling();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].nextSibling();
                    break;
                case 4:
                    writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.firstChild();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].firstChild();
                    break;
                case 5:
                    writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.lastChild();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].lastChild();
                    break;
                case 6:
                    writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.parentNode();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].parentNode();
                    break;	
                default:
                    writeFileCM("fuzzlog",'// Warning: moveTreeWalker default');
                    break;
            }

            propfMan([demicm.twId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curTreeNodeId]) {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: moveTreeWalker: ' + e.message);
    }
}		

function alterRange() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] alterRange()');
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
                writeFileCM("fuzzlog",'var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.cloneContents();');
                var documentFragment = idS[demicm.rangeId].cloneContents();

                writeFileCM("fuzzlog",'id_' + rId + '.appendChild(documentFragment);');
                id[rId].appendChild(documentFragment);

                writeFileCM("fuzzlog",'documentFragment = null;');
                break;
            case 1:
                writeFileCM("fuzzlog",'var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.extractContents();');
                var documentFragment = idS[demicm.rangeId].extractContents();

                writeFileCM("fuzzlog",'id_' + rId + '.appendChild(documentFragment);');
                id[rId].appendChild(documentFragment);

                writeFileCM("fuzzlog",'documentFragment = null;');
                break;
            case 2:
                var rHTMLCode = randHTMLCode(0x10, 5);
                writeFileCM("fuzzlog",'var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) 
                    + '.createContextualFragment("' + rHTMLCode + '");');
                var documentFragment = idS[demicm.rangeId].createContextualFragment(rHTMLCode);

                writeFileCM("fuzzlog",'id_' + rId + '.appendChild(documentFragment);');
                id[rId].appendChild(documentFragment);

                writeFileCM("fuzzlog",'documentFragment = null;');
                break;
            case 3:
                writeFileCM("fuzzlog",'var rangeCache = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.cloneRange();');
                var rangeCache = idS[demicm.rangeId].cloneRange();

                var type = randItem(['START_TO_START', 'END_TO_END', 'START_TO_END', 'END_TO_START']);
                writeFileCM("fuzzlog",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) 
                    + '.compareBoundaryPoints(Range.' + type + ', rangeCache);');
                eval('idS[demicm.rangeId].compareBoundaryPoints(Range.' + type + ', rangeCache);');

                writeFileCM("fuzzlog",'rangeCache.detach();');
                rangeCache.detach();

                writeFileCM("fuzzlog",'rangeCache = null;');
                break;						

            default:
                writeFileCM("fuzzlog",'// Warning: alterRange default');
                break;
        }		
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: alterRange: ' + e.message);
    }
}

function alterSelection() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] alterSelection()');
    }

    try {
        // Execute command on selection
        var cmd = randItem(demicm.commands);
        writeFileCM("fuzzlog",'document.execCommand(' +  cmd + ');');
        eval('document.execCommand(' +  cmd + ');');

        propfMan([demicm.selId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.selId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

        if (percent(20)) {
            writeFileCM("fuzzlog",'id_' + (demicm.selId + demicm.SPEC_OFFSET) 
                + '.addRange(id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ');');
            idS[demicm.selId].addRange(idS[demicm.rangeId]);
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: alterSelection: ' + e.message);
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
        writeFileCM("fuzzlog",'[+] reuseGroup()');
    }

    try {
        nodeIteration();
        writeFileCM("fuzzlog",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.curItrNodeId] = null;
        writeFileCM("fuzzlog",'id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.detach();');
        idS[demicm.niId].detach();
        writeFileCM("fuzzlog",'id_' + (demicm.niId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.niId] = null;
        writeFileCM("fuzzlog",'gc();');
        // gc();

        treeIteration();
        writeFileCM("fuzzlog",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.curTreeNodeId] = null;
        writeFileCM("fuzzlog",'id_' + (demicm.twId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.twId] = null;
        writeFileCM("fuzzlog",'gc();');
        // gc();

        alterRange();
        writeFileCM("fuzzlog",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.detach();');
        idS[demicm.rangeId].detach();
        writeFileCM("fuzzlog",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.rangeId] = null;
        writeFileCM("fuzzlog",'gc();');
        // gc();

        alterSelection();
        writeFileCM("fuzzlog",'id_' + (demicm.selId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.selId] = null;
        writeFileCM("fuzzlog",'gc();');
        // gc();
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: reuseGroup: ' + e.message);
    }
}

function objMan(type) {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] objMan(' + type + ')');
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
        writeFileCM("fuzzlog",'[+] setProp()');
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
        writeFileCM("fuzzlog",'// Error: setPropStyle: ' + e.message);
    }
}

function setEnv() {
    // Set HTML property
    if (percent(demicm.ENV_PER)) {
        writeFileCM("fuzzlog",'document.documentElement.contentEditable = "true";');
        document.documentElement.contentEditable = 'true';
        writeFileCM("fuzzlog",'document.body.contentEditable = "true";');
        document.body.contentEditable = 'true';
        writeFileCM("fuzzlog",'document.head.contentEditable = "true";');
        document.head.contentEditable = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        writeFileCM("fuzzlog",'document.documentElement.dir = "rtl";');
        document.documentElement.dir = 'rtl';
        writeFileCM("fuzzlog",'document.body.dir = "rtl";');
        document.body.dir = 'rtl';
        writeFileCM("fuzzlog",'document.head.dir = "rtl";');
        document.head.dir = 'rtl';
    }

    if (percent(demicm.ENV_PER)) {
        writeFileCM("fuzzlog",'document.documentElement.draggable = "true";');
        document.documentElement.draggable = 'true';
        writeFileCM("fuzzlog",'document.body.draggable = "true";');
        document.body.draggable = 'true';
        writeFileCM("fuzzlog",'document.head.draggable = "true";');
        document.head.draggable = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        writeFileCM("fuzzlog",'document.documentElement.spellcheck = "true";');
        document.documentElement.spellcheck = 'true';
        writeFileCM("fuzzlog",'document.body.spellcheck = "true";');
        document.body.spellcheck = 'true';
        writeFileCM("fuzzlog",'document.head.spellcheck = "true";');
        document.head.spellcheck = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        writeFileCM("fuzzlog",'document.documentElement.translate = "true";');
        document.documentElement.translate = 'true';
        writeFileCM("fuzzlog",'document.body.translate = "true";');
        document.body.translate = 'true';
        writeFileCM("fuzzlog",'document.head.translate = "true";');
        document.head.translate = 'true';
    }

    // Clear body onload event
    writeFileCM("fuzzlog",'document.body.onload = null;');
    document.body.onload = null;

    // Set at least one idR item for propfMan
    writeFileCM("fuzzlog",'var id_' + demicm.RET_OFFSET + ' = null;');
    idR[0] = null;

    if ((demicm.BROWSER == 'CM' || demicm.BROWSER == 'FF') && percent(demicm.DES_PER)) {
        writeFileCM("fuzzlog",'document.designMode = "on";');
        document.designMode = 'on';
    }

    // Set props and funcs cache
    getPropAndFunc();
}

function eventHandler() {
    if (percent(demicm.EVENT_MAN_PER)) {
        writeFileCM("fuzzlog",'id_' + (demicm.evtId + demicm.SPEC_OFFSET) + ' = arguments[0];');
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

    writeFileCM("fuzzlog",'/-};');
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
                    id[i][rEvt] = new Function('writeFileCM("fuzzlog","//id_' + i 
                        + '[\'' + rEvt + '\'] = function()");writeFileCM("fuzzlog","/-{");eventHandler();');
                }
            }
        } catch (e) {
            writeFileCM("fuzzlog",'// Error: setEvtHandler: ' + e.message);
        }
    }
}

function callBackJs() {
    writeFileCM("fuzzlog",'//callBackJs = function()');
    writeFileCM("fuzzlog",'/-{');

    if (percent(demicm.CALL_BACK_JS_OP_PER)) {
        operate(demicm.CALL_BACK_JS_OP_CNT);
    }

    if (percent(demicm.CALL_BACK_JS_CLEAR_PER)) {
        clearSub();
    }

    if (percent(demicm.CALL_BACK_JS_CLEAR_ALL_PER)) {
        clearAll();
    }

    writeFileCM("fuzzlog",'/-};');
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

    writeFileCM("fuzzlog",'/-};');
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

        id[i].toString = new Function('writeFileCM("fuzzlog","//id_' + i 
            + '.toString = function()");writeFileCM("fuzzlog","/-{");callBack();');
        id[i].toLocalString = new Function('writeFileCM("fuzzlog","//id_' + i 
            + '.toLocalString = function()");writeFileCM("fuzzlog","/-{");callBack();');
        id[i].valueOf = new Function('writeFileCM("fuzzlog","//id_' + i 
            + '.valueOf = function()");writeFileCM("fuzzlog","/-{");callBack();');
    }
}

function addTextNode() {
    for (var i = 0; i < demicm.TEXT_NUM; i++) {
        try {
            var rStr = randStr(rand(0x100)); 
            var rId = randId(true);

            if (percent(demicm.REF_TEXT_PER)) {
                // Add ref textNode 
                writeFileCM("fuzzlog",'id_' + id.length + ' = document.createTextNode("' + rStr + '");');
                id[id.length] = document.createTextNode(rStr);
                writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
                id[id.length - 1].id = id.length - 1;

                writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
                id[rId].appendChild(id[id.length - 1]);
            } else {
                // Add no ref textNode 
                writeFileCM("fuzzlog",'id_' + rId + '.appendChild(document.createTextNode("' + rStr + '"));');
                id[rId].appendChild(document.createTextNode(rStr));
            }
        } catch (e) {
            writeFileCM("fuzzlog",'// Error: addTextNode: ' + e.message);
        }
    }
}

function appendForm(rId, rTxt) {
    // Add form
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("form");');
    id[id.length] = document.createElement('form');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var formId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add input text
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "text";');
    id[id.length - 1].type = 'text';
    var inputTextId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add label
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("label");');
    id[id.length] = document.createElement('label');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.htmlFor = ' + inputTextId + ';');
    id[id.length - 1].htmlFor = inputTextId;

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add input password
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "password";');
    id[id.length - 1].type = 'password';

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input checkbox
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "checkbox";');
    id[id.length - 1].type = 'checkbox';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.name = "checkbox";');
    id[id.length - 1].name = 'checkbox';

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "checkbox";');
    id[id.length - 1].type = 'checkbox';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.name = "checkbox";');
    id[id.length - 1].name = 'checkbox';

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input submit
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "submit";');
    id[id.length - 1].type = 'submit';

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input range
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "range";');
    id[id.length - 1].type = 'range';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.min = 20;');
    id[id.length - 1].min = 20;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.max = 120;');
    id[id.length - 1].max = 120;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.step = 5;');
    id[id.length - 1].step = 5;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.value = 50;');
    id[id.length - 1].value = 50;

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input number
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "number";');
    id[id.length - 1].type = 'number';

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input email
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "email";');
    id[id.length - 1].type = 'email';

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input url
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "url";');
    id[id.length - 1].type = 'url';

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input search
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "search";');
    id[id.length - 1].type = 'search';

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    if (demicm.BROWSER == 'CM' || demicm.BROWSER == 'FF') {
        // Add input color
        writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "color";');
        id[id.length - 1].type = 'color';

        writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input datetime
        writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "datetime";');
        id[id.length - 1].type = 'datetime';

        writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input datetime-local
        writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "datetime-local";');
        id[id.length - 1].type = 'datetime-local';

        writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input time
        writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "time";');
        id[id.length - 1].type = 'time';

        writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input date
        writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "date";');
        id[id.length - 1].type = 'date';

        writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input week
        writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "week";');
        id[id.length - 1].type = 'week';

        writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input month
        writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "month";');
        id[id.length - 1].type = 'month';

        writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);
    }

    // Add input number
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "number";');
    id[id.length - 1].type = 'number';

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input tel
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "tel";');
    id[id.length - 1].type = 'tel';

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add output
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("output");');
    id[id.length] = document.createElement('output');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add keygen
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("keygen");');
    id[id.length] = document.createElement('keygen');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add fieldset
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("fieldset");');
    id[id.length] = document.createElement('fieldset');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var fieldsetId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add legend
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("legend");');
    id[id.length] = document.createElement('legend');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add input button
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "button";');
    id[id.length - 1].type = 'button';

    writeFileCM("fuzzlog",'id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);

    // Add input radio
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "radio";');
    id[id.length - 1].type = 'radio';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.name = "radio";');
    id[id.length - 1].name = 'radio';

    writeFileCM("fuzzlog",'id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);

    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "radio";');
    id[id.length - 1].type = 'radio';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.name = "radio";');
    id[id.length - 1].name = 'radio';

    writeFileCM("fuzzlog",'id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);

    // Add datalist
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("datalist");');
    id[id.length] = document.createElement('datalist');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var datalistId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add option
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("option");');
    id[id.length] = document.createElement('option');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + datalistId + '.appendChild(id_' + (id.length - 1) + ');');
    id[datalistId].appendChild(id[id.length - 1]);

    // Add option with no id
    writeFileCM("fuzzlog",'id_' + datalistId + '.appendChild(document.createElement("option"));');
    id[datalistId].appendChild(document.createElement('option'));
    writeFileCM("fuzzlog",'id_' + datalistId + '.appendChild(document.createElement("option"));');
    id[datalistId].appendChild(document.createElement('option'));

    // Add textarea
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("textarea");');
    id[id.length] = document.createElement('textarea');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add select
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("select");');
    id[id.length] = document.createElement('select');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var selId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add option
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("option");');
    id[id.length] = document.createElement('option');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + selId + '.appendChild(id_' + (id.length - 1) + ');');
    id[selId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add option with no id
    writeFileCM("fuzzlog",'id_' + selId + '.appendChild(document.createElement("option"));');
    id[selId].appendChild(document.createElement('option'));
    writeFileCM("fuzzlog",'id_' + selId + '.appendChild(document.createElement("option"));');
    id[selId].appendChild(document.createElement('option'));

    // Add optgroup
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("optgroup");');
    id[id.length] = document.createElement('optgroup');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var optgroupId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + selId + '.appendChild(id_' + (id.length - 1) + ');');
    id[selId].appendChild(id[id.length - 1]);

    // Add option
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("option");');
    id[id.length] = document.createElement('option');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + optgroupId + '.appendChild(id_' + (id.length - 1) + ');');
    id[optgroupId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add option with no id
    writeFileCM("fuzzlog",'id_' + optgroupId + '.appendChild(document.createElement("option"));');
    id[optgroupId].appendChild(document.createElement('option'));
    writeFileCM("fuzzlog",'id_' + optgroupId + '.appendChild(document.createElement("option"));');
    id[optgroupId].appendChild(document.createElement('option'));
}

function appendList(rId, rTxt) {
    // Add ol
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("ol");');
    id[id.length] = document.createElement('ol');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var olId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add li
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("li");');
    id[id.length] = document.createElement('li');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + olId + '.appendChild(id_' + (id.length - 1) + ');');
    id[olId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add li with no id
    writeFileCM("fuzzlog",'id_' + olId + '.appendChild(document.createElement("li"));');
    id[olId].appendChild(document.createElement('li'));
    writeFileCM("fuzzlog",'id_' + olId + '.appendChild(document.createElement("li"));');
    id[olId].appendChild(document.createElement('li'));

    // Add ul
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("ul");');
    id[id.length] = document.createElement('ul');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var ulId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add li
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("li");');
    id[id.length] = document.createElement('li');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + ulId + '.appendChild(id_' + (id.length - 1) + ');');
    id[ulId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add li with no id
    writeFileCM("fuzzlog",'id_' + ulId + '.appendChild(document.createElement("li"));');
    id[ulId].appendChild(document.createElement('li'));
    writeFileCM("fuzzlog",'id_' + ulId + '.appendChild(document.createElement("li"));');
    id[ulId].appendChild(document.createElement('li'));

    // Add dl
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("dl");');
    id[id.length] = document.createElement('dl');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var dlId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add dt
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("dt");');
    id[id.length] = document.createElement('dt');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + dlId + '.appendChild(id_' + (id.length - 1) + ');');
    id[dlId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add dd
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("dd");');
    id[id.length] = document.createElement('dd');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + dlId + '.appendChild(id_' + (id.length - 1) + ');');
    id[dlId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add dt and dd with no id
    writeFileCM("fuzzlog",'id_' + dlId + '.appendChild(document.createElement("dt"));');
    id[dlId].appendChild(document.createElement('dt'));
    writeFileCM("fuzzlog",'id_' + dlId + '.appendChild(document.createElement("dd"));');
    id[dlId].appendChild(document.createElement('dd'));
    writeFileCM("fuzzlog",'id_' + dlId + '.appendChild(document.createElement("dt"));');
    id[dlId].appendChild(document.createElement('dt'));
    writeFileCM("fuzzlog",'id_' + dlId + '.appendChild(document.createElement("dd"));');
    id[dlId].appendChild(document.createElement('dd'));
}

function appendCanvas2D(rId, rTxt) {
    // Add canvas
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("canvas");');
    id[id.length] = document.createElement('canvas');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var canvasId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Get the 2D rendering context
    writeFileCM("fuzzlog",'id_' + (demicm.canvas2dId + demicm.SPEC_OFFSET) + ' = id_' + canvasId + '.getContext("2d");');
    idS[demicm.canvas2dId] = id[canvasId].getContext('2d');
}

function appendWebGL(rId, rTxt) {
    // Add canvas
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("canvas");');
    id[id.length] = document.createElement('canvas');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var canvasId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Get the rendering context for WebGL
    writeFileCM("fuzzlog",'id_' + (demicm.webglId + demicm.SPEC_OFFSET) + ' = getWebGLContext(id_'+ canvasId + ');');
    idS[demicm.webglId] = getWebGLContext(id[canvasId]);
    writeFileCM("fuzzlog",'webgl = id_' + (demicm.webglId + demicm.SPEC_OFFSET) + ';');
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

    writeFileCM("fuzzlog",'vshader = webgl.createShader(webgl.VERTEX_SHADER);');
    demicm.vshader = demicm.webgl.createShader(demicm.webgl.VERTEX_SHADER);
    writeFileCM("fuzzlog",'fshader = webgl.createShader(webgl.FRAGMENT_SHADER);');
    demicm.fshader = demicm.webgl.createShader(demicm.webgl.FRAGMENT_SHADER);

    writeFileCM("fuzzlog",'webgl.program = createProgram(webgl, "' + demicm.VSHADER_SOURCE + '", "' + demicm.FSHADER_SOURCE + '");');
    demicm.webgl.program = createProgram(demicm.webgl, demicm.VSHADER_SOURCE, demicm.FSHADER_SOURCE);

    // Get attributes
    writeFileCM("fuzzlog",'webgl.program.u_ShadowMap = webgl.getUniformLocation(webgl.program, "u_ShadowMap");');
    demicm.webgl.program.u_ShadowMap = demicm.webgl.getUniformLocation(demicm.webgl.program, 'u_ShadowMap');

    writeFileCM("fuzzlog",'webgl.program.a_Position = webgl.getAttribLocation(webgl.program, "a_Position");');
    demicm.webgl.program.a_Position = demicm.webgl.getAttribLocation(demicm.webgl.program, 'a_Position');

    writeFileCM("fuzzlog",'webgl.program.a_Color = webgl.getAttribLocation(webgl.program, "a_Color");');
    demicm.webgl.program.a_Color = demicm.webgl.getAttribLocation(demicm.webgl.program, 'a_Color');

    writeFileCM("fuzzlog",'webgl.program.u_MvpMatrix = webgl.getUniformLocation(webgl.program, "u_MvpMatrix");');
    demicm.webgl.program.u_MvpMatrix = demicm.webgl.getUniformLocation(demicm.webgl.program, 'u_MvpMatrix');

    writeFileCM("fuzzlog",'webgl.program.u_MvpMatrixFromLight = webgl.getUniformLocation(webgl.program, "u_MvpMatrixFromLight");');
    demicm.webgl.program.u_MvpMatrixFromLight = demicm.webgl.getUniformLocation(demicm.webgl.program
            , 'u_MvpMatrixFromLight');

    // Create texture
    writeFileCM("fuzzlog",'var image = new Image();');
    var image = new Image();
    writeFileCM("fuzzlog",'texture = webgl.createTexture();');
    demicm.texture = demicm.webgl.createTexture();
    writeFileCM("fuzzlog",'webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, 1);');
    demicm.webgl.pixelStorei(demicm.webgl.UNPACK_FLIP_Y_WEBGL, 1);
    writeFileCM("fuzzlog",'webgl.activeTexture(webgl.TEXTURE0);');
    demicm.webgl.activeTexture(demicm.webgl.TEXTURE0);
    writeFileCM("fuzzlog",'webgl.bindTexture(webgl.TEXTURE_2D, null);');
    demicm.webgl.bindTexture(demicm.webgl.TEXTURE_2D, null);
    writeFileCM("fuzzlog",'webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGB, webgl.RGB, webgl.UNSIGNED_BYTE, null);');
    demicm.webgl.texImage2D(demicm.webgl.TEXTURE_2D, 0, demicm.webgl.RGB, demicm.webgl.RGB, demicm.webgl.UNSIGNED_BYTE, null);

    // Initialize view
    writeFileCM("fuzzlog",'framebuffer = webgl.createFramebuffer();');
    demicm.framebuffer = demicm.webgl.createFramebuffer();
    writeFileCM("fuzzlog",'webgl.bindFramebuffer(webgl.FRAMEBUFFER, null);');
    demicm.webgl.bindFramebuffer(demicm.webgl.FRAMEBUFFER, null);
    writeFileCM("fuzzlog",'webgl.viewport(0, 0, 240, 320);');
    demicm.webgl.viewport(0, 0, 240, 320);
    writeFileCM("fuzzlog",'webgl.useProgram(webgl.program);');
    demicm.webgl.useProgram(demicm.webgl.program);

    writeFileCM("fuzzlog",'webgl.clearColor(0, 0, 0, 1);');
    demicm.webgl.clearColor(0, 0, 0, 1);
    writeFileCM("fuzzlog",'webgl.enable(webgl.DEPTH_TEST);');
    demicm.webgl.enable(demicm.webgl.DEPTH_TEST);

    // Connect attributes to js
    writeFileCM("fuzzlog",'webgl.uniform1i(webgl.program.u_ShadowMap, 0);');
    demicm.webgl.uniform1i(demicm.webgl.program.u_ShadowMap, 0);

    writeFileCM("fuzzlog",'var viewProjMatrixFromLight = new Matrix4();');
    var viewProjMatrixFromLight = new Matrix4();
    writeFileCM("fuzzlog",'viewProjMatrixFromLight.setPerspective(70.0, 1, 1.0, 200.0);');
    viewProjMatrixFromLight.setPerspective(70.0, 1, 1.0, 200.0);
    writeFileCM("fuzzlog",'viewProjMatrixFromLight.lookAt(0, 7, 2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);');
    viewProjMatrixFromLight.lookAt(0, 7, 2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    writeFileCM("fuzzlog",'webgl.uniformMatrix4fv(webgl.program.u_MvpMatrix, false, viewProjMatrixFromLight.elements);');
    demicm.webgl.uniformMatrix4fv(demicm.webgl.program.u_MvpMatrix, false, viewProjMatrixFromLight.elements);

    writeFileCM("fuzzlog",'var viewProjMatrix = new Matrix4();');
    var viewProjMatrix = new Matrix4();
    writeFileCM("fuzzlog",'viewProjMatrix.setPerspective(45, 2, 1.0, 100.0);');
    viewProjMatrix.setPerspective(45, 2, 1.0, 100.0);
    writeFileCM("fuzzlog",'viewProjMatrix.lookAt(0.0, 7.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);');
    viewProjMatrix.lookAt(0.0, 7.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    writeFileCM("fuzzlog",'webgl.uniformMatrix4fv(webgl.program.u_MvpMatrixFromLight, false, viewProjMatrix.elements);');
    demicm.webgl.uniformMatrix4fv(demicm.webgl.program.u_MvpMatrixFromLight, false, viewProjMatrix.elements);

    writeFileCM("fuzzlog",'vertices = new Float32Array([-0.8, 3.5, 0.0,  0.8, 3.5, 0.0,  0.0, 3.5, 1.8]);');
    demicm.vertices = new Float32Array([-0.8, 3.5, 0.0,  0.8, 3.5, 0.0,  0.0, 3.5, 1.8]);
    writeFileCM("fuzzlog",'buffer1 = webgl.createBuffer();');
    demicm.buffer1 = demicm.webgl.createBuffer();
    writeFileCM("fuzzlog",'webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer1);');
    demicm.webgl.bindBuffer(demicm.webgl.ARRAY_BUFFER, demicm.buffer1);
    writeFileCM("fuzzlog",'webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);');
    demicm.webgl.bufferData(demicm.webgl.ARRAY_BUFFER, demicm.vertices, demicm.webgl.STATIC_DRAW);
    writeFileCM("fuzzlog",'webgl.vertexAttribPointer(webgl.program.a_Position,  3, webgl.FLOAT, false, 0, 0);');
    demicm.webgl.vertexAttribPointer(demicm.webgl.program.a_Position,  3, demicm.webgl.FLOAT, false, 0, 0);
    writeFileCM("fuzzlog",'webgl.enableVertexAttribArray(webgl.program.a_Position);');
    demicm.webgl.enableVertexAttribArray(demicm.webgl.program.a_Position);

    writeFileCM("fuzzlog",'colors = new Float32Array([1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.0, 0.0]);');
    demicm.colors = new Float32Array([1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.0, 0.0]);
    writeFileCM("fuzzlog",'buffer2 = webgl.createBuffer();');
    demicm.buffer2 = demicm.webgl.createBuffer();
    writeFileCM("fuzzlog",'webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer2);');
    demicm.webgl.bindBuffer(demicm.webgl.ARRAY_BUFFER, demicm.buffer2);
    writeFileCM("fuzzlog",'webgl.bufferData(webgl.ARRAY_BUFFER, colors, webgl.STATIC_DRAW);');
    demicm.webgl.bufferData(demicm.webgl.ARRAY_BUFFER, demicm.colors, demicm.webgl.STATIC_DRAW);
    writeFileCM("fuzzlog",'webgl.vertexAttribPointer(webgl.program.a_Color,  3, webgl.FLOAT, false, 0, 0);');
    demicm.webgl.vertexAttribPointer(demicm.webgl.program.a_Color,  3, demicm.webgl.FLOAT, false, 0, 0);
    writeFileCM("fuzzlog",'webgl.enableVertexAttribArray(webgl.program.a_Color);');
    demicm.webgl.enableVertexAttribArray(demicm.webgl.program.a_Color);

    writeFileCM("fuzzlog",'indices = new Uint8Array([0, 1, 2]);');
    demicm.indices = new Uint8Array([0, 1, 2]);
    writeFileCM("fuzzlog",'buffer3 = webgl.createBuffer();');
    demicm.buffer3 = demicm.webgl.createBuffer();
    writeFileCM("fuzzlog",'webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, buffer3);');
    demicm.webgl.bindBuffer(demicm.webgl.ELEMENT_ARRAY_BUFFER, demicm.buffer3);
    writeFileCM("fuzzlog",'webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, indices, webgl.STATIC_DRAW);');
    demicm.webgl.bufferData(demicm.webgl.ELEMENT_ARRAY_BUFFER, demicm.indices, demicm.webgl.STATIC_DRAW);

    writeFileCM("fuzzlog",'renderbuffer = webgl.createRenderbuffer();');
    demicm.renderbuffer = demicm.webgl.createRenderbuffer();

    // Draw
    drawWebgl();
}

function drawWebgl() {
    try {
        switch (rand(2)) {
            case 0:
                writeFileCM("fuzzlog",'webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_BYTE, 0);');
                demicm.webgl.drawElements(demicm.webgl.TRIANGLES, demicm.indices.length, demicm.webgl.UNSIGNED_BYTE, 0);
                break;
            case 1:
                writeFileCM("fuzzlog",'webgl.drawArrays(webgl.TRIANGLES, 0, indices.length);');
                demicm.webgl.drawArrays(demicm.webgl.TRIANGLES, 0, demicm.indices.length);
                break;
            default:
                writeFileCM("fuzzlog",'// Warning: drawWebgl default');
                break;
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: drawWebgl: ' + e.message);
    }
}

function appendNetwork(rId, rTxt) {
    try {
        // Add WebSocket
        writeFileCM("fuzzlog",'id_' + id.length + ' = new WebSocket("ws://127.0.0.1:8082/echo");');
        id[id.length] = new WebSocket('ws://127.0.0.1:8082/echo');
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;

        // Add XMLHttpRequest
        writeFileCM("fuzzlog",'id_' + id.length + ' = new XMLHttpRequest();');
        id[id.length] = new XMLHttpRequest();
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        var xhrId = id.length - 1;

        var rType = 'GET';
        var rAsyn = randItem([true, false]);
        writeFileCM("fuzzlog",'id_' + xhrId + '.open("' + rType + '", "http://127.0.0.1:8000", ' + rAsyn + ');');
        id[xhrId].open(rType, "http://127.0.0.1:8000", rAsyn);
        writeFileCM("fuzzlog",'id_' + xhrId + '.send("' + rTxt + '");');
        id[xhrId].send(rTxt);

        writeFileCM("fuzzlog",'id_' + id.length + ' = ' + 'id_' + xhrId + '.upload;');
        id[id.length] = id[xhrId].upload;
        writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: appendNetwork: ' + e.message);
    }
}

function appendStyle(rId, rTxt) {
    // Add style
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("style");');
    id[id.length] = document.createElement('style');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    var cssList = '';
    var tagList = randItem(demicm.idTags);
    for (var j = 0; j < demicm.idTags.length / 3; j++) {
        tagList += ', ' + randItem(demicm.idTags);
    }
    cssList += tagList + ' ' + randCSSText() + ' ';

    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.innerText = "' + cssList + '";');
    id[id.length - 1].innerText = cssList;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendTable(rId, rTxt) {
    // Add table
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("table");');
    id[id.length] = document.createElement('table');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var tabId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add caption
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("caption");');
    id[id.length] = document.createElement('caption');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add colgroup
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("colgroup");');
    id[id.length] = document.createElement('colgroup');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var colgId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add col
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("col");');
    id[id.length] = document.createElement('col');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.span = "2";');
    id[id.length - 1].span = '2';

    writeFileCM("fuzzlog",'id_' + colgId + '.appendChild(id_' + (id.length - 1) + ');');
    id[colgId].appendChild(id[id.length - 1]);

    // Add col with no id
    writeFileCM("fuzzlog",'id_' + colgId + '.appendChild(document.createElement("col"));');
    id[colgId].appendChild(document.createElement('col'));
    writeFileCM("fuzzlog",'id_' + colgId + '.appendChild(document.createElement("col"));');
    id[colgId].appendChild(document.createElement('col'));

    // Add thead
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("thead");');
    id[id.length] = document.createElement('thead');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var theadId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("tr");');
    id[id.length] = document.createElement('tr');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + theadId + '.appendChild(id_' + (id.length - 1) + ');');
    id[theadId].appendChild(id[id.length - 1]);

    // Add th
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("th");');
    id[id.length] = document.createElement('th');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + trId + '.appendChild(id_' + (id.length - 1) + ');');
    id[trId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add th with no id
    writeFileCM("fuzzlog",'id_' + trId + '.appendChild(document.createElement("th"));');
    id[trId].appendChild(document.createElement('th'));
    writeFileCM("fuzzlog",'id_' + trId + '.appendChild(document.createElement("th"));');
    id[trId].appendChild(document.createElement('th'));

    // Add tfoot
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("tfoot");');
    id[id.length] = document.createElement('tfoot');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var tfootId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("tr");');
    id[id.length] = document.createElement('tr');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + tfootId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tfootId].appendChild(id[id.length - 1]);

    // Add td
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("td");');
    id[id.length] = document.createElement('td');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + trId + '.appendChild(id_' + (id.length - 1) + ');');
    id[trId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add td with no id
    writeFileCM("fuzzlog",'id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));
    writeFileCM("fuzzlog",'id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));

    // Add tbody
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("tbody");');
    id[id.length] = document.createElement('tbody');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var tbodyId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("tr");');
    id[id.length] = document.createElement('tr');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + tbodyId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tbodyId].appendChild(id[id.length - 1]);

    // Add td
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("td");');
    id[id.length] = document.createElement('td');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileCM("fuzzlog",'id_' + trId + '.appendChild(id_' + (id.length - 1) + ');');
    id[trId].appendChild(id[id.length - 1]);
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add td with no id
    writeFileCM("fuzzlog",'id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));
    writeFileCM("fuzzlog",'id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));
}

function appendMap(rId, rTxt) {
    // Add map
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("map");');
    id[id.length] = document.createElement('map');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.name = "fuzzMap";');
    id[id.length - 1].name = 'fuzzMap';
    var mapId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add area
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("area");');
    id[id.length] = document.createElement('area');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.href = "demicmFuzz.html";');
    id[id.length - 1].href = 'demicmFuzz.html';

    writeFileCM("fuzzlog",'id_' + mapId + '.appendChild(id_' + (id.length - 1) + ');');
    id[mapId].appendChild(id[id.length - 1]);

    // Add area with no id
    writeFileCM("fuzzlog",'id_' + mapId + '.appendChild(document.createElement("area"));');
    id[mapId].appendChild(document.createElement('area'));
    writeFileCM("fuzzlog",'id_' + mapId + '.appendChild(document.createElement("area"));');
    id[mapId].appendChild(document.createElement('area'));

    // Add img
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("img");');
    id[id.length] = document.createElement('img');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.src = "demicmImg.gif";');
    id[id.length - 1].src = 'demicmImg.gif';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.useMap = "#fuzzMap";');
    id[id.length - 1].useMap = '#fuzzMap';

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendAudio(rId, rTxt) {
    // Add audio
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("audio");');
    id[id.length] = document.createElement('audio');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var audioId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add source
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("source");');
    id[id.length] = document.createElement('source');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.src = "demicmAudio.mp3";');
    id[id.length - 1].src = 'demicmAudio.mp3';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "audio/mp3";');
    id[id.length - 1].type = 'audio/mp3';

    writeFileCM("fuzzlog",'id_' + audioId + '.appendChild(id_' + (id.length - 1) + ');');
    id[audioId].appendChild(id[id.length - 1]);
}

function appendVideo(rId, rTxt) {
    // Add video
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("video");');
    id[id.length] = document.createElement('video');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    var videoId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add source
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("source");');
    id[id.length] = document.createElement('source');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.src = "demicmVideo.mp4";');
    id[id.length - 1].src = 'demicmVideo.mp4';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "video/mp4";');
    id[id.length - 1].type = 'video/mp4';

    writeFileCM("fuzzlog",'id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');');
    id[videoId].appendChild(id[id.length - 1]);

    // Add track
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("track");');
    id[id.length] = document.createElement('track');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.src = "demicmTrack.vtt";');
    id[id.length - 1].src = 'demicmTrack.vtt';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.kind = "sub";');
    id[id.length - 1].kind = 'sub';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.srclang = "en";');
    id[id.length - 1].srclang = 'en';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.label = "English";');
    id[id.length - 1].label = 'English';

    writeFileCM("fuzzlog",'id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');');
    id[videoId].appendChild(id[id.length - 1]);

    // Add object
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("object");');
    id[id.length] = document.createElement('object');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.data = "demicmVideo.mp4";');
    id[id.length - 1].data = 'demicmVideo.mp4';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    var objectId = id.length - 1;

    writeFileCM("fuzzlog",'id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');');
    id[videoId].appendChild(id[id.length - 1]);

    // Add embed
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("embed");');
    id[id.length] = document.createElement('embed');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.src = "demicmData.swf";');
    id[id.length - 1].src = 'demicmData.swf';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    writeFileCM("fuzzlog",'id_' + objectId + '.appendChild(id_' + (id.length - 1) + ');');
    id[objectId].appendChild(id[id.length - 1]);
}

function appendWorker() {
    // Add worker
    writeFileCM("fuzzlog",'id_' + id.length + ' = new Worker("demicmWorker.js");');
    id[id.length] = new Worker('demicmWorker.js');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var workerId = id.length - 1;

    // Add onmessage event
    var rClearId = randId();
    var rClearDOMId = randId(true, false, true);
    writeFileCM("fuzzlog",'id_' + workerId + '.onmessage = function () {try {id_' + rClearDOMId 
        + '.outerHTML = arguments[0].data;id_' + rClearId + '.outerText = arguments[0].data; } catch (e) {}};');
    id[workerId].onmessage = function () { 
        try {
            id[rClearDOMId].outerHTML = arguments[0].data; 
            id[rClearId].outerText = arguments[0].data; 
        } catch (e) {}
    };

    // Post message
    writeFileCM("fuzzlog",'id_' + workerId + '.postMessage("ping");'); 
    id[workerId].postMessage('ping'); 
}

function appendSharedWorker() {
    // Add shared worker
    writeFileCM("fuzzlog",'id_' + id.length + ' = new SharedWorker("demicmSharedWorker.js");');
    id[id.length] = new SharedWorker('demicmSharedWorker.js');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var workerId = id.length - 1;

    // Add onmessage event
    var rClearId = randId();
    var rClearDOMId = randId(true, false, true);
    writeFileCM("fuzzlog",'id_' + workerId + '.port.onmessage = function () {try {id_' + rClearDOMId 
        + '.outerHTML = arguments[0].data;id_' + rClearId + '.outerText = arguments[0].data; } catch (e) {}};');
    id[workerId].port.onmessage = function () { 
        try {
            id[rClearDOMId].outerHTML = arguments[0].data; 
            id[rClearId].outerText = arguments[0].data; 
        } catch (e) {}
    };

    // Post message
    writeFileCM("fuzzlog",'id_' + workerId + '.port.postMessage("ping");'); 
    id[workerId].port.postMessage('ping'); 
}

function appendSvg(rId, rTxt) {
    // Add embed svg
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("embed");');
    id[id.length] = document.createElement('embed');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.src = "demicmSvg.svg";');
    id[id.length - 1].src = 'demicmSvg.svg';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "image/svg+xml";');
    id[id.length - 1].type = 'image/svg+xml';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add img svg
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("img");');
    id[id.length] = document.createElement('img');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.src = "demicmSvg.svg";');
    id[id.length - 1].src = 'demicmSvg.svg';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "image/svg+xml";');
    id[id.length - 1].type = 'image/svg+xml';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendXml(rId, rTxt) {
    // Add xml
    writeFileCM("fuzzlog",'id_' + id.length + ' = document.createElement("embed");');
    id[id.length] = document.createElement('embed');
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.src = "demicmXml.xml";');
    id[id.length - 1].src = 'demicmXml.xml';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.type = "text/xml";');
    id[id.length - 1].type = 'text/xml';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendSpecElem() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] appendSpecElem()');
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
            writeFileCM("fuzzlog",'// Warning: appendSpecElem default');
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
            writeFileCM("fuzzlog",'// WebGL Crash: ' + e.message);
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
    writeFileCM("fuzzlog",'var rElem = document.createElement("' + rTag + '");');
    var rElem = document.createElement(rTag);
    var tagStr = '<' + rTag + ' ';

    if (percent(demicm.REF_TAG_PER)) {
        tagStr += 'id=' + id.length + ' ';
        if (type == 'body') {
            demicm.bodyIds.push(id.length);
        } else if (type == 'head') {
            demicm.headIds.push(id.length);
        } else {
            writeFileCM("fuzzlog",'// Warning: constructTag else');
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
        writeFileCM("fuzzlog",'id_' + insId + ' = document.createElement("' + rTag + '");');
        id[insId] = document.createElement(rTag);

        if (!percent(demicm.REF_ELEM_PER)) {
            noRefIds.push(insId);
        } else {
            writeFileCM("fuzzlog",'id_' + insId + '.id = ' + insId + ';');
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
            writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + insId + ');');
            id[rId].appendChild(id[insId]);
        }
    }

    for (var i = 0; i < noRefIds.length; i++) {
        writeFileCM("fuzzlog",'id_' + noRefIds[i] + ' = null;');
        id[noRefIds[i]] = null;
    }
}

function constructDOMTree() {
    // Add document, body, head to id[]
    demicm.idTags = ['body', 'head'];

    writeFileCM("fuzzlog",'id_0 = document.documentElement;');
    id[0] = document.documentElement; 
    writeFileCM("fuzzlog",'document.documentElement.id = 0;');
    document.documentElement.id = 0;
    
    writeFileCM("fuzzlog",'id_1 = document.head;');
    id[1] = document.head; 
    writeFileCM("fuzzlog",'document.head.id = 1;');
    document.head.id = 1;

    writeFileCM("fuzzlog",'id_2 = document.body;');
    id[2] = document.body; 
    writeFileCM("fuzzlog",'document.body.id = 2;');
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

    writeFileCM("fuzzlog",'document.body.innerHTML = "' + bodyTagStr.replace(/"/g, '\\"') + '";');
    document.body.innerHTML = bodyTagStr;

    writeFileCM("fuzzlog",'document.head.innerHTML = "' + headTagStr.replace(/"/g, '\\"') + '";');
    document.head.innerHTML = headTagStr;

    for (var i = 3; i < id.length; i++) {
        writeFileCM("fuzzlog",'id_' + i + ' = document.getElementById(' + i + ');');
        id[i] = document.getElementById(i);
    }

    constructBaseTree();

    try {
        appendSpecElem();
    } catch(e) {
        writeFileCM("fuzzlog",'// Error: appendSpecElem: ' + e.message);
    }
}

function setAttr() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] setAttr()');
    }

    try {
        if (percent(50)) {
            var rStr = randAlpha(10);
        } else {
            var rStr = 'attrName';
        }
        writeFileCM("fuzzlog",'id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ' = document.createAttribute("' + rStr + '");');
        idS[demicm.attrId] = document.createAttribute(rStr);

        var rStr = randAlpha(10);
        writeFileCM("fuzzlog",'id_' + (demicm.attrId + demicm.SPEC_OFFSET) + '.value = "' + rStr + '";');
        idS[demicm.attrId].value = rStr;

        var rId = randId(true);
        if (rId == 'none') {
            return;
        }
        writeFileCM("fuzzlog",'id_' + rId + '.setAttributeNode(id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ');');
        id[rId].setAttributeNode(idS[demicm.attrId]);

        writeFileCM("fuzzlog",'id_' + (demicm.nodeMapId + demicm.SPEC_OFFSET) + ' = id_' + rId + '.attributes;');
        idS[demicm.nodeMapId] = id[rId].attributes;
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: setAttr: ' + e.message);
    }
}

function constructSpec() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] constructSpec()');
    }

    try {
        writeFileCM("fuzzlog",'id_' + (demicm.winId + demicm.SPEC_OFFSET) + ' = window;');
        idS[demicm.winId] = window;

        setAttr();
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: constructSpec: ' + e.message);
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
    writeFileCM("fuzzlog",'id_' + (demicm.styleId + demicm.SPEC_OFFSET) + ' = document.createElement("style");');
    idS[demicm.styleId] = document.createElement('style'); 

    writeFileCM("fuzzlog",'id_' + (demicm.styleId + demicm.SPEC_OFFSET) + '.innerText = "' + cssList + '";');
    idS[demicm.styleId].innerText = cssList;

    writeFileCM("fuzzlog",'document.documentElement.appendChild(id_' + (demicm.styleId + demicm.SPEC_OFFSET) + ');');
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

        writeFileCM("fuzzlog",'for (var p in ' + logObjStr + ') { ' + logObjStr + '[p]; }');
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
            writeFileCM("fuzzlog",'[+] FuzzObj: ' + fuzzObjStr + ', propf: ' + propf);
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
            writeFileCM("fuzzlog",'// Warning: propfMan else');
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: propfMan: ' + e.message);
    }
    finally {
        propStack.pop();
    }
}

function propMan(fuzzObj, fuzzObjStr, logObjStr, prop, bNormalProp, rIds, rIdRs, rIdSs, objType) {
    try {
        // Get value
        if (demicm.IS_LOG_DEBUG) {
            writeFileCM("fuzzlog",'log debug:');
            writeFileCM("fuzzlog",'var retVal = ' + fuzzObjStr + '["' + prop + '"];');
        }
        writeFileCM("fuzzlog",'var retVal = ' + logObjStr + '["' + prop + '"];');
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

            writeFileCM("fuzzlog",'id_' + (idR.length + demicm.RET_OFFSET) + ' = retVal;');
            idR[idR.length] = retVal;
        }

        // Set dirty value
        if (bNormalProp && percent(demicm.PROP_DIRTY_PER) && demicm.propDic[prop].dirtyVal.length != 0) {
            var rDirtyVal = randItem(demicm.propDic[prop].dirtyVal);
            writeFileCM("fuzzlog",logObjStr + '["' + prop + '"] = ' 
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
            writeFileCM("fuzzlog",logObjStr + '["' + prop + '"] = ' 
                + logRevise(rIds[1], rIdRs[1], 'prop', rNormalVal, 'node') + ';');
            eval(fuzzObjStr + '["' + prop + '"] = rNormalVal;');
        // Set random value
        } else if (percent(demicm.PROP_RANDOM_PER)) {
            var randValTable = {};
            randPropfVal(rIds[1], rIdRs[1], 'prop', randValTable);
            var rVal = bNormalProp ? randValTable[demicm.propDic[prop].type] : randValTable[typeof fuzzObj[prop]];

            if (rVal != undefined) {
                writeFileCM("fuzzlog",logObjStr + '["' + prop + '"] = ' 
                    + logRevise(rIds[1], rIdRs[1], 'prop', rVal, 'node') + ';');
                eval(fuzzObjStr + '["' + prop + '"] = rVal;');
            } else {
                writeFileCM("fuzzlog",logObjStr + '["' + prop + '"] = ' 
                    + logRevise(rIds[1], rIdRs[1], 'prop', randValTable['objectR'], 'ret') + ';');
                eval(fuzzObjStr + '["' + prop + '"] = randValTable["objectR"];');
            }
        // Set some value from one object to the value of another
        } else if (percent(60)) {
            if (objType == 'spec') {
                writeFileCM("fuzzlog",logObjStr + '["' + prop + '"] = id_' 
                    + (rIdSs[1] + demicm.SPEC_OFFSET) + '["' + prop + '"];');
                eval(fuzzObjStr + '["' + prop + '"] = idS[rIdSs[1]][prop];');
            } else if (objType == 'ret') {
                writeFileCM("fuzzlog",logObjStr + '["' + prop + '"] = id_' + (rIdRs[1] 
                        + demicm.RET_OFFSET) + '["' + prop + '"];');
                eval(fuzzObjStr + '["' + prop + '"] = idR[rIdRs[1]][prop];');
            } else if (objType == 'node') {
                writeFileCM("fuzzlog",logObjStr + '["' + prop + '"] = id_' + rIds[1] + '["' + prop + '"];');
                eval(fuzzObjStr + '["' + prop + '"] = id[rIds[1]][prop];');
            } else { 
                writeFileCM("fuzzlog",'// Warning: propMan: else');
            }
        // Set some property to NULL...
        } else {
            writeFileCM("fuzzlog",logObjStr + '["' + prop + '"] = null;');
            eval(fuzzObjStr + '["' + prop + '"] = null;');
        }

        writeFileCM("fuzzlog",'retVal = null;');
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: propMan: ' + e.message);
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
                    writeFileCM("fuzzlog",'// Warning: funcMan else');
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
            writeFileCM("fuzzlog",'log debug:');
            writeFileCM("fuzzlog",'var retVal = ' + fuzzObjStr + '["' + func + '"](' + paramStr + ');');
        }
        writeFileCM("fuzzlog",'var retVal = ' +  logObjStr + '["' + func + '"](' + paramLogStr + ');');
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

            writeFileCM("fuzzlog",'id_' + (idR.length + demicm.RET_OFFSET) + ' = retVal;');
            idR[idR.length] = retVal;

            if (retValDepth > 0) {
                propfMan([idR.length - 1], recDepth - 1, retValDepth - 1, 'prop', 'ret');
                propfMan([idR.length - 1], recDepth - 1, retValDepth - 1, 'func', 'ret');
            }
        }

        writeFileCM("fuzzlog",'retVal = null;');
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: funcMan: ' + e.message);
    }
}

function styleMan(rId) {
    try {
        var rStyle = randStyle();
        var rStyleVal = randStyleVal(rStyle);

        // Only element has style
        if (id[rId] && id[rId].nodeType == 1) {
            writeFileCM("fuzzlog",'id_' + rId + '.style["' + rStyle + '"] = "' + rStyleVal + '";');
            id[rId].style[rStyle] = rStyleVal;
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: styleMan: ' + e.message);
    }
}

function layout() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] layout()');
    }

    try {
        for (var i = 0; i < 3; i++) {
            var rId = randId(true, false, true);
            if (rId == 'none') {
                return;
            }

            writeFileCM("fuzzlog",'id_' + rId + '.offsetParent;');
            id[rId].offsetParent;
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: layout: ' + e.message);
    }
}

function clearSub() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] clearSub()');
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

                writeFileCM("fuzzlog",'id_' + rId + '.innerHTML = "demi6od";');
                id[rId].innerHTML = 'demi6od';

                removeCache(caches);
                break;

            case 1:
                writeFileCM("fuzzlog",'id_' + rId + '.outerHTML = "";');
                id[rId].outerHTML = '';

                removeThis(id[rId], 'direct');
                break;

            case 2:
                var caches = [];
                removeChildren(id[rId], 'delay', caches);

                writeFileCM("fuzzlog",'id_' + rId + '.innerText = "demi6od";');
                id[rId].innerText = 'demi6od';

                removeCache(caches);
                break;

            case 3:
                writeFileCM("fuzzlog",'id_' + rId + '.outerText = "";');
                id[rId].outerText = '';
                removeThis(id[rId], 'direct');
                break;

            case 4:
                var caches = [];
                removeChildren(id[rId], 'delay', caches);

                writeFileCM("fuzzlog",'id_' + rId + '.innerHTML = ' + 'id_' + rId + '.innerHTML;');
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

                writeFileCM("fuzzlog",'id_' + rId + '.outerHTML = ' + 'id_' + rId + '.outerHTML;');
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

                writeFileCM("fuzzlog",'id_' + rId + '.innerText = ' + 'id_' + rId + '.innerText;');
                id[rId].innerText = id[rId].innerText;

                removeCache(caches);
                break;

            case 7:
                writeFileCM("fuzzlog",'id_' + rId + '.outerText = ' + 'id_' + rId + '.outerText;');
                id[rId].outerText = id[rId].outerText;

                removeThis(id[rId], 'direct');
                break;

            default:
                writeFileCM("fuzzlog",'// Warning: clearSub default');
                break;
        }

        writeFileCM("fuzzlog",'gc();');
        // gc();
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: clearSub: ' + e.message);
    }
}

function clearAll() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] clearAll()');
    }

    try {
        for (var i = 1; i < id.length; i++) {
            if (id[i]) {
                writeFileCM("fuzzlog",'id_' + i + ' = null;');
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
                    writeFileCM("fuzzlog",'document.write("");');
                    document.write('');
                    break;
                case 1:
                    writeFileCM("fuzzlog",'document.writeln("");');
                    document.writeln('');
                    break;
                case 2:
                    writeFileCM("fuzzlog",'document.open("");');
                    document.open('');
                    break;
                default:
                    writeFileCM("fuzzlog",'// Warning: clearAll default');
                    break;
            }
        } else {
            writeFileCM("fuzzlog",'document.documentElement.innerHTML = "";');
            document.documentElement.innerHTML = '';
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: clearAll: ' + e.message);
    }

    writeFileCM("fuzzlog",'gc();');
    // gc();

    //window.open('', '_self', '');
    //window.close();
}

function DOMMan() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] DOMMan()');
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
                writeFileCM("fuzzlog",'id_' + rIds[0] + '.appendChild(id_' + rIds[1]  + ');');
                id[rIds[0]].appendChild(id[rIds[1]]);
                break;

            // Node insertBefore(in Node newChild, in Node refChild)
            case 1:
                writeFileCM("fuzzlog",'id_' + rIds[0] + '.parentNode.insertBefore(id_' + rIds[1]  + ', id_' + rIds[0] + ');');
                id[rIds[0]].parentNode.insertBefore(id[rIds[1]], id[rIds[0]]);
                break;

            // Node insertAdjacentElement(in String sWhere, in Node newSibling)
            case 2:
                writeFileCM("fuzzlog",'id_' + rIds[0] + '.insertAdjacentElement("' + rDOMPos + '", id_' + rIds[1]  + ');');
                id[rIds[0]].insertAdjacentElement(rDOMPos, id[rIds[1]]);
                break;

            // insertAdjacentHTML(in String sWhere, in String htmlCode)
            case 3:
                writeFileCM("fuzzlog",'id_' + rIds[0] + '.insertAdjacentHTML("' + rDOMPos + '", "' + rHTMLCode  + '");');
                id[rIds[0]].insertAdjacentHTML(rDOMPos, rHTMLCode);
                break;

            // insertAdjacentText(in String sWhere, in String text)
            case 4:
                writeFileCM("fuzzlog",'id_' + rIds[0] + '.insertAdjacentText("' + rDOMPos + '", "' + rStr  + '");');
                id[rIds[0]].insertAdjacentText(rDOMPos, rStr);
                break;

            // Node removeChild(in Node oldChild)
            case 5:
                if (percent(10)) {
                    writeFileCM("fuzzlog",'id_' + rIds[0] + '.parentNode.removeChild(id_' + rIds[0] + ');');
                    id[rIds[0]].parentNode.removeChild(id[rIds[0]]);
                    removeThis(id[rIds[0]], 'direct');
                }
                break;

            // Node replaceChild(in Node newChild, in Node oldChild)
            case 6:
                if (percent(10)) {
                    writeFileCM("fuzzlog",'id_' + rIds[0] + '.parentNode.replaceChild(id_' + rIds[1]  + ', id_' + rIds[0] + ');');
                    id[rIds[0]].parentNode.replaceChild(id[rIds[1]], id[rIds[0]]);
                    removeThis(id[rIds[0]], 'direct');
                }
                break;

            // Node cloneNode(in boolean deep);
            case 7:
                writeFileCM("fuzzlog",'var clonedNode = id_' + rIds[1] + '.cloneNode(' + rBool + ');');
                var clonedNode = id[rIds[1]].cloneNode(rBool);
                writeFileCM("fuzzlog",'id_' + rIds[0] + '.appendChild(clonedNode);');
                id[rIds[0]].appendChild(clonedNode);

                writeFileCM("fuzzlog",'clonedNode.id = ' + id.length + ';');
                clonedNode.id = id.length;
                writeFileCM("fuzzlog",'id_' + id.length + ' = clonedNode;');
                id[id.length] = clonedNode;

                if (rBool) {
                    clearChildrenId(clonedNode);
                }

                writeFileCM("fuzzlog",'clonedNode = null;');
                clonedNode = null;
                break;

           default:
                writeFileCM("fuzzlog",'// Warning: DOMMan default');
                break;
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: DOMMan: ' + e.message);
    }
}

function winMan() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] winMan()');
    }

    try {
        propfMan([demicm.winId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.winId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: winMan: ' + e.message);
    }
}

function attrMan() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] attrMan()');
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
                writeFileCM("fuzzlog",'// Warning: attrMan default');
                break;
        }
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: attrMan: ' + e.message);
    }
}

function canvas2dMan() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] canvas2dMan()');
    }

    try {
        propfMan([demicm.canvas2dId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.canvas2dId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: canvas2dMan: ' + e.message);
    }
}

function webglMan() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] webglMan()');
    }

    try {
        if (percent(20)) {
            propfMan([demicm.webglId], 1, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }

        propfMan([demicm.webglId], 1, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: webglMan: ' + e.message);
    }

    if (percent(demicm.DRAW_WEBGL_PER)) {
        drawWebgl();
    }
}

function fireEvent() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] fireEvent()');
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

        writeFileCM("fuzzlog",'var evt = document.createEvent("' + evtName + '");');
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
                writeFileCM("fuzzlog",'// Warning: fireEvent else ' + evtParams[i]);
            }

            logParam += ',';
            evtParam += ',';
        }

        // trim paramStr
        if (evtParam != '') {
            logParam = logParam.substr(0, logParam.length - 1);
            evtParam = evtParam.substr(0, evtParam.length - 1);
        }

        writeFileCM("fuzzlog",'evt.' + evtFunc + '("' + rEvtType + '",' + logParam + ');');
        eval('evt.' + evtFunc + '("' + rEvtType + '",' + evtParam + ');');

        if (document.activeElement && percent(30)) {
            writeFileCM("fuzzlog",'document.activeElement.dispatchEvent(evt);');
            document.activeElement.dispatchEvent(evt);
        } else {
            writeFileCM("fuzzlog",'id_' + rId + '.dispatchEvent(evt);');
            id[rId].dispatchEvent(evt);
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: fireEvent: ' + e.message);
    }
}

/************************************* finale *************************************/
function finale() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] finale()');
    }

    /* Spray is not necessary
    writeFileCM("fuzzlog",'occupySprayInt(' + demicm.ARRAY_LEN_MAX +', ' + demicm.ARRAY_CNT + ');');
    //occupySprayInt(demicm.ARRAY_LEN_MAX, demicm.ARRAY_CNT);
    */

    writeFileCM("fuzzlog",'gc();');
    // gc();

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
        writeFileCM("fuzzlog",'[+] reuseElem()');
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
        writeFileCM("fuzzlog",'// Error: reuseElem: ' + e.message);
    }
}

function reuseRetElem() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] reuseRetElem()');
    }

    try {
        for (var i = 0; i < idR.length; i++) {
            if (idR[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'prop', 'ret');
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'func', 'ret');

                writeFileCM("fuzzlog",'id_' + (i + demicm.RET_OFFSET) + ' = null;');
                idR[i] = null;
            }
        }

        writeFileCM("fuzzlog",'gc();');
        // gc();
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: reuseRetElem: ' + e.message);
    }
}

function reuseSpec() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] reuseSpec()');
    }

    try {
        for (var i = 0; i < idS.length; i++) {
            if (idS[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'prop', 'spec');
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'func', 'spec');

                if (i != demicm.openId) {
                    writeFileCM("fuzzlog",'id_' + (i + demicm.SPEC_OFFSET) + ' = null;');
                    idS[i] = null;
                }
            }
        }

        writeFileCM("fuzzlog",'gc();');
        // gc();
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: reuseSpec: ' + e.message);
    }
}

function relayout() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] relayout()');
    }

    try {
        writeFileCM("fuzzlog",'id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + ' = document.createElement("a");');
        idS[demicm.relayoutId] = document.createElement('a');
        writeFileCM("fuzzlog",'document.documentElement.appendChild(id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + ');');
        document.documentElement.appendChild(idS[demicm.relayoutId]); 

        writeFileCM("fuzzlog",'id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.offsetParent;');
        idS[demicm.relayoutId].offsetParent;

        writeFileCM("fuzzlog",'id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML = id_'
            + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML;');
        idS[demicm.relayoutId].innerHTML = idS[demicm.relayoutId].innerHTML;

        writeFileCM("fuzzlog",'id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML = "";');
        idS[demicm.relayoutId].innerHTML = '';
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: relayout: ' + e.message);
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
        writeFileCM("fuzzlog",'[+] normalOperate()');
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
        writeFileCM("fuzzlog",'gc();');
        // gc();
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
        writeFileCM("fuzzlog",'[+] multiClear()');
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
                writeFileCM("fuzzlog",'// Warning: multiClear default');
                break;
        }

        switch (rand(2)) {
            case 0:
                if (demicm.multiType == 0) {
                    writeFileCM("fuzzlog",'id_' + (wId + demicm.SPEC_OFFSET) + '.document.body.outerHTML = "";');
                    idS[wId].document.body.outerHTML = '';
                } else {
                    writeFileCM("fuzzlog",'id_' + (fId + demicm.SPEC_OFFSET) + '.contentDocument.body.outerText = "";');
                    idS[fId].contentDocument.body.outerText = '';
                }
                break;
            case 1:
                if (demicm.multiType == 0) {
                    writeFileCM("fuzzlog",'id_' + (wId + demicm.SPEC_OFFSET) + '.document.write("");');
                    idS[wId].document.write('');
                } else {
                    writeFileCM("fuzzlog",'id_' + (fId + demicm.SPEC_OFFSET) + '.contentDocument.write("");');
                    idS[fId].contentDocument.write('');
                }
                break;
            default:
                writeFileCM("fuzzlog",'// Warning: multiClear default');
                break;
        }

    } catch (e) {
        writeFileCM("fuzzlog",'// Error: multiClear: ' + e.message);
    }
}

function multiMan() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] multiMan()');
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
                    writeFileCM("fuzzlog",'// Warning: multiMan default');
                    break;
            }
        } while (!idS[fId] && count++ < demicm.MAX_ITR)

        if (percent(50)) {  
            propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: multiMan: ' + e.message);
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
        writeFileCM("fuzzlog",'id_' + (demicm.openId + demicm.SPEC_OFFSET) + ' = window.open("demicmTargetIE.html");');
        idS[demicm.openId] = window.open('demicmTargetIE.html');
    } else {
        writeFileCM("fuzzlog",'id_' + (demicm.openId + demicm.SPEC_OFFSET) + ' = window.open("demicmTarget.html");');
        idS[demicm.openId] = window.open('demicmTarget.html');
    }
}

function appendIframe(rId) {
    writeFileCM("fuzzlog",'id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + ' = document.createElement("iframe");');
    idS[demicm.ifrId] = document.createElement('iframe');
    if (demicm.BROWSER == 'IE') {
        writeFileCM("fuzzlog",'id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.src = "demicmFrameIE.html";');
        idS[demicm.ifrId].src = 'demicmFrameIE.html';
    } else {
        writeFileCM("fuzzlog",'id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.src = "demicmFrame.html";');
        idS[demicm.ifrId].src = 'demicmFrame.html';
    }

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + ');');
    id[rId].appendChild(idS[demicm.ifrId]);
}

function appendFrame(rId) {
    // Add frame set
    writeFileCM("fuzzlog",'id_' + (demicm.frsId + demicm.SPEC_OFFSET) + ' = document.createElement("frameset");');
    idS[demicm.frsId] = document.createElement('frameset');
    writeFileCM("fuzzlog",'id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.cols = "15%, 10%, 5%";');
    idS[demicm.frsId].cols = '15%, 10%, 5%';

    writeFileCM("fuzzlog",'id_' + rId + '.appendChild(id_' + (demicm.frsId + demicm.SPEC_OFFSET) + ');');
    id[rId].appendChild(idS[demicm.frsId]);

    // Add frame
    writeFileCM("fuzzlog",'id_' + (demicm.frId + demicm.SPEC_OFFSET) + ' = document.createElement("frame");');
    idS[demicm.frId] = document.createElement('frame');
    if (demicm.BROWSER == 'IE') {
        writeFileCM("fuzzlog",'id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.src = "demicmFrameIE.html";');
        idS[demicm.frId].src = 'demicmFrameIE.html';
    } else {
        writeFileCM("fuzzlog",'id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.src = "demicmFrame.html";');
        idS[demicm.frId].src = 'demicmFrame.html';
    }

    writeFileCM("fuzzlog",'id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(id_' + (demicm.frId + demicm.SPEC_OFFSET) + ');');
    idS[demicm.frsId].appendChild(idS[demicm.frId]);

    // Add frame with no id
    writeFileCM("fuzzlog",'id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(document.createElement("frame"));');
    idS[demicm.frsId].appendChild(document.createElement('frame'));
    writeFileCM("fuzzlog",'id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(document.createElement("frame"));');
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
                writeFileCM("fuzzlog",'// Warning: constructMulti default');
                break;
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: constructMulti: ' + e.message);
    }
}

function getWindow() {
    var rDocId = rand(idS[demicm.openId].document.all.length);

    writeFileCM("fuzzlog",'id_' + id.length + ' = id_' + (demicm.openId + demicm.SPEC_OFFSET) + '.document.all[' + rDocId + '];');
    id[id.length] = idS[demicm.openId].document.all[rDocId];
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
}

function getIframe() {
    var rDocId = rand(idS[demicm.ifrId].contentDocument.all.length);

    writeFileCM("fuzzlog",'id_' + id.length + ' = id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.contentDocument.all[' + rDocId + '];');
    id[id.length] = idS[demicm.ifrId].contentDocument.all[rDocId];
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
}

function getFrame() {
    var rDocId = rand(idS[demicm.frId].contentDocument.all.length);

    writeFileCM("fuzzlog",'id_' + id.length + ' = id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.contentDocument.all[' + rDocId + '];');
    id[id.length] = idS[demicm.frId].contentDocument.all[rDocId];
    writeFileCM("fuzzlog",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
}

function getMultiElems(elemCnt) {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] getMultiElems()');
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
                    writeFileCM("fuzzlog",'// Warning: getMultiElems default');
                    break;
            }
        }
    } catch (e) {
        writeFileCM("fuzzlog",'// Error: getMultiElems: ' + e.message);
    }
}

function demiStart() {
    /* BEGIN FUZZING CODE */
    // logger = new LOGGER('01');
    // logger.starting();

    writeFileCM("fuzzlog",'// Fuzz start');
    
    if (demicm.BROWSER == 'IE') {
        writeFileCM("fuzzlog",'gc = function() { CollectGarbage(); arr = new Array(); for (var i = 0; i < 0x3f0; i++) { arr[i] = document.createElement("a"); }'
            + ' for (var i = 0; i < 0x3f0; i++) { arr[i] = ""; } CollectGarbage(); }');
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
        writeFileCM("fuzzlog",'gc = function() { var arrs = []; for (i = 0; i < 100000; i++) { arrs[i] = new Array(); } return arrs; }');
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
        writeFileCM("fuzzlog",'// demicm.IS_FUZZ_GROUP = ' + rBool + ';');
        demicm.IS_FUZZ_GROUP = rBool;

        rBool = randBool();
        writeFileCM("fuzzlog",'// demicm.IS_FUZZ_MULTI = ' + rBool + ';');
        demicm.IS_FUZZ_MULTI = rBool;

        rBool = randBool();
        writeFileCM("fuzzlog",'// demicm.IS_FUZZ_SPEC = ' + rBool + ';');
        demicm.IS_FUZZ_SPEC = rBool;
    }

    preludeFirst();

    if (demicm.IS_FUZZ_MULTI) {
        writeFileCM("fuzzlog",'/-demiFront = function() {');
    } else {
        demiFront();
    }
}

function demiFront() {
    if (demicm.IS_DEBUG) {
        writeFileCM("fuzzlog",'[+] demiFront()');
    }

    // Clear demiFront function
    writeFileCM("fuzzlog",'demiFront = function(){};');
    demiFront = function(){};

    if (demicm.IS_FUZZ_MULTI) {
        getMultiElems(demicm.MULTI_ELEM_NUM);
    }

    preludeSecond();

    writeFileCM("fuzzlog",'// we are now begining to fuzz...');
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
        writeFileCM("fuzzlog",'[+] demiBack()');
    }

    writeFileCM("fuzzlog",'/-demiBack = function() {');

    operate(demicm.BACK_OP_CNT);

    finale();

    // For setTimeout
    writeFileCM("fuzzlog",'/-};');
    writeFileCM("fuzzlog",'setTimeout("demiBack()",100);');

    if (demicm.IS_FUZZ_MULTI) {
        // For demiFront
        writeFileCM("fuzzlog",'/-};');
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

    writeFileCM("fuzzlog",'// Fuzz finished', true);

    /* END FUZZING CODE */
    // logger.finished();
    // window.location.href = window.location.protocol + "//" + window.location.host + "/grinder";
}

