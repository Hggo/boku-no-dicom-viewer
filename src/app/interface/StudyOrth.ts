export interface StudyOrth {
    ID: String;
    Series: String[];
    Type: String;
    MainDicomTags: StudyMainDicomTags;
    PatientMainDicomTags: PatientMainDicomTags;
}

interface StudyMainDicomTags {
    AccessionNumber: String;
    StudyDate: String;
    StudyDescription: String;
    StudyID: String;
    StudyInstanceUID: String;
    StudyTime: String;
    InstitutionName: String;
    ReferringPhysicianName: String;
}

interface PatientMainDicomTags {
    PatientName: String;
}