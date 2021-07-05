import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDividerModule} from '@angular/material/divider';
import { SeguimientoSolicitudComponent } from './seguimiento-solicitud/seguimiento-solicitud.component';
import { FlujoSolicitudComponent } from './flujo-solicitud/flujo-solicitud.component';
import { MatTableModule } from '@angular/material/table';
import { MotivoSolicitudComponent } from './motivo-solicitud/motivo-solicitud.component';
import { MatInputModule } from '@angular/material/input';
import { DenominacionSolicitudComponent } from './denominacion-solicitud/denominacion-solicitud.component';
import { AdvertenciaDialogComponent } from './advertencia-dialog/advertencia-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../servicios/interceptor.service';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { ListaAnexosDialogComponent } from './lista-anexos-dialog/lista-anexos-dialog.component';
import { ListaAnexosMaterialDialogComponent } from './lista-anexos-material-dialog/lista-anexos-material-dialog.component';
import { TablaEquivalenciasDialogComponent } from './tabla-equivalencias-dialog/tabla-equivalencias-dialog.component';
import { ErrorSapDialogComponent } from './error-sap-dialog/error-sap-dialog.component'
@NgModule({
  declarations: [FooterComponent, HeaderComponent, ConfirmDialogComponent, SeguimientoSolicitudComponent, FlujoSolicitudComponent, MotivoSolicitudComponent, DenominacionSolicitudComponent, AdvertenciaDialogComponent, VerSolicitudComponent, ListaAnexosDialogComponent, ListaAnexosMaterialDialogComponent, TablaEquivalenciasDialogComponent, ErrorSapDialogComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatMenuModule,
    MatDividerModule,
    MatTableModule,
    ReactiveFormsModule, 
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDialogModule
  ],
  providers:[
    {provide: HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true}
  ],
  exports:[
    HeaderComponent, FooterComponent
  ]
})
export class SharedModule { }
