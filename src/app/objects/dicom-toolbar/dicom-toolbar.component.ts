import { Component, OnInit } from '@angular/core';
import { DicomToolbarButton } from './DicomToolbarButton';
import { faAdjust, faArrowsAlt, faSearchPlus, faArrowsAltH, faSquare, faCircle, faLayerGroup } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dicom-toolbar',
  templateUrl: './dicom-toolbar.component.html',
  styleUrls: ['./dicom-toolbar.component.css']
})
export class DicomToolbarComponent implements OnInit {

  dicomButtons: DicomToolbarButton[];
  constructor() { }

  ngOnInit() {
    this.initDicomButtons();
  }

  initDicomButtons() {
    this.dicomButtons = [];
    this.dicomButtons.push(new DicomToolbarButton(faAdjust));
    this.dicomButtons.push(new DicomToolbarButton(faArrowsAlt));
    this.dicomButtons.push(new DicomToolbarButton(faSearchPlus));
    this.dicomButtons.push(new DicomToolbarButton(faArrowsAltH));
    this.dicomButtons.push(new DicomToolbarButton(faSquare));
    this.dicomButtons.push(new DicomToolbarButton(faCircle));
    this.dicomButtons.push(new DicomToolbarButton(faLayerGroup));
  }
}
