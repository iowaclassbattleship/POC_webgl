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

    let positionVector = [0, 0, -10];
    let zDirection = 0;
    let theta = 0;
    let phi = 0;

    setupMouse(gl, (_theta, _phi) => {
        theta = _theta;
        phi = _phi;
    });
    setupKeyboard((_zDirection) => zDirection = _zDirection);

    let then = 0;
    let deltaTime = 0;
    const render = (now) => {
        if (zDirection != 0) positionVector[2] += velocity * zDirection;

        now *= 0.001;
        deltaTime = now - then;
        then = now;

        drawScene(gl, getProgramInfo(gl), buffers, positionVector, theta, phi);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();