const player: Player = new Player({x: 0, y: 0, w: 16, h: 16}, playerSpritesheet, {x: 0, y: 0, w: 16, h: 16});

var entities: Entity[] = []

function init(): void {
    entities.push(player);
    
    window.requestAnimationFrame(loop);
}

function defineSize() {
    g.canvas.width = window.innerWidth;
    g.canvas.height = window.innerHeight;
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
