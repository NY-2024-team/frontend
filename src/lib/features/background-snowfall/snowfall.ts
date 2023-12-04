import { getRandom } from "$lib/shared/helpers";
import { Snowflake } from "./snowflake";
import { Timer } from "../../shared/canvas-engine/timer";

export class Snowfall {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
    public readonly timer = new Timer();
    private snowflakes: Snowflake[] = [];
    public resizer: ResizeObserver;

	constructor(canvasRef: HTMLCanvasElement) {
		this.canvas = canvasRef;
        const ctx = this.canvas.getContext('2d');
        if(!ctx) throw new Error('Cannot get context from canvas!');
        this.ctx = ctx;

        const resizer = new ResizeObserver(() => {
            this.setupCanvas();
            this.render();
        });
        resizer.observe(document.body);
        
        this.resizer = resizer;
        this.setupCanvas();

        this.flushSnowflakeArray();
        this.fillSnowflakeArray(75);

        this.play();
	}

    private setupCanvas() {
        const {width, height} = document.body.getBoundingClientRect()
        this.canvas.width = Number(width);
        this.canvas.height = Number(height);
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
    }

    private flushSnowflakeArray(): void {
        for(let i = 0; i < this.snowflakes.length; i++) {
            delete this.snowflakes[i];
            this.snowflakes.pop();
        }
    }

    private fillSnowflakeArray(count: number): void {
        for(let i = 0; i < count; i++) {
            const snowflake = new Snowflake({
                initialPosition: {
                    x: getRandom(0, this.canvas.width),
                    y: getRandom(0, this.canvas.height),
                }
            })
            this.snowflakes.push(snowflake);
        }
    }

    private drawSnowflakes(ctx: CanvasRenderingContext2D): void {
        for(const snowflake of this.snowflakes) {
            snowflake.remder(ctx);
        }
    }

    private updateSnowflakes(timer: Timer) {
        for(const snowflake of this.snowflakes) {
            snowflake.update(timer);
        }
    }
    
    private clearCanvas(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private update(): void {
        this.timer.update();
        this.updateSnowflakes(this.timer);
    }

    private render(): void {
        const ctx = this.ctx;
        this.clearCanvas(ctx);
        this.drawSnowflakes(ctx);
    }

    private play(): void {
        this.update();
        this.render();
        window.requestAnimationFrame(this.play.bind(this));
    }
}
