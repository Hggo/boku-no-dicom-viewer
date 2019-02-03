export default class Thumbnail {
    public src: String;
    public title: String;
    public serieIndex: number; 
    public instanceIndex: number;
    constructor (src: String, title: String, serieIndex: number, instanceIndex: number) {
        this.src = src;
        this.title = title;
        this.serieIndex = serieIndex;
        this.instanceIndex = instanceIndex;
    }
}
