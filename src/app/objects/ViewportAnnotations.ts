export default class ViewportAnnotations {
    
    public ww: number;
    public wc: number;
    private _zoom: number;
    public patientName: String;
    public institutionName: String;
    public totalFrames: number;
    public indexFrames: number;

    constructor () {
         this._zoom = 1;
    }

    get zoom(): number {
        return Math.ceil(this._zoom * 100) / 100;
    }

    set zoom(zoom: number) {
        this._zoom = zoom;
    }

    get frame (): String {
        return this.indexFrames + '/' + this.totalFrames;
    }
}
