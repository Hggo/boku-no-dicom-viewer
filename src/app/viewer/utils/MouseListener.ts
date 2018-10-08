export class MouseListener {

    private lastX: number;
    private lastY: number;

    constructor(private renderer: HTMLDivElement, private tratar: Function) {

    }

    public listen() {
        this.renderer.addEventListener('mousedown', function (e) {
            this.lastX = e.pageX;
            this.lastY = e.pageY;

            this.handle_keydown(e);
        }.bind(this));
    }

    handle_keydown = function (e) {
        this.renderer.addEventListener('mousemove', this.mouseMoveHandler);
        this.renderer.addEventListener('mouseup', this.mouseUpHandler);
    }.bind(this);

    mouseUpHandler = function (e) {
        this.renderer.removeEventListener('mousemove', this.mouseMoveHandler);
        this.renderer.removeEventListener('mouseup', this.mouseUpHandler);
    }.bind(this);

    mouseMoveHandler = function (e) {
        const deltaX = e.pageX - this.lastX;
        const deltaY = e.pageY - this.lastY;
        this.lastX = e.pageX;
        this.lastY = e.pageY;

        this.tratar(deltaX, deltaX);
    }.bind(this);
}