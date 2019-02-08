import { InstanceOrth } from 'src/app/interface/orthanc/InstanceOrth';
import { TagsSimpleOrth } from '../interface/orthanc/TagsSimpleOrth';
import Window from './Window';
import Frame from './Frame';

export default class Instance {
    public indexInSeries: number;
    public id: string;
    public ww: number;
    public wc: number;
    public cols: number;
    public rows: number;
    public rescaleSlope: number;
    public rescaleIntercept: number;
    public hasWindow: Boolean;
    public windows: Window[];
    public numberOfFrames: number;
    public frames: Frame[];
    public pixelRepresentation: number;
    public bitsAlocated: number;
    public photometricInterpretation: number;
    constructor(instance: InstanceOrth) {
        if (instance) {
            this.copyProperties(instance);
        }
    }

    private copyProperties(instance: InstanceOrth) {
        this.indexInSeries = instance.IndexInSeries;
        this.id = instance.ID;
        if (instance.MainDicomTags.NumberOfFrames) {
            this.numberOfFrames = Number(instance.MainDicomTags.NumberOfFrames);
        } else {
            this.numberOfFrames = 1;
        }
        this.frames = [];
        for (let i = 0; i < this.numberOfFrames; i++) {
            this.frames.push(new Frame(i));
        }
    }

    public initTags(tags: TagsSimpleOrth) {
        this.windows = [];
        if (tags.WindowCenter) {
            this.ww = Number(tags.WindowWidth);
            this.wc = Number(tags.WindowCenter);
            this.windows.push(new Window(this.ww, this.wc, 'Window 1'));
            this.hasWindow = true;
        }
        if (tags.RescaleIntercept !== undefined && tags.RescaleIntercept !== '') {
            this.rescaleIntercept = Number(tags.RescaleIntercept);
            this.rescaleSlope = Number(tags.RescaleSlope);
        } else {
            this.rescaleSlope = 1;
            this.rescaleIntercept = 0;
        }
        this.cols = Number(tags.Columns);
        this.rows = Number(tags.Rows);
        this.pixelRepresentation = Number(tags.PixelRepresentation);
        this.bitsAlocated = Number(tags.BitsAllocated);
        this.photometricInterpretation = (tags.PhotometricInterpretation === 'MONOCHROME2') ? 1 : 0;
    }
}
