import { Injectable } from '@angular/core';
import { Http } from '../app.module';
import { AxiosInstance } from 'axios';
import Study from '../model/Study';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http: AxiosInstance) { }

  getListAvaliableStudies () : Promise<void>{
    return this.http.get("studies").then(res => {
      return res.data.map(id => new Study(id));
    });    
  }

  getListDetailsStudies (studyId){
    console.log("bla")
    this.http.get("studies/" + studyId);
  }
}
