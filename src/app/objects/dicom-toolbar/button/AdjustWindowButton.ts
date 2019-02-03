import { DicomToolbarButton } from './generic/DicomToolbarButton';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { DicomViewer } from '../../DicomViewer';
import { MouseClickAndDragButton } from './generic/MouseClickAndDragButton';

export class AdjustWindowButton extends MouseClickAndDragButton {
    constructor(dicomViewer: DicomViewer, selecionar: Function) {
        super(faAdjust, dicomViewer, selecionar, DicomToolbarButton.CLICKTYPE);
    }

    protected treatDrag = function (deltaX: number, deltaY: number) {
        this.dicomViewer.instance.ww += (deltaX / 1);
        this.dicomViewer.instance.wc += (deltaY / 1);
        requestAnimationFrame(this.dicomViewer.render);
    }.bind(this);
}
