import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as THREE from 'three';
import { faAdjust, faArrowsAlt, faSearchPlus, faArrowsAltH, faSquare, faCircle, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { StudyService } from '../../../service/study.service';
import { MouseWheelListener } from '../../../utils/MouseWheelListener';
import { DicomViewer } from '../../../objects/DicomViewer';
import Study from '../../../model/Study';
import Instance from '../../../model/Instance';
import { DrawCanvas } from '../../../utils/DrawCanvas';


@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent implements OnInit {

  constructor(private studyService: StudyService) {}
  wheelListener: MouseWheelListener;

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

  private treatZoom = function(direction: number) {
    this.dicomViewer.zoom = direction > 0 ? this.dicomViewer.zoom * 1.1 : this.dicomViewer.zoom / 1.1;
    this.dicomViewer.applyDistance();
  }.bind(this);

  private render = function() {
    DrawCanvas.drawPixelData(this.dicomViewer, this.instance);
  }.bind(this);

  ngOnInit() {
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

    this.dicomViewer = new DicomViewer(this.webglDiv, this.study.instances[0]);
    this.wheelListener = new MouseWheelListener(this.webglDiv, this.treatZoom);
    this.instance = this.study.instances[0];

    this.wheelListener.listen();
    requestAnimationFrame(this.render);
  }
}
