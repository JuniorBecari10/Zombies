type GameState = "menu" | "game" | "pause";

var gameState: GameState = "game";

var keyPressed: KeyboardEvent;
var isKeyPressed: boolean = false;

var mousePos: Point = {x: 0, y: 0};
var isMousePressed: boolean = false;

//const entitySize: number = 40;
//const mapScale: number = 4;

const upArrowCode: number = 38;
const rightArrowCode: number = 39;
const downArrowCode: number = 40;
const leftArrowCode: number = 37;

const wCode: number = 87;
const dCode: number = 68;
const sCode: number = 83;
const aCode: number = 65;

const spaceCode: number = 32;
