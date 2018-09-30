import { InstanceOrth } from "src/app/interface/InstanceOrth";

export default class Instance {

    private _indexInSeries: Number;
    private _id: String;
    private _pixelData: Uint8Array;

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

    get pixelData(): Uint8Array {
        return this._pixelData;
    }

    set pixelData(pixelData: Uint8Array) {
        this._pixelData = pixelData;
    }
}