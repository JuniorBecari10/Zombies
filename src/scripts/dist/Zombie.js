"use strict";
class Zombie extends Entity {
    constructor(bounds, spritesheet, cutBounds, hp, defense, attack, immunity) {
        super(bounds, spritesheet, cutBounds);
        this.speed = 3;
        this.hp = hp;
        this.defense = defense;
        this.attack = attack;
        this.immunity = immunity;
    }
    tick() {
        // basic following system
        if (this.bounds.x < player.bounds.x)
            this.bounds.x += this.speed;
        if (this.bounds.x > player.bounds.x)
            this.bounds.x -= this.speed;
        if (this.bounds.y < player.bounds.y)
            this.bounds.y += this.speed;
        if (this.bounds.y < player.bounds.y)
            this.bounds.y -= this.speed;
    }
}
