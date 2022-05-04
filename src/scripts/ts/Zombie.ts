class Zombie extends Entity {
    hp: number;
    defense: number;
    attack: number;
    
    //ability: () => void
    // will not have ability yet
    
    immune: Immune;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
    hp: number, defense: number, attack: number, immune: Immune) {
        super(bounds, spritesheet, cutBounds);
        
        this.hp = hp;
        this.defense = defense;
        this.attack = attack;
        
        this.immune = immune;
    }
    
    tick(): void {
        // basic following system
        
    }
}
