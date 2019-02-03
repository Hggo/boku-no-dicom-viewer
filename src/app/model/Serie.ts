import { SerieOrth } from '../interface/orthanc/SerieOrth';
import Instance from './Instance';

export default class Serie {
    public ID: String;
    public InstancesIds: String[];
    public Instances: Instance[];
    public Modality: String;

    constructor(serie: SerieOrth) {
        if (serie) {
            this.copyProperties(serie);
        }
    }

    private copyProperties(serie: SerieOrth) {
        this.ID = serie.MainDicomTags.SeriesInstanceUID;
        this.InstancesIds = serie.Instances;
        this.Modality = serie.MainDicomTags.Modality;
    }
}
