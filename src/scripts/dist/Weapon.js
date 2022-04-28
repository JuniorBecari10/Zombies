"use strict";
class Weapon extends Entity {
    constructor(bounds, spritesheet, cutBounds, bullet, bulletAmount, cooldown, ammoTotal, ammoLoaded, name) {
        super(bounds, spritesheet, cutBounds);
        this.bullet = bullet;
        this.bulletAmount = bulletAmount;
        this.cooldown = cooldown;
        this.ammoTotal = ammoTotal;
        this.ammoLoaded = ammoLoaded;
        this.name = name;
    }
}
