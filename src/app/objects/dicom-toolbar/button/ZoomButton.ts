import { DicomToolbarButton } from './generic/DicomToolbarButton';
import { DicomViewer } from '../../DicomViewer';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { MouseWheelListener } from '../../../utils/MouseWheelListener';
import { ScrollButton } from './generic/ScroolButton';

export class ZoomButton extends ScrollButton {

    public wheelListener: MouseWheelListener;

    constructor(dicomViewer: DicomViewer, selecionar: Function) {
        super(faSearchPlus, dicomViewer, selecionar);
    }

    protected treatScroll = function (direction: number) {
        this.dicomViewer.zoom = direction > 0 ? this.dicomViewer.zoom / 1.1 : this.dicomViewer.zoom * 1.1;
        this.dicomViewer.applyDistance();
        requestAnimationFrame(this.dicomViewer.render);
    }.bind(this);
}
