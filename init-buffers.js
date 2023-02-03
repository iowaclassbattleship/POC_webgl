const cube = c => {
    return new Float32Array([
    -c, -c, c, c, -c, c, c, c, c, -c, c, c, // Front face
    -c, -c, -c, -c, c, -c, c, c, -c, c, -c, -c, // Back face
    -c, c, -c, -c, c, c, c, c, c, c, c, -c, // Top faced
    -c, -c, -c, c, -c, -c, c, -c, c, -c, -c, c, // Bottom face
    c, -c, -c, c, c, -c, c, c, c, c, -c, c, // Right face
    -c, -c, -c, -c, -c, c, -c, c, c, -c, c, -c, // Left face
    ]);
}

const getColors = () => {
    const faceColors = [
        [1.0, 1.0, 1.0, 1.0], // Front face: white
        [1.0, 0.0, 0.0, 1.0], // Back face: red
        [0.0, 1.0, 0.0, 1.0], // Top face: green
        [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
        [1.0, 1.0, 0.0, 1.0], // Right face: yellow
        [1.0, 0.0, 1.0, 1.0], // Left face: purple
    ];

    let colors = [];
    for (let i = 0; i < faceColors.length; i++) {
        colors = colors.concat(faceColors[i], faceColors[i], faceColors[i], faceColors[i]);
    }

    return new Float32Array(colors);
}

const initBuffers = gl => {
    return {
        position: initPositionBuffer(gl),
        color: initColorBuffer(gl),
        indices: initIndexBuffer(gl),
    };
}

const initPositionBuffer = gl => {
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, cube(1), gl.STATIC_DRAW);

    return buffer;
}

const initColorBuffer = gl => {
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, getColors(), gl.STATIC_DRAW);

    return buffer;
}

const initIndexBuffer = gl => {
    const buffer = gl.createBuffer();

    const indices = new Uint16Array([
        0, 1, 2, 0, 2, 3, // front
        4, 5, 6, 4, 6, 7, // back
        8, 9, 10, 8, 10, 11, // top
        12, 13, 14, 12, 14, 15, // bottom
        16, 17, 18, 16, 18, 19, // right
        20, 21, 22, 20, 22, 23, // left
    ]);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    return buffer;
}

export const buffer = {
    initBuffers
};