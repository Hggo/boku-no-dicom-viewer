import { DicomViewer } from '../objects/DicomViewer';

export class MouseListener {

    constructor(private dicomViewer: DicomViewer, private tratar: Function) {

    }

    private lastX: number;
    private lastY: number;

    handle_keydown = function (e) {
        this.dicomViewer.webglDiv.addEventListener('mousemove', this.mouseMoveHandler);
        this.dicomViewer.webglDiv.addEventListener('mouseup', this.mouseUpHandler);
    }.bind(this);

    mouseUpHandler = function (e) {
        this.dicomViewer.webglDiv.removeEventListener('mousemove', this.mouseMoveHandler);
        this.dicomViewer.webglDiv.removeEventListener('mouseup', this.mouseUpHandler);
    }.bind(this);

    mouseMoveHandler = function (e) {
        const deltaX = e.pageX - this.lastX;
        const deltaY = e.pageY - this.lastY;
        this.lastX = e.pageX;
        this.lastY = e.pageY;

        this.tratar(deltaX, deltaY);
    }.bind(this);

    applyListen =  function (e) {
        this.lastX = e.pageX;
        this.lastY = e.pageY;

        this.handle_keydown(e);
    }.bind(this);

    public listen() {
        this.dicomViewer.webglDiv.addEventListener('mousedown', this.applyListen);
    }

    public removeListeners() {
        this.dicomViewer.webglDiv.removeEventListener('mousedown', this.applyListen);
    }
}
