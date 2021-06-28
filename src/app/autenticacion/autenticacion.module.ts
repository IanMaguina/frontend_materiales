import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import {MatCardModule} from '@angular/material/card';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class AutenticacionModule { }
