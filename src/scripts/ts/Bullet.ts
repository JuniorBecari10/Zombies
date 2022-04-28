class Bullet extends Entity {
    dx: number;
    dy: number;
    
    attack: number;
    speed: number;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
    dx: number, dy: number, attack: number, speed: number) {
        super(bounds, spritesheet, cutBounds);
        
        this.dx = dx;
        this.dy = dy;
        
        this.attack = attack;
        this.speed = speed;
    }
    
    tick(): void {
        this.bounds.x += this.dx * this.speed;
        this.bounds.y += this.dy * this.speed;
    }
}
