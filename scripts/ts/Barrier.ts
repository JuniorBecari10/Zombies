class Barrier extends Entity {
    place: string;
    price: number;
    
    newPositions: Point[];
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
        place: string, price: number, newPositions: Point[]) {
        super(bounds, spritesheet, cutBounds);
        
        this.place = place;
        this.price = price;
        
        this.newPositions = newPositions;
        
        //collisions.push(bounds);
    }
    
    tick(): void {
        let doubleBounds: Rectangle = getDoubleBounds(this.bounds);
        
        if (player.coins >= this.price && 
            collide(player.bounds, doubleBounds) && 
            keyPressed.keyCode === enterCode) {
            player.coins -= this.price;
            
            for (let n of this.newPositions)
                zombiePositions.push(n);
            
            this.destroy();
        }
    }
    
    render(g: Graphics): void {
        super.render(g);
        
        let doubleBounds: Rectangle = getDoubleBounds(this.bounds);
        
        if (collide(player.bounds, doubleBounds)) {
            g.ctx!.font = "20px Pixel";
            g.ctx!.fillStyle = "white";
            g.ctx!.globalAlpha = 1;
            
            g.ctx?.fillText(this.place, player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y);
            
            g.ctx!.font = "15px Pixel";
            
            g.ctx?.fillText("$" + this.price.toString(), player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 30);
            g.ctx?.fillText("Press Enter to Unlock", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 60);
            
            if (player.coins < this.price) {
                g.ctx!.fillStyle = "#FF4545";
                g.ctx?.fillText("Not Enough Money!", player.bounds.x + player.bounds.w - camera.x, player.bounds.y - camera.y + 90);
            }
        }
    }
}
