import { Injectable } from '@angular/core';
import { Http } from '../app.module';
import { AxiosInstance } from 'axios';
import Study from '../model/Study';
import Instance from '../model/Instance';
import { TagsOrth } from '../interface/TagsOrth';
import { SerieOrth } from '../interface/SerieOrth';
import Serie from '../model/Serie';

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

  getTags(instance: Instance): Promise<Instance> {
    return this.http.get('/instances/' + instance.id + '/tags').then(res => {
      instance.tags = res.data;
      return instance;
    });
  }

  getPixelData(instance: Instance): Promise<Instance> {
    return this.http.get('/instances/' + instance.id + '/frames/0/raw',  {
      responseType: 'arraybuffer'})
                    .then(res => {
                      instance.pixelData = res.data;
                      return instance;
                    });
  }
}
