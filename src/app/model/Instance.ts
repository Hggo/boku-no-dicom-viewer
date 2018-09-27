export default class Instance {

    private _indexInSeries: Number;
    private _id: String;
    private _pixelData: ArrayBuffer;

    constructor(instance){
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
}