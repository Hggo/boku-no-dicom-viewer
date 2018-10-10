import { DicomViewer } from '../objects/DicomViewer';

export class MouseWheelListener {

    constructor(private dicomViewer: DicomViewer, private tratar: Function) {

    }

    mouseWheelHandler = function (e: MouseWheelEvent) {
        if (e.deltaY > 0) {
            this.tratar(1);
        } else {
            this.tratar(-1);
        }
    }.bind(this);

    public listen() {
        this.dicomViewer.webglDiv.addEventListener('wheel', this.mouseWheelHandler);
    }

    public removeListeners() {
        this.dicomViewer.webglDiv.removeEventListener('wheel', this.mouseWheelHandler());
    }
}
