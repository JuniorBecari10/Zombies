"use strict";
class Bullet extends Entity {
    constructor(bounds, spritesheet, cutBounds, dx, dy, attack, speed, lifeTime) {
        super(bounds, spritesheet, cutBounds);
        this.lifeCount = 0;
        this.dx = dx;
        this.dy = dy;
        this.attack = attack;
        this.speed = speed;
        this.lifeTime = lifeTime;
    }
    tick() {
        this.bounds.x += this.dx * this.speed;
        this.bounds.y += this.dy * this.speed;
        this.lifeCount++;
        if (this.lifeCount >= this.lifeTime) {
            this.lifeCount = 0;
            this.destroy();
        }
        if (this.collideWithEntity() instanceof Zombie) {
            console.log(this.collideWithEntity().hp);
            this.collideWithEntity().hp -= player.weapons[weaponSelected].bulletDamage;
            console.log(player.weapons[weaponSelected].bulletDamage);
            console.log(this.collideWithEntity().hp);
        }
        if (collideWithAny(this.bounds) || this.collideWithEntity() instanceof Zombie) {
            this.destroy();
        }
    }
}
