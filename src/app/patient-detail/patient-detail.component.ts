import { Component, OnInit, ViewEncapsulation, OnDestroy, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PatientDetailComponent implements OnInit, OnDestroy {
  @Input() public visitCode = '';
  private _sub: Subscription[] = [];

  constructor(private elementRef: ElementRef, private route: ActivatedRoute) {
    this._sub.push(
      this.route.params.subscribe((params) => {
        this.visitCode = params.visitCode;
      }),
    );
  }
  ngOnDestroy(): void {
    this._sub.forEach((item) => item.unsubscribe);
  }

  ngOnInit() {
    console.log('patient-detail oninit');
  }

}
