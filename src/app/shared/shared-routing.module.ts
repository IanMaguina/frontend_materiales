import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaMaterialSapComponent } from './bandeja-material-sap/bandeja-material-sap.component';
import { BandejaMaterialesComponent } from './bandeja-materiales/bandeja-materiales.component';
import { HeaderComponent } from './header/header.component';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';

const routes: Routes = [
  {path:'', redirectTo:'header', pathMatch:'full'},
  {path:'header', component:HeaderComponent},
  {path:':tipoSolicitud/verSolicitud/:id', component:VerSolicitudComponent},
  {path:'bandejaMaterialesSap', component:BandejaMaterialesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
