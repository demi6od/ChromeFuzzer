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

// Prop or func return object
var idR = [];
// Ret object tag kinds
demicm.tagRs = [];
demicm.tagRBlackList = ['Window', 'document'];

// Fuzzer type
demicm.IS_IE = false;

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

// DOM Tree initial
demicm.INI_ELEM_NUM = 24; // Initial ref elem number
demicm.NO_REF_ELEM_PER = 50; // no ref elem percent
demicm.BODY_RATIO = 5; 
demicm.HEAD_RATIO = 3; 
demicm.HTML_RATIO = 1; 
demicm.DANGLE_RATIO = 3; 

demicm.TEXT_NUM = 15; // TextNode number
demicm.REF_TEXT_PER = 15; // no ref elem percent
demicm.EVENT_NUM = 30; // Event num for per elem
demicm.EVENT_ELEM_PER = 50; // Elems percent to set event

demicm.CSS_DIVERSE_NUM = 3; // 3

demicm.PROP_STY_INI_NUM = 3; // 3

demicm.MULTI_ELEM_NUM = 5; // 5

// Operate number
demicm.FRONT_OP_CNT = 30; // 30 | 60
demicm.BACK_OP_CNT = 20; // 20 | 40
demicm.EVENT_OP_CNT = 10; // 10 | 20

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
demicm.EVENT_OP_PER = 50; // 50 | 60
demicm.EVENT_CLEAR_PER = 60; // 60 | 80
demicm.EVENT_CLEAR_ALL_PER = 20; // 20 | 30

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
        console.log('id_' + (demicm.niId + demicm.SPEC_OFFSET) 
            + ' = document.createNodeIterator(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);');
        idS[demicm.niId] = document.createNodeIterator(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch (e) {
        console.log('// Error: constructNodeIterator: ' + e.message);
    }
}

function constructTreeWalker() {
    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        console.log('id_' + (demicm.twId + demicm.SPEC_OFFSET) 
            + ' = document.createTreeWalker(id_' + rId + ', NodeFilter.SHOW_ALL, null, false);');
        idS[demicm.twId] = document.createTreeWalker(id[rId], NodeFilter.SHOW_ALL, null, false);
    } catch (e) {
        console.log('// Error: constructTreeWalker: ' + e.message);
    }
}

function constructRange() {
    try {
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + ' = document.createRange();');
        idS[demicm.rangeId] = document.createRange();

        setRange();
    } catch (e) {
        console.log('// Error: constructRange: ' + e.message);
    }
}

function setRange() {
    if (demicm.IS_DEBUG) {
        console.log('[+] setRange()');
    }

    try {
        var rId = randId();
        if (rId == 'none') {
            return;
        }
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setStart(id_' + rId + ', 0);');
        idS[demicm.rangeId].setStart(id[rId], 0);

        rId = randId();
        if (rId == 'none') {
            return;
        }
        console.log('id_' + (demicm.rangeId + demicm.SPEC_OFFSET) + '.setEnd(id_' + rId + ', 0);');
        idS[demicm.rangeId].setEnd(id[rId], 0);
    } catch (e) {
        console.log('// Error: setRange: ' + e.message);
    }
}

function constructSelection() {
    try {
        console.log('id_' + (demicm.selId + demicm.SPEC_OFFSET) + ' = window.getSelection();');
        idS[demicm.selId] = window.getSelection();

        setSelection();
    } catch (e) {
        console.log('// Error: constructSelection: ' + e.message);
    }
}

function setSelection() {
    if (demicm.IS_DEBUG) {
        console.log('[+] setSelection()');
    }

    try {
        var rId = randId();
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
    } catch (e) {
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
        while (idS[demicm.curItrNodeId] && count++ < demicm.MAX_ITR)  {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            console.log('id_' + (demicm.curItrNodeId + demicm.SPEC_OFFSET) 
                + ' = id_' + (demicm.niId + demicm.SPEC_OFFSET) + '.nextNode();');
            idS[demicm.curItrNodeId] = idS[demicm.niId].nextNode();
        }
    } catch (e) {
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
        while (idS[demicm.curTreeNodeId] && count++ < demicm.MAX_ITR)  {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');

            console.log('id_' + (demicm.curTreeNodeId + demicm.SPEC_OFFSET) 
                    + ' = id_' + (demicm.twId + demicm.SPEC_OFFSET) + '.nextNode();');
            idS[demicm.curTreeNodeId] = idS[demicm.twId].nextNode();
        }
    } catch (e) {
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
                default:
                    console.log('// Warning: moveIterator default');
                    break;
            }

            propfMan([demicm.niId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curItrNodeId]) {
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curItrNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
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
                default:
                    console.log('// Warning: moveTreeWalker default');
                    break;
            }

            propfMan([demicm.twId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        }	

        if (idS[demicm.curTreeNodeId]) {
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([demicm.curTreeNodeId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
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

        var rId = randId();
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

            default:
                console.log('// Warning: alterRange default');
                break;
        }		
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
        console.log('// Error: reuseGroup: ' + e.message);
    }
}

function objMan(type) {
    if (demicm.IS_DEBUG) {
        console.log('[+] objMan(' + type + ')');
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
    if (!demicm.IS_IE) {
        if (percent(demicm.WORKER_PER)) {
            appendWorker();
        }
        if (percent(demicm.SHARED_WORKER_PER)) {
            appendSharedWorker();
        }
    }

    setEvtHandler();

    addCSS();

    setPropSty();
}

function setPropSty() {
    if (demicm.IS_DEBUG) {
        console.log('[+] setProp()');
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
        console.log('// Error: setPropStyle: ' + e.message);
    }
}

function setEnv() {
    // Set HTML property
    if (percent(demicm.ENV_PER)) {
        console.log('document.documentElement.contentEditable = "true";');
        document.documentElement.contentEditable = 'true';
        console.log('document.body.contentEditable = "true";');
        document.body.contentEditable = 'true';
        console.log('document.head.contentEditable = "true";');
        document.head.contentEditable = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        console.log('document.documentElement.dir = "rtl";');
        document.documentElement.dir = 'rtl';
        console.log('document.body.dir = "rtl";');
        document.body.dir = 'rtl';
        console.log('document.head.dir = "rtl";');
        document.head.dir = 'rtl';
    }

    if (percent(demicm.ENV_PER)) {
        console.log('document.documentElement.draggable = "true";');
        document.documentElement.draggable = 'true';
        console.log('document.body.draggable = "true";');
        document.body.draggable = 'true';
        console.log('document.head.draggable = "true";');
        document.head.draggable = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        console.log('document.documentElement.spellcheck = "true";');
        document.documentElement.spellcheck = 'true';
        console.log('document.body.spellcheck = "true";');
        document.body.spellcheck = 'true';
        console.log('document.head.spellcheck = "true";');
        document.head.spellcheck = 'true';
    }

    if (percent(demicm.ENV_PER)) {
        console.log('document.documentElement.translate = "true";');
        document.documentElement.translate = 'true';
        console.log('document.body.translate = "true";');
        document.body.translate = 'true';
        console.log('document.head.translate = "true";');
        document.head.translate = 'true';
    }

    // Clear body onload event
    console.log('document.body.onload = null;');
    document.body.onload = null;

    // Set at least one idR item for propfMan
    console.log('var id_' + demicm.RET_OFFSET + ' = null;');
    idR[0] = null;

    if (!demicm.IS_IE && percent(demicm.DES_PER)) {
        console.log('document.designMode = "on";');
        document.designMode = 'on';
    }

    // Set props and funcs cache
    getPropAndFunc();
}

function eventHandler() {
    if (percent(demicm.EVENT_MAN_PER)) {
        console.log('id_' + (demicm.evtId + demicm.SPEC_OFFSET) + ' = event;');
        idS[demicm.evtId] = event;

        propfMan([demicm.evtId], demicm.MAX_REC_DEPTH_EVT, demicm.MAX_RET_REC_DEPTH_EVT, 'prop', 'spec');
        propfMan([demicm.evtId], demicm.MAX_REC_DEPTH_EVT, demicm.MAX_RET_REC_DEPTH_EVT, 'func', 'spec');
    }

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
                    id[i][rEvt] = new Function('console.log("//id_' + i 
                        + '[\'' + rEvt + '\'] = function()");console.log("/-{");eventHandler();');
                }
            }
        } catch (e) {
            console.log('// Error: setEvtHandler: ' + e.message);
        }
    }
}

function addTextNode() {
    for (var i = 0; i < demicm.TEXT_NUM; i++) {
        try {
            var rStr = randStr(rand(0x100)); 
            var rId = randId(true);

            if (percent(demicm.REF_TEXT_PER)) {
                // Add ref textNode 
                console.log('id_' + id.length + ' = document.createTextNode("' + rStr + '");');
                id[id.length] = document.createTextNode(rStr);
                console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
                id[id.length - 1].id = id.length - 1;

                console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
                id[rId].appendChild(id[id.length - 1]);
            } else {
                // Add no ref textNode 
                console.log('id_' + rId + '.appendChild(document.createTextNode("' + rStr + '"));');
                id[rId].appendChild(document.createTextNode(rStr));
            }
        } catch (e) {
            console.log('// Error: addTextNode: ' + e.message);
        }
    }
}

function appendForm(rId, rTxt) {
    // Add form
    console.log('id_' + id.length + ' = document.createElement("form");');
    id[id.length] = document.createElement('form');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var formId = id.length - 1;

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add input text
    console.log('id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.type = "text";');
    id[id.length - 1].type = 'text';
    var inputTextId = id.length - 1;

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add label
    console.log('id_' + id.length + ' = document.createElement("label");');
    id[id.length] = document.createElement('label');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.htmlFor = ' + inputTextId + ';');
    id[id.length - 1].htmlFor = inputTextId;

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add input password
    console.log('id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.type = "password";');
    id[id.length - 1].type = 'password';

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input checkbox
    console.log('id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.type = "checkbox";');
    id[id.length - 1].type = 'checkbox';
    console.log('id_' + (id.length - 1) + '.name = "checkbox";');
    id[id.length - 1].name = 'checkbox';

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    console.log('id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.type = "checkbox";');
    id[id.length - 1].type = 'checkbox';
    console.log('id_' + (id.length - 1) + '.name = "checkbox";');
    id[id.length - 1].name = 'checkbox';

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input submit
    console.log('id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.type = "submit";');
    id[id.length - 1].type = 'submit';

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input range
    console.log('id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.type = "range";');
    id[id.length - 1].type = 'range';

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add input number
    console.log('id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.type = "number";');
    id[id.length - 1].type = 'number';

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add output
    console.log('id_' + id.length + ' = document.createElement("output");');
    id[id.length] = document.createElement('output');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add keygen
    console.log('id_' + id.length + ' = document.createElement("keygen");');
    id[id.length] = document.createElement('keygen');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add fieldset
    console.log('id_' + id.length + ' = document.createElement("fieldset");');
    id[id.length] = document.createElement('fieldset');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var fieldsetId = id.length - 1;

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add legend
    console.log('id_' + id.length + ' = document.createElement("legend");');
    id[id.length] = document.createElement('legend');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add input button
    console.log('id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.type = "button";');
    id[id.length - 1].type = 'button';

    console.log('id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);

    // Add input radio
    console.log('id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.type = "radio";');
    id[id.length - 1].type = 'radio';
    console.log('id_' + (id.length - 1) + '.name = "radio";');
    id[id.length - 1].name = 'radio';

    console.log('id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);

    console.log('id_' + id.length + ' = document.createElement("input");');
    id[id.length] = document.createElement('input');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.type = "radio";');
    id[id.length - 1].type = 'radio';
    console.log('id_' + (id.length - 1) + '.name = "radio";');
    id[id.length - 1].name = 'radio';

    console.log('id_' + fieldsetId + '.appendChild(id_' + (id.length - 1) + ');');
    id[fieldsetId].appendChild(id[id.length - 1]);

    // Add datalist
    console.log('id_' + id.length + ' = document.createElement("datalist");');
    id[id.length] = document.createElement('datalist');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var datalistId = id.length - 1;

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add option
    console.log('id_' + id.length + ' = document.createElement("option");');
    id[id.length] = document.createElement('option');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + datalistId + '.appendChild(id_' + (id.length - 1) + ');');
    id[datalistId].appendChild(id[id.length - 1]);

    // Add option with no id
    console.log('id_' + datalistId + '.appendChild(document.createElement("option"));');
    id[datalistId].appendChild(document.createElement('option'));
    console.log('id_' + datalistId + '.appendChild(document.createElement("option"));');
    id[datalistId].appendChild(document.createElement('option'));

    // Add textarea
    console.log('id_' + id.length + ' = document.createElement("textarea");');
    id[id.length] = document.createElement('textarea');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add select
    console.log('id_' + id.length + ' = document.createElement("select");');
    id[id.length] = document.createElement('select');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var selId = id.length - 1;

    console.log('id_' + formId + '.appendChild(id_' + (id.length - 1) + ');');
    id[formId].appendChild(id[id.length - 1]);

    // Add option
    console.log('id_' + id.length + ' = document.createElement("option");');
    id[id.length] = document.createElement('option');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + selId + '.appendChild(id_' + (id.length - 1) + ');');
    id[selId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add option with no id
    console.log('id_' + selId + '.appendChild(document.createElement("option"));');
    id[selId].appendChild(document.createElement('option'));
    console.log('id_' + selId + '.appendChild(document.createElement("option"));');
    id[selId].appendChild(document.createElement('option'));

    // Add optgroup
    console.log('id_' + id.length + ' = document.createElement("optgroup");');
    id[id.length] = document.createElement('optgroup');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var optgroupId = id.length - 1;

    console.log('id_' + selId + '.appendChild(id_' + (id.length - 1) + ');');
    id[selId].appendChild(id[id.length - 1]);

    // Add option
    console.log('id_' + id.length + ' = document.createElement("option");');
    id[id.length] = document.createElement('option');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + optgroupId + '.appendChild(id_' + (id.length - 1) + ');');
    id[optgroupId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add option with no id
    console.log('id_' + optgroupId + '.appendChild(document.createElement("option"));');
    id[optgroupId].appendChild(document.createElement('option'));
    console.log('id_' + optgroupId + '.appendChild(document.createElement("option"));');
    id[optgroupId].appendChild(document.createElement('option'));
}

function appendList(rId, rTxt) {
    // Add ol
    console.log('id_' + id.length + ' = document.createElement("ol");');
    id[id.length] = document.createElement('ol');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var olId = id.length - 1;

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add li
    console.log('id_' + id.length + ' = document.createElement("li");');
    id[id.length] = document.createElement('li');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + olId + '.appendChild(id_' + (id.length - 1) + ');');
    id[olId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add li with no id
    console.log('id_' + olId + '.appendChild(document.createElement("li"));');
    id[olId].appendChild(document.createElement('li'));
    console.log('id_' + olId + '.appendChild(document.createElement("li"));');
    id[olId].appendChild(document.createElement('li'));

    // Add ul
    console.log('id_' + id.length + ' = document.createElement("ul");');
    id[id.length] = document.createElement('ul');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var ulId = id.length - 1;

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add li
    console.log('id_' + id.length + ' = document.createElement("li");');
    id[id.length] = document.createElement('li');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + ulId + '.appendChild(id_' + (id.length - 1) + ');');
    id[ulId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add li with no id
    console.log('id_' + ulId + '.appendChild(document.createElement("li"));');
    id[ulId].appendChild(document.createElement('li'));
    console.log('id_' + ulId + '.appendChild(document.createElement("li"));');
    id[ulId].appendChild(document.createElement('li'));

    // Add dl
    console.log('id_' + id.length + ' = document.createElement("dl");');
    id[id.length] = document.createElement('dl');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var dlId = id.length - 1;

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add dt
    console.log('id_' + id.length + ' = document.createElement("dt");');
    id[id.length] = document.createElement('dt');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + dlId + '.appendChild(id_' + (id.length - 1) + ');');
    id[dlId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add dd
    console.log('id_' + id.length + ' = document.createElement("dd");');
    id[id.length] = document.createElement('dd');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + dlId + '.appendChild(id_' + (id.length - 1) + ');');
    id[dlId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add dt and dd with no id
    console.log('id_' + dlId + '.appendChild(document.createElement("dt"));');
    id[dlId].appendChild(document.createElement('dt'));
    console.log('id_' + dlId + '.appendChild(document.createElement("dd"));');
    id[dlId].appendChild(document.createElement('dd'));
    console.log('id_' + dlId + '.appendChild(document.createElement("dt"));');
    id[dlId].appendChild(document.createElement('dt'));
    console.log('id_' + dlId + '.appendChild(document.createElement("dd"));');
    id[dlId].appendChild(document.createElement('dd'));
}

function appendNetwork(rId, rTxt) {
    // Add WebSocket
    console.log('id_' + id.length + ' = new WebSocket("ws://127.0.0.1:8080", "' + rTxt + '");');
    id[id.length] = new WebSocket('ws://127.0.0.1:8080', rTxt);
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    // Add XMLHttpRequest
    console.log('id_' + id.length + ' = new XMLHttpRequest();');
    id[id.length] = new XMLHttpRequest();
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var xhrId = id.length - 1;

    console.log('id_' + xhrId + '.open("GET", "http://127.0.0.1:8080", true);');
    id[xhrId].open("GET", "http://127.0.0.1:8080", true);
}

function appendTable(rId, rTxt) {
    // Add table
    console.log('id_' + id.length + ' = document.createElement("table");');
    id[id.length] = document.createElement('table');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var tabId = id.length - 1;

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add caption
    console.log('id_' + id.length + ' = document.createElement("caption");');
    id[id.length] = document.createElement('caption');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add colgroup
    console.log('id_' + id.length + ' = document.createElement("colgroup");');
    id[id.length] = document.createElement('colgroup');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var colgId = id.length - 1;

    console.log('id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add col
    console.log('id_' + id.length + ' = document.createElement("col");');
    id[id.length] = document.createElement('col');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.span = "2";');
    id[id.length - 1].span = '2';

    console.log('id_' + colgId + '.appendChild(id_' + (id.length - 1) + ');');
    id[colgId].appendChild(id[id.length - 1]);

    // Add col with no id
    console.log('id_' + colgId + '.appendChild(document.createElement("col"));');
    id[colgId].appendChild(document.createElement('col'));
    console.log('id_' + colgId + '.appendChild(document.createElement("col"));');
    id[colgId].appendChild(document.createElement('col'));

    // Add thead
    console.log('id_' + id.length + ' = document.createElement("thead");');
    id[id.length] = document.createElement('thead');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var theadId = id.length - 1;

    console.log('id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    console.log('id_' + id.length + ' = document.createElement("tr");');
    id[id.length] = document.createElement('tr');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    console.log('id_' + theadId + '.appendChild(id_' + (id.length - 1) + ');');
    id[theadId].appendChild(id[id.length - 1]);

    // Add th
    console.log('id_' + id.length + ' = document.createElement("th");');
    id[id.length] = document.createElement('th');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + trId + '.appendChild(id_' + (id.length - 1) + ');');
    id[trId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add th with no id
    console.log('id_' + trId + '.appendChild(document.createElement("th"));');
    id[trId].appendChild(document.createElement('th'));
    console.log('id_' + trId + '.appendChild(document.createElement("th"));');
    id[trId].appendChild(document.createElement('th'));

    // Add tfoot
    console.log('id_' + id.length + ' = document.createElement("tfoot");');
    id[id.length] = document.createElement('tfoot');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var tfootId = id.length - 1;

    console.log('id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    console.log('id_' + id.length + ' = document.createElement("tr");');
    id[id.length] = document.createElement('tr');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    console.log('id_' + tfootId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tfootId].appendChild(id[id.length - 1]);

    // Add td
    console.log('id_' + id.length + ' = document.createElement("td");');
    id[id.length] = document.createElement('td');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + trId + '.appendChild(id_' + (id.length - 1) + ');');
    id[trId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add td with no id
    console.log('id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));
    console.log('id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));

    // Add tbody
    console.log('id_' + id.length + ' = document.createElement("tbody");');
    id[id.length] = document.createElement('tbody');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var tbodyId = id.length - 1;

    console.log('id_' + tabId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tabId].appendChild(id[id.length - 1]);

    // Add tr
    console.log('id_' + id.length + ' = document.createElement("tr");');
    id[id.length] = document.createElement('tr');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var trId = id.length - 1;

    console.log('id_' + tbodyId + '.appendChild(id_' + (id.length - 1) + ');');
    id[tbodyId].appendChild(id[id.length - 1]);

    // Add td
    console.log('id_' + id.length + ' = document.createElement("td");');
    id[id.length] = document.createElement('td');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;

    console.log('id_' + trId + '.appendChild(id_' + (id.length - 1) + ');');
    id[trId].appendChild(id[id.length - 1]);
    console.log('id_' + (id.length - 1) + '.appendChild(document.createTextNode("' + rTxt + '"));');
    id[id.length - 1].appendChild(document.createTextNode(rTxt));

    // Add td with no id
    console.log('id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));
    console.log('id_' + trId + '.appendChild(document.createElement("td"));');
    id[trId].appendChild(document.createElement('td'));
}

function appendMap(rId, rTxt) {
    // Add map
    console.log('id_' + id.length + ' = document.createElement("map");');
    id[id.length] = document.createElement('map');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.name = "fuzzMap";');
    id[id.length - 1].name = 'fuzzMap';
    var mapId = id.length - 1;

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add area
    console.log('id_' + id.length + ' = document.createElement("area");');
    id[id.length] = document.createElement('area');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.href = "demicmFuzz.html";');
    id[id.length - 1].href = 'demicmFuzz.html';

    console.log('id_' + mapId + '.appendChild(id_' + (id.length - 1) + ');');
    id[mapId].appendChild(id[id.length - 1]);

    // Add area with no id
    console.log('id_' + mapId + '.appendChild(document.createElement("area"));');
    id[mapId].appendChild(document.createElement('area'));
    console.log('id_' + mapId + '.appendChild(document.createElement("area"));');
    id[mapId].appendChild(document.createElement('area'));

    // Add img
    console.log('id_' + id.length + ' = document.createElement("img");');
    id[id.length] = document.createElement('img');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.src = "demicmImg.gif";');
    id[id.length - 1].src = 'demicmImg.gif';
    console.log('id_' + (id.length - 1) + '.useMap = "#fuzzMap";');
    id[id.length - 1].useMap = '#fuzzMap';

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendAudio(rId, rTxt) {
    // Add audio
    console.log('id_' + id.length + ' = document.createElement("audio");');
    id[id.length] = document.createElement('audio');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var audioId = id.length - 1;

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add source
    console.log('id_' + id.length + ' = document.createElement("source");');
    id[id.length] = document.createElement('source');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.src = "demicmAudio.mp3";');
    id[id.length - 1].src = 'demicmAudio.mp3';
    console.log('id_' + (id.length - 1) + '.type = "audio/mp3";');
    id[id.length - 1].type = 'audio/mp3';

    console.log('id_' + audioId + '.appendChild(id_' + (id.length - 1) + ');');
    id[audioId].appendChild(id[id.length - 1]);
}

function appendVideo(rId, rTxt) {
    // Add video
    console.log('id_' + id.length + ' = document.createElement("video");');
    id[id.length] = document.createElement('video');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    console.log('id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    var videoId = id.length - 1;

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Add source
    console.log('id_' + id.length + ' = document.createElement("source");');
    id[id.length] = document.createElement('source');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.src = "demicmVideo.mp4";');
    id[id.length - 1].src = 'demicmVideo.mp4';
    console.log('id_' + (id.length - 1) + '.type = "video/mp4";');
    id[id.length - 1].type = 'video/mp4';

    console.log('id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');');
    id[videoId].appendChild(id[id.length - 1]);

    // Add track
    console.log('id_' + id.length + ' = document.createElement("track");');
    id[id.length] = document.createElement('track');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.src = "demicmTrack.vtt";');
    id[id.length - 1].src = 'demicmTrack.vtt';
    console.log('id_' + (id.length - 1) + '.kind = "sub";');
    id[id.length - 1].kind = 'sub';
    console.log('id_' + (id.length - 1) + '.srclang = "en";');
    id[id.length - 1].srclang = 'en';
    console.log('id_' + (id.length - 1) + '.label = "English";');
    id[id.length - 1].label = 'English';

    console.log('id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');');
    id[videoId].appendChild(id[id.length - 1]);

    // Add object
    console.log('id_' + id.length + ' = document.createElement("object");');
    id[id.length] = document.createElement('object');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.data = "demicmVideo.mp4";');
    id[id.length - 1].data = 'demicmVideo.mp4';
    console.log('id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    console.log('id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    var objectId = id.length - 1;

    console.log('id_' + videoId + '.appendChild(id_' + (id.length - 1) + ');');
    id[videoId].appendChild(id[id.length - 1]);

    // Add embed
    console.log('id_' + id.length + ' = document.createElement("embed");');
    id[id.length] = document.createElement('embed');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.src = "demicmData.swf";');
    id[id.length - 1].src = 'demicmData.swf';
    console.log('id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    console.log('id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    console.log('id_' + objectId + '.appendChild(id_' + (id.length - 1) + ');');
    id[objectId].appendChild(id[id.length - 1]);
}

function appendWorker() {
    // Add worker
    console.log('id_' + id.length + ' = new Worker("demicmWorker.js");');
    id[id.length] = new Worker('demicmWorker.js');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var workerId = id.length - 1;

    // Add onmessage event
    var rClearId = randId();
    var rClearDOMId = randId(true, false, true);
    console.log('id_' + workerId + '.onmessage = function () {try {id_' + rClearDOMId 
        + '.outerHTML = event.data;id_' + rClearId + '.outerText = event.data; } catch (e) {}};');
    id[workerId].onmessage = function () { 
        try {
            id[rClearDOMId].outerHTML = event.data; 
            id[rClearId].outerText = event.data; 
        } catch (e) {}
    };

    // Post message
    console.log('id_' + workerId + '.postMessage("ping");'); 
    id[workerId].postMessage('ping'); 
}

function appendSharedWorker() {
    // Add shared worker
    console.log('id_' + id.length + ' = new SharedWorker("demicmSharedWorker.js");');
    id[id.length] = new SharedWorker('demicmSharedWorker.js');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var workerId = id.length - 1;

    // Add onmessage event
    var rClearId = randId();
    var rClearDOMId = randId(true, false, true);
    console.log('id_' + workerId + '.port.onmessage = function () {try {id_' + rClearDOMId 
        + '.outerHTML = event.data;id_' + rClearId + '.outerText = event.data; } catch (e) {}};');
    id[workerId].port.onmessage = function () { 
        try {
            id[rClearDOMId].outerHTML = event.data; 
            id[rClearId].outerText = event.data; 
        } catch (e) {}
    };

    // Post message
    console.log('id_' + workerId + '.port.postMessage("ping");'); 
    id[workerId].port.postMessage('ping'); 
}

function appendSvg(rId, rTxt) {
    // Add svg
    console.log('id_' + id.length + ' = document.createElement("embed");');
    id[id.length] = document.createElement('embed');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.src = "demicmSvg.svg";');
    id[id.length - 1].src = 'demicmSvg.svg';
    console.log('id_' + (id.length - 1) + '.type = "image/svg+xml";');
    id[id.length - 1].type = 'image/svg+xml';
    console.log('id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    console.log('id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendXml(rId, rTxt) {
    // Add xml
    console.log('id_' + id.length + ' = document.createElement("embed");');
    id[id.length] = document.createElement('embed');
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    console.log('id_' + (id.length - 1) + '.src = "demicmXml.xml";');
    id[id.length - 1].src = 'demicmXml.xml';
    console.log('id_' + (id.length - 1) + '.type = "text/xml";');
    id[id.length - 1].type = 'text/xml';
    console.log('id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    console.log('id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);
}

function appendSpecElem() {
    if (demicm.IS_DEBUG) {
        console.log('[+] appendSpecElem()');
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
            console.log('// Warning: appendSpecElem default');
            break;
    }

    appendNetwork(rId, rTxt);
}

function constructBaseTree() {
    var htmlIds = [0];
    var headIds = [1];
    var bodyIds = [2];
    var dangleIds = [];

    var totalRat = demicm.BODY_RATIO + demicm.HEAD_RATIO + demicm.HTML_RATIO + demicm.DANGLE_RATIO; 
    var noRefIds = [];

    for (var i = 0; i < demicm.INI_ELEM_NUM; i++) {
        var rTag = randItem(demicm.strictTags);
        if (!inArr(demicm.idTags, rTag)) {
            demicm.idTags.push(rTag);
        }

        var insId = id.length;
        console.log('id_' + insId + ' = document.createElement("' + rTag + '");');
        id[insId] = document.createElement(rTag);

        if (percent(demicm.NO_REF_ELEM_PER)) {
            noRefIds.push(insId);
        } else {
            console.log('id_' + insId + '.id = ' + insId + ';');
            id[insId].id = insId;
        }

        // Get random parentNode id
        var rRat = rand(totalRat);
        if ((rRat -= demicm.BODY_RATIO) < 0) {
            // Body elems
            var rId = randItem(bodyIds);
            bodyIds.push(insId);
        } else if ((rRat -= demicm.HEAD_RATIO) < 0) {
            // Head elems
            var rId = randItem(headIds);
            headIds.push(insId);
        } else if ((rRat -= demicm.HTML_RATIO) < 0) {
            // HTML elems
            var rId = randItem(htmlIds);
            htmlIds.push(insId);
        } else {
            // Dangling elems
            var rId = randItem(dangleIds);
            dangleIds.push(insId);
            if (rId == null) {
                continue;
            }
        }

        console.log('id_' + rId + '.appendChild(id_' + insId + ');');
        id[rId].appendChild(id[insId]);
    }

    for (var i = 0; i < noRefIds.length; i++) {
        console.log('id_' + noRefIds[i] + ' = null;');
        id[noRefIds[i]] = null;
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

    constructBaseTree();

    appendSpecElem();
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

        var rId = randId(true);
        if (rId == 'none') {
            return;
        }
        console.log('id_' + rId + '.setAttributeNode(id_' + (demicm.attrId + demicm.SPEC_OFFSET) + ');');
        id[rId].setAttributeNode(idS[demicm.attrId]);

        console.log('id_' + (demicm.nodeMapId + demicm.SPEC_OFFSET) + ' = id_' + rId + '.attributes;');
        idS[demicm.nodeMapId] = id[rId].attributes;
    } catch (e) {
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

        setAttr();
    } catch (e) {
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

        console.log('// for (var p in ' + logObjStr + ') { ' + logObjStr + '[p]; }');
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
            console.log('// Warning: propfMan else');
        }
    } catch (e) {
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
            && !inArr(demicm.tagRBlackList, tagR)
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
    } catch (e) {
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
            && !inArr(demicm.tagRBlackList, tagR)
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
    } catch (e) {
        console.log('// Error: funcMan: ' + e.message);
    }
}

function styleMan(rId) {
    try {
        var rStyle = randStyle();
        var rStyleVal = randStyleVal(rStyle);

        // Only element has style
        if (id[rId] && id[rId].nodeType == 1) {
            console.log('id_' + rId + '.style["' + rStyle + '"] = "' + rStyleVal + '";');
            id[rId].style[rStyle] = rStyleVal;
        }
    } catch (e) {
        console.log('// Error: styleMan: ' + e.message);
    }
}

function layout() {
    if (demicm.IS_DEBUG) {
        console.log('[+] layout()');
    }

    try {
        for (var i = 0; i < 3; i++) {
            var rId = randId(true, false, true);
            if (rId == 'none') {
                return;
            }

            console.log('id_' + rId + '.offsetParent;');
            id[rId].offsetParent;
        }
    } catch (e) {
        console.log('// Error: layout: ' + e.message);
    }
}

function clear() {
    if (demicm.IS_DEBUG) {
        console.log('[+] clear()');
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
    } catch (e) {
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

        if (demicm.IS_IE) {
            var per = percent(40);
        } else {
            var per = percent(60);
        }
        if (per) {
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
    } catch (e) {
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
    } catch (e) {
        console.log('// Error: DOMMan: ' + e.message);
    }
}

function winMan() {
    if (demicm.IS_DEBUG) {
        console.log('[+] winMan()');
    }

    try {
        propfMan([demicm.winId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
        propfMan([demicm.winId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
    } catch (e) {
        console.log('// Error: winMan: ' + e.message);
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
    } catch (e) {
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
        console.log('[+] reuseElem()');
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
        console.log('// Error: reuseElem: ' + e.message);
    }
}

function reuseRetElem() {
    if (demicm.IS_DEBUG) {
        console.log('[+] reuseRetElem()');
    }

    try {
        for (var i = 0; i < idR.length; i++) {
            if (idR[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'prop', 'ret');
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'func', 'ret');

                console.log('id_' + (i + demicm.RET_OFFSET) + ' = null;');
                idR[i] = null;
            }
        }

        console.log('gc();');
        // gc();
    } catch (e) {
        console.log('// Error: reuseRetElem: ' + e.message);
    }
}

function reuseSpec() {
    if (demicm.IS_DEBUG) {
        console.log('[+] reuseSpec()');
    }

    try {
        for (var i = 0; i < idS.length; i++) {
            if (idS[i]) {
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'prop', 'spec');
                propfMan([i], demicm.MAX_REC_DEPTH_REU, demicm.MAX_RET_REC_DEPTH_REU, 'func', 'spec');

                if (i != demicm.openId) {
                    console.log('id_' + (i + demicm.SPEC_OFFSET) + ' = null;');
                    idS[i] = null;
                }
            }
        }

        console.log('gc();');
        // gc();
    } catch (e) {
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
    } catch (e) {
        console.log('// Error: relayout: ' + e.message);
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
        console.log('[+] normalOperate()');
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
        console.log('[+] multiClear()');
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
                console.log('// Warning: multiClear default');
                break;
        }

        switch (rand(2)) {
            case 0:
                if (demicm.multiType == 0) {
                    console.log('id_' + (wId + demicm.SPEC_OFFSET) + '.document.body.outerHTML = "";');
                    idS[wId].document.body.outerHTML = '';
                } else {
                    console.log('id_' + (fId + demicm.SPEC_OFFSET) + '.contentDocument.body.outerText = "";');
                    idS[fId].contentDocument.body.outerText = '';
                }
                break;
            case 1:
                if (demicm.multiType == 0) {
                    console.log('id_' + (wId + demicm.SPEC_OFFSET) + '.document.write("");');
                    idS[wId].document.write('');
                } else {
                    console.log('id_' + (fId + demicm.SPEC_OFFSET) + '.contentDocument.write("");');
                    idS[fId].contentDocument.write('');
                }
                break;
            default:
                console.log('// Warning: multiClear default');
                break;
        }

    } catch (e) {
        console.log('// Error: multiClear: ' + e.message);
    }
}

function multiMan() {
    if (demicm.IS_DEBUG) {
        console.log('[+] multiMan()');
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
                    console.log('// Warning: multiMan default');
                    break;
            }
        } while (!idS[fId] && count++ < demicm.MAX_ITR)

        if (percent(50)) {  
            propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'prop', 'spec');
            propfMan([fId], demicm.MAX_REC_DEPTH, demicm.MAX_RET_REC_DEPTH, 'func', 'spec');
        }
    } catch (e) {
        console.log('// Error: multiMan: ' + e.message);
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
    if (demicm.IS_IE) {
        console.log('id_' + (demicm.openId + demicm.SPEC_OFFSET) + ' = window.open("demicmTargetIE.html");');
        idS[demicm.openId] = window.open('demicmTargetIE.html');
    } else {
        console.log('id_' + (demicm.openId + demicm.SPEC_OFFSET) + ' = window.open("demicmTarget.html");');
        idS[demicm.openId] = window.open('demicmTarget.html');
    }
}

function appendIframe(rId) {
    console.log('id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + ' = document.createElement("iframe");');
    idS[demicm.ifrId] = document.createElement('iframe');
    if (demicm.IS_IE) {
        console.log('id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.src = "demicmFrameIE.html";');
        idS[demicm.ifrId].src = 'demicmFrameIE.html';
    } else {
        console.log('id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.src = "demicmFrame.html";');
        idS[demicm.ifrId].src = 'demicmFrame.html';
    }

    console.log('id_' + rId + '.appendChild(id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + ');');
    id[rId].appendChild(idS[demicm.ifrId]);
}

function appendFrame(rId) {
    // Add frame set
    console.log('id_' + (demicm.frsId + demicm.SPEC_OFFSET) + ' = document.createElement("frameset");');
    idS[demicm.frsId] = document.createElement('frameset');
    console.log('id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.cols = "15%, 10%, 5%";');
    idS[demicm.frsId].cols = '15%, 10%, 5%';

    console.log('id_' + rId + '.appendChild(id_' + (demicm.frsId + demicm.SPEC_OFFSET) + ');');
    id[rId].appendChild(idS[demicm.frsId]);

    // Add frame
    console.log('id_' + (demicm.frId + demicm.SPEC_OFFSET) + ' = document.createElement("frame");');
    idS[demicm.frId] = document.createElement('frame');
    if (demicm.IS_IE) {
        console.log('id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.src = "demicmFrameIE.html";');
        idS[demicm.frId].src = 'demicmFrameIE.html';
    } else {
        console.log('id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.src = "demicmFrame.html";');
        idS[demicm.frId].src = 'demicmFrame.html';
    }

    console.log('id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(id_' + (demicm.frId + demicm.SPEC_OFFSET) + ');');
    idS[demicm.frsId].appendChild(idS[demicm.frId]);

    // Add frame with no id
    console.log('id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(document.createElement("frame"));');
    idS[demicm.frsId].appendChild(document.createElement('frame'));
    console.log('id_' + (demicm.frsId + demicm.SPEC_OFFSET) + '.appendChild(document.createElement("frame"));');
    idS[demicm.frsId].appendChild(document.createElement('frame'));
}

function constructMulti() {
    try {
        var rId = randId(true, false, true);
        if (demicm.IS_IE) {
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
                console.log('// Warning: constructMulti default');
                break;
        }
    } catch (e) {
        console.log('// Error: constructMulti: ' + e.message);
    }
}

function getWindow() {
    var rDocId = rand(idS[demicm.openId].document.all.length);

    console.log('id_' + id.length + ' = id_' + (demicm.openId + demicm.SPEC_OFFSET) + '.document.all[' + rDocId + '];');
    id[id.length] = idS[demicm.openId].document.all[rDocId];
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
}

function getIframe() {
    var rDocId = rand(idS[demicm.ifrId].contentDocument.all.length);

    console.log('id_' + id.length + ' = id_' + (demicm.ifrId + demicm.SPEC_OFFSET) + '.contentDocument.all[' + rDocId + '];');
    id[id.length] = idS[demicm.ifrId].contentDocument.all[rDocId];
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
}

function getFrame() {
    var rDocId = rand(idS[demicm.frId].contentDocument.all.length);

    console.log('id_' + id.length + ' = id_' + (demicm.frId + demicm.SPEC_OFFSET) + '.contentDocument.all[' + rDocId + '];');
    id[id.length] = idS[demicm.frId].contentDocument.all[rDocId];
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
}

function getMultiElems(elemCnt) {
    if (demicm.IS_DEBUG) {
        console.log('[+] getMultiElems()');
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
                    console.log('// Warning: getMultiElems default');
                    break;
            }
        }
    } catch (e) {
        console.log('// Error: getMultiElems: ' + e.message);
    }
}

function demiStart() {
    /* BEGIN FUZZING CODE */
    // logger = new LOGGER('demichrome1');
    // logger.starting();

    console.log('// Fuzz start');
    
    if (demicm.IS_IE) {
        console.log(' gc = function() { CollectGarbage(); arr = new Array(); for (var i = 0; i < 0x3f0; i++) { arr[i] = document.createElement("a"); }'
            + ' for (var i = 0; i < 0x3f0; i++) { arr[i] = ""; } CollectGarbage(); } ');
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
    }

    if (demicm.IS_RAND_FUZZ) {
        var rBool = randBool();
        console.log('// demicm.IS_FUZZ_GROUP = ' + rBool + ';');
        demicm.IS_FUZZ_GROUP = rBool;

        rBool = randBool();
        console.log('// demicm.IS_FUZZ_MULTI = ' + rBool + ';');
        demicm.IS_FUZZ_MULTI = rBool;

        rBool = randBool();
        console.log('// demicm.IS_FUZZ_SPEC = ' + rBool + ';');
        demicm.IS_FUZZ_SPEC = rBool;
    }

    preludeFirst();

    if (demicm.IS_FUZZ_MULTI) {
        console.log('/-demiFront = function() {');
    } else {
        demiFront();
    }
}

function demiFront() {
    if (demicm.IS_DEBUG) {
        console.log('[+] demiFront()');
    }

    // Clear demiFront function
    console.log('demiFront = function(){};');
    demiFront = function(){};

    if (demicm.IS_FUZZ_MULTI) {
        getMultiElems(demicm.MULTI_ELEM_NUM);
    }

    preludeSecond();

    console.log('// we are now begining to fuzz...');
    operate(demicm.FRONT_OP_CNT);

    if (demicm.IS_IE) {
        setTimeout('try {demiBack();} catch (e) {setTimeout(\'parseFloat(unescape("%uF00D%uDEAD" + "</fuzzer>" + "%u0000"));'
            + 'window.location.href = window.location.protocol + "//" + window.location.host + "/grinder";\', 200);}', 100);
    } else {
        setTimeout('demiBack()', 100);
    }
}

function demiBack() {
    if (demicm.IS_DEBUG) {
        console.log('[+] demiBack()');
    }

    console.log('/-demiBack = function() {');

    operate(demicm.BACK_OP_CNT);

    finale();

    // For setTimeout
    console.log('/-};');
    console.log('setTimeout("demiBack()",100);');

    if (demicm.IS_FUZZ_MULTI) {
        // For demiFront
        console.log('/-};');
    }

    if (demicm.IS_IE) {
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

    console.log('// Fuzz finished');

    /* END FUZZING CODE */
    // logger.finished();
    // window.location.href = window.location.protocol + "//" + window.location.host + "/grinder";
}

