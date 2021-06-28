import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreacionRoutingModule } from './creacion-routing.module';
import { PendienteSolicitudMpcComponent } from './solicitante/pendiente-solicitud-mpc/pendiente-solicitud-mpc.component';
import { ListarSolicitudMpcComponent } from './solicitante/listar-solicitud-mpc/listar-solicitud-mpc.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { NuevaSolicitudMpcComponent } from './solicitante/nueva-solicitud-mpc/nueva-solicitud-mpc.component';

@NgModule({
  declarations: [PendienteSolicitudMpcComponent, ListarSolicitudMpcComponent, NuevaSolicitudMpcComponent],
  imports: [
    CommonModule,
    CreacionRoutingModule,

    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
  ]
})
export class CreacionModule { }
