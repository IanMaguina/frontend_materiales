import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguridad/auth.guard';
import { PrincipalComponent } from './principal/principal.component';
import { ReporteCantidadSolicitudComponent } from './reporte-cantidad-solicitud/reporte-cantidad-solicitud.component';
import { ReporteTiempoSolicitudComponent } from './reporte-tiempo-solicitud/reporte-tiempo-solicitud.component';

const routes: Routes = [
  {path:'', redirectTo:'principal', pathMatch:'full'},
  {path:'principal', component:PrincipalComponent},
  {path:'cantidadSolicitudes', component:ReporteCantidadSolicitudComponent},
  {path:'TiempoSolicitudes', component:ReporteTiempoSolicitudComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
