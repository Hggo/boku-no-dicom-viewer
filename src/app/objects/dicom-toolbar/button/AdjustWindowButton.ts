import { DicomToolbarButton } from './DicomToolbarButton';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { DicomViewer } from '../../DicomViewer';
import { MouseListener } from '../../../utils/MouseListener';


export class AdjustWindowButton extends DicomToolbarButton {

    public active: boolean;

    constructor(dicomViewer: DicomViewer) {
        super(faAdjust, dicomViewer);
    }
    mouseListener: MouseListener;

    private treatWindow = function (deltaX: number, deltaY: number) {
        this.dicomViewer.instance.ww += (deltaX / 1);
        this.dicomViewer.instance.wc += (deltaY / 1);
        requestAnimationFrame(this.dicomViewer.render);
    }.bind(this);

    public click() {
        this.active = true;
        if (!this.mouseListener) {
            this.mouseListener = new MouseListener(this.dicomViewer, this.treatWindow);
            this.mouseListener.listen();
        }
    }
}
