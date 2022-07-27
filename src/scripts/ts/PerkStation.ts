class PerkStation extends Entity {
    perk: PerkType;
    price: number;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
    perk: PerkType, price: number) {
        super(bounds, spritesheet, cutBounds);
        
        this.perk = perk;
        this.price = price;
    }
    
    tick(): void {
        if (player.coins >= this.price && 
                collide(player.bounds, this.bounds) && 
                keyPressed.keyCode === enterCode && !player.hasPerk(getPerk(this.perk)!.name) &&
                powerOn) {
            player.coins -= this.price;
            
            player.perks[player.freePerkSlot() < 0 ? 0 : player.freePerkSlot()] = getPerk(this.perk)!;
            
            //this.destroy();
        }
    }
    
    render(g: Graphics): void {
        super.render(g);
        
        if (collide(player.bounds, this.bounds)) {
            g.ctx!.font = "20px Pixel";
            g.ctx!.fillStyle = "white";
            g.ctx!.globalAlpha = 1;
            
            g.ctx?.fillText("Perk | " + getPerk(this.perk)!.name, player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y);
            
            g.ctx!.font = "15px Pixel";
            
            g.ctx?.fillText("$" + this.price.toString(), player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 30);
            g.ctx?.fillText("Press Enter to Buy", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 60);
            
            if (!powerOn) {
                g.ctx!.fillStyle = "#FF4545";
                g.ctx?.fillText("Requires Power!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
            else if (player.coins < this.price && !player.hasPerk(getPerk(this.perk)!.name)) {
                g.ctx!.fillStyle = "#FF4545";
                g.ctx?.fillText("Not Enough Money!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
            else if (player.hasPerk(getPerk(this.perk)!.name)) {
                g.ctx!.fillStyle = "#FF4545";
                g.ctx?.fillText("You already have this perk!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
            else if (player.freePerkSlot() < 0) {
                g.ctx!.fillStyle = "#DDDD45";
                g.ctx?.fillText("Perk #0", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
                g.ctx?.fillText("will be replaced.", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 120);
            }
        }
    }
}
