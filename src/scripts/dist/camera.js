"use strict";
function clamp(actual, min, max) {
    if (actual < min)
        actual = min;
    if (actual > max)
        actual = max;
    return actual;
}
var camera = { x: 0, y: 0 };
