import { Component, OnInit } from '@angular/core';
import { StudyService } from '../../service/study.service';
import Study from '../../model/Study';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ViewportComponent } from '../../viewer/viewport/viewport.component';


@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  studyList: Study[];

  constructor(private studyService: StudyService, public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.studyService.getDetailsStudies().then(el => this.studyList = el);
  }

  viewStudy(study: Study) {
    this.ngxSmartModalService.setModalData(study, 'myModal');
    this.ngxSmartModalService.getModal('myModal').open();
  }
}
