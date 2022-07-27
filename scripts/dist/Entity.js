"use strict";
var entities = [];
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
    destroy() {
        entities.splice(entities.indexOf(this), 1);
    }
    collideWithEntity() {
        for (let e of entities) {
            if (collide(this.bounds, e.bounds))
                return e;
        }
        return this;
    }
}
// sounds contradictory, no?
function zombiesAliveAmount() {
    let amount = 0;
    for (let e of entities) {
        if (e instanceof Zombie)
            amount++;
    }
    return amount;
}
