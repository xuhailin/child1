import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements'
import { PatientListComponent } from './public-api';

const webComponents = {
  'patient-list': PatientListComponent,
};
const components = [
  PatientListComponent,
];

@NgModule({
  declarations: [
   ...components,
  ],
  imports: [
    BrowserModule,
  ],
  entryComponents: components,
  providers: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const tagNames = Object.keys(webComponents);
    tagNames.forEach((tagName) => {
      const element = createCustomElement(webComponents[tagName], { injector });
      customElements.define(tagName, element);
    });
  }

  ngDoBootstrap(): void {
  }
}
