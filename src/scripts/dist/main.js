"use strict";
function initLoop() {
    window.requestAnimationFrame(loop);
}
function tick() {
}
function render() {
    var _a;
    // draw black bg
    g.ctx.fillStyle = "black";
    (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillRect(0, 0, g.canvas.width, g.canvas.height);
}
function loop() {
    tick();
    render();
    window.requestAnimationFrame(loop);
}
