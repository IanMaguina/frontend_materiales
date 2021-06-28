import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PerfilUsuario } from 'src/app/modelos/perfil.interface';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { PerfilUsuarioService } from 'src/app/servicios/perfil-usuario.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
@Component({
  selector: 'app-asignar-perfil-usuario',
  templateUrl: './asignar-perfil-usuario.component.html',
  styleUrls: ['./asignar-perfil-usuario.component.css']
})
export class AsignarPerfilUsuarioComponent implements OnInit {

  comboListadoPerfilesPendientes:PerfilUsuario[] = [];

  usuario!:Usuario;
  carga:boolean = false;
  selectedPerfil:any;

  listadoPerfiles:PerfilUsuario[] = [];

  displayedColumns:string[] = ['perfil','acciones'];

  //mensajes 
  MENSAJE_ASIGNAR_PERFIL = "Se asignó un perfil a su usuario!";
  MENSAJE_QUITAR_PERFIL = "Se retiró un perfil a su usuario!";
  

  //fin mensajes

  constructor(public dialogRef2: MatDialogRef<AsignarPerfilUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private perfilUsuarioService:PerfilUsuarioService,
    private _snack: MatSnackBar
    ) { 
      console.log(JSON.stringify(data))
      this.usuario = data;

    }

  ngOnInit(): void {
    this.getPerfilesPendientes();
    this.listarPerfilesUsuario();
  }

  listarPerfilesUsuario(){
    this.perfilUsuarioService.getListaPerfilesUsuario(this.usuario.id).then( perfil => {
      console.log("los perfiles son :"+JSON.stringify(perfil));
      this.listadoPerfiles = perfil.lista;

    })
  }

  getPerfilesPendientes(){
    this.perfilUsuarioService.getListarPerfilesUsuarioPendientes(this.usuario.id).then( perfil => {
      console.log("los perfiles son :"+JSON.stringify(perfil));
      this.comboListadoPerfilesPendientes = perfil;
    })
  }
  asignarPerfil(perfil:any){
    let item = {
      "id_usuario": this.usuario.id,
      "id_perfil_usuario": perfil.id
    }
    this.perfilUsuarioService.asignarPerfilUsuario(item).then( result => {
      console.log("se asignó el perfil "+ JSON.stringify(result));
      this._snack.open(this.MENSAJE_ASIGNAR_PERFIL,'cerrar', {
        duration: 2000,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      this.getPerfilesPendientes();
      this.listarPerfilesUsuario(); 
    })

  }
  eliminarPerfil(perfil:any){
    let item = {
      "id_usuario": this.usuario.id,
      "id_perfil_usuario": perfil.id
    }
    this.perfilUsuarioService.desasignarPerfilUsuario(item).then( result => {
      console.log("se desasignó el usuario"+JSON.stringify(result));


      this._snack.open(this.MENSAJE_QUITAR_PERFIL,'cerrar', {
        duration: 2000,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      this.listarPerfilesUsuario();
      this.getPerfilesPendientes();
    })
    
  }
  onNoClick(): void {

    //console.log(JSON.stringify(this.rolxEstrategia));
    this.dialogRef2.close(this.listadoPerfiles);
  }

}
