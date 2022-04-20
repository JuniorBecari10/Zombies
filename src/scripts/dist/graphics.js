"use strict";
class Graphics {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
    }
}
const g = new Graphics("canvas");
