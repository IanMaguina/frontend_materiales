import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { AsignarUsuariosComponent } from './../../estrategia/asignar-usuarios/asignar-usuarios.component';
import { AsignarRolesComponent } from './../../estrategia/asignar-roles/asignar-roles.component';

import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Sociedad } from './../../../modelos/sociedad.interface';

import { TipoSolicitud } from '../../../modelos/tipo-solicitud.interface';
import { Estrategia } from '../../../modelos/estrategia.interface';

import { SociedadService } from '../../../servicios/sociedad.service';
import { Nivel1Service } from '../../../servicios/nivel1.service';
import { Nivel2Service } from '../../../servicios/nivel2.service';
import { Nivel3Service } from '../../../servicios/nivel3.service';
import { TipoSolicitudService } from '../../../servicios/tipo-solicitud.service';
import { EstrategiaService } from '../../../servicios/estrategia.service';
import { Nivel1 } from 'src/app/modelos/nivel1.interface';
import { Nivel2 } from 'src/app/modelos/nivel2.interface';
import { Nivel3 } from 'src/app/modelos/nivel3.interface';
import { RolEstrategia } from 'src/app/modelos/rol-estrategia.interface';

import { FormValidatorService } from '../../../servicios/form-validator.service';
import { AsignarCorreosComponent } from '../asignar-correos/asignar-correos.component';
import { Messages } from 'src/app/shared/messages';
@Component({
  selector: 'app-listar-estrategia',
  templateUrl: './listar-estrategia.component.html',
  styleUrls: ['./listar-estrategia.component.css']
})
export class ListarEstrategiaComponent implements OnInit {

  listadoSociedades: Sociedad[] = [];
  listadoNivel1: Nivel1[] = [];
  listadoNivel2: Nivel2[] = [];
  listadoNivel3: Nivel3[] = [];
  listadoTipoSolicitud: TipoSolicitud[] = [];
  listadoEstrategias: Estrategia[] = [];

  filtroForm: any;

  //displayedColumns: string[] = ['sociedad', 'escenario_1', 'escenario_2', 'linea_negocio', 'tipo_solicitud', 'id_estrategia'];
  displayedColumns: string[] = ['sociedad', 'escenario_1', 'escenario_2', 'linea_negocio', 'tipo_solicitud', 'id_estrategia'];

  //Validation
  formErrors = {
    'sociedad':'',
    'nivel1':'',
    'nivel2':'',
    'nivel3':'',
    'tipoSolicitud':''
  }

  validationMessages = {
    'sociedad':{
      'required':'Sociedad es requerido.'
    },
    'nivel1':{
      'required':'nivel1 es requerida.',
    },
    'nivel2':{
      'required':'nivel2 es requerida.',
    },
    'nivel3':{
      'required':'nivel3 es requerida.',
    },
    'tipoSolicitud':{
      'required':'tipoSolicitud es requerida.',
    }
  };

  //Submitted form
  submitted = false;

  btnAsignarUsuarioDisabled=true;

  MENSAJE_REGISTRAR_ESTRATEGIA:string = Messages.confirmation.MENSAJE_REGISTRAR_ESTRATEGIA;
  
  constructor(
    private router: Router,
    private _snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private sociedadService: SociedadService,
    private nivel1Service: Nivel1Service,
    private nivel2Service: Nivel2Service,
    private nivel3Service: Nivel3Service,
    private tipoSolicitudService: TipoSolicitudService,
    private estrategiaService: EstrategiaService,
    private formValidatorService:FormValidatorService,
    private matDialog: MatDialog
  ) {
    this.filtroForm = this.formBuilder.group({
      sociedad: ['', Validators.required],
      nivel1: ['', Validators.required],
      nivel2: ['', Validators.required],
      nivel3: ['', Validators.required],
      tipoSolicitud: ['', Validators.required],
    })
    this.filtroForm.valueChanges
    .subscribe(() =>{
      this.formErrors = this.formValidatorService.handleFormChanges(this.filtroForm,this.formErrors,this.validationMessages,this.submitted);

    });
  }

  ngOnInit(): void {
    this.getListarSociedades();
    this.getListarTipoSolicitud();
  }

  async getListarSociedades() {
    //llenar la data en Sociedades
    this.listadoSociedades = await this.sociedadService.getListarSociedades()

  }

  async getListarTipoSolicitud() {
    //llenar la data en Sociedades
    this.listadoTipoSolicitud = await this.tipoSolicitudService.getListarTipoSolicitud()
  }

  async filtrarNivel1() {
    this.listadoNivel1 = [];
    this.listadoNivel2 = [];
    this.listadoNivel3 = [];
    let sociedad: Sociedad = this.filtroForm.get('sociedad').value;
    let tipoSolicitud:TipoSolicitud = this.filtroForm.get('tipoSolicitud').value;
    console.log(sociedad);
    this.listadoNivel1 = await this.nivel1Service.getListarNivel1(sociedad)

    let filtro = {
      "id_sociedad": sociedad.id,
      "id_tipo_solicitud": (tipoSolicitud?tipoSolicitud.id:null),
    }
    this.getListarEstrategias(filtro);
  }

  async filtrarNivel2() {
    this.listadoNivel2 = [];
    this.listadoNivel3 = [];
    let nivel1 = this.filtroForm.get('nivel1').value; 
    let tipoSolicitud:TipoSolicitud = this.filtroForm.get('tipoSolicitud').value;
    console.log(nivel1);
    this.listadoNivel2 = await this.nivel2Service.getListarNivel2(nivel1)

    let filtro = {
      "id_escenario_nivel1": nivel1.id,
      "id_tipo_solicitud": (tipoSolicitud?tipoSolicitud.id:null),
    }
    this.getListarEstrategias(filtro);
  }

  async filtrarNivel3() {
    this.listadoNivel3 = [];
    let nivel2 = this.filtroForm.get('nivel2').value;
    let tipoSolicitud:TipoSolicitud = this.filtroForm.get('tipoSolicitud').value;
    console.log(nivel2);
    this.listadoNivel3 = await this.nivel3Service.getListarNivel3(nivel2)
    let filtro = {
      "id_escenario_nivel2": nivel2.id,
      "id_tipo_solicitud": (tipoSolicitud?tipoSolicitud.id:null),
    }
    this.getListarEstrategias(filtro);
  }

  filtrarxTipoSolicitud(){

    let sociedad: Sociedad = this.filtroForm.get('sociedad').value;
    let nivel1 = this.filtroForm.get('nivel1').value;
    let nivel2 = this.filtroForm.get('nivel2').value;
    let nivel3 = this.filtroForm.get('nivel3').value;
    let tipoSolicitud:TipoSolicitud = this.filtroForm.get('tipoSolicitud').value;
    let filtro = {
      "id_sociedad": (sociedad?sociedad.id:null),
      "id_escenario_nivel1": (nivel1?nivel1.id:null),
      "id_escenario_nivel2": (nivel2?nivel2.id:null),
      "id_escenario_nivel3": (nivel3?nivel3.id:null),
      "id_tipo_solicitud": (tipoSolicitud?tipoSolicitud.id:null),
  }
    this.getListarEstrategias(filtro);
  }


  getListarEstrategias(data: any) {
    //listar las estrategias desde la bd
    this.listadoEstrategias = [];
    this.estrategiaService.getListarEstrategias(data).then((resultado: Estrategia[]) => {
      this.listadoEstrategias = resultado;

      //console.log('listado estrategisa-->' + JSON.stringify(this.listadoEstrategias));

    })

  }

  crearEstrategia(form: any) {
    let nivel3 = this.filtroForm.get('nivel3').value;
    let tipoSolicitud = this.filtroForm.get('tipoSolicitud').value;
    let estrategia: Estrategia = {
      escenario_nivel3: nivel3,
      tipo_solicitud: tipoSolicitud
    }
    this.estrategiaService.crearEstrategia(estrategia).then(() => {


    this.filtrarxTipoSolicitud();

        this._snack.open(this.MENSAJE_REGISTRAR_ESTRATEGIA,'cerrar', {
          duration: 2000,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
    })
    console.log("crear en la base de datos la estrategia");
  }


  openDialogAsignarRoles(estrategia:Estrategia): void {
    const dialogRef = this.matDialog.open(AsignarRolesComponent, {
      disableClose: true,
      data: estrategia
    });

    dialogRef.afterClosed().subscribe(result => {
      //vienen los datos del dialog
      console.log('The dialog was closed'+JSON.stringify(result));
      this.mapRolEstrategia(result);
      //this.animal = result;
    });
  }

   mapRolEstrategia(result:RolEstrategia[]){
    this.btnAsignarUsuarioDisabled=true;
    result.forEach((val)=>{
      this.btnAsignarUsuarioDisabled=false;
      //this.listRolEstrategia.push({id:val.id,orden:val.orden,estrategia:val.estrategia,rol:val.rol,activo:val.activo})
    })
  }


  openDialogAsignarUsuarios(estrategia:Estrategia): void {
    const dialogRef2 = this.matDialog.open( AsignarUsuariosComponent, {
      disableClose: true,
      //data: {estrategia: estrategia, rolEstrategia: this.listRolEstrategia}
      data: {estrategia: estrategia}
    });

    dialogRef2.afterClosed().subscribe(result => {
      //vienen los datos del dialog
      console.log('The dialog was closed '+JSON.stringify(result));
    });
  }

  openDialogEquivalencias(estrategia:Estrategia): void {

    let data = {
      "id_estrategia": estrategia.id,
    }


    const dialogRef3 = this.matDialog.open(AsignarCorreosComponent, {
      disableClose: true,
      data: data,
      width: '60%'
    });
    dialogRef3.afterClosed().subscribe(result => {
      if (result.respuesta != "CONFIRM_DLG_YES") {
        console.log("se cerró el dialog de correos");
      }

    });
  }


}
