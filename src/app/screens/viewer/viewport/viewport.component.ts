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
  studyHelper: StudyHelper;
  @Input() study: Study;
  constructor(private studyService: StudyService) { }
  public dicomViewer: DicomViewer;
  private leftToolBox: HTMLDivElement;
  public thumbnails: Thumbnail[];

  private initCanvas = function(study: Study) {
    this.study = study;
    this.leftToolBox = <HTMLDivElement> document.getElementById('leftToolbox');
    requestAnimationFrame(this.dicomViewer.render);
  }.bind(this);

  ngOnInit() {
    this.thumbnails = [];
    this.studyHelper = new StudyHelper(this.study, this.studyService, this.initCanvas);
    const webglDiv = <HTMLDivElement> document.getElementById('webgl');
    this.dicomViewer = new DicomViewer(webglDiv, this.study);
    this.studyHelper.loadStudy(this.study, study => {
      this.initThumbs();
      this.studyHelper.loadSerie(this.study.series[0], serie => {
        this.drag(serie.thumb);
        this.applyLoad();
      });
    });
  }

  private initThumbs () {
    this.thumbnails = [];
    this.study.series.forEach(serie => this.thumbnails.push(serie.thumb));
  }

  drag (thumbnail: Thumbnail) {
    this.dicomViewer.serieIndex = thumbnail.serieIndex;
    this.dicomViewer.instanceIndex = thumbnail.instanceIndex;
    this.dicomViewer.frameIndex = 0;
  }

  drop (evt?) {
    this.studyHelper.loadSerie(this.study.series[this.dicomViewer.serieIndex], serie => this.applyLoad());
  }

  private applyLoad () {
    this.dicomViewer.render();
  }

  allowDrop(ev) {
    ev.preventDefault();
  }
}
