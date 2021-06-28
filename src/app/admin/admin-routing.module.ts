import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarEstrategiaComponent } from './estrategia/listar-estrategia/listar-estrategia.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';

const routes: Routes = [
  {path:'', redirectTo:'estrategias', pathMatch:'full'},
  {path:'estrategias', component:ListarEstrategiaComponent},
  {path:'usuarios', component:ListarUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
