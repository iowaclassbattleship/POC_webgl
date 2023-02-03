import { buffer } from "./init-buffers.js";
import { scene } from "./draw-scene.js";
import { controls } from "./controls.js";
import { shader } from "./shader.js";

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

    const buffers = buffer.initBuffers(gl);

    let pos = {
        x: 0,
        y: 0,
        z: -10
    }

    let v = {
        x: 0,
        y: 0,
        z: .1
    }

    let zDirection = 0;

    let yaw = 0;
    let pitch = 0;

    controls.setupMouse(gl, (_yaw, _pitch) => {
        yaw = _yaw;
        pitch = _pitch;
    });

    controls.setupKeyboard(_zDirection => zDirection = _zDirection);

    let then = 0;
    let deltaTime = 0;
    const render = (now) => {
        now *= 0.001;
        deltaTime = now - then;
        then = now;

        if (zDirection != 0) pos.z += v.z * zDirection;
        pos.x = pos.x + v.x * deltaTime;
        pos.y = pos.y + v.y * deltaTime;

        scene.drawScene(gl, shader.getProgramInfo(gl), buffers, pos, yaw, pitch);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();