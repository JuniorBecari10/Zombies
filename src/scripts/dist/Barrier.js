"use strict";
class Barrier extends Entity {
    constructor(bounds, spritesheet, cutBounds, place, price, newPositions) {
        super(bounds, spritesheet, cutBounds);
        this.place = place;
        this.price = price;
        this.newPositions = newPositions;
        collisions.push(bounds);
    }
    tick() {
        let doubleBounds = this.bounds;
        if (player.coins >= this.price &&
            collide({ x: mousePos.x + camera.x, y: mousePos.y + camera.y, w: 1, h: 1 }, this.bounds) &&
            isMousePressed) {
            player.coins -= this.price;
            for (let n of this.newPositions)
                zombiePositions.push(n);
            collisions.splice(collisions.indexOf(this.bounds), 1);
            this.destroy();
        }
    }
    render(g) {
        var _a, _b, _c;
        super.render(g);
        if (collide({ x: mousePos.x + camera.x, y: mousePos.y + camera.y, w: 1, h: 1 }, this.bounds)) {
            g.ctx.font = "20px Pixel";
            g.ctx.fillStyle = "white";
            g.ctx.globalAlpha = 1;
            (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillText(this.place, mousePos.x + 20, mousePos.y);
            g.ctx.font = "15px Pixel";
            (_b = g.ctx) === null || _b === void 0 ? void 0 : _b.fillText("$" + this.price.toString(), mousePos.x + 20, mousePos.y + 30);
            (_c = g.ctx) === null || _c === void 0 ? void 0 : _c.fillText("Click to Unlock", mousePos.x + 20, mousePos.y + 60);
        }
    }
}
