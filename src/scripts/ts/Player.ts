type Direction = "up" | "down" | "left" | "right";

class Player extends Entity {
    speed: number = 4; // 3
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
    
    up: boolean = false;
    down: boolean = false;
    left: boolean = false;
    right: boolean = false;
    
    weapons: Weapon[];
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle) {
        super(bounds, spritesheet, cutBounds);
        
        this.dashDownSpr = {x: 70 * 70, y: 0, w: 16 * 70, h: 16 * 70};
        this.dashLeftSpr = {x: 70 * 70, y: 16 * 70, w: 16 * 70, h: 16 * 70};
        this.dashRightSpr = {x: 70 * 70, y: 32 * 70, w: 16 * 70, h: 16 * 70};
        this.dashUpSpr = {x: 70 * 70, y: 48 * 70, w: 16 * 70, h: 16 * 70};
        
        for (let i = 0; i < this.maxAnimIndex; i++) {
            this.downSprs[i] = {x: i * 16 * 70, y: 0, w: 16 * 70, h: 16 * 70};
            this.leftSprs[i] = {x: i * 16 * 70, y: 16 * 70, w: 16 * 70, h: 16 * 70};
            this.rightSprs[i] = {x: i * 16 * 70, y: 32 * 70, w: 16 * 70, h: 16 * 70};
            this.upSprs[i] = {x: i * 16 * 70, y: 48 * 70, w: 16 * 70, h: 16 * 70};
        }
        
        this.weapons = [];
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
                
                if (this.dir == "up") {// && !collideWithAny({x: this.bounds.x, y: this.bounds.y - this.speed * 20, w: this.bounds.w, h: this.bounds.h})) {
                    this.bounds.y -= this.speed * 20;
                    this.cutBounds = this.dashUpSpr;
                }
                if (this.dir == "down") {// && !collideWithAny({x: this.bounds.x, y: this.bounds.y + this.speed * 20, w: this.bounds.w, h: this.bounds.h})) {
                    this.bounds.y += this.speed * 20;
                    this.cutBounds = this.dashDownSpr;
                }
                if (this.dir == "left") {// && !collideWithAny({x: this.bounds.x - this.speed * 20, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) {
                    this.bounds.x -= this.speed * 20;
                    this.cutBounds = this.dashLeftSpr;
                }
                if (this.dir == "right") {// && !collideWithAny({x: this.bounds.x + this.speed * 20, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) {
                    this.bounds.x += this.speed * 20;
                    this.cutBounds = this.dashRightSpr;
                }
            }
            
            if (keyPressed.keyCode == upArrowCode || keyPressed.keyCode == wCode)
                this.up = true;
            else if (keyPressed.keyCode != upArrowCode || keyPressed.keyCode != wCode)
                this.up = false;
            
            if (keyPressed.keyCode == downArrowCode || keyPressed.keyCode == sCode)
                this.down = true;
            else if (keyPressed.keyCode != downArrowCode || keyPressed.keyCode != sCode)
                this.down = false;
            
            if (keyPressed.keyCode == leftArrowCode || keyPressed.keyCode == aCode)
                this.left = true;
            else if (keyPressed.keyCode != leftArrowCode || keyPressed.keyCode != aCode)
                this.left = false;
            
            if (keyPressed.keyCode == rightArrowCode || keyPressed.keyCode == dCode)
                this.right = true;
            else if (keyPressed.keyCode != rightArrowCode || keyPressed.keyCode != dCode)
                this.right = false;
            
            // --------------------------------------------------
            
            if (this.up && !collideWithAny({x: this.bounds.x, y: this.bounds.y - this.speed, w: this.bounds.w, h: this.bounds.h})) {
                this.dir = "up";
                this.bounds.y -= this.speed;
                this.cutBounds = this.upSprs[this.animIndex];
            }
            else if (this.down && !collideWithAny({x: this.bounds.x, y: this.bounds.y + this.speed, w: this.bounds.w, h: this.bounds.h})) {
                this.dir = "down";
                this.bounds.y += this.speed;
                this.cutBounds = this.downSprs[this.animIndex];
            }
            
            if (this.left && !collideWithAny({x: this.bounds.x - this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) {
                this.dir = "left";
                this.bounds.x -= this.speed;
                this.cutBounds = this.leftSprs[this.animIndex];
            }
            else if (this.right && !collideWithAny({x: this.bounds.x + this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) {
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
    }
}
