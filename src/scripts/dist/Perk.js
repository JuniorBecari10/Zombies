"use strict";
class Perk extends Entity {
    constructor(bounds, spritesheet, cutBounds, name, action, runOnce, perkType) {
        super(bounds, spritesheet, cutBounds);
        this.name = name;
        this.action = action;
        this.runOnce = runOnce;
        this.perkType = perkType;
        if (this.runOnce)
            this.action();
    }
    tick() {
        if (!this.runOnce)
            this.action();
    }
}
