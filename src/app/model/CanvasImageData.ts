export class CanvasImageData {
    
    private _imageData: ImageData;

    constructor(private cols: number, private rows: number, private canvasContext: CanvasRenderingContext2D, private pixelData: Uint8Array, private ww: number, private wc: number){
        this._imageData = canvasContext.createImageData(this.cols, this.rows);
        
            let counter = 0;

            for(var index = 0; index < pixelData.length; index++){
                this._imageData.data[counter++] = this.applyWindow(pixelData[index], ww, wc);
                this._imageData.data[counter++] = this.applyWindow(pixelData[index], ww, wc);
                this._imageData.data[counter++] = this.applyWindow(pixelData[index], ww, wc);
                this._imageData.data[counter++] = 255;
            }
    }

    private applyWindow(x, w, c){

        let min = c - w / 2;
        let max = c + w / 2;

        if (x <= (c - 0.5 - (w-1)/2))
            return min;
        else if (x > (c - 0.5 + (w-1)/2))
            return max;
        else 
            return ((x - (c - 0.5)) / (w-1) + 0.5) * (max - min) + min;
    }

    get imageData(){
        return this._imageData;
    }
}