import Instance from "../../model/Instance";
import { CanvasImageData } from "../../model/CanvasImageData";
import * as THREE from 'three';
import { DicomViewer } from "../../objects/DicomViewer";

export class DrawCanvas {
    public static drawPixelData(dicomViewer: DicomViewer, instance: Instance) {
        let ima = (new CanvasImageData(instance)).imageData;
        var texture = new THREE.DataTexture(ima, instance.cols, instance.rows, THREE.RGBAFormat);
        texture.needsUpdate = true;

        dicomViewer.initViewer(instance, texture);
    }
}