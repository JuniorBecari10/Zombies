"use strict";
var camFollowMouse = false;
class Player extends Entity {
    constructor(bounds, spritesheet, cutBounds) {
        super(bounds, spritesheet, cutBounds);
        this.speed = 4; // 3
        this.constSpeed = this.speed;
        this.dir = "down";
        this.hp = 10;
        this.totalHp = 10;
        this.defense = 0;
        this.coins = 10000;
        this.deathCause = "";
        this.immunityCount = 0;
        this.immunityTotal = 20;
        this.regenCount = 0;
        this.maxRegenCount = 200;
        this.constMaxRegenCount = 200;
        this.upSprs = [];
        this.downSprs = [];
        this.leftSprs = [];
        this.rightSprs = [];
        this.recharging = false;
        this.rechargeCount = 0;
        this.rechargeMax = 60;
        this.animCount = 0;
        this.maxAnimCount = 5;
        this.animIndex = 0;
        this.maxAnimIndex = 5;
        this.dashCount = 0;
        this.maxDashCount = 60;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.dx = 0;
        this.dy = 0;
        this.dashSpeed = 4;
        this.constDashSpeed = 4;
        this.cooldownCount = 0;
        this.dashDownSpr = { x: 80 * 70, y: 0, w: 16 * 70, h: 16 * 70 };
        this.dashLeftSpr = { x: 80 * 70, y: 16 * 70, w: 16 * 70, h: 16 * 70 };
        this.dashRightSpr = { x: 80 * 70, y: 32 * 70, w: 16 * 70, h: 16 * 70 };
        this.dashUpSpr = { x: 80 * 70, y: 48 * 70, w: 16 * 70, h: 16 * 70 };
        for (let i = 0; i < this.maxAnimIndex; i++) {
            this.downSprs[i] = { x: i * 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 };
            this.leftSprs[i] = { x: i * 16 * 70, y: 16 * 70, w: 16 * 70, h: 16 * 70 };
            this.rightSprs[i] = { x: i * 16 * 70, y: 32 * 70, w: 16 * 70, h: 16 * 70 };
            this.upSprs[i] = { x: i * 16 * 70, y: 48 * 70, w: 16 * 70, h: 16 * 70 };
        }
        this.weapons = new Array(3);
        this.perks = new Array(3);
        // set pistol in 'first' slot
        this.weapons[2] = getWeapon("pistol");
        //this.perks[0] = getPerk("extra")!;
    }
    freeSlot() {
        if (this.weapons[2] === undefined)
            return 2;
        else if (this.weapons[1] === undefined)
            return 1;
        else if (this.weapons[0] === undefined && containsPerk("extra"))
            return 0;
        return weaponSelected; // yes - it will override
    }
    freePerkSlot() {
        if (this.perks[0] === undefined)
            return 0;
        else if (this.perks[1] === undefined)
            return 1;
        else if (this.perks[2] === undefined)
            return 2;
        return -1;
    }
    hasWeapon(name) {
        for (let w of this.weapons) {
            if (w === undefined)
                continue;
            if (w.name === capitalize(name))
                return true;
        }
        return false;
    }
    hasPerk(name) {
        for (let p of this.perks) {
            if (p === undefined)
                continue;
            if (p.name === capitalize(name))
                return true;
        }
        return false;
    }
    // Overrides super method
    tick() {
        if (!collideWithAny({ x: this.bounds.x + this.dx * 2, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h }))
            this.bounds.x += this.dx * this.dashSpeed * 2;
        if (!collideWithAny({ x: this.bounds.x, y: this.bounds.y + this.dy * 2, w: this.bounds.w, h: this.bounds.h }))
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
                if (this.dir == "up") { // && !collideWithAny({x: this.bounds.x, y: this.bounds.y - this.speed * 20, w: this.bounds.w, h: this.bounds.h})) {
                    //this.bounds.y -= this.speed * 20;
                    this.dx = 0;
                    this.dy = -1;
                    this.cutBounds = this.dashUpSpr;
                }
                if (this.dir == "down") { // && !collideWithAny({x: this.bounds.x, y: this.bounds.y + this.speed * 20, w: this.bounds.w, h: this.bounds.h})) {
                    //this.bounds.y += this.speed * 20;
                    this.dx = 0;
                    this.dy = 1;
                    this.cutBounds = this.dashDownSpr;
                }
                if (this.dir == "left") { // && !collideWithAny({x: this.bounds.x - this.speed * 20, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) {
                    //this.bounds.x -= this.speed * 20;
                    this.dx = -1;
                    this.dy = 0;
                    this.cutBounds = this.dashLeftSpr;
                }
                if (this.dir == "right") { // && !collideWithAny({x: this.bounds.x + this.speed * 20, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) {
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
            /*
            if (keyPressed.keyCode == rCode) {
                this.weapons[weaponSelected].recharge();
            }
            */
            // --------------------------------------------------
            if (this.up && !collideWithAny({ x: this.bounds.x, y: this.bounds.y - this.speed, w: this.bounds.w, h: this.bounds.h })) {
                this.dir = "up";
                this.bounds.y -= this.speed;
                this.cutBounds = this.upSprs[this.animIndex];
            }
            else if (this.down && !collideWithAny({ x: this.bounds.x, y: this.bounds.y + this.speed, w: this.bounds.w, h: this.bounds.h })) {
                this.dir = "down";
                this.bounds.y += this.speed;
                this.cutBounds = this.downSprs[this.animIndex];
            }
            if (this.left && !collideWithAny({ x: this.bounds.x - this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h })) {
                this.dir = "left";
                this.bounds.x -= this.speed;
                this.cutBounds = this.leftSprs[this.animIndex];
            }
            else if (this.right && !collideWithAny({ x: this.bounds.x + this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h })) {
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
        //console.log(this.rechargeCount);
        if (this.weapons[weaponSelected].ammo == 0 || (keyPressed !== undefined && keyPressed.keyCode == rCode)) {
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
                let mx = (mousePos.x) + camera.x;
                let my = (mousePos.y) + camera.y;
                let px = this.bounds.w / 2;
                let py = this.bounds.h / 2;
                let angle = Math.atan2(my - (this.bounds.y + py), mx - (this.bounds.x + px));
                let dx = Math.cos(angle);
                let dy = Math.sin(angle);
                this.weapons[weaponSelected].ammo--;
                entities.push(new Bullet({ x: this.bounds.x + px, y: this.bounds.y + py, w: this.weapons[weaponSelected].bulletBounds.w, h: this.weapons[weaponSelected].bulletBounds.h }, weapons, this.weapons[weaponSelected].bulletSprBounds, dx, dy, this.weapons[weaponSelected].bulletDamage, this.weapons[weaponSelected].bulletSpeed, 150, this.weapons[weaponSelected].explosive));
            }
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
        this.speed = this.constSpeed;
        this.weapons[weaponSelected].cooldown = this.weapons[weaponSelected].constCooldown;
        //this.dashSpeed = this.constDashSpeed;
        for (let p of this.perks) {
            if (p !== undefined)
                p.tick();
        }
    }
}
