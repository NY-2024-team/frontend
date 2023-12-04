import { Pattern } from '../pattern';

interface LinePatternProperties {
	count?: number;
	color?: string;
	lineWidth?: number;
	distanceBetweenLines?: number;
    offsetY?: number
}

const defaultProperties: Required<LinePatternProperties> = {
	color: 'yellow',
	count: 3,
	lineWidth: 30,
	distanceBetweenLines: 100,
    offsetY: 0
};

export class LinePattern extends Pattern {
	public readonly kind: string = 'LINE';
	public readonly count: number = 4;
	public readonly color: string = 'yellow';
	public readonly lineWidth: number = 30;
	public readonly distanceBetweenLines: number = 100;
    public readonly offsetY: number = 0;

	constructor(props?: LinePatternProperties) {
		super();
		this.count = props?.count ?? defaultProperties.count;
		this.color = props?.color ?? defaultProperties.color;
		this.lineWidth = props?.lineWidth ?? defaultProperties.lineWidth;
		this.distanceBetweenLines =
			props?.distanceBetweenLines ?? defaultProperties.distanceBetweenLines;
        this.offsetY = props?.offsetY ?? defaultProperties.offsetY
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		const { canvas } = ctx;
		const isEven = this.count % 2 === 0;

		/* If count is not even then render one line at middle of the toy */
		if (!isEven) {
			this.drawLine(ctx, canvas.height / 2);
		}

		const linesToRender = isEven || this.count === 1 ? this.count : this.count - 1;
		for (let i = linesToRender, count = 1; i > 0; i -= 2, count++) {
			if (this.count === 1) {
				this.drawLine(ctx, canvas.height / 2);
				break;
			}
			const distanceFromMiddle = (this.distanceBetweenLines * count) + this.offsetY;
			/* Render two times (to top from middle, and to bottom from middle) */
			this.drawLine(ctx, canvas.height / 2 + distanceFromMiddle);
			this.drawLine(ctx, canvas.height / 2 - distanceFromMiddle);
		}
	}

	private drawLine(ctx: CanvasRenderingContext2D, y: number) {
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.color;

		/* Line path */
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(ctx.canvas.width, y);
		ctx.closePath();

		/* Rendering */
		ctx.stroke();
	}
}
