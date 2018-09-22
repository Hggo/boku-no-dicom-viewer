import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PesquisaComponent } from './tela/pesquisa/pesquisa.component';
import 'purecss';

@NgModule({
  declarations: [
    AppComponent,
    PesquisaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
