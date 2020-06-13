import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { ElementRoutingModule } from './core/element-routing.module';


const routes: Routes = [
  { path: 'list', component: PatientListComponent, outlet: 'outpatient' },
  { path: 'detail/:visitCode', component: PatientDetailComponent, outlet: 'outpatient' },
  { path: '**', redirectTo: 'list', pathMatch: 'full'}
];


@NgModule({
  // imports: [RouterTestingModule.withRoutes(routes)],
  // exports: [RouterTestingModule]
  // 实现路由变化
  imports: [ElementRoutingModule.withRoutes(routes)],
  exports: [ElementRoutingModule]
})
export class AppRoutingModule { }
