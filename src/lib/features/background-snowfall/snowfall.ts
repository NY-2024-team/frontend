import { Timer } from "./timer";

export class Snowfall {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
    public readonly timer = new Timer();

	constructor(canvasRef: HTMLCanvasElement) {
		this.canvas = canvasRef;
        const ctx = this.canvas.getContext('2d');
        if(!ctx) throw new Error('Cannot get context from canvas!');
        this.ctx = ctx;

        this.play();
	}

    private update() {
        this.timer.update();
    }

    private render() {}

    private play() {
        this.update();
        this.render();
        window.requestAnimationFrame(this.play.bind(this));
    }
}
