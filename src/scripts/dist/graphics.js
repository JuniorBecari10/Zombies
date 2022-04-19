"use strict";
var Graphics = /** @class */ (function () {
    function Graphics(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
    }
    return Graphics;
}());
