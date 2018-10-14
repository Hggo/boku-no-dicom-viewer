import * as THREE from 'three';
import Instance from '../model/Instance';
import { DrawCanvas } from '../utils/DrawCanvas';
import Study from '../model/Study';
import ViewportAnnotations from './ViewportAnnotations';

export class DicomViewer {

    constructor(public webglDiv: HTMLDivElement, public study: Study) {

        this.zoom = 1;
        this.frameIndex = this.serieIndex = 0;

        this.initRenderer();
        this.createScene();
    }

    public annotations: ViewportAnnotations;

    private width: number;
    private height: number;
    private plane: any;
    private camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private fov: number;
    public zoom: number;
    public panx: number;
    public pany: number;
    public instance: Instance;
    public frameIndex: number;
    public serieIndex: number;

    public render = function () {
        DrawCanvas.drawPixelData(this, this.study.series[this.serieIndex].Instances[this.frameIndex]);
    }.bind(this);

    private initRenderer() {
        this.height = window.innerHeight * 0.9;
        this.width = window.innerWidth * 0.9;

        this.panx = 0;
        this.pany = 0;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        this.webglDiv.appendChild(this.renderer.domElement);
    }

    private createScene() {
        this.scene = new THREE.Scene();
    }

    private initCamera(instance: Instance, mesh: THREE.MeshBasicMaterial) {

        if (!this.camera) {
            this.fov = 75;
            this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, 0.1, 1000);
            this.camera.lookAt(mesh.position);
        }

        this.camera.position.x = this.panx;
        this.camera.position.y = this.pany;
        this.camera.position.z = this.instance.rows / (2 * Math.tan(this.camera.fov * Math.PI / 360));
    }

    public applyDistance() {

        this.camera.position.x = this.panx;
        this.camera.position.y = this.pany;

        this.camera.fov = this.fov / this.zoom;
        this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);
    }

    initAnnotations(instance: Instance){
        const annotations = new ViewportAnnotations();
        annotations.ww = instance.ww;
        annotations.wc = instance.wc;
        annotations.zoom = this.zoom;
        annotations.patientName = this.study.patientName;
        annotations.institutionName = this.study.institutionName;
        annotations.totalFrames = instance.numberOfFrames;
        annotations.indexFrames = 1;

        this.annotations = annotations;
    }

    public initViewer(instance: Instance, texture: THREE.Texture) {

        this.initAnnotations(instance);
        this.instance = instance;

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
