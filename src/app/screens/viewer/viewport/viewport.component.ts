import { Component, OnInit, Input } from '@angular/core';
import { StudyService } from '../../../service/study.service';
import { DicomViewer } from '../../../objects/DicomViewer';
import { CanvasImageData } from '../../../utils/CanvasImageData';
import Study from '../../../model/Study';
import Instance from '../../../model/Instance';
import Serie from '../../../model/Serie';
import StudyHelper from '../../../utils/StudyHelper';
import Thumbnail from '../../../objects/Thumbnail';

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent implements OnInit {
  @Input() study: Study;
  constructor(private studyService: StudyService) { }
  public dicomViewer: DicomViewer;
  private leftToolBox: HTMLDivElement;
  public thumbnails: Thumbnail[];

  private initCanvas = function(study: Study) {
    this.study = study;
    this.leftToolBox = <HTMLDivElement> document.getElementById('leftToolbox');
    requestAnimationFrame(this.dicomViewer.render);
    this.resolveThumbnail(this.study.series[0], this.study.series[0].Instances[0], 0, 0);
  }.bind(this);

  private updateInstances = function(instance: Instance, serieN: number, instN: number, frameN: number) {
      if (this.study.series[serieN].Instances[instN] === undefined) {
        this.study.series[serieN].Instances[instN] = instance;
      } else {
        this.study.series[serieN].Instances[instN].frames[frameN] = instance.frames[frameN];
      }
      if (frameN === 0) {
        this.resolveThumbnail(this.study.series[serieN], this.study.series[serieN].Instances[instN], serieN, instN);
      }
  }.bind(this);

  ngOnInit() {
    this.thumbnails = [];
    const studyHelper = new StudyHelper(this.study, this.studyService, this.initCanvas, this.updateInstances);
    const webglDiv = <HTMLDivElement> document.getElementById('webgl');
    this.dicomViewer = new DicomViewer(webglDiv, this.study);
    studyHelper.prepareStudy();
  }

  public resolveThumbnail(serie: Serie, instance: Instance, serieN, instN) {
    const src = new CanvasImageData(instance, 0).canvas.toDataURL('image/png');
    this.thumbnails.push(new Thumbnail(src, serie.Modality, serieN, instN));
  }

  drag (thumbnail: Thumbnail) {
    this.dicomViewer.serieIndex = thumbnail.serieIndex;
    this.dicomViewer.instanceIndex = thumbnail.instanceIndex;
    this.dicomViewer.frameIndex = 0;
  }

  drop (evt) {
    this.dicomViewer.render();
  }

  allowDrop(ev) {
    ev.preventDefault();
  }
}
