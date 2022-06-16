type PerkType = "speed" | "fire" | "ice" | "quick" | "extra";

class Perk extends Entity {
    name: string;
    action: () => void;
    runOnce: boolean;
    perkType: PerkType;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
                name: string, action: () => void, runOnce: boolean, perkType: PerkType) {
        super(bounds, spritesheet, cutBounds);
        
        this.name = name;
        this.action = action;
        
        this.runOnce = runOnce;
        this.perkType = perkType;
        
        if (this.runOnce)
            this.action();
    }
    
    tick(): void {
        if (!this.runOnce)
            this.action();
    }
}
