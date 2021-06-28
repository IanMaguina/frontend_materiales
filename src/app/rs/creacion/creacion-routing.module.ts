import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarSolicitudRscComponent } from './solicitante/listar-solicitud-rsc/listar-solicitud-rsc.component';
import { PendienteSolicitudRscComponent } from './solicitante/pendiente-solicitud-rsc/pendiente-solicitud-rsc.component';
import { NuevaSolicitudRscComponent } from './solicitante/nueva-solicitud-rsc/nueva-solicitud-rsc.component';

const routes: Routes = [
  {path:'', redirectTo:'crearSolicitud', pathMatch:'full'},
  {path:'crearSolicitud', component:NuevaSolicitudRscComponent},
  {path:'consultarSolicitudes', component:ListarSolicitudRscComponent},
  {path:'consultarSolicitudesPendientes', component:PendienteSolicitudRscComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreacionRoutingModule { }
