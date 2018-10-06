import { Component, OnInit, Input } from '@angular/core';
import Study from '../../model/Study';
import { StudyService } from '../../service/study.service';
import Instance from '../../model/Instance';
import { CanvasImageData } from '../../model/CanvasImageData';
import { DrawCanvas } from '../utils/DrawCanvas';
import { MouseListener } from '../utils/MouseListener';
import * as THREE from 'three';

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent {

  private webglDiv: HTMLDivElement;
  @Input() study: Study;

  private renderer: THREE.WebGLRenderer;
  private instance: Instance;
  private ctx: CanvasRenderingContext2D;
  private mouseListener: MouseListener;

  constructor(private studyService: StudyService) {}

  ngOnChanges() {
    this.studyService.getInstancesFromStudy(this.study)
                     .then(instances => this.resolveInstances(instances));
  }

  private resolveInstances(instances: Instance[]) {

    if (instances && instances.length > 0) {
      this.study.instances = instances;
      this.study.instances.forEach(instance => this.resolvePixelData(instance));
    }
  }

  private resolvePixelData(instance: Instance) {
    this.studyService.getPixelData(instance).then(instpd => {
      instance = instpd;
      this.resolveTags(instance);
    });
  }

  private resolveTags(instance: Instance) {
    this.studyService.getTags(instance).then(insttags => {
      instance = insttags;
      this.initCanvas();
    });;
  }

  private initCanvas() {
    this.webglDiv = <HTMLDivElement>document.getElementById("webgl");

    this.mouseListener = new MouseListener(this.webglDiv, this.treatWindow);

    this.draw();
    this.mouseListener.listen();
  }

  private treatWindow = function(deltaX: number, deltaY: number){
    this.instance.ww += (deltaX / 1);
    this.instance.wc += (deltaY / 1);
    this.draw();
  }.bind(this);

  private draw() {

    this.instance = this.study.instances[0];

    this.renderer = DrawCanvas.initRenderer(this.webglDiv);
    DrawCanvas.drawPixelData(this.renderer, this.instance);
    DrawCanvas.drawAnnotations(this.renderer, this.instance);
  }
}
