"use strict";
const playerSpritesheet = loadImage("player-spritesheet");
const map = loadImage("map");
const collision = loadImage("collision");
function loadImage(id) {
    return document.getElementById(id);
}
function imageToImageData(image) {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext("2d");
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(image, 0, 0);
    return ctx === null || ctx === void 0 ? void 0 : ctx.getImageData(0, 0, canvas.width, canvas.height);
}
