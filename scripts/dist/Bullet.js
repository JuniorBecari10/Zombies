"use strict";
class Bullet extends Entity {
    constructor(bounds, spritesheet, cutBounds, dx, dy, attack, speed, lifeTime, explosive) {
        super(bounds, spritesheet, cutBounds);
        this.lifeCount = 0;
        this.dx = dx;
        this.dy = dy;
        this.attack = attack;
        this.speed = speed;
        this.lifeTime = lifeTime;
        this.explosive = explosive;
    }
    tick() {
        this.bounds.x += this.dx * this.speed;
        this.bounds.y += this.dy * this.speed;
        this.lifeCount++;
        if (this.lifeCount >= this.lifeTime) {
            this.lifeCount = 0;
            this.destroy();
        }
        if (this.collideWithEntity() instanceof Zombie)
            this.collideWithEntity().hp -= player.weapons[weaponSelected].bulletDamage - this.collideWithEntity().defense;
        this.collideWithEntity().feedback = true;
        this.collideWithEntity().feedbackCount = this.collideWithEntity().maxFeedbackCount;
        if (collideWithAny(this.bounds) || this.collideWithEntity() instanceof Zombie) {
            if (this.explosive) {
                entities.push(new Explosion(this.bounds, explosion, { x: 0, y: 0, w: 312 + (312 / 3), h: 264 + (264 / 3) }));
            }
            this.destroy();
        }
    }
}
