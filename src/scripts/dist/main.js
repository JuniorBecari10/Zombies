"use strict";
var player = new Player({ x: 0, y: 0, w: 16, h: 16 }, playerSpritesheet, { x: 0, y: 0, w: 16, h: 16 });
var entities = [];
function init() {
    entities.push(player);
    window.requestAnimationFrame(loop);
}
function defineSize() {
    g.canvas.width = window.innerWidth;
    g.canvas.height = window.innerHeight;
}
function tick() {
    for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
        var o = entities_1[_i];
        o.tick();
    }
}
function render() {
    var _a;
    // draw black bg
    g.ctx.fillStyle = "black";
    (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillRect(0, 0, g.canvas.width, g.canvas.height);
    for (var _i = 0, entities_2 = entities; _i < entities_2.length; _i++) {
        var o = entities_2[_i];
        o.render(g);
    }
}
function loop() {
    defineSize();
    tick();
    render();
    window.requestAnimationFrame(loop);
}
