import { Component, OnInit, Input } from '@angular/core';
import { DicomToolbarButton } from './button/DicomToolbarButton';
import { faAdjust, faArrowsAlt, faSearchPlus, faArrowsAltH, faSquare, faCircle, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { DicomViewer } from '../DicomViewer';
import { AdjustWindowButton } from './button/AdjustWindowButton';
import { ZoomButton } from './button/ZoomButton';


@Component({
  selector: 'app-dicom-toolbar',
  templateUrl: './dicom-toolbar.component.html',
  styleUrls: ['./dicom-toolbar.component.css']
})
export class DicomToolbarComponent implements OnInit {

  @Input() dicomViewer: DicomViewer;
  dicomButtons: DicomToolbarButton[];
  constructor() { }

  ngOnInit() {
    this.initDicomButtons();
  }

  initDicomButtons() {
    this.dicomButtons = [];
    this.dicomButtons.push(new AdjustWindowButton(this.dicomViewer));
    this.dicomButtons.push(new DicomToolbarButton(faArrowsAlt, this.dicomViewer));
    this.dicomButtons.push(new ZoomButton(this.dicomViewer));
    this.dicomButtons.push(new DicomToolbarButton(faArrowsAltH, this.dicomViewer));
    this.dicomButtons.push(new DicomToolbarButton(faSquare, this.dicomViewer));
    this.dicomButtons.push(new DicomToolbarButton(faCircle, this.dicomViewer));
    this.dicomButtons.push(new DicomToolbarButton(faLayerGroup, this.dicomViewer));
  }
}
