import { DicomToolbarButton } from './generic/DicomToolbarButton';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { DicomViewer } from '../../DicomViewer';
import { MouseClickAndDragButton } from './generic/MouseClickAndDragButton';


export class PanButton extends MouseClickAndDragButton {

    constructor(dicomViewer: DicomViewer, selecionar: Function) {
        super(faArrowsAlt, dicomViewer, selecionar, DicomToolbarButton.CLICKTYPE);
    }

    protected treatDrag = function (deltaX: number, deltaY: number) {
        this.dicomViewer.panx -= deltaX;
        this.dicomViewer.pany += deltaY;
        requestAnimationFrame(this.dicomViewer.render);
    }.bind(this);
}
