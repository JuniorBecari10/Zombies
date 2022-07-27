type PerkType = "speed" | "fire" | "ice" | "quick" | "extra" | "regen";

function containsPerk(perkType: PerkType): boolean {
    for (let p of player.perks) {
        if (p === undefined) continue;
        
        if (p.perkType === perkType) return true;
    }
    
    return false;
}

function getPerk(perkType: PerkType): Perk | null {
    switch (perkType) {
        case "speed":
            return new Perk({x: 0, y: 0, w: 16 * 3, h: 16 * 3}, perks, {x: 0, y: 0, w: 16 * 3, h: 16 * 3}, "Speed", false, "speed");
        
        case "quick":
            return new Perk({x: 0, y: 0, w: 16 * 3, h: 16 * 3}, perks, {x: 48 * 3, y: 0, w: 16 * 3, h: 16 * 3}, "Quick Cooldown", false, "quick");
        
        case "regen":
            return new Perk({x: 0, y: 0, w: 16 * 3, h: 16 * 3}, perks, {x: 80 * 3, y: 0, w: 16 * 3, h: 16 * 3}, "Regeneration", false, "regen");
        
        case "extra":
            return new Perk({x: 0, y: 0, w: 16 * 3, h: 16 * 3}, perks, {x: 64 * 3, y: 0, w: 16 * 3, h: 16 * 3}, "Extra Weapon", false, "extra");
    }
    
    return null;
}

function getAction(perkType: PerkType): () => void {
    switch (perkType) {
        case "speed":
            return () => {if (player !== undefined) player.speed = player.constSpeed * 2};
        
        case "quick":
            return () => {if (player !== undefined) player.weapons[weaponSelected].cooldown = player.weapons[weaponSelected].constCooldown / 2};
        
        case "regen":
            return () => {if (player !== undefined) player.maxRegenCount = player.constMaxRegenCount / 4};
    }
    
    return () => {};
}

class Perk extends Entity {
    name: string;
    action: () => void;
    runOnce: boolean;
    perkType: PerkType;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
                name: string, runOnce: boolean, perkType: PerkType) {
        super(bounds, spritesheet, cutBounds);
        
        this.name = name;
        
        this.runOnce = runOnce;
        this.perkType = perkType;
        
        this.action = getAction(this.perkType);
        
        if (this.runOnce)
            this.action();
    }
    
    tick(): void {
        if (!this.runOnce)
            this.action();
    }
    
    render(g: Graphics): void {
        g.ctx?.drawImage(this.spritesheet, this.cutBounds.x,
         this.cutBounds.y, this.cutBounds.w, this.cutBounds.h,
         this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
