"use strict";
const collisions = [{ x: 1484, y: 1844, w: 84, h: 196 },
    { x: 1596, y: 1796, w: 66, h: 256 },
    { x: 1660, y: 1988, w: 284, h: 64 },
    { x: 1940, y: 1668, w: 80, h: 320 },
    { x: 1100, y: 1580, w: 840, h: 88 },
    { x: 1728, y: 1668, w: 138, h: 88 },
    { x: 1060, y: 1852, w: 88, h: 628 },
    { x: 1060, y: 1668, w: 88, h: 72 },
    { x: 1940, y: 1988, w: 80, h: 192 },
    { x: 1916, y: 2148, w: 24, h: 32 },
    { x: 1916, y: 2292, w: 308, h: 192 },
    { x: 1148, y: 2372, w: 832, h: 152 },
    { x: 1060, y: 1040, w: 80, h: 632 },
    { x: 688, y: 1124, w: 372, h: 40 },
    { x: 688, y: 1164, w: 44, h: 372 },
    { x: 0, y: 1124, w: 416, h: 1060 },
    { x: 128, y: 1060, w: 100, h: 64 },
    { x: 128, y: 764, w: 40, h: 296 },
    { x: 168, y: 764, w: 84, h: 88 },
    { x: 252, y: 764, w: 124, h: 40 },
    { x: 376, y: 764, w: 40, h: 72 },
    { x: 416, y: 764, w: 648, h: 40 },
    { x: 1064, y: 764, w: 76, h: 140 },
    { x: 504, y: 884, w: 340, h: 116 },
    { x: 328, y: 2464, w: 732, h: 36 },
    { x: 800, y: 2424, w: 88, h: 40 },
    { x: 2184, y: 1937, w: 40, h: 556 },
    { x: 2020, y: 1744, w: 108, h: 76 },
    { x: 2020, y: 1708, w: 616, h: 56 },
    { x: 2478, y: 1765, w: 404, h: 148 },
    { x: 2840, y: 1912, w: 40, h: 532 },
    { x: 2772, y: 2052, w: 68, h: 40 },
    { x: 2440, y: 2444, w: 440, h: 40 },
    { x: 2224, y: 2484, w: 216, h: 40 },
    { x: 1108, y: 764, w: 476, h: 48 },
    { x: 1140, y: 1092, w: 840, h: 148 },
    { x: 1536, y: 416, w: 48, h: 504 },
    { x: 1584, y: 888, w: 108, h: 32 },
    { x: 1584, y: 417, w: 396, h: 60 },
    { x: 1892, y: 476, w: 88, h: 60 },
    { x: 1952, y: 536, w: 28, h: 368 },
    { x: 1952, y: 1041, w: 28, h: 52 },
    { x: 288, y: 2880, w: 471, h: 436 },
    { x: 132, y: 2144, w: 44, h: 356 },
    { x: 0, y: 2464, w: 216, h: 96 },
    { x: 0, y: 2560, w: 52, h: 1072 },
    { x: 0, y: 3576, w: 1040, h: 56 },
    { x: 988, y: 2500, w: 52, h: 1132 },
    { x: 836, y: 2500, w: 152, h: 416 },
    { x: 328, y: 2500, w: 556, h: 160 }];
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
    for (let e of entities) {
        if (e instanceof Barrier)
            if (collide(rect, e.bounds))
                return true;
    }
    return false;
}
function getDoubleBounds(bounds) {
    return { x: bounds.x - bounds.w, y: bounds.y - bounds.h, w: bounds.w * 4, h: bounds.h * 2 };
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
