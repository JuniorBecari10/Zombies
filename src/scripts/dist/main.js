"use strict";
const player = new Player({ x: 1406, y: 1932, w: pixelSize, h: pixelSize }, playerSpritesheet, { x: 0, y: 0, w: 16 * 100, h: 16 * 100 });
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
/*function removeEquals<T>(arr: T[]) {
    let sett: Set<T> = new Set(arr);
    
    return Array.from(sett.values());
}*/
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
    var _a, _b, _c, _d;
    // draw black bg
    g.ctx.fillStyle = "black";
    (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillRect(0, 0, g.canvas.width, g.canvas.height);
    (_b = g.ctx) === null || _b === void 0 ? void 0 : _b.drawImage(map, 0 - camera.x, 0 - camera.y, map.width, map.height);
    for (let o of entities) {
        o.render(g);
    }
    // draw slots
    for (let i = 0; i < 4; i++)
        (_c = g.ctx) === null || _c === void 0 ? void 0 : _c.drawImage(playerSpritesheet, 32 * 70, 64 * 70, 16 * 70, 16 * 70, g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i), g.canvas.height - 90, 70, 70);
    for (let i = 0; i < 3; i++)
        (_d = g.ctx) === null || _d === void 0 ? void 0 : _d.drawImage(playerSpritesheet, 32 * 70, 64 * 70, 16 * 70, 16 * 70, g.canvas.width / 2 + (70 / 2) + 75 + (75 * i), g.canvas.height - 90, 70, 70);
}
function loop() {
    defineSize();
    tick();
    render();
    window.requestAnimationFrame(loop);
}
