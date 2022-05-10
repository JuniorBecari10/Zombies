class Bullet extends Entity {
    dx: number;
    dy: number;
    
    attack: number;
    speed: number;
    
    lifeCount: number = 0;
    lifeTime: number;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
    dx: number, dy: number, attack: number, speed: number, lifeTime: number) {
        super(bounds, spritesheet, cutBounds);
        
        this.dx = dx;
        this.dy = dy;
        
        this.attack = attack;
        this.speed = speed;
        
        this.lifeTime = lifeTime;
    }
    
    tick(): void {
        this.bounds.x += this.dx * this.speed;
        this.bounds.y += this.dy * this.speed;
        
        this.lifeCount++;
        
        if (this.lifeCount >= this.lifeTime) {
            this.lifeCount = 0;
            this.destroy();
        }
        
        if (this.collideWithEntity() instanceof Zombie)
            (this.collideWithEntity() as Zombie).hp -= player.weapons[weaponSelected].bulletDamage;
        
        if (collideWithAny(this.bounds) || this.collideWithEntity() instanceof Zombie) {
            this.destroy();
        }
    }
}
