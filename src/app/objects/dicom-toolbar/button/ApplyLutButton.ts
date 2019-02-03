import { DicomViewer } from '../../DicomViewer';
import { DicomToolbarButton } from './generic/DicomToolbarButton';
import Window from '../../../model/Window';

export class ApplyLutButton extends DicomToolbarButton {
    constructor(dicomViewer: DicomViewer, private window: Window) {
        super(null, dicomViewer, null, DicomToolbarButton.APPLYONCLICKTYPE);
        this.title = window.description;
        this.selectable = false;
    }

    public treatClick() {
        this.dicomViewer.instance.ww = this.window.ww;
        this.dicomViewer.instance.wc = this.window.wc;
        this.dicomViewer.render();
    }
}
