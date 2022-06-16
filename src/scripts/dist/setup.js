"use strict";
var gameState = "menu";
var keyPressed;
var isKeyPressed = false;
var mousePos = { x: 0, y: 0 };
var isMousePressed = false;
var waveNumber = 100000;
//const entitySize: number = 40;
//const mapScale: number = 4;
const pixelSize = 60;
const upArrowCode = 38;
const rightArrowCode = 39;
const downArrowCode = 40;
const leftArrowCode = 37;
const wCode = 87;
const dCode = 68;
const sCode = 83;
const aCode = 65;
const rCode = 82;
const spaceCode = 32;
const enterCode = 13;
const oneCode = 49;
const twoCode = 50;
const threeCode = 51;
var weaponSelected = 2;
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
function normalize(p) {
    let mag /* magnitude */ = Math.sqrt(p.x * p.x + p.y * p.y);
    p.x = p.x / mag;
    p.y = p.y / mag;
    return p;
}
function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}
function ruleOf3(a, b, c) {
    return (b * c) / a;
}
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.toLowerCase().substring(1);
}
//setCollisions(imageToImageData(collision));
// multiply the map by 4x !!!
