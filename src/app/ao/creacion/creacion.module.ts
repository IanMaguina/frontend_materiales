import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreacionRoutingModule } from './creacion-routing.module';

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

import { ListarSolicitudAocComponent } from './solicitante/listar-solicitud-aoc/listar-solicitud-aoc.component';
import { PendienteSolicitudAocComponent } from './solicitante/pendiente-solicitud-aoc/pendiente-solicitud-aoc.component';
import { NuevaSolicitudAocComponent } from './solicitante/nueva-solicitud-aoc/nueva-solicitud-aoc.component';

@NgModule({
  declarations: [ListarSolicitudAocComponent, PendienteSolicitudAocComponent, NuevaSolicitudAocComponent],
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
