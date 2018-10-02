export class MouseListener {

    private lastX: number;
    private lastY: number;

    constructor(private canvas: HTMLCanvasElement, private tratar: Function) {

    }

    public listen() {
        this.canvas.addEventListener('mousedown', function (e) {
            this.lastX = e.pageX;
            this.lastY = e.pageY;

            this.handle_keydown(e);
        }.bind(this));
    }

    handle_keydown = function (e) {
        this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
        this.canvas.addEventListener('mouseup', this.mouseUpHandler);
    }.bind(this);

    mouseUpHandler = function (e) {
        this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
        this.canvas.removeEventListener('mouseup', this.mouseUpHandler);
    }.bind(this);

    mouseMoveHandler = function (e) {
        const deltaX = e.pageX - this.lastX;
        const deltaY = e.pageY - this.lastY;
        this.lastX = e.pageX;
        this.lastY = e.pageY;

        this.tratar(deltaX, deltaX);
    }.bind(this);
}