import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';

const routes: Routes = [
  {path:'', redirectTo:'header', pathMatch:'full'},
  {path:'header', component:HeaderComponent},
  {path:':tipoSolicitud/verSolicitud/:id', component:VerSolicitudComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
