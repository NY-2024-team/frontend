import { drawLine } from "./line";
import { drawTriangleWave } from "./triangle-line";

const handlers = {
    line_triangle: drawTriangleWave,
    line: drawLine
} as const;

type Handlers = typeof handlers;

type HandlersKeys = keyof Handlers;

export type HandlersParams<K extends HandlersKeys> = Parameters<Handlers[K]>;

function getPattern<K extends HandlersKeys>(k: K, v: HandlersParams<K>): void {
    (handlers[k] as (...args: HandlersParams<K>) => void)(...v);
}

export { getPattern };
