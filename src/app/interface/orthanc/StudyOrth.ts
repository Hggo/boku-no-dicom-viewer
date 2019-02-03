export interface StudyOrth {
    ID: string;
    Series: string[];
    Type: string;
    MainDicomTags: StudyMainDicomTags;
    PatientMainDicomTags: PatientMainDicomTags;
}

interface StudyMainDicomTags {
    AccessionNumber: string;
    StudyDate: string;
    StudyDescription: string;
    StudyID: string;
    StudyInstanceUID: string;
    StudyTime: string;
    InstitutionName: string;
    ReferringPhysicianName: string;
}

interface PatientMainDicomTags {
    PatientName: string;
}
