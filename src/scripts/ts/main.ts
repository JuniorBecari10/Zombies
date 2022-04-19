function initLoop(): void {
    window.requestAnimationFrame(loop);
}

function tick(): void {
    
}

function render(): void {
    // draw black bg
    g.ctx!.fillStyle = "black";
    g.ctx?.fillRect(0, 0, g.canvas.width, g.canvas.height);
}

function loop(): void {
    tick();
    render();
    
    window.requestAnimationFrame(loop);
}
