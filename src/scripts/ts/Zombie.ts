type ZombieType = "basic-zombie" | "basic-skeleton" | "armored-zombie" | "armored-skeleton";

type Wave = {
    zombieAmount: number;
    zombieTypes: ZombieType[];
}

//var basicZombie: Zombie = new Zombie({x: 0, y: 0, w: pixelSize, h: pixelSize}, basicZombieSpr, {x: 0, y: 0, w: 16 * 70, h: 16 * 70},
//5, 1, 1, "none", "Basic Zombie");

const waves: Wave[] = [{zombieAmount: 9 /* put it one more */, zombieTypes: ["basic-zombie"]},
                       {zombieAmount: 11, zombieTypes: ["basic-zombie"]},
                       {zombieAmount: 13, zombieTypes: ["basic-zombie", "basic-skeleton"]},
                       {zombieAmount: 15, zombieTypes: ["basic-zombie", "basic-skeleton"]},
                       {zombieAmount: 19, zombieTypes: ["armored-zombie", "basic-skeleton"]},
                       {zombieAmount: 17, zombieTypes: ["armored-zombie", "armored-skeleton"]},
                       {zombieAmount: 21, zombieTypes: ["armored-zombie", "armored-skeleton"]}];

class Zombie extends Entity {
    hp: number;
    defense: number;
    attack: number;
    
    speed: number = 2;
    
    animCount: number = 0;
    maxAnimCount: number = 8;
    
    animIndex: number = 0;
    maxAnimIndex: number = 3;
    
    //ability: () => void
    // will not have ability yet
    
    immunity: Immunity;
    
    name: string; // used in death messages and debugging
    
    animFrames: Rectangle[];
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
    hp: number, defense: number, attack: number, immunity: Immunity, name: string,
    animFrames: Rectangle[]) {
        super(bounds, spritesheet, cutBounds);
        
        this.hp = hp;
        this.defense = defense;
        this.attack = attack;
        
        this.immunity = immunity;
        
        this.name = name;
        this.animFrames = animFrames;
    }
    
    tick(): void {
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
        if (this.bounds.x <= player.bounds.x && !collideWithAny({x: this.bounds.x + this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) this.bounds.x += this.speed; // right
        else if (this.bounds.x >= player.bounds.x && !collideWithAny({x: this.bounds.x - this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) this.bounds.x -= this.speed; // left
        
        if (this.bounds.y <= player.bounds.y && !collideWithAny({x: this.bounds.x, y: this.bounds.y + this.speed, w: this.bounds.w, h: this.bounds.h})) this.bounds.y += this.speed; // down
        else if (this.bounds.y >= player.bounds.y && !collideWithAny({x: this.bounds.x, y: this.bounds.y - this.speed, w: this.bounds.w, h: this.bounds.h})) this.bounds.y -= this.speed; // up
        
        if (this.collideWithEntity() instanceof Player && player.immunityCount >= player.immunityTotal) {
            player.hp -= this.attack;
            player.immunityCount = 0;
            player.deathCause = this.name;
        }
    }
}
