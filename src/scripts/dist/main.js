"use strict";
function initLoop() {
    window.requestAnimationFrame(loop);
}
function tick() {
}
function render() {
    // draw black bg
    g.ctx.fillStyle = "black";
    g.ctx.fillRect(0, 0, g.canvas.width, g.canvas.height);
}
function loop() {
    tick();
    render();
    window.requestAnimationFrame(loop);
}
