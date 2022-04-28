"use strict";
class Bullet extends Entity {
    constructor(bounds, spritesheet, cutBounds, dx, dy, attack, speed) {
        super(bounds, spritesheet, cutBounds);
        this.dx = dx;
        this.dy = dy;
        this.attack = attack;
        this.speed = speed;
    }
    tick() {
        this.bounds.x += this.dx * this.speed;
        this.bounds.y += this.dy * this.speed;
    }
}
