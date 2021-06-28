import { Component, OnInit, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Estrategia } from '../../../modelos/estrategia.interface';
import { Rol } from '../../../modelos/rol.interface';
import { RolEstrategia } from '../../../modelos/rol-estrategia.interface';
import { Usuario } from '../../../modelos/usuario.interface';
import { UsuarioRol } from '../../../modelos/usuario-rol.interface';

import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RolEstrategiaService } from '../../../servicios/rol-estrategia.service';
import { UsuarioRolService } from '../../../servicios/usuario-rol.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-asignar-usuarios',
  templateUrl: './asignar-usuarios.component.html',
  styleUrls: ['./asignar-usuarios.component.css']
})
export class AsignarUsuariosComponent implements OnInit {
  comboListadoUsuario: Usuario[] = []
  estrategia: Estrategia;
  //listRolEstrategia: RolEstrategia[];
  carga:boolean = false;
  selectedUsuario: any;
  selectedRolEstrategia: any;
  listadoUsuarioRol: UsuarioRol[] = [];

  contadorId = 0;
  myControl = new FormControl();
  filteredUsuario!: Observable<Usuario[]>;

  displayedColumns: string[] = ['rol', 'usuario', 'id'];


  comboRolesxEstrategia: any[] = [];
  constructor(public dialogRef: MatDialogRef<AsignarUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rolEstrategiaService: RolEstrategiaService,
    private usuarioRolService: UsuarioRolService
  ) {
    //console.log("-->" + JSON.stringify(this.data))
    this.estrategia = data.estrategia;
    //this.listRolEstrategia = data.rolEstrategia;

    this.listarRolesActivosDeEstrategiaSinUsuarioExceptoSolicitantePorId();

    this.listarUsuarioConRolPorIdEstrategia();
  }

  async ngOnInit() {
    let listado = await this.usuarioRolService.getListarUsuariosQueNoEstanAsignadosAUnaEstrategiaPorId(this.estrategia);
    this.comboListadoUsuario = listado.lista;
    this.filteredUsuario = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this._filter(nombre) : this.comboListadoUsuario.slice())
      );
  }

  async listarRolesActivosDeEstrategiaSinUsuarioExceptoSolicitantePorId() {
    //llenar la data en Sociedades
    this.rolEstrategiaService.getListarRolesActivosDeEstrategiaSinUsuarioExceptoSolicitantePorId(this.estrategia).then((data) => {
      this.comboRolesxEstrategia = data.lista;
      console.log("roles--->" + JSON.stringify(this.comboRolesxEstrategia));
    })
    //console.log('listando roles-->'+JSON.stringify(this.listadoRoles))
  }

  async getListarUsuariosQueNoEstanAsignadosAUnaEstrategiaPorId() {
    //llenar la data en Sociedades
    this.usuarioRolService.getListarUsuariosQueNoEstanAsignadosAUnaEstrategiaPorId(this.estrategia).then((data) => {
      this.comboListadoUsuario = data.lista;
      console.log("usuarios--->" + JSON.stringify(this.comboListadoUsuario));
    })
    //console.log('listando roles-->'+JSON.stringify(this.listadoRoles))
  }

  async listarUsuarioConRolPorIdEstrategia() {
    //llenar la data en Sociedades
    this.usuarioRolService.getListarUsuarioConRolPorIdEstrategia(this.estrategia).then((data) => {
      this.listadoUsuarioRol = data.lista;
      console.log('listando getListarUsuarioConRolPorIdEstrategia-->'+JSON.stringify(this.listadoUsuarioRol))
    })
    //console.log('listando roles-->'+JSON.stringify(this.listadoRoles))

  }
  agregarUsuarioRol(item: Usuario, item2: RolEstrategia) {
    //this.carga = true;
    console.log("item usuario:" + JSON.stringify(item));
    console.log("item Rol Estrategia:" + JSON.stringify(item2));
    let usuarioRol: UsuarioRol = {
      "usuario": item,
      "estrategia_rol": item2
    }

    this.usuarioRolService.crearUsuarioARolDeEstrategia(usuarioRol).then(() => {

      this.listarRolesActivosDeEstrategiaSinUsuarioExceptoSolicitantePorId();
      this.getListarUsuariosQueNoEstanAsignadosAUnaEstrategiaPorId();
      this.listarUsuarioConRolPorIdEstrategia();
     // this.carga = false;

    })

    //this.listadoUsuarioRol.push({ id: this.contadorId, rolEstrategia: item2, usuario: item, activo: true });

  }

  eliminarUsuario(item:UsuarioRol){

    this.usuarioRolService.actualizarActivoDeEstrategiaRolUsuario(item).then( (data) => {
      this.listarRolesActivosDeEstrategiaSinUsuarioExceptoSolicitantePorId();
      this.getListarUsuariosQueNoEstanAsignadosAUnaEstrategiaPorId();
      this.listarUsuarioConRolPorIdEstrategia();
    })

  }

  removeItem(item: Usuario) {
    let array: any[] = [];
    this.comboListadoUsuario.forEach(element => {
      if (element.nombre != item.nombre) {
        array.push({ id: element.id, nombre: element.nombre })
      }
    });
    this.comboListadoUsuario = array;
    this.selectedUsuario = {};
  }

  displayFn(user: Usuario): string {
    return user && user.nombre ? user.nombre : '';
  }

  private _filter(nombre: string): Usuario[] {
    const filterValue = nombre.toLowerCase();

    return this.comboListadoUsuario.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  onNoClick(): void {

    //console.log(JSON.stringify(this.rolxEstrategia));
    this.dialogRef.close(this.listadoUsuarioRol);
  }
}
