import { getRandom } from "$lib/shared/helpers";
import type { Timer } from "../../shared/canvas-engine/timer";

class Position {
    public x: number;
    public y: number;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

interface SnowflakeConstructorProps {
    initialPosition?: {x: number, y: number};
    size?: number;
    color?: string
}

export class Snowflake {
    public position: Position;
    public size = getRandom(2, 6);
    public color = '#ffffff'
    public ySpeed = getRandom(75, 150);  
    public amplitude = getRandom(0.5, 1);
    public frequency = getRandom(1, 3)

    constructor(props?: SnowflakeConstructorProps) {
        this.position = new Position(props?.initialPosition?.x, props?.initialPosition?.y);
    }

    public remder(ctx: CanvasRenderingContext2D) {
        const {x, y} = this.position
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    public update(timer: Timer) {
       this.position.y += timer.dt * this.ySpeed;
       this.position.x += this.amplitude * Math.sin(this.frequency * timer.elapsedTime);
       const maxY = window.innerHeight;
       if(this.position.y >= maxY) {
        this.position.y = -this.size;
        this.position.x = getRandom(0, window.innerWidth);
       }
    }
}