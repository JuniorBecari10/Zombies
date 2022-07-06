"use strict";
function getZombie(zombieType) {
    if (zombieType === "basic-zombie")
        return new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, basicZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 5, 0, 1, "none", () => { }, "Basic Zombie", [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
    else if (zombieType === "basic-skeleton")
        return new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, basicSkeletonSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 6, 0, 1, "none", () => { }, "Basic Skeleton", [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
    else if (zombieType === "armored-zombie")
        return new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, armoredZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 6, 1, 1, "none", () => { }, "Armored Zombie", [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
    else if (zombieType === "armored-skeleton")
        return new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, armoredSkeletonSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 7, 1, 2, "none", () => { }, "Armored Skeleton", [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
    else if (zombieType === "fire-zombie")
        return new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, fireZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 7, 1, 2, "fire", () => { }, "Fire Zombie", [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
    return null;
}
//var basicZombie: Zombie = new Zombie({x: 0, y: 0, w: pixelSize, h: pixelSize}, basicZombieSpr, {x: 0, y: 0, w: 16 * 70, h: 16 * 70},
//5, 1, 1, "none", "Basic Zombie");
const waves = [{ zombieAmount: 9 /* put it one more */, zombieTypes: ["basic-zombie"] },
    { zombieAmount: 11, zombieTypes: ["basic-zombie"] },
    { zombieAmount: 13, zombieTypes: ["basic-zombie", "basic-skeleton"] },
    { zombieAmount: 15, zombieTypes: ["basic-zombie", "basic-skeleton"] },
    { zombieAmount: 19, zombieTypes: ["armored-zombie"] },
    { zombieAmount: 19, zombieTypes: ["armored-zombie", "basic-skeleton"] },
    { zombieAmount: 17, zombieTypes: ["armored-zombie", "armored-skeleton"] },
    { zombieAmount: 21, zombieTypes: ["armored-zombie", "armored-skeleton"] },
    { zombieAmount: 27, zombieTypes: ["fire-zombie", "basic-skeleton"] }];
class Zombie extends Entity {
    constructor(bounds, spritesheet, cutBounds, hp, defense, attack, immunity, ability, name, animFrames) {
        super(bounds, spritesheet, cutBounds);
        this.speed = 2;
        this.animCount = 0;
        this.maxAnimCount = 8;
        this.animIndex = 0;
        this.maxAnimIndex = 3;
        this.dying = false;
        this.hp = hp;
        this.maxHp = hp;
        this.defense = defense;
        this.attack = attack;
        this.immunity = immunity;
        this.ability = ability;
        this.name = name;
        this.animFrames = animFrames;
    }
    tick() {
        if (this.dying) {
            this.bounds.x += 3;
            this.bounds.y += 3;
            this.bounds.w -= 6;
            this.bounds.h -= 6;
            if (this.bounds.w === 0 || this.bounds.h === 0)
                this.destroy();
            return;
        }
        if (this.hp <= 0) {
            //this.destroy();
            this.dying = true;
            player.coins += 20;
            zombieKills++;
            totalZombieKills++;
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
        if (this.bounds.x <= player.bounds.x && !collideWithAny({ x: this.bounds.x + this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h }))
            this.bounds.x += this.speed; // right
        else if (this.bounds.x >= player.bounds.x && !collideWithAny({ x: this.bounds.x - this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h }))
            this.bounds.x -= this.speed; // left
        if (this.bounds.y <= player.bounds.y && !collideWithAny({ x: this.bounds.x, y: this.bounds.y + this.speed, w: this.bounds.w, h: this.bounds.h }))
            this.bounds.y += this.speed; // down
        else if (this.bounds.y >= player.bounds.y && !collideWithAny({ x: this.bounds.x, y: this.bounds.y - this.speed, w: this.bounds.w, h: this.bounds.h }))
            this.bounds.y -= this.speed; // up
        if (this.collideWithEntity() instanceof Player && player.immunityCount >= player.immunityTotal) {
            player.hp -= this.attack - player.defense;
            player.immunityCount = 0;
            player.deathCause = this.name;
        }
    }
}
