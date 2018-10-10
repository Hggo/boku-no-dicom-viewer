import { MouseListener } from '../../../../utils/MouseListener';
import { DicomToolbarButton } from './DicomToolbarButton';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { DicomViewer } from '../../../DicomViewer';

export abstract class MouseClickAndDragButton extends DicomToolbarButton {

    constructor (icon: IconDefinition, dicomViewer: DicomViewer, selecionar: Function, type: Number) {
        super(icon, dicomViewer, selecionar, DicomToolbarButton.CLICKTYPE);
    }

    protected mouseListener: MouseListener;

    protected treatDrag = function (deltaX: number, deltaY: number) {
        throw new Error('Not implemented');
    }.bind(this);

    public removeListeners() {
        if (this.mouseListener) {
            this.mouseListener.removeListeners();
            this.mouseListener = null;
        }
    }

    public treatClick() {
        if (!this.mouseListener) {
            this.mouseListener = new MouseListener(this.dicomViewer, this.treatDrag);
            this.mouseListener.listen();
        }
    }
}
