import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DicomViewer } from '../../../DicomViewer';

export class DicomToolbarButton {

    public static CLICKTYPE = 0;
    public static WHEELTYPE = 1;
    public static DROPDOWNTYPE = 2;
    public static APPLYONCLICKTYPE = 4;

    size: string;
    fixedWidth: string;
    active: boolean;
    class: string;
    buttons: DicomToolbarButton[];
    title: String;
    selectable: Boolean;

    constructor(public icon: IconDefinition, protected dicomViewer: DicomViewer, private selecionar: Function, public type: Number) {
        this.icon = icon;
        this.size = '1x';
        this.fixedWidth = 'true';
        this.class = 'white';
        this.selectable = true;
    }

    public click() {
        if(this.selectable) {
            this.selecionar(this);
        }
        this.treatClick();
    }

    public treatClick() {
        throw new Error('Not implemented');
    }

    public removeListeners() {
        throw new Error('Not implemented');
    }
}
