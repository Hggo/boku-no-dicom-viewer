import { Component, OnInit } from '@angular/core';
import { StudyService } from '../../service/study.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css', '../../../../node_modules/purecss/build/pure-min.css']
})
export class PesquisaComponent implements OnInit {

  constructor(private studyService: StudyService) { }

  ngOnInit() {
    this.studyService.getListAvaliableStudies().then(el => {
      console.log(el);
    });
  }
}
