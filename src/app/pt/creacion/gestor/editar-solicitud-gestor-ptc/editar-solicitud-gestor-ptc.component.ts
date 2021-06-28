import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidatorService } from '../../../../servicios/form-validator.service';

import { ExcelGeneratorService } from '../../../../servicios/excel-generator.service';
import { SolicitudService } from './../../../../servicios/solicitud.service';
import { Nivel3Service } from './../../../../servicios/nivel3.service';
import { UnidadMedidaService } from './../../../../servicios/unidad-medida.service';
import { CentroService } from './../../../../servicios/centro.service';
import { OrganizacionVentaService } from './../../../../servicios/organizacion-venta.service';
import { CanalDistribucionService } from './../../../../servicios/canal-distribucion.service';
import { AlmacenService } from './../../../../servicios/almacen.service';
import { ClasificacionService } from './../../../../servicios/clasificacion.service';

import { ReglasVista } from '../../../../modelos/reglas-vista.interface';
import { ReglasCampo } from '../../../../modelos/reglas-campo.interface';
import { LineaNegocio } from '../../../../modelos/linea-negocio.interface';
import { UnidadMedida } from 'src/app/modelos/unidad-medida.interface';
import { Sociedad } from 'src/app/modelos/sociedad.interface';

import { GlobalSettings } from '../../../../shared/settings'
import { OrganizacionVenta } from 'src/app/modelos/organizacion-venta.interface';
import { CanalDistribucion } from 'src/app/modelos/canal-distribucion.interface';
import { Almacen } from 'src/app/modelos/almacen.interface';
import { Clasificacion } from 'src/app/modelos/clasificacion.interface';
import { Centro } from 'src/app/modelos/centro.interface';
import { SolicitudCabecera } from 'src/app/modelos/solicitud-cabecera';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { EditarMaterialPtcComponent } from '../editar-material-ptc/editar-material-ptc.component';
import { ContenidoSolicitudPtcComponent } from '../../shared/contenido-solicitud-ptc/contenido-solicitud-ptc.component';
import { SeguimientoSolicitudComponent } from 'src/app/shared/seguimiento-solicitud/seguimiento-solicitud.component';
import { FlujoSolicitudComponent } from 'src/app/shared/flujo-solicitud/flujo-solicitud.component';
import { AprobadorSolicitud } from 'src/app/modelos/aprobadorSolicitud.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MotivoSolicitudComponent } from 'src/app/shared/motivo-solicitud/motivo-solicitud.component';
import { Messages } from 'src/app/shared/messages';
import { AdvertenciaDialogComponent } from 'src/app/shared/advertencia-dialog/advertencia-dialog.component';
import { ListaAnexosDialogComponent } from 'src/app/shared/lista-anexos-dialog/lista-anexos-dialog.component';
import { TablaEquivalenciasDialogComponent } from 'src/app/shared/tabla-equivalencias-dialog/tabla-equivalencias-dialog.component';
import { ListaAnexosMaterialDialogComponent } from 'src/app/shared/lista-anexos-material-dialog/lista-anexos-material-dialog.component';
import { ErrorSapDialogComponent } from 'src/app/shared/error-sap-dialog/error-sap-dialog.component';
@Component({
  selector: 'app-editar-solicitud-gestor-ptc',
  templateUrl: './editar-solicitud-gestor-ptc.component.html',
  styleUrls: ['./editar-solicitud-gestor-ptc.component.css']
})
export class EditarSolicitudGestorPtcComponent implements OnInit {

  solicitudForm: any;
  filtroForm!: FormGroup;
  itemForm!: FormGroup;

  TIPO_SOLICITUD_CREACION: number = GlobalSettings.TIPO_SOLICITUD_CREACION;
  ROL_SOLICITANTE: number = GlobalSettings.ROL_SOLICITANTE;
  ROL_SUPERVISOR: number = GlobalSettings.ROL_SUPERVISOR;
  ROL_ADMINISTRADOR_MATERIAL: number = GlobalSettings.ROL_ADMINISTRADOR_MATERIAL;

  ROL_GESTOR!: number;// = GlobalSettings.ROL_ADMINISTRADOR_MATERIAL; // el rol gestor debe de venir con el usuario 
  NOMBRE_ROL!: string;
  ESTADO_ACTUAL_SOLICITUD?: number;
  ESTADO_SOLICITUD_EN_SAP: number = GlobalSettings.ESTADO_SOLICITUD_EN_SAP;
  //escenarios
  ESCENARIO_NIVEL1: string = GlobalSettings.ESCENARIO_NIVEL1_PRODUCTOS_TERMINADOS;

  TIPO_OBJETO_INPUT_TEXT: string = GlobalSettings.TIPO_OBJETO_INPUT_TEXT;
  TIPO_OBJETO_COMBO: string = GlobalSettings.TIPO_OBJETO_COMBO;
  TIPO_OBJETO_CHECKBOX: string = GlobalSettings.TIPO_OBJETO_CHECKBOX;

  CODIGO_INTERNO_MATERIAL_CODIGO_SAP: string = GlobalSettings.CODIGO_INTERNO_MATERIAL_CODIGO_SAP;
  CODIGO_INTERNO_UNIDAD_MEDIDA_BASE: string = GlobalSettings.CODIGO_INTERNO_UNIDAD_MEDIDA_BASE;
  CODIGO_INTERNO_UNIDAD_MEDIDA_PESO: string = GlobalSettings.CODIGO_INTERNO_UNIDAD_MEDIDAD_PESO;
  CODIGO_INTERNO_CENTRO: string = GlobalSettings.CODIGO_INTERNO_CENTRO;
  CODIGO_INTERNO_DENOMINACION: string = GlobalSettings.CODIGO_INTERNO_DENOMINACION;
  CODIGO_INTERNO_PESO_BRUTO: string = GlobalSettings.CODIGO_INTERNO_PESO_BRUTO;
  CODIGO_INTERNO_CENTRO_BENEFICIO: string = GlobalSettings.CODIGO_INTERNO_CENTRO_BENEFICIO;
  CODIGO_INTERNO_ORGANIZACION_VENTAS: string = GlobalSettings.CODIGO_INTERNO_ORGANIZACION_VENTAS;
  CODIGO_INTERNO_CANAL_DISTRIBUCION: string = GlobalSettings.CODIGO_INTERNO_CANAL_DISTRIBUCION;
  CODIGO_INTERNO_ALMACEN: string = GlobalSettings.CODIGO_INTERNO_ALMACEN;
  CODIGO_INTERNO_CLASE_TAB: string = GlobalSettings.CODIGO_INTERNO_CLASE_TAB;
  CODIGO_INTERNO_CLASE_INSPECCION_TAB: string = GlobalSettings.CODIGO_INTERNO_CLASE_INSPECCION_TAB;
  //calidad
  CODIGO_INTERNO_ALMACEN_PRODUCCION: string = GlobalSettings.CODIGO_INTERNO_ALMACEN_PRODUCCION;
  CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION: string = GlobalSettings.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION;
  CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION: string = GlobalSettings.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION;
  // Costos
  CODIGO_INTERNO_CATEGORIA_VALORACION: string = GlobalSettings.CODIGO_INTERNO_CATEGORIA_VALORACION;
  //Comercial
  CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA: string = GlobalSettings.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA;
  CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT: string = GlobalSettings.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT;
  CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL: string = GlobalSettings.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL;
  CODIGO_INTERNO_JERARQUIA_PRODUCTO: string = GlobalSettings.CODIGO_INTERNO_JERARQUIA_PRODUCTO;
  CODIGO_INTERNO_GRUPOS_MATERIAL1: string = GlobalSettings.CODIGO_INTERNO_GRUPOS_MATERIAL1;
  CODIGO_INTERNO_GRUPOS_MATERIAL2: string = GlobalSettings.CODIGO_INTERNO_GRUPOS_MATERIAL2;
  CODIGO_INTERNO_TEXTO_COMERCIAL: string = GlobalSettings.CODIGO_INTERNO_TEXTO_COMERCIAL;
  //administrador  materiales
  CODIGO_INTERNO_GRUPO_TRANSPORTE: string = GlobalSettings.CODIGO_INTERNO_GRUPO_TRANSPORTE;
  CODIGO_INTERNO_GRUPO_CARGA: string = GlobalSettings.CODIGO_INTERNO_GRUPO_CARGA;
  CODIGO_INTERNO_IDIOMA: string = GlobalSettings.CODIGO_INTERNO_IDIOMA;
  CODIGO_INTERNO_TEXTO_COMPRA: string = GlobalSettings.CODIGO_INTERNO_TEXTO_COMPRA;
  CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO: string = GlobalSettings.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO;
  CODIGO_INTERNO_UMP_VAR: string = GlobalSettings.CODIGO_INTERNO_UMP_VAR;
  //control de gestión
  CODIGO_INTERNO_PRECIO_ESTANDAR: string = GlobalSettings.CODIGO_INTERNO_PRECIO_ESTANDAR;

  CODIGO_INTERNO_CODIGO_EAN: string = GlobalSettings.CODIGO_INTERNO_CODIGO_EAN;
  CODIGO_INTERNO_GRUPO_TIPO_POSICION: string = GlobalSettings.CODIGO_INTERNO_GRUPO_TIPO_POSICION;
  CODIGO_INTERNO_PARTIDA_ARANCELARIA: string = GlobalSettings.CODIGO_INTERNO_PARTIDA_ARANCELARIA;
  CODIGO_INTERNO_PRECIO_VARIABLE: string = GlobalSettings.CODIGO_INTERNO_PRECIO_VARIABLE;
  CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD: string = GlobalSettings.CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD;

  CODIGO_INTERNO_LIMITE_EXCESO_SUM_ILIMITADO: string = GlobalSettings.CODIGO_INTERNO_LIMITE_EXCESO_SUM_ILIMITADO;
  CODIGO_INTERNO_PRECIO_BASE: string = GlobalSettings.CODIGO_INTERNO_PRECIO_BASE;
  CODIGO_INTERNO_MONEDA: string = GlobalSettings.CODIGO_INTERNO_MONEDA;
  CODIGO_INTERNO_IND_PED_AUTOMA: string = GlobalSettings.CODIGO_INTERNO_IND_PED_AUTOMA;
  CODIGO_INTERNO_EXCESO_SUM_ILIMITADO: string = GlobalSettings.CODIGO_INTERNO_EXCESO_SUM_ILIMITADO;
  CODIGO_INTERNO_AREA_PLANIFICACION_TAB: string = GlobalSettings.CODIGO_INTERNO_AREA_PLANIFICACION_TAB;
  SOLICITUD_DETALLE_NUMERO_COLUMNAS: number = GlobalSettings.SOLICITUD_DETALLE_NUMERO_COLUMNAS;
  listadoMateriales: any[] = [];
  listadoUnidadMedidaBase: UnidadMedida[] = [];
  listadoUnidadMedidaPeso: UnidadMedida[] = [];

  listadoCentros: any[] = [];
  listadoOrganizaciones: any[] = [];


  listadoReglasVista: ReglasVista[] = [];
  listadoCampoReglas: ReglasCampo[] = [];
  listadoCentroItem: any[] = [];
  listadoOrganizacionVentasItem: OrganizacionVenta[] = [];
  listadoCanalDistribucionItem: CanalDistribucion[] = [];
  listadoAlmacenItem: Almacen[] = [];
  listadoClasificacionItem: Clasificacion[] = [];
  listadoLineaNegocio: LineaNegocio[] = [];
  jsonDescargaFormato: any[] = [];
  cantidadCampos: number = 0;

  sociedad!: Sociedad;// = { id: 0, codigo_sap: "", nombre: "" };

  //datos de cabecera Solicitud
  id_solicitud!: number;
  existe_error_sap = false;
  correlativo!: string;

  //Validation
  formErrors = {
    'selectecLineaNegocio': '',
    'descripcion_corta': '',
    'selectedCentro': '',
    'selectedOrganizacionVenta': '',
    'codigoModelo': ''
  }

  validationMessages = {
    'selectecLineaNegocio': {
      'required': 'Línea de negocio es requerido.'
    },
    'descripcion_corta': {
      'required': 'Descripción corta de solicitud es requerida.',
    }

  };



  displayedColumns: string[] = [
    /* 'denominacion',
    'unidad_medida_base',
    'peso_bruto',
    'unidad_medida_peso',
    'centro',
    'organizacion_ventas',
    'canal_distribucion',
    'almacen',
    'clase',
    'estado',
    'anexo',
    'id', */
  ];


  submitted = false;
  cabeceraSolicitud!: SolicitudCabecera;
  itemMaterialOld: any;
  fileName: any = "";



  EscenarioNivel3_Old!: any;
  estadoFlujoActualSolicitud!: AprobadorSolicitud;
  estadoSeguimientoActualSolicitud!: AprobadorSolicitud;

  MENSAJE_APROBAR_SOLICITUD: string = Messages.confirmation.MENSAJE_APROBAR_SOLICITUD;
  MENSAJE_ENVIAR_SOLICITUD_A_SAP: string = Messages.confirmation.MENSAJE_ENVIAR_SOLICITUD_A_SAP;
  MENSAJE_RECHAZAR_SOLICITUD: string = Messages.confirmation.MENSAJE_RECHAZAR_SOLICITUD;
  MENSAJE_ACTUALIZAR_SOLICITUD: string = GlobalSettings.MENSAJE_ACTUALIZAR_SOLICITUD;
  MENSAJE_AGREGAR_MATERIAL: string = GlobalSettings.MENSAJE_AGREGAR_MATERIAL;
  MENSAJE_ELIMINAR_MATERIAL: string = GlobalSettings.MENSAJE_ELIMINAR_MATERIAL;
  MENSAJE_ACTUALIZAR_MATERIAL: string = GlobalSettings.MENSAJE_ACTUALIZAR_MATERIAL;
  MENSAJE_CARGA_MASIVA: string = GlobalSettings.MENSAJE_CARGA_MASIVA;
  MENSAJE_ENVIO_SOLICITUD: string = GlobalSettings.MENSAJE_ENVIO_SOLICITUD;
  MENSAJE_ANULAR_SOLICITUD: string = GlobalSettings.MENSAJE_ANULAR_SOLICITUD;
  MENSAJE_CARGAR_ANEXO_SOLICITUD: string = GlobalSettings.MENSAJE_CARGAR_ANEXO_SOLICITUD;
  MENSAJE_CARGAR_ANEXO_MATERIAL: string = GlobalSettings.MENSAJE_CARGAR_ANEXO_MATERIAL;
  MENSAJE_ELIMINAR_ANEXO_SOLICITUD: string = GlobalSettings.MENSAJE_ELIMINAR_ANEXO_SOLICITUD;
  MENSAJE_ELIMINAR_ANEXO_MATERIAL: string = GlobalSettings.MENSAJE_ELIMINAR_ANEXO_MATERIAL;
  cantidadErrores = 0;
  camposErrores='';

  btnAnular = true;
  btnAprobar = true;
  btnEnviarSAP = true;
  btnRechazar = true;
  btnFinalizar = true;

  btnDescargarFormato = true;
  btnDescargarListado = true;
  btnCargaMasiva = true;

  btnEliminarMaterial = true;


  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private solicitudService: SolicitudService,
    private excelGeneratorService: ExcelGeneratorService,
    private nivel3Service: Nivel3Service,
    private unidadMedidaService: UnidadMedidaService,
    private centroService: CentroService,
    private organizacionVentaService: OrganizacionVentaService,
    private canalDistribucionService: CanalDistribucionService,
    private almacenService: AlmacenService,
    private clasificacionService: ClasificacionService,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private router: Router,
    private _snack: MatSnackBar,
    private rutaActiva: ActivatedRoute
  ) {
    this.ESCENARIO_NIVEL1= this.rutaActiva.snapshot.params.nivelEscenario;
    this.initForm();
    this.id_solicitud = this.activatedRoute.snapshot.params.id;
    this.estadoActualSolicitud(this.id_solicitud);  // llama al this.obtenerSolicitud();
    //this.estadoActualSeguimientoSolicitud(this.id_solicitud);  // llama al this.obtenerSolicitud();
  }

  ngOnInit() {
    //this.getListarNivel3Solicitud();
    this.habilitarControles();
    //this.initBotones();
  }

  async initBotones() {
    //console.log(this.ROL_GESTOR+" primera--> "+(this.ROL_GESTOR==this.ROL_ADMINISTRADOR_MATERIAL));
    //console.log(this.ESTADO_ACTUAL_SOLICITUD+" segunda-->"+(this.ESTADO_ACTUAL_SOLICITUD!=this.ESTADO_SOLICITUD_EN_SAP));

    this.btnAnular = (this.ROL_GESTOR == this.ROL_ADMINISTRADOR_MATERIAL && this.ESTADO_ACTUAL_SOLICITUD != this.ESTADO_SOLICITUD_EN_SAP)
    this.btnAprobar = (this.ROL_GESTOR != this.ROL_ADMINISTRADOR_MATERIAL && this.ESTADO_ACTUAL_SOLICITUD != this.ESTADO_SOLICITUD_EN_SAP)
    this.btnEnviarSAP = (this.ROL_GESTOR == this.ROL_ADMINISTRADOR_MATERIAL && this.ESTADO_ACTUAL_SOLICITUD != this.ESTADO_SOLICITUD_EN_SAP)
    this.btnRechazar = (this.ESTADO_ACTUAL_SOLICITUD != this.ESTADO_SOLICITUD_EN_SAP)
    this.btnFinalizar = (this.ROL_GESTOR == this.ROL_ADMINISTRADOR_MATERIAL && this.ESTADO_ACTUAL_SOLICITUD != this.ESTADO_SOLICITUD_EN_SAP && this.existe_error_sap == false)

    this.btnDescargarFormato = (this.listadoMateriales.length == 0)
    this.btnDescargarListado = (this.ESTADO_ACTUAL_SOLICITUD != this.ESTADO_SOLICITUD_EN_SAP)
    this.btnCargaMasiva = (this.ESTADO_ACTUAL_SOLICITUD != this.ESTADO_SOLICITUD_EN_SAP)
    this.btnEliminarMaterial=(this.existe_error_sap != false)
  }


  async initForm() {
    this.solicitudForm = this.formBuilder.group({
      selectecLineaNegocio: [{ value: null, disabled: true }, Validators.required],
      descripcion_corta: [{ value: null, disabled: true }, Validators.required],
      files: new FormControl('')
    })
    this.solicitudForm.valueChanges
      .subscribe(() => {
        this.formErrors = this.formValidatorService.handleFormChanges(this.solicitudForm, this.formErrors, this.validationMessages, this.submitted);
      });

    this.filtroForm = this.formBuilder.group({
      selectedCentro: [{ disabled: true }],
      selectedOrganizacionVenta: [{ value: '', disabled: true }],
      codigoModelo: [{ value: '', disabled: true }],
    })

    this.itemForm = this.formBuilder.group({
      denominacion: [{ value: '', disabled: true }],
      unidad_medida_base: [{ value: '', disabled: true }],
      peso_bruto: [{ value: '', disabled: true }],
      unidad_medida_peso: [{ value: '', disabled: true }],
      centro: [{ value: '', disabled: true }],
      centro_beneficio: [{ value: '', disabled: true }],
      organizacion_ventas: [{ value: '', disabled: true }],
      canal_distribucion: [{ value: '', disabled: true }],
      almacen: [{ value: '', disabled: true }],
      clase: [{ value: '', disabled: true }]
    })
  }

  async obtenerSolicitud() {
    let params = {
      "id_solicitud": this.id_solicitud,
      "id_rol": this.ROL_GESTOR  //Cambio 29 marzo esto debe ser dinamico
    }
    console.log('params ARSA--->' + JSON.stringify(params));
    this.solicitudService.obtenerSolicitud(params).then(async data => {
      this.cabeceraSolicitud = data['objeto'];
      await this.getListadoMateriales();
      //this.listadoMateriales = data['objeto'].materiales_solicitud;
      //console.log('metodo obtenerSolicitud listadoMateriales--->' + JSON.stringify(this.listadoMateriales));
      await this.getListarNivel3SolicitudPorId(this.cabeceraSolicitud.escenarioNivel3.id);
      await this.cargarDataCabecera();
      await this.filtrarReglas();
      //console.log("datos de la solicitud-->" + JSON.stringify(this.cabeceraSolicitud.escenarioNivel3))
    })
  }

  async cargarDataCabecera() {
    this.solicitudForm.get('selectecLineaNegocio').setValue(this.cabeceraSolicitud.escenarioNivel3 ? this.cabeceraSolicitud.escenarioNivel3 : null);
    this.solicitudForm.get('descripcion_corta').setValue(this.cabeceraSolicitud.descripcion_corta ? this.cabeceraSolicitud.descripcion_corta : '');
    this.EscenarioNivel3_Old = this.solicitudForm.get('selectecLineaNegocio').value;;
  }

  async filtrarReglas() {
    let selectecLineaNegocio: LineaNegocio = this.solicitudForm.get('selectecLineaNegocio').value;
    console.log('linea de negocio arsa-->'+JSON.stringify(selectecLineaNegocio))
    this.sociedad = selectecLineaNegocio.sociedad;
    this.getListadoCampoReglas(selectecLineaNegocio.id, this.ROL_GESTOR, this.TIPO_SOLICITUD_CREACION); // cambio 29 marzo
  }

  async habilitarControles() {
    this.filtroForm.get('selectedCentro')?.enable();
    this.filtroForm.get('selectedOrganizacionVenta')?.enable();
    this.filtroForm.get('codigoModelo')?.enable();
    this.itemForm.get('denominacion')?.enable();
    this.itemForm.get('unidad_medida_base')?.enable();
    this.itemForm.get('peso_bruto')?.enable();
    this.itemForm.get('unidad_medida_peso')?.enable();
    this.itemForm.get('centro')?.enable();
    this.itemForm.get('centro_beneficio')?.enable();
    this.itemForm.get('organizacion_ventas')?.enable();
    this.itemForm.get('canal_distribucion')?.enable();
    this.itemForm.get('almacen')?.enable();
    this.itemForm.get('clase')?.enable();
  }


  async getListadoCampoReglas(id_escenario_nivel3: number, id_rol: number, id_tipo_solicitud: number) {
    let numCampos = 0;
    let lista: any[] = [];
    let jsonDescargaFormato: any[] = [];
    this.displayedColumns = [];
    this.displayedColumns.push("check");
    this.displayedColumns.push(this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP);
    this.displayedColumns.push(this.CODIGO_INTERNO_DENOMINACION);
    this.solicitudService.getListadoCampoReglas(id_escenario_nivel3, id_rol, id_tipo_solicitud).then((data) => { // cambio 29 marzo
      console.log("Listado de campos reglas -->" + JSON.stringify(data['lista']))
      let listadoCampoReglas: ReglasCampo[] = data['lista'];
      let columna: any = '"id_material_solicitud": "",';
      if (data.resultado == 1) {
        for (let y = 0; y < listadoCampoReglas.length; y++) {
          if (listadoCampoReglas[y].tipo_objeto != null) {
            numCampos++;
            let campo: any = listadoCampoReglas[y].codigo_interno;
            ///ian - agregando campos para la tabla
            this.displayedColumns.push(listadoCampoReglas[y].codigo_interno)
            //ian - fin 
            if (numCampos == 1) {
              columna = columna + '"' + campo + '": ""';
            } else {
              columna = columna + ',"' + campo + '": ""';
            }
            lista.push(listadoCampoReglas[y]);
          }
        }
        this.displayedColumns.push('anexos');
        this.displayedColumns.push('equivalencias');
        this.displayedColumns.push('acciones');
        columna = JSON.parse("[{" + columna + "}]");
        jsonDescargaFormato = columna;
        this.cantidadCampos = numCampos;
        this.listadoCampoReglas = lista;
        this.jsonDescargaFormato = jsonDescargaFormato;
        //console.log('#numCampos-->' + numCampos);
      }
      console.log(' listado campos reglas vista-->' + JSON.stringify(this.listadoCampoReglas))
      //console.log(' displayedColumns-->' + JSON.stringify(this.displayedColumns))
      //console.log(' lista vista-->' + JSON.stringify(lista))
      //console.log(' Json Descarga Formato-->' + JSON.stringify(jsonDescargaFormato));
    })
  }

  //----- Compartido con nuevo

  async getListarNivel3Solicitud() {
    let params: any = {
      "id_rol": this.ROL_SOLICITANTE,
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

  async getListarNivel3SolicitudPorId(id_nivel3: number) {
    this.nivel3Service.getListarNivel3SolicitudPorId(id_nivel3).then((data) => {
      //this.nivel3Service.getListarNivel3SolicitudPorUsuario(params).then((data) => {
      if (data.resultado == 1) {
        this.listadoLineaNegocio = data['lista'];
      }

    });

  }



  comparaIdLineaNegocio(val1: any, val2: any) {
    return (val1.id == val2.id)

  }

  actualizarSolicitud(form: any) {
    let cabecera = {
      "descripcion_corta": form.descripcion_corta,
      "id_escenario_nivel3": form.selectecLineaNegocio.id,
      "id_solicitud": this.id_solicitud

    };
    this.solicitudService.actualizarSolicitud(cabecera).then((data) => {
      if (data.resultado == 1) {
        this.EscenarioNivel3_Old = form.selectecLineaNegocio;
        this.habilitarControles();
        this.getListadoMateriales();
        //JSON.stringify(data);
      }
    })
  }

  async getListadoMateriales() {
    this.solicitudService.getListadoMateriales(this.id_solicitud, this.ROL_SOLICITANTE).then((data) => {
      this.listadoMateriales = data['lista'];
      this.existe_error_sap = false;
      this.listadoMateriales.forEach(error => {
        if (error.existe_error_sap == true) {
          this.existe_error_sap = true;
        }
      })
      console.log('listadoMateriales-->' + this.listadoMateriales);

    })
  }

  filtroLlenar(form: any) {

  }

  descargarFormato() {
    this.excelGeneratorService.exportAsExcelFile(this.jsonDescargaFormato, this.NOMBRE_ROL);
  }

  descargarListado() {
    let fila: any = '';
    let columnaError: any[] = [];
    let posicion = 0;
    let filaError: any[] = [];
    let c = 0;;
    let filaArray: any[] = [];
    console.log(this.listadoCampoReglas.length + ' listadoarsa-->' + JSON.stringify(this.listadoCampoReglas))
    this.listadoMateriales.forEach((element) => {
      posicion = 1;//empezara de 1, por que hay un campo delante que es id_material_solicitud
      columnaError = []
      c++;
      fila = '{"id_material_solicitud":' + element.id_material_solicitud;
      this.listadoCampoReglas.forEach(campoRegla => {
        console.log("valor 1-->" + element[campoRegla['codigo_interno'] + "_valor"] == null);
        console.log("valor 2-->" + element[campoRegla['codigo_interno'] + "_valor"] == "null");
        let valor = (element[campoRegla['codigo_interno'] + "_valor"] == "null"
          || element[campoRegla['codigo_interno'] + "_valor"] == null ? "" : element[campoRegla['codigo_interno'] + "_valor"]);
        //valor=valor.split(/\n/i).join(' ');
        valor = valor.split(/\n/i).join('@@@');
        posicion++;
        fila = fila + ', "' + [campoRegla['codigo_interno']] + '":"' + valor + '"';
        if (element[campoRegla['codigo_interno'] + "_error"]) {
          columnaError.push(posicion);
        }
      })
      if (columnaError.length > 0) {
        //console.log('columnaError--->'+JSON.stringify(columnaError));
        filaError.push({ "fila": c, "posicion": columnaError });
      }
      fila = fila + '}';
      filaArray.push(JSON.parse(fila));
    })
    console.log('filaError--->' + JSON.stringify(filaError));
    //fila = JSON.parse("[" + fila + "]");
    console.log('FilaArray--->' + JSON.stringify(filaArray));
    this.jsonDescargaFormato = filaArray;
    this.excelGeneratorService.exportListadoAsExcelFile(filaArray, filaError, this.NOMBRE_ROL + '-' + this.cabeceraSolicitud.correlativo);
  }

  onFileSelected(event: any) {
    let tabs = [this.CODIGO_INTERNO_CLASE_TAB, this.CODIGO_INTERNO_CLASE_INSPECCION_TAB, this.CODIGO_INTERNO_AREA_PLANIFICACION_TAB]
    this.excelGeneratorService.onFileSeleted(event, tabs).then((data) => {
      this.cargaMasiva(data);
      this.solicitudForm.get('files').reset();
    });
  }

  cargaMasiva(materiales: any) {
    let params = {
      'id_solicitud': this.id_solicitud,
      'id_rol': this.ROL_GESTOR,
      'materiales': materiales
    }
    //console.log('materiales front end--->' + JSON.stringify(params));
    this.solicitudService.cargaMasiva(params).then((data) => {
      //console.log('resultado--->' + JSON.stringify(data));
      this.getListadoMateriales();
    })
  }



  eliminarMaterialOLD(item: any) {
    this.solicitudService.eliminarMaterial(item).then((res) => {
      console.log(JSON.stringify(res));
      this.getListadoMateriales();

    })
  }

  eliminarMaterial(item: any) {
    let mensaje;
    if (item.ampliacion) {
      mensaje = Messages.warnig.MENSAJE_DIALOGO_ELIMINAR_MATERIAL;
    } else {
      mensaje = Messages.warnig.MENSAJE_DIALOGO_ELIMINAR_MATERIAL_AMPLIADOS;
    }
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: mensaje
    });

    dialogRef.afterClosed().subscribe(result => {
      //vienen los datos del dialog
      //console.log('The dialog was closed'+JSON.stringify(result));
      if (result == "CONFIRM_DLG_YES") {

        this.solicitudService.eliminarMaterial(item).then((res) => {
          console.log(JSON.stringify(res));
          this._snack.open(this.MENSAJE_ELIMINAR_MATERIAL, 'cerrar', {
            duration: 1800,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
          this.getListadoMateriales();

        })

      } else {
        // this.solicitudForm.get('selectecLineaNegocio').setValue(this.EscenarioNivel3_Old ? this.EscenarioNivel3_Old : null);
        this.getListadoMateriales();
      }

    });

  }


  compareLineaNegocio(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }


  openDialogConfirmarEnvarActualizarSolicitud(form: any): void {
    let selectecLineaNegocio_Nuevo: LineaNegocio = this.solicitudForm.get('selectecLineaNegocio').value;
    let mensaje = "";
    if (this.comparaIdLineaNegocio(this.EscenarioNivel3_Old, selectecLineaNegocio_Nuevo)) {
      mensaje = "Guardar cambios y enviar solicitud al supervisor";
    } else {
      mensaje = "Se borrará el detalle de la solicitud. Confirmar guardar cambios y envío al supervisor";
    }

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: mensaje
    });

    dialogRef.afterClosed().subscribe(result => {
      //vienen los datos del dialog
      //console.log('The dialog was closed'+JSON.stringify(result));
      if (result == "CONFIRM_DLG_YES") {
        this.actualizarEnviarSolicitud(form)
      } else {
        this.solicitudForm.get('selectecLineaNegocio').setValue(this.EscenarioNivel3_Old ? this.EscenarioNivel3_Old : null);
      }

    });
  }

  actualizarEnviarSolicitud(form: any) {
    let cabecera = {
      "descripcion_corta": form.descripcion_corta,
      "id_escenario_nivel3": form.selectecLineaNegocio.id,
      "id_solicitud": this.id_solicitud

    };
    this.solicitudService.actualizarSolicitud(cabecera).then((data) => {
      if (data.resultado == 1) {
        this.EscenarioNivel3_Old = form.selectecLineaNegocio;
        this.aprobarSolicitud()
        /*         this.habilitarControles();
                this.getListadoMateriales(); */

      }
    })
  }

  aprobarSolicitud() {
    let body = {
      "id_solicitud": this.id_solicitud,
      "id_rol": this.ROL_GESTOR,
      "motivo": ""
    }
    this.solicitudService.aprobarSolicitud(body).then(result => {
      if (result.resultado == 1) {
        this._snack.open(this.MENSAJE_APROBAR_SOLICITUD, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });

        this.router.navigate(['/productosTerminados/consultarSolicitudesPendientesSupervisor',this.ESCENARIO_NIVEL1]);
      }
    })
  }

  async openDialogConfirmarAprobarSolicitud() {
    this.cantidadErrores = 0;
    await this.existeErrores();
    let mensaje = "";
    if (this.cantidadErrores > 0) {
      mensaje = Messages.warnig.MENSAJE_EXISTE_ERRORES_AL_GRABAR_SOLICITUD+this.camposErrores;
      const dialogRef = this.matDialog.open(AdvertenciaDialogComponent, {
        disableClose: true,
        data: mensaje
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == "CONFIRM_DLG_YES") {
        }
      });
    } else {
      mensaje = Messages.warnig.MENSAJE_APROBAR_SOLICITUD
      const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
        disableClose: true,
        data: mensaje
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == "CONFIRM_DLG_YES") {
          this.aprobarSolicitud()
        } else {
          console.log("Se cancelo y no se aprobó la solicitud");
        }
      });

    }
  }

  openDialogConfirmarRechazarSolicitud(): void {
    let mensaje = Messages.warnig.MENSAJE_RECHAZAR_SOLICITUD;
    //console.log("id solicitud antes de abrir del dialog : "+this.id_solicitud);
    //let solicitud:number = this.id_solicitud
    let datos = {
      "mensaje": mensaje,
      "id_solicitud": this.id_solicitud,
      "id_rol": this.ROL_GESTOR,
      "orden": this.estadoFlujoActualSolicitud.orden
    }
    const dialogRef2 = this.matDialog.open(MotivoSolicitudComponent, {
      disableClose: true,
      data: datos
    });
    dialogRef2.afterClosed().subscribe(result => {
      if (result.respuesta == "CONFIRM_DLG_YES") {
        if (this.ROL_GESTOR == this.ROL_ADMINISTRADOR_MATERIAL) {
          let body = {
            "id_solicitud": this.id_solicitud,
            "id_rol": this.ROL_GESTOR,
            "motivo": result.motivo,
            "id_motivo_rechazo": result.id_motivo_rechazo,
            "aprobador_derivado": result.aprobador_derivado
          }
          console.log("desde administrador-->" + JSON.stringify(body))
          this.solicitudService.rechazarSolicitudADemanda(body).then(data => {
            if (data.resultado == 1) {
              this._snack.open(this.MENSAJE_RECHAZAR_SOLICITUD, 'cerrar', {
                duration: 1800,
                horizontalPosition: "end",
                verticalPosition: "top"
              });

              this.router.navigate(['/productosTerminados/consultarSolicitudesPendientesSupervisor',this.ESCENARIO_NIVEL1]);
            } else {
              console.log("Error encontrado: " + JSON.stringify(data.mensaje))
            }
          })

        } else {
          let body = {
            "id_solicitud": this.id_solicitud,
            "id_rol": this.ROL_GESTOR,
            "motivo": result.motivo,
            "id_motivo_rechazo": result.id_motivo_rechazo,
          }
          this.solicitudService.rechazarSolicitud(body).then(data => {
            if (data.resultado == 1) {
              this._snack.open(this.MENSAJE_RECHAZAR_SOLICITUD, 'cerrar', {
                duration: 1800,
                horizontalPosition: "end",
                verticalPosition: "top"
              });

              this.router.navigate(['/productosTerminados/consultarSolicitudesPendientesSupervisor',this.ESCENARIO_NIVEL1]);
            } else {
              console.log("Error encontrado: " + JSON.stringify(data.mensaje))
            }
          })
        }

      } else {
        console.log("no se rechazó la solicitud");
      }

    });
  }

  openDialogEditarMaterial(material: any): void {
    let lineaNegocio = this.solicitudForm.get('selectecLineaNegocio').value
    let data = {
      "id_escenario_nivel1": this.ESCENARIO_NIVEL1,
      "id_solicitud": this.id_solicitud,
      "id_material_solicitud": material.id_material_solicitud,
      "id_escenario_nivel3": lineaNegocio.id,
      "sociedad": lineaNegocio.sociedad,
      "id_rol": this.ROL_GESTOR,
      "id_tipo_solicitud": this.TIPO_SOLICITUD_CREACION,
      "orden": this.estadoFlujoActualSolicitud.orden,
      "material": material
    }
    const dialogRef = this.matDialog.open(ContenidoSolicitudPtcComponent, {
      disableClose: false,
      data: data,
      /*       minHeight:'250px',
            minWidth:'800px', */
      width: '90%',
      height: '80%',

    });

    dialogRef.afterClosed().subscribe(result => {
      //vienen los datos del dialog
      //console.log('The dialog was closed'+JSON.stringify(result));
      this.getListadoMateriales();

    });
  }

  seguimientoSolicitud() {
    const dialogRef = this.matDialog.open(SeguimientoSolicitudComponent, {
      disableClose: false,
      data: this.id_solicitud,
      height: '70%',
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      //vienen los datos del dialog
      //console.log('The dialog was closed'+JSON.stringify(result));
    });
  }

  flujoSolicitud() {
    //console.log('numero de solicitud-->'+this.id_solicitud)
    const dialogRef = this.matDialog.open(FlujoSolicitudComponent, {
      disableClose: false,
      data: this.id_solicitud,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      //vienen los datos del dialog
      //console.log('The dialog was closed'+JSON.stringify(result));
    });
  }

  estadoActualSolicitud(id_solicitud: number) {
    this.solicitudService.estadoActual(id_solicitud).then(sol => {
      this.estadoFlujoActualSolicitud = sol;
      console.log('Flujo actual estadoFlujoActualSolicitud-->' + JSON.stringify(this.estadoFlujoActualSolicitud));
      this.ROL_GESTOR = this.estadoFlujoActualSolicitud.id_rol;
      this.NOMBRE_ROL = this.estadoFlujoActualSolicitud.nombre_rol;
      this.estadoActualSeguimientoSolicitud(id_solicitud);  // llama al this.obtenerSolicitud();
      /*       this.ESTADO_ACTUAL_SOLICITUD=this.estadoFlujoActualSolicitud.id_estado_real;
            this.obtenerSolicitud();
            this.initBotones();  */
    })
  }

  estadoActualSeguimientoSolicitud(id_solicitud: number) {
    let lista: any[];
    this.solicitudService.listarSeguimiento(id_solicitud).then((sol) => {
      if (sol.resultado == 1) {
        lista = sol['lista'];
        lista.forEach((seg: AprobadorSolicitud) => {
          if (!seg.fecha_salida) {
            this.estadoSeguimientoActualSolicitud = seg;
            console.log('Seguimiento actual -->' + JSON.stringify(seg));
            //this.ROL_GESTOR = this.estadoSeguimientoActualSolicitud.id_rol_real;
            //this.NOMBRE_ROL=this.estadoSeguimientoActualSolicitud.nombre_rol_real;
            this.ESTADO_ACTUAL_SOLICITUD = this.estadoSeguimientoActualSolicitud.id_estado_real;
            this.initBotones();
            this.obtenerSolicitud();

          }
        })
      }
    })
  }



  async existeErrores() {
    //console.log("arsa2-->" + JSON.stringify(this.listadoCampoReglas))
    let error = 0;
    let vacio = 0;
    let campoError = " ";
    let campoVacio = " ";
    let columnaError: any[] = [];
    let columnaVacio: any[] = [];
    if (this.listadoMateriales.length == 0) {
      this.cantidadErrores = 1;
    }
    this.listadoMateriales.forEach((element) => {
      this.listadoCampoReglas.forEach(campoRegla => {
        if (campoRegla.regla_campo == "M") {
          let campoVista = campoRegla['codigo_interno'];
          if (element[campoVista + "_valor"] == null || element[campoVista + "_valor"] == '') {
            vacio++;
            campoVacio = campoVacio + campoRegla['codigo_interno'] + " ";
            columnaVacio.push(vacio);
          }
          if (element[campoVista + "_error"] == true) {
            error++;
            campoError = campoError + campoRegla['codigo_interno'] + ". ";
            columnaError.push(error);
          }
        }
      })
      //filaError.push({ "fila": c, "error": error, "vacio": vacio });
      this.cantidadErrores = error + vacio;
      this.camposErrores=campoError;
      console.log({ "error": error, "vacio": vacio });
    })
  }

  async openDialogConfirmarEnviarSAP() {
    this.cantidadErrores = 0;
    await this.existeErrores();
    let mensaje = "";
    if (this.cantidadErrores > 0) {
      mensaje = Messages.warnig.MENSAJE_EXISTE_ERRORES_AL_GRABAR_SOLICITUD;
      const dialogRef = this.matDialog.open(AdvertenciaDialogComponent, {
        disableClose: true,
        data: mensaje
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == "CONFIRM_DLG_YES") {
        }
      });
    } else {
      mensaje = Messages.warnig.MENSAJE_ENVIAR_SOLICITUD;
      const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
        disableClose: true,
        data: mensaje
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == "CONFIRM_DLG_YES") {
          this.enviarSAP()
        } else {
          console.log("Se cancelo y no se aprobó la solicitud");
        }
      });

    }

  }


  enviarSAP() {
    let body = {
      "id_solicitud": this.id_solicitud,
      "id_rol": this.ROL_GESTOR,
      "motivo": ""
    }
    this.solicitudService.aprobarSolicitud(body).then(result => {
      if (result.resultado == 1) {
        this.solicitudService.enviarSAP(this.id_solicitud).then(data => {
          this._snack.open(this.MENSAJE_ENVIAR_SOLICITUD_A_SAP, 'cerrar', {
            duration: 1800,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
          this.router.navigate(['/productosTerminados/consultarSolicitudesPendientesSupervisor',this.ESCENARIO_NIVEL1]);
        })
      }
    })
  }

  async openDialogFinalizarSolicitud() {
    this.cantidadErrores = 0;
    await this.existeErrores();
    let mensaje = "";
    if (this.cantidadErrores > 0) {
      mensaje = Messages.warnig.MENSAJE_EXISTE_ERRORES_AL_GRABAR_SOLICITUD;
      const dialogRef = this.matDialog.open(AdvertenciaDialogComponent, {
        disableClose: true,
        data: mensaje
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == "CONFIRM_DLG_YES") {
        }
      });
    } else {
      mensaje = Messages.warnig.MENSAJE_FINALIZAR_SOLICITUD;
      const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
        disableClose: true,
        data: mensaje
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result == "CONFIRM_DLG_YES") {
          this.finalizarSolicitud(result)
        } else {
        }
      });
    }


  }

  finalizarSolicitud(result: any) {
    if (this.ROL_GESTOR == this.ROL_ADMINISTRADOR_MATERIAL) {
      this.solicitudService.finalizarSolicitud(this.id_solicitud, this.ROL_GESTOR).then(res => {
        console.log("mensaje-->" + JSON.stringify(res))
        let mensaje = Messages.error.MSG_ERROR_FINALIZAR_SOLICITUD;
        const dialogRef = this.matDialog.open(AdvertenciaDialogComponent, {
          disableClose: true,
          data: mensaje
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result == "CONFIRM_DLG_YES" ) {
            this.router.navigate(['/productosTerminados/consultarSolicitudesPendientesSupervisor',this.ESCENARIO_NIVEL1]);
          }
        });
      })
    }
  }



  openDialogAnexosMaterial(material: any): void {

    let datos = {
      "id_material_solicitud": material.id_material_solicitud,
      "id_rol": this.ROL_GESTOR
    }
    const dialogRef3 = this.matDialog.open(ListaAnexosMaterialDialogComponent, {
      disableClose: true,
      data: datos
    });
    dialogRef3.afterClosed().subscribe(result => {
      if (result.respuesta == "CONFIRM_DLG_YES") {
        //mostrar que se cargó algo?
      } else {
        console.log("no se rechazó la solicitud");
      }

    });
  }
  openDialogAnexosSolicitud(): void {

    let datos = {
      "id_solicitud": this.id_solicitud,
      "id_rol": this.ROL_GESTOR
    }
    const dialogRef2 = this.matDialog.open(ListaAnexosDialogComponent, {
      disableClose: true,
      data: datos,
      width: '50%'
    });
    dialogRef2.afterClosed().subscribe(result => {
      if (result.respuesta == "CONFIRM_DLG_YES") {
        //mostrar que se cargó algo?
      } else {
        console.log("no se rechazó la solicitud");
      }

    });
  }
  openDialogEquivalencias(element: any): void {

    let data = {
      "id_material_solicitud": element.id_material_solicitud,
      "id_rol": this.ROL_GESTOR
    }


    const dialogRef4 = this.matDialog.open(TablaEquivalenciasDialogComponent, {
      disableClose: true,
      data: data,
      width: '80%'
    });
    dialogRef4.afterClosed().subscribe(result => {
      if (result.respuesta == "CONFIRM_DLG_YES") {
        //mostrar que se cargó algo?
      } else {
        console.log("se cerró el dialog de equivalencias");
      }

    });
  }
  openDialogConfirmarAnularSolicitud(form: any): void {
    let mensaje = "Confirma la anulación de la solicitud ?";

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: mensaje
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == "CONFIRM_DLG_YES") {
        //se debe agregar el id de usuario y id de rol segun req. del servicio
        let item = {
          "id_solicitud": this.id_solicitud,
          "id_rol": 1
        }

        this.solicitudService.anularSolicitud(item).then(data => {
          if (data.resultado == 1) {
            this._snack.open(this.MENSAJE_ANULAR_SOLICITUD, 'cerrar', {
              duration: 1800,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            this.router.navigate(['/productosTerminados/consultarSolicitudesPendientesSupervisor',this.ESCENARIO_NIVEL1]);
          }

        })

      } else {
        console.log("no se anuló la solicitud");
      }

    });
  }
  openDialogErrorSap(form: any): void {
    let errorSap = form.mensaje_error_sap;
    //let errorSap = "test";

    const dialogRef5 = this.matDialog.open(ErrorSapDialogComponent, {
      disableClose: true,
      data: errorSap
    });

    dialogRef5.afterClosed().subscribe(result => {

      if (result == "CONFIRM_DLG_YES") {
        //se debe agregar el id de usuario y id de rol segun req. del servicio
        console.log("se cerró el dialog del error")
      }

    });
  }


}