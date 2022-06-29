class WeaponStation extends Entity {
    weapon: WeaponType;
    price: number;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
    weapon: WeaponType, price: number) {
        super(bounds, spritesheet, cutBounds);
        
        this.weapon = weapon;
        this.price = price;
    }
    
    tick(): void {
        if (player.coins >= this.price && 
            collide(player.bounds, this.bounds) && 
            keyPressed.keyCode === enterCode && !player.hasWeapon(getWeapon(this.weapon)!.name)) {
            player.coins -= this.price;
            
            player.weapons[player.freeSlot()] = getWeapon(this.weapon)!;
            
            //this.destroy();
        }
    }
    
    render(g: Graphics): void {
        super.render(g);
        
        if (collide(player.bounds, this.bounds)) {
            g.ctx!.font = "20px Pixel";
            g.ctx!.fillStyle = "white";
            g.ctx!.globalAlpha = 1;
            
            g.ctx?.fillText(getWeapon(this.weapon)!.name, player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y);
            
            g.ctx!.font = "15px Pixel";
            
            g.ctx?.fillText("$" + this.price.toString(), player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 30);
            g.ctx?.fillText("Press Enter to Buy", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 60);
            
            if (player.coins < this.price && !player.hasWeapon(getWeapon(this.weapon)!.name)) {
                g.ctx!.fillStyle = "#FF4545";
                g.ctx?.fillText("Not Enough Money!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
            else if (player.hasWeapon(getWeapon(this.weapon)!.name)) {
                g.ctx!.fillStyle = "#FF4545";
                g.ctx?.fillText("You already have this weapon!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
            else if (player.freeSlot()  === weaponSelected) {
                g.ctx!.fillStyle = "#DDDD45";
                g.ctx?.fillText("Your current weapon will be replaced.", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
        }
    }
}
