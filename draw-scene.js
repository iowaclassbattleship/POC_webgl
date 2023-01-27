const radianFromDegrees = degrees => (degrees * Math.PI) / 180;

const rotate = (modelViewMatrix, theta, ax) => {
  const axes = {
    x: [1, 0, 0],
    y: [0, 1, 0],
    z: [0, 0, 1]
  };

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    theta,
    axes[ax]
  );
}

const translate = (modelViewMatrix, pos) => {
  const [x, y, z] = pos;
  mat4.translate(
    modelViewMatrix,
    modelViewMatrix,
    [x, y, z]
  );
}

const clearScene = gl => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

const createProjectionMatrix = (width, height) => {
  const projectionMatrix = mat4.create();
  mat4.perspective(
    projectionMatrix,
    radianFromDegrees(75),
    width / height,
    1e-4,
    1e4
  );

  return projectionMatrix;
}

const createViewMatrix = (pos, theta, phi) => {
  let [x, y, z] = pos;

  x = z * Math.sin(radianFromDegrees(theta));
  y = z * Math.sin(radianFromDegrees(phi))
  z = z;

  const modelViewMatrix = mat4.create();
  translate(modelViewMatrix, [x, y, z]);
  rotate(modelViewMatrix, radianFromDegrees(theta), "y");
  rotate(modelViewMatrix, -radianFromDegrees(phi), "x");

  return modelViewMatrix;
}

const drawScene = (gl, programInfo, buffers, pos, theta, phi) => {
  clearScene(gl);

  const projectionMatrix = createProjectionMatrix(gl.canvas.width, gl.canvas.height);
  const modelViewMatrix = createViewMatrix(pos, theta, phi);

  setPositionAttribute(gl, buffers.position, programInfo);
  setColorAttribute(gl, buffers.color, programInfo);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
}

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
const setPositionAttribute = (gl, position, programInfo) => {
  const numComponents = 3;
  const type = gl.FLOAT; // the data in the buffer is 32bit floats
  const normalize = false; // don't normalize
  const stride = 0; // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

// Tell WebGL how to pull out the colors from the color buffer
// into the vertexColor attribute.
const setColorAttribute = (gl, color, programInfo) => {
  const numComponents = 4;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.bindBuffer(gl.ARRAY_BUFFER, color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene };
