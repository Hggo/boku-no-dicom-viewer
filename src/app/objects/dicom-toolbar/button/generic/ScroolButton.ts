import { DicomToolbarButton } from "./DicomToolbarButton";
import { MouseWheelListener } from "../../../../utils/MouseWheelListener";
import { DicomViewer } from "../../../DicomViewer";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export class ScrollButton extends DicomToolbarButton {
    protected wheelListener: MouseWheelListener;

    constructor(icon: IconDefinition, dicomViewer: DicomViewer, selecionar: Function) {
        super(icon, dicomViewer, selecionar, DicomToolbarButton.WHEELTYPE);
    }

    public treatClick() {
        this.active = true;
        if (!this.wheelListener) {
            this.wheelListener = new MouseWheelListener(this.dicomViewer, this.treatScroll);
            this.wheelListener.listen();
        }
    }

    public removeListeners() {
        if (this.wheelListener) {
            this.wheelListener.removeListeners();
        }
    }

    protected treatScroll = function(direction: number) {
        throw new Error('Not implemented');
    }.bind(this);
}
