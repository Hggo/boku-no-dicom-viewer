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
      this.loadSerie(0);
    });
  }

  private initThumbs () {
    this.thumbnails = [];
    this.study.series.forEach(serie => this.thumbnails.push(serie.thumb));
  }

  click (thumbnail: Thumbnail) {
    this.loadSerie(thumbnail.serieIndex);
  }

  private loadSerie (index: number) {
    this.studyHelper.loadSerie(this.study.series[index], serie => {
        this.dicomViewer.serieIndex = index;
        this.dicomViewer.instanceIndex = 0;
        this.dicomViewer.frameIndex = 0;
        this.applyLoad();
    });
  }

  private applyLoad () {
    this.dicomViewer.render();
  }
}
