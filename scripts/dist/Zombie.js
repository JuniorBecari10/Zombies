"use strict";
function getZombie(zombieType) {
    if (zombieType === "basic-zombie")
        return new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, basicZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 5, 0, 1, "none", () => { }, "Basic Zombie", false, [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
    else if (zombieType === "basic-skeleton")
        return new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, basicSkeletonSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 6, 0, 1, "none", () => { }, "Basic Skeleton", false, [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
    else if (zombieType === "armored-zombie")
        return new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, armoredZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 6, 1, 1, "none", () => { }, "Armored Zombie", false, [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
    else if (zombieType === "armored-skeleton")
        return new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, armoredSkeletonSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 7, 1, 2, "none", () => { }, "Armored Skeleton", false, [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
    else if (zombieType === "fire-zombie")
        return new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, fireZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 7, 1, 2, "fire", () => { }, "Fire Zombie", false, [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
    else if (zombieType === "bombie")
        return new Zombie({ x: 0, y: 0, w: pixelSize * 1.8, h: pixelSize * 1.8 }, bombieSpr, { x: 0, y: 0, w: 32 * 70, h: 32 * 70 }, 200, 2, 2, "none", () => { }, "Bombie", true, [{ x: 0, y: 0, w: 32 * 70, h: 32 * 70 }, { x: 32 * 70, y: 0, w: 32 * 70, h: 32 * 70 }, { x: 64 * 70, y: 0, w: 32 * 70, h: 32 * 70 }, { x: 96 * 70, y: 0, w: 32 * 70, h: 32 * 70 }]);
    return null;
}
//var basicZombie: Zombie = new Zombie({x: 0, y: 0, w: pixelSize, h: pixelSize}, basicZombieSpr, {x: 0, y: 0, w: 16 * 70, h: 16 * 70},
//5, 1, 1, "none", "Basic Zombie");
const waves = [{ zombieAmount: 8, zombieTypes: ["basic-zombie"] },
    { zombieAmount: 10, zombieTypes: ["basic-zombie"] },
    { zombieAmount: 12, zombieTypes: ["basic-zombie", "basic-skeleton"] },
    { zombieAmount: 14, zombieTypes: ["basic-zombie", "basic-skeleton"] },
    { zombieAmount: 18, zombieTypes: ["armored-zombie"] },
    { zombieAmount: 18, zombieTypes: ["armored-zombie", "basic-skeleton"] },
    { zombieAmount: 16, zombieTypes: ["armored-zombie", "armored-skeleton"] },
    { zombieAmount: 20, zombieTypes: ["armored-zombie", "armored-skeleton"] },
    { zombieAmount: 26, zombieTypes: ["fire-zombie", "basic-skeleton"] },
    { zombieAmount: 1, zombieTypes: ["bombie"] }];
class Zombie extends Entity {
    constructor(bounds, spritesheet, cutBounds, hp, defense, attack, immunity, ability, name, isBoss, animFrames) {
        super(bounds, spritesheet, cutBounds);
        this.speed = 2;
        this.animCount = 0;
        this.maxAnimCount = 8;
        this.animIndex = 0;
        this.maxAnimIndex = 3;
        this.rising = true;
        this.dying = false;
        this.originalBounds = { x: bounds.x, y: bounds.y, w: bounds.w, h: bounds.h };
        this.hp = hp;
        this.maxHp = hp;
        this.defense = defense;
        this.attack = attack;
        this.isBoss = isBoss;
        this.immunity = immunity;
        this.ability = ability;
        this.name = name;
        this.animFrames = animFrames;
        this.bounds.w = 0;
        this.bounds.h = 0;
    }
    tick() {
        if (this.rising) {
            //this.bounds.x -= 3;
            this.bounds.y -= 3;
            this.bounds.w += 6;
            this.bounds.h += 6;
            if (this.bounds.w === this.originalBounds.w && this.bounds.h === this.originalBounds.h)
                this.rising = false;
            return;
        }
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
            this.hp = 0;
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
    render(g) {
        var _a, _b, _c;
        super.render(g);
        if (this.isBoss) {
            g.ctx.font = "20px Pixel";
            g.ctx.fillStyle = "white";
            (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillText(this.name, g.canvas.width / 2 - ((this.name.length * 20) / 2), 50);
            g.ctx.fillStyle = "red";
            (_b = g.ctx) === null || _b === void 0 ? void 0 : _b.fillRect(g.canvas.width / 2 - 150, 70, 300, 20);
            g.ctx.fillStyle = "green";
            (_c = g.ctx) === null || _c === void 0 ? void 0 : _c.fillRect(g.canvas.width / 2 - 150, 70, (ruleOf3(this.maxHp, 100, this.hp) / 100) * 300, 20);
        }
    }
}
