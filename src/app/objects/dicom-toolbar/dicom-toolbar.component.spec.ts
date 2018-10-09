import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicomToolbarComponent } from './dicom-toolbar.component';

describe('DicomToolbarComponent', () => {
  let component: DicomToolbarComponent;
  let fixture: ComponentFixture<DicomToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicomToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicomToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
