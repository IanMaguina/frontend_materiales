import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-bandeja-solicitud-pendiente-ptc',
  templateUrl: './bandeja-solicitud-pendiente-ptc.component.html',
  styleUrls: ['./bandeja-solicitud-pendiente-ptc.component.css']
})
export class BandejaSolicitudPendientePtcComponent implements OnInit {

  //inicio paginator
  resultsLength = 0;
  itemPerPage = GlobalSettings.CANTIDAD_FILAS;
  pageEvent!: PageEvent;
  page = GlobalSettings.PAGINA_INICIO;
  //fin paginator
  TIPO_SOLICITUD: number = GlobalSettings.TIPO_SOLICITUD_CREACION;
  TIPO_SOLICITUD_CREACION: number = GlobalSettings.TIPO_SOLICITUD_CREACION;
  TIPO_SOLICITUD_AMPLIACION: number = GlobalSettings.TIPO_SOLICITUD_AMPLIACION;
  TIPO_SOLICITUD_MODIFICACION: number = GlobalSettings.TIPO_SOLICITUD_MODIFICACION;
  TIPO_SOLICITUD_BLOQUEO: number = GlobalSettings.TIPO_SOLICITUD_BLOQUEO;

  //escenarios
  ESCENARIO_NIVEL1: string = '';//GlobalSettings.ESCENARIO_NIVEL1_PRODUCTOS_TERMINADOS;
  ESCENARIO_NIVEL1_PT: string = GlobalSettings.ESCENARIO_NIVEL1_PRODUCTOS_TERMINADOS;
  ESCENARIO_NIVEL1_RS: string = GlobalSettings.ESCENARIO_NIVEL1_REPUESTOS_SUMINISTROS;
  ESCENARIO_NIVEL1_MP: string = GlobalSettings.ESCENARIO_NIVEL1_MATERIAS_PRIMAS;
  ESCENARIO_NIVEL1_AO: string = GlobalSettings.ESCENARIO_NIVEL1_ACTIVOS_OTROS;


  ESTADO_SOLICITUD_EN_SOLICITANTE = GlobalSettings.ESTADO_SOLICITUD_EN_SOLICITANTE;
  ESTADO_SOLICITUD_EN_SUPERVISION = GlobalSettings.ESTADO_SOLICITUD_EN_SUPERVISION;
  ESTADO_SOLICITUD_EN_CALIDAD = GlobalSettings.ESTADO_SOLICITUD_EN_CALIDAD;
  ESTADO_SOLICITUD_EN_COSTOS = GlobalSettings.ESTADO_SOLICITUD_EN_COSTOS;
  ESTADO_SOLICITUD_EN_CONTROL_GESTION = GlobalSettings.ESTADO_SOLICITUD_EN_CONTROL_GESTION;
  ESTADO_SOLICITUD_EN_COMERCIAL = GlobalSettings.ESTADO_SOLICITUD_EN_COMERCIAL;
  ESTADO_SOLICITUD_EN_ADMINISTRACION = GlobalSettings.ESTADO_SOLICITUD_EN_ADMINISTRACION;
  ESTADO_SOLICITUD_EN_SAP = GlobalSettings.ESTADO_SOLICITUD_EN_SAP;
  ESTADO_SOLICITUD_FINALIZADO = GlobalSettings.ESTADO_SOLICITUD_FINALIZADO;

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
  listadoEstado: any[] = [];
  listadoAreas: any[] = [];

  listadoLineaNegocio: LineaNegocio[] = [];
  submitted = false;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private solicitudService: SolicitudService,
    private nivel3Service: Nivel3Service,
    private estadoSolicitudService: EstadoSolicitudService,
    private rutaActiva: ActivatedRoute
  ) {
    this.ESCENARIO_NIVEL1 = this.rutaActiva.snapshot.params.nivelEscenario;
    this.TIPO_SOLICITUD = parseInt(this.rutaActiva.snapshot.params.tipoSolicitud);
    this.initForm();
  }

  async ngOnInit() {
    this.getListarNivel3Solicitud();
    this.getListarEstadoSolicitud();
    await this.filtrarSolicitud();
  }

  initForm() {
    this.filtroForm = this.formBuilder.group({
      selectecLineaNegocio: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      estado: ['']
    })
  }



  getListarNivel3Solicitud() {
    /*     this.nivel3Service.getListarNivel3Solicitud().then((data) => {
          if (data.resultado == 1) {
            this.listadoLineaNegocio = data['lista'];
            console.log("nivel 3-->"+JSON.stringify(this.listadoLineaNegocio))
          }
    
        }); */
    console.log('nivel1-->' + this.ESCENARIO_NIVEL1)
    let params: any = {
      "id_rol": GlobalSettings.ROL_SOLICITANTE,
      "id_tipo_solicitud": this.TIPO_SOLICITUD,
      "codigo_escenario_nivel1": this.ESCENARIO_NIVEL1
    }

    this.nivel3Service.getListarNivel3SolicitudPorUsuario(params).then((data) => {
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


  async filtrarSolicitud() {
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
      "id_tipo_solicitud": this.TIPO_SOLICITUD,
      "fecha_inicio": fechaInicio == "" ? null : fechaInicio,
      "fecha_fin": fecha_fin == "" ? null : fecha_fin,
      "cantidad_filas": this.itemPerPage,
      "pagina": this.page
    }
    //esto debería aplicarse a la cantidad total con el filtro
    //aqui se ajusta a lo que manda por eso uso un numero grande estimado
    //this.resultsLength = 9;


    this.solicitudService.contarMisPendientes(params).then((val) => {
      this.resultsLength = val.cantidad;
      console.log('cantidad--->' + JSON.stringify(this.resultsLength));
      this.solicitudService.buscarMisPendientes(params).then(async (data) => {
        console.log('listado de solicitudes-->' + JSON.stringify(data['lista']));
        this.listadoSolicitudes = await data['lista'];
        //this.dataSource.data = data['lista'];
      })
    })
  }

  verDetalleSolicitud(item: SolicitudCabecera) {
    console.log(JSON.stringify(item));
    if (item['estadoSolicitud'] && this.ESTADO_SOLICITUD_EN_SOLICITANTE == item['estadoSolicitud'].id)
      this.router.navigate(['/productosTerminados', this.TIPO_SOLICITUD, 'editarSolicitud', this.ESCENARIO_NIVEL1, item.id]);

    if (item['estadoSolicitud'] && this.ESTADO_SOLICITUD_EN_SUPERVISION == item['estadoSolicitud'].id)
      this.router.navigate(['/productosTerminados', this.TIPO_SOLICITUD, 'verSolicitud', this.ESCENARIO_NIVEL1, item.id]);

    if (item['estadoSolicitud']
      && (item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_CALIDAD
        || item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_COSTOS
        || item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_CONTROL_GESTION
        || item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_COMERCIAL
        || item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_ADMINISTRACION
        || item['estadoSolicitud'].id == this.ESTADO_SOLICITUD_EN_SAP

      ))
      this.router.navigate(['/productosTerminados', this.TIPO_SOLICITUD, 'editarSolicitudGestor', this.ESCENARIO_NIVEL1, item.id]);

    if (item['estadoSolicitud'] && this.ESTADO_SOLICITUD_FINALIZADO == item['estadoSolicitud'].id)
      this.router.navigate(['/productosTerminados', this.TIPO_SOLICITUD, 'verSolicitud', item.id]);


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
      "id_tipo_solicitud": this.TIPO_SOLICITUD,
      "fecha_inicio": fechaInicio == "" ? null : fechaInicio,
      "fecha_fin": fecha_fin == "" ? null : fecha_fin,
      "cantidad_filas": this.itemPerPage,
      "pagina": this.page
    }
    console.log('numero de pagina-->' + this.page);
    this.solicitudService.buscarMisPendientes(xxy).then((data) => {
      //console.log(JSON.stringify(data['lista']));
      this.listadoSolicitudes = data['lista'];
      //this.resultsLength = data['lista'].length;
      // this.dataSource.data = data['lista'];
    })

  }

}