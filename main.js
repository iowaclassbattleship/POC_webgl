import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";
import { setupKeyboard, setupMouse } from "./controls.js";
import { getProgramInfo } from "./shader.js";

const main = () => {
    const canvas = document.querySelector("#glcanvas");
    const gl = canvas.getContext("webgl");

    if (gl === null) {
        alert(
            "Unable to initialize WebGL. Your browser or machine may not support it."
        );
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const buffers = initBuffers(gl);

    const velocity = .1;

    let positionVector = [0, 0, -5];
    let rotationVector = [0, 0, 0];
    let directionVector = [0, 0, 0];

    setupMouse(gl, (x, y, z) => rotationVector = [x, y, z]);
    setupKeyboard((x, y, z) => directionVector = [x, y, z]);

    let then = 0;
    let deltaTime = 0;
    const render = (now) => {
        if (directionVector[0] != 0) positionVector[0] += velocity * directionVector[0];
        if (directionVector[2] != 0) positionVector[2] += velocity * directionVector[2];

        now *= 0.001;
        deltaTime = now - then;
        then = now;

        drawScene(gl, getProgramInfo(gl), buffers, positionVector, rotationVector);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();