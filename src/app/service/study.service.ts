import { Injectable } from '@angular/core';
import { Http } from '../app.module';
import { AxiosInstance } from 'axios';
import Study from '../model/Study';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http: AxiosInstance) { }

  getDetailsStudies(): Promise<Study[]> {
    return this.http.post("tools/find", {
      Level: "Study",
      Expand: true,
      Query: {}
    }).then(res => {
      return res.data.map(study => new Study(study));
    });;
  }
}
