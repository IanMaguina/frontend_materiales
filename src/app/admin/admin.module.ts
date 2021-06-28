import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ListarEstrategiaComponent } from './estrategia/listar-estrategia/listar-estrategia.component';
import { AsignarRolesComponent } from './estrategia/asignar-roles/asignar-roles.component';
import { AsignarUsuariosComponent } from './estrategia/asignar-usuarios/asignar-usuarios.component';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule} from '@angular/material/menu';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { AsignarPerfilUsuarioComponent } from './usuario/asignar-perfil-usuario/asignar-perfil-usuario.component';
import { AsignarCorreosComponent } from './estrategia/asignar-correos/asignar-correos.component';


@NgModule({
  declarations: [ListarEstrategiaComponent, AsignarRolesComponent, AsignarUsuariosComponent, ListarUsuarioComponent, EditarUsuarioComponent, AsignarPerfilUsuarioComponent, AsignarCorreosComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatGridListModule,
    MatCardModule,

    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatMenuModule,
    DragDropModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatProgressSpinnerModule
  ]
})
export class AdminModule { }
