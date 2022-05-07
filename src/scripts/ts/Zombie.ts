class Zombie extends Entity {
    hp: number;
    defense: number;
    attack: number;
    
    speed: number = 1.5;
    
    //ability: () => void
    // will not have ability yet
    
    immunity: Immunity;
    
    name: string; // used in death messages and debugging
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
    hp: number, defense: number, attack: number, immunity: Immunity, name: string) {
        super(bounds, spritesheet, cutBounds);
        
        this.hp = hp;
        this.defense = defense;
        this.attack = attack;
        
        this.immunity = immunity;
        
        this.name = name;
    }
    
    tick(): void {
        if (this.hp == 0)
            this.destroy();
        
        // basic following system
        if (this.bounds.x < player.bounds.x) this.bounds.x += this.speed;
        if (this.bounds.x > player.bounds.x) this.bounds.x -= this.speed;
        
        if (this.bounds.y < player.bounds.y) this.bounds.y += this.speed;
        if (this.bounds.y < player.bounds.y) this.bounds.y -= this.speed;
    }
}

type ZombieType = "basic-zombie";

type Wave = {
    zombieAmount: number;
    zombieTypes: ZombieType[];
}

//var basicZombie: Zombie = new Zombie({x: 0, y: 0, w: pixelSize, h: pixelSize}, basicZombieSpr, {x: 0, y: 0, w: 16 * 70, h: 16 * 70},
//5, 1, 1, "none", "Basic Zombie");

// temporary

const waves: Wave[] = [{zombieAmount: 9 /* put it one more */, zombieTypes: ["basic-zombie"]}, {zombieAmount: 11, zombieTypes: ["basic-zombie"]}];
