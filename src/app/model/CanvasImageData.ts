import Instance from "./Instance";

export class CanvasImageData {

    private _imageData: ImageData;
    private _pixelDataUInt;

    constructor(private instance: Instance, private canvasContext: CanvasRenderingContext2D) {
        this._imageData = canvasContext.createImageData(instance.cols, instance.rows);

        let counter = 0;
        let pixelRepresentation = instance.tags["0028,0103"].Value;
        let bitsAlocated = instance.tags["0028,0100"].Value;

        if (pixelRepresentation == "0" && bitsAlocated == "8") {
            this._pixelDataUInt = new Uint8Array(instance.pixelData);
        } else if (pixelRepresentation == "1" && bitsAlocated == "8") {
            this._pixelDataUInt = new Int8Array(instance.pixelData);
        } else if (pixelRepresentation == "0" && bitsAlocated == "16") {
            this._pixelDataUInt = new Uint16Array(instance.pixelData);
        } else if (pixelRepresentation == "1" && bitsAlocated == "16") {
            this._pixelDataUInt = new Int16Array(instance.pixelData);
        }

        for (var index = 0; index < this._pixelDataUInt.length; index++) {

            let lum = this.applyWindow(this._pixelDataUInt[index], instance.ww, instance.wc);

            lum = this.applyPhotometricInterpretation(lum);

            this._imageData.data[counter++] = lum;
            this._imageData.data[counter++] = lum;
            this._imageData.data[counter++] = lum;
            this._imageData.data[counter++] = 255;
        }
    }

    private applyPhotometricInterpretation(pixel: number): number{
        if(this.instance.tags["0028,0004"].Value == "MONOCHROME1")
            return 255 - pixel;
        else
            return pixel;
    }

    private applyWindow(x, w, c) {

        let yMax = 255;
        let yMin = 0;

        var xMin = c - 0.5 - (w - 1) / 2;
        var xMax = c - 0.5 + (w - 1) / 2;

        if (x <= xMin)
            return yMin;
        else if (x > xMax)
            return yMax;
        else
            return ((x - (c - 0.5)) / (w - 1) + 0.5) * (yMax - yMin) + yMin;
    }

    get imageData() {
        return this._imageData;
    }
}