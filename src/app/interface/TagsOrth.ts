export interface TagsOrth {
    "0028,0010": TagValue;
    "0028,0011": TagValue;
    "0028,1050": TagValue; // wc
    "0028,1051": TagValue; // ww
}

interface TagValue {
    Name: String;
    Type: String;
    Value: String;
}