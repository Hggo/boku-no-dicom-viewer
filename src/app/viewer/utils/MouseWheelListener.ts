export class MouseWheelListener {

    constructor(private renderer: HTMLDivElement, private tratar: Function) {

    }

    mouseWheelHandler = function (e: MouseWheelEvent) {
        if (e.deltaY > 0) {
            this.tratar(1);
        } else {
            this.tratar(-1);
        }
    }.bind(this);

    public listen() {
        this.renderer.addEventListener('wheel', this.mouseWheelHandler);
    }
}
