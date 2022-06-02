"use strict";
var player = new Player({ x: 1406, y: 1932, w: pixelSize, h: pixelSize }, playerSpritesheet, { x: 0, y: 0, w: 16 * 100, h: 16 * 100 });
var zombiePositions = [{ x: 1148, y: 1940 }, { x: 1152, y: 2148 }, { x: 1876, y: 1732 }];
var waveCount = 1;
var spawnSpeedCount = 0;
var spawnSpeed = 300; // 200 is too fast
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
    addBarriers();
    zombiePositions = [{ x: 1148, y: 1940 }, { x: 1152, y: 2148 }, { x: 1876, y: 1732 }];
}
// ----------------------------------------
function init() {
    entities.push(player);
    addBarriers();
    g.canvas.style.imageRendering = "pixelated";
    window.requestAnimationFrame(loop);
}
function addBarriers() {
    entities.push(new Barrier({ x: 1076, y: 1740, w: 36, h: 111 }, barrier, { x: 0, y: 0, w: 36, h: 111 }, "Hotel", 700, [{ x: 1000, y: 1280 }, { x: 216, y: 2202 }, { x: 168, y: 916 }]));
    entities.push(new Barrier({ x: 1968, y: 2180, w: 36, h: 111 }, barrier, { x: 0, y: 0, w: 36, h: 111 }, "Office", 500, []));
    entities.push(new Barrier({ x: 1088, y: 904, w: 36, h: 136 }, barrier, { x: 0, y: 0, w: 36, h: 111 }, "Apartments", 700, []));
    entities.push(new Barrier({ x: 216, y: 2464, w: 112, h: 36 }, hBarrier, { x: 0, y: 0, w: 111, h: 36 }, "Garden", 800, []));
}
function tick() {
    if (gameState === "game" || gameState === "menu") {
        if (gameState === "menu") {
            if (keyPressed !== undefined && keyPressed.keyCode === enterCode) {
                gameState = "game";
            }
        }
        for (let o of entities) {
            o.tick();
        }
        if (gameState === "menu")
            return;
        spawnSpeedCount++;
        if (spawnSpeedCount >= spawnSpeed) {
            spawnSpeedCount = 0;
            zombieSpawnCount++;
            if (zombieSpawnCount >= waves[waveCount - 1].zombieAmount && zombiesAliveAmount() == 0) {
                zombieSpawnCount = 0;
                waveCount++;
                spawnSpeed += 20;
            }
            var zombieType = waves[waveCount - 1].zombieTypes[random(0, waves[waveCount - 1].zombieTypes.length)];
            var pos = zombiePositions[random(0, zombiePositions.length)];
            var zombie = null;
            if (zombieType === "basic-zombie")
                zombie = new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, basicZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 5, 1, 1, "none", "Basic Zombie", [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
            else if (zombieType === "basic-skeleton")
                zombie = new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, basicSkeletonSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 6, 0, 1, "none", "Basic Skeleton", [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
            else if (zombieType === "armored-zombie")
                zombie = new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, armoredZombieSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 8, 2, 1, "none", "Armored Zombie", [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
            else if (zombieType === "armored-skeleton")
                zombie = new Zombie({ x: 0, y: 0, w: pixelSize, h: pixelSize }, armoredSkeletonSpr, { x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, 9, 0, 2, "none", "Armored Skeleton", [{ x: 0, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 16 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 32 * 70, y: 0, w: 16 * 70, h: 16 * 70 }, { x: 48 * 70, y: 0, w: 16 * 70, h: 16 * 70 }]);
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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
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
        g.ctx.font = "15px Pixel";
        g.ctx.fillStyle = "white";
        g.ctx.globalAlpha = 1;
        text = player.weapons[weaponSelected].ammoTotal + " | " + player.weapons[weaponSelected].ammo;
        (_j = g.ctx) === null || _j === void 0 ? void 0 : _j.fillText(text, (g.canvas.width / 2) - (15 * (text.length / 4)), g.canvas.height - 150);
        // draw stats
        g.ctx.font = "20px Pixel";
        g.ctx.fillStyle = "white";
        g.ctx.globalAlpha = 1;
        (_k = g.ctx) === null || _k === void 0 ? void 0 : _k.drawImage(playerSpritesheet, 288, 4480, 16 * 23, 26 * 23, g.canvas.width - 190, g.canvas.height / 2 - 130, 7 * 5, 10 * 5);
        let x = 25;
        if (player.coins >= 10 && player.coins < 100)
            x = 45;
        else if (player.coins >= 100 && player.coins < 1000)
            x = 65;
        else if (player.coins >= 1000 && player.coins < 100000)
            x = 105;
        else if (player.coins >= 100000 && player.coins < 1000000)
            x = 125;
        else if (player.coins >= 1000000)
            x = 145;
        (_l = g.ctx) === null || _l === void 0 ? void 0 : _l.fillText(player.coins.toString(), g.canvas.width - x, g.canvas.height / 2 - 107);
        // rifle positions
        //g.ctx?.drawImage(weapons, 32 * 3, 0, 44 * 3, 16 * 3, mousePos.x, mousePos.y, 44 * 3, 16 * 3);
        if (player.recharging) {
            let text = "Recharging...";
            let font = 15;
            g.ctx.font = font + "px Pixel";
            (_m = g.ctx) === null || _m === void 0 ? void 0 : _m.fillText(text, (g.canvas.width / 2) - ((font * text.length) / 4), g.canvas.height - 175);
        }
    }
    else if (gameState === "gameover") {
        g.ctx.globalAlpha = 0.2;
        g.ctx.fillStyle = "red";
        (_o = g.ctx) === null || _o === void 0 ? void 0 : _o.fillRect(0, 0, g.canvas.width, g.canvas.height);
        let fontSize = 30;
        let text = "Game Over!";
        g.ctx.font = fontSize + "px Pixel";
        g.ctx.fillStyle = "white";
        g.ctx.globalAlpha = 1;
        (_p = g.ctx) === null || _p === void 0 ? void 0 : _p.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 100);
        fontSize = 15;
        text = "Press Enter to restart";
        g.ctx.font = fontSize + "px Pixel";
        (_q = g.ctx) === null || _q === void 0 ? void 0 : _q.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 200);
        text = "You were killed by " + player.deathCause;
        (_r = g.ctx) === null || _r === void 0 ? void 0 : _r.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 140);
    }
    else if (gameState === "menu") {
        g.ctx.globalAlpha = 0.2;
        g.ctx.fillStyle = "black";
        (_s = g.ctx) === null || _s === void 0 ? void 0 : _s.fillRect(0, 0, g.canvas.width, g.canvas.height);
        let text = "Press Enter to start";
        g.ctx.globalAlpha = 1;
        g.ctx.fillStyle = "white";
        g.ctx.font = "15px Pixel";
        (_t = g.ctx) === null || _t === void 0 ? void 0 : _t.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 280);
        (_u = g.ctx) === null || _u === void 0 ? void 0 : _u.drawImage(logo, (g.canvas.width / 2) - (logo.width / 2), 140);
    }
}
function loop() {
    defineSize();
    tick();
    render();
    window.requestAnimationFrame(loop);
}
