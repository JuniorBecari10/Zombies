const logo: HTMLImageElement = loadImage("logo");
const playerSpritesheet: HTMLImageElement = loadImage("player-spritesheet");
const basicZombieSpr: HTMLImageElement = loadImage("basic-zombie");
const basicSkeletonSpr: HTMLImageElement = loadImage("basic-skeleton");
const armoredZombieSpr: HTMLImageElement = loadImage("armored-zombie")
const map: HTMLImageElement = loadImage("map");
const collision: HTMLImageElement = loadImage("collision");
const weapons: HTMLImageElement = loadImage("weapons");
const barrier: HTMLImageElement = loadImage("barrier");
const hBarrier: HTMLImageElement = loadImage("h-barrier");

function loadImage(id: string): HTMLImageElement {
    return document.getElementById(id) as HTMLImageElement;
}

function imageToImageData(image: HTMLImageElement): ImageData {
     var canvas: HTMLCanvasElement = document.createElement("canvas");
     canvas.width = image.width;
     canvas.height = image.height;
     var ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
     ctx?.drawImage(image, 0, 0);
     return ctx?.getImageData(0, 0, canvas.width, canvas.height) as ImageData;
}
