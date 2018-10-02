import { Component, OnInit, Input } from '@angular/core';
import Study from '../../model/Study';
import { StudyService } from '../../service/study.service';
import Instance from '../../model/Instance';
import { CanvasImageData } from '../../model/CanvasImageData';
import { DrawCanvas } from '../utils/DrawCanvas';
import { MouseListener } from '../utils/MouseListener';

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent implements OnInit {

  @Input() study: Study;

  private canvas: HTMLCanvasElement;
  private instance: Instance;
  private ctx: CanvasRenderingContext2D;
  private mouseListener: MouseListener;

  constructor(private studyService: StudyService) {}

  ngOnInit() {

  }

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
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.mouseListener = new MouseListener(this.canvas, this.treatWindow);

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

    DrawCanvas.initCanvas(this.ctx, this.canvas);
    DrawCanvas.drawPixelData(this.ctx, this.instance);
    DrawCanvas.drawAnnotations(this.ctx, this.instance);
  }
}
