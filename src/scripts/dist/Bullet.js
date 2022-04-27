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
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }
}
