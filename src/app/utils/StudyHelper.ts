import { StudyService } from '../service/study.service';
import Study from '../model/Study';
import Serie from '../model/Serie';
import Frame from '../model/Frame';
import Instance from '../model/Instance';
import Thumbnail from '../objects/Thumbnail';

export default class StudyHelper {
    constructor(private study: Study, private studyService: StudyService, private firstTrigger: Function) {
    }

    public loadStudy (study: Study, loadedMetadata: (study: Study) => void) {
        this.studyService.getSeriesFromStudy(this.study).then(series => {
            study.series = series;
            let loaded = 0;
            study.series.forEach(serie => {
                this.studyService.getInstancesFromSerie(serie).then(instances => {
                    serie.Instances = instances;
                    const firstInstance = instances[0];
                    const url: string = this.studyService.getPreview(firstInstance.id, 0);
                    const thumb = new Thumbnail(url, serie.Modality, 0, 0);
                    serie.thumb = thumb;
                    if (++loaded === series.length) {
                         loadedMetadata(study);
                    }
                });
            });
        });
    }

    public loadSerie (serie: Serie, loadedSerie: (serie: Serie) => void) {
        let loadedInstances = 0;
        serie.Instances.forEach(instance => {
            this.resolveTags(instance).then(tags => {
                instance.initTags(tags);
                let loadedFrames = 0;
                for (let k = 0; k < instance.numberOfFrames; k++) {
                    this.resolvePixelData(instance, serie.SeriesNumber, instance.indexInSeries, k).then(pd => {
                        instance.frames = [];
                        if (++loadedFrames === instance.numberOfFrames) {
                            const frame = new Frame(loadedFrames);
                            frame.pixelData = pd;
                            instance.frames.push(frame);
                            if (++loadedInstances === serie.Instances.length) {
                                loadedSerie(serie);
                            }
                        }
                    });
                }
            });
        });
    }

    private resolvePixelData(instance: Instance, serieN: number, instN: number, frameN: number): Promise<ArrayBuffer> {
        return new Promise (resolve => this.studyService.getPixelData(instance, frameN).then(frame => resolve(frame)));
    }

    private resolveTags(instance: Instance) {
        return this.studyService.getTags(instance);
    }
}
