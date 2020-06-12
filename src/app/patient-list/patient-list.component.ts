import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PatientListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
