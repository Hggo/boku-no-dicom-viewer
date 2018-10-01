export interface TagsOrth {
    "0028,0010": TagValue;
    "0028,0011": TagValue;
}

interface TagValue {
    Name: String;
    Type: String;
    Value: String;
}