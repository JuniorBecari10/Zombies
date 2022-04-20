type Direction = "up" | "down" | "left" | "right";

class Player extends Entity {
    speed: number = 3;
    dir: Direction = "down";
    
    upSprs: Rectangle[] = [];
    downSprs: Rectangle[] = [];
    leftSprs: Rectangle[] = [];
    rightSprs: Rectangle[] = [];
    
    animCount: number = 0;
    maxAnimCount: number = 5;
    
    animIndex: number = 0;
    maxAnimIndex: number = 5;
    
    dashCount: number = 0;
    maxDashCount: number = 60;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle) {
        super(bounds, spritesheet, cutBounds);
        
        for (let i = 0; i < this.maxAnimIndex; i++) {
            this.downSprs[i] = {x: i * 16, y: 0, w: 16, h: 16};
            this.leftSprs[i] = {x: i * 16, y: 16, w: 16, h: 16};
            this.rightSprs[i] = {x: i * 16, y: 32, w: 16, h: 16};
            this.upSprs[i] = {x: i * 16, y: 48, w: 16, h: 16};
        }
    }
    
    // Overrides super method
    tick(): void {
        if (this.dashCount < this.maxDashCount)
           this.dashCount++;
        
        if (isKeyPressed) {
            this.animCount++;
            
            if (this.animCount >= this.maxAnimCount) {
                this.animCount = 0;
                
                this.animIndex++;
                
                if (this.animIndex >= this.maxAnimIndex) {
                    this.animIndex = 0;
                }
            }
            
            if (keyPressed.keyCode == spaceCode && this.dashCount >= this.maxDashCount) {
                this.dashCount = 0;
                
                if (this.dir == "up") {
                    this.bounds.y -= this.speed * 20;
                }
                if (this.dir == "down") {
                    this.bounds.y += this.speed * 20;
                }
                if (this.dir == "left") {
                    this.bounds.x -= this.speed * 20;
                }
                if (this.dir == "right") {
                    this.bounds.x += this.speed * 20;
                }
            }
            
            if (keyPressed.keyCode == upArrowCode || keyPressed.keyCode == wCode) {
                this.dir = "up";
                this.bounds.y -= this.speed;
                this.cutBounds = this.upSprs[this.animIndex];
            }
            else if (keyPressed.keyCode == downArrowCode || keyPressed.keyCode == sCode) {
                this.dir = "down";
                this.bounds.y += this.speed;
                this.cutBounds = this.downSprs[this.animIndex];
            }
            
            if (keyPressed.keyCode == leftArrowCode || keyPressed.keyCode == aCode) {
                this.dir = "left";
                this.bounds.x -= this.speed;
                this.cutBounds = this.leftSprs[this.animIndex];
            }
            else if (keyPressed.keyCode == rightArrowCode || keyPressed.keyCode == dCode) {
                this.dir = "right";
                this.bounds.x += this.speed;
                this.cutBounds = this.rightSprs[this.animIndex];
            }
        }
    }
}
