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
function newZombie(z) {
    return new Zombie(z.bounds, z.spritesheet, z.cutBounds, z.hp, z.defense, z.attack, z.immunity, z.name);
}
var basicZombie = new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, basicZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 5, 1, 1, "none", "Basic Zombie");
// temporary
const waves = [{ zombieAmount: 8, zombieTypes: [basicZombie] }];
