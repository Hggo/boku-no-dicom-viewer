export interface SerieOrth {
    ID: String;
    Instances: String[];
    ParentStudy: String;
    Type: String;
    MainDicomTags: MainDicomTags;
}

interface MainDicomTags {
    ContrastBolusAgent: String;
    ImageOrientationPatient: String;
    Manufacturer: String;
    Modality: String;
    OperatorsName: String;
    ProtocolName: String;
    SeriesDate: String;
    SeriesInstanceUID: String;
    SeriesNumber: String;
    SeriesTime: String;
    StationName: String;
}
