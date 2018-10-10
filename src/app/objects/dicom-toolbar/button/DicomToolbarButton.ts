import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DicomViewer } from '../../DicomViewer';

export class DicomToolbarButton {

    size: string;
    fixedWidth: string;
    active: boolean;

    constructor(public icon: IconDefinition, protected dicomViewer: DicomViewer, private selecionar: Function) {
        this.icon = icon;
        this.size = '1x';
        this.fixedWidth = 'true';
    }

    public click() {
        this.selecionar(this);
        this.treatClick();
    }

    public treatClick() {
        throw new Error('Nor implemented');
    }
}
