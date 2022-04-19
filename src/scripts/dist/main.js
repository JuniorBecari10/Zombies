"use strict";
function initLoop() {
    window.requestAnimationFrame(loop);
}
function tick() {
}
function render() {
}
function loop() {
    tick();
    render();
    window.requestAnimationFrame(loop);
}
