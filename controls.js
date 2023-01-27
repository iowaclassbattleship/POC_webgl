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
    left: "KeyA",
    right: "KeyD"
};

const setupMouse = (gl, update) => {
    let rotX = 0;
    let rotY = 0;

    document.addEventListener("mousemove", event => {
        const pos = getNoPaddingNoBorderCanvasRelativeMousePosition(event, gl.canvas);

        rotX = pos.x / gl.canvas.width * 2 - 1;
        rotY = pos.y / gl.canvas.height * -2 + 1;

        update(rotX, rotY, 0);
    });
}

const setupKeyboard = (update) => {
    let xDirection = 0;
    let zDirection = 0;

    document.addEventListener("keydown", e => {
        switch (e.code) {
            case keys.up:
                zDirection = 1;
                break;
            case keys.down:
                zDirection = -1;
                break;
            case keys.left:
                xDirection = 1;
                break;
            case keys.right:
                xDirection = -1;
                break;
        }

        update(xDirection, 0, zDirection);
    });

    document.addEventListener("keyup", e => {
        switch (e.code) {
            case keys.up:
            case keys.down:
                zDirection = 0;
                break;
            case keys.left:
            case keys.right:
                xDirection = 0;
                break;
        }

        update(xDirection, 0, zDirection);
    });
}

export { setupMouse, setupKeyboard };