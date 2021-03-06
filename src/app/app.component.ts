import { Component, Input } from '@angular/core';
import { PesquisaComponent } from './screens/pesquisa/pesquisa.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'],
})
export class AppComponent {
  title = 'boku-no-dicom-viewer';
  @Input() hero: PesquisaComponent;
}
