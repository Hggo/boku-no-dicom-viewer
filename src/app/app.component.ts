import { Component, Input } from '@angular/core';
import { PesquisaComponent } from './tela/pesquisa/pesquisa.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/purecss/build/pure-min.css'],
})
export class AppComponent {
  title = 'boku-no-dicom-viewer';
  @Input() hero: PesquisaComponent;
}
