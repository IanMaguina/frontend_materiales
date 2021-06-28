import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormValidatorService } from '../../../servicios/form-validator.service';

import { UsuarioService } from '../../../servicios/usuario.service';
import { Usuario } from '../../../modelos/usuario.interface';
import { AreaUsuario } from '../../../modelos/area.interface';
import { PerfilUsuario } from '../../../modelos/perfil.interface';
import { AreaUsuarioService } from '../../../servicios/area-usuario.service';
import { PerfilUsuarioService } from '../../../servicios/perfil-usuario.service';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';
import { AsignarPerfilUsuarioComponent } from '../asignar-perfil-usuario/asignar-perfil-usuario.component';




@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'nombre', 'area_usuario', 'perfil_usuario', 'id'];
  listadoUsuarios: Usuario[] =[];

  filtroForm: any;
  //Validation
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
    'area_usuario':{
      'required':'el area es requerida.',
    }
  };

  //Submitted form
  submitted = false;

  listadoAreas: AreaUsuario[] = [];
  listadoPerfiles: PerfilUsuario[] = [];


  //MENSAJES
  MENSAJE_DESHABILITAR_USUARIO = "Se cambió la actividad del usuario!";
  MENSAJE_CREAR_USUARIO = "Se registró el usuario correctamente!";
  //FIN MENSAJES

  constructor(
    private _snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private formValidatorService:FormValidatorService,
    private matDialog: MatDialog,
    private usuarioService: UsuarioService,
    private areaUsuarioService: AreaUsuarioService,
    private perfilUsuarioService: PerfilUsuarioService,
  ) {
    this.filtroForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      perfil_usuario: [''],
      area_usuario: ['', Validators.required],
    })

    this.filtroForm.valueChanges
    .subscribe(() =>{
      this.formErrors = this.formValidatorService.handleFormChanges(this.filtroForm,this.formErrors,this.validationMessages,this.submitted);
    });
  }

  ngOnInit(): void {
    this.getListarAreas();
    this.getListarPerfiles();
  }

  async getListarAreas(){
    this.listadoAreas = await this.areaUsuarioService.getListarAreasUsuario();
  }

  async getListarPerfiles(){
    this.listadoPerfiles = await this.perfilUsuarioService.getListarPerfilesUsuario();
  }


  crearUsuario(form:Usuario){
    this.usuarioService.crearUsuario(form).then( (data) =>{
      if(data.resultado == 1 ){
        this._snack.open(this.MENSAJE_CREAR_USUARIO,'cerrar', {
          duration: 2000,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.filtrarUsuarios();
      }else{
        this._snack.open(data.mensaje,'cerrar', {
          duration: 2000,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.filtrarUsuarios();
      }
    })
  }

  toggleUsuario(form:Usuario){

    this.usuarioService.activarUsuario(form).then( (data) =>{

      //console.log("la data q regresa " + JSON.stringify(data));
      if(data.resultado == 1 ){
        this._snack.open(this.MENSAJE_DESHABILITAR_USUARIO,'cerrar', {
          duration: 2000,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
      }
    }).finally(() => this.filtrarUsuarios())
  }


  async filtrarUsuarios(){
    let usuario = this.filtroForm.get('usuario').value;
    let nombre = this.filtroForm.get('nombre').value;
    let perfil_usuario = this.filtroForm.get('perfil_usuario').value;
    let area_usuario = this.filtroForm.get('area_usuario').value;

    let filtro = {
      "usuario": (usuario),
      "nombre": (nombre),
      "id_perfil_usuario": (perfil_usuario),
      "id_area_usuario": (area_usuario)
    }


    await this.usuarioService.getListarUsuarioPorFiltros(filtro).then((data)=>{
      this.listadoUsuarios = data;
    })
  }


  openDialogEditar(usuario:Usuario):void {
    //console.log("usuario enviado a editar =" + JSON.stringify(usuario));
    const dialogRef = this.matDialog.open(EditarUsuarioComponent, {
      disableClose: true,
      data:usuario
    });

    dialogRef.afterClosed().subscribe( result => {
      this.filtrarUsuarios();
    });


  }
  openDialogAsignarPerfiles(usuario:Usuario): void {
    const dialogRef2 = this.matDialog.open(AsignarPerfilUsuarioComponent, {
      disableClose: true,
      data: usuario
    });

    dialogRef2.afterClosed().subscribe(result => {
      this.filtrarUsuarios();
    });
  }

  limpiarUsuario(){
    
    this.filtroForm.get('usuario').setValue("");
    this.filtroForm.get('nombre').setValue("");
    this.filtroForm.get('area_usuario').setValue("");
  }

  test(data:any){
    console.log("al escribir me pasan esto: "+JSON.stringify(data));
  }
}
