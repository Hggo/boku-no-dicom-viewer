import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppComponent } from './app.component';

import axios from 'axios';
import { StudyService } from './service/study.service';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DicomToolbarComponent } from './objects/dicom-toolbar/dicom-toolbar.component';
import { PesquisaComponent } from './screens/pesquisa/pesquisa.component';
import { ViewportComponent } from './screens/viewer/viewport/viewport.component';


@Injectable({
  providedIn: 'root'
})
export class Http {}

const instance = axios.create({
  baseURL: '/orthanc',
  timeout: 99999999999,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'localhost:8042',
    'Authorization': window.btoa('orthanc:orthanc').toString(),
  }
});

@NgModule({
  declarations: [
    AppComponent,
    PesquisaComponent,
    ViewportComponent,
    DicomToolbarComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [ {provide: Http, useValue: instance}, {provide: StudyService, useValue: new StudyService(instance)}, NgxSmartModalService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
