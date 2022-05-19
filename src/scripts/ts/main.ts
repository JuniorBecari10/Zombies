var player: Player = new Player({x: 1406, y: 1932, w: pixelSize, h: pixelSize}, playerSpritesheet, {x: 0, y: 0, w: 16 * 100, h: 16 * 100});

var zombiePositions: Point[] = [{x: 1148, y: 1940}, {x: 1152, y: 2148}, {x: 1876, y: 1732}];
var waveCount: number = 1;

var spawnSpeedCount: number = 0;
const spawnSpeed: number = 200;

var zombieSpawnCount: number = 0;

const titleFontSize: number = 20;
const fontSize: number = 15;

document.addEventListener("keydown", function (event: KeyboardEvent) {
    keyPressed = event;
    isKeyPressed = true;
});

document.addEventListener("keyup", function (event: KeyboardEvent) {
    keyPressed = event;
    isKeyPressed = false;
});

document.addEventListener("mousemove", function (event: MouseEvent) {
    let x: number = event.clientX;
    let y : number = event.clientY;
    
    mousePos = {x: x, y: y};
});

document.addEventListener("mousedown", function (event: MouseEvent) {
    isMousePressed = true;
});

document.addEventListener("mouseup", function (event: MouseEvent) {
    isMousePressed = false;
});

// disable right click
document.addEventListener("contextmenu", event => event.preventDefault());

/*function removeEquals<T>(arr: T[]) {
    let sett: Set<T> = new Set(arr);
    
    return Array.from(sett.values());
}*/

// ------

function defineSize(): void {
    g.canvas.width = window.innerWidth;
    g.canvas.height = window.innerHeight;
}

function reset(): void {
    entities = [];
    gameState = "game";
    
    player = new Player({x: 1406, y: 1932, w: pixelSize, h: pixelSize}, playerSpritesheet, {x: 0, y: 0, w: 16 * 100, h: 16 * 100});
    waveCount = 1;
    
    entities.push(player);
    
    addBarriers();
    
    zombiePositions = [{x: 1148, y: 1940}, {x: 1152, y: 2148}, {x: 1876, y: 1732}];
}

// ----------------------------------------

function init(): void {
    entities.push(player);
    
    addBarriers();
    
    g.canvas.style.imageRendering = "pixelated";
    window.requestAnimationFrame(loop);
}

function addBarriers() {
    entities.push(new Barrier({x: 1076, y: 1740, w: 36, h: 111}, barrier, {x: 0, y: 0, w: 36, h: 111}, "Hotel", 700, [{x: 1000, y: 1280}, {x: 216, y: 2192}, {x: 168, y: 916}]));
    entities.push(new Barrier({x: 1968, y: 2180, w: 36, h: 111}, barrier, {x: 0, y: 0, w: 36, h: 111}, "Office", 500, []));
}

function tick(): void {
    if (gameState === "game") {
        for (let o of entities) {
            o.tick();
        }
    
        spawnSpeedCount++;
        
        if (spawnSpeedCount >= spawnSpeed) {
            spawnSpeedCount = 0;
            
            zombieSpawnCount++;
            
            if (zombieSpawnCount >= waves[waveCount - 1].zombieAmount && zombiesAliveAmount() == 0) {
                zombieSpawnCount = 0;
                waveCount++;
            }
            
            var zombieType: ZombieType = waves[waveCount - 1].zombieTypes[random(0, waves[waveCount - 1].zombieTypes.length)];
            var pos: Point = zombiePositions[random(0, zombiePositions.length)];
            var zombie: Zombie | null = null;
            
            if (zombieType === "basic-zombie")
                zombie = new Zombie({x: 0, y: 0, w: pixelSize, h: pixelSize}, basicZombieSpr, {x: 0, y: 0, w: 16 * 70, h: 16 * 70}, 5, 1, 1, "none", "Basic Zombie", [{x: 0, y: 0, w: 16 * 70, h: 16 * 70}, {x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70}, {x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70}, {x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70}]);
            
            zombie!.bounds.x = pos.x;
            zombie!.bounds.y = pos.y;
            for (let i = 0; i < player.weapons.length; i++) {
                // detect click
                if (collide({x: g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i), y: g.canvas.height - 90, w: 70, h: 70}, {x: mousePos.x, y: mousePos.y, w: 1, h: 1}) && isMousePressed && player.weapons[i] !== undefined) {
                    weaponSelected = i;
                }
            }
            
            if (zombieSpawnCount < waves[waveCount - 1].zombieAmount)
                entities.push(zombie!);
        }
    }
    else if (gameState === "gameover") {
        if (keyPressed.keyCode === enterCode) {
            reset();
        }
    }
}

function render(): void {
    g.ctx!.globalAlpha = 1;
    
    // draw black bg
    g.ctx!.fillStyle = "black";
    g.ctx?.fillRect(0, 0, g.canvas.width, g.canvas.height);
    
    g.ctx?.drawImage(map, 0 - camera.x, 0 - camera.y, map.width, map.height);
    
    for (let o of entities) {
        o.render(g);
    }
    
    if (gameState === "game") {
        // draw slots
        for (let i = 0; i < player.weapons.length; i++) {
            let x: number = 32 * 70;
            
            if (i == 0) x = 48 * 70;
            if (i == weaponSelected) x = 64 * 70;
            
            g.ctx?.drawImage(playerSpritesheet, x, 64 * 70, 16 * 70, 16 * 70, g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i), g.canvas.height - 90, 70, 70);
            
            if (player.weapons[i] !== undefined) {
                player.weapons[i].bounds = {x: g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i) + 10, y: g.canvas.height - 70, w: 16 * 3, h: 16 * 3};
                player.weapons[i].render(g);
            }
            
            if (collide({x: g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i), y: g.canvas.height - 90, w: 70, h: 70}, {x: mousePos.x, y: mousePos.y, w: 1, h: 1}) && player.weapons[i] !== undefined) {
                g.ctx!.font = "15px Pixel";
                g.ctx!.fillStyle = "white";
                g.ctx!.globalAlpha = 1;
                
                let text: string = player.weapons[i].name;
                
                g.ctx?.fillText(text, mousePos.x + 10, mousePos.y);
            }
        }
        
        for (let i = 0; i < 3; i++)
            g.ctx?.drawImage(playerSpritesheet, 32 * 70, 64 * 70, 16 * 70, 16 * 70, g.canvas.width / 2 + (70 / 2) + 75 + (75 * i), g.canvas.height - 90, 70, 70);
        
        for (let i = 0; i < player.totalHp; i++) {
            g.ctx?.drawImage(playerSpritesheet, 0, i < player.hp ? 64 * 70 : 4714, 12 * 23, 10 * 23, (g.canvas.width / 2 - 90) + 24 * i, g.canvas.height - 120, 12 * 2, 10 * 2);
        }
        
        g.ctx!.globalAlpha = 0.4;
        g.ctx!.fillStyle = "black";
        
        g.ctx?.fillRect(g.canvas.width - 200, (g.canvas.height / 2) - 200, 200, 400);
        
        g.ctx!.font = titleFontSize + "px Pixel";
        g.ctx!.fillStyle = "white";
        g.ctx!.globalAlpha = 1;
        
        let text: string = "Wave " + waveCount;
        
        g.ctx?.fillText(text, g.canvas.width - (text.length * titleFontSize) - 40, g.canvas.height / 2 - (titleFontSize / 2) - 150);
        
        g.ctx!.font = "15px Pixel";
        g.ctx!.fillStyle = "white";
        g.ctx!.globalAlpha = 1;
        
        text = player.weapons[weaponSelected].ammoTotal + " | " + player.weapons[weaponSelected].ammo;
        
        g.ctx?.fillText(text, (g.canvas.width / 2) - (15 * (text.length / 4)), g.canvas.height - 150);
        
        // draw stats
        
        g.ctx!.font = "20px Pixel";
        g.ctx!.fillStyle = "white";
        g.ctx!.globalAlpha = 1;
        
        g.ctx?.drawImage(playerSpritesheet, 288, 4480, 16 * 23, 26 * 23, g.canvas.width - 190, g.canvas.height / 2 - 130, 7 * 5, 10 * 5);
        let x: number = 25;
        
        if (player.coins >= 10 && player.coins < 100) x = 45;
        else if (player.coins >= 100 && player.coins < 1000) x = 65;
        else if (player.coins >= 1000 && player.coins < 100000) x = 105;
        else if (player.coins >= 100000 && player.coins < 1000000) x = 125;
        else if (player.coins >= 1000000) x = 145;
        
        g.ctx?.fillText(player.coins.toString(), g.canvas.width - x, g.canvas.height / 2 - 107);
        
    }
    
    else if (gameState === "gameover") {
        g.ctx!.globalAlpha = 0.2;
        
        g.ctx!.fillStyle = "red";
        g.ctx?.fillRect(0, 0, g.canvas.width, g.canvas.height);
        
        let fontSize: number = 30;
        let text: string = "Game Over!";
        
        g.ctx!.font = fontSize + "px Pixel";
        g.ctx!.fillStyle = "white";
        g.ctx!.globalAlpha = 1;
        
        g.ctx?.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 100);
        
        fontSize = 15;
        text = "Press Enter to restart";
        
        g.ctx!.font = fontSize + "px Pixel";
        
        g.ctx?.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 200);
    }
}

function loop(): void {
    defineSize();
    
    tick();
    render();
    
    window.requestAnimationFrame(loop);
}
