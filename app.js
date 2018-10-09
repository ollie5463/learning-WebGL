var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    'fragColor = vertColor;',
    ' gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n');

var fragmentShaderText = [
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    ' gl_FragColor = vec4(fragColor, 1.0);',
    '}'
].join('\n');
var InitDemo = function () {
    console.log('this is working');

    var canvas = document.getElementById('game-surface');
    var gl = canvas.getContext('webgl');

    if (!gl) {
        gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
        alert('your browser does not support WebGL');
    }
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // create shaders
    //
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('error compiling vertex shader', gl.getShaderInfoLog(vertexShader));
        return;
    }
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('error compiling vertex shader', gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log('error linking program', gl.getProgramInfoLog(program));
        return;
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.log('error validating program', gl.getProgramInfoLog(program));
        return;
    }

    //
    // create buffer
    //

    var triangleVertices =
        [   // X , Y  RGB
            0.0, 0.5, 1.0, 1.0, 0.0,
            -0.5, -0.5, 0.7, 0.0, 1.0,
            0.5, -0.5, 0.1, 1.0, 0.6
        ];

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    // javascript stores everything in 64 bit but webgl needs it in 32, ergo the function used below
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW/* this means that it only needs to be updated once */);

    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttibLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        positionAttribLocation, // attribute location
        3, // number of elemetns per attribute
        gl.FLOAT, // types of element
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,// Size of an individual vertex 
        0// Offset from the beginning of a single vertex to this attribute
    );
    gl.vertexAttribPointer(
        colorAttibLocation, // attribute location
        3, // number of elemetns per attribute
        gl.FLOAT, // types of element
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,// Size of an individual vertex 
        2 * Float32Array.BYTES_PER_ELEMENT// Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttibLocation);

    // main renderer 

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0/*verticesToSkip*/, 3/*verticesToDraw*/);
};