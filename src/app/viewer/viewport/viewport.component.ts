import { Component, OnInit, Input } from '@angular/core';
import Study from '../../model/Study';
import { StudyService } from '../../service/study.service';
import Instance from '../../model/Instance';
import { CanvasImageData } from '../../model/CanvasImageData';

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent implements OnInit {
  
  lastX: any;
  lastY: any;
  canvas: HTMLCanvasElement;
  @Input() study: Study;
  private ww: number = 1024;
  private wc: number = 550;

  constructor(private studyService: StudyService) { 
  }
  
  ngOnInit(){
    
  }

  ngOnChanges() {

    this.studyService.getInstancesFromStudy(this.study)
                     .then(instances => this.resolveInstances(instances));
  }

  private resolveInstances(instances: Instance[]){

    if(instances && instances.length > 0){
      this.study.instances = instances;
      this.study.instances.forEach(instance => this.resolvePixelData(instance));
    }
  }

  private resolvePixelData(instance: Instance){
    this.studyService.getPixelData(instance).then(instpd => {
      instance = instpd;
      this.resolveTags(instance);
    });
  }

  private resolveTags(instance: Instance){
    this.studyService.getTags(instance).then(insttags => {
      instance = insttags;
      this.initCanvas();
    });;
  }

  private initCanvas(){
    
    this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
    let ctx = this.canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;
    ctx.imageSmoothingEnabled = true;

    this.draw();
    this.listen();
  }

  listen() {
    this.canvas.addEventListener('mousedown', function(e) {
      this.lastX = e.pageX;
      this.lastY = e.pageY;

      this.handle_keydown(e);
    }.bind(this));
  };

  handle_keydown = function(e){
    this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.addEventListener('mouseup', this.mouseUpHandler);
  }.bind(this);

  mouseUpHandler = function(e){
    this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.removeEventListener('mouseup', this.mouseUpHandler);
  }.bind(this);

  mouseMoveHandler = function(e){
    const deltaX = e.pageX - this.lastX;
    const deltaY = e.pageY - this.lastY;
    this.lastX = e.pageX;
    this.lastY = e.pageY;
    
    this.ww += (deltaX / 1);
    this.wc += (deltaY / 1);    
    this.draw();
  }.bind(this);

  private draw() {
    
    let instance = this.study.instances[0];
    
    this.canvas.height = Number(instance.tags["0028,0010"].Value);
    this.canvas.width = Number(instance.tags["0028,0010"].Value);

    let imddt =  new CanvasImageData(Number(instance.tags["0028,0010"].Value), Number(instance.tags["0028,0011"].Value), this.canvas.getContext("2d"), instance.pixelData, this.ww, this.wc);
    
    this.canvas.getContext("2d").putImageData(imddt.imageData, 0, 0);
  }
}
