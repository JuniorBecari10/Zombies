type GameState = "menu" | "game";

const player: Player = new Player({x: 0, y: 0, w: 48, h: 48}, playerSpritesheet, {x: 0, y: 0, w: 16, h: 16});

var entities: Entity[] = [];

var keyPressed: KeyboardEvent;
var isKeyPressed: boolean = false;

var mousePos: Point = {x: 0, y: 0};

var gameState: GameState = "menu";

document.addEventListener("keydown", function (event) {
    keyPressed = event;
    isKeyPressed = true;
});

document.addEventListener("keyup", function (event) {
    keyPressed = event;
    isKeyPressed = false;
});

document.addEventListener("mousemove", function (event) {
    let x: number = event.clientX;
    let y : number = event.clientY;
    
    mousePos = {x: x, y: y};
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
