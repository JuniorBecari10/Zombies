type GameState = "menu" | "game";

const player: Player = new Player({x: 0, y: 0, w: 48, h: 48}, playerSpritesheet, {x: 0, y: 0, w: 16, h: 16});

var entities: Entity[] = [];

var gameState: GameState = "menu";

var keyPressed: KeyboardEvent;
var isKeyPressed: boolean = false;

var mousePos: Point = {x: 0, y: 0};
var isMousePressed: boolean = false;
