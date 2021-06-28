import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from './principal/principal.component';

import {SharedModule} from './../shared/shared.module';

import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ChartsModule

  ],
  exports:[PrincipalComponent]
})
export class DashboardModule { }
