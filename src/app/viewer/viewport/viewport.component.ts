import { Component, OnInit, Input } from '@angular/core';
import Study from '../../model/Study';
import { StudyService } from '../../service/study.service';
import Instance from '../../model/Instance';

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent implements OnInit {
  
  @Input() study: Study;
  constructor(private studyService: StudyService) { }
  
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
      this.initCanvas();
    });
  }

  private initCanvas(){
    
  }
}
