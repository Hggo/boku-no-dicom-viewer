export interface TagsOrth {
    "0028,0010": TagValue;
    "0028,0011": TagValue;
    "0028,1050": TagValue; // wc
    "0028,1051": TagValue; // ww
    "0028,0103": TagValue; // Pixel Representation
    "0028,0100": TagValue; // bits alocated
    "0028,0004": TagValue; // photo inter
}

interface TagValue {
    Name: String;
    Type: String;
    Value: String;
}