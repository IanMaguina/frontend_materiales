import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarSolicitudMpcComponent } from './solicitante/listar-solicitud-mpc/listar-solicitud-mpc.component';
import { PendienteSolicitudMpcComponent } from './solicitante/pendiente-solicitud-mpc/pendiente-solicitud-mpc.component';
import { NuevaSolicitudMpcComponent } from './solicitante/nueva-solicitud-mpc/nueva-solicitud-mpc.component';

const routes: Routes = [
  {path:'', redirectTo:'crearSolicitud', pathMatch:'full'},
  {path:'crearSolicitud', component:NuevaSolicitudMpcComponent},
  {path:'consultarSolicitudes', component:ListarSolicitudMpcComponent},
  {path:'consultarSolicitudesPendientes', component:PendienteSolicitudMpcComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreacionRoutingModule { }
