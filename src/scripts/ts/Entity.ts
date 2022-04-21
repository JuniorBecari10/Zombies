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
}

function collide(rect1: Rectangle, rect2: Rectangle): boolean {
    return rect1.x < rect2.x + rect2.w &&
       rect1.x + rect1.w > rect2.x &&
       rect1.y < rect2.y + rect2.h &&
       rect1.y + rect1.h > rect2.y
}

function collideWithAny(rect: Rectangle) {
    for (let r of collisions) {
        if (collide(rect, r)) return true;
    }
    
    return false;
}
