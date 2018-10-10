import { DicomToolbarButton } from './DicomToolbarButton';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { DicomViewer } from '../../DicomViewer';
import { MouseListener } from '../../../utils/MouseListener';


export class PanButton extends DicomToolbarButton {

    public active: boolean;

    constructor(dicomViewer: DicomViewer, selecionar: Function) {
        super(faArrowsAlt, dicomViewer, selecionar, DicomToolbarButton.CLICKTYPE);
    }
    mouseListener: MouseListener;

    private treatPan = function (deltaX: number, deltaY: number) {
        this.dicomViewer.panx -= deltaX;
        this.dicomViewer.pany += deltaY;
        console.log(deltaY);
        requestAnimationFrame(this.dicomViewer.render);
    }.bind(this);

    public treatClick() {
        if (!this.mouseListener) {
            this.mouseListener = new MouseListener(this.dicomViewer, this.treatPan);
            this.mouseListener.listen();
        }
    }
}
