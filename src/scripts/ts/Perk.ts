type PerkType = "speed" | "fire" | "ice" | "quick" | "extra";

function getAction(perkType: PerkType): () => void {
    switch (perkType) {
        case "speed":
            return () => {if (player !== undefined) player.speed = player.constSpeed * 2};
        
        case "quick":
            return () => {if (player !== undefined) player.weapons[weaponSelected].cooldown = player.weapons[weaponSelected].constCooldown / 2};
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
