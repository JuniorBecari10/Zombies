var player: Player = new Player({x: 1406, y: 1932, w: pixelSize, h: pixelSize}, playerSpritesheet, {x: 0, y: 0, w: 16 * 100, h: 16 * 100});

const bossSpawn: Point = {x: 1306, y: 1932};

var zombiePositions: Point[] = [{x: 1148, y: 1940}, {x: 1152, y: 2148}, {x: 1876, y: 1732}];
var waveCount: number = 9;

var spawnSpeedCount: number = 0;
var spawnSpeed: number = 300; // 200 is too fast

var zombieSpawnCount: number = 0;
var zombieKills: number = 0;
var totalZombieKills: number = 0;

const titleFontSize: number = 20;
const fontSize: number = 15;

const powerMachinePrice: number = 1000;
const powerMachineBounds: Rectangle = {x: 2432, y: 706, w: 260, h: 273};

var powerOn: boolean = false;

var sec: number = 0;
var min: number = 0;
var hour: number = 0;

var count: number = 0;

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
    
    zombieSpawnCount = 0;
    zombieKills = 0;
    totalZombieKills = 0;
    
    sec = 0;
    min = 0;
    hour = 0;
    
    spawnSpeed = 300;
    spawnSpeedCount = 0;
    
    powerOn = false;
    
    player = new Player({x: 1406, y: 1932, w: pixelSize, h: pixelSize}, playerSpritesheet, {x: 0, y: 0, w: 16 * 100, h: 16 * 100});
    waveCount = 1;
    
    weaponSelected = 2;
    
    entities.push(player);
    
    addBarriers();
    addWeaponStations();
    addPerkStations();
    
    zombiePositions = [{x: 1148, y: 1940}, {x: 1152, y: 2148}, {x: 1876, y: 1732}];
}

// ----------------------------------------

function init(): void {
    addBarriers();
    addWeaponStations();
    addPerkStations();
    
    entities.push(player);
    
    g.canvas.style.imageRendering = "pixelated";
    
    //entities.push(new Explosion(player.bounds, explosion, {x: 0, y: 0, w: 312 + (312 / 3), h: 264 + (264 / 3)}));
    
    window.requestAnimationFrame(loop);
}

function addBarriers() {
    entities.push(new Barrier({x: 1076, y: 1740, w: 36, h: 111}, barrier, {x: 0, y: 0, w: 36, h: 111}, "Hotel", 700, [{x: 1000, y: 1280}, {x: 216, y: 2202}, {x: 168, y: 916}]));
    entities.push(new Barrier({x: 1968, y: 2180, w: 36, h: 111}, barrier, {x: 0, y: 0, w: 36, h: 111}, "Office", 500, [{x: 2332, y: 1772}, {x: 2616, y: 2380}, {x: 2304, y: 2420}]));
    entities.push(new Barrier({x: 1088, y: 904, w: 36, h: 136}, barrier, {x: 0, y: 0, w: 36, h: 111}, "Apartments", 700, [{x: 1290, y: 820}, {x: 1588, y: 612}]));
    entities.push(new Barrier({x: 1948, y: 904, w: 36, h: 136}, barrier, {x: 0, y: 0, w: 36, h: 111}, "Power Station", 1000, []));
    entities.push(new Barrier({x: 216, y: 2464, w: 112, h: 36}, hBarrier, {x: 0, y: 0, w: 111, h: 36}, "Garden", 800, [{x: 924, y: 3060}])); 
}

function addWeaponStations() {
    entities.push(new WeaponStation({x: 912, y: 2392, w: 44 * 3, h: 16 * 3}, weapons, {x: 32 * 3, y: 0, w: 44 * 3, h: 16 * 3}, "rifle", 500));
    entities.push(new WeaponStation({x: 2680, y: 1972, w: 47 * 3, h: 16 * 3}, weapons, {x: 80 * 3, y: 0, w: 144, h: 16 * 3}, "shotgun", 500));
    entities.push(new WeaponStation({x: 3012, y: 576, w: 50 * 3, h: 16 * 3}, weapons, {x: 96, y: 64, w: 50 * 3, h: 16 * 3}, "rocket", 900));
}

function addPerkStations() {
    entities.push(new PerkStation({x: 792, y: 1200, w: 16 * 3, h: 16 * 3}, perks, {x: 80 * 3, y: 0, w: 16 * 3, h: 16 * 3}, "regen", 700));
}

function tick(): void {
    if (gameState === "game" || gameState === "menu") {
        if (gameState === "menu") {
            if (keyPressed !== undefined && keyPressed.keyCode === enterCode) {
                gameState = "game";
            }
        }
        
        for (let o of entities) {
            o.tick();
        }
        
        if (waveCount == 10 && zombiesAliveAmount() == 0)
            gameState = "win";
        
        // check if the player is near the power machine
        
        if (collide(player.bounds, powerMachineBounds) &&
            keyPressed.keyCode === enterCode && player.coins >= powerMachinePrice && !powerOn) {
            powerOn = true;
        }
        
        if (gameState === "menu") return;
        
        // timer / stopwatch
        
        count++;
        
        if (count >= 60) {
            count = 0;
            sec++;
            
            if (sec >= 60) {
                sec = 0;
                min++;
                
                if (min >= 60) {
                    min = 0;
                    hour++;
                }
            }
        }
        
        spawnSpeedCount++;
        
        if (spawnSpeedCount >= spawnSpeed) {
            spawnSpeedCount = 0;
            
            zombieSpawnCount++;
            
            if (zombieSpawnCount >= waves[waveCount - 1].zombieAmount && zombiesAliveAmount() == 0) {
                zombieSpawnCount = 0;
                waveCount++;
                spawnSpeed += 20;
                zombieKills = 0;
            }
            
            var zombieType: ZombieType = waves[waveCount - 1].zombieTypes[random(0, waves[waveCount - 1].zombieTypes.length)];
            var pos: Point = zombiePositions[random(0, zombiePositions.length)];
            var zombie: Zombie = getZombie(zombieType)!;
            
            if (zombie.isBoss)
                pos = bossSpawn;
            
            zombie.bounds.x = pos.x;
            zombie.bounds.y = pos.y;
            
            for (let i = 0; i < player.weapons.length; i++) {
                // detect click
                if (collide({x: g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i), y: g.canvas.height - 90, w: 70, h: 70}, {x: mousePos.x, y: mousePos.y, w: 1, h: 1}) && isMousePressed && player.weapons[i] !== undefined) {
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
    else if (gameState === "win") {
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
    
    // draw empty screen if the power isn't active
    if (!powerOn) {
        g.ctx!.fillStyle = "#2a2a2a";
        g.ctx?.fillRect(2500 - camera.x, 800 - camera.y, 56, 32);
    }
    
    for (let o of entities) {
        o.render(g);
    }
    
    // render power machine text
    
    if (collide(player.bounds, powerMachineBounds)) {
        g.ctx!.font = "20px Pixel";
        g.ctx!.fillStyle = "white";
        g.ctx!.globalAlpha = 1;
        
        g.ctx?.fillText("Power Machine", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y);
        
        g.ctx!.font = "15px Pixel";
        
        g.ctx?.fillText("$" + powerMachinePrice, player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 30);
        g.ctx?.fillText("Press Enter to Activate", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 60);
        
        if (player.coins < powerMachinePrice) {
            g.ctx!.fillStyle = "#FF4545";
            g.ctx?.fillText("Not Enough Money!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
        }
        else if (powerOn) {
            g.ctx!.fillStyle = "#FF4545";
            g.ctx?.fillText("Already Active!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
        }
    }
    
    if (gameState === "game") {
        // draw slots
        for (let i = 0; i < player.weapons.length; i++) {
            let x: number = 32 * 70;
            
            if (!containsPerk("extra") && i == 0) x = 48 * 70;
            if (i == weaponSelected) x = 64 * 70;
            
            g.ctx?.drawImage(playerSpritesheet, x, 64 * 70, 16 * 70, 16 * 70, g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i), g.canvas.height - 90, 70, 70);
            
            if (player.weapons[i] !== undefined) {
                player.weapons[i].bounds = {x: g.canvas.width / 2 - (70 / 2) - 75 /* one time */ - (75 * i) + 10, y: g.canvas.height - 70, w: 16 * 3, h: ruleOf3(player.weapons[i].originalWidth, 16 * 3, 16 * 3)};
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
        
        // draw perks
        for (let i = 0; i < player.perks.length; i++) {
            g.ctx?.drawImage(playerSpritesheet, 32 * 70, 64 * 70, 16 * 70, 16 * 70, g.canvas.width / 2 + (70 / 2) + 75 + (75 * i), g.canvas.height - 90, 70, 70);
            
            if (player.perks[i] !== undefined) {
                player.perks[i].bounds = {x: g.canvas.width / 2 + (70 / 2) + 75 /* one time */ + (75 * i) + 10, y: g.canvas.height - 80, w: 16 * 3, h: 16 * 3};
                player.perks[i].render(g);
            }
        }
        
        for (let i = 0; i < player.perks.length; i++) {
            if (collide({x: g.canvas.width / 2 + (70 / 2) + 75 /* one time */ + (75 * i), y: g.canvas.height - 90, w: 70, h: 70}, {x: mousePos.x, y: mousePos.y, w: 1, h: 1}) && player.perks[i] !== undefined) {
                g.ctx!.font = "15px Pixel";
                g.ctx!.fillStyle = "white";
                g.ctx!.globalAlpha = 1;
                
                let text: string = player.perks[i].name;
                
                g.ctx?.fillText(text, mousePos.x + 10, mousePos.y);
            }
        }
        
        // draw health
        for (let i = 0; i < player.totalHp; i++) {
            g.ctx?.drawImage(playerSpritesheet, 0, i < player.hp ? 64 * 70 : 4714, 12 * 23, 10 * 23, (g.canvas.width / 2 - 90) + 24 * i, g.canvas.height - 120, 12 * 2, 10 * 2);
        }
        
        // draw stats bg
        g.ctx!.globalAlpha = 0.4;
        g.ctx!.fillStyle = "black";
        
        g.ctx?.fillRect(g.canvas.width - 200, (g.canvas.height / 2) - 150, 200, 300);
        
        g.ctx!.font = titleFontSize + "px Pixel";
        g.ctx!.fillStyle = "white";
        g.ctx!.globalAlpha = 1;
        
        let text: string = "Wave " + waveCount;
        
        g.ctx?.fillText(text, g.canvas.width - (text.length * titleFontSize) - 40, g.canvas.height / 2 - (titleFontSize / 2) - 100);
        
        g.ctx!.font = "15px Pixel";
        g.ctx!.fillStyle = "white";
        g.ctx!.globalAlpha = 1;
        
        text = player.weapons[weaponSelected].ammoTotal + " | " + player.weapons[weaponSelected].ammo;
        
        g.ctx?.fillText(text, (g.canvas.width / 2) - (15 * (text.length / 4)), g.canvas.height - 150);
        
        // draw stats
        
        g.ctx!.font = "20px Pixel";
        g.ctx!.fillStyle = "white";
        g.ctx!.globalAlpha = 1;
        
        g.ctx?.drawImage(playerSpritesheet, 288, 4480, 16 * 23, 26 * 23, g.canvas.width - 190, g.canvas.height / 2 - 80, 7 * 5, 10 * 5);
        let x: number = 25;
        
        if (player.coins < 10) x = 25;
        else if (player.coins >= 10 && player.coins < 100) x = 45;
        else if (player.coins >= 100 && player.coins < 1000) x = 65;
        else if (player.coins >= 1000 && player.coins < 10000) x = 85;
        else if (player.coins >= 10000 && player.coins < 100000) x = 105;
        else if (player.coins >= 100000 && player.coins < 1000000) x = 125;
        else if (player.coins >= 1000000) x = 145;
        
        g.ctx?.fillText(player.coins.toString(), g.canvas.width - x, g.canvas.height / 2 - 57);
        
        // ----
        
        let alive: number = waves[waveCount - 1].zombieAmount - zombieKills;
        
        if (alive < 0) alive = 0;
        
        g.ctx?.drawImage(playerSpritesheet, 641, 4480, 16 * 23, 26 * 23, g.canvas.width - 190, g.canvas.height / 2 - 30, 7 * 5, 10 * 5);
        
        if (alive < 10) x = 25;
        else if (alive >= 10 && alive < 100) x = 45;
        else if (alive >= 100 && alive < 1000) x = 65;
        else if (alive >= 1000 && alive < 10000) x = 85;
        else if (alive >= 10000 && alive < 100000) x = 105;
        else if (alive >= 100000 && alive < 1000000) x = 125;
        else if (alive >= 1000000) x = 145;
        
        g.ctx?.fillText(alive.toString(), g.canvas.width - x, g.canvas.height / 2 - 7); // 87 - right below
        
        // ----
        
        g.ctx?.drawImage(playerSpritesheet, 288, 4992, 16 * 23, 26 * 23, g.canvas.width - 190, g.canvas.height / 2 + 20, 7 * 5, 10 * 5);
        
        if (totalZombieKills < 10) x = 25;
        else if (totalZombieKills >= 10 && totalZombieKills < 100) x = 45;
        else if (totalZombieKills >= 100 && totalZombieKills < 1000) x = 65;
        else if (totalZombieKills >= 1000 && totalZombieKills < 10000) x = 85;
        else if (totalZombieKills >= 10000 && totalZombieKills < 100000) x = 105;
        else if (totalZombieKills >= 100000 && totalZombieKills < 1000000) x = 125;
        else if (totalZombieKills >= 1000000) x = 145;
        
        g.ctx?.fillText(totalZombieKills.toString(), g.canvas.width - x, g.canvas.height / 2 + 47);
        
        // ----
        
        let time: string = /*(hour < 10 ? "0" : "") + hour.toString() + ":" + */(min < 10 ? "0" : "") + min.toString() + ":" + (sec < 10 ? "0" : "") + sec.toString();
        
        g.ctx?.drawImage(playerSpritesheet, 688, 5088, 17 * 23, 26 * 23, g.canvas.width - 190, g.canvas.height / 2 + 70, 7 * 5, 10 * 5);
        /*
        if (time.length < 10) x = 25;
        else if (time.length >= 10 && time.length < 100) x = 45;
        else if (time.length >= 100 && time.length < 1000) x = 65;
        else if (time.length >= 1000 && time.length < 100000) x = 105;
        else if (time.length >= 100000 && time.length < 1000000) x = 125;
        else if (time.length >= 1000000) x = 145;
        */
        
        x = 105;
        
        g.ctx?.fillText(time, g.canvas.width - x, g.canvas.height / 2 + 97);
        
        
        // rifle positions
        //g.ctx?.drawImage(weapons, 32 * 3, 0, 44 * 3, 16 * 3, mousePos.x, mousePos.y, 44 * 3, 16 * 3);
        
        if (player.recharging) {
            let text: string = "Recharging...";
            let font: number = 15;
            
            g.ctx!.font = font + "px Pixel";
            g.ctx?.fillText(text, (g.canvas.width / 2) - ((font * text.length) / 4), g.canvas.height - 175);
        }
    }
    else if (gameState === "gameover") {
        g.ctx!.globalAlpha = 0.2;
        
        g.ctx!.fillStyle = "red";
        g.ctx?.fillRect(0, 0, g.canvas.width, g.canvas.height);
        
        //let fontSize: number = 30;
        //let text: string = "Game Over!";
        /*
        g.ctx!.font = fontSize + "px Pixel";
        g.ctx!.fillStyle = "white";
        g.ctx!.globalAlpha = 1;
        
        g.ctx?.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 100);
        */
        
        g.ctx!.globalAlpha = 1;
        
        g.ctx?.drawImage(gameOver, g.canvas.width / 2 - 150, 100);
        
        let fontSize: number = 15;
        let text: string = "Press Enter to restart";
        
        g.ctx!.font = fontSize + "px Pixel";
        g.ctx!.fillStyle = "white";
        
        g.ctx!.font = fontSize + "px Pixel";
        g.ctx?.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 280);
        
        text = "You were killed by " + player.deathCause;
        
        g.ctx?.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 240);
    }
    else if (gameState === "menu") {
        g.ctx!.globalAlpha = 0.2;
        
        g.ctx!.fillStyle = "black";
        g.ctx?.fillRect(0, 0, g.canvas.width, g.canvas.height);
        
        let text = "Press Enter to start";
        
        g.ctx!.globalAlpha = 1;
        
        g.ctx!.fillStyle = "white";
        g.ctx!.font = "15px Pixel";
        
        g.ctx?.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 280);
        g.ctx?.drawImage(logo, (g.canvas.width / 2) - (logo.width / 2), 140);
    }
    else if (gameState === "win") {
        g.ctx!.globalAlpha = 0.2;
        
        g.ctx!.fillStyle = "black";
        g.ctx?.fillRect(0, 0, g.canvas.width, g.canvas.height);
        
        let text = "Thanks for playing.";
        
        g.ctx!.globalAlpha = 1;
        
        g.ctx!.fillStyle = "white";
        g.ctx!.font = "15px Pixel";
        
        g.ctx?.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 280);
        
        let time: string = (min < 10 ? "0" : "") + min.toString() + ":" + (sec < 10 ? "0" : "") + sec.toString();
        
        text = "Your time was " + time + ".";
        g.ctx?.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 310);
        
        text = "Press Enter to restart.";
        g.ctx?.fillText(text, (g.canvas.width / 2) - ((fontSize * text.length) / 2), 360);
        
        g.ctx?.drawImage(youWin, (g.canvas.width / 2) - (logo.width / 2), 140);
    }
}

function loop(): void {
    defineSize();
    
    tick();
    render();
    
    window.requestAnimationFrame(loop);
}
