export default class Frame {

    private _pixelData: ArrayBuffer;

    constructor (private _index: number) {

    }

    get index (): number {
        return this._index
    }

    get pixelData (): ArrayBuffer {
        return this._pixelData;
    }

    set pixelData (pixelData: ArrayBuffer) {
        this._pixelData = pixelData;
    }
}
