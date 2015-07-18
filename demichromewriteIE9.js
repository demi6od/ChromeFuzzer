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
demicm.BROWSER = 'IE';

demicm.IS_RAND_FUZZ = true;
demicm.IS_DEBUG = true;
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
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.niId + demicm.SPEC_OFFSET) 
            + ' = document.createNodeIterator(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);');
        idS[demicm.niId] = document.createNodeIterator(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: constructNodeIterator: ' + e.message);
    }
}

function constructTreeWalker() {
    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.twId + demicm.SPEC_OFFSET) 
            + ' = document.createTreeWalker(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);');
        idS[demicm.twId] = document.createTreeWalker(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: constructTreeWalker: ' + e.message);
    }
}

function constructRange() {
    try {
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ' = document.createRange();');
        idS[demicm.rangeId] = document.createRange();

        setRange();
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: constructRange: ' + e.message);
    }
}

function setRange() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] setRange()');
    }

    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setStart(id_' + rId + ', 0);');
        idS[demicm.rangeId].setStart(id[rId], 0);

        rId = randId();
        if (rId == 'none') {
            return;
        }
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setEnd(id_' + rId + ', 0);');
        idS[demicm.rangeId].setEnd(id[rId], 0);
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: setRange: ' + e.message);
    }
}

function constructSelection() {
    try {
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.selId + demicm.SPEC_OFFSET) + ' = window.getSelection();');
        idS[demicm.selId] = window.getSelection();

        setSelection();
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: constructSelection: ' + e.message);
    }
}

function setSelection() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] setSelection()');
    }

    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.selectNodeContents(id_' + rId + ');');
        idS[demicm.rangeId].selectNodeContents(id[rId]);

        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.selId + demicm.SPEC_OFFSET) + '.removeAllRanges();');
        idS[demicm.selId].removeAllRanges();

        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.selId + demicm.SPEC_OFFSET) 
            + '.addRange(id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ');');
        idS[demicm.selId].addRange(idS[demicm.rangeId]);
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: setSelection: ' + e.message);
    }
}

function nodeIteration() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] nodeIteration()');
    }

    try {
        // Fuzz current node
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.referenceNode;');
        idS[demicm.curItrNodeId] = idS[demicm.niId].referenceNode;

        if (idS[demicm.curItrNodeId]) {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.root;');
        idS[demicm.curItrNodeId] = idS[demicm.niId].root;

        var count = 0;
        while (idS[demicm.curItrNodeId] && count++ < demicm.MAX_ITR)  {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();');
            idS[demicm.curItrNodeId] = idS[demicm.niId].nextNode();
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: nodeIteration: ' + e.message);
    }
}

function treeIteration() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] treeIteration()');
    }

    try {
        // Fuzz current node
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
            + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.currentNode;');
        idS[demicm.curTreeNodeId] = idS[demicm.twId].currentNode;

        if (idS[demicm.curTreeNodeId]) {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }

        // Iterate from root to end
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.root;');
        idS[demicm.curTreeNodeId] = idS[demicm.twId].root;

        var count = 0;
        while (idS[demicm.curTreeNodeId] && count++ < demicm.MAX_ITR)  {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                    + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();');
            idS[demicm.curTreeNodeId] = idS[demicm.twId].nextNode();
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: treeIteration: ' + e.message);
    }
}

function moveIterator() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] moveIterator()');
    }

    try {
        var rMoves = rand(3) + 1;
        for (var i = 0; i < rMoves; i++) {
            switch (rand(2)) {
                case 0:
                    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();');
                    idS[demicm.curItrNodeId] = idS[demicm.niId].nextNode();
                    break;
                case 1:
                    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.previousNode();');
                    idS[demicm.curItrNodeId] = idS[demicm.niId].previousNode();
                    break;
                default:
                    writeFileIE("e://fuzzlog.txt",'// Warning: moveIterator default');
                    break;
            }

            propfMan([demicm.niId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curItrNodeId]) {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: moveIterator: ' + e.message);
    }
}

function moveTreeWalker() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] moveTreeWalker()');
    }

    try {
        var rMoves = rand(3) + 1;
        for (var i = 0; i < rMoves; i++) {
            switch (rand(7)) {
                case 0:
                    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].nextNode();
                    break;
                case 1:
                    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousNode();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].previousNode();
                    break;
                case 2:
                    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.previousSibling();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].previousSibling();
                    break;
                case 3:
                    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextSibling();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].nextSibling();
                    break;
                case 4:
                    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.firstChild();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].firstChild();
                    break;
                case 5:
                    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.lastChild();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].lastChild();
                    break;
                case 6:
                    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                        + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.parentNode();');
                    idS[demicm.curTreeNodeId] = idS[demicm.twId].parentNode();
                    break;	
                default:
                    writeFileIE("e://fuzzlog.txt",'// Warning: moveTreeWalker default');
                    break;
            }

            propfMan([demicm.twId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curTreeNodeId]) {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: moveTreeWalker: ' + e.message);
    }
}		

function alterRange() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] alterRange()');
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
                writeFileIE("e://fuzzlog.txt",'var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.cloneContents();');
                var documentFragment = idS[demicm.rangeId].cloneContents();

                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(documentFragment);');
                id[rId].appendChild(documentFragment);

                writeFileIE("e://fuzzlog.txt",'documentFragment = null;');
                break;
            case 1:
                writeFileIE("e://fuzzlog.txt",'var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.extractContents();');
                var documentFragment = idS[demicm.rangeId].extractContents();

                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(documentFragment);');
                id[rId].appendChild(documentFragment);

                writeFileIE("e://fuzzlog.txt",'documentFragment = null;');
                break;
            case 2:
                var rHTMLCode = randHTMLCode(0x10, 5);
                writeFileIE("e://fuzzlog.txt",'var documentFragment = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) 
                    + '.createContextualFragment("' + rHTMLCode + '");');
                var documentFragment = idS[demicm.rangeId].createContextualFragment(rHTMLCode);

                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(documentFragment);');
                id[rId].appendChild(documentFragment);

                writeFileIE("e://fuzzlog.txt",'documentFragment = null;');
                break;
            case 3:
                writeFileIE("e://fuzzlog.txt",'var rangeCache = id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.cloneRange();');
                var rangeCache = idS[demicm.rangeId].cloneRange();

                var type = randItem(['START_TO_START', 'END_TO_END', 'START_TO_END', 'END_TO_START']);
                writeFileIE("e://fuzzlog.txt",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) 
                    + '.compareBoundaryPoints(Range.' + type + ', rangeCache);');
                eval('idS[demicm.rangeId].compareBoundaryPoints(Range.' + type + ', rangeCache);');

                writeFileIE("e://fuzzlog.txt",'rangeCache.detach();');
                rangeCache.detach();

                writeFileIE("e://fuzzlog.txt",'rangeCache = null;');
                break;						

            default:
                writeFileIE("e://fuzzlog.txt",'// Warning: alterRange default');
                break;
        }		
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: alterRange: ' + e.message);
    }
}

function alterSelection() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] alterSelection()');
    }

    try {
        // Execute command on selection
        var cmd = randItem(demicm.commands);
        writeFileIE("e://fuzzlog.txt",'document.execCommand(' +  cmd + ');');
        eval('document.execCommand(' +  cmd + ');');

        propfMan([demicm.selId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.selId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

        if (percent(20)) {
            writeFileIE("e://fuzzlog.txt",'id_' + (demicm.selId + demicm.SPEC_OFFSET) 
                + '.addRange(id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ');');
            idS[demicm.selId].addRange(idS[demicm.rangeId]);
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: alterSelection: ' + e.message);
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
        writeFileIE("e://fuzzlog.txt",'[+] reuseGroup()');
    }

    try {
        nodeIteration();
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.curItrNodeId] = null;
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.detach();');
        idS[demicm.niId].detach();
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.niId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.niId] = null;
        writeFileIE("e://fuzzlog.txt",'gc();');
        // gc();

        treeIteration();
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.curTreeNodeId] = null;
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.twId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.twId] = null;
        writeFileIE("e://fuzzlog.txt",'gc();');
        // gc();

        alterRange();
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.detach();');
        idS[demicm.rangeId].detach();
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.rangeId] = null;
        writeFileIE("e://fuzzlog.txt",'gc();');
        // gc();

        alterSelection();
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.selId + demicm.SPEC_OFFSET) + ' = null;');
        idS[demicm.selId] = null;
        writeFileIE("e://fuzzlog.txt",'gc();');
        // gc();
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: reuseGroup: ' + e.message);
    }
}

function objMan(type) {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] objMan(' + type + ')');
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
        writeFileIE("e://fuzzlog.txt",'[+] setProp()');
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
        writeFileIE("e://fuzzlog.txt",'// Error: setPropStyle: ' + e.message);
    }
}

function setEnv() {
    // Set HTML property
    if (percent(demicm.ENV_PER)) {
        writeFileIE("e://fuzzlog.txt",'document.documentElement.contentEditable = "true";');
        document.documentElement.contentEditable = 'true';
        writeFileIE("e://fuzzlog.txt",'document.body.contentEditable = "true";');
        document.body.contentEditable = 'true';
        writeFileIE("e://fuzzlog.txt",'document.head.contentEditable = "true";');
        document.head.contentEditable = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        writeFileIE("e://fuzzlog.txt",'document.documentElement.dir = "rtl";');
        document.documentElement.dir = 'rtl';
        writeFileIE("e://fuzzlog.txt",'document.body.dir = "rtl";');
        document.body.dir = 'rtl';
        writeFileIE("e://fuzzlog.txt",'document.head.dir = "rtl";');
        document.head.dir = 'rtl';
    }

    if (percent(demicm.ENV_PER)) {
        writeFileIE("e://fuzzlog.txt",'document.documentElement.draggable = "true";');
        document.documentElement.draggable = 'true';
        writeFileIE("e://fuzzlog.txt",'document.body.draggable = "true";');
        document.body.draggable = 'true';
        writeFileIE("e://fuzzlog.txt",'document.head.draggable = "true";');
        document.head.draggable = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        writeFileIE("e://fuzzlog.txt",'document.documentElement.spellcheck = "true";');
        document.documentElement.spellcheck = 'true';
        writeFileIE("e://fuzzlog.txt",'document.body.spellcheck = "true";');
        document.body.spellcheck = 'true';
        writeFileIE("e://fuzzlog.txt",'document.head.spellcheck = "true";');
        document.head.spellcheck = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        writeFileIE("e://fuzzlog.txt",'document.documentElement.translate = "true";');
        document.documentElement.translate = 'true';
        writeFileIE("e://fuzzlog.txt",'document.body.translate = "true";');
        document.body.translate = 'true';
        writeFileIE("e://fuzzlog.txt",'document.head.translate = "true";');
        document.head.translate = 'true';
    }

    // Clear body onload event
    writeFileIE("e://fuzzlog.txt",'document.body.onload = null;');
    document.body.onload = null;

    // Set at least one idR item for propfMan
    writeFileIE("e://fuzzlog.txt",'var id_' + demicm.RET_OFFSET + ' = null;');
    idR[0] = null;

    if ((demicm.BROWSER == 'CM' || demicm.BROWSER == 'FF') && percent(demicm.DES_PER)) {
        writeFileIE("e://fuzzlog.txt",'document.designMode = "on";');
        document.designMode = 'on';
    }

    // Set props and funcs cache
    getPropAndFunc();
}

function eventHandler() {
    if (percent(demicm.EVENT_MAN_PER)) {
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.evtId + demicm.SPEC_OFFSET) + ' = arguments[0];');
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

    writeFileIE("e://fuzzlog.txt",'/-};');
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
                    id[i][rEvt] = new Function('writeFileIE("e://fuzzlog.txt","//id_' + i 
                        + '[\'' + rEvt + '\'] = function()");writeFileIE("e://fuzzlog.txt","/-{");eventHandler();');
                }
            }
        } catch (e) {
            writeFileIE("e://fuzzlog.txt",'// Error: setEvtHandler: ' + e.message);
        }
    }
}

function callBackJs() {
    writeFileIE("e://fuzzlog.txt",'//callBackJs = function()');
    writeFileIE("e://fuzzlog.txt",'/-{');

    if (percent(demicm.CALL_BACK_JS_OP_PER)) {
        operate(demicm.CALL_BACK_JS_OP_CNT);
    }

    if (percent(demicm.CALL_BACK_JS_CLEAR_PER)) {
        clearSub();
    }

    if (percent(demicm.CALL_BACK_JS_CLEAR_ALL_PER)) {
        clearAll();
    }

    writeFileIE("e://fuzzlog.txt",'/-};');
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

    writeFileIE("e://fuzzlog.txt",'/-};');
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

        id[i].toString = new Function('writeFileIE("e://fuzzlog.txt","//id_' + i 
            + '.toString = function()");writeFileIE("e://fuzzlog.txt","/-{");callBack();');
        id[i].toLocalString = new Function('writeFileIE("e://fuzzlog.txt","//id_' + i 
            + '.toLocalString = function()");writeFileIE("e://fuzzlog.txt","/-{");callBack();');
        id[i].valueOf = new Function('writeFileIE("e://fuzzlog.txt","//id_' + i 
            + '.valueOf = function()");writeFileIE("e://fuzzlog.txt","/-{");callBack();');
    }
}

function addTextNode() {
    for (var i = 0; i < demicm.TEXT_NUM; i++) {
        try {
            var rStr = randStr(rand(0x100)); 
            var rId = randId(true);

            if (percent(demicm.REF_TEXT_PER)) {
                // Add ref textNode 
                writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createTextNode("' + rStr + '");');
                id[id.length] = document.createTextNode(rStr);
                writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
                id[id.length - 1].id = id.length - 1;

                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
                id[rId].appendChild(id[id.length - 1]);
            } else {
                // Add no ref textNode 
                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(document.createTextNode("' + rStr + '"));');
                id[rId].appendChild(document.createTextNode(rStr));
            }
        } catch (e) {
            writeFileIE("e://fuzzlog.txt",'// Error: addTextNode: ' + e.message);
        }
    }
}

function appendForm(rId, rTxt) {
    // Add form
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("form");');
    id[id.length] = document.createElement('form');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var formId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add input text
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "text";');
    id[id.length - 1].type = 'text';
    var inputTextId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add label
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("label");');
    id[id.length] = document.createElement('label');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.htmlFor = ' + inputTextId + ';');
    id[id.length - 1].htmlFor = inputTextId;

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add input password
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "password";');
    id[id.length - 1].type = 'password';

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input checkbox
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "checkbox";');
    id[id.length - 1].type = 'checkbox';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.name = "checkbox";');
    id[id.length - 1].name = 'checkbox';

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "checkbox";');
    id[id.length - 1].type = 'checkbox';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.name = "checkbox";');
    id[id.length - 1].name = 'checkbox';

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input submit
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "submit";');
    id[id.length - 1].type = 'submit';

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input range
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "range";');
    id[id.length - 1].type = 'range';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.min = 20;');
    id[id.length - 1].min = 20;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.max = 120;');
    id[id.length - 1].max = 120;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.step = 5;');
    id[id.length - 1].step = 5;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.value = 50;');
    id[id.length - 1].value = 50;

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input number
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "number";');
    id[id.length - 1].type = 'number';

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input email
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "email";');
    id[id.length - 1].type = 'email';

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input url
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "url";');
    id[id.length - 1].type = 'url';

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input search
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "search";');
    id[id.length - 1].type = 'search';

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    if (demicm.BROWSER == 'CM' || demicm.BROWSER == 'FF') {
        // Add input color
        writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "color";');
        id[id.length - 1].type = 'color';

        writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input datetime
        writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "datetime";');
        id[id.length - 1].type = 'datetime';

        writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input datetime-local
        writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "datetime-local";');
        id[id.length - 1].type = 'datetime-local';

        writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input time
        writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "time";');
        id[id.length - 1].type = 'time';

        writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input date
        writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "date";');
        id[id.length - 1].type = 'date';

        writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input week
        writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "week";');
        id[id.length - 1].type = 'week';

        writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);

        // Add input month
        writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
        id[id.length] = document.createElement('input');
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "month";');
        id[id.length - 1].type = 'month';

        writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
        id[formId].appendChild(id[id.length - 1]);
    }

    // Add input number
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "number";');
    id[id.length - 1].type = 'number';

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input tel
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "tel";');
    id[id.length - 1].type = 'tel';

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add output
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("output");');
    id[id.length] = document.createElement('output');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add keygen
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("keygen");');
    id[id.length] = document.createElement('keygen');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add fieldset
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("fieldset");');
    id[id.length] = document.createElement('fieldset');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var fieldsetId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add legend
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("legend");');
    id[id.length] = document.createElement('legend');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add input button
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "button";');
    id[id.length - 1].type = 'button';

    writeFileIE("e://fuzzlog.txt",'id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);

    // Add input radio
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "radio";');
    id[id.length - 1].type = 'radio';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.name = "radio";');
    id[id.length - 1].name = 'radio';

    writeFileIE("e://fuzzlog.txt",'id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);

    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "radio";');
    id[id.length - 1].type = 'radio';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.name = "radio";');
    id[id.length - 1].name = 'radio';

    writeFileIE("e://fuzzlog.txt",'id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);

    // Add datalist
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("datalist");');
    id[id.length] = document.createElement('datalist');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var datalistId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add option
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("option");');
    id[id.length] = document.createElement('option');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + datalistId + '.appendChild(id_' + (id.length - 1) + ');');
    id[datalistId].appendChild(id[id.length - 1]);

    // Add option with no id
    writeFileIE("e://fuzzlog.txt",'id_' + datalistId + '.appendChild(document.createElement("option"));');
    id[datalistId].appendChild(document.createElement('option'));
    writeFileIE("e://fuzzlog.txt",'id_' + datalistId + '.appendChild(document.createElement("option"));');
    id[datalistId].appendChild(document.createElement('option'));

    // Add textarea
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("textarea");');
    id[id.length] = document.createElement('textarea');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add select
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("select");');
    id[id.length] = document.createElement('select');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var selId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add option
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("option");');
    id[id.length] = document.createElement('option');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + selId + '.appendChild(id_' + (id.length - 1) + ');');
    id[selId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add option with no id
    writeFileIE("e://fuzzlog.txt",'id_' + selId + '.appendChild(document.createElement("option"));');
    id[selId].appendChild(document.createElement('option'));
    writeFileIE("e://fuzzlog.txt",'id_' + selId + '.appendChild(document.createElement("option"));');
    id[selId].appendChild(document.createElement('option'));

    // Add optgroup
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("optgroup");');
    id[id.length] = document.createElement('optgroup');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var optgroupId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + selId + '.appendChild(id_' + (id.length - 1) + ');');
    id[selId].appendChild(id[id.length - 1]);

    // Add option
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("option");');
    id[id.length] = document.createElement('option');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + optgroupId + '.appendChild(id_' + (id.length - 1) + ');');
    id[optgroupId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add option with no id
    writeFileIE("e://fuzzlog.txt",'id_' + optgroupId + '.appendChild(document.createElement("option"));');
    id[optgroupId].appendChild(document.createElement('option'));
    writeFileIE("e://fuzzlog.txt",'id_' + optgroupId + '.appendChild(document.createElement("option"));');
    id[optgroupId].appendChild(document.createElement('option'));
}

function appendList(rId, rTxt) {
    // Add ol
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("ol");');
    id[id.length] = document.createElement('ol');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var olId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add li
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("li");');
    id[id.length] = document.createElement('li');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + olId + '.appendChild(id_' + (id.length - 1) + ');');
    id[olId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add li with no id
    writeFileIE("e://fuzzlog.txt",'id_' + olId + '.appendChild(document.createElement("li"));');
    id[olId].appendChild(document.createElement('li'));
    writeFileIE("e://fuzzlog.txt",'id_' + olId + '.appendChild(document.createElement("li"));');
    id[olId].appendChild(document.createElement('li'));

    // Add ul
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("ul");');
    id[id.length] = document.createElement('ul');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var ulId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add li
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("li");');
    id[id.length] = document.createElement('li');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + ulId + '.appendChild(id_' + (id.length - 1) + ');');
    id[ulId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add li with no id
    writeFileIE("e://fuzzlog.txt",'id_' + ulId + '.appendChild(document.createElement("li"));');
    id[ulId].appendChild(document.createElement('li'));
    writeFileIE("e://fuzzlog.txt",'id_' + ulId + '.appendChild(document.createElement("li"));');
    id[ulId].appendChild(document.createElement('li'));

    // Add dl
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("dl");');
    id[id.length] = document.createElement('dl');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var dlId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add dt
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("dt");');
    id[id.length] = document.createElement('dt');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + dlId + '.appendChild(id_' + (id.length - 1) + ');');
    id[dlId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add dd
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("dd");');
    id[id.length] = document.createElement('dd');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + dlId + '.appendChild(id_' + (id.length - 1) + ');');
    id[dlId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add dt and dd with no id
    writeFileIE("e://fuzzlog.txt",'id_' + dlId + '.appendChild(document.createElement("dt"));');
    id[dlId].appendChild(document.createElement('dt'));
    writeFileIE("e://fuzzlog.txt",'id_' + dlId + '.appendChild(document.createElement("dd"));');
    id[dlId].appendChild(document.createElement('dd'));
    writeFileIE("e://fuzzlog.txt",'id_' + dlId + '.appendChild(document.createElement("dt"));');
    id[dlId].appendChild(document.createElement('dt'));
    writeFileIE("e://fuzzlog.txt",'id_' + dlId + '.appendChild(document.createElement("dd"));');
    id[dlId].appendChild(document.createElement('dd'));
}

function appendCanvas2D(rId, rTxt) {
    // Add canvas
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("canvas");');
    id[id.length] = document.createElement('canvas');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var canvasId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Get the 2D rendering context
    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.canvas2dId + demicm.SPEC_OFFSET) + ' = id_' + canvasId + '.getContext("2d");');
    idS[demicm.canvas2dId] = id[canvasId].getContext('2d');
}

function appendWebGL(rId, rTxt) {
    // Add canvas
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("canvas");');
    id[id.length] = document.createElement('canvas');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var canvasId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Get the rendering context for WebGL
    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.webglId + demicm.SPEC_OFFSET) + ' = getWebGLContext(id_'+ canvasId + ');');
    idS[demicm.webglId] = getWebGLContext(id[canvasId]);
    writeFileIE("e://fuzzlog.txt",'webgl = id_' + (demicm.webglId + demicm.SPEC_OFFSET) + ';');
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

    writeFileIE("e://fuzzlog.txt",'vshader = webgl.createShader(webgl.VERTEX_SHADER);');
    demicm.vshader = demicm.webgl.createShader(demicm.webgl.VERTEX_SHADER);
    writeFileIE("e://fuzzlog.txt",'fshader = webgl.createShader(webgl.FRAGMENT_SHADER);');
    demicm.fshader = demicm.webgl.createShader(demicm.webgl.FRAGMENT_SHADER);

    writeFileIE("e://fuzzlog.txt",'webgl.program = createProgram(webgl, "' + demicm.VSHADER_SOURCE + '", "' + demicm.FSHADER_SOURCE + '");');
    demicm.webgl.program = createProgram(demicm.webgl, demicm.VSHADER_SOURCE, demicm.FSHADER_SOURCE);

    // Get attributes
    writeFileIE("e://fuzzlog.txt",'webgl.program.u_ShadowMap = webgl.getUniformLocation(webgl.program, "u_ShadowMap");');
    demicm.webgl.program.u_ShadowMap = demicm.webgl.getUniformLocation(demicm.webgl.program, 'u_ShadowMap');

    writeFileIE("e://fuzzlog.txt",'webgl.program.a_Position = webgl.getAttribLocation(webgl.program, "a_Position");');
    demicm.webgl.program.a_Position = demicm.webgl.getAttribLocation(demicm.webgl.program, 'a_Position');

    writeFileIE("e://fuzzlog.txt",'webgl.program.a_Color = webgl.getAttribLocation(webgl.program, "a_Color");');
    demicm.webgl.program.a_Color = demicm.webgl.getAttribLocation(demicm.webgl.program, 'a_Color');

    writeFileIE("e://fuzzlog.txt",'webgl.program.u_MvpMatrix = webgl.getUniformLocation(webgl.program, "u_MvpMatrix");');
    demicm.webgl.program.u_MvpMatrix = demicm.webgl.getUniformLocation(demicm.webgl.program, 'u_MvpMatrix');

    writeFileIE("e://fuzzlog.txt",'webgl.program.u_MvpMatrixFromLight = webgl.getUniformLocation(webgl.program, "u_MvpMatrixFromLight");');
    demicm.webgl.program.u_MvpMatrixFromLight = demicm.webgl.getUniformLocation(demicm.webgl.program
            , 'u_MvpMatrixFromLight');

    // Create texture
    writeFileIE("e://fuzzlog.txt",'var image = new Image();');
    var image = new Image();
    writeFileIE("e://fuzzlog.txt",'texture = webgl.createTexture();');
    demicm.texture = demicm.webgl.createTexture();
    writeFileIE("e://fuzzlog.txt",'webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, 1);');
    demicm.webgl.pixelStorei(demicm.webgl.UNPACK_FLIP_Y_WEBGL, 1);
    writeFileIE("e://fuzzlog.txt",'webgl.activeTexture(webgl.TEXTURE0);');
    demicm.webgl.activeTexture(demicm.webgl.TEXTURE0);
    writeFileIE("e://fuzzlog.txt",'webgl.bindTexture(webgl.TEXTURE_2D, null);');
    demicm.webgl.bindTexture(demicm.webgl.TEXTURE_2D, null);
    writeFileIE("e://fuzzlog.txt",'webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGB, webgl.RGB, webgl.UNSIGNED_BYTE, null);');
    demicm.webgl.texImage2D(demicm.webgl.TEXTURE_2D, 0, demicm.webgl.RGB, demicm.webgl.RGB, demicm.webgl.UNSIGNED_BYTE, null);

    // Initialize view
    writeFileIE("e://fuzzlog.txt",'framebuffer = webgl.createFramebuffer();');
    demicm.framebuffer = demicm.webgl.createFramebuffer();
    writeFileIE("e://fuzzlog.txt",'webgl.bindFramebuffer(webgl.FRAMEBUFFER, null);');
    demicm.webgl.bindFramebuffer(demicm.webgl.FRAMEBUFFER, null);
    writeFileIE("e://fuzzlog.txt",'webgl.viewport(0, 0, 240, 320);');
    demicm.webgl.viewport(0, 0, 240, 320);
    writeFileIE("e://fuzzlog.txt",'webgl.useProgram(webgl.program);');
    demicm.webgl.useProgram(demicm.webgl.program);

    writeFileIE("e://fuzzlog.txt",'webgl.clearColor(0, 0, 0, 1);');
    demicm.webgl.clearColor(0, 0, 0, 1);
    writeFileIE("e://fuzzlog.txt",'webgl.enable(webgl.DEPTH_TEST);');
    demicm.webgl.enable(demicm.webgl.DEPTH_TEST);

    // Connect attributes to js
    writeFileIE("e://fuzzlog.txt",'webgl.uniform1i(webgl.program.u_ShadowMap, 0);');
    demicm.webgl.uniform1i(demicm.webgl.program.u_ShadowMap, 0);

    writeFileIE("e://fuzzlog.txt",'var viewProjMatrixFromLight = new Matrix4();');
    var viewProjMatrixFromLight = new Matrix4();
    writeFileIE("e://fuzzlog.txt",'viewProjMatrixFromLight.setPerspective(70.0, 1, 1.0, 200.0);');
    viewProjMatrixFromLight.setPerspective(70.0, 1, 1.0, 200.0);
    writeFileIE("e://fuzzlog.txt",'viewProjMatrixFromLight.lookAt(0, 7, 2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);');
    viewProjMatrixFromLight.lookAt(0, 7, 2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    writeFileIE("e://fuzzlog.txt",'webgl.uniformMatrix4fv(webgl.program.u_MvpMatrix, false, viewProjMatrixFromLight.elements);');
    demicm.webgl.uniformMatrix4fv(demicm.webgl.program.u_MvpMatrix, false, viewProjMatrixFromLight.elements);

    writeFileIE("e://fuzzlog.txt",'var viewProjMatrix = new Matrix4();');
    var viewProjMatrix = new Matrix4();
    writeFileIE("e://fuzzlog.txt",'viewProjMatrix.setPerspective(45, 2, 1.0, 100.0);');
    viewProjMatrix.setPerspective(45, 2, 1.0, 100.0);
    writeFileIE("e://fuzzlog.txt",'viewProjMatrix.lookAt(0.0, 7.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);');
    viewProjMatrix.lookAt(0.0, 7.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    writeFileIE("e://fuzzlog.txt",'webgl.uniformMatrix4fv(webgl.program.u_MvpMatrixFromLight, false, viewProjMatrix.elements);');
    demicm.webgl.uniformMatrix4fv(demicm.webgl.program.u_MvpMatrixFromLight, false, viewProjMatrix.elements);

    writeFileIE("e://fuzzlog.txt",'vertices = new Float32Array([-0.8, 3.5, 0.0,  0.8, 3.5, 0.0,  0.0, 3.5, 1.8]);');
    demicm.vertices = new Float32Array([-0.8, 3.5, 0.0,  0.8, 3.5, 0.0,  0.0, 3.5, 1.8]);
    writeFileIE("e://fuzzlog.txt",'buffer1 = webgl.createBuffer();');
    demicm.buffer1 = demicm.webgl.createBuffer();
    writeFileIE("e://fuzzlog.txt",'webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer1);');
    demicm.webgl.bindBuffer(demicm.webgl.ARRAY_BUFFER, demicm.buffer1);
    writeFileIE("e://fuzzlog.txt",'webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);');
    demicm.webgl.bufferData(demicm.webgl.ARRAY_BUFFER, demicm.vertices, demicm.webgl.STATIC_DRAW);
    writeFileIE("e://fuzzlog.txt",'webgl.vertexAttribPointer(webgl.program.a_Position,  3, webgl.FLOAT, false, 0, 0);');
    demicm.webgl.vertexAttribPointer(demicm.webgl.program.a_Position,  3, demicm.webgl.FLOAT, false, 0, 0);
    writeFileIE("e://fuzzlog.txt",'webgl.enableVertexAttribArray(webgl.program.a_Position);');
    demicm.webgl.enableVertexAttribArray(demicm.webgl.program.a_Position);

    writeFileIE("e://fuzzlog.txt",'colors = new Float32Array([1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.0, 0.0]);');
    demicm.colors = new Float32Array([1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.0, 0.0]);
    writeFileIE("e://fuzzlog.txt",'buffer2 = webgl.createBuffer();');
    demicm.buffer2 = demicm.webgl.createBuffer();
    writeFileIE("e://fuzzlog.txt",'webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer2);');
    demicm.webgl.bindBuffer(demicm.webgl.ARRAY_BUFFER, demicm.buffer2);
    writeFileIE("e://fuzzlog.txt",'webgl.bufferData(webgl.ARRAY_BUFFER, colors, webgl.STATIC_DRAW);');
    demicm.webgl.bufferData(demicm.webgl.ARRAY_BUFFER, demicm.colors, demicm.webgl.STATIC_DRAW);
    writeFileIE("e://fuzzlog.txt",'webgl.vertexAttribPointer(webgl.program.a_Color,  3, webgl.FLOAT, false, 0, 0);');
    demicm.webgl.vertexAttribPointer(demicm.webgl.program.a_Color,  3, demicm.webgl.FLOAT, false, 0, 0);
    writeFileIE("e://fuzzlog.txt",'webgl.enableVertexAttribArray(webgl.program.a_Color);');
    demicm.webgl.enableVertexAttribArray(demicm.webgl.program.a_Color);

    writeFileIE("e://fuzzlog.txt",'indices = new Uint8Array([0, 1, 2]);');
    demicm.indices = new Uint8Array([0, 1, 2]);
    writeFileIE("e://fuzzlog.txt",'buffer3 = webgl.createBuffer();');
    demicm.buffer3 = demicm.webgl.createBuffer();
    writeFileIE("e://fuzzlog.txt",'webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, buffer3);');
    demicm.webgl.bindBuffer(demicm.webgl.ELEMENT_ARRAY_BUFFER, demicm.buffer3);
    writeFileIE("e://fuzzlog.txt",'webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, indices, webgl.STATIC_DRAW);');
    demicm.webgl.bufferData(demicm.webgl.ELEMENT_ARRAY_BUFFER, demicm.indices, demicm.webgl.STATIC_DRAW);

    writeFileIE("e://fuzzlog.txt",'renderbuffer = webgl.createRenderbuffer();');
    demicm.renderbuffer = demicm.webgl.createRenderbuffer();

    // Draw
    drawWebgl();
}

function drawWebgl() {
    try {
        switch (rand(2)) {
            case 0:
                writeFileIE("e://fuzzlog.txt",'webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_BYTE, 0);');
                demicm.webgl.drawElements(demicm.webgl.TRIANGLES, demicm.indices.length, demicm.webgl.UNSIGNED_BYTE, 0);
                break;
            case 1:
                writeFileIE("e://fuzzlog.txt",'webgl.drawArrays(webgl.TRIANGLES, 0, indices.length);');
                demicm.webgl.drawArrays(demicm.webgl.TRIANGLES, 0, demicm.indices.length);
                break;
            default:
                writeFileIE("e://fuzzlog.txt",'// Warning: drawWebgl default');
                break;
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: drawWebgl: ' + e.message);
    }
}

function appendNetwork(rId, rTxt) {
    try {
        // Add WebSocket
        writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = new WebSocket("ws://127.0.0.1:8082/echo");');
        id[id.length] = new WebSocket('ws://127.0.0.1:8082/echo');
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;

        // Add XMLHttpRequest
        writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = new XMLHttpRequest();');
        id[id.length] = new XMLHttpRequest();
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
        var xhrId = id.length - 1;

        var rType = 'GET';
        var rAsyn = randItem([true, false]);
        writeFileIE("e://fuzzlog.txt",'id_' + xhrId + '.open("' + rType + '", "http://127.0.0.1:8000", ' + rAsyn + ');');
        id[xhrId].open(rType, "http://127.0.0.1:8000", rAsyn);
        writeFileIE("e://fuzzlog.txt",'id_' + xhrId + '.send("' + rTxt + '");');
        id[xhrId].send(rTxt);

        writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = ' + 'id_' + xhrId + '.upload;');
        id[id.length] = id[xhrId].upload;
        writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
        id[id.length - 1].id = id.length - 1;
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: appendNetwork: ' + e.message);
    }
}

function appendStyle(rId, rTxt) {
    // Add style
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("style");');
    id[id.length] = document.createElement('style');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    var cssList = '';
    var tagList = randItem(demicm.idTags);
    for (var j = 0; j < demicm.idTags.length / 3; j++) {
        tagList += ', ' + randItem(demicm.idTags);
    }
    cssList += tagList + ' ' + randCSSText() + ' ';

    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.innerText = "' + cssList + '";');
    id[id.length - 1].innerText = cssList;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendTable(rId, rTxt) {
    // Add table
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("table");');
    id[id.length] = document.createElement('table');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var tabId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add caption
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("caption");');
    id[id.length] = document.createElement('caption');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add colgroup
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("colgroup");');
    id[id.length] = document.createElement('colgroup');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var colgId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add col
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("col");');
    id[id.length] = document.createElement('col');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.span = "2";');
    id[id.length - 1].span = '2';

    writeFileIE("e://fuzzlog.txt",'id_' + colgId + '.appendChild(id_' + (id.length - 1) + ');');
    id[colgId].appendChild(id[id.length - 1]);

    // Add col with no id
    writeFileIE("e://fuzzlog.txt",'id_' + colgId + '.appendChild(document.createElement("col"));');
    id[colgId].appendChild(document.createElement('col'));
    writeFileIE("e://fuzzlog.txt",'id_' + colgId + '.appendChild(document.createElement("col"));');
    id[colgId].appendChild(document.createElement('col'));

    // Add thead
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("thead");');
    id[id.length] = document.createElement('thead');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var theadId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("tr");');
    id[id.length] = document.createElement('tr');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + theadId + '.appendChild(id_' + (id.length - 1) + ');');
    id[theadId].appendChild(id[id.length - 1]);

    // Add th
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("th");');
    id[id.length] = document.createElement('th');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + trId + '.appendChild(id_' + (id.length - 1) + ');');
    id[trId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add th with no id
    writeFileIE("e://fuzzlog.txt",'id_' + trId + '.appendChild(document.createElement("th"));');
    id[trId].appendChild(document.createElement('th'));
    writeFileIE("e://fuzzlog.txt",'id_' + trId + '.appendChild(document.createElement("th"));');
    id[trId].appendChild(document.createElement('th'));

    // Add tfoot
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("tfoot");');
    id[id.length] = document.createElement('tfoot');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var tfootId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("tr");');
    id[id.length] = document.createElement('tr');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + tfootId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tfootId].appendChild(id[id.length - 1]);

    // Add td
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("td");');
    id[id.length] = document.createElement('td');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + trId + '.appendChild(id_' + (id.length - 1) + ');');
    id[trId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add td with no id
    writeFileIE("e://fuzzlog.txt",'id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));
    writeFileIE("e://fuzzlog.txt",'id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));

    // Add tbody
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("tbody");');
    id[id.length] = document.createElement('tbody');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var tbodyId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("tr");');
    id[id.length] = document.createElement('tr');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + tbodyId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tbodyId].appendChild(id[id.length - 1]);

    // Add td
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("td");');
    id[id.length] = document.createElement('td');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + trId + '.appendChild(id_' + (id.length - 1) + ');');
    id[trId].appendChild(id[id.length - 1]);
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add td with no id
    writeFileIE("e://fuzzlog.txt",'id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));
    writeFileIE("e://fuzzlog.txt",'id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));
}

function appendMap(rId, rTxt) {
    // Add map
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("map");');
    id[id.length] = document.createElement('map');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.name = "fuzzMap";');
    id[id.length - 1].name = 'fuzzMap';
    var mapId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add area
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("area");');
    id[id.length] = document.createElement('area');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.href = "demicmFuzz.html";');
    id[id.length - 1].href = 'demicmFuzz.html';

    writeFileIE("e://fuzzlog.txt",'id_' + mapId + '.appendChild(id_' + (id.length - 1) + ');');
    id[mapId].appendChild(id[id.length - 1]);

    // Add area with no id
    writeFileIE("e://fuzzlog.txt",'id_' + mapId + '.appendChild(document.createElement("area"));');
    id[mapId].appendChild(document.createElement('area'));
    writeFileIE("e://fuzzlog.txt",'id_' + mapId + '.appendChild(document.createElement("area"));');
    id[mapId].appendChild(document.createElement('area'));

    // Add img
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("img");');
    id[id.length] = document.createElement('img');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.src = "demicmImg.gif";');
    id[id.length - 1].src = 'demicmImg.gif';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.useMap = "#fuzzMap";');
    id[id.length - 1].useMap = '#fuzzMap';

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendAudio(rId, rTxt) {
    // Add audio
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("audio");');
    id[id.length] = document.createElement('audio');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var audioId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add source
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("source");');
    id[id.length] = document.createElement('source');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.src = "demicmAudio.mp3";');
    id[id.length - 1].src = 'demicmAudio.mp3';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "audio/mp3";');
    id[id.length - 1].type = 'audio/mp3';

    writeFileIE("e://fuzzlog.txt",'id_' + audioId + '.appendChild(id_' + (id.length - 1) + ');');
    id[audioId].appendChild(id[id.length - 1]);
}

function appendVideo(rId, rTxt) {
    // Add video
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("video");');
    id[id.length] = document.createElement('video');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    var videoId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add source
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("source");');
    id[id.length] = document.createElement('source');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.src = "demicmVideo.mp4";');
    id[id.length - 1].src = 'demicmVideo.mp4';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "video/mp4";');
    id[id.length - 1].type = 'video/mp4';

    writeFileIE("e://fuzzlog.txt",'id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');');
    id[videoId].appendChild(id[id.length - 1]);

    // Add track
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("track");');
    id[id.length] = document.createElement('track');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.src = "demicmTrack.vtt";');
    id[id.length - 1].src = 'demicmTrack.vtt';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.kind = "sub";');
    id[id.length - 1].kind = 'sub';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.srclang = "en";');
    id[id.length - 1].srclang = 'en';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.label = "English";');
    id[id.length - 1].label = 'English';

    writeFileIE("e://fuzzlog.txt",'id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');');
    id[videoId].appendChild(id[id.length - 1]);

    // Add object
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("object");');
    id[id.length] = document.createElement('object');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.data = "demicmVideo.mp4";');
    id[id.length - 1].data = 'demicmVideo.mp4';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    var objectId = id.length - 1;

    writeFileIE("e://fuzzlog.txt",'id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');');
    id[videoId].appendChild(id[id.length - 1]);

    // Add embed
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("embed");');
    id[id.length] = document.createElement('embed');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.src = "demicmData.swf";');
    id[id.length - 1].src = 'demicmData.swf';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    writeFileIE("e://fuzzlog.txt",'id_' + objectId + '.appendChild(id_' + (id.length - 1) + ');');
    id[objectId].appendChild(id[id.length - 1]);
}

function appendWorker() {
    // Add worker
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = new Worker("demicmWorker.js");');
    id[id.length] = new Worker('demicmWorker.js');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var workerId = id.length - 1;

    // Add onmessage event
    var rClearId = randId();
    var rClearDOMId = randId(true, false, true);
    writeFileIE("e://fuzzlog.txt",'id_' + workerId + '.onmessage = function () {try {id_' + rClearDOMId 
        + '.outerHTML = arguments[0].data;id_' + rClearId + '.outerText = arguments[0].data; } catch (e) {}};');
    id[workerId].onmessage = function () { 
        try {
            id[rClearDOMId].outerHTML = arguments[0].data; 
            id[rClearId].outerText = arguments[0].data; 
        } catch (e) {}
    };

    // Post message
    writeFileIE("e://fuzzlog.txt",'id_' + workerId + '.postMessage("ping");'); 
    id[workerId].postMessage('ping'); 
}

function appendSharedWorker() {
    // Add shared worker
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = new SharedWorker("demicmSharedWorker.js");');
    id[id.length] = new SharedWorker('demicmSharedWorker.js');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var workerId = id.length - 1;

    // Add onmessage event
    var rClearId = randId();
    var rClearDOMId = randId(true, false, true);
    writeFileIE("e://fuzzlog.txt",'id_' + workerId + '.port.onmessage = function () {try {id_' + rClearDOMId 
        + '.outerHTML = arguments[0].data;id_' + rClearId + '.outerText = arguments[0].data; } catch (e) {}};');
    id[workerId].port.onmessage = function () { 
        try {
            id[rClearDOMId].outerHTML = arguments[0].data; 
            id[rClearId].outerText = arguments[0].data; 
        } catch (e) {}
    };

    // Post message
    writeFileIE("e://fuzzlog.txt",'id_' + workerId + '.port.postMessage("ping");'); 
    id[workerId].port.postMessage('ping'); 
}

function appendSvg(rId, rTxt) {
    // Add embed svg
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("embed");');
    id[id.length] = document.createElement('embed');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.src = "demicmSvg.svg";');
    id[id.length - 1].src = 'demicmSvg.svg';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "image/svg+xml";');
    id[id.length - 1].type = 'image/svg+xml';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add img svg
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("img");');
    id[id.length] = document.createElement('img');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.src = "demicmSvg.svg";');
    id[id.length - 1].src = 'demicmSvg.svg';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "image/svg+xml";');
    id[id.length - 1].type = 'image/svg+xml';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendXml(rId, rTxt) {
    // Add xml
    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = document.createElement("embed");');
    id[id.length] = document.createElement('embed');
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.src = "demicmXml.xml";');
    id[id.length - 1].src = 'demicmXml.xml';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.type = "text/xml";');
    id[id.length - 1].type = 'text/xml';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendSpecElem() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] appendSpecElem()');
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
            writeFileIE("e://fuzzlog.txt",'// Warning: appendSpecElem default');
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
            writeFileIE("e://fuzzlog.txt",'// WebGL Crash: ' + e.message);
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
    writeFileIE("e://fuzzlog.txt",'var rElem = document.createElement("' + rTag + '");');
    var rElem = document.createElement(rTag);
    var tagStr = '<' + rTag + ' ';

    if (percent(demicm.REF_TAG_PER)) {
        tagStr += 'id=' + id.length + ' ';
        if (type == 'body') {
            demicm.bodyIds.push(id.length);
        } else if (type == 'head') {
            demicm.headIds.push(id.length);
        } else {
            writeFileIE("e://fuzzlog.txt",'// Warning: constructTag else');
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
        writeFileIE("e://fuzzlog.txt",'id_' + insId + ' = document.createElement("' + rTag + '");');
        id[insId] = document.createElement(rTag);

        if (!percent(demicm.REF_ELEM_PER)) {
            noRefIds.push(insId);
        } else {
            writeFileIE("e://fuzzlog.txt",'id_' + insId + '.id = ' + insId + ';');
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
            writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + insId + ');');
            id[rId].appendChild(id[insId]);
        }
    }

    for (var i = 0; i < noRefIds.length; i++) {
        writeFileIE("e://fuzzlog.txt",'id_' + noRefIds[i] + ' = null;');
        id[noRefIds[i]] = null;
    }
}

function constructDOMTree() {
    // Add document, body, head to id[]
    demicm.idTags = ['body', 'head'];

    writeFileIE("e://fuzzlog.txt",'id_0 = document.documentElement;');
    id[0] = document.documentElement; 
    writeFileIE("e://fuzzlog.txt",'document.documentElement.id = 0;');
    document.documentElement.id = 0;
    
    writeFileIE("e://fuzzlog.txt",'id_1 = document.head;');
    id[1] = document.head; 
    writeFileIE("e://fuzzlog.txt",'document.head.id = 1;');
    document.head.id = 1;

    writeFileIE("e://fuzzlog.txt",'id_2 = document.body;');
    id[2] = document.body; 
    writeFileIE("e://fuzzlog.txt",'document.body.id = 2;');
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

    writeFileIE("e://fuzzlog.txt",'document.body.innerHTML = "' + bodyTagStr.replace(/"/g, '\\"') + '";');
    document.body.innerHTML = bodyTagStr;

    writeFileIE("e://fuzzlog.txt",'document.head.innerHTML = "' + headTagStr.replace(/"/g, '\\"') + '";');
    document.head.innerHTML = headTagStr;

    for (var i = 3; i < id.length; i++) {
        writeFileIE("e://fuzzlog.txt",'id_' + i + ' = document.getElementById(' + i + ');');
        id[i] = document.getElementById(i);
    }

    constructBaseTree();

    try {
        appendSpecElem();
    } catch(e) {
        writeFileIE("e://fuzzlog.txt",'// Error: appendSpecElem: ' + e.message);
    }
}

function setAttr() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] setAttr()');
    }

    try {
        if (percent(50)) {
            var rStr = randAlpha(10);
        } else {
            var rStr = 'attrName';
        }
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ' = document.createAttribute("' + rStr + '");');
        idS[demicm.attrId] = document.createAttribute(rStr);

        var rStr = randAlpha(10);
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.attrId + demicm.SPEC_OFFSET) + '.value = "' + rStr + '";');
        idS[demicm.attrId].value = rStr;

        var rId = randId(true);
        if (rId == 'none') {
            return;
        }
        writeFileIE("e://fuzzlog.txt",'id_' + rId + '.setAttributeNode(id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ');');
        id[rId].setAttributeNode(idS[demicm.attrId]);

        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.nodeMapId + demicm.SPEC_OFFSET) + ' = id_' + rId + '.attributes;');
        idS[demicm.nodeMapId] = id[rId].attributes;
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: setAttr: ' + e.message);
    }
}

function constructSpec() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] constructSpec()');
    }

    try {
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.winId + demicm.SPEC_OFFSET) + ' = window;');
        idS[demicm.winId] = window;

        setAttr();
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: constructSpec: ' + e.message);
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
    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.styleId + demicm.SPEC_OFFSET) + ' = document.createElement("style");');
    idS[demicm.styleId] = document.createElement('style'); 

    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.styleId + demicm.SPEC_OFFSET) + '.innerText = "' + cssList + '";');
    idS[demicm.styleId].innerText = cssList;

    writeFileIE("e://fuzzlog.txt",'document.documentElement.appendChild(id_' + (demicm.styleId + demicm.SPEC_OFFSET) + ');');
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

        writeFileIE("e://fuzzlog.txt",'for (var p in ' + logObjStr + ') { ' + logObjStr + '[p]; }');
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
            writeFileIE("e://fuzzlog.txt",'[+] FuzzObj: ' + fuzzObjStr + ', propf: ' + propf);
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
            writeFileIE("e://fuzzlog.txt",'// Warning: propfMan else');
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: propfMan: ' + e.message);
    }
    finally {
        propStack.pop();
    }
}

function propMan(fuzzObj, fuzzObjStr, logObjStr, prop, bNormalProp, rIds, rIdRs, rIdSs, objType) {
    try {
        // Get value
        if (demicm.IS_LOG_DEBUG) {
            writeFileIE("e://fuzzlog.txt",'log debug:');
            writeFileIE("e://fuzzlog.txt",'var retVal = ' + fuzzObjStr + '["' + prop + '"];');
        }
        writeFileIE("e://fuzzlog.txt",'var retVal = ' + logObjStr + '["' + prop + '"];');
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

            writeFileIE("e://fuzzlog.txt",'id_' + (idR.length + demicm.RET_OFFSET) + ' = retVal;');
            idR[idR.length] = retVal;
        }

        // Set dirty value
        if (bNormalProp && percent(demicm.PROP_DIRTY_PER) && demicm.propDic[prop].dirtyVal.length != 0) {
            var rDirtyVal = randItem(demicm.propDic[prop].dirtyVal);
            writeFileIE("e://fuzzlog.txt",logObjStr + '["' + prop + '"] = ' 
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
            writeFileIE("e://fuzzlog.txt",logObjStr + '["' + prop + '"] = ' 
                + logRevise(rIds[1], rIdRs[1], 'prop', rNormalVal, 'node') + ';');
            eval(fuzzObjStr + '["' + prop + '"] = rNormalVal;');
        // Set random value
        } else if (percent(demicm.PROP_RANDOM_PER)) {
            var randValTable = {};
            randPropfVal(rIds[1], rIdRs[1], 'prop', randValTable);
            var rVal = bNormalProp ? randValTable[demicm.propDic[prop].type] : randValTable[typeof fuzzObj[prop]];

            if (rVal != undefined) {
                writeFileIE("e://fuzzlog.txt",logObjStr + '["' + prop + '"] = ' 
                    + logRevise(rIds[1], rIdRs[1], 'prop', rVal, 'node') + ';');
                eval(fuzzObjStr + '["' + prop + '"] = rVal;');
            } else {
                writeFileIE("e://fuzzlog.txt",logObjStr + '["' + prop + '"] = ' 
                    + logRevise(rIds[1], rIdRs[1], 'prop', randValTable['objectR'], 'ret') + ';');
                eval(fuzzObjStr + '["' + prop + '"] = randValTable["objectR"];');
            }
        // Set some value from one object to the value of another
        } else if (percent(60)) {
            if (objType == 'spec') {
                writeFileIE("e://fuzzlog.txt",logObjStr + '["' + prop + '"] = id_' 
                    + (rIdSs[1] + demicm.SPEC_OFFSET) + '["' + prop + '"];');
                eval(fuzzObjStr + '["' + prop + '"] = idS[rIdSs[1]][prop];');
            } else if (objType == 'ret') {
                writeFileIE("e://fuzzlog.txt",logObjStr + '["' + prop + '"] = id_' + (rIdRs[1] 
                        + demicm.RET_OFFSET) + '["' + prop + '"];');
                eval(fuzzObjStr + '["' + prop + '"] = idR[rIdRs[1]][prop];');
            } else if (objType == 'node') {
                writeFileIE("e://fuzzlog.txt",logObjStr + '["' + prop + '"] = id_' + rIds[1] + '["' + prop + '"];');
                eval(fuzzObjStr + '["' + prop + '"] = id[rIds[1]][prop];');
            } else { 
                writeFileIE("e://fuzzlog.txt",'// Warning: propMan: else');
            }
        // Set some property to NULL...
        } else {
            writeFileIE("e://fuzzlog.txt",logObjStr + '["' + prop + '"] = null;');
            eval(fuzzObjStr + '["' + prop + '"] = null;');
        }

        writeFileIE("e://fuzzlog.txt",'retVal = null;');
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: propMan: ' + e.message);
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
                    writeFileIE("e://fuzzlog.txt",'// Warning: funcMan else');
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
            writeFileIE("e://fuzzlog.txt",'log debug:');
            writeFileIE("e://fuzzlog.txt",'var retVal = ' + fuzzObjStr + '["' + func + '"](' + paramStr + ');');
        }
        writeFileIE("e://fuzzlog.txt",'var retVal = ' +  logObjStr + '["' + func + '"](' + paramLogStr + ');');
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

            writeFileIE("e://fuzzlog.txt",'id_' + (idR.length + demicm.RET_OFFSET) + ' = retVal;');
            idR[idR.length] = retVal;

            if (retValDepth > 0) {
                propfMan([idR.length - 1], recDepth - 1, retValDepth - 1, 'prop', 'ret');
                propfMan([idR.length - 1], recDepth - 1, retValDepth - 1, 'func', 'ret');
            }
        }

        writeFileIE("e://fuzzlog.txt",'retVal = null;');
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: funcMan: ' + e.message);
    }
}

function styleMan(rId) {
    try {
        var rStyle = randStyle();
        var rStyleVal = randStyleVal(rStyle);

        // Only element has style
        if (id[rId] && id[rId].nodeType == 1) {
            writeFileIE("e://fuzzlog.txt",'id_' + rId + '.style["' + rStyle + '"] = "' + rStyleVal + '";');
            id[rId].style[rStyle] = rStyleVal;
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: styleMan: ' + e.message);
    }
}

function layout() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] layout()');
    }

    try {
        for (var i = 0; i < 3; i++) {
            var rId = randId(true, false, true);
            if (rId == 'none') {
                return;
            }

            writeFileIE("e://fuzzlog.txt",'id_' + rId + '.offsetParent;');
            id[rId].offsetParent;
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: layout: ' + e.message);
    }
}

function clearSub() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] clearSub()');
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

                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.innerHTML = "demi6od";');
                id[rId].innerHTML = 'demi6od';

                removeCache(caches);
                break;

            case 1:
                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.outerHTML = "";');
                id[rId].outerHTML = '';

                removeThis(id[rId], 'direct');
                break;

            case 2:
                var caches = [];
                removeChildren(id[rId], 'delay', caches);

                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.innerText = "demi6od";');
                id[rId].innerText = 'demi6od';

                removeCache(caches);
                break;

            case 3:
                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.outerText = "";');
                id[rId].outerText = '';
                removeThis(id[rId], 'direct');
                break;

            case 4:
                var caches = [];
                removeChildren(id[rId], 'delay', caches);

                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.innerHTML = ' + 'id_' + rId + '.innerHTML;');
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

                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.outerHTML = ' + 'id_' + rId + '.outerHTML;');
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

                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.innerText = ' + 'id_' + rId + '.innerText;');
                id[rId].innerText = id[rId].innerText;

                removeCache(caches);
                break;

            case 7:
                writeFileIE("e://fuzzlog.txt",'id_' + rId + '.outerText = ' + 'id_' + rId + '.outerText;');
                id[rId].outerText = id[rId].outerText;

                removeThis(id[rId], 'direct');
                break;

            default:
                writeFileIE("e://fuzzlog.txt",'// Warning: clearSub default');
                break;
        }

        writeFileIE("e://fuzzlog.txt",'gc();');
        // gc();
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: clearSub: ' + e.message);
    }
}

function clearAll() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] clearAll()');
    }

    try {
        for (var i = 1; i < id.length; i++) {
            if (id[i]) {
                writeFileIE("e://fuzzlog.txt",'id_' + i + ' = null;');
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
                    writeFileIE("e://fuzzlog.txt",'document.write("");');
                    document.write('');
                    break;
                case 1:
                    writeFileIE("e://fuzzlog.txt",'document.writeln("");');
                    document.writeln('');
                    break;
                case 2:
                    writeFileIE("e://fuzzlog.txt",'document.open("");');
                    document.open('');
                    break;
                default:
                    writeFileIE("e://fuzzlog.txt",'// Warning: clearAll default');
                    break;
            }
        } else {
            writeFileIE("e://fuzzlog.txt",'document.documentElement.innerHTML = "";');
            document.documentElement.innerHTML = '';
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: clearAll: ' + e.message);
    }

    writeFileIE("e://fuzzlog.txt",'gc();');
    // gc();

    //window.open('', '_self', '');
    //window.close();
}

function DOMMan() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] DOMMan()');
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
                writeFileIE("e://fuzzlog.txt",'id_' + rIds[0] + '.appendChild(id_' + rIds[1]  + ');');
                id[rIds[0]].appendChild(id[rIds[1]]);
                break;

            // Node insertBefore(in Node newChild, in Node refChild)
            case 1:
                writeFileIE("e://fuzzlog.txt",'id_' + rIds[0] + '.parentNode.insertBefore(id_' + rIds[1]  + ', id_' + rIds[0] + ');');
                id[rIds[0]].parentNode.insertBefore(id[rIds[1]], id[rIds[0]]);
                break;

            // Node insertAdjacentElement(in String sWhere, in Node newSibling)
            case 2:
                writeFileIE("e://fuzzlog.txt",'id_' + rIds[0] + '.insertAdjacentElement("' + rDOMPos + '", id_' + rIds[1]  + ');');
                id[rIds[0]].insertAdjacentElement(rDOMPos, id[rIds[1]]);
                break;

            // insertAdjacentHTML(in String sWhere, in String htmlCode)
            case 3:
                writeFileIE("e://fuzzlog.txt",'id_' + rIds[0] + '.insertAdjacentHTML("' + rDOMPos + '", "' + rHTMLCode  + '");');
                id[rIds[0]].insertAdjacentHTML(rDOMPos, rHTMLCode);
                break;

            // insertAdjacentText(in String sWhere, in String text)
            case 4:
                writeFileIE("e://fuzzlog.txt",'id_' + rIds[0] + '.insertAdjacentText("' + rDOMPos + '", "' + rStr  + '");');
                id[rIds[0]].insertAdjacentText(rDOMPos, rStr);
                break;

            // Node removeChild(in Node oldChild)
            case 5:
                if (percent(10)) {
                    writeFileIE("e://fuzzlog.txt",'id_' + rIds[0] + '.parentNode.removeChild(id_' + rIds[0] + ');');
                    id[rIds[0]].parentNode.removeChild(id[rIds[0]]);
                    removeThis(id[rIds[0]], 'direct');
                }
                break;

            // Node replaceChild(in Node newChild, in Node oldChild)
            case 6:
                if (percent(10)) {
                    writeFileIE("e://fuzzlog.txt",'id_' + rIds[0] + '.parentNode.replaceChild(id_' + rIds[1]  + ', id_' + rIds[0] + ');');
                    id[rIds[0]].parentNode.replaceChild(id[rIds[1]], id[rIds[0]]);
                    removeThis(id[rIds[0]], 'direct');
                }
                break;

            // Node cloneNode(in boolean deep);
            case 7:
                writeFileIE("e://fuzzlog.txt",'var clonedNode = id_' + rIds[1] + '.cloneNode(' + rBool + ');');
                var clonedNode = id[rIds[1]].cloneNode(rBool);
                writeFileIE("e://fuzzlog.txt",'id_' + rIds[0] + '.appendChild(clonedNode);');
                id[rIds[0]].appendChild(clonedNode);

                writeFileIE("e://fuzzlog.txt",'clonedNode.id = ' + id.length + ';');
                clonedNode.id = id.length;
                writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = clonedNode;');
                id[id.length] = clonedNode;

                if (rBool) {
                    clearChildrenId(clonedNode);
                }

                writeFileIE("e://fuzzlog.txt",'clonedNode = null;');
                clonedNode = null;
                break;

           default:
                writeFileIE("e://fuzzlog.txt",'// Warning: DOMMan default');
                break;
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: DOMMan: ' + e.message);
    }
}

function winMan() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] winMan()');
    }

    try {
        propfMan([demicm.winId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.winId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: winMan: ' + e.message);
    }
}

function attrMan() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] attrMan()');
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
                writeFileIE("e://fuzzlog.txt",'// Warning: attrMan default');
                break;
        }
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: attrMan: ' + e.message);
    }
}

function canvas2dMan() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] canvas2dMan()');
    }

    try {
        propfMan([demicm.canvas2dId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.canvas2dId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: canvas2dMan: ' + e.message);
    }
}

function webglMan() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] webglMan()');
    }

    try {
        if (percent(20)) {
            propfMan([demicm.webglId], 1, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }

        propfMan([demicm.webglId], 1, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: webglMan: ' + e.message);
    }

    if (percent(demicm.DRAW_WEBGL_PER)) {
        drawWebgl();
    }
}

function fireEvent() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] fireEvent()');
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

        writeFileIE("e://fuzzlog.txt",'var evt = document.createEvent("' + evtName + '");');
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
                writeFileIE("e://fuzzlog.txt",'// Warning: fireEvent else ' + evtParams[i]);
            }

            logParam += ',';
            evtParam += ',';
        }

        // trim paramStr
        if (evtParam != '') {
            logParam = logParam.substr(0, logParam.length - 1);
            evtParam = evtParam.substr(0, evtParam.length - 1);
        }

        writeFileIE("e://fuzzlog.txt",'evt.' + evtFunc + '("' + rEvtType + '",' + logParam + ');');
        eval('evt.' + evtFunc + '("' + rEvtType + '",' + evtParam + ');');

        if (document.activeElement && percent(30)) {
            writeFileIE("e://fuzzlog.txt",'document.activeElement.dispatchEvent(evt);');
            document.activeElement.dispatchEvent(evt);
        } else {
            writeFileIE("e://fuzzlog.txt",'id_' + rId + '.dispatchEvent(evt);');
            id[rId].dispatchEvent(evt);
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: fireEvent: ' + e.message);
    }
}

/************************************* finale *************************************/
function finale() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] finale()');
    }

    /* Spray is not necessary
    writeFileIE("e://fuzzlog.txt",'occupySprayInt(' + demicm.ARRAY_LEN_MAX +', ' + demicm.ARRAY_CNT + ');');
    //occupySprayInt(demicm.ARRAY_LEN_MAX, demicm.ARRAY_CNT);
    */

    writeFileIE("e://fuzzlog.txt",'gc();');
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
        writeFileIE("e://fuzzlog.txt",'[+] reuseElem()');
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
        writeFileIE("e://fuzzlog.txt",'// Error: reuseElem: ' + e.message);
    }
}

function reuseRetElem() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] reuseRetElem()');
    }

    try {
        for (var i = 0; i < idR.length; i++) {
            if (idR[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'prop', 'ret');
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'func', 'ret');

                writeFileIE("e://fuzzlog.txt",'id_' + (i + demicm.RET_OFFSET) + ' = null;');
                idR[i] = null;
            }
        }

        writeFileIE("e://fuzzlog.txt",'gc();');
        // gc();
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: reuseRetElem: ' + e.message);
    }
}

function reuseSpec() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] reuseSpec()');
    }

    try {
        for (var i = 0; i < idS.length; i++) {
            if (idS[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'prop', 'spec');
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'func', 'spec');

                if (i != demicm.openId) {
                    writeFileIE("e://fuzzlog.txt",'id_' + (i + demicm.SPEC_OFFSET) + ' = null;');
                    idS[i] = null;
                }
            }
        }

        writeFileIE("e://fuzzlog.txt",'gc();');
        // gc();
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: reuseSpec: ' + e.message);
    }
}

function relayout() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] relayout()');
    }

    try {
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + ' = document.createElement("a");');
        idS[demicm.relayoutId] = document.createElement('a');
        writeFileIE("e://fuzzlog.txt",'document.documentElement.appendChild(id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + ');');
        document.documentElement.appendChild(idS[demicm.relayoutId]); 

        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.offsetParent;');
        idS[demicm.relayoutId].offsetParent;

        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML = id_'
            + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML;');
        idS[demicm.relayoutId].innerHTML = idS[demicm.relayoutId].innerHTML;

        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.relayoutId + demicm.SPEC_OFFSET) + '.innerHTML = "";');
        idS[demicm.relayoutId].innerHTML = '';
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: relayout: ' + e.message);
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
        writeFileIE("e://fuzzlog.txt",'[+] normalOperate()');
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
        writeFileIE("e://fuzzlog.txt",'gc();');
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
        writeFileIE("e://fuzzlog.txt",'[+] multiClear()');
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
                writeFileIE("e://fuzzlog.txt",'// Warning: multiClear default');
                break;
        }

        switch (rand(2)) {
            case 0:
                if (demicm.multiType == 0) {
                    writeFileIE("e://fuzzlog.txt",'id_' + (wId + demicm.SPEC_OFFSET) + '.document.body.outerHTML = "";');
                    idS[wId].document.body.outerHTML = '';
                } else {
                    writeFileIE("e://fuzzlog.txt",'id_' + (fId + demicm.SPEC_OFFSET) + '.contentDocument.body.outerText = "";');
                    idS[fId].contentDocument.body.outerText = '';
                }
                break;
            case 1:
                if (demicm.multiType == 0) {
                    writeFileIE("e://fuzzlog.txt",'id_' + (wId + demicm.SPEC_OFFSET) + '.document.write("");');
                    idS[wId].document.write('');
                } else {
                    writeFileIE("e://fuzzlog.txt",'id_' + (fId + demicm.SPEC_OFFSET) + '.contentDocument.write("");');
                    idS[fId].contentDocument.write('');
                }
                break;
            default:
                writeFileIE("e://fuzzlog.txt",'// Warning: multiClear default');
                break;
        }

    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: multiClear: ' + e.message);
    }
}

function multiMan() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] multiMan()');
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
                    writeFileIE("e://fuzzlog.txt",'// Warning: multiMan default');
                    break;
            }
        } while (!idS[fId] && count++ < demicm.MAX_ITR)

        if (percent(50)) {  
            propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: multiMan: ' + e.message);
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
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.openId + demicm.SPEC_OFFSET) + ' = window.open("demicmTargetIE.html");');
        idS[demicm.openId] = window.open('demicmTargetIE.html');
    } else {
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.openId + demicm.SPEC_OFFSET) + ' = window.open("demicmTarget.html");');
        idS[demicm.openId] = window.open('demicmTarget.html');
    }
}

function appendIframe(rId) {
    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + ' = document.createElement("iframe");');
    idS[demicm.ifrId] = document.createElement('iframe');
    if (demicm.BROWSER == 'IE') {
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.src = "demicmFrameIE.html";');
        idS[demicm.ifrId].src = 'demicmFrameIE.html';
    } else {
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.src = "demicmFrame.html";');
        idS[demicm.ifrId].src = 'demicmFrame.html';
    }

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + ');');
    id[rId].appendChild(idS[demicm.ifrId]);
}

function appendFrame(rId) {
    // Add frame set
    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.frsId + demicm.SPEC_OFFSET) + ' = document.createElement("frameset");');
    idS[demicm.frsId] = document.createElement('frameset');
    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.cols = "15%, 10%, 5%";');
    idS[demicm.frsId].cols = '15%, 10%, 5%';

    writeFileIE("e://fuzzlog.txt",'id_' + rId + '.appendChild(id_' + (demicm.frsId + demicm.SPEC_OFFSET) + ');');
    id[rId].appendChild(idS[demicm.frsId]);

    // Add frame
    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.frId + demicm.SPEC_OFFSET) + ' = document.createElement("frame");');
    idS[demicm.frId] = document.createElement('frame');
    if (demicm.BROWSER == 'IE') {
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.src = "demicmFrameIE.html";');
        idS[demicm.frId].src = 'demicmFrameIE.html';
    } else {
        writeFileIE("e://fuzzlog.txt",'id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.src = "demicmFrame.html";');
        idS[demicm.frId].src = 'demicmFrame.html';
    }

    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(id_' + (demicm.frId + demicm.SPEC_OFFSET) + ');');
    idS[demicm.frsId].appendChild(idS[demicm.frId]);

    // Add frame with no id
    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(document.createElement("frame"));');
    idS[demicm.frsId].appendChild(document.createElement('frame'));
    writeFileIE("e://fuzzlog.txt",'id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(document.createElement("frame"));');
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
                writeFileIE("e://fuzzlog.txt",'// Warning: constructMulti default');
                break;
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: constructMulti: ' + e.message);
    }
}

function getWindow() {
    var rDocId = rand(idS[demicm.openId].document.all.length);

    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = id_' + (demicm.openId + demicm.SPEC_OFFSET) + '.document.all[' + rDocId + '];');
    id[id.length] = idS[demicm.openId].document.all[rDocId];
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
}

function getIframe() {
    var rDocId = rand(idS[demicm.ifrId].contentDocument.all.length);

    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.contentDocument.all[' + rDocId + '];');
    id[id.length] = idS[demicm.ifrId].contentDocument.all[rDocId];
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
}

function getFrame() {
    var rDocId = rand(idS[demicm.frId].contentDocument.all.length);

    writeFileIE("e://fuzzlog.txt",'id_' + id.length + ' = id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.contentDocument.all[' + rDocId + '];');
    id[id.length] = idS[demicm.frId].contentDocument.all[rDocId];
    writeFileIE("e://fuzzlog.txt",'id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
}

function getMultiElems(elemCnt) {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] getMultiElems()');
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
                    writeFileIE("e://fuzzlog.txt",'// Warning: getMultiElems default');
                    break;
            }
        }
    } catch (e) {
        writeFileIE("e://fuzzlog.txt",'// Error: getMultiElems: ' + e.message);
    }
}

function demiStart() {
    /* BEGIN FUZZING CODE */
    // logger = new LOGGER('01');
    // logger.starting();

    writeFileIE("e://fuzzlog.txt",'// Fuzz start', true);
    
    if (demicm.BROWSER == 'IE') {
        writeFileIE("e://fuzzlog.txt",'gc = function() { CollectGarbage(); arr = new Array(); for (var i = 0; i < 0x3f0; i++) { arr[i] = document.createElement("a"); }'
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
        writeFileIE("e://fuzzlog.txt",'gc = function() { var arrs = []; for (i = 0; i < 100000; i++) { arrs[i] = new Array(); } return arrs; }');
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
        writeFileIE("e://fuzzlog.txt",'// demicm.IS_FUZZ_GROUP = ' + rBool + ';');
        demicm.IS_FUZZ_GROUP = rBool;

        rBool = randBool();
        writeFileIE("e://fuzzlog.txt",'// demicm.IS_FUZZ_MULTI = ' + rBool + ';');
        demicm.IS_FUZZ_MULTI = rBool;

        rBool = randBool();
        writeFileIE("e://fuzzlog.txt",'// demicm.IS_FUZZ_SPEC = ' + rBool + ';');
        demicm.IS_FUZZ_SPEC = rBool;
    }

    preludeFirst();

    if (demicm.IS_FUZZ_MULTI) {
        writeFileIE("e://fuzzlog.txt",'/-demiFront = function() {');
    } else {
        demiFront();
    }
}

function demiFront() {
    if (demicm.IS_DEBUG) {
        writeFileIE("e://fuzzlog.txt",'[+] demiFront()');
    }

    // Clear demiFront function
    writeFileIE("e://fuzzlog.txt",'demiFront = function(){};');
    demiFront = function(){};

    if (demicm.IS_FUZZ_MULTI) {
        getMultiElems(demicm.MULTI_ELEM_NUM);
    }

    preludeSecond();

    writeFileIE("e://fuzzlog.txt",'// we are now begining to fuzz...');
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
        writeFileIE("e://fuzzlog.txt",'[+] demiBack()');
    }

    writeFileIE("e://fuzzlog.txt",'/-demiBack = function() {');

    operate(demicm.BACK_OP_CNT);

    finale();

    // For setTimeout
    writeFileIE("e://fuzzlog.txt",'/-};');
    writeFileIE("e://fuzzlog.txt",'setTimeout("demiBack()",100);');

    if (demicm.IS_FUZZ_MULTI) {
        // For demiFront
        writeFileIE("e://fuzzlog.txt",'/-};');
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

    writeFileIE("e://fuzzlog.txt",'// Fuzz finished');

    /* END FUZZING CODE */
    // logger.finished();
    // window.location.href = window.location.protocol + "//" + window.location.host + "/grinder";
}

