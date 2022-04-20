"use strict";
const player = new Player({ x: 0, y: 0, w: 48, h: 48 }, playerSpritesheet, { x: 0, y: 0, w: 16, h: 16 });
var entities = [];
var keyPressed;
var isKeyPressed = false;
var mousePos = { x: 0, y: 0 };
var gameState = "menu";
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
    window.requestAnimationFrame(loop);
}
function tick() {
    for (let o of entities) {
        o.tick();
    }
}
function render() {
    var _a;
    // draw black bg
    g.ctx.fillStyle = "black";
    (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillRect(0, 0, g.canvas.width, g.canvas.height);
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
