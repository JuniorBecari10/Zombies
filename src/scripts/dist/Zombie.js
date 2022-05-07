"use strict";
class Zombie extends Entity {
    constructor(bounds, spritesheet, cutBounds, hp, defense, attack, immunity, name) {
        super(bounds, spritesheet, cutBounds);
        this.speed = 3;
        this.hp = hp;
        this.defense = defense;
        this.attack = attack;
        this.immunity = immunity;
        this.name = name;
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
var basicZombie = new Zombie({ x: 0, y: 0, w: 70 * 16, h: 70 * 16 }, basicZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 5, 1, 1, "none", "Basic Zombie");
const zombies = [basicZombie];
