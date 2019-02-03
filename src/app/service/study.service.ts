import { Injectable } from '@angular/core';
import { AxiosInstance } from 'axios';
import { TagsOrth } from '../interface/orthanc/TagsOrth';
import { study, seriesFromStudy, instancesFromSerie, pixelData, tags } from './queries/study';
import Study from '../model/Study';
import Instance from '../model/Instance';
import Serie from '../model/Serie';
import BaseService from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StudyService extends BaseService {
  constructor(http: AxiosInstance) { 
    super(http);
  }
  
  getDetailsStudies(): Promise<Study[]> {
    return this.post(study).then(res => this.listToClass(res, Study));
  }

  getSeriesFromStudy(study: Study): Promise<Serie[]> {
    return this.post(seriesFromStudy(study.studyInstanceUID))
               .then(res => this.listToClass(res, Serie));
  }

  getInstancesFromSerie(serie: Serie): Promise<Instance[]> {
    return this.post(instancesFromSerie(serie.ID))
               .then(res => this.listToClass(res, Instance));
  }

  getTags(instance: Instance): Promise<TagsOrth> {
    return this.get(tags(instance.id)).then(res => res.data);
  }

  getPixelData(instance: Instance, frame: number): Promise<Instance> {
    return this.get(pixelData(instance.id, frame)).then(res => {
      instance.frames[frame].pixelData = res.data;
      return instance;
    });
  }
}
