import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StudyService } from '../../../service/study.service';
import { DicomViewer } from '../../../objects/DicomViewer';
import Study from '../../../model/Study';
import Instance from '../../../model/Instance';
import { CanvasImageData } from '../../../utils/CanvasImageData';
import Serie from '../../../model/Serie';

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent implements OnInit {

  constructor(private studyService: StudyService) { }

  private dicomViewer: DicomViewer;
  private webglDiv: HTMLDivElement;
  @Input() study: Study;
  public instance: Instance;

  ngOnInit() {
    this.studyService.getSeriesFromStudy(this.study).then(series => this.resolveSeries(series));
  }

  private resolveSeries(series: Serie[]) {
    this.study.series = series;
    this.studyService.getInstancesFromSerie(this.study.series[0])
                     .then(instances => this.resolveInstancesSeries(instances));
  }

  private resolveInstancesSeries(instances: Instance[]) {
    this.study.series[0].Instances = instances;
    this.resolveInstances(instances);
  }

  private resolveInstances(instances: Instance[]) {
    if (instances && instances.length > 0) {
      this.study.series[0].Instances = instances;
      this.resolvePixelData(this.study.series[0].Instances[0]);
    }
  }

  private resolveThumbnail(instance: Instance) {
    const img = <HTMLImageElement>document.getElementById('img');
    img.src = new CanvasImageData(instance).canvas.toDataURL('image/png');
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

    this.dicomViewer = new DicomViewer(this.webglDiv, this.study.series[0].Instances[0]);
    requestAnimationFrame(this.dicomViewer.render);

    this.resolveThumbnail(this.study.series[0].Instances[0]);
  }
}
