class Zombie extends Entity {
    hp: number;
    defense: number;
    attack: number;
    
    speed: number = 3;
    
    //ability: () => void
    // will not have ability yet
    
    immunity: Immunity;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
    hp: number, defense: number, attack: number, immunity: Immunity) {
        super(bounds, spritesheet, cutBounds);
        
        this.hp = hp;
        this.defense = defense;
        this.attack = attack;
        
        this.immunity = immunity;
    }
    
    tick(): void {
        // basic following system
        if (this.bounds.x < player.bounds.x) this.bounds.x += this.speed;
        if (this.bounds.x > player.bounds.x) this.bounds.x -= this.speed;
        if (this.bounds.y < player.bounds.y) this.bounds.y += this.speed;
        if (this.bounds.y < player.bounds.y) this.bounds.y -= this.speed;
    }
}
