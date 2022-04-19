function initLoop(): void {
    window.requestAnimationFrame(loop);
}

function tick(): void {
    
}

function render(): void {
    
}

function loop(): void {
    tick();
    render();
    
    window.requestAnimationFrame(loop);
}
