"use strict";
class Zombie extends Entity {
    constructor(bounds, spritesheet, cutBounds, hp, defense, attack, immune) {
        super(bounds, spritesheet, cutBounds);
        this.hp = hp;
        this.defense = defense;
        this.attack = attack;
        this.immune = immune;
    }
}
