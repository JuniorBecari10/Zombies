"use strict";
class WeaponStation extends Entity {
    constructor(bounds, spritesheet, cutBounds, weapon, price) {
        super(bounds, spritesheet, cutBounds);
        this.weapon = weapon;
        this.price = price;
    }
    tick() {
        if (player.coins >= this.price &&
            collide(player.bounds, this.bounds) &&
            keyPressed.keyCode === enterCode && !player.hasWeapon(getWeapon(this.weapon).name)) {
            player.coins -= this.price;
            player.weapons[player.freeSlot()] = getWeapon(this.weapon);
            //this.destroy();
        }
    }
    render(g) {
        var _a, _b, _c, _d, _e, _f;
        super.render(g);
        if (collide(player.bounds, this.bounds)) {
            g.ctx.font = "20px Pixel";
            g.ctx.fillStyle = "white";
            g.ctx.globalAlpha = 1;
            (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillText(getWeapon(this.weapon).name, player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y);
            g.ctx.font = "15px Pixel";
            (_b = g.ctx) === null || _b === void 0 ? void 0 : _b.fillText("$" + this.price.toString(), player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 30);
            (_c = g.ctx) === null || _c === void 0 ? void 0 : _c.fillText("Press Enter to Buy", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 60);
            if (player.coins < this.price && !player.hasWeapon(getWeapon(this.weapon).name)) {
                g.ctx.fillStyle = "#FF4545";
                (_d = g.ctx) === null || _d === void 0 ? void 0 : _d.fillText("Not Enough Money!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
            else if (player.hasWeapon(getWeapon(this.weapon).name)) {
                g.ctx.fillStyle = "#FF4545";
                (_e = g.ctx) === null || _e === void 0 ? void 0 : _e.fillText("You already have this weapon!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
            else if (player.freeSlot() < 0) {
                g.ctx.fillStyle = "#DDDD45";
                (_f = g.ctx) === null || _f === void 0 ? void 0 : _f.fillText("Your current weapon will be replaced.", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
        }
    }
}
