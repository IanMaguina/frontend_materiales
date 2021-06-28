import { ListarSolicitudAocComponent } from './solicitante/listar-solicitud-aoc/listar-solicitud-aoc.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendienteSolicitudAocComponent } from './solicitante/pendiente-solicitud-aoc/pendiente-solicitud-aoc.component';
import { NuevaSolicitudAocComponent } from './solicitante/nueva-solicitud-aoc/nueva-solicitud-aoc.component';

const routes: Routes = [
  {path:'', redirectTo:'crearSolicitud', pathMatch:'full'},
  {path:'crearSolicitud', component:NuevaSolicitudAocComponent},
  {path:'consultarSolicitudes', component:ListarSolicitudAocComponent},
  {path:'consultarSolicitudesPendientes', component:PendienteSolicitudAocComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreacionRoutingModule { }
