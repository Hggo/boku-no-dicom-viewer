import * as THREE from 'three';
import Instance from '../model/Instance';

export class DicomViewer {

    private width: number;
    private height: number;
    private plane: any;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private fov: number;

    constructor(private webglDiv: HTMLDivElement) {
        this.initRenderer();
        this.createScene();
    }

    private initRenderer() {
        this.height = window.innerHeight * 0.9;
        this.width = window.innerWidth * 0.9;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        this.webglDiv.appendChild(this.renderer.domElement);
    }

    private createScene() {
        this.scene = new THREE.Scene();
    }

    private initCamera(instance: Instance) {
        this.fov = 75;
        this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = instance.rows / ( 2 * Math.tan( this.camera.fov * Math.PI / 360));
    }

    public initViewer(instance: Instance, texture: THREE.Texture) {

        if (!this.camera) {
            this.initCamera(instance);
        }

        this.plane = new THREE.PlaneGeometry(instance.cols, instance.rows);
        const material = new THREE.MeshBasicMaterial( { map: texture } );

        material.needsUpdate = true;
        texture.needsUpdate = true;
        const mesh = new THREE.Mesh(this.plane, material);
        mesh.scale.y = -1;

        this.scene.add(mesh);
        this.camera.lookAt(mesh.position);
        this.renderer.render(this.scene, this.camera);
    }
}
