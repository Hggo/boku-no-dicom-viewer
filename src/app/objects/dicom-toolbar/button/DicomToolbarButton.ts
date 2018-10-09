import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DicomViewer } from '../../DicomViewer';

export class DicomToolbarButton {

    size: string;
    fixedWidth: string;

    constructor(public icon: IconDefinition, protected dicomViewer: DicomViewer) {
        this.icon = icon;
        this.size = '1x';
        this.fixedWidth = 'true';
    }

    public click() {
        throw new Error('Not implemented');
    }
}
