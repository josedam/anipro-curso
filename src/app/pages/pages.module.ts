import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';



@NgModule({
  declarations: [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graficas1Component
    ],

  imports: [
    SharedModule,
    CommonModule,
    PagesRoutingModule
  ],

  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component
    ],

  providers: []
})
export class PagesModule {}
