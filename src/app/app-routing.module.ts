
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './seguridad/auth.guard';

const routes: Routes = [
  //{ path: '', redirectTo: 'account', pathMatch: 'full'},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', canActivate: [AuthGuard],
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),},
  { path: 'account', loadChildren: () => import('./autenticacion/autenticacion.module').then(m => m.AutenticacionModule),},
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),},
  { path: 'productosTerminados',loadChildren: () => import('./pt/creacion/creacion.module').then(m => m.CreacionModule),},
  { path: 'repuestosSuministros', loadChildren: () => import('./rs/creacion/creacion.module').then(m => m.CreacionModule),},
  { path: 'materiasPrimas', loadChildren: () => import('./mp/creacion/creacion.module').then(m => m.CreacionModule),},
  { path: 'activosOtros', loadChildren: () => import('./ao/creacion/creacion.module').then(m => m.CreacionModule),},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),},

/*   { path: 'inicio', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent},
 */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
