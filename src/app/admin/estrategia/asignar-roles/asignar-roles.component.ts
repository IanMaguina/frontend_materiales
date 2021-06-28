import { Component, OnInit, Inject } from '@angular/core';
import {  moveItemInArray } from '@angular/cdk/drag-drop/';
import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {RolEstrategiaService} from '../../../servicios/rol-estrategia.service';
import { Estrategia } from '../../../modelos/estrategia.interface';
import { Rol } from '../../../modelos/rol.interface';
import { RolEstrategia } from '../../../modelos/rol-estrategia.interface';
import { EstrategiaRol } from 'src/app/modelos/estrategia-rol.interface';


@Component({
  selector: 'app-asignar-roles',
  templateUrl: './asignar-roles.component.html',
  styleUrls: ['./asignar-roles.component.css']
})
export class AsignarRolesComponent implements OnInit {

  listadoRoles: Rol[] = []
  listadoRolesxEstrategia: RolEstrategia[] = [];
  carga:boolean = false;
  selectedRol: any;
  btnGrabarVisible: boolean = false;
  btnAgregarVisible: boolean = true;
  ordenId = 0;
  constructor(public dialogRef: MatDialogRef<AsignarRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estrategia,
    private rolEstrategiaService:RolEstrategiaService
    ) {
      dialogRef.disableClose = true;
     // console.log('estrategia-->'+JSON.stringify(this.data));
      this.getListarRoles();
      this.getListarRolesAsignadosxEstrategia();
     }

  ngOnInit(): void {
    this.btnGrabarVisible = false;
  }

  async getListarRoles() {
    //llenar la data en Sociedades
    this.listadoRoles = await this.rolEstrategiaService.getListarRolesQueFaltanEnEstrategia(this.data)
    //console.log('listando roles-->'+JSON.stringify(this.listadoRoles))

  }

  async getListarRolesAsignadosxEstrategia() {
    //llenar la data en Sociedades
    this.listadoRolesxEstrategia = await this.rolEstrategiaService.getListarRolesAsignadosxEstrategia(this.data)
    //console.log('listando roles-->'+JSON.stringify(this.listadoRoles))

  }

  drop(event: CdkDragDrop<string[]>) {
    this.btnGrabarVisible = true;
    //this.btnAgregarVisible = false;
    moveItemInArray(this.listadoRolesxEstrategia, event.previousIndex, event.currentIndex);
  }

  agregarRolEstrategia(rol: Rol) {
    this.ordenId=this.listadoRolesxEstrategia.length+1;

    let estrategiaRol:EstrategiaRol = { orden: this.ordenId, estrategia: this.data, rol: rol }

    this.rolEstrategiaService.crearRolEstrategia(estrategiaRol).then((result)=>{

      this.getListarRoles();

      this.getListarRolesAsignadosxEstrategia();
      //console.log('grabando-->'+JSON.stringify(result));
    })
  }

  async grabarCambios() {
    this.btnGrabarVisible = false;
    //this.btnAgregarVisible = true;
    let listaOrdenada:any={};
    listaOrdenada = await this.mapRoles();
    this.rolEstrategiaService.actualizarListadoRolAsignadoxEstrategia(listaOrdenada).then((data)=>{
     //JSON.stringify(data);
     this.getListarRoles();
     this.getListarRolesAsignadosxEstrategia();

   })
    //this.dialogRef.close(this.rolxEstrategia);
    //console.log(JSON.stringify(this.listadoRolesxEstrategia));

  }

  async mapRoles() {
    let c = 0;
    let auxTrue:any[] = [];
    let auxFalse:any[] = [];

    this.listadoRolesxEstrategia.forEach((item) => {
      if (item.activo) {
        c++;
        auxTrue.push({ id: item.id, orden: c, rol: item.rol, activo: item.activo });

      } else {
        auxFalse.push({ id: item.id, orden: null, rol: item.rol, activo: item.activo })
      }
    })
    auxFalse.forEach((item) => {
      auxTrue.push(item);
    })


    return {"id_estrategia": this.data.id,"lista":auxTrue};
  }

  async actualizarActivoDeEstrategiaRol(){
    this.grabarCambios();
    return;
  }

  onNoClick(): void {

    this.btnGrabarVisible = false;
    //console.log(JSON.stringify(this.rolxEstrategia));
    this.dialogRef.close(this.listadoRolesxEstrategia);
  }
}
