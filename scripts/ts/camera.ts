type Camera = {
    x: number;
    y: number;
};

function clamp(actual: number, min: number, max: number): number {
    if (actual < min) actual = min;
    if (actual > max) actual = max;
    
    return actual;
}

var camera: Camera = {x: 0, y: 0};
