"use strict";
class PerkStation extends Entity {
    constructor(bounds, spritesheet, cutBounds, perk, price) {
        super(bounds, spritesheet, cutBounds);
        this.perk = perk;
        this.price = price;
    }
    tick() {
        if (player.coins >= this.price &&
            collide(player.bounds, this.bounds) &&
            keyPressed.keyCode === enterCode && !player.hasPerk(getPerk(this.perk).name)) {
            player.coins -= this.price;
            player.perks[player.freePerkSlot()] = getPerk(this.perk);
            //this.destroy();
        }
    }
    render(g) {
        var _a, _b, _c, _d, _e;
        super.render(g);
        if (collide(player.bounds, this.bounds)) {
            g.ctx.font = "20px Pixel";
            g.ctx.fillStyle = "white";
            g.ctx.globalAlpha = 1;
            (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillText("Perk | " + getPerk(this.perk).name, player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y);
            g.ctx.font = "15px Pixel";
            (_b = g.ctx) === null || _b === void 0 ? void 0 : _b.fillText("$" + this.price.toString(), player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 30);
            (_c = g.ctx) === null || _c === void 0 ? void 0 : _c.fillText("Press Enter to Buy", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 60);
            if (player.coins < this.price && !player.hasPerk(getPerk(this.perk).name)) {
                g.ctx.fillStyle = "#FF4545";
                (_d = g.ctx) === null || _d === void 0 ? void 0 : _d.fillText("Not Enough Money!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
            else if (player.hasPerk(getPerk(this.perk).name)) {
                g.ctx.fillStyle = "#FF4545";
                (_e = g.ctx) === null || _e === void 0 ? void 0 : _e.fillText("You already have this perk!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
        }
    }
}
