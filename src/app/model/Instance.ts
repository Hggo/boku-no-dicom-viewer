import { InstanceOrth } from "src/app/interface/InstanceOrth";
import { TagsOrth } from "../interface/TagsOrth";

export default class Instance {

    private _indexInSeries: Number;
    private _id: String;
    private _pixelData: ArrayBuffer;
    private _tags: TagsOrth;
    private _ww: number;
    private _wc: number;

    private _cols: number;
    private _rows: number;

    constructor(instance: InstanceOrth = undefined){
        if(instance){
            this.copyProperties(instance);
        }
    }

    private copyProperties(instance: InstanceOrth){
        this._indexInSeries = instance.IndexInSeries;
        this._id = instance.ID;
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

    get pixelData(): ArrayBuffer {
        return this._pixelData;
    }

    set pixelData(pixelData: ArrayBuffer) {
        this._pixelData = pixelData;
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
    
    private initTags(){
        this.ww = Number(this.tags["0028,1051"].Value);
        this.wc = Number(this.tags["0028,1050"].Value);

        this.cols = Number(this.tags["0028,0011"].Value);
        this.rows = Number(this.tags["0028,0010"].Value);
    }
}