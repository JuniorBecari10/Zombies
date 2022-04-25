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

function setCollisions() {
    
}
