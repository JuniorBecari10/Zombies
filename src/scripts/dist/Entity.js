"use strict";
class Entity {
    constructor(bounds, spritesheet, cutBounds) {
        this.bounds = bounds;
        this.spritesheet = spritesheet;
        this.cutBounds = cutBounds;
    }
    tick() { }
    render(g) {
        var _a;
        (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.drawImage(this.spritesheet, this.cutBounds.x, this.cutBounds.y, this.cutBounds.w, this.cutBounds.h, this.bounds.x - camera.x, this.bounds.y - camera.y, this.bounds.w, this.bounds.h);
    }
}
function collide(rect1, rect2) {
    return rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y;
}
function collideWithAny(rect) {
    for (let r of collisions) {
        if (collide(rect, r))
            return true;
    }
    return false;
}
