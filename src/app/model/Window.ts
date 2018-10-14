export default class Window {
    constructor (private _ww: number, private _wc: number, private _description) {

    }

    get ww (): number{
        return this._ww;
    }

    set ww (ww: number) {
        this._ww = ww;
    }

    get wc (): number{
        return this._wc;
    }

    set wc (wc: number) {
        this._wc = wc;
    }

    get description (): number{
        return this._description;
    }

    set description (description: number) {
        this._description = description;
    }
}
