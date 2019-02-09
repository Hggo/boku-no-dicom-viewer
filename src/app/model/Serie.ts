import { SerieOrth } from '../interface/orthanc/SerieOrth';
import Instance from './Instance';
import Thumbnail from '../objects/Thumbnail';

export default class Serie {
    public SeriesNumber: number;
    public ID: string;
    public InstancesIds: string[];
    public Instances: Instance[];
    public Modality: string;
    public thumb: Thumbnail;

    constructor(serie: SerieOrth) {
        if (serie) {
            this.copyProperties(serie);
        }
    }

    private copyProperties(serie: SerieOrth) {
        this.ID = serie.MainDicomTags.SeriesInstanceUID;
        this.InstancesIds = serie.Instances;
        this.Modality = serie.MainDicomTags.Modality;
        this.SeriesNumber = Number(serie.MainDicomTags.SeriesNumber);
    }
}
