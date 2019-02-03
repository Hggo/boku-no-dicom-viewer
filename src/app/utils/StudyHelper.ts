import { StudyService } from '../service/study.service';
import Study from '../model/Study';
import Instance from '../model/Instance';

export default class StudyHelper {
    constructor(private study: Study, private studyService: StudyService, private firstTrigger: Function, private finalTrigger: Function) {
    }

    public prepareStudy() {
        this.studyService.getSeriesFromStudy(this.study).then(series => {
            this.study.series = series;
            this.resolveEverything();
        });
    }

    private resolvePixelData(instance: Instance, serieN: number, instN: number, frameN: number) {
        this.studyService.getPixelData(instance, frameN).then(frame => {
            this.study.series[serieN].Instances[instN].frames[frameN].pixelData = frame;
            if (frameN === 0 && instN === 0 && serieN === 0) {
                this.firstTrigger(this.study);
            } else {
                this.finalTrigger(instance, serieN, instN, frameN);
            }
        });
    }

    private resolveTags(instance: Instance) {
        return this.studyService.getTags(instance);
    }

    private resolveEverything() {
        for (let i = 0; i < this.study.series.length; i++) {
            this.studyService.getInstancesFromSerie(this.study.series[i])
                .then(instances => this.resolveInstances(instances, i));
        }
    }

    private resolveInstances(instances: Instance[], serieN: number) {
        if (!this.study.series[serieN].Instances) {
            this.study.series[serieN].Instances = instances;
        }
        for (let j = 0; j < instances.length; j++) {
            this.resolveTags(instances[j])
                .then(insttags => {
                    let instance = this.study.series[serieN].Instances[j];
                    instance.initTags(insttags);;
                    for (let k = 0; k < instance.numberOfFrames; k++) {
                        const frame = this.study.series[serieN].Instances[j].frames[k];
                        if (!frame || !frame.pixelData) {
                            this.resolvePixelData(instance, serieN, j, k);
                        }
                    }
                });
        }
    }
}
