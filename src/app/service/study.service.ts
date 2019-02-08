import { Injectable } from '@angular/core';
import { AxiosInstance } from 'axios';
import { study, seriesFromStudy, instancesFromSerie, pixelData, tags, preview } from './queries/study';
import { TagsSimpleOrth } from '../interface/orthanc/TagsSimpleOrth';
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
    return this.post(study, Study);
  }

  getSeriesFromStudy(studyToGet: Study): Promise<Serie[]> {
    return this.post(seriesFromStudy(studyToGet.studyInstanceUID), Serie);
  }

  getInstancesFromSerie(serie: Serie): Promise<Instance[]> {
    return this.post(instancesFromSerie(serie.ID), Instance);
  }

  getTags(instance: Instance): Promise<TagsSimpleOrth> {
    return this.get(tags(instance.id));
  }

  getPixelData(instance: Instance, frame: number): Promise<ArrayBuffer> {
    return this.get(pixelData(instance.id, frame));
  }

  getPreview(instanceUid: string, frame: number): Promise<String> {
    return new Promise((resolve, reject) => {
      return this.get(preview(instanceUid, frame));
    });
  }
}
