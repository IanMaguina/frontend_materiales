import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguridad/auth.guard';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {path:'', redirectTo:'principal', pathMatch:'full'},
  {path:'principal', component:PrincipalComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
