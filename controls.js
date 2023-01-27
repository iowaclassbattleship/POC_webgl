const getRelativeMousePosition = (event, target) => {
    target = target || event.target;
    var rect = target.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    }
}

const getNoPaddingNoBorderCanvasRelativeMousePosition = (event, target) => {
    target = target || event.target;
    var pos = getRelativeMousePosition(event, target);

    pos.x = pos.x * target.width / target.clientWidth;
    pos.y = pos.y * target.height / target.clientHeight;

    return pos;
}

const keys = {
    up: "KeyW",
    down: "KeyS",
};

const setupMouse = (gl, update) => {
    let x = 0;
    let y = 0;

    gl.canvas.addEventListener("mousemove", event => {
        const pos = getNoPaddingNoBorderCanvasRelativeMousePosition(event, gl.canvas);

        x = pos.x / gl.canvas.width * 2 - 1;
        y = pos.y / gl.canvas.height * -2 + 1;

        update(90 * x, 90 * y);
    });
}

const setupKeyboard = update => {
    let zDirection = 0;

    document.addEventListener("keydown", e => {
        switch (e.code) {
            case keys.up:
                zDirection = 1;
                break;
            case keys.down:
                zDirection = -1;
                break;
        }

        update(zDirection);
    });

    document.addEventListener("keyup", e => {
        switch (e.code) {
            case keys.up:
            case keys.down:
                zDirection = 0;
                break;
        }

        update(zDirection);
    });
}

export { setupMouse, setupKeyboard };