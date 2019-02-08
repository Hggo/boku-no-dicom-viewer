import Instance from '../model/Instance';

export class CanvasImageData {
    private pixelDataUInt;
    private pixelData;

    constructor(private instance: Instance, frameIndex: number) {
        let counter = 0;
        const pixelRepresentation = instance.pixelRepresentation;
        const bitsAlocated = instance.bitsAlocated;
        const pixelData = instance.frames[frameIndex].pixelData;
        if (pixelRepresentation === 0 && bitsAlocated === 8) {
            this.pixelDataUInt = new Uint8Array(pixelData);
        } else if (pixelRepresentation === 1 && bitsAlocated === 8) {
            this.pixelDataUInt = new Int8Array(pixelData);
        } else if (pixelRepresentation === 0 && bitsAlocated === 16) {
            this.pixelDataUInt = new Uint16Array(pixelData);
        } else if (pixelRepresentation === 1 && bitsAlocated === 16) {
            this.pixelDataUInt = new Int16Array(pixelData);
        }
        this.pixelData = new Uint8Array(instance.cols * instance.rows * 4);
        for (let index = 0; index < this.pixelDataUInt.length; index++) {
            let lum = this.applyWindowIfExistent(this.applyRescale(this.pixelDataUInt[index]), instance.ww, instance.wc);
            lum = this.applyPhotometricInterpretation(lum);
            this.pixelData[counter++] = lum;
            this.pixelData[counter++] = lum;
            this.pixelData[counter++] = lum;
            this.pixelData[counter++] = 255;
        }
    }

    private applyPhotometricInterpretation(pixel: number): number {
        if (this.instance.photometricInterpretation === 0) {
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
        return this.pixelData;
    }
}
