import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export class DicomToolbarButton {

    size: string;
    fixedWidth: string;

    constructor(public icon: IconDefinition) {
        this.icon = icon;
        this.size = '1x';
        this.fixedWidth = 'true';
    }
}
