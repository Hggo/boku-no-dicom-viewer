import { DicomToolbarButton } from './generic/DicomToolbarButton';
import { DicomViewer } from '../../DicomViewer';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { MouseWheelListener } from '../../../utils/MouseWheelListener';

export class ZoomButton extends DicomToolbarButton {

    public wheelListener: MouseWheelListener;

    constructor(dicomViewer: DicomViewer, selecionar: Function) {
        super(faSearchPlus, dicomViewer, selecionar, DicomToolbarButton.WHEELTYPE);
    }

    private treatZoom = function (direction: number) {
        this.dicomViewer.zoom = direction > 0 ? this.dicomViewer.zoom / 1.1 : this.dicomViewer.zoom * 1.1;
        this.dicomViewer.applyDistance();
        requestAnimationFrame(this.dicomViewer.render);
    }.bind(this);

    public treatClick() {
        this.active = true;
        if (!this.wheelListener) {
            this.wheelListener = new MouseWheelListener(this.dicomViewer, this.treatZoom);
            this.wheelListener.listen();
        }
    }

    public removeListeners() {
        if (this.wheelListener) {
            this.wheelListener.removeListeners();
        }
    }
}
