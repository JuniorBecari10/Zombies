class Button {
    bounds: Rectangle;
    sprite: HTMLImageElement;
    action: () => void;
    
    constructor(bounds: Rectangle, sprite: HTMLImageElement, action: () => void) {
        this.bounds = bounds;
        this.sprite = sprite;
        this.action = action;
    }
    
    tick(): void {
        if (collide(this.bounds, {x: mousePos.x, y: mousePos.y, w: 1, h: 1}) && isMousePressed) {
            this.action();
        }
    }
    
    render(g: Graphics): void {
        g.ctx?.drawImage(this.sprite, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
    }
}
