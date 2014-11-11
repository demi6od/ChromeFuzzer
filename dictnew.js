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
    'alterSelection', 'constructGroup', 'reuseGroup', 'objMan', 'prelude', 'setPropSty', 
    'setEnv', 'eventHandler', 'setEvtHandler', 'addTextNode', 'appendForm', 'appendList', 
    'appendTable', 'appendMap', 'appendAudio', 'appendVideo', 'appendSvg', 'appendXml', 
    'appendSpecElem', 'constructBaseTree', 'constructDOMTree', 'setAttr', 'constructSpec', 'addCSS', 
    'propfMan', 'propMan', 'funcMan', 'styleMan', 'layout', 'clear', 
    'clearAll', 'DOMMan', 'winDocMan', 'attrMan', 'finale', 'reuseMulti', 
    'reuseElem', 'reuseRetElem', 'reuseSpec', 'relayout', 'operate', 'normalOperate', 
    'specialOperate', 'multiClear', 'multiMan', 'specObjMan', 'groupMan', 'constructMulti', 
    'conFuzz', 'getMultiElems', 'demiStart', 'demiFront', 'demiBack', 'demiEnd', 
    'rand', 'randItem', 'srand', 'randBool', 'randHex', 'randAlpha', 
    'randAscii', 'randHTMLEnt', 'randUnicode', 'randStr', 'randHTMLCode', 'percent', 
    'getTagName', 'randId', 'randIds', 'randObjId', 'randObjIds', 'getPropf', 
    'updatePropfCache', 'randPropf', 'randPropfDyn', 'randPropfVal', 'randStyle', 'randStyleVal', 
    'randCSSText', 'toCSSStyle', 'logRevise', 'removeThis', 'removeChildren', 'removeCache', 
    'clearThisId', 'clearChildrenId', 'removeArrVal', 'inArr', 'isArr', 'repeatArr', 
    'convoluteArr', 'cloneObj', 'extendObj', 'isPosInt', 'getTags', 'getElemName', 
    'getPropAndFunc', 'getDistPropAndFunc', 'tickle', 'LOGGER', 'testcase', 'testCase', 
    // Auto func black list end

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

    // Audio & Video
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
		{type: 'string', normalVal: ['_blank', '_self', '_parent', '_top'], dirtyVal: []},
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
