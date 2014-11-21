/*
 * Author: demi6od <demi6d@gmail.com>
 * Date: 2013 Oct 21st
 * 
 * Note: the fuzzer is designed to run using Grinder Framework, if you want to run it without using Grinder:
 * - remove all dependencies of logger element
 */

demicm.evtBlackList = [];
if (demicm.IS_IE) {
    demicm.evtBlackList.push('onbeforeunload');
}
if (demicm.IS_FUZZ_GROUP) {
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

if (!demicm.IS_IE) {
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
    "javascript: try {document.documentElement.innerHTML = '';} catch(e) {}",
    "javascript: try {document.write('');} catch(e) {}",
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
    frame:['demicmFuzz.html'], video:['demicmVideo.mp4'], audio:['demicmAudio.mp3'], image:['demicmImg.gif'],
    source:['demicmVideo.mp4'], track:['demicmTrack.vtt'], embed:['demicmSvg.svg']
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
