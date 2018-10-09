import Instance from '../model/Instance';

export class CanvasImageData {

    private _pixelDataUInt;
    private _pixelData;

    constructor(private instance: Instance) {

        let counter = 0;
        const pixelRepresentation = instance.tags['0028,0103'].Value;
        const bitsAlocated = instance.tags['0028,0100'].Value;

        if (pixelRepresentation === '0' && bitsAlocated === '8') {
            this._pixelDataUInt = new Uint8Array(instance.pixelData);
        } else if (pixelRepresentation === '1' && bitsAlocated === '8') {
            this._pixelDataUInt = new Int8Array(instance.pixelData);
        } else if (pixelRepresentation === '0' && bitsAlocated === '16') {
            this._pixelDataUInt = new Uint16Array(instance.pixelData);
        } else if (pixelRepresentation === '1' && bitsAlocated === '16') {
            this._pixelDataUInt = new Int16Array(instance.pixelData);
        }

        this._pixelData = new Uint8Array(instance.cols * instance.rows * 4);

        for (let index = 0; index < this._pixelDataUInt.length; index++) {

            let lum = this.applyWindowIfExistent(this.applyRescale(this._pixelDataUInt[index]), instance.ww, instance.wc);

            lum = this.applyPhotometricInterpretation(lum);

            this._pixelData[counter++] = lum;
            this._pixelData[counter++] = lum;
            this._pixelData[counter++] = lum;
            this._pixelData[counter++] = 255;
        }
    }

    private applyPhotometricInterpretation(pixel: number): number {
        if (this.instance.tags['0028,0004'].Value === 'MONOCHROME1') {
            return 255 - pixel;
        } else {
            return pixel;
        }
    }

    private applyWindowIfExistent(x, w, c) {
        if (this.instance.hasWindow) {
            return this.applyWindow(x, w, c);
        }

        return x;
    }

    private applyRescale (x): number {
        return x * this.instance.rescaleSlope + this.instance.rescaleIntercept;
    }

    private applyWindow(x, w, c) {

        const yMax = 255;
        const yMin = 0;

        const xMin = c - 0.5 - (w - 1) / 2;
        const xMax = c - 0.5 + (w - 1) / 2;

        if (x <= xMin) {
            return yMin;
        } else if (x > xMax) {
            return yMax;
             } else {
            return ((x - (c - 0.5)) / (w - 1) + 0.5) * (yMax - yMin) + yMin;
             }
    }

    get imageData() {
        return this._pixelData;
    }
}
