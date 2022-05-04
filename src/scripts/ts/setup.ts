type GameState = "menu" | "game" | "pause";
type Immunity = "fire" | "ice" | "explosive";

var gameState: GameState = "game";

var keyPressed: KeyboardEvent;
var isKeyPressed: boolean = false;

var mousePos: Point = {x: 0, y: 0};
var isMousePressed: boolean = false;

var waveNumber: number = 1;

//const entitySize: number = 40;
//const mapScale: number = 4;

const pixelSize = 60;

const upArrowCode: number = 38;
const rightArrowCode: number = 39;
const downArrowCode: number = 40;
const leftArrowCode: number = 37;

const wCode: number = 87;
const dCode: number = 68;
const sCode: number = 83;
const aCode: number = 65;

const spaceCode: number = 32;

const oneCode = 49;
const twoCode = 50;
const threeCode = 51;

var weaponSelected: number = 1;

function toDegrees(radians: number) {
    return radians * (180 / Math.PI);
}

//setCollisions(imageToImageData(collision));

// multiply the map by 4x !!!
