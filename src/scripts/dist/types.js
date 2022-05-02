"use strict";
function normalize(p) {
    let mag = Math.sqrt(p.x * p.x + p.y * p.y);
    p.x = p.x / mag;
    p.y = p.y / mag;
    return p;
}
