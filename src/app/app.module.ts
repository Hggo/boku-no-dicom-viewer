import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppComponent } from './app.component';
import { PesquisaComponent } from './tela/pesquisa/pesquisa.component';

import axios from 'axios'
import { StudyService } from './service/study.service';

@Injectable({
  providedIn: 'root'
})
export class Http {}

const instance = axios.create({
  baseURL: 'http://localhost:8042',
  timeout: 100009999999,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'localhost:8042',
    'Authorization': window.btoa("a:a").toString(),
  }
});

@NgModule({
  declarations: [
    AppComponent,
    PesquisaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ {provide: Http, useValue: instance}, {provide: StudyService, useValue: new StudyService(instance)} ], 
  bootstrap: [ AppComponent ]
})
export class AppModule { }
