import { StudyOrth } from 'src/app/interface/orthanc/StudyOrth';
import Serie from './Serie';

export default class Study {
    public id: String;
    public institutionName: String;
    public referringPhysicianName: String;
    public studyDate: String;
    public studyDescription: String;
    public studyInstanceUID: String;
    public studyTime: String;
    public numberSeries: Number;
    public patientName: String;
    public series: Serie[];

    constructor(study: StudyOrth) {
        if (study) {
            this.copyProperties(study);
        }
    }

    private copyProperties(study: StudyOrth) {
        this.id = study.ID;
        if (study.MainDicomTags !== undefined) {
            this.institutionName = study.MainDicomTags.InstitutionName;
            this.referringPhysicianName = study.MainDicomTags.ReferringPhysicianName;
            this.studyDate = study.MainDicomTags.StudyDate;
            this.studyDescription = study.MainDicomTags.StudyDescription;
            this.studyInstanceUID = study.MainDicomTags.StudyInstanceUID;
            this.studyTime = study.MainDicomTags.StudyTime;
        }
        if (study.Series !== undefined) {
            this.numberSeries = study.Series.length;
        }
        if (study.PatientMainDicomTags) {
            this.patientName = study.PatientMainDicomTags.PatientName;
        }
    }
}
