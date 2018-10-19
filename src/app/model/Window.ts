export default class Window {
    constructor (private _ww: number, private _wc: number, private _description: string) {

    }

    get ww (): number {
        return this._ww;
    }

    set ww (ww: number) {
        this._ww = ww;
    }

    get wc (): number {
        return this._wc;
    }

    set wc (wc: number) {
        this._wc = wc;
    }

    get description (): string {
        return this._description;
    }

    set description (description: string) {
        this._description = description;
    }
}
