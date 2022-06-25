"use strict";
function containsPerk(perkType) {
    for (let p of player.perks) {
        if (p.perkType === perkType)
            return true;
    }
    return false;
}
function getPerk(perkType) {
    switch (perkType) {
        case "speed":
            return new Perk({ x: 0, y: 0, w: 16 * 3, h: 16 * 3 }, perks, { x: 0, y: 0, w: 16 * 3, h: 16 * 3 }, "Speed", false, "speed");
        case "quick":
            return new Perk({ x: 0, y: 0, w: 16 * 3, h: 16 * 3 }, perks, { x: 64 * 3, y: 0, w: 16 * 3, h: 16 * 3 }, "Quick Cooldown", false, "quick");
        case "regen":
            return new Perk({ x: 0, y: 0, w: 16 * 3, h: 16 * 3 }, perks, { x: 80 * 3, y: 0, w: 16 * 3, h: 16 * 3 }, "Regeneration", false, "regen");
    }
    return null;
}
function getAction(perkType) {
    switch (perkType) {
        case "speed":
            return () => { if (player !== undefined)
                player.speed = player.constSpeed * 2; };
        case "quick":
            return () => { if (player !== undefined)
                player.weapons[weaponSelected].cooldown = player.weapons[weaponSelected].constCooldown / 2; };
        case "regen":
            return () => { if (player !== undefined)
                player.maxRegenCount = player.constMaxRegenCount / 4; };
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
