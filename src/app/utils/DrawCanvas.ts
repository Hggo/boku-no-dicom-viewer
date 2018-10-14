import { DicomViewer } from '../objects/DicomViewer';
import Instance from '../model/Instance';
import { CanvasImageData } from './CanvasImageData';
import * as THREE from 'three';

export class DrawCanvas {
    public static drawPixelData(dicomViewer: DicomViewer, instance: Instance, frameIndex: number) {
        const ima = (new CanvasImageData(instance, frameIndex)).imageData;
        const texture = new THREE.DataTexture(ima, instance.cols, instance.rows, THREE.RGBAFormat);
        texture.needsUpdate = true;

        dicomViewer.initViewer(instance, texture);
    }
}
