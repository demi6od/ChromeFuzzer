function main() {
    id_0= document.body;
    id_1 = document.createElement("canvas"); 
        id_1.width = "320"; 
        id_1.height = "240"; 
        id_1.id = 1; 
        id_0.appendChild(id_1); 
        id_2016 = getWebGLContext(id_1); 
        webgl = id_2016; 

        for (var p in webgl) {
            //console.log(p + " : " + typeof webgl[p]);
        }
        console.log(webgl.getSupportedExtensions());

        console.log(getTagName(webgl));

        getPropf(webgl,'prop', '');
        getPropf(webgl,'func', '');
        getPropf(webgl,'evt', '');

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
                    console.log('// Error: getPropf: ' + e.message + obj);
                }
            }

            return items;
        }


function getTagName(elem) {
    try {
        if (!elem) {
            return 'none';
        } else if (String(elem) == '[object DocumentType]') {
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
        console.log('// Error: getTagName: ' + e.message);
    }
}

}
