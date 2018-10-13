export default class ViewportAnnotations {
    
    public ww: number;
    public wc: number;
    private _zoom: number;
    public patientName: String;
    public institutionName: String;

    constructor () {
         this._zoom = 1;
    }

    get zoom(): number{
        return Math.ceil(this._zoom * 100) / 100;
    }

    set zoom(zoom: number){
        this._zoom = zoom;
    }
}
