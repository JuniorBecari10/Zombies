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
        
        collisions.push(bounds);
    }
    
    tick(): void {
        let doubleBounds: Rectangle = this.bounds;
        
        if (player.coins >= this.price && 
            collide({x: mousePos.x + camera.x, y: mousePos.y + camera.y, w: 1, h: 1}, this.bounds) && 
            isMousePressed) {
            player.coins -= this.price;
            
            for (let n of this.newPositions)
                zombiePositions.push(n);
            
            collisions.splice(collisions.indexOf(this.bounds), 1);
            this.destroy();
        }
    }
    
    render(g: Graphics): void {
        super.render(g);
        
        if (collide({x: mousePos.x + camera.x, y: mousePos.y + camera.y, w: 1, h: 1}, this.bounds)) {
            g.ctx!.font = "20px Pixel";
            g.ctx!.fillStyle = "white";
            g.ctx!.globalAlpha = 1;
            
            g.ctx?.fillText(this.place, mousePos.x + 20, mousePos.y);
            
            g.ctx!.font = "15px Pixel";
            
            g.ctx?.fillText("$" + this.price.toString(), mousePos.x + 20, mousePos.y + 30);
            g.ctx?.fillText("Click to Unlock", mousePos.x + 20, mousePos.y + 60);
        }
    }
}
