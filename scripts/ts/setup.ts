type GameState = "menu" | "game" | "pause" | "gameover" | "win";
type Immunity = "none" | "fire" | "ice" | "explosive";

var gameState: GameState = "menu";

const logoHeight: number = 95; // 76

var logoRects: Rectangle[] = [];
const logoFrames: number = 5;

var logoIndex: number = 0;

var logoIndexCount: number = 0;
const logoIndexMaxCount: number = 8;

var keyPressed: Set<number> = new Set();

var mousePos: Point = {x: 0, y: 0};
var isMousePressed: boolean = false;

var waveNumber: number = 100000;

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

const rCode = 82;

const spaceCode: number = 32;
const enterCode: number = 13;

const oneCode = 49;
const twoCode = 50;
const threeCode = 51;

var weaponSelected: number = 2;

function toDegrees(radians: number) {
    return radians * (180 / Math.PI);
}

function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

function normalize(p: Point): Point {
    let mag /* magnitude */: number = Math.sqrt(p.x * p.x + p.y * p.y);
    
    p.x = p.x / mag;
    p.y = p.y / mag;
    
    return p;
}

function random(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
}

function ruleOf3(a: number, b: number, c: number): number {
    return (b * c) / a;
}

function capitalize(s: string): string {
    //return s.charAt(0).toUpperCase() + s.toLowerCase().substring(1);
    
    const words: string[] = s.split(" ");
    
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    
    return words.join(" ");
}

function isKeyPressed(keyCode: number): boolean {
    return keyPressed.has(keyCode);
}

function anyKeyPressed(): boolean {
    return keyPressed.size > 0;
}

//setCollisions(imageToImageData(collision));

// multiply the map by 4x !!!
