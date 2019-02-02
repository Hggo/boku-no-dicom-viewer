import Window from './Window';
import Frame from './Frame';
import { TagsOrth } from 'src/app/interface/orthanc/TagsOrth';
import { InstanceOrth } from 'src/app/interface/orthanc/InstanceOrth';

export default class Instance {
    public indexInSeries: Number;
    public id: String;
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
    
    public initTags(tags: TagsOrth) {
        this.windows = [];
        if (tags['0028,1051']) {
            this.ww = Number(tags['0028,1051'].Value);
            this.wc = Number(tags['0028,1050'].Value);
            this.windows.push(new Window(this.ww, this.wc, 'Window 1'));
            this.hasWindow = true;
        }
        if (tags['5200,9229']) {
            const sgm = tags['5200,9229'].Value;
            if (tags['5200,9229'].Value[0]['0028,9132']) {
                const lut = sgm[0]['0028,9132'].Value[0];
                const ww = Number(lut['0028,1051'].Value);
                const wc = Number(lut['0028,1050'].Value);
                if (!this.hasWindow) {
                    this.ww = ww;
                    this.wc = wc;
                    this.hasWindow = true;
                }
                this.windows.push(new Window(ww, wc, 'Lut 1'));
            }
        }

        try {
            this.rescaleIntercept = Number(tags['5200,9229'].Value[0]['0028,9145'].Value[0]['0028,1052'].Value);
            this.rescaleSlope = Number(tags['5200,9229'].Value[0]['0028,9145'].Value[0]['0028,1053'].Value);
        } catch (err) {
            this.rescaleSlope = 1;
            this.rescaleIntercept = 0;
        }
        this.cols = Number(tags['0028,0011'].Value);
        this.rows = Number(tags['0028,0010'].Value);
        this.pixelRepresentation = Number(tags['0028,0103'].Value);
        this.bitsAlocated = Number(tags['0028,0100'].Value);
        this.photometricInterpretation = Number(tags['0028,0004'].Value);
    }
}
