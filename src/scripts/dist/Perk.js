"use strict";
function getAction(perkType) {
    switch (perkType) {
        case "speed":
            return () => { if (player !== undefined)
                player.speed = player.constSpeed * 2; };
        case "quick":
            return () => { if (player !== undefined)
                player.weapons[weaponSelected].cooldown = player.weapons[weaponSelected].constCooldown / 2; };
    }
    return () => { };
}
class Perk extends Entity {
    constructor(bounds, spritesheet, cutBounds, name, runOnce, perkType) {
        super(bounds, spritesheet, cutBounds);
        this.name = name;
        this.runOnce = runOnce;
        this.perkType = perkType;
        this.action = getAction(this.perkType);
        if (this.runOnce)
            this.action();
    }
    tick() {
        if (!this.runOnce)
            this.action();
    }
    render(g) {
        var _a;
        (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.drawImage(this.spritesheet, this.cutBounds.x, this.cutBounds.y, this.cutBounds.w, this.cutBounds.h, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
