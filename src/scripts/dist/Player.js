"use strict";
class Player extends Entity {
    constructor(bounds, spritesheet, cutBounds) {
        super(bounds, spritesheet, cutBounds);
        this.speed = 4; // 3
        this.dir = "down";
        this.upSprs = [];
        this.downSprs = [];
        this.leftSprs = [];
        this.rightSprs = [];
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
        this.cooldownCount = 0;
        this.dashDownSpr = { x: 70 * 70, y: 0, w: 16 * 70, h: 16 * 70 };
        this.dashLeftSpr = { x: 70 * 70, y: 16 * 70, w: 16 * 70, h: 16 * 70 };
        this.dashRightSpr = { x: 70 * 70, y: 32 * 70, w: 16 * 70, h: 16 * 70 };
        this.dashUpSpr = { x: 70 * 70, y: 48 * 70, w: 16 * 70, h: 16 * 70 };
        for (let i = 0; i < this.maxAnimIndex; i++) {
            this.downSprs[i] = { x: i * 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 };
            this.leftSprs[i] = { x: i * 16 * 70, y: 16 * 70, w: 16 * 70, h: 16 * 70 };
            this.rightSprs[i] = { x: i * 16 * 70, y: 32 * 70, w: 16 * 70, h: 16 * 70 };
            this.upSprs[i] = { x: i * 16 * 70, y: 48 * 70, w: 16 * 70, h: 16 * 70 };
        }
        this.weapons = new Array(3);
        this.weapons[1] = new Weapon({ x: 0, y: 0, w: 16 * 3, h: 16 * 3 }, weapons, { x: 16 * 3, y: 0, w: 16 * 3, h: 16 * 3 }, 2, 10, 1, 20 /*200*/, 280, 10, 0, "Pistol");
    }
    // Overrides super method
    tick() {
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
                if (this.dir == "up") { // && !collideWithAny({x: this.bounds.x, y: this.bounds.y - this.speed * 20, w: this.bounds.w, h: this.bounds.h})) {
                    this.bounds.y -= this.speed * 20;
                    this.cutBounds = this.dashUpSpr;
                }
                if (this.dir == "down") { // && !collideWithAny({x: this.bounds.x, y: this.bounds.y + this.speed * 20, w: this.bounds.w, h: this.bounds.h})) {
                    this.bounds.y += this.speed * 20;
                    this.cutBounds = this.dashDownSpr;
                }
                if (this.dir == "left") { // && !collideWithAny({x: this.bounds.x - this.speed * 20, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) {
                    this.bounds.x -= this.speed * 20;
                    this.cutBounds = this.dashLeftSpr;
                }
                if (this.dir == "right") { // && !collideWithAny({x: this.bounds.x + this.speed * 20, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h})) {
                    this.bounds.x += this.speed * 20;
                    this.cutBounds = this.dashRightSpr;
                }
            }
            if (keyPressed.keyCode == oneCode)
                weaponSelected = 2;
            else if (keyPressed.keyCode == twoCode)
                weaponSelected = 1;
            else if (keyPressed.keyCode == threeCode)
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
        this.cooldownCount++;
        if (isMousePressed && this.cooldownCount >= this.weapons[weaponSelected].cooldown) {
            this.cooldownCount = 0;
            let mx = (mousePos.x) + camera.x;
            let my = (mousePos.y) + camera.y;
            let px = this.bounds.w / 2;
            let py = this.bounds.h / 2;
            let angle = Math.atan2(my - (this.bounds.y + py), mx - (this.bounds.x + px));
            console.log(toDegrees(angle));
            let dx = Math.cos(angle);
            let dy = Math.sin(angle);
            entities.push(new Bullet({ x: this.bounds.x + px, y: this.bounds.y + py, w: 4 * 3, h: 4 * 3 }, weapons, { x: 0, y: 16 * 3, w: 4 * 3, h: 4 * 3 }, dx, dy, this.weapons[weaponSelected].bulletDamage, this.weapons[weaponSelected].bulletSpeed, 150));
        }
        camera.x = clamp(this.bounds.x - (g.canvas.width / 2), 0, map.width * 16 - g.canvas.width);
        camera.y = clamp(this.bounds.y - (g.canvas.height / 2), 0, map.height * 16 - g.canvas.height);
    }
}
