"use strict";
const player = new Player({ x: 0, y: 0, w: 48, h: 48 }, playerSpritesheet, { x: 0, y: 0, w: 16, h: 16 });
var entities = [];
var gameState = "menu";
var keyPressed;
var isKeyPressed = false;
var mousePos = { x: 0, y: 0 };
var isMousePressed = false;
