"use strict";
const logo = loadImage("logo");
const playerSpritesheet = loadImage("player-spritesheet");
const basicZombieSpr = loadImage("basic-zombie");
const basicSkeletonSpr = loadImage("basic-skeleton");
const armoredZombieSpr = loadImage("armored-zombie");
const armoredSkeletonSpr = loadImage("armored-skeleton");
const map = loadImage("map");
const collision = loadImage("collision");
const weapons = loadImage("weapons");
const barrier = loadImage("barrier");
const hBarrier = loadImage("h-barrier");
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
