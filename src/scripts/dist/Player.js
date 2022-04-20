"use strict";
class Player extends Entity {
    constructor(bounds, spritesheet, cutBounds) {
        super(bounds, spritesheet, cutBounds);
        this.speed = 3;
    }
    // Overrides super method
    tick() {
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
