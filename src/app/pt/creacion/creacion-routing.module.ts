import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaSolicitudPtcComponent } from './solicitante/nueva-solicitud-ptc/nueva-solicitud-ptc.component';
import { EditarSolicitudPtcComponent } from './solicitante/editar-solicitud-ptc/editar-solicitud-ptc.component';
import { ListarSolicitudPtcComponent } from './bandeja/listar-solicitud-ptc/listar-solicitud-ptc.component';
import { BandejaSolicitudPendientePtcComponent } from './bandeja/bandeja-solicitud-pendiente-ptc/bandeja-solicitud-pendiente-ptc.component';
import { VerSolicitudPendientePtcComponent } from './supervisor/ver-solicitud-pendiente-ptc/ver-solicitud-pendiente-ptc.component';
import { EditarSolicitudGestorPtcComponent } from './gestor/editar-solicitud-gestor-ptc/editar-solicitud-gestor-ptc.component';

const routes: Routes = [
  {path:'', redirectTo:'crearSolicitud', pathMatch:'full'},
  //solicitante
  {path:':tipoSolicitud/crearSolicitudPT/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/crearSolicitudRS/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/crearSolicitudMP/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/crearSolicitudAF/:nivelEscenario', component:NuevaSolicitudPtcComponent},

  {path:':tipoSolicitud/ampliarSolicitudPT/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/ampliarSolicitudRS/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/ampliarSolicitudMP/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/ampliarSolicitudAF/:nivelEscenario', component:NuevaSolicitudPtcComponent},

  {path:':tipoSolicitud/modificarSolicitudPT/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/modificarSolicitudRS/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/modificarSolicitudMP/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/modificarSolicitudAF/:nivelEscenario', component:NuevaSolicitudPtcComponent},

  {path:':tipoSolicitud/bloquearSolicitudPT/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/bloquearSolicitudRS/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/bloquearSolicitudMP/:nivelEscenario', component:NuevaSolicitudPtcComponent},
  {path:':tipoSolicitud/bloquearSolicitudAF/:nivelEscenario', component:NuevaSolicitudPtcComponent},

  //Editar Solicitantes
  {path:':tipoSolicitud/editarSolicitud/:nivelEscenario/:id', component:EditarSolicitudPtcComponent},
  
  //{path:'consultarSolicitudesPendientes', component:PendienteSolicitudPtcComponent},
  //Consultas
  {path:':tipoSolicitud/consultarProductosTerminados/:nivelEscenario', component:ListarSolicitudPtcComponent},
  {path:':tipoSolicitud/consultarRepuestosSuministros/:nivelEscenario', component:ListarSolicitudPtcComponent},
  {path:':tipoSolicitud/consultarMateriasPrimas/:nivelEscenario', component:ListarSolicitudPtcComponent},
  {path:':tipoSolicitud/consultarActivos/:nivelEscenario', component:ListarSolicitudPtcComponent},
  
  //supervisor
  {path:':tipoSolicitud/consultarSolicitudesPendientesSupervisor/:nivelEscenario', component:BandejaSolicitudPendientePtcComponent},
  
  //Bandeja de pendientes
  {path:':tipoSolicitud/pendientesProductosTerminados/:nivelEscenario', component:BandejaSolicitudPendientePtcComponent},
  {path:':tipoSolicitud/pendientesRepuestosSuministros/:nivelEscenario', component:BandejaSolicitudPendientePtcComponent},
  {path:':tipoSolicitud/pendientesMateriasPrimas/:nivelEscenario', component:BandejaSolicitudPendientePtcComponent},
  {path:':tipoSolicitud/pendientesActivos/:nivelEscenario', component:BandejaSolicitudPendientePtcComponent},

  //Gestor
  {path:':tipoSolicitud/verSolicitud/:nivelEscenario/:id', component:VerSolicitudPendientePtcComponent},
  {path:':tipoSolicitud/editarSolicitudGestor/:nivelEscenario/:id', component:EditarSolicitudGestorPtcComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreacionRoutingModule { }
