import { SerieOrth } from '../interface/orthanc/SerieOrth';
import Instance from './Instance';

export default class Serie {
    public ID: string;
    public InstancesIds: string[];
    public Instances: Instance[];
    public Modality: string;

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
