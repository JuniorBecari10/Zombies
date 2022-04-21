"use strict";
const player = new Player({ x: 0, y: 0, w: 40, h: 40 }, playerSpritesheet, { x: 0, y: 0, w: 16, h: 16 });
var entities = [];
document.addEventListener("keydown", function (event) {
    keyPressed = event;
    isKeyPressed = true;
});
document.addEventListener("keyup", function (event) {
    keyPressed = event;
    isKeyPressed = false;
});
document.addEventListener("mousemove", function (event) {
    let x = event.clientX;
    let y = event.clientY;
    mousePos = { x: x, y: y };
});
document.addEventListener("mousedown", function (event) {
    isMousePressed = true;
});
document.addEventListener("mouseup", function (event) {
    isMousePressed = false;
});
function removeEquals(arr) {
    let sett = new Set(arr);
    return Array.from(sett.values());
}
// ------
function defineSize() {
    g.canvas.width = window.innerWidth;
    g.canvas.height = window.innerHeight;
}
// ----------------------------------------
function init() {
    entities.push(player);
    g.canvas.style.imageRendering = "pixelated";
    window.requestAnimationFrame(loop);
}
function tick() {
    for (let o of entities) {
        o.tick();
    }
}
function render() {
    var _a, _b;
    // draw black bg
    g.ctx.fillStyle = "black";
    (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillRect(0, 0, g.canvas.width, g.canvas.height);
    (_b = g.ctx) === null || _b === void 0 ? void 0 : _b.drawImage(map, 0 - camera.x, 0 - camera.y, map.width, map.height);
    for (let o of entities) {
        o.render(g);
    }
}
function loop() {
    defineSize();
    tick();
    render();
    window.requestAnimationFrame(loop);
}
