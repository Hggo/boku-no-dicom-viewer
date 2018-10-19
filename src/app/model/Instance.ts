import { InstanceOrth } from 'src/app/interface/InstanceOrth';
import { TagsOrth } from '../interface/TagsOrth';
import Window from './Window';
import Frame from './Frame';

export default class Instance {

    private _indexInSeries: Number;
    private _id: String;
    private _tags: TagsOrth;
    private _ww: number;
    private _wc: number;

    private _cols: number;
    private _rows: number;

    private _rescaleSlope: number;
    private _rescaleIntercept: number;

    private _hasWindow: Boolean;

    private _windows: Window[];
    private _numberOfFrames: number;

    private _frames: Frame[];

    constructor(instance: InstanceOrth) {
        if (instance) {
            this.copyProperties(instance);
        }
    }

    private copyProperties(instance: InstanceOrth) {
        this._indexInSeries = instance.IndexInSeries;
        this._id = instance.ID;

        if (instance.MainDicomTags.NumberOfFrames) {
            this._numberOfFrames = Number(instance.MainDicomTags.NumberOfFrames);
        } else {
            this._numberOfFrames = 1;
        }

        this._frames = [];

        for (let i = 0; i < this._numberOfFrames; i++) {
            this._frames.push(new Frame(i));
        }
    }

    get id(): String {
        return this._id;
    }

    set id(id: String) {
        this._id = id;
    }

    get indexInSeries(): Number {
        return this._indexInSeries;
    }

    set indexInSeries(indexInSeries: Number) {
        this._indexInSeries = indexInSeries;
    }

    get frames(): Frame[] {
        return this._frames;
    }

    get tags(): TagsOrth {
        return this._tags;
    }

    set tags(tags: TagsOrth) {
        this._tags = tags;
        this.initTags();
    }

    get ww(): number {
        return this._ww;
    }

    set ww(ww: number) {
        this._ww = ww;
    }

    get wc(): number {
        return this._wc;
    }

    set wc(wc: number) {
        this._wc = wc;
    }

    get rows(): number {
        return this._rows;
    }

    set rows(rows: number) {
        this._rows = rows;
    }

    get cols(): number {
        return this._cols;
    }

    set cols(cols: number) {
        this._cols = cols;
    }

    get rescaleSlope(): number {
        return this._rescaleSlope;
    }

    set rescaleSlope(slope: number) {
        this._rescaleSlope = slope;
    }

    get rescaleIntercept(): number {
        return this._rescaleIntercept;
    }

    set rescaleIntercept(intercept: number) {
        this._rescaleIntercept = intercept;
    }

    get hasWindow(): Boolean {
        return this._hasWindow;
    }

    set hasWindow(hasWindow: Boolean) {
        this._hasWindow = hasWindow;
    }

    get windows(): Window[] {
        return this._windows;
    }

    set windows(windows: Window[]) {
        this._windows = windows;
    }

    get numberOfFrames(): number {
        return this._numberOfFrames;
    }

    private initTags() {

        this._windows = [];

        if (this.tags['0028,1051']) {
            this.ww = Number(this.tags['0028,1051'].Value);
            this.wc = Number(this.tags['0028,1050'].Value);

            this._windows.push(new Window(this.ww, this.wc, 'Window 1'));
            this.hasWindow = true;
        }

        if (this.tags['5200,9229']) { // shared group modules

            const sgm = this.tags['5200,9229'].Value;
            if (this.tags['5200,9229'].Value[0]['0028,9132']) { // frame voi lut
                const lut = sgm[0]['0028,9132'].Value[0];

                const ww = Number(lut['0028,1051'].Value);
                const wc = Number(lut['0028,1050'].Value);

                if (!this.hasWindow) {
                    this.ww = ww;
                    this.wc = wc;
                    this.hasWindow = true;
                }

                this._windows.push(new Window(ww, wc, 'Lut 1'));
            }
        }

        try {
            this.rescaleIntercept = Number(this.tags['5200,9229'].Value[0]['0028,9145'].Value[0]['0028,1052'].Value);
            this.rescaleSlope = Number(this.tags['5200,9229'].Value[0]['0028,9145'].Value[0]['0028,1053'].Value);
        } catch (err) {
            this.rescaleSlope = 1;
            this.rescaleIntercept = 0;
        }

        this.cols = Number(this.tags['0028,0011'].Value);
        this.rows = Number(this.tags['0028,0010'].Value);
    }
}
