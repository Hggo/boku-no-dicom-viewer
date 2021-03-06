export interface InstanceOrth {
    ID: string;
    FileSize: Number;
    FileUuid: string;
    IndexInSeries: number;
    ParentSeries: string;
    Type: string;
    MainDicomTags: InstanceMainDicomTags;
}

interface InstanceMainDicomTags {
    ImageIndex: Number;
    InstanceCreationDate: string;
    InstanceCreationTime: string;
    InstanceNumber: string;
    SOPInstanceUID: string;
    NumberOfFrames: string;
}
