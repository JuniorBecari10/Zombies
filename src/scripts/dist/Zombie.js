"use strict";
//var basicZombie: Zombie = new Zombie({x: 0, y: 0, w: pixelSize, h: pixelSize}, basicZombieSpr, {x: 0, y: 0, w: 16 * 70, h: 16 * 70},
//5, 1, 1, "none", "Basic Zombie");
const waves = [{ zombieAmount: 9 /* put it one more */, zombieTypes: ["basic-zombie"] }, { zombieAmount: 11, zombieTypes: ["basic-zombie"] }, { zombieAmount: 13, zombieTypes: ["basic-zombie", "basic-skeleton"] }];
class Zombie extends Entity {
    constructor(bounds, spritesheet, cutBounds, hp, defense, attack, immunity, name, animFrames) {
        super(bounds, spritesheet, cutBounds);
        this.speed = 2;
        this.animCount = 0;
        this.maxAnimCount = 8;
        this.animIndex = 0;
        this.maxAnimIndex = 3;
        this.hp = hp;
        this.defense = defense;
        this.attack = attack;
        this.immunity = immunity;
        this.name = name;
        this.animFrames = animFrames;
    }
    tick() {
        if (this.hp <= 0) {
            this.destroy();
            player.coins += 20;
        }
        this.animCount++;
        if (this.animCount >= this.maxAnimCount) {
            this.animCount = 0;
            this.animIndex++;
            this.cutBounds = this.animFrames[this.animIndex];
            if (this.animIndex >= this.maxAnimIndex) {
                this.animIndex = 0;
            }
        }
        // basic following system
        if (this.bounds.x < player.bounds.x && !collideWithAny({ x: this.bounds.x + this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h }))
            this.bounds.x += this.speed; // right
        if (this.bounds.x > player.bounds.x && !collideWithAny({ x: this.bounds.x - this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h }))
            this.bounds.x -= this.speed; // left
        if (this.bounds.y < player.bounds.y && !collideWithAny({ x: this.bounds.x, y: this.bounds.y - this.speed, w: this.bounds.w, h: this.bounds.h }))
            this.bounds.y += this.speed; // down
        if (this.bounds.y > player.bounds.y && !collideWithAny({ x: this.bounds.x, y: this.bounds.y + this.speed, w: this.bounds.w, h: this.bounds.h }))
            this.bounds.y -= this.speed; // up
        if (this.collideWithEntity() instanceof Player && player.immunityCount >= player.immunityTotal) {
            player.hp -= this.attack;
            player.immunityCount = 0;
            player.deathCause = this.name;
        }
    }
}
