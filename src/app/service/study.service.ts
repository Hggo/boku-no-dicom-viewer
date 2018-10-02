import { Injectable } from '@angular/core';
import { Http } from '../app.module';
import { AxiosInstance } from 'axios';
import Study from '../model/Study';
import Instance from '../model/Instance';
import { TagsOrth } from '../interface/TagsOrth';

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
                          Query: {'StudyInstanceUID': study.studyInstanceUID}})
                    .then(res => res.data.map(instance => new Instance(instance)));
  }

  getTags(instance: Instance) : Promise<Instance> {
    return this.http.get("/instances/" + instance.id + "/tags").then(res => {
      instance.tags = res.data;
      return instance;
    });
  }

  getPixelData(instance: Instance) : Promise<Instance> {
    return this.http.get("/instances/" + instance.id + "/frames/0/raw",  {
      responseType: 'arraybuffer'})
                    .then(res => { 
                      instance.pixelData = res.data;
                      return instance;
                    });
  }
}
