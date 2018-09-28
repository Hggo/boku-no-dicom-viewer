export interface InstanceOrth {
    ID: String;
    FileSize: Number;
    FileUuid: String;
    IndexInSeries: Number;
    ParentSeries: String;
    Type: String;
    MainDicomTags: InstanceMainDicomTags;
}

interface InstanceMainDicomTags {
    ImageIndex: Number;
    InstanceCreationDate: String;
    InstanceCreationTime: String;
    InstanceNumber: String;
    SOPInstanceUID: String;
}