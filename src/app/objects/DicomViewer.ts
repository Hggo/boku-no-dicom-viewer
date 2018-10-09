import * as THREE from 'three';
import Instance from '../model/Instance';
import { DrawCanvas } from '../viewer/utils/DrawCanvas';

export class DicomViewer {

    constructor(public webglDiv: HTMLDivElement, private instance: Instance) {

        this.zoom = 1;

        this.initRenderer();
        this.createScene();
    }

    private width: number;
    private height: number;
    private plane: any;
    private camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private fov: number;
    public zoom: number;

    public render = function () {
        DrawCanvas.drawPixelData(this, this.instance);
    }.bind(this);

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

    private initCamera(instance: Instance, mesh: THREE.MeshBasicMaterial) {

        this.instance = instance;

        if (!this.camera) {
            this.fov = 75;
            this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, 0.1, 1000);
            this.camera.lookAt(mesh.position);
        }

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = this.instance.rows / (2 * Math.tan(this.camera.fov * Math.PI / 360));
    }

    public applyDistance() {
        this.camera.fov = this.fov * this.zoom;
        this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);
    }

    public initViewer(instance: Instance, texture: THREE.Texture) {

        this.plane = new THREE.PlaneGeometry(instance.cols, instance.rows);

        const material = new THREE.MeshBasicMaterial({ map: texture });

        texture.needsUpdate = true;
        const mesh = new THREE.Mesh(this.plane, material);
        mesh.scale.y = -1;

        this.scene.add(mesh);
        if (!this.camera) {
            this.initCamera(instance, mesh);
        }
        this.applyDistance();
    }
}
