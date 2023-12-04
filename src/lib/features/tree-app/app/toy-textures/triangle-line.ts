export const getDefaultTriangleWaveProps = (
	ctx: CanvasRenderingContext2D,
	lineColor: string,
	linesCount: number
) => {
	return {
		ctx,
		frequency: 20,
		amplitude: 30,
		lineColor,
		linesCount
	};
};

export const triangleWaveConstructorProps = {
	frequency: {
		text: 'Частота',
		defaultValue: 20
	},
	amplitude: {
		text: 'Высота волн',
		defaultValue: 20
	},
	lineColor: {
		text: 'Цвет узора',
		defaultValue: 'red'
	},
	linesCount: {
		text: 'Количество линий',
		defaultValue: 10
	}
}

export function drawTriangleWave(
	ctx: CanvasRenderingContext2D,
	frequency: number,
	amplitude: number,
	lineColor: string,
	linesCount = 1
): void {
	const { canvas } = ctx;

	const wavelength = canvas.width / frequency;
	const numTriangles = Math.ceil(canvas.width / wavelength);

	const LINES_OFFSET = canvas.height / 2 / linesCount;
	ctx.lineWidth = 5;
	ctx.strokeStyle = lineColor;

	function drawLine(offset: number) {
		console.log({ offset });
		let startX = 0;
		let startY = canvas.height / 2 + offset;
		ctx.beginPath();
		ctx.moveTo(startX, startY);

		for (let i = 0; i < numTriangles; i++) {
			const tipX = startX + wavelength / 2;
			const tipY = startY - amplitude;

			const endX = startX + wavelength;
			const endY = startY;

			ctx.lineTo(tipX, tipY);
			ctx.lineTo(endX, endY);

			startX = endX;
			startY = endY;
		}
		ctx.moveTo(startX, startY);
		ctx.closePath();
		ctx.stroke();
	}

	for (let i = linesCount; i > 0; i -= 2) {
		if (i === 1) drawLine(0);
		else {
			drawLine(LINES_OFFSET * i);
			drawLine(LINES_OFFSET * i * -1);
		}
	}
}
