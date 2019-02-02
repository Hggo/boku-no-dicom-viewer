import { Injectable } from '@angular/core';
import { Http } from '../app.module';
import { AxiosInstance } from 'axios';
import Study from '../model/Study';
import Instance from '../model/Instance';
import Serie from '../model/Serie';
import { TagsOrth } from '../interface/orthanc/TagsOrth';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(private http: AxiosInstance) { }

  getDetailsStudies(): Promise<Study[]> {
    return this.http.post('tools/find', {
                          Level: 'Study',
                          Expand: true,
                          Query: {}})
                    .then(res => res.data.map(study => new Study(study)));
  }

  getSeriesFromStudy(study: Study): Promise<Serie[]> {
    return this.http.post('tools/find', {
                          Level: 'Series',
                          Expand: true,
                          Query: {'StudyInstanceUID': study.studyInstanceUID}})
                    .then(res => res.data.map(serie => new Serie(serie)));
  }

  getInstancesFromSerie(serie: Serie): Promise<Instance[]> {
    return this.http.post('tools/find', {
                          Level: 'Instance',
                          Expand: true,
                          Query: {'SeriesInstanceUID': serie.ID}})
                    .then(res => res.data.map(instance => new Instance(instance)));
  }

  getTags(instance: Instance): Promise<TagsOrth> {
    return this.http.get('/instances/' + instance.id + '/tags').then(res => {
      return res.data;
    });
  }

  getPixelData(instance: Instance, frame: number): Promise<Instance> {
    return this.http.get('/instances/' + instance.id + '/frames/' + frame + '/raw',  {
      responseType: 'arraybuffer'})
                    .then(res => {
                      instance.frames[frame].pixelData = res.data;
                      return instance;
                    });
  }
}
