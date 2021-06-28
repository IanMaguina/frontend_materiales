import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaSolicitudPtcComponent } from './solicitante/nueva-solicitud-ptc/nueva-solicitud-ptc.component';
import { EditarSolicitudPtcComponent } from './solicitante/editar-solicitud-ptc/editar-solicitud-ptc.component';
import { PendienteSolicitudPtcComponent } from './solicitante/pendiente-solicitud-ptc/pendiente-solicitud-ptc.component';
import { ListarSolicitudPtcComponent } from './solicitante/listar-solicitud-ptc/listar-solicitud-ptc.component';
import { BandejaSolicitudPendientePtcComponent } from './supervisor/bandeja-solicitud-pendiente-ptc/bandeja-solicitud-pendiente-ptc.component';
import { VerSolicitudPendientePtcComponent } from './supervisor/ver-solicitud-pendiente-ptc/ver-solicitud-pendiente-ptc.component';
import { EditarSolicitudGestorPtcComponent } from './gestor/editar-solicitud-gestor-ptc/editar-solicitud-gestor-ptc.component';

const routes: Routes = [
  {path:'', redirectTo:'crearSolicitud', pathMatch:'full'},
  //solicitante
  {path:'crearSolicitudPT/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:'crearSolicitudRS/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:'crearSolicitudMP/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:'crearSolicitudAF/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  //{path:'consultarSolicitudesPendientes', component:PendienteSolicitudPtcComponent},
  //Consultas
  {path:'consultarProductosTerminados/:nivelEscenario', component:ListarSolicitudPtcComponent},
  {path:'consultarRepuestosSuministros/:nivelEscenario', component:ListarSolicitudPtcComponent},
  {path:'consultarMateriasPrimas/:nivelEscenario', component:ListarSolicitudPtcComponent},
  {path:'consultarActivos/:nivelEscenario', component:ListarSolicitudPtcComponent},
  //{path:'editarSolicitud', component:EditarSolicitudPtcComponent},
  {path:'editarSolicitud/:nivelEscenario/:id', component:EditarSolicitudPtcComponent},
  //supervisor
  
  {path:'consultarSolicitudesPendientesSupervisor/:nivelEscenario', component:BandejaSolicitudPendientePtcComponent},
  {path:'pendientesProductosTerminados/:nivelEscenario', component:BandejaSolicitudPendientePtcComponent},
  {path:'pendientesRepuestosSuministros/:nivelEscenario', component:BandejaSolicitudPendientePtcComponent},
  {path:'pendientesMateriaPrimas/:nivelEscenario', component:BandejaSolicitudPendientePtcComponent},
  {path:'pendientesActivos/:nivelEscenario', component:BandejaSolicitudPendientePtcComponent},

  {path:'verSolicitud/:nivelEscenario/:id', component:VerSolicitudPendientePtcComponent},
  {path:'editarSolicitudGestor/:nivelEscenario/:id', component:EditarSolicitudGestorPtcComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreacionRoutingModule { }
