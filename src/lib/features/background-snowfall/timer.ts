export class Timer {
    private _dt = 0;
    private _elapsedTime = 0;
    private last = Date.now();

    public get elapsedTime() {
        return this._elapsedTime;
    }
    public get dt() {
        return this._dt;
    }

    public update() {
        const now = Date.now();
        const dt = (now - this.last) / 1000;
        this._dt = dt;
        this._elapsedTime += dt;
        this.last = now;
    };
}