import Serie from '../model/Serie';
import { StudyService } from '../service/study.service';
import Study from '../model/Study';
import Instance from '../model/Instance';

export default class StudyHelper {

    private resolvedFirst: boolean;

    constructor(private study: Study, private studyService: StudyService, private firstTrigger: Function, private finalTrigger: Function) {
        this.resolvedFirst = false;
    }

    public prepareStudy() {
        this.studyService.getSeriesFromStudy(this.study).then(series => {
            this.study.series = series;
            this.resolveFirstSerie();
        });
    }

    private resolveFirstSerie() {
        this.studyService.getInstancesFromSerie(this.study.series[0])
            .then(instances => this.resolveFirstInstance(instances));
    }

    private resolveFirstInstance(instances: Instance[]) {
        this.study.series[0].Instances = instances;
        this.resolvePixelData(this.study.series[0].Instances[0], 0, 0, 0);
    }

    private resolvePixelData(instance: Instance, serieN: number, instN: number, frameN: number) {
        this.studyService.getPixelData(instance, frameN).then(instpd => {
            instance = instpd;
            this.resolveTags(instance, 0, 0);
        });
    }

    private resolveTags(instance: Instance, serieN: Number, instN: Number) {
        this.studyService.getTags(instance).then(insttags => {
            instance = insttags;
            if (!this.resolvedFirst) {
                this.resolvedFirst = true;
                this.firstTrigger(this.study);
                this.resolveTheRest();
            } else {
                this.finalTrigger(instance, serieN, instN);
            }
        });
    }

    private resolveTheRest() {
        for (let i = 0; i < this.study.series.length; i++) {
            for (let j = 0; j < this.study.series[i].Instances.length; j++) {
                for (let k = 1; k < this.study.series[i].Instances[i].numberOfFrames; k++) {
                    this.resolvePixelData(this.study.series[i].Instances[j], i, j, k);
                }
            }
        }
    }
}
