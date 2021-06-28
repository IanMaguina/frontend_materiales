import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormValidatorService } from '../../../../servicios/form-validator.service';
import { PageEvent } from '@angular/material/paginator';

import { SolicitudService } from '../../../../servicios/solicitud.service';
import { SolicitudCabecera } from 'src/app/modelos/solicitud-cabecera';

import { GlobalSettings } from 'src/app/shared/settings';
import { LineaNegocio } from 'src/app/modelos/linea-negocio.interface';
import { Estado } from 'src/app/modelos/estado.interface';
import { Nivel3Service } from 'src/app/servicios/nivel3.service';

import { EstadoSolicitudService } from 'src/app/servicios/estado-solicitud.service';
import { Sociedad } from 'src/app/modelos/sociedad.interface';
import { SociedadService } from 'src/app/servicios/sociedad.service';

@Component({
  selector: 'app-listar-solicitud-ptc',
  templateUrl: './listar-solicitud-ptc.component.html',
  styleUrls: ['./listar-solicitud-ptc.component.css']

})
export class ListarSolicitudPtcComponent implements OnInit {

  //inicio paginator
  resultsLength = 0;
  itemPerPage = GlobalSettings.CANTIDAD_FILAS;
  pageEvent!: PageEvent;
  page = 1;
  //fin paginator
  TIPO_SOLICITUD_CREACION: number = GlobalSettings.TIPO_SOLICITUD_CREACION;

  //escenarios
  ESCENARIO_NIVEL1: string = '';//GlobalSettings.ESCENARIO_NIVEL1_PRODUCTOS_TERMINADOS;

  ESTADO_SOLICITUD_EN_SOLICITANTE = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SUPERVISION = GlobalSettings.ESTADO_SOLICITUD_EN_SUPERVISION;
  ESTADO_SOLICITUD_EN_CALIDAD = GlobalSettings.ESTADO_SOLICITUD_EN_CALIDAD;
  ESTADO_SOLICITUD_EN_COSTOS = GlobalSettings.ESTADO_SOLICITUD_EN_COSTOS;
  ESTADO_SOLICITUD_EN_CONTROL_GESTION = GlobalSettings.ESTADO_SOLICITUD_EN_CONTROL_GESTION;
  ESTADO_SOLICITUD_EN_COMERCIAL = GlobalSettings.ESTADO_SOLICITUD_EN_COMERCIAL;
  ESTADO_SOLICITUD_EN_ADMINISTRACION = GlobalSettings.ESTADO_SOLICITUD_EN_ADMINISTRACION;
  ESTADO_SOLICITUD_EN_SAP = GlobalSettings.ESTADO_SOLICITUD_EN_SAP;



  filtroForm: any;

  displayedColumns: string[] = [
    'codigo',
    'descripcion_corta',
    'fecha_hora',
    //'cantidad_materiales',
    'creador',
    'estado',
    'id',
  ];
  listadoSolicitudes: SolicitudCabecera[] = [];
  listadoEstado: Estado[] = [];
  listadoAreas: any[] = [];

  listadoLineaNegocio: LineaNegocio[] = [];
  submitted = false;
  listadoSociedades: Sociedad[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private solicitudService: SolicitudService,
    private nivel3Service: Nivel3Service,
    private estadoSolicitudService: EstadoSolicitudService,
    private sociedadService: SociedadService,
    private rutaActiva: ActivatedRoute
  ) {

    this.ESCENARIO_NIVEL1= this.rutaActiva.snapshot.params.nivelEscenario;

  }

  async getListarSociedades() {
    //llenar la data en Sociedades
    this.listadoSociedades = await this.sociedadService.getListarSociedades()

  }

  ngOnInit(): void {
    //solo estoy llamando el listado al inicio 
    this.initForm();
    this.getListarSociedades();
    //this.getListarNivel3xSociedad();
    this.getListarEstadoSolicitud();

  }

  initForm() {
    this.filtroForm = this.formBuilder.group({
      sociedad: [''],
      selectecLineaNegocio: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      estado: ['']
    })
  }



  getListarNivel3Solicitud() {
    let params: any = {
      "id_rol": GlobalSettings.ROL_SOLICITANTE,
      "id_tipo_solicitud": this.TIPO_SOLICITUD_CREACION,
      "codigo_escenario_nivel1": this.ESCENARIO_NIVEL1
    }
    this.nivel3Service.getListarNivel3SolicitudPorUsuario(params).then((data) => {
      //this.nivel3Service.getListarNivel3SolicitudPorUsuario(params).then((data) => {
      if (data.resultado == 1) {
        this.listadoLineaNegocio = data['lista'];
      }
    });
  }

  getListarNivel3xSociedad() {
    console.log("antes");
    let sociedad: Sociedad = this.filtroForm.get('sociedad').value;
    console.log(sociedad.id);
    this.nivel3Service.getListarNivel3SolicitudPorIdSociedad(sociedad.id).then((data) => {
      //this.nivel3Service.getListarNivel3SolicitudPorUsuario(params).then((data) => {
      if (data.resultado == 1) {
        this.listadoLineaNegocio = data['lista'];
      }
    });
  }
  getListarEstadoSolicitud() {
    this.estadoSolicitudService.getListarEstado().then((data) => {
      if (data.resultado == 1) {
        this.listadoEstado = data['lista'];
      }

    });
  }


  filtrarSolicitud() {
    //console.log("form" + JSON.stringify(form));
    //cantidad_filas es la cantidad que se requiere 

    let estados = this.ESTADO_SOLICITUD_EN_SOLICITANTE +
      "," + this.ESTADO_SOLICITUD_EN_SUPERVISION +
      "," + this.ESTADO_SOLICITUD_EN_CALIDAD +
      "," + this.ESTADO_SOLICITUD_EN_COSTOS +
      "," + this.ESTADO_SOLICITUD_EN_CONTROL_GESTION +
      "," + this.ESTADO_SOLICITUD_EN_COMERCIAL +
      "," + this.ESTADO_SOLICITUD_EN_ADMINISTRACION +
      "," + this.ESTADO_SOLICITUD_EN_SAP
    let estado = this.filtroForm.get('estado').value;
    let lineaNegocio = this.filtroForm.get('selectecLineaNegocio').value;
    let fechaInicio = this.filtroForm.get('fecha_inicio').value;
    let fecha_fin = this.filtroForm.get('fecha_fin').value;

    let params: any = {
      "id_escenario_nivel1": this.ESCENARIO_NIVEL1 == "" ? null : this.ESCENARIO_NIVEL1,
      "id_estado_solicitud": estado == "" ? null : estado.id,
      "id_escenario_nivel3": lineaNegocio == "" ? null : lineaNegocio.id,
      "id_tipo_solicitud": this.TIPO_SOLICITUD_CREACION,
      "fecha_inicio": fechaInicio == "" ? null : fechaInicio,
      "fecha_fin": fecha_fin == "" ? null : fecha_fin,
      "cantidad_filas": this.itemPerPage,
      "pagina": this.page
    }
    //esto debería aplicarse a la cantidad total con el filtro
    //aqui se ajusta a lo que manda por eso uso un numero grande estimado
    //this.resultsLength = 9;


    this.solicitudService.contarMisSolicitudes(params).then((val) => {
      this.resultsLength = val.cantidad;
      console.log('cantidad--->' + JSON.stringify(this.resultsLength));
      this.solicitudService.buscarMisSolicitudes(params).then((data) => {
        console.log('listado de solicitudes-->' + JSON.stringify(data['lista']));
        this.listadoSolicitudes = data['lista'];
        //this.dataSource.data = data['lista'];
      })
    })
  }



  verDetalleSolicitud(item: SolicitudCabecera) {
    console.log(JSON.stringify(item));
    if (item['estadoSolicitud'] && this.ESTADO_SOLICITUD_EN_SOLICITANTE == item['estadoSolicitud'].id)
      this.router.navigate(['/shared/verSolicitud', item.id]);

    if (item['estadoSolicitud'] && this.ESTADO_SOLICITUD_EN_SUPERVISION == item['estadoSolicitud'].id)
      this.router.navigate(['/productosTerminados/verSolicitud', item.id]);

    if (item['estadoSolicitud']
      && (item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_CALIDAD
        || item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_COSTOS
        || item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_CONTROL_GESTION
        || item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_COMERCIAL
        || item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_ADMINISTRACION
        || item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_SAP

      ))
      this.router.navigate(['/shared/verSolicitud', item.id]);

  }

  onPaginateChange(form: any, event: PageEvent) {

    //console.log("estamos en la pagina : " + event.pageIndex);
    this.page = event.pageIndex + 1;

    //console.log("cantidad de elementos por hoja es :" + size);
    let estado = this.filtroForm.get('estado').value;
    let lineaNegocio = this.filtroForm.get('selectecLineaNegocio').value;
    let fechaInicio = this.filtroForm.get('fecha_inicio').value;
    let fecha_fin = this.filtroForm.get('fecha_fin').value;
    let xxy: any = {
      "id_estado_solicitud": estado == "" ? null : estado.id,
      "id_escenario_nivel3": lineaNegocio == "" ? null : lineaNegocio.id,
      "id_tipo_solicitud": this.TIPO_SOLICITUD_CREACION,
      "fecha_inicio": fechaInicio == "" ? null : fechaInicio,
      "fecha_fin": fecha_fin == "" ? null : fecha_fin,
      "cantidad_filas": this.itemPerPage,
      "pagina": this.page
    }
    console.log('numero de pagina-->' + this.page);
    this.solicitudService.buscarMisSolicitudes(xxy).then((data) => {
      //console.log(JSON.stringify(data['lista']));
      this.listadoSolicitudes = data['lista'];
      //this.resultsLength = data['lista'].length;
      // this.dataSource.data = data['lista'];
    })

  }

}