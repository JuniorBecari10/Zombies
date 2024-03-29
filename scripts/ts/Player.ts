type Direction = "up" | "down" | "left" | "right";

var camFollowMouse: boolean = false;

class Player extends Entity {
    speed: number = 4; // 3
    constSpeed: number = this.speed;
    
    dir: Direction = "down";
    
    hp: number = 10;
    totalHp: number = 10;
    
    defense: number = 0;
    
    coins: number = 0;
    
    deathCause: string = "";
    
    immunityCount: number = 0;
    immunityTotal: number = 20;
    
    regenCount: number = 0;
    maxRegenCount: number = 200;
    constMaxRegenCount: number = 200;
    
    upSprs: Rectangle[] = [];
    downSprs: Rectangle[] = [];
    leftSprs: Rectangle[] = [];
    rightSprs: Rectangle[] = [];
    
    dashUpSpr: Rectangle;
    dashDownSpr: Rectangle;
    dashLeftSpr: Rectangle;
    dashRightSpr: Rectangle;
    
    recharging: boolean = false;
    canRecharge: boolean = true;
    
    rechargeCount: number = 0;
    rechargeMax: number = 60;
    
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
    perks: Perk[];
    
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
        this.perks = new Array(3);
        
        // set pistol in 'first' slot
        this.weapons[2] = getWeapon("pistol")!;
        //this.weapons[1] = getWeapon("rocket")!;
        //this.perks[0] = getPerk("extra")!;
    }
    
    freeSlot(): number {
        if (this.weapons[2] === undefined) return 2;
        else if (this.weapons[1] === undefined) return 1;
        else if (this.weapons[0] === undefined && containsPerk("extra")) return 0;
        
        return weaponSelected; // yes - it will override
    }
    
    freePerkSlot(): number {
        if (this.perks[0] === undefined) return 0;
        else if (this.perks[1] === undefined) return 1;
        else if (this.perks[2] === undefined) return 2;
        
        return -1;
    }
    
    hasWeapon(name: string): boolean {
        for (let w of this.weapons) {
            if (w === undefined) continue;
            
            if (w.name === capitalize(name)) return true;
        }
        
        return false;
    }
    
    hasPerk(name: string): boolean {
        for (let p of this.perks) {
            if (p === undefined) continue;
            
            if (p.name === capitalize(name)) return true;
        }
        
        return false;
    }
    
    // Overrides super method
    tick(): void {
        if (!collideWithAny({x: this.bounds.x + this.dx * 10, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h}))
            this.bounds.x += this.dx * this.dashSpeed * 2;
        
        if (!collideWithAny({x: this.bounds.x, y: this.bounds.y + this.dy * 10, w: this.bounds.w, h: this.bounds.h}))
            this.bounds.y += this.dy * this.dashSpeed * 2;
        
        if (this.dashSpeed > 0)
            this.dashSpeed -= 0.1;
        
        if (this.dashCount < this.maxDashCount)
           this.dashCount++;
        
        if (anyKeyPressed() && gameState === "game") {
            this.animCount++;
            
            if (this.animCount >= this.maxAnimCount) {
                this.animCount = 0;
                
                this.animIndex++;
                
                if (this.animIndex >= this.maxAnimIndex) {
                    this.animIndex = 0;
                }
            }
            
            if (isKeyPressed(spaceCode) && gameState === "game" && this.dashCount >= this.maxDashCount) { // dash
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
            
            if (isKeyPressed(oneCode) && this.weapons[2] !== undefined)
                weaponSelected = 2;
            
            else if (isKeyPressed(twoCode) && this.weapons[1] !== undefined)
                weaponSelected = 1;
            
            else if (isKeyPressed(threeCode) && this.weapons[0] !== undefined)
                weaponSelected = 0;
            
            // ------------------------------------
            
            if (isKeyPressed(upArrowCode) || isKeyPressed(wCode))
                this.up = true;
            else if (!isKeyPressed(upArrowCode) || !isKeyPressed(wCode))
                this.up = false;
            
            if (isKeyPressed(downArrowCode) || isKeyPressed(sCode))
                this.down = true;
            else if (!isKeyPressed(downArrowCode) || !isKeyPressed(sCode))
                this.down = false;
            
            if (isKeyPressed(leftArrowCode) || isKeyPressed(aCode))
                this.left = true;
            else if (!isKeyPressed(leftArrowCode) || !isKeyPressed(aCode))
                this.left = false;
            
            if (isKeyPressed(rightArrowCode) || isKeyPressed(dCode))
                this.right = true;
            else if (!isKeyPressed(rightArrowCode) || !isKeyPressed(dCode))
                this.right = false;
            /*
            if (keyPressed.keyCode == rCode) {
                this.weapons[weaponSelected].recharge();
            }
            */
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
        
        if (this.weapons[weaponSelected].ammo === this.weapons[weaponSelected].ammoLoaded)
            this.recharging = false;
        
        this.cooldownCount++;
        
        if ((this.weapons[weaponSelected].ammo === 0 || isKeyPressed(rCode)) && this.weapons[weaponSelected].ammo < this.weapons[weaponSelected].ammoLoaded) {
            if (!this.recharging) {
                this.recharging = true;
            }
            /*else {
                this.recharging = true;
            }*/
        }
        
        if (this.recharging) {
            this.rechargeCount++;
            
            if (this.rechargeCount >= this.rechargeMax) {
                this.rechargeCount = 0;
                this.recharging = false;
                
                this.weapons[weaponSelected].recharge();
            }
        }
        
        if (isMousePressed && gameState === "game" && this.cooldownCount >= this.weapons[weaponSelected].cooldown) {
            if (this.weapons[weaponSelected].ammo > 0) {
                this.cooldownCount = 0;
                
                let mx: number = (mousePos.x) + camera.x;
                let my: number = (mousePos.y) + camera.y;
                
                let px: number = this.bounds.w / 2;
                let py: number = this.bounds.h / 2;
                
                let angle: number = Math.atan2(my - (this.bounds.y + py), mx - (this.bounds.x + px));
                
                let dx: number = Math.cos(angle);
                let dy: number = Math.sin(angle);
                
                this.weapons[weaponSelected].ammo--;
                
                entities.push(new Bullet({x: this.bounds.x + px, y: this.bounds.y + py, w: this.weapons[weaponSelected].bulletBounds.w, h: this.weapons[weaponSelected].bulletBounds.h}, weapons, this.weapons[weaponSelected].bulletSprBounds, dx, dy, this.weapons[weaponSelected].bulletDamage, this.weapons[weaponSelected].bulletSpeed, 150, this.weapons[weaponSelected].explosive));
            }
        }
        
        camera.x = clamp((this.bounds.x - (g.canvas.width / 2)) + (camFollowMouse ? ((mousePos.x / 8) /*4*/ - (g.canvas.width / 6)) : 0), 0, map.width * 16 - g.canvas.width);
        camera.y = clamp((this.bounds.y - (g.canvas.height / 2)) + (camFollowMouse ? (mousePos.y / 8) : 0), 0, map.height * 16 - g.canvas.height);
        
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
        
        this.speed = this.constSpeed;
        this.weapons[weaponSelected].cooldown = this.weapons[weaponSelected].constCooldown;
        //this.dashSpeed = this.constDashSpeed;
        
        for (let p of this.perks) {
            if (p !== undefined)
                p.tick();
        }
    }
}
