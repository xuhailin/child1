import { Component, ViewEncapsulation, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'outpatient',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements OnChanges {
  @Input() path = 'list';
  @Output() pathChange = new EventEmitter();

  title = 'child1';

  constructor(private router: Router) {
      this.router.initialNavigation();
  }
    
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.path) {
       // this.router.navigate([{ outlets : { outpatient: this.path }}]);
       // 应该是路由只要变更 都要patch出去, 或者父亲一直监听节点变化，随时处理.

       // 父亲监听不到子的路由变化
       // this.pathChange.emit(this.path);
       this.navigateTo(changes.path.currentValue);
    }
  }

  public navigateTo(path: string) {
    this.path = path;
    this.router.navigate([{ outlets : { outpatient: this.path }}]);
    this.pathChange.emit(this.path);
  }
}