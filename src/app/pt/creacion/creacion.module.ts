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
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';

import { NuevaSolicitudPtcComponent } from './solicitante/nueva-solicitud-ptc/nueva-solicitud-ptc.component';
import { EditarSolicitudPtcComponent } from './solicitante/editar-solicitud-ptc/editar-solicitud-ptc.component';
import { ListarSolicitudPtcComponent } from './solicitante/listar-solicitud-ptc/listar-solicitud-ptc.component';
import { PendienteSolicitudPtcComponent } from './solicitante/pendiente-solicitud-ptc/pendiente-solicitud-ptc.component';
import { BandejaSolicitudPendientePtcComponent } from './supervisor/bandeja-solicitud-pendiente-ptc/bandeja-solicitud-pendiente-ptc.component';
import { VerSolicitudPendientePtcComponent } from './supervisor/ver-solicitud-pendiente-ptc/ver-solicitud-pendiente-ptc.component';

import { EditarMaterialPtcComponent } from './gestor/editar-material-ptc/editar-material-ptc.component';
import { EditarSolicitudGestorPtcComponent } from './gestor/editar-solicitud-gestor-ptc/editar-solicitud-gestor-ptc.component';
import { ContenidoSolicitudPtcComponent } from './shared/contenido-solicitud-ptc/contenido-solicitud-ptc.component';
import { VerMaterialPtcComponent } from './gestor/ver-material-ptc/ver-material-ptc.component';

@NgModule({
  declarations: [
    NuevaSolicitudPtcComponent,
    EditarSolicitudPtcComponent,
    PendienteSolicitudPtcComponent,
    ListarSolicitudPtcComponent,
    BandejaSolicitudPendientePtcComponent,
    VerSolicitudPendientePtcComponent,
    EditarMaterialPtcComponent,
    EditarSolicitudGestorPtcComponent,
    ContenidoSolicitudPtcComponent,
    VerMaterialPtcComponent,
    
  ],
  imports: [
    CommonModule,
    CreacionRoutingModule,

    MatDividerModule,
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
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTooltipModule
    
  ],
  exports:[
    MatTooltipModule
  ]
  
})
export class CreacionModule { }
