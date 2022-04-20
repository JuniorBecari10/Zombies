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
        this.dashDownSpr = { x: 80, y: 0, w: 16, h: 16 };
        this.dashleftSpr = { x: 80, y: 16, w: 16, h: 16 };
        this.dashRightSpr = { x: 80, y: 32, w: 16, h: 16 };
        this.dashUpSpr = { x: 80, y: 48, w: 16, h: 16 };
        for (let i = 0; i < this.maxAnimIndex; i++) {
            this.downSprs[i] = { x: i * 16, y: 0, w: 16, h: 16 };
            this.leftSprs[i] = { x: i * 16, y: 16, w: 16, h: 16 };
            this.rightSprs[i] = { x: i * 16, y: 32, w: 16, h: 16 };
            this.upSprs[i] = { x: i * 16, y: 48, w: 16, h: 16 };
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
    }
}
