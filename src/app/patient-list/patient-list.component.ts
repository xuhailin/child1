import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PatientListComponent implements OnInit {

  constructor(private router: Router, private elementRef: ElementRef) { }

  ngOnInit(): void {
    console.log('patient-list onInit');
  }

  public navigateToDetail(visitCode: string): void {
    this.router.navigate([{ outlets: { outpatient: `detail/${visitCode}`}}]);
  }

}
