import { Component, OnInit, Input } from '@angular/core';
import { DicomToolbarButton } from './button/generic/DicomToolbarButton';
import { faArrowsAltH, faSquare, faCircle } from '@fortawesome/free-solid-svg-icons';
import { DicomViewer } from '../DicomViewer';
import { AdjustWindowButton } from './button/AdjustWindowButton';
import { ZoomButton } from './button/ZoomButton';
import { PanButton } from './button/PanButton';
import { LutButton } from './button/LutButton';
import SeriesScrollButton from './button/SeriesScrollButton';

@Component({
  selector: 'app-dicom-toolbar',
  templateUrl: './dicom-toolbar.component.html',
  styleUrls: ['./dicom-toolbar.component.css']
})
export class DicomToolbarComponent implements OnInit {
  constructor() { }

  @Input() dicomViewer: DicomViewer;
  dicomButtons: DicomToolbarButton[];

  unselectOthers = function (buttonToSelect: DicomToolbarButton) {
    this.dicomButtons.forEach(btn => {
      if (btn.type === buttonToSelect.type) {
        btn.active = false;
        btn.removeListeners();
      }
    });
    buttonToSelect.active = true;
  }.bind(this);

  ngOnInit() {
    this.initDicomButtons();
  }

  initDicomButtons() {
    this.dicomButtons = [];
    this.dicomButtons.push(new AdjustWindowButton(this.dicomViewer, this.unselectOthers));
    this.dicomButtons.push(new PanButton(this.dicomViewer, this.unselectOthers));
    this.dicomButtons.push(new ZoomButton(this.dicomViewer, this.unselectOthers));
    this.dicomButtons.push(new LutButton(this.dicomViewer, this.unselectOthers));
    this.dicomButtons.push(new DicomToolbarButton(faArrowsAltH, this.dicomViewer, this.unselectOthers, DicomToolbarButton.CLICKTYPE));
    this.dicomButtons.push(new DicomToolbarButton(faSquare, this.dicomViewer, this.unselectOthers, DicomToolbarButton.CLICKTYPE));
    this.dicomButtons.push(new DicomToolbarButton(faCircle, this.dicomViewer, this.unselectOthers, DicomToolbarButton.CLICKTYPE));
    this.dicomButtons.push(new SeriesScrollButton(this.dicomViewer, this.unselectOthers));
  }
}
