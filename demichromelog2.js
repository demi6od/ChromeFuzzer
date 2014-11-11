/*
  Author: demi6od <demi6d@gmail.com>
  Date: 2013 Oct 21st
  
  Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
  - remove all dependencies of logger element
*/

var demicm = {};
var id = [];
demicm.idBlackList = [0, 4];

// Fuzzer type
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

demicm.CSS_DIVERSE_NUM = 3;

// Heap spray params
demicm.ARRAY_LEN_MAX = 100;
demicm.ARRAY_CNT = 50; // Spray count

// Operate number
demicm.FRONT_OP_CNT = 30; // 30 | 60
demicm.BACK_OP_CNT = 20; // 20 | 40

demicm.EVENT_OP_CNT = 10; // 10 | 20

// Operate rate: n%(n=0~100) probability to run
demicm.PROP_PER = 60; // 60
demicm.FUNC_PER = 40; // 40
demicm.STYLE_PER = 50; // 50
demicm.USE_CACHE_PER = 100; // 100

demicm.LAYOUT_PER = 10;
demicm.CLEAR_PER = 10; // 10
demicm.CLEAR_ALL_PER = 3; // 3
demicm.DOM_PER = 60;
demicm.GC_PER = 20;

demicm.MOVE_ITR_PER = 80; // 80
demicm.MOVE_TREE_PER = 80; // 80
demicm.SET_ELEM_RANGE_PER = 20; // 20
demicm.ALTER_ELEM_RANGE_PER = 80; // 80
demicm.SET_SELECTION_PER = 20; // 20
demicm.ALTER_SELECTION_PER = 80; // 80
demicm.USE_RANGE_CACHE_PER = 60; // 60

demicm.EVENT_OP_PER = 50; // 50 | 60
demicm.EVENT_CLEAR_PER = 60; // 60 | 80
demicm.EVENT_CLEAR_ALL_PER = 20; // 20 | 30

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

/************************************* range *************************************/
function constructNodeIterator() {
    try {
        rb=rand(document.all.length);
        logger.log("ni= document.createNodeIterator(document.all[" + rb + "], NodeFilter.SHOW_ALL, null, false);","grind",1);
        ni = document.createNodeIterator(document.all[rb], NodeFilter.SHOW_ALL, null, false);
    }
    catch (exception) {
        logger.log( "//Errorin creating iterator in document ", "grind", 1  );
    }

}

function constructTreeWalker() {
    try {
        rb = rand(document.all.length);
        logger.log("tw = document.createTreeWalker(document.all[" + rb + "], NodeFilter.SHOW_ALL, null, false);","grind",1);
        tw = document.createTreeWalker(document.all[rb], NodeFilter.SHOW_ALL, null, false);
    }
    catch (exception) {
        logger.log( "//Errorin creating tree walker in document ", "grind", 1  );
    }
}

function constructElemRange() {
    try {
        logger.log("range = document.createRange();","grind",1);
        range = document.createRange();

        setElemRange();
    }
    catch (exception) {
        logger.log( "//Error in creating range  in document ", "grind", 1  );
    }
}

function setElemRange() {
    try {
        r1=rand(document.all.length);
        logger.log("var startNode=document.all["+r1+"];","grind",1);
        var startNode=document.all[r1];

        logger.log("range.setStart(startNode, 0);","grind",1);
        range.setStart(startNode, 0);

        r2=rand(document.all.length);
        logger.log("var endNode=document.all["+r2+"];","grind",1);
        var endNode=document.all[r2];

        logger.log("range.setEnd(endNode,0);","grind",1);
        range.setEnd(endNode, 0);

        logger.log("startNode=null;","grind",1);
        logger.log("endNode=null;","grind",1);
    }
    catch (exception) {
        logger.log( "//Error in creating range  in document ", "grind", 1  );
    }
}

function constructSelection() {
    try {
        logger.log( "selection = window.getSelection();","grind",1 );
        selection = window.getSelection();

        setSelection();
    }
    catch (exception) {
        logger.log( "//Error in creating selection", "grind", 1  );
    }
}

function setSelection() {
    try {
        rb = rand(document.all.length);
        logger.log( "range.selectNodeContents(document.all[" + rb + "]);","grind",1 );
        range.selectNodeContents(document.all[rb]);

        logger.log( "selection.removeAllRanges();","grind",1 );
        selection.removeAllRanges();

        logger.log( "selection.addRange(range);","grind",1 );
        selection.addRange(range);
    }
    catch (exception) {
        logger.log( "//Error in setting selection", "grind", 1  );
    }
}

function nodeIteration() {
    try {
        // Fuzz current node
        logger.log('currentNodeR = ni.referenceNode;',"grind",1);
        currentNodeR = ni.referenceNode;
        if(currentNodeR) {
            propfMan([0], Infinity, 'prop', 'currentNodeR');
            propfMan([0], Infinity, 'func', 'currentNodeR');
        }

        // Iterate from root to end
        logger.log('currentNodeR = ni.root;',"grind",1);
        currentNodeR = ni.root;
        while (currentNodeR)  {
            propfMan([0], Infinity, 'prop', 'currentNodeR');
            propfMan([0], Infinity, 'func', 'currentNodeR');

            logger.log('currentNodeR = ni.nextNode();',"grind",1);
            currentNodeR = ni.nextNode();
        }
    }
    catch (exception) {
        logger.log( "//Exception in nodeiteration in document at node "+currentNodeR+"","grind",1 );
    }
}

function treeIteration() {
    try {
        // Fuzz current node
        logger.log('currentLeafR = tw.currentNode;',"grind",1);
        currentLeafR = tw.currentNode;
        if(currentLeafR) {
            propfMan([0], Infinity, 'prop', 'currentLeafR');
            propfMan([0], Infinity, 'func', 'currentLeafR');
        }

        // Iterate from root to end
        logger.log('currentLeafR = tw.root;',"grind",1);
        currentLeafR = tw.root;
        while (currentLeafR)  {
            propfMan([0], Infinity, 'prop', 'currentLeafR');
            propfMan([0], Infinity, 'func', 'currentLeafR');

            logger.log('currentLeafR = tw.nextNode();',"grind",1);
            currentLeafR = tw.nextNode();
        }
    }
    catch (exception) {
        logger.log( "//Exception in treeIteration in document at leaf "+currentLeafR+"","grind",1 );
    }
}

function moveIterator() {
    try {
        rMoves = rand(3) + 1;
        for (i=0; i<rMoves; i++) {
            rm=rand(2);
            switch(rm) {
                case 0:
                    logger.log( "currentNodeR = ni.nextNode();","grind",1 );
                    currentNodeR = ni.nextNode();
                    break;
                case 1:
                    logger.log( "currentNodeR = ni.previousNode();","grind",1 );
                    currentNodeR = ni.previousNode();
                    break;
            }

            rm=rand(6);
            switch(rm) {
                case 0:
                    logger.log( "cacheValR = ni.filter;","grind",1 );
                    cacheValR = ni.filter;
                    break;
                case 1:
                    logger.log( "ni.expandEntityReferences;","grind",1 );
                    ni.expandEntityReferences;
                    break;
                case 2:
                    logger.log( "cacheValR = ni.referenceNode;","grind",1 );
                    cacheValR = ni.referenceNode;
                    break;
                case 3:
                    logger.log( "ni.pointerBeforeReferenceNode;","grind",1 );
                    ni.pointerBeforeReferenceNode;
                case 4:
                    logger.log( "cacheValR = ni.root;","grind",1 );
                    cacheValR = ni.root;
                case 5:
                    logger.log( "ni.whatToShow;","grind",1 );
                    ni.whatToShow;
                    break;
            }
        }	

        if(currentNodeR) {
            propfMan([0], 0, 'prop', 'currentNodeR');
            propfMan([0], 0, 'func', 'currentNodeR');
        }
    }
    catch (exception) {
        logger.log( "//Exception in moveIteration ","grind",1 );
    }
}

function moveTreeWalker() {
    try {
        rMoves = rand(3) + 1;
        for (i=0; i<rMoves; i++) {
            rm=rand(7);
            switch(rm) {
                case 0:
                    logger.log( "currentLeafR = tw.nextNode();","grind",1 );
                    currentLeafR = tw.nextNode();
                    break;
                case 1:
                    logger.log( "currentLeafR = tw.previousNode();","grind",1 );
                    currentLeafR = tw.previousNode();
                    break;
                case 2:
                    logger.log( "currentLeafR = tw.previousSibling();","grind",1 );
                    currentLeafR = tw.previousSibling();
                    break;
                case 3:
                    logger.log( "currentLeafR = tw.nextSibling();","grind",1 );
                    currentLeafR = tw.nextSibling();
                    break;
                case 4:
                    logger.log( "currentLeafR = tw.firstChild();","grind",1 );
                    currentLeafR = tw.firstChild();
                    break;
                case 5:
                    logger.log( "currentLeafR = tw.lastChild();","grind",1 );
                    currentLeafR = tw.lastChild();
                    break;
                case 6:
                    logger.log( "currentLeafR = tw.parentNode();","grind",1 );
                    currentLeafR = tw.parentNode();
                    break;	
            }

            rm=rand(5);
            switch(rm) {
                case 0:
                    logger.log( "cacheValR = tw.root;","grind",1 );
                    cacheValR = tw.root;
                    break;
                case 1:
                    logger.log( "tw.whatToShow;","grind",1 );
                    tw.whatToShow;
                    break;
                case 2:
                    logger.log( "cacheValR = tw.filter;","grind",1 );
                    cacheValR = tw.referenceNode;
                    break;
                case 3:
                    logger.log( "tw.expandEntityReferences;","grind",1 );
                    tw.expandEntityReferences;
                    break;
                case 4:
                    logger.log( "cacheValR = tw.currentNode;","grind",1 );
                    cacheValR = tw.currentNode;
                    break;
            }
        }	

        if(currentLeafR) {
            propfMan([0], 0, 'prop', 'currentLeafR');
            propfMan([0], 0, 'func', 'currentLeafR');
        }
    }
    catch (exception) {
        logger.log( "//Exception in moveTreeWalker ","grind",1 );
    }
}		

function alterElemRange() {
    try {
        rm=rand(6);
        switch(rm) {
            case 0:
                logger.log( "range.collapsed;","grind",1 );
                range.collapsed;
                break;
            case 1:
                logger.log( "cacheValR = range.commonAncestorContainer;","grind",1 );
                cacheValR = range.commonAncestorContainer;
                break;
            case 2:
                logger.log( "cacheValR = range.endContainer;","grind",1 );
                cacheValR = range.endContainer;
                break;
            case 3:
                logger.log( "range.endOffset;","grind",1 );
                range.endOffset;
                break;
            case 4:
                logger.log( "cacheValR = range.startContainer;","grind",1 );
                cacheValR = range.startContainer;
                break;
            case 5:
                logger.log( "range.startOffset;","grind",1 );
                range.startOffset;
                break;
        }

        var rNum = rand(20);

        rb=rand(document.all.length);
        logger.log( "var randElem=document.all["+rb+"];","grind",1 );
        var randElem=document.all[rb];

        rm=rand(21);
        switch (rm) {
            case 0:
                logger.log( "range.deleteContents();","grind",1 );
                range.deleteContents();

                logger.log('gc();', 'grind', 1);
                gc();
                break;
            case 1:
                logger.log( "range.collapse();","grind",1 );
                range.collapse();
                break;
            case 2:
                logger.log( "var documentFragment = range.cloneContents();","grind",1 );
                var documentFragment = range.cloneContents();

                logger.log( "randElem.appendChild(documentFragment);","grind",1 );
                randElem.appendChild(documentFragment);

                logger.log( "documentFragment = null;","grind",1 );
                break;
            case 3:
                logger.log( "var documentFragment = range.extractContents();","grind",1 );
                var documentFragment = range.extractContents();

                logger.log( "randElem.appendChild(documentFragment);","grind",1 );
                randElem.appendChild(documentFragment);

                logger.log( "documentFragment = null;","grind",1 );
                break;
            case 4:
                var rHTMLCode = randHTMLCode(0x10, 5);
                logger.log( "var documentFragment = range.createContextualFragment('" + rHTMLCode + "');","grind",1 );
                var documentFragment = range.createContextualFragment(rHTMLCode);

                logger.log( "randElem.appendChild(documentFragment);","grind",1 );
                randElem.appendChild(documentFragment);

                logger.log( "documentFragment = null;","grind",1 );
                break;
            case 5:
                logger.log( "range.surroundContents(randElem);","grind",1 );
                range.surroundContents(randElem);
                break;
            case 6:	
                logger.log( "range.selectNode(randElem);","grind",1 );
                range.selectNode(randElem);
                break;
            case 7:
                logger.log( "range.selectNodeContents(randElem);","grind",1 );
                range.selectNodeContents(randElem);
                break;
            case 8:
                logger.log( "range.insertNode(randElem);","grind",1 );
                range.insertNode(randElem);
                break;
            case 9:
                logger.log( "range.setStartAfter(randElem);","grind",1 );
                range.setStartAfter(randElem);
                break;
            case 10:
                logger.log( "range.setStartBefore(randElem);","grind",1 );
                range.setStartBefore(randElem);
                break;
            case 11:
                logger.log( "range.setEndAfter(randElem);","grind",1 );
                range.setEndAfter(randElem);
                break;						
            case 12:
                logger.log( "range.setEndBefore(randElem);","grind",1 );
                range.setEndBefore(randElem);
                break;
            case 13:
                logger.log( "range.compareNode(randElem);","grind",1 );
                range.compareNode(randElem);
                break;
            case 14:
                logger.log( "range.comparePoint(" + rNum + ");","grind",1 );
                range.comparePoint(rNum);
                break;
            case 15:
                logger.log( "cacheValR = range.getBoundingClientRect();","grind",1 );
                cacheValR = range.getBoundingClientRect();
                break;
            case 16:
                logger.log( "cacheValR = range.getClientRects();","grind",1 );
                cacheValR = range.getClientRects();
                break;
            case 17:
                logger.log( "range.intersectsNode(randElem);","grind",1 );
                range.intersectsNode(randElem);
                break;						
            case 18:
                logger.log( "range.isPointInRange(randElem, " + rNum + ");","grind",1 );
                range.isPointInRange(randElem, rNum);
                break;
            case 19:
                logger.log( "range.toString();","grind",1 );
                range.toString();
                break;						
            case 20:
                logger.log( "var rangeCache = range.cloneRange();","grind",1 );
                var rangeCache = range.cloneRange();

                var type = randItem(['START_TO_START', 'END_TO_END', 'START_TO_END', 'END_TO_START']);
                logger.log( "range.compareBoundaryPoints(Range." + type + ", rangeCache);","grind",1 );
                eval("range.compareBoundaryPoints(Range." + type + ", rangeCache);");

                logger.log( "rangeCache.detach();","grind",1 );
                rangeCache.detach();

                logger.log( "rangeCache = null;","grind",1 );
                break;						
        }		
        logger.log( "randElem = null;","grind",1 );
    }
    catch( exception ) {
        logger.log( "//Exception in alterElemRange function","grind",1 );
    }
}

function alterSelection() {
    try {
        // Execute command on selection
        cmd = randItem(demicm.command);
        logger.log('document.execCommand(' +  cmd + ');',"grind",1 );
        eval('document.execCommand(' +  cmd + ');');

        rm=rand(6);
        switch(rm) {
            case 0:
                logger.log( "cacheValR = selection.anchorNode;","grind",1 );
                cacheValR = selection.anchorNode;
                break;
            case 1:
                logger.log( "selection.anchorOffset;","grind",1 );
                selection.anchorOffset;
                break;
            case 2:
                logger.log( "cacheValR = selection.focusNode;","grind",1 );
                cacheValR = selection.focusNode;
                break;
            case 3:
                logger.log( "selection.focusOffset;","grind",1 );
                selection.focusOffset;
                break;
            case 4:
                logger.log( "selection.isCollapsed;","grind",1 );
                selection.isCollapsed;
                break;
            case 5:
                logger.log( "selection.rangeCount;","grind",1 );
                selection.rangeCount;
                break;
        }

        var rNumS = rand(2);
        var rNum = rand(20);

        rb=rand(document.all.length);
        logger.log( "var randElem=document.all["+rb+"];","grind",1 );
        var randElem=document.all[rb];

        rm=rand(12);
        switch (rm) {
            case 0:
                logger.log( "selection.collapse(randElem, " + rNumS + ");","grind",1 );
                selection.collapse(randElem, rNumS);
                break;
            case 1:
                logger.log( "cacheValR = selection.getRangeAt(0);","grind",1 );
                cacheValR = selection.getRangeAt(0);
                break;
            case 2:
                logger.log( "selection.extend(randElem, " + rNum + ");","grind",1 );
                selection.extend(randElem, rNum);
                break;
            case 3:
                var alter = randItem(['move', 'extend']);
                var direction = randItem(['forward', 'backward', 'left', 'right']);
                var granularity = randItem(["character", "word", "sentence", "line", "paragraph", "lineboundary", "sentenceboundary", "paragraphboundary", "documentboundary"]);

                logger.log( "selection.modify('" + alter + "', '" + direction + "', '" + granularity + "');","grind",1 );
                selection.modify(alter, direction, granularity);
                break;
            case 4:
                logger.log( "selection.collapseToStart();","grind",1 );
                selection.collapseToStart();
                break;
            case 5:
                logger.log( "selection.collapseToEnd();","grind",1 );
                selection.collapseToEnd();
                break;
            case 6:	
                logger.log( "selection.selectAllChildren(randElem);","grind",1 );
                selection.selectAllChildren(randElem);
                break;
            case 7:
                logger.log( "selection.removeAllRanges();","grind",1 );
                selection.removeAllRanges();
                break;
            case 8:
                logger.log( "selection.addRange(range);","grind",1 );
                selection.addRange(range);
                break;
            case 9:
                var aPart = randBool();
                logger.log( "selection.containsNode(randElem, " + aPart + ");","grind",1 );
                selection.containsNode(randElem, aPart);
                break;
            case 10:
                logger.log( "selection.deleteFromDocument();","grind",1 );
                selection.deleteFromDocument();
                break;
            case 11:
                logger.log( "selection.toString();","grind",1 );
                selection.toString();
                break;
        }		
        logger.log( "randElem = null;","grind",1 );
    }
    catch( exception ) {
        logger.log( "//Exception in alterSelection function","grind",1 );
    }
}

function constructRange() {
    constructNodeIterator();
    constructTreeWalker();
    constructElemRange();
    constructSelection();
}

function reuseRange() {
    nodeIteration();
    try {
        logger.log( "ni.detach();","grind",1 );
        ni.detach();
    } 
    catch( exception ) {
        logger.log( "//Exception in reuseRange function","grind",1 );
    }

    treeIteration();

    alterElemRange();
    try {
        logger.log( "range.detach();","grind",1 );
        range.detach();
    } 
    catch( exception ) {
        logger.log( "//Exception in reuseRange function","grind",1 );
    }

    alterSelection();
}

function useRangeCacheVal() {
    logger.log( "cacheValR;","grind",1 );
    if(cacheValR) {
        propfMan([0], Infinity, 'prop', 'cacheValR');
        propfMan([0], Infinity, 'func', 'cacheValR');
    }
}

function useCacheVal() {
    logger.log( "cacheVal;","grind",1 );
    if(cacheVal) {
        propfMan([0], Infinity, 'prop', 'cacheVal');
        propfMan([0], Infinity, 'func', 'cacheVal');
    }
}

/************************************* prelude *************************************/
function prelude() {
    setEnv();

    constructDOMTree();

    addTextNode();

    if(demicm.IS_FUZZ_RANGE) {
        constructRange();
    }

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

    logger.log("cacheVal = null;", 'grind', 1);
    cacheVal = null;

    logger.log("cacheValR = null;", 'grind', 1);
    cacheValR = null;
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
                    var rEvt = randEvt('body'); 
                } else if(getTagName(id[setEvtId]) == 'track') {
                    var rEvt = randEvt('track'); 
                } else if(getTagName(id[setEvtId]) == 'video' 
                        || getTagName(id[setEvtId]) == 'audio'
                        || getTagName(id[setEvtId]) == 'embed'
                        || getTagName(id[setEvtId]) == 'img'
                        || getTagName(id[setEvtId]) == 'object') {
                    var rEvt = randEvt('media'); 
                } else {
                    var rEvt = randEvt('html'); 
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
                    propfMan(propStack, retValDepth, 'prop', objName);
                }
                if(percent(demicm.FUNC_PER)) {
                    propStack.push(p);
                    propfMan(propStack, retValDepth, 'func', objName);
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

        var bNormalPropf = eval('inArr(demicm.' + type + 'Values, propf);');

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

        if(objName) {
            logger.log('var retValue = ' +  fuzzObjStr + '["' + func + '"](' + paramStr.replace(new RegExp('id\\[', 'gm'), 'id_').replace(new RegExp('\\]', 'gm'), '') + ');', 'grind', 1);
        } else {
            logger.log('var retValue = ' +  fuzzObjStr.replace(new RegExp('id\\[', 'm'), 'id_').replace(new RegExp('\\]', 'm'), '') + '["' + func + '"](' + paramStr.replace(new RegExp('id\\[', 'gm'), 'id_').replace(new RegExp('\\]', 'gm'), '') + ');', 'grind', 1);
        }
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
                        propfMan([id.length-1], retValDepth+1, 'prop', objName);
                    }
                    if(percent(demicm.FUNC_PER)) {
                        propfMan([id.length-1], retValDepth+1, 'func', objName);
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
                        propfMan([retId], retValDepth+2, 'prop', objName);
                    }
                    if(percent(demicm.FUNC_PER)) {
                        propfMan([retId], retValDepth+2, 'func', objName);
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
    logger.log('cacheValR = null;', 'grind', 1);
    cacheValR = null;

    logger.log('gc();', 'grind', 1);
    gc();

    if(demicm.IS_FUZZ_RANGE) {
        reuseRange();
    }

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

    if(demicm.IS_FUZZ_RANGE) {
        rangeOperate();
    }

    // Vedio Audio Canvas...
}

function rangeOperate() {
    if(percent(demicm.MOVE_ITR_PER)) {
        moveIterator();

        if(percent(demicm.USE_RANGE_CACHE_PER)) {
            useRangeCacheVal()
        }
    }

    if(percent(demicm.MOVE_TREE_PER)) {
        moveTreeWalker();

        if(percent(demicm.USE_RANGE_CACHE_PER)) {
            useRangeCacheVal()
        }
    }

    if(percent(demicm.SET_ELEM_RANGE_PER)) {
        setElemRange();
    }

    if(percent(demicm.ALTER_ELEM_RANGE_PER)) {
        alterElemRange();

        if(percent(demicm.USE_RANGE_CACHE_PER)) {
            useRangeCacheVal()
        }
    }

    if(percent(demicm.SET_SELECTION_PER)) {
        setSelection();
    }

    if(percent(demicm.ALTER_SELECTION_PER)) {
        alterSelection();

        if(percent(demicm.USE_RANGE_CACHE_PER)) {
            useRangeCacheVal()
        }
    }
}

function demiFront() {
    /* BEGIN FUZZING CODE */
    logger = new LOGGER( "demichrome1" );
    logger.starting();

    prelude();

    logger.log('// we are now begining to fuzz...', 'grind', 1);
    operate(demicm.FRONT_OP_CNT);

    logger.log( "/-demiBack = function() {", "grind", 1 );
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

