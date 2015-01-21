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
    'getDistPropAndFunc', 'tickle', 'LOGGER', 'initShaders', 'createProgram', 'loadShader', 
    'getWebGLContext', 'testId', 'testRand', 'testArr', 'printArr', 'testPropf', 
    'testCase', 'testcase', 'testCase', 
    // Auto func black list end

    // Grinder server special func result
    //'getEntries', 'getEntriesByType', 'getEntriesByName', 'webkitGetEntries', 'webkitGetEntriesByType', 'webkitGetEntriesByName',

    // IE
    'showHelp',

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
