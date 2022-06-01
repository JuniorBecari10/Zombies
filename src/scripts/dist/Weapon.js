"use strict";
class Weapon extends Entity {
    constructor(bounds, spritesheet, cutBounds, bulletDamage, bulletSpeed, bulletAmount, cooldown, ammoTotal, ammoLoaded, name) {
        super(bounds, spritesheet, cutBounds);
        this.bulletDamage = bulletDamage;
        this.bulletSpeed = bulletSpeed; // pode ser hardcoded tbm
        this.bulletAmount = bulletAmount;
        this.cooldown = cooldown;
        this.ammoTotal = ammoTotal;
        this.ammoTotalConst = ammoTotal;
        this.ammoLoaded = ammoLoaded;
        this.ammo = ammoLoaded;
        this.name = name;
    }
    recharge() {
        let diff = this.ammoLoaded - this.ammo; // difference
        if (diff <= 0)
            return;
        this.ammo += diff;
        this.ammoTotal -= diff;
        if (this.ammoTotal < 0) {
            this.ammoTotal = 0;
            this.ammo = 0;
        }
    }
    render(g) {
        var _a;
        (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.drawImage(this.spritesheet, this.cutBounds.x, this.cutBounds.y, this.cutBounds.w, this.cutBounds.h, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
