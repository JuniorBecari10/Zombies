class Player extends Entity {
    speed: number = 3;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle) {
        super(bounds, spritesheet, cutBounds);
    }
    
    // Overrides super method
    tick(): void {
        if (isKeyPressed) {
            if (keyPressed.keyCode == upArrowCode) {
                this.bounds.y -= this.speed;
            }
            else if (keyPressed.keyCode == downArrowCode) {
                this.bounds.y += this.speed;
            }
            
            if (keyPressed.keyCode == leftArrowCode) {
                this.bounds.x -= this.speed;
            }
            else if (keyPressed.keyCode == rightArrowCode) {
                this.bounds.x += this.speed;
            }
        }
    }
}
