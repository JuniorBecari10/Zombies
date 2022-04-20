document.addEventListener("keydown", function (event: KeyboardEvent) {
    keyPressed = event;
    isKeyPressed = true;
});

document.addEventListener("keyup", function (event: KeyboardEvent) {
    keyPressed = event;
    isKeyPressed = false;
});

document.addEventListener("mousemove", function (event: MouseEvent) {
    let x: number = event.clientX;
    let y : number = event.clientY;
    
    mousePos = {x: x, y: y};
});

document.addEventListener("mousedown", function (event: MouseEvent) {
    isMousePressed = true;
});

document.addEventListener("mouseup", function (event: MouseEvent) {
    isMousePressed = false;
});

function removeEquals<T>(arr: T[]) {
    let sett: Set<T> = new Set(arr);
    
    return Array.from(sett.values());
}

// ------

function defineSize() {
    g.canvas.width = window.innerWidth;
    g.canvas.height = window.innerHeight;
}

// ----------------------------------------

function init(): void {
    entities.push(player);
    
    g.canvas.style.imageRendering = "pixelated";
    window.requestAnimationFrame(loop);
}

function tick(): void {
    for (let o of entities) {
        o.tick();
    }
}

function render(): void {
    // draw black bg
    g.ctx!.fillStyle = "black";
    g.ctx?.fillRect(0, 0, g.canvas.width, g.canvas.height);
    
    for (let o of entities) {
        o.render(g);
    }
}

function loop(): void {
    defineSize();
    
    tick();
    render();
    
    window.requestAnimationFrame(loop);
}
