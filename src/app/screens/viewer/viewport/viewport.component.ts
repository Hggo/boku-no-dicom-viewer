import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StudyService } from '../../../service/study.service';
import { DicomViewer } from '../../../objects/DicomViewer';
import Study from '../../../model/Study';
import Instance from '../../../model/Instance';
import { CanvasImageData } from '../../../utils/CanvasImageData';
import Serie from '../../../model/Serie';
import StudyHelper from '../../../utils/StudyHelper';
import Thumbnail from '../../../objects/Thumbnail';

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent implements OnInit {

  constructor(private studyService: StudyService) { }

  private dicomViewer: DicomViewer;
  @Input() study: Study;
  public instance: Instance;
  private leftToolBox: HTMLDivElement;
  public thumbnails: Thumbnail[];

  private initCanvas = function(study: Study) {
    this.study = study;
    this.leftToolBox = <HTMLDivElement> document.getElementById('leftToolbox');
    const webglDiv = <HTMLDivElement> document.getElementById('webgl');

    this.dicomViewer = new DicomViewer(webglDiv, this.study.series[0].Instances[0]);
    requestAnimationFrame(this.dicomViewer.render);

     this.resolveThumbnail(this.study.series[0].Instances[0]);
  }.bind(this);

  private updateInstances = function(instance: Instance, serieN: number, instN: number) {
    this.study.series[serieN].Instances[instN] = instance;
    this.resolveThumbnail(instance);
  }.bind(this);

  ngOnInit() {
    this.thumbnails = [];
    const studyHelper = new StudyHelper(this.study, this.studyService, this.initCanvas, this.updateInstances);
    studyHelper.prepareStudy();
  }

  public resolveThumbnail(instance: Instance) {
    const src = new CanvasImageData(instance).canvas.toDataURL('image/png');
    this.thumbnails.push(new Thumbnail(src, 'Description'));
  }
}
