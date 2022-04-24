"use strict";
class Player extends Entity {
    constructor(bounds, spritesheet, cutBounds) {
        super(bounds, spritesheet, cutBounds);
        this.speed = 3;
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
        this.dashDownSpr = { x: 80 * 40, y: 0, w: 16 * 40, h: 16 * 40 };
        this.dashLeftSpr = { x: 80 * 40, y: 16 * 40, w: 16 * 40, h: 16 * 40 };
        this.dashRightSpr = { x: 80 * 40, y: 32 * 40, w: 16 * 40, h: 16 * 40 };
        this.dashUpSpr = { x: 80 * 40, y: 48 * 40, w: 16 * 40, h: 16 * 40 };
        for (let i = 0; i < this.maxAnimIndex; i++) {
            this.downSprs[i] = { x: i * 16 * 40, y: 0, w: 16 * 40, h: 16 * 40 };
            this.leftSprs[i] = { x: i * 16 * 40, y: 16 * 40, w: 16 * 40, h: 16 * 40 };
            this.rightSprs[i] = { x: i * 16 * 40, y: 32 * 40, w: 16 * 40, h: 16 * 40 };
            this.upSprs[i] = { x: i * 16 * 40, y: 48 * 40, w: 16 * 40, h: 16 * 40 };
        }
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
            if ((keyPressed.keyCode == upArrowCode || keyPressed.keyCode == wCode) && !collideWithAny({ x: this.bounds.x, y: this.bounds.y - this.speed, w: this.bounds.w, h: this.bounds.h })) {
                this.dir = "up";
                this.bounds.y -= this.speed;
                this.cutBounds = this.upSprs[this.animIndex];
            }
            else if ((keyPressed.keyCode == downArrowCode || keyPressed.keyCode == sCode) && !collideWithAny({ x: this.bounds.x, y: this.bounds.y + this.speed, w: this.bounds.w, h: this.bounds.h })) {
                this.dir = "down";
                this.bounds.y += this.speed;
                this.cutBounds = this.downSprs[this.animIndex];
            }
            if ((keyPressed.keyCode == leftArrowCode || keyPressed.keyCode == aCode) && !collideWithAny({ x: this.bounds.x - this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h })) {
                this.dir = "left";
                this.bounds.x -= this.speed;
                this.cutBounds = this.leftSprs[this.animIndex];
            }
            else if ((keyPressed.keyCode == rightArrowCode || keyPressed.keyCode == dCode) && !collideWithAny({ x: this.bounds.x + this.speed, y: this.bounds.y, w: this.bounds.w, h: this.bounds.h })) {
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
