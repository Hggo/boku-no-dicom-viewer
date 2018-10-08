import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppComponent } from './app.component';
import { PesquisaComponent } from './tela/pesquisa/pesquisa.component';

import axios from 'axios';
import { StudyService } from './service/study.service';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { ViewportComponent } from './viewer/viewport/viewport.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Injectable({
  providedIn: 'root'
})
export class Http {}

const instance = axios.create({
  baseURL: 'http://localhost:8042',
  timeout: 20000,
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
    ViewportComponent
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
