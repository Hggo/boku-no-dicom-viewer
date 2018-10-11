import { SerieOrth } from '../interface/SerieOrth';
import Instance from './Instance';

export default class Serie {

    private _ID: String;
    private _InstancesIds: String[];
    private _Instances: Instance[];
    private _Modality: String;

    constructor(serie: SerieOrth) {
        if (serie) {
            this.copyProperties(serie);
        }
    }

    private copyProperties(serie: SerieOrth) {
        this._ID = serie.MainDicomTags.SeriesInstanceUID;
        this._InstancesIds = serie.Instances;
        this._Modality = serie.MainDicomTags.Modality;
    }

    public get ID(): String {
        return this._ID;
    }

    public set ID(id: String) {
        this._ID = id;
    }

    public get InstancesIds(): String[] {
        return this._InstancesIds;
    }

    public set InstancesIds(InstancesIds: String[]) {
        this._InstancesIds = InstancesIds;
    }

    public get Instances(): Instance[] {
        return this._Instances;
    }

    public set Instances(Instances: Instance[]) {
        this._Instances = Instances;
    }

    public get modality(): String {
        return this._Modality;
    }

    public set modality(modality: String) {
        this._Modality = modality;
    }
}
