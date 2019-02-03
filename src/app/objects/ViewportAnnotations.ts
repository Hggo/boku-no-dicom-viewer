export default class ViewportAnnotations {
    public ww: number;
    public wc: number;
    public patientName: string;
    public institutionName: string;
    public totalFrames: number;
    public indexFrames: number;
    public zoom: number = 1;

    constructor () {
    }

    get currentZoom(): number {
        return Math.ceil(this.zoom * 100) / 100;
    }

    get frame (): string {
        return this.indexFrames + 1 + '/' + this.totalFrames;
    }
}
