"use strict";
var player = new Player({ x: 1406, y: 1932, w: pixelSize, h: pixelSize }, playerSpritesheet, { x: 0, y: 0, w: 16 * 100, h: 16 * 100 });
var zombiePositions = [{ x: 1148, y: 1940 }, { x: 1152, y: 2148 }, { x: 1876, y: 1732 }];
var waveCount = 1;
var spawnSpeedCount = 0;
const spawnSpeed = 200;
var zombieSpawnCount = 0;
const titleFontSize = 20;
const fontSize = 15;
document.addEventListener("keydown", function (event) {
    keyPressed = event;
    isKeyPressed = true;
});
document.addEventListener("keyup", function (event) {
    keyPressed = event;
    isKeyPressed = false;
});
document.addEventListener("mousemove", function (event) {
    let x = event.clientX;
    let y = event.clientY;
    mousePos = { x: x, y: y };
});
document.addEventListener("mousedown", function (event) {
    isMousePressed = true;
});
document.addEventListener("mouseup", function (event) {
    isMousePressed = false;
});
// disable right click
document.addEventListener("contextmenu", event => event.preventDefault());
/*function removeEquals<T>(arr: T[]) {
    let sett: Set<T> = new Set(arr);
    
    return Array.from(sett.values());
}*/
// ------
function defineSize() {
    g.canvas.width = window.innerWidth;
    g.canvas.height = window.innerHeight;
}
function reset() {
    entities = [];
    gameState = "game";
    player = new Player({ x: 1406, y: 1932, w: pixelSize, h: pixelSize }, playerSpritesheet, { x: 0, y: 0, w: 16 * 100, h: 16 * 100 });
    waveCount = 1;
    entities.push(player);
    zombiePositions = [{ x: 1148, y: 1940 }, { x: 1152, y: 2148 }, { x: 1876, y: 1732 }];
}
// ----------------------------------------
function init() {
    entities.push(player);
    g.canvas.style.imageRendering = "pixelated";
    window.requestAnimationFrame(loop);
}
function tick() {
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
            var zombieType = waves[waveCount - 1].zombieTypes[random(0, waves[waveCount - 1].zombieTypes.length)];
            var pos = zombiePositions[random(0, zombiePositions.length)];
            var zombie = null;
            if (zombieType === "basic-zombie")
                zombie = new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, basicZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 5, 1, 1, "none", "Basic Zombie", [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
            zombie.bounds.x = pos.x;
            zombie.bounds.y = pos.y;
            for (let i = 0; i < player.weapons.length; i++) {
                // detect click
                if (collide({ x: g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i), y: g.canvas.height - 90, w: 70, h: 70 }, { x: mousePos.x, y: mousePos.y, w: 1, h: 1 }) && isMousePressed && player.weapons[i] !== undefined) {
                    weaponSelected = i;
                }
            }
            if (zombieSpawnCount < waves[waveCount - 1].zombieAmount)
                entities.push(zombie);
        }
    }
    else if (gameState === "gameover") {
        if (keyPressed.keyCode === enterCode) {
            reset();
        }
    }
}
function render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    g.ctx.globalAlpha = 1;
    // draw black bg
    g.ctx.fillStyle = "black";
    (_a = g.ctx) === null || _a === void 0 ? void 0 : _a.fillRect(0, 0, g.canvas.width, g.canvas.height);
    (_b = g.ctx) === null || _b === void 0 ? void 0 : _b.drawImage(map, 0 - camera.x, 0 - camera.y, map.width, map.height);
    for (let o of entities) {
        o.render(g);
    }
    if (gameState === "game") {
        // draw slots
        for (let i = 0; i < player.weapons.length; i++) {
            let x = 32 * 70;
            if (i == 0)
                x = 48 * 70;
            if (i == weaponSelected)
                x = 64 * 70;
            (_c = g.ctx) === null || _c === void 0 ? void 0 : _c.drawImage(playerSpritesheet, x, 64 * 70, 16 * 70, 16 * 70, g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i), g.canvas.height - 90, 70, 70);
            if (player.weapons[i] !== undefined) {
                player.weapons[i].bounds = { x: g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i) + 10, y: g.canvas.height - 70, w: 16 * 3, h: 16 * 3 };
                player.weapons[i].render(g);
            }
            if (collide({ x: g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i), y: g.canvas.height - 90, w: 70, h: 70 }, { x: mousePos.x, y: mousePos.y, w: 1, h: 1 }) && player.weapons[i] !== undefined) {
                g.ctx.font = "15px Pixel";
                g.ctx.fillStyle = "white";
                g.ctx.globalAlpha = 1;
                let text = player.weapons[i].name;
                (_d = g.ctx) === null || _d === void 0 ? void 0 : _d.fillText(text, mousePos.x + 10, mousePos.y);
            }
        }
        for (let i = 0; i < 3; i++)
            (_e = g.ctx) === null || _e === void 0 ? void 0 : _e.drawImage(playerSpritesheet, 32 * 70, 64 * 70, 16 * 70, 16 * 70, g.canvas.width / 2 + (70 / 2) + 75 + (75 * i), g.canvas.height - 90, 70, 70);
        for (let i = 0; i < player.totalHp; i++) {
            (_f = g.ctx) === null || _f === void 0 ? void 0 : _f.drawImage(playerSpritesheet, 0, i < player.hp ? 64 * 70 : 4714, 12 * 23, 10 * 23, (g.canvas.width / 2 - 90) + 24 * i, g.canvas.height - 120, 12 * 2, 10 * 2);
        }
        g.ctx.globalAlpha = 0.4;
        g.ctx.fillStyle = "black";
        (_g = g.ctx) === null || _g === void 0 ? void 0 : _g.fillRect(g.canvas.width - 200, (g.canvas.height / 2) - 200, 200, 400);
        g.ctx.font = titleFontSize + "px Pixel";
        g.ctx.fillStyle = "white";
        g.ctx.globalAlpha = 1;
        let text = "Wave " + waveCount;
        (_h = g.ctx) === null || _h === void 0 ? void 0 : _h.fillText(text, g.canvas.width - (text.length * titleFontSize) - 40, g.canvas.height / 2 - (titleFontSize / 2) - 150);
    }
    else if (gameState === "gameover") {
        g.ctx.globalAlpha = 0.2;
        g.ctx.fillStyle = "red";
        (_j = g.ctx) === null || _j === void 0 ? void 0 : _j.fillRect(0, 0, g.canvas.width, g.canvas.height);
        let fontSize = 30;
        let text = "Game Over!";
        g.ctx.font = fontSize + "px Pixel";
        g.ctx.fillStyle = "white";
        g.ctx.globalAlpha = 1;
        (_k = g.ctx) === null || _k === void 0 ? void 0 : _k.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 100);
        fontSize = 15;
        text = "Press Enter to restart";
        g.ctx.font = fontSize + "px Pixel";
        (_l = g.ctx) === null || _l === void 0 ? void 0 : _l.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 200);
    }
}
function loop() {
    defineSize();
    tick();
    render();
    window.requestAnimationFrame(loop);
}
