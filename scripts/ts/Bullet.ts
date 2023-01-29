class Bullet extends Entity {
    dx: number;
    dy: number;
    
    attack: number;
    speed: number;
    
    lifeCount: number = 0;
    lifeTime: number;
    
    explosive: boolean;
    
    constructor(bounds: Rectangle, spritesheet: HTMLImageElement, cutBounds: Rectangle,
    dx: number, dy: number, attack: number, speed: number, lifeTime: number, explosive: boolean) {
        super(bounds, spritesheet, cutBounds);
        
        this.dx = dx;
        this.dy = dy;
        
        this.attack = attack;
        this.speed = speed;
        
        this.lifeTime = lifeTime;
        
        this.explosive = explosive;
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
            (this.collideWithEntity() as Zombie).hp -= player.weapons[weaponSelected].bulletDamage - (this.collideWithEntity() as Zombie).defense;
            (this.collideWithEntity() as Zombie).feedback = true;
        
        if (collideWithAny(this.bounds) || this.collideWithEntity() instanceof Zombie) {
            if (this.explosive) {
                entities.push(new Explosion(this.bounds, explosion, {x: 0, y: 0, w: 312 + (312 / 3), h: 264 + (264 / 3)}));
            }
            
            this.destroy();
        }
    }
}