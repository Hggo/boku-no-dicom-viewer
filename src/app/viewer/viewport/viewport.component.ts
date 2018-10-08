import { Component, OnInit, Input, OnChanges } from '@angular/core';
import Study from '../../model/Study';
import { StudyService } from '../../service/study.service';
import Instance from '../../model/Instance';
import { CanvasImageData } from '../../model/CanvasImageData';
import { DrawCanvas } from '../utils/DrawCanvas';
import { MouseListener } from '../utils/MouseListener';
import * as THREE from 'three';
import { DicomViewer } from '../../objects/DicomViewer';
import { faAdjust, faArrowsAlt, faSearchPlus, faArrowsAltH, faSquare, faCircle, faLayerGroup } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent implements OnChanges {

  constructor(private studyService: StudyService) {}

  public faAdjust = faAdjust;
  public faArrowsAlt = faArrowsAlt;
  public faSearchPlus = faSearchPlus;
  public faArrowsAltH = faArrowsAltH;
  public faSquare = faSquare;
  public faCircle = faCircle;
  public faLayerGroup = faLayerGroup;

  private dicomViewer: DicomViewer;
  private webglDiv: HTMLDivElement;
  @Input() study: Study;

  private renderer: THREE.WebGLRenderer;
  public instance: Instance;
  private ctx: CanvasRenderingContext2D;
  private mouseListener: MouseListener;

  private treatWindow = function(deltaX: number, deltaY: number) {
    this.instance.ww += (deltaX / 1);
    this.instance.wc += (deltaY / 1);
    this.draw();
  }.bind(this);

  ngOnChanges() {
    this.studyService.getInstancesFromStudy(this.study)
                     .then(instances => this.resolveInstances(instances));
  }

  private resolveInstances(instances: Instance[]) {

    if (instances && instances.length > 0) {
      this.study.instances = instances;
      this.resolvePixelData(this.study.instances[0]);
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
    });
  }

  private initCanvas() {
    this.webglDiv = <HTMLDivElement>document.getElementById('webgl');

    this.dicomViewer = new DicomViewer(this.webglDiv);
    this.mouseListener = new MouseListener(this.webglDiv, this.treatWindow);

    this.draw();
    this.mouseListener.listen();
  }

  private draw() {

    this.instance = this.study.instances[0];

    DrawCanvas.drawPixelData(this.dicomViewer, this.instance);
  }
}
