"use strict";
class Button {
    constructor(bounds, sprite, action) {
        this.bounds = bounds;
        this.sprite = sprite;
        this.action = action;
    }
    tick() {
        if (collide(this.bounds, { x: mousePos.x, y: mousePos.y, w: 1, h: 1 }) && isMousePressed) {
            this.action();
        }
    }
    render(g) {
        var _a;
        (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.drawImage(this.sprite, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
