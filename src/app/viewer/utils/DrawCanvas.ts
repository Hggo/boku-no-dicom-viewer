import Instance from "../../model/Instance";
import { CanvasImageData } from "../../model/CanvasImageData";
import * as THREE from 'three';

export class DrawCanvas {

    public static drawAnnotations(ctx: CanvasRenderingContext2D, instance: Instance) {
        throw new Error('Not implemented');
    }

    public static drawPixelData(ctx: CanvasRenderingContext2D, instance: Instance) {
        throw new Error('Not implemented');
    }

    public static initRenderer (webglDiv: HTMLDivElement): THREE.WebGLRenderer{
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        webglDiv.appendChild(renderer.domElement)
        return renderer;
    }
}