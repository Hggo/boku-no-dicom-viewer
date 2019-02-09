export default class Thumbnail {
    public src: string;
    public title: string;
    public serieIndex: number;
    public instanceIndex: number;
    constructor (src: string, title: string, serieIndex: number, instanceIndex: number) {
        this.src = src;
        this.title = title;
        this.serieIndex = serieIndex;
        this.instanceIndex = instanceIndex;
    }
}
