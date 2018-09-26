export default class Study {

    private _institutionName: String;
    private _referringPhysicianName: String;
    private _studyDate: String;
    private _studyDescription: String;
    private _studyInstanceUID: String;
    private _studyTime: String;
    private _numberSeries: Number;
    private _patientName: String;

    constructor(study) {
        if (study.MainDicomTags != undefined) {
            this._institutionName = study.MainDicomTags.InstitutionName;
            this._referringPhysicianName = study.MainDicomTags.ReferringPhysicianName;
            this._studyDate = study.MainDicomTags.StudyDate;
            this._studyDescription = study.MainDicomTags.StudyDescription;
            this._studyInstanceUID = study.MainDicomTags.StudyInstanceUID;
            this._studyTime = study.MainDicomTags.StudyTime;
        }

        if (study.Series != undefined) {
            this._numberSeries = study.Series.length;
        }

        if (study.PatientMainDicomTags) {
            this._patientName = study.PatientMainDicomTags.PatientName;
        }
    }

    get institutionName(): String {
        return this._institutionName;
    }

    set institutionName(institutionName: String) {
        this._institutionName = institutionName;
    }

    get referringPhysicianName(): String {
        return this._referringPhysicianName;
    }

    set referringPhysicianName(referringPhysicianName: String) {
        this._referringPhysicianName = referringPhysicianName;
    }

    get studyDate(): String {
        return this._studyDate;
    }

    set studyDate(studyDate: String) {
        this._studyDate = studyDate;
    }

    get studyDescription(): String {
        return this._studyDescription;
    }

    set studyDescription(studyDescription: String) {
        this._studyDescription = studyDescription;
    }

    get studyInstanceUID(): String {
        return this._studyInstanceUID;
    }

    set studyInstanceUID(studyInstanceUID: String) {
        this._studyInstanceUID = studyInstanceUID;
    }

    get studyTime(): String {
        return this._studyTime;
    }

    set studyTime(studyTime: String) {
        this._studyTime = studyTime;
    }

    get numberSeries(): Number {
        return this._numberSeries;
    }

    set numberSeries(numberSeries: Number) {
        this._numberSeries = numberSeries;
    }

    get patientName(): String {
        return this._patientName;
    }

    set patientName(patientName: String) {
        this._patientName = patientName;
    }
}