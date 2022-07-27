"use strict";
class Explosion extends Entity {
    constructor(bounds, spritesheet, cutBounds) {
        super(bounds, spritesheet, cutBounds);
        this.count = 0;
        this.maxCount = 100;
        this.progressive = true;
        this.boundsConst = bounds;
        let bw = this.bounds.w;
        let bh = this.bounds.h;
        this.bounds = { x: bounds.x + bw / 2, y: bounds.y + bh / 2, w: 0, h: 0 };
    }
    tick() {
        if (this.progressive) {
            this.bounds.x -= 2;
            this.bounds.y -= 2;
            this.bounds.w += 4;
            this.bounds.h += 4;
        }
        else {
            this.bounds.x += 2;
            this.bounds.y += 2;
            this.bounds.w -= 4;
            this.bounds.h -= 4;
        }
        if (this.bounds.w >= this.boundsConst.w ||
            this.bounds.h >= this.boundsConst.h)
            this.progressive = false;
        if ((this.bounds.w <= 0 ||
            this.bounds.h <= 0) &&
            !this.progressive)
            this.destroy();
    }
}
