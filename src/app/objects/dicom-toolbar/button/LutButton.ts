import { DicomViewer } from '../../DicomViewer';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { DicomToolbarButton } from './generic/DicomToolbarButton';
import { ApplyLutButton } from './ApplyLutButton';

export class LutButton extends DicomToolbarButton {
    constructor(dicomViewer: DicomViewer, selecionar: Function) {
        super(faAdjust, dicomViewer, selecionar, DicomToolbarButton.DROPDOWNTYPE);
        this.class = 'yellow';
        this.buttons = [];
        this.selectable = false;
        if (dicomViewer.instance.hasWindow) {
            dicomViewer.instance.windows.forEach(window => this.buttons.push(new ApplyLutButton(dicomViewer, window)));
        }
    }
}
