export default class ViewportAnnotations {

    public ww: number;
    public wc: number;
    public patientName: String;
    public institutionName: String;
    public totalFrames: number;
    public indexFrames: number;
    public zoom: number = 1;

    constructor () {
    }

    get currentZoom(): number {
        return Math.ceil(this.zoom * 100) / 100;
    }

    get frame (): String {
        return this.indexFrames + 1 + '/' + this.totalFrames;
    }
}
