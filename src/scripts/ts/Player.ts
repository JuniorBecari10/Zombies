type Direction = "up" | "down" | "left" | "right";

var camFollowMouse: boolean = false;

class Player extends Entity {
    speed: number = 4; // 3
    dir: Direction = "down";
    
    hp: number = 10;
    totalHp: number = 10;
    
    coins: number = 1000;
    
    deathCause: string = "";
    
    immunityCount: number = 0;
    immunityTotal: number = 20;
    
    regenCount: number = 0;
    maxRegenCount: number = 200;
    
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
    
    dx: number = 0;
    dy: number = 0;
    
    dashSpeed: number = 4;
    constDashSpeed: number = 4;
    
    cooldownCount = 0;
    
    weapons: Weapon[];
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle) {
        super(bounds, spritesheet, cutBounds);
        
        this.dashDownSpr = {x: 80 * 70, y: 0, w: 16 * 70, h: 16 * 70};
        this.dashLeftSpr = {x: 80 * 70, y: 16 * 70, w: 16 * 70, h: 16 * 70};
        this.dashRightSpr = {x: 80 * 70, y: 32 * 70, w: 16 * 70, h: 16 * 70};
        this.dashUpSpr = {x: 80 * 70, y: 48 * 70, w: 16 * 70, h: 16 * 70};
        
        for (let i = 0; i < this.maxAnimIndex; i++) {
            this.downSprs[i] = {x: i * 16 * 70, y: 0, w: 16 * 70, h: 16 * 70};
            this.leftSprs[i] = {x: i * 16 * 70, y: 16 * 70, w: 16 * 70, h: 16 * 70};
            this.rightSprs[i] = {x: i * 16 * 70, y: 32 * 70, w: 16 * 70, h: 16 * 70};
            this.upSprs[i] = {x: i * 16 * 70, y: 48 * 70, w: 16 * 70, h: 16 * 70};
        }
        
        this.weapons = new Array(3);
        
        this.weapons[2] = new Weapon({x: 0, y: 0, w: 16 * 3, h: 16 * 3}, weapons, {x: 16 * 3, y: 0, w: 16 * 3, h: 16 * 3}, 2, 30, 1, 20, 280, 10, "Pistol");
    }
    
    // Overrides super method
    tick(): void {
        if (!collideWithAny({x: this.bounds.x + this.dx, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h}))
            this.bounds.x += this.dx * this.dashSpeed * 2;
        
        if (!collideWithAny({x: this.bounds.x, y: this.bounds.y + this.dy, w: this.bounds.w, h: this.bounds.h}))
            this.bounds.y += this.dy * this.dashSpeed * 2;
        
        if (this.dashSpeed > 0)
            this.dashSpeed -= 0.1;
        
        if (this.dashCount < this.maxDashCount)
           this.dashCount++;
        
        if (isKeyPressed && gameState === "game") {
            this.animCount++;
            
            if (this.animCount >= this.maxAnimCount) {
                this.animCount = 0;
                
                this.animIndex++;
                
                if (this.animIndex >= this.maxAnimIndex) {
                    this.animIndex = 0;
                }
            }
            
            if (keyPressed.keyCode == spaceCode && gameState === "game" && this.dashCount >= this.maxDashCount) { // dash
                this.dashCount = 0;
                this.dashSpeed = this.constDashSpeed;
                
                /*let mx: number = (mousePos.x) + camera.x;
                let my: number = (mousePos.y) + camera.y;
                
                let px: number = this.bounds.w / 2;
                let py: number = this.bounds.h / 2;
                
                let angle: number = Math.atan2(my - (this.bounds.y + py), mx - (this.bounds.x + px));
                
                this.dx = Math.cos(angle);
                this.dy = Math.sin(angle);*/
                
                //return;
                
                if (this.dir == "up") {// && !collideWithAny({x: this.bounds.x, y: this.bounds.y - this.speed * 20, w: this.bounds.w, h: this.bounds.h})) {
                    //this.bounds.y -= this.speed * 20;
                    this.dx = 0;
                    this.dy = -1;
                    
                    this.cutBounds = this.dashUpSpr;
                }
                if (this.dir == "down") {// && !collideWithAny({x: this.bounds.x, y: this.bounds.y + this.speed * 20, w: this.bounds.w, h: this.bounds.h})) {
                    //this.bounds.y += this.speed * 20;
                    this.dx = 0;
                    this.dy = 1;
                    
                    this.cutBounds = this.dashDownSpr;
                }
                if (this.dir == "left") {// && !collideWithAny({x: this.bounds.x - this.speed * 20, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) {
                    //this.bounds.x -= this.speed * 20;
                    this.dx = -1;
                    this.dy = 0;
                    
                    this.cutBounds = this.dashLeftSpr;
                }
                if (this.dir == "right") {// && !collideWithAny({x: this.bounds.x + this.speed * 20, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) {
                    //this.bounds.x += this.speed * 20;
                    this.dx = 1;
                    this.dy = 0;
                    
                    this.cutBounds = this.dashRightSpr;
                }
            }
            
            if (keyPressed.keyCode == oneCode && this.weapons[2] !== undefined)
                weaponSelected = 2;
            
            else if (keyPressed.keyCode == twoCode && this.weapons[1] !== undefined)
                weaponSelected = 1;
            
            else if (keyPressed.keyCode == threeCode && this.weapons[0] !== undefined)
                weaponSelected = 0;
            
            // ------------------------------------
            
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
            
            if (keyPressed.keyCode == rCode)
                this.weapons[weaponSelected].recharge();
            
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
        
        this.cooldownCount++;
        
        if (isMousePressed && gameState === "game" && this.cooldownCount >= this.weapons[weaponSelected].cooldown) {
            if (this.weapons[weaponSelected].ammo <= 0) return;
            
            this.cooldownCount = 0;
            
            let mx: number = (mousePos.x) + camera.x;
            let my: number = (mousePos.y) + camera.y;
            
            let px: number = this.bounds.w / 2;
            let py: number = this.bounds.h / 2;
            
            let angle: number = Math.atan2(my - (this.bounds.y + py), mx - (this.bounds.x + px));
            
            let dx: number = Math.cos(angle);
            let dy: number = Math.sin(angle);
            
            this.weapons[weaponSelected].ammo--;
            
            if (this.weapons[weaponSelected].ammo === 0)
                this.weapons[weaponSelected].recharge();
            
            entities.push(new Bullet({x: this.bounds.x + px, y: this.bounds.y + py, w: 4 * 3, h: 4 * 3}, weapons, {x: 0, y: 16 * 3, w: 4 * 3, h: 4 * 3}, dx, dy, this.weapons[weaponSelected].bulletDamage, this.weapons[weaponSelected].bulletSpeed, 150));
        }
        
        camera.x = clamp((this.bounds.x - (g.canvas.width / 2)) + (camFollowMouse ? ((mousePos.x / 4) - (g.canvas.width / 6)) : 0), 0, map.width * 16 - g.canvas.width);
        camera.y = clamp((this.bounds.y - (g.canvas.height / 2)) + (camFollowMouse ? (mousePos.y / 4) : 0), 0, map.height * 16 - g.canvas.height);
        
        if (this.immunityCount < this.immunityTotal)
            this.immunityCount++;
        
        this.regenCount++;
        
        if (this.regenCount >= this.maxRegenCount) {
            this.regenCount = 0;
            
            if (this.hp < 10)
                this.hp++;
        }
        
        if (this.hp <= 0) {
            gameState = "gameover";
        }
    }
}
