export class CanvasImageData {

    private _imageData: ImageData;

    constructor(private cols: number, private rows: number, private canvasContext: CanvasRenderingContext2D, private pixelData: Uint8Array, private ww: number, private wc: number) {
        this._imageData = canvasContext.createImageData(this.cols, this.rows);

        let counter = 0;

        for (var index = 0; index < this.pixelData.length; index++) {

            let lum = this.applyWindow(pixelData[index], ww, wc);
            let color = 255 - pixelData[++index];

            this._imageData.data[counter++] = lum;
            this._imageData.data[counter++] = lum;
            this._imageData.data[counter++] = lum;
            this._imageData.data[counter++] = color;

        }
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