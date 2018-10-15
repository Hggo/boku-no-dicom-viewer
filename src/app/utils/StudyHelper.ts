import Serie from '../model/Serie';
import { StudyService } from '../service/study.service';
import Study from '../model/Study';
import Instance from '../model/Instance';

export default class StudyHelper {

    private workingThreads: number;

    constructor(private study: Study, private studyService: StudyService, private firstTrigger: Function, private finalTrigger: Function) {
        this.workingThreads = 0;
    }

    public prepareStudy() {
        this.studyService.getSeriesFromStudy(this.study).then(series => {
            this.study.series = series;
            this.resolveTheRest();
        });
    }

    private resolvePixelData(instance: Instance, serieN: number, instN: number, frameN: number) {
        this.studyService.getPixelData(instance, frameN).then(instpd => {
            
            this.study.series[serieN].Instances[instN].frames[frameN].pixelData = instpd.frames[frameN].pixelData;
            
            this.workingThreads--;
            
            if(frameN === 0 && instN === 0 && serieN === 0){                
                this.firstTrigger(this.study);
            } else {
                this.finalTrigger(instance, serieN, instN, frameN);
            }
        });
    }

    private resolveTags(instance: Instance, serieN: number, instN: number) {
        this.studyService.getTags(instance).then(insttags => {
            this.study.series[serieN].Instances[instN] = insttags;

            for (let k = 0; k < instance.numberOfFrames; k++) {
                this.workingThreads++;
                this.resolvePixelData(instance, serieN, instN, k);
            }
        });
    }

    private resolveTheRest() {
        for (let i = 0; i < this.study.series.length; i++) {
            this.studyService.getInstancesFromSerie(this.study.series[i])
                .then(instances => this.resolveInstances(instances, i));
        }
    }

    private resolveInstances(instances: Instance[], serieN: number){
        this.study.series[serieN].Instances = instances;

        for (let j = 0; j < instances.length; j++) {
            this.workingThreads++;
            this.resolveTags(instances[j], serieN, j);
        }
    }
}
