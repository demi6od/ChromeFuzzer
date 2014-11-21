function main() {
    demicm = {};
demicm.SPEC_OFFSET = 2000;
demicm.webglId = 16;
    id = [];
    idS = [];

    id[0] = document.body;

    try {
    appendWebGL(0, 'hello');
    } catch(e) {console.log(e.message)}
}

function appendWebGL(rId, rTxt) {
    // Add canvas
    console.log('id_' + id.length + ' = document.createElement("canvas");');
    id[id.length] = document.createElement('canvas');
    console.log('id_' + (id.length - 1) + '.width = "320";');
    id[id.length - 1].width = '320';
    console.log('id_' + (id.length - 1) + '.height = "240";');
    id[id.length - 1].height = '240';
    console.log('id_' + (id.length - 1) + '.id = ' + (id.length - 1) + ';');
    id[id.length - 1].id = id.length - 1;
    var canvasId = id.length - 1;

    console.log('id_' + rId + '.appendChild(id_' + (id.length - 1) + ');');
    id[rId].appendChild(id[id.length - 1]);

    // Get the rendering context for WebGL
    console.log('id_' + (demicm.webglId + demicm.SPEC_OFFSET) + ' = getWebGLContext(id_'+ canvasId + ');');
    idS[demicm.webglId] = getWebGLContext(id[canvasId]);
    console.log('webgl = id_' + (demicm.webglId + demicm.SPEC_OFFSET) + ';');
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

    console.log('vshader = webgl.createShader(webgl.VERTEX_SHADER);');
    demicm.vshader = demicm.webgl.createShader(demicm.webgl.VERTEX_SHADER);
    console.log('fshader = webgl.createShader(webgl.FRAGMENT_SHADER);');
    demicm.fshader = demicm.webgl.createShader(demicm.webgl.FRAGMENT_SHADER);

    console.log('webgl.program = createProgram(webgl, "' + demicm.VSHADER_SOURCE + '", "' + demicm.FSHADER_SOURCE + '");');
    demicm.webgl.program = createProgram(demicm.webgl, demicm.VSHADER_SOURCE, demicm.FSHADER_SOURCE);

    // Get attributes
    console.log('webgl.program.u_ShadowMap = webgl.getUniformLocation(webgl.program, "u_ShadowMap");');
    demicm.webgl.program.u_ShadowMap = demicm.webgl.getUniformLocation(demicm.webgl.program, 'u_ShadowMap');

    console.log('webgl.program.a_Position = webgl.getAttribLocation(webgl.program, "a_Position");');
    demicm.webgl.program.a_Position = demicm.webgl.getAttribLocation(demicm.webgl.program, 'a_Position');

    console.log('webgl.program.a_Color = webgl.getAttribLocation(webgl.program, "a_Color");');
    demicm.webgl.program.a_Color = demicm.webgl.getAttribLocation(demicm.webgl.program, 'a_Color');

    console.log('webgl.program.u_MvpMatrix = webgl.getUniformLocation(webgl.program, "u_MvpMatrix");');
    demicm.webgl.program.u_MvpMatrix = demicm.webgl.getUniformLocation(demicm.webgl.program, 'u_MvpMatrix');

    console.log('webgl.program.u_MvpMatrixFromLight = webgl.getUniformLocation(webgl.program, "u_MvpMatrixFromLight");');
    demicm.webgl.program.u_MvpMatrixFromLight = demicm.webgl.getUniformLocation(demicm.webgl.program
            , 'u_MvpMatrixFromLight');

    // Create texture
    console.log('var image = new Image();');
    var image = new Image();
    console.log('texture = webgl.createTexture();');
    demicm.texture = demicm.webgl.createTexture();
    console.log('webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, 1);');
    demicm.webgl.pixelStorei(demicm.webgl.UNPACK_FLIP_Y_WEBGL, 1);
    console.log('webgl.activeTexture(webgl.TEXTURE0);');
    demicm.webgl.activeTexture(demicm.webgl.TEXTURE0);
    console.log('webgl.bindTexture(webgl.TEXTURE_2D, null);');
    demicm.webgl.bindTexture(demicm.webgl.TEXTURE_2D, null);
    console.log('webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGB, webgl.RGB, webgl.UNSIGNED_BYTE, null);');
    demicm.webgl.texImage2D(demicm.webgl.TEXTURE_2D, 0, demicm.webgl.RGB, demicm.webgl.RGB, demicm.webgl.UNSIGNED_BYTE, null);

    // Initialize view
    demicm.framebuffer = demicm.webgl.createFramebuffer();
    console.log('webgl.bindFramebuffer(webgl.FRAMEBUFFER, null);');
    demicm.webgl.bindFramebuffer(demicm.webgl.FRAMEBUFFER, null);
    console.log('webgl.viewport(0, 0, 240, 320);');
    demicm.webgl.viewport(0, 0, 240, 320);
    console.log('webgl.useProgram(webgl.program);');
    demicm.webgl.useProgram(demicm.webgl.program);

    console.log('webgl.clearColor(0, 0, 0, 1);');
    demicm.webgl.clearColor(0, 0, 0, 1);
    console.log('webgl.enable(webgl.DEPTH_TEST);');
    demicm.webgl.enable(demicm.webgl.DEPTH_TEST);

    // Connect attributes to js
    console.log('webgl.uniform1i(webgl.program.u_ShadowMap, 0);');
    demicm.webgl.uniform1i(demicm.webgl.program.u_ShadowMap, 0);

    console.log('var viewProjMatrixFromLight = new Matrix4();');
    var viewProjMatrixFromLight = new Matrix4();
    console.log('viewProjMatrixFromLight.setPerspective(70.0, 1, 1.0, 200.0);');
    viewProjMatrixFromLight.setPerspective(70.0, 1, 1.0, 200.0);
    console.log('viewProjMatrixFromLight.lookAt(0, 7, 2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);');
    viewProjMatrixFromLight.lookAt(0, 7, 2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    console.log('webgl.uniformMatrix4fv(webgl.program.u_MvpMatrix, false, viewProjMatrixFromLight.elements);');
    demicm.webgl.uniformMatrix4fv(demicm.webgl.program.u_MvpMatrix, false, viewProjMatrixFromLight.elements);

    console.log('var viewProjMatrix = new Matrix4();');
    var viewProjMatrix = new Matrix4();
    console.log('viewProjMatrix.setPerspective(45, 2, 1.0, 100.0);');
    viewProjMatrix.setPerspective(45, 2, 1.0, 100.0);
    console.log('viewProjMatrix.lookAt(0.0, 7.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);');
    viewProjMatrix.lookAt(0.0, 7.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    console.log('webgl.uniformMatrix4fv(webgl.program.u_MvpMatrixFromLight, false, viewProjMatrix.elements);');
    demicm.webgl.uniformMatrix4fv(demicm.webgl.program.u_MvpMatrixFromLight, false, viewProjMatrix.elements);

    console.log('vertices = new Float32Array([-0.8, 3.5, 0.0,  0.8, 3.5, 0.0,  0.0, 3.5, 1.8]);');
    demicm.vertices = new Float32Array([-0.8, 3.5, 0.0,  0.8, 3.5, 0.0,  0.0, 3.5, 1.8]);
    console.log('buffer1 = webgl.createBuffer();');
    demicm.buffer1 = demicm.webgl.createBuffer();
    console.log('webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer1);');
    demicm.webgl.bindBuffer(demicm.webgl.ARRAY_BUFFER, demicm.buffer1);
    console.log('webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);');
    demicm.webgl.bufferData(demicm.webgl.ARRAY_BUFFER, demicm.vertices, demicm.webgl.STATIC_DRAW);
    console.log('webgl.vertexAttribPointer(webgl.program.a_Position,  3, webgl.FLOAT, false, 0, 0);');
    demicm.webgl.vertexAttribPointer(demicm.webgl.program.a_Position,  3, demicm.webgl.FLOAT, false, 0, 0);
    console.log('webgl.enableVertexAttribArray(webgl.program.a_Position);');
    demicm.webgl.enableVertexAttribArray(demicm.webgl.program.a_Position);

    console.log('colors = new Float32Array([1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.0, 0.0]);');
    demicm.colors = new Float32Array([1.0, 0.5, 0.0,  1.0, 0.5, 0.0,  1.0, 0.0, 0.0]);
    console.log('buffer2 = webgl.createBuffer();');
    demicm.buffer2 = demicm.webgl.createBuffer();
    console.log('webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer2);');
    demicm.webgl.bindBuffer(demicm.webgl.ARRAY_BUFFER, demicm.buffer2);
    console.log('webgl.bufferData(webgl.ARRAY_BUFFER, colors, webgl.STATIC_DRAW);');
    demicm.webgl.bufferData(demicm.webgl.ARRAY_BUFFER, demicm.colors, demicm.webgl.STATIC_DRAW);
    console.log('webgl.vertexAttribPointer(webgl.program.a_Color,  3, webgl.FLOAT, false, 0, 0);');
    demicm.webgl.vertexAttribPointer(demicm.webgl.program.a_Color,  3, demicm.webgl.FLOAT, false, 0, 0);
    console.log('webgl.enableVertexAttribArray(webgl.program.a_Color);');
    demicm.webgl.enableVertexAttribArray(demicm.webgl.program.a_Color);

    console.log('indices = new Uint8Array([0, 1, 2]);');
    demicm.indices = new Uint8Array([0, 1, 2]);
    console.log('buffer3 = webgl.createBuffer();');
    demicm.buffer3 = demicm.webgl.createBuffer();
    console.log('webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, buffer3);');
    demicm.webgl.bindBuffer(demicm.webgl.ELEMENT_ARRAY_BUFFER, demicm.buffer3);
    console.log('webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, indices, webgl.STATIC_DRAW);');
    demicm.webgl.bufferData(demicm.webgl.ELEMENT_ARRAY_BUFFER, demicm.indices, demicm.webgl.STATIC_DRAW);

    console.log('renderbuffer = webgl.createRenderbuffer();');
    demicm.renderbuffer = demicm.webgl.createRenderbuffer();

    // Draw
    console.log('webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_BYTE, 0);');
    demicm.webgl.drawElements(demicm.webgl.TRIANGLES, demicm.indices.length, demicm.webgl.UNSIGNED_BYTE, 0);

        console.log('webgl.drawArrays(webgl.TRIANGLES, 0, indices.length);');
        demicm.webgl.drawArrays(demicm.webgl.TRIANGLES, 0, demicm.indices.length);
}
