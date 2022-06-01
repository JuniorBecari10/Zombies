class Weapon extends Entity {
    // attack belongs to Bullet
    bulletDamage: number;
    bulletSpeed: number;
    bulletAmount: number;
    
    cooldown: number;
    ammoTotal: number;
    ammoTotalConst: number;
    ammoLoaded: number;
    
    ammo: number;
    
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
        this.ammoTotalConst = ammoTotal;
        this.ammoLoaded = ammoLoaded;
        
        this.ammo = ammoLoaded;
        
        this.name = name;
    }
    
    recharge(): void {
        let diff: number = this.ammoLoaded - this.ammo; // difference
        
        if (diff <= 0) return;
        
        this.ammo += diff;
        this.ammoTotal -= diff;
        
        if (this.ammoTotal < 0) {
            this.ammoTotal = 0;
            this.ammo = 0;
        }
    }
    
    
    render(g: Graphics): void {
        g.ctx?.drawImage(this.spritesheet, this.cutBounds.x,
         this.cutBounds.y, this.cutBounds.w, this.cutBounds.h,
         this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
