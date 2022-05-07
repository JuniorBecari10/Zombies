class Zombie extends Entity {
    hp: number;
    defense: number;
    attack: number;
    
    speed: number = 3;
    
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
        // basic following system
        if (this.bounds.x < player.bounds.x) this.bounds.x += this.speed;
        if (this.bounds.x > player.bounds.x) this.bounds.x -= this.speed;
        if (this.bounds.y < player.bounds.y) this.bounds.y += this.speed;
        if (this.bounds.y < player.bounds.y) this.bounds.y -= this.speed;
    }
}

var basicZombie: Zombie = new Zombie({x: 0, y: 0, w: 70 * 16, h: 70 * 16}, basicZombieSpr, {x: 0, y: 0, w: 16 * 70, h: 16 * 70},
5, 1, 1, "none", "Basic Zombie");

const zombies: Zombie[] = [basicZombie];
