class Weapon extends Entity {
    // attack belongs to Bullet
    bulletDamage: number;
    bulletSpeed: number;
    bulletAmount: number;
    
    cooldown: number;
    ammoTotal: number;
    ammoLoaded: number;
    
    name: string;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
     bulletDamage: number, bulletSpeed: number, bulletAmount: number, cooldown: number, ammoTotal: number,
     ammoLoaded: number, name: string) {
        super(bounds, spritesheet, cutBounds);
        
        this.bulletDamage = bulletDamage;
        this.bulletSpeed = bulletSpeed;        // pode ser hardcoded tbm
        this.bulletAmount = bulletAmount;
        
        this.cooldown = cooldown;
        this.ammoTotal = ammoTotal;
        this.ammoLoaded = ammoLoaded;
        
        this.name = name;
    }
    
    render(g: Graphics): void {
        g.ctx?.drawImage(this.spritesheet, this.cutBounds.x,
         this.cutBounds.y, this.cutBounds.w, this.cutBounds.h,
         this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
