type WeaponType = "pistol" | "rifle" | "shotgun" | "rocket"

function getWeapon(weapon: WeaponType): Weapon | null {
    if (weapon === "pistol") {
        return new Weapon({x: 0, y: 0, w: 16 * 3, h: 16 * 3}, weapons, {x: 16 * 3, y: 0, w: 16 * 3, h: 16 * 3}, {x: 0, y: 0, w: 4 * 3, h: 4 * 3}, {x: 0, y: 16 * 3, w: 4 * 3, h: 4 * 3}, 2, 30, 1, 20, 450 /*380*/, 10, false, "Pistol");
    }
    else if (weapon === "rifle") {
        return new Weapon({x: 0, y: 0, w: 44 * 3, h: 16 * 3}, weapons, {x: 32 * 3, y: 0, w: 44 * 3, h: 16 * 3}, {x: 0, y: 0, w: 4 * 3, h: 4 * 3}, {x: 0, y: 16 * 3, w: 4 * 3, h: 4 * 3}, 5, 30, 1, 10, 450, 20, false, "Rifle");
    }
    else if (weapon === "shotgun") {
        return new Weapon({x: 0, y: 0, w: 44 * 3, h: 16 * 3}, weapons, {x: 80 * 3, y: 0, w: 144, h: 16 * 3}, {x: 0, y: 0, w: 4 * 3, h: 40}, {x: 16, y: 16 * 3, w: 4 * 3, h: 40}, 7, 30, 1, 40, 350, 5, false, "Shotgun");
    }
    else if (weapon === "rocket") {
        return new Weapon({x: 0, y: 0, w: 50 * 3, h: 16 * 3}, weapons, {x: 96, y: 64, w: 50 * 3, h: 16 * 3}, {x: 0, y: 0, w: 16 * 2, h: 16 * 2}, {x: 32, y: 16 * 3, w: 16 * 2, h: 16 * 2}, 10, 30, 1, 90, 250, 5, true, "Rocket Launcher");
    }
    
    return null;
}

class Weapon extends Entity {
    // attack belongs to Bullet
    bulletDamage: number;
    bulletSpeed: number;
    bulletAmount: number;
    
    bulletBounds: Rectangle;
    bulletSprBounds: Rectangle;
    
    cooldown: number;
    constCooldown: number;
    ammoTotal: number;
    ammoTotalConst: number;
    ammoLoaded: number;
    
    explosive: boolean;
    
    originalWidth: number;
    
    ammo: number;
    
    name: string;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
     bulletBounds: Rectangle, bulletSprBounds: Rectangle,
     bulletDamage: number, bulletSpeed: number, bulletAmount: number, cooldown: number, ammoTotal: number,
     ammoLoaded: number, explosive: boolean, name: string) {
        super(bounds, spritesheet, cutBounds);
        
        this.originalWidth = this.bounds.w;
        
        this.bulletBounds = bulletBounds;
        this.bulletSprBounds = bulletSprBounds;
        
        this.bulletDamage = bulletDamage;
        this.bulletSpeed = bulletSpeed;        // pode ser hardcoded tbm
        this.bulletAmount = bulletAmount;
        
        this.cooldown = cooldown;
        this.constCooldown = cooldown;
        this.ammoTotal = ammoTotal;
        this.ammoTotalConst = ammoTotal;
        this.ammoLoaded = ammoLoaded;
        
        this.ammo = ammoLoaded;
        
        this.explosive = explosive;
        
        this.name = name;
    }
    
    recharge(): void {
        let diff: number = this.ammoLoaded - this.ammo; // difference
        
        if (diff <= 0) {
            player.recharging = false;
            return;
        }
        
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
