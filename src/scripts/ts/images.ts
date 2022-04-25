const playerSpritesheet: HTMLImageElement = loadImage("player-spritesheet");
const map: HTMLImageElement = loadImage("map");
const collision: HTMLImageElement = loadImage("collision");

function loadImage(id: string): HTMLImageElement {
    return document.getElementById(id) as HTMLImageElement;
}
