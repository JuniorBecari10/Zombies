type GameState = "menu" | "game";

var gameState: GameState = "menu";

var keyPressed: KeyboardEvent;
var isKeyPressed: boolean = false;

var mousePos: Point = {x: 0, y: 0};
var isMousePressed: boolean = false;

const upArrowCode: number = 38;
const rightArrowCode: number = 39;
const downArrowCode: number = 40;
const leftArrowCode: number = 37;

const spaceCode: number = 32;
