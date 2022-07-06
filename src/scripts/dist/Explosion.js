"use strict";
class Explosion extends Entity {
    constructor(bounds, spritesheet, cutBounds) {
        super(bounds, spritesheet, cutBounds);
        this.count = 0;
        this.maxCount = 100;
        this.boundsConst = bounds;
    }
    tick() {
    }
}
