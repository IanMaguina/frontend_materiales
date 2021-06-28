import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Usuario } from '../../../modelos/usuario.interface';
import { PerfilUsuarioService } from '../../../servicios/perfil-usuario.service';
import { AreaUsuarioService } from '../../../servicios/area-usuario.service';
import { FormValidatorService } from '../../../servicios/form-validator.service';
import { AreaUsuario } from 'src/app/modelos/area.interface';
import { PerfilUsuario } from 'src/app/modelos/perfil.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../../servicios/usuario.service';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuariodata:any;
  editarFormDialog:any;
  formErrors = {
    'usuario':'',
    'nombre':'',
    'perfil_usuario':'',
    'area_usuario':''
  }
  validationMessages = {
    'usuario':{
      'required':'el correo es requerido.'
    },
    'nombre':{
      'required':'el nombre es requerido.',
    },
    'perfil_usuario':{
      'required':'el perfil es requerido.',
    },
    'area_usuario':{
      'required':'el area es requerida.',
    }
  };
  //Submitted form
  submitted = false;
  carga:boolean = false;

  listadoAreas:AreaUsuario[] = [];
  listadoPerfiles:PerfilUsuario[] = [];

  //MENSAJES
  MENSAJE_ACTUALIZAR_USUARIO = "Se actualizó el usuario correctamente!";

  //FIN MENSAJES

  constructor(public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private formBuilder: FormBuilder,
    private _snack: MatSnackBar,
    private usuarioService: UsuarioService,
    private perfilUsuarioService:PerfilUsuarioService,
    private areaUsuarioService:AreaUsuarioService,
    private formValidatorService:FormValidatorService
    ) {

      this.usuariodata = data;
      this.editarFormDialog = this.formBuilder.group({
        id: [this.usuariodata.id],
        usuario: [this.usuariodata.usuario, Validators.required],
        nombre: [this.usuariodata.nombre, Validators.required],
        perfil_usuario: [this.usuariodata.perfil_usuario.id, Validators.required],
        area_usuario: [this.usuariodata.area_usuario.id, Validators.required],
      })
      this.editarFormDialog.valueChanges.subscribe(() => {
        this.formErrors = this.formValidatorService.handleFormChanges(this.editarFormDialog,this.formErrors,this.validationMessages,this.submitted);
      })
     }

  ngOnInit(): void {

    this.listarPerfiles();
    this.listarAreas();

  }

  async listarPerfiles(){
    this.listadoPerfiles = await this.perfilUsuarioService.getListarPerfilesUsuario();
  }

  async listarAreas(){
    this.listadoAreas = await this.areaUsuarioService.getListarAreasUsuario();
  }

  actualizarUsuario(form:Usuario){
    //console.log("formulario a actualizar -->" + JSON.stringify(form));

    this.usuarioService.actualizarUsuario(form).then( (data) =>{
      
        
        //this.onNoClick();
        
        this._snack.open(this.MENSAJE_ACTUALIZAR_USUARIO,'cerrar', {
          duration: 2000,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.dialogRef.close(this.usuariodata);
      
    })
  }
  onNoClick(): void {
    this.dialogRef.close(this.usuariodata);
  }
}
