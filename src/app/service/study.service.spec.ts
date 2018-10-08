import { TestBed } from '@angular/core/testing';

import { StudyService } from './study.service';

describe('StudyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudyService = TestBed.get(StudyService);
    expect(service).toBeTruthy();
  });
});
