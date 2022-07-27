"use strict";
class Barrier extends Entity {
    constructor(bounds, spritesheet, cutBounds, place, price, newPositions) {
        super(bounds, spritesheet, cutBounds);
        this.place = place;
        this.price = price;
        this.newPositions = newPositions;
        //collisions.push(bounds);
    }
    tick() {
        let doubleBounds = getDoubleBounds(this.bounds);
        if (player.coins >= this.price &&
            collide(player.bounds, doubleBounds) &&
            keyPressed.keyCode === enterCode) {
            player.coins -= this.price;
            for (let n of this.newPositions)
                zombiePositions.push(n);
            this.destroy();
        }
    }
    render(g) {
        var _a, _b, _c, _d;
        super.render(g);
        let doubleBounds = getDoubleBounds(this.bounds);
        if (collide(player.bounds, doubleBounds)) {
            g.ctx.font = "20px Pixel";
            g.ctx.fillStyle = "white";
            g.ctx.globalAlpha = 1;
            (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillText(this.place, player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y);
            g.ctx.font = "15px Pixel";
            (_b = g.ctx) === null || _b === void 0 ? void 0 : _b.fillText("$" + this.price.toString(), player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 30);
            (_c = g.ctx) === null || _c === void 0 ? void 0 : _c.fillText("Press Enter to Unlock", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 60);
            if (player.coins < this.price) {
                g.ctx.fillStyle = "#FF4545";
                (_d = g.ctx) === null || _d === void 0 ? void 0 : _d.fillText("Not Enough Money!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
        }
    }
}
