const playerSpritesheet: HTMLImageElement = loadImage("player-spritesheet");

function loadImage(id: string): HTMLImageElement {
    return document.getElementById(id) as HTMLImageElement;
}
