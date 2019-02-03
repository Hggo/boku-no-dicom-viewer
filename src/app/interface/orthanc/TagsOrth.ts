export interface TagsOrth {
    '0028,0010': TagValue;
    '0028,0011': TagValue;
    '0028,1050': TagValue;
    '0028,1051': TagValue;
    '0028,0103': TagValue;
    '0028,0100': TagValue;
    '0028,0004': TagValue;
    '5200,9229': SharedFunctionalGroupsSequence;
}

interface TagValue {
    Name: string;
    Type: string;
    Value: string;
}

interface SharedFunctionalGroupsSequence {
    Name: string;
    Type: string;
    Value: TagValueArray[];
}

interface TagValueArray {
    '0028,9132': TagValueLut;
    '0028,9145': TagRescale;
}

interface TagRescale {
    Name: string;
    Type: string;
    Value: RescaleTags[];
}

interface RescaleTags {
    '0028,1052': TagValue;
    '0028,1053': TagValue;
}

interface TagValueLut {
    Name: string;
    Type: string;
    Value: Lut[];
}

interface Lut {
    '0028,1050': TagValue; // wc
    '0028,1051': TagValue; // ww
}
