var entities: Entity[] = [];

class Entity implements ITickable, IRenderable {
    bounds: Rectangle;
    spritesheet: HTMLImageElement;
    cutBounds: Rectangle;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle) {
        this.bounds = bounds;
        this.spritesheet = spritesheet;
        this.cutBounds = cutBounds;
    }
    
    tick(): void {}
    
    render(g: Graphics): void {
        g.ctx?.drawImage(this.spritesheet, this.cutBounds.x,
         this.cutBounds.y, this.cutBounds.w, this.cutBounds.h,
         this.bounds.x - camera.x, this.bounds.y - camera.y, this.bounds.w, this.bounds.h);
    }
    
    destroy(): void {
        entities.splice(entities.indexOf(this), 1);
    }
    
    collideWithEntity(): Entity {
        for (let e of entities) {
            if (collide(this.bounds, e.bounds)) return e;
        }
        
        return this;
    }
}
