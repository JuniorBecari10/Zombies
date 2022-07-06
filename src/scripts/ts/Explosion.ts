class Explosion extends Entity {
    count: number = 0;
    maxCount: number = 100;
    
    progressive: boolean = true;
    
    boundsConst: Rectangle;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle) {
        super(bounds, spritesheet, cutBounds);
        
        this.boundsConst = bounds;
        
        let bw: number = this.bounds.w;
        let bh: number = this.bounds.h;
        
        this.bounds = {x: bounds.x + bw / 2, y: bounds.y + bh / 2, w: 0, h: 0}
    }
    
    tick(): void {
        if (this.progressive) {
            this.bounds.x -= 2;
            this.bounds.y -= 2;
            
            this.bounds.w += 4;
            this.bounds.h += 4;
        }
        else {
            this.bounds.x += 2;
            this.bounds.y += 2;
            
            this.bounds.w -= 4;
            this.bounds.h -= 4;
        }
        
        if (this.bounds.w >= this.boundsConst.w ||
                this.bounds.h >= this.boundsConst.h)
            this.progressive = false;
        
        if ((this.bounds.w <= 0 ||
                this.bounds.h <= 0) &&
                !this.progressive)
            this.destroy();
    }
}
