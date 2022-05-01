"use strict";
const collisions = [];
function collide(rect1, rect2) {
    return rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y;
}
function collideWithAny(rect) {
    for (let r of collisions) {
        if (collide(rect, r))
            return true;
    }
    return false;
}
/*function setCollisions(img: ImageData) {
    for (let x = 0; x < img.width; x += 4) {
        for (let y = 0; y < img.height; y += 4) {
            if (img.data[x + (y * img.width)] === 0xFF0000) {
                collisions.push({x: x, y: y, w: 4, h: 4});
            }
        }
    }
}*/