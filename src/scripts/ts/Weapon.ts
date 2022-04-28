class Weapon extends Entity {
    // attack belongs to Bullet
    bullet: Bullet;
    bulletAmount: number;
    
    cooldown: number;
    ammoTotal: number;
    ammoLoaded: number;
    
    name: string;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
     bullet: Bullet, bulletAmount: number, cooldown: number, ammoTotal: number,
     ammoLoaded: number, name: string) {
        super(bounds, spritesheet, cutBounds);
        
        this.cooldown = cooldown;
        this.ammoTotal = ammoTotal;
        this.ammoLoaded = ammoLoaded;
        
        this.name = name;
    }
}
