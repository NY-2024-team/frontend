export function drawLine(ctx: CanvasRenderingContext2D, width: number, lineColor: string): void {
    const {canvas} = ctx;

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = width;
    ctx.moveTo(0, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height / 2);
    ctx.closePath();
    ctx.stroke();
    
}