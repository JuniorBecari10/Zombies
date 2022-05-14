const collisions: Rectangle[] = [{x: 1484, y: 1844, w: 84, h: 196},
                                 {x: 1596, y: 1796, w: 66, h: 256},
                                 {x: 1660, y: 1988, w: 284, h: 64},
                                 {x: 1940, y: 1668, w: 80, h: 320},
                                 {x: 1100, y: 1580, w: 840, h: 88},
                                 {x: 1728, y: 1668, w: 138, h: 88},
                                 {x: 1060, y: 1852, w: 88, h: 628},
                                 {x: 1060, y: 1668, w: 88, h: 72},
                                 {x: 1940, y: 1988, w: 80, h: 192}];

function collide(rect1: Rectangle, rect2: Rectangle): boolean {
    return rect1.x < rect2.x + rect2.w &&
       rect1.x + rect1.w > rect2.x &&
       rect1.y < rect2.y + rect2.h &&
       rect1.y + rect1.h > rect2.y
}

function collideWithAny(rect: Rectangle) {
    for (let r of collisions) {
        if (collide(rect, r)) return true;
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
