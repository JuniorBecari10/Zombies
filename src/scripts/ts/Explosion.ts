class Explosion extends Entity {
    count: number = 0;
    maxCount: number = 100;
    
    boundsConst: Rectangle;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle) {
        super(bounds, spritesheet, cutBounds);
        
        this.boundsConst = bounds;
    }
    
    tick(): void {
        
    }
}
