export interface SerieOrth {
    ID: string;
    Instances: string[];
    ParentStudy: string;
    Type: string;
    MainDicomTags: MainDicomTags;
}

interface MainDicomTags {
    ContrastBolusAgent: string;
    ImageOrientationPatient: string;
    Manufacturer: string;
    Modality: string;
    OperatorsName: string;
    ProtocolName: string;
    SeriesDate: string;
    SeriesInstanceUID: string;
    SeriesNumber: string;
    SeriesTime: string;
    StationName: string;
}
