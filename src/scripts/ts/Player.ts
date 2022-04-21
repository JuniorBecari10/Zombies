type Direction = "up" | "down" | "left" | "right";

class Player extends Entity {
    speed: number = 3;
    dir: Direction = "down";
    
    upSprs: Rectangle[] = [];
    downSprs: Rectangle[] = [];
    leftSprs: Rectangle[] = [];
    rightSprs: Rectangle[] = [];
    
    dashUpSpr: Rectangle;
    dashDownSpr: Rectangle;
    dashLeftSpr: Rectangle;
    dashRightSpr: Rectangle;
    
    animCount: number = 0;
    maxAnimCount: number = 5;
    
    animIndex: number = 0;
    maxAnimIndex: number = 5;
    
    dashCount: number = 0;
    maxDashCount: number = 60;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle) {
        super(bounds, spritesheet, cutBounds);
        
        this.dashDownSpr = {x: 80 * 40, y: 0, w: 16 * 40, h: 16 * 40};
        this.dashLeftSpr = {x: 80 * 40, y: 16 * 40, w: 16 * 40, h: 16 * 40};
        this.dashRightSpr = {x: 80 * 40, y: 32 * 40, w: 16 * 40, h: 16 * 40};
        this.dashUpSpr = {x: 80 * 40, y: 48 * 40, w: 16 * 40, h: 16 * 40};
        
        for (let i = 0; i < this.maxAnimIndex; i++) {
            this.downSprs[i] = {x: i * 16 * 40, y: 0, w: 16 * 40, h: 16 * 40};
            this.leftSprs[i] = {x: i * 16 * 40, y: 16 * 40, w: 16 * 40, h: 16 * 40};
            this.rightSprs[i] = {x: i * 16 * 40, y: 32 * 40, w: 16 * 40, h: 16 * 40};
            this.upSprs[i] = {x: i * 16 * 40, y: 48 * 40, w: 16 * 40, h: 16 * 40};
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
            
            if (keyPressed.keyCode == spaceCode && this.dashCount >= this.maxDashCount) { // dash
                this.dashCount = 0;
                
                if (this.dir == "up") {
                    this.bounds.y -= this.speed * 20;
                    this.cutBounds = this.dashUpSpr;
                }
                if (this.dir == "down") {
                    this.bounds.y += this.speed * 20;
                    this.cutBounds = this.dashDownSpr;
                }
                if (this.dir == "left") {
                    this.bounds.x -= this.speed * 20;
                    this.cutBounds = this.dashLeftSpr;
                }
                if (this.dir == "right") {
                    this.bounds.x += this.speed * 20;
                    this.cutBounds = this.dashRightSpr;
                }
            }
            
            if (keyPressed.keyCode == upArrowCode || keyPressed.keyCode == wCode) {
                this.dir = "up";
                this.bounds.y -= this.speed;
                this.cutBounds = this.upSprs[this.animIndex];
            }
            if (keyPressed.keyCode == downArrowCode || keyPressed.keyCode == sCode) {
                this.dir = "down";
                this.bounds.y += this.speed;
                this.cutBounds = this.downSprs[this.animIndex];
            }
            
            if (keyPressed.keyCode == leftArrowCode || keyPressed.keyCode == aCode) {
                this.dir = "left";
                this.bounds.x -= this.speed;
                this.cutBounds = this.leftSprs[this.animIndex];
            }
            if (keyPressed.keyCode == rightArrowCode || keyPressed.keyCode == dCode) {
                this.dir = "right";
                this.bounds.x += this.speed;
                this.cutBounds = this.rightSprs[this.animIndex];
            }
        }
        else {
            if (this.dir == "up") {
                this.cutBounds = this.upSprs[0];
            }
            if (this.dir == "down") {
                this.cutBounds = this.downSprs[0];
            }
            if (this.dir == "left") {
                this.cutBounds = this.leftSprs[0];
            }
            if (this.dir == "right") {
                this.cutBounds = this.rightSprs[0];
            }
        }
        
        camera.x = clamp(this.bounds.x - (g.canvas.width / 2), 0, map.width * 16 - g.canvas.width);
        camera.y = clamp(this.bounds.y - (g.canvas.height / 2), 0, map.height * 16 - g.canvas.height);
        
        console.log(this.bounds.x);
    }
}
