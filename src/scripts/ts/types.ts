type Point = {
    x: number,
    y: number;
}

type Rectangle = {
    x: number,
    y: number,
    w: number,
    h: number;
}

function normalize(p: Point) {
    let mag: number = Math.sqrt(p.x * p.x + p.y * p.y);
    
    p.x = p.x / mag;
    p.y = p.y / mag;
    
    return p;
}
