import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { ReporteTiempoSolicitudComponent } from './reporte-tiempo-solicitud/reporte-tiempo-solicitud.component';
import { ReporteCantidadSolicitudComponent } from './reporte-cantidad-solicitud/reporte-cantidad-solicitud.component';

import {SharedModule} from './../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule} from '@angular/material/divider';
import { ChartsModule } from 'ng2-charts';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
  declarations: [PrincipalComponent, ReporteTiempoSolicitudComponent, ReporteCantidadSolicitudComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ChartsModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatTableExporterModule
  ],
  exports:[PrincipalComponent]
})
export class DashboardModule { }
