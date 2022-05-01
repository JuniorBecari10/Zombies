"use strict";
class Weapon extends Entity {
    constructor(bounds, spritesheet, cutBounds, bulletDamage, bulletSpeed, bulletAmount, cooldown, ammoTotal, ammoLoaded, ammo, name) {
        super(bounds, spritesheet, cutBounds);
        this.bulletDamage = bulletDamage;
        this.bulletSpeed = bulletSpeed; // pode ser hardcoded tbm
        this.bulletAmount = bulletAmount;
        this.cooldown = cooldown;
        this.ammoTotal = ammoTotal;
        this.ammoLoaded = ammoLoaded;
        this.ammo = ammo;
        this.name = name;
    }
    render(g) {
        var _a;
        (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.drawImage(this.spritesheet, this.cutBounds.x, this.cutBounds.y, this.cutBounds.w, this.cutBounds.h, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
