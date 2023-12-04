export abstract class Pattern {
    public abstract readonly kind: string;
    public abstract draw(ctx: CanvasRenderingContext2D): void;
}