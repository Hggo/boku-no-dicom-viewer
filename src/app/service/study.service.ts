import { Injectable } from '@angular/core';
import { Http } from '../app.module';
import { AxiosInstance } from 'axios';
import Study from '../model/Study';
import Instance from '../model/Instance';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http: AxiosInstance) { }

  getDetailsStudies(): Promise<Study[]> {
    return this.http.post("tools/find", {
                          Level: "Study",
                          Expand: true,
                          Query: {}})
                    .then(res => res.data.map(study => new Study(study)));
  }

  getInstancesFromStudy(study: Study) : Promise<Instance[]> {
    return this.http.post("tools/find", {
                          Level: "Instance",
                          Expand: true,
                          Query: {'StudyId': study.id}})
                    .then(res => res.data.map(instance => new Instance(instance)));
  }

  getPixelData(instance: Instance) : Promise<Instance> {
    return this.http.get("/instances/" + instance.id + "/tags")
                    .then(res => { 
                      instance.pixelData = res.data;
                      return instance;
                    });
  }
}
