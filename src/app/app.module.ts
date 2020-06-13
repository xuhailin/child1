import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements'
import { PatientListComponent } from './public-api';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

const webComponents = {
  'patient-list': PatientListComponent,
  'patient-detail': PatientDetailComponent,
  'emr-outpatient': AppComponent,
};
const components = [
  PatientListComponent,
  PatientDetailComponent,
  AppComponent
];

@NgModule({
  declarations: [
   ...components,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
  ],
  entryComponents: [
    PatientListComponent,
    PatientDetailComponent,
    AppComponent,
  ],
  providers: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    // 单个自定义元素例子
    const tagNames = Object.keys(webComponents);
    tagNames.forEach((tagName) => {
      const element = createCustomElement(webComponents[tagName], { injector });
      customElements.define(tagName, element);
    });

    // 结合路由使用，查看app.routing.module.ts
    // const appElement = createCustomElement(AppComponent, { injector });
    // customElements.define('emr-outpatient', appElement);
  }

  ngDoBootstrap(): void {
  }
}
