import { ScrollButton } from './generic/ScroolButton';
import { DicomViewer } from '../../DicomViewer';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

export default class SeriesScrollButton extends ScrollButton {
    constructor (dicomViewer: DicomViewer, selecionar: Function) {
        super(faLayerGroup, dicomViewer, selecionar);
    }

    protected treatScroll = function (direction: number) {

        if (direction > 0) {
            this.dicomViewer.frameIndex = this.dicomViewer.frameIndex > 0 ? this.dicomViewer.frameIndex - 1 : this.dicomViewer.frameIndex;
        } else {
            this.dicomViewer.frameIndex = this.dicomViewer.frameIndex < this.dicomViewer.instance.numberOfFrames - 1 ?
                                          this.dicomViewer.frameIndex + 1 : this.dicomViewer.frameIndex;
        }

        this.dicomViewer.updateAnnotations();
        requestAnimationFrame(this.dicomViewer.render);
    }.bind(this);
}
