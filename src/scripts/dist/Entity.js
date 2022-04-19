"use strict";
var Entity = /** @class */ (function () {
    function Entity(bounds, spritesheet, cutBounds) {
        this.bounds = bounds;
        this.spritesheet = spritesheet;
        this.cutBounds = cutBounds;
    }
    Entity.prototype.tick = function () { };
    Entity.prototype.render = function (g) {
        var _a;
        (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.drawImage(this.spritesheet, this.cutBounds.x, this.cutBounds.y, this.cutBounds.w, this.cutBounds.h, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    };
    return Entity;
}());
