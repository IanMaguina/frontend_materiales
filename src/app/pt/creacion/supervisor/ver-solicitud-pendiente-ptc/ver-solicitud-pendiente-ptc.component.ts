import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MotivoSolicitudComponent } from 'src/app/shared/motivo-solicitud/motivo-solicitud.component';
import { AprobadorSolicitud } from 'src/app/modelos/aprobadorSolicitud.interface';
import { FlujoSolicitudComponent } from 'src/app/shared/flujo-solicitud/flujo-solicitud.component';
import { SeguimientoSolicitudComponent } from 'src/app/shared/seguimiento-solicitud/seguimiento-solicitud.component';
import { Messages } from 'src/app/shared/messages';
import { ListaAnexosDialogComponent } from 'src/app/shared/lista-anexos-dialog/lista-anexos-dialog.component';
import { ListaAnexosMaterialDialogComponent } from 'src/app/shared/lista-anexos-material-dialog/lista-anexos-material-dialog.component';
import { TablaEquivalenciasDialogComponent } from 'src/app/shared/tabla-equivalencias-dialog/tabla-equivalencias-dialog.component';



@Component({
  selector: 'app-ver-solicitud-pendiente-ptc',
  templateUrl: './ver-solicitud-pendiente-ptc.component.html',
  styleUrls: ['./ver-solicitud-pendiente-ptc.component.css']
})
export class VerSolicitudPendientePtcComponent implements OnInit {

  solicitudForm: any;


  TIPO_SOLICITUD: number = GlobalSettings.TIPO_SOLICITUD_CREACION;
  ROL_GESTOR!: number;
  ROL_SOLICITANTE: number = GlobalSettings.ROL_SOLICITANTE;

  TIPO_OBJETO_INPUT_TEXT: string = GlobalSettings.TIPO_OBJETO_INPUT_TEXT;
  TIPO_OBJETO_COMBO: string = GlobalSettings.TIPO_OBJETO_COMBO;
  TIPO_OBJETO_CHECKBOX: string = GlobalSettings.TIPO_OBJETO_CHECKBOX;
  ESCENARIO_NIVEL1: string = GlobalSettings.ESCENARIO_NIVEL1_PRODUCTOS_TERMINADOS;
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

  //otros
  CODIGO_INTERNO_CODIGO_EAN: string = GlobalSettings.CODIGO_INTERNO_CODIGO_EAN;
  CODIGO_INTERNO_GRUPO_TIPO_POSICION: string = GlobalSettings.CODIGO_INTERNO_GRUPO_TIPO_POSICION;
  CODIGO_INTERNO_PARTIDA_ARANCELARIA: string = GlobalSettings.CODIGO_INTERNO_PARTIDA_ARANCELARIA;
  CODIGO_INTERNO_PRECIO_VARIABLE: string = GlobalSettings.CODIGO_INTERNO_PRECIO_VARIABLE;
  CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD: string = GlobalSettings.CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD;

  CODIGO_INTERNO_FORMULA_CONCRETO: string = GlobalSettings.CODIGO_INTERNO_FORMULA_CONCRETO;
  CODIGO_INTERNO_TIPO_MATERIAL: string = GlobalSettings.CODIGO_INTERNO_TIPO_MATERIAL;
  CODIGO_INTERNO_GRUPO_ARTICULO: string = GlobalSettings.CODIGO_INTERNO_GRUPO_ARTICULO;
  CODIGO_INTERNO_SECTOR: string = GlobalSettings.CODIGO_INTERNO_SECTOR;
  CODIGO_INTERNO_AMPLIACION: string = GlobalSettings.CODIGO_INTERNO_AMPLIACION;
  CODIGO_INTERNO_RAMO: string = GlobalSettings.CODIGO_INTERNO_RAMO;

  CODIGO_INTERNO_LIMITE_EXCESO_SUM_ILIMITADO: string = GlobalSettings.CODIGO_INTERNO_LIMITE_EXCESO_SUM_ILIMITADO;
  CODIGO_INTERNO_PRECIO_BASE: string = GlobalSettings.CODIGO_INTERNO_PRECIO_BASE;
  CODIGO_INTERNO_MONEDA: string = GlobalSettings.CODIGO_INTERNO_MONEDA;
  CODIGO_INTERNO_IND_PED_AUTOMA: string = GlobalSettings.CODIGO_INTERNO_IND_PED_AUTOMA;
  CODIGO_INTERNO_EXCESO_SUM_ILIMITADO: string = GlobalSettings.CODIGO_INTERNO_EXCESO_SUM_ILIMITADO;
  
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
  fileName: any = "no hay archivo";



  MENSAJE_RECHAZAR_SOLICITUD: string = Messages.confirmation.MENSAJE_RECHAZAR_SOLICITUD;
  MENSAJE_APROBAR_SOLICITUD: string = Messages.confirmation.MENSAJE_APROBAR_SOLICITUD;
  MSG_ERROR_NO_ANEXO:string =Messages.error.MSG_ERROR_NO_ANEXO;


  estadoFlujoActualSolicitud!: AprobadorSolicitud;

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
    private router: Router,
    private _snack: MatSnackBar,
    private matDialog: MatDialog,
    private rutaActiva: ActivatedRoute
  ) {
    this.ESCENARIO_NIVEL1= this.rutaActiva.snapshot.params.nivelEscenario;
    this.TIPO_SOLICITUD = this.rutaActiva.snapshot.params.tipoSolicitud;    
    this.initForm();
    this.id_solicitud = this.activatedRoute.snapshot.params.id;
    this.estadoActualSolicitud(this.id_solicitud);
    
  }

  ngOnInit() {
    this.getListarNivel3Solicitud();
    this.getListarUnidadMedida();
    //this.getListarOrganizacionVentas();
    this.getListarCanalDistribucion();
    this.getListarClasificacion();
   
  }


  async initForm() {
    
    this.solicitudForm = this.formBuilder.group({
      selectecLineaNegocio: [null, Validators.required],
      descripcion_corta: ['', Validators.required]
    })
    this.solicitudForm.valueChanges
      .subscribe(() => {
        this.formErrors = this.formValidatorService.handleFormChanges(this.solicitudForm, this.formErrors, this.validationMessages, this.submitted);
      });
  }

  obtenerSolicitud() {
    let params = {
      "id_solicitud": this.id_solicitud,
      "id_rol": this.ROL_GESTOR
    }
    this.solicitudService.obtenerSolicitud(params).then(data => {
      this.cabeceraSolicitud = data['objeto'];
      this.listadoMateriales = data['objeto'].materiales_solicitud;
      this.cargarDataCabecera();
      this.filtrarReglas();
      //console.log("datos de la solicitud-->" + JSON.stringify(this.cabeceraSolicitud))
    })
  }

  cargarDataCabecera() {
    this.solicitudForm.get('selectecLineaNegocio').setValue(this.cabeceraSolicitud.escenarioNivel3 ? this.cabeceraSolicitud.escenarioNivel3 : null);
    this.solicitudForm.get('descripcion_corta').setValue(this.cabeceraSolicitud.descripcion_corta ? this.cabeceraSolicitud.descripcion_corta : '');
  }

  filtrarReglas() {
    let selectecLineaNegocio: LineaNegocio = this.solicitudForm.get('selectecLineaNegocio').value;
    this.sociedad = selectecLineaNegocio.sociedad;
    this.getListarCentro();
    this.getListarOrganizacionVentas();
    this.getListadoCampoReglas(selectecLineaNegocio.id, this.ROL_SOLICITANTE, this.TIPO_SOLICITUD);
  }



  getListarUnidadMedida() {
    this.unidadMedidaService.getListarUnidadMedida().then((data) => {
      this.listadoUnidadMedidaBase = data['lista'];
      this.listadoUnidadMedidaPeso = data['lista'];
    })
  }

  getListarCentro() {
    this.centroService.getListarCentroPorSociedad(this.sociedad.codigo_sap).then((data) => {
      this.listadoCentroItem = data['lista'];
    })
  }

  getListarOrganizacionVentas() {
    this.organizacionVentaService.getListarCentroOrganizacionVentaxSociedad(this.sociedad.codigo_sap).then((data) => {
      this.listadoOrganizacionVentasItem = data['lista'];
    })
  }

  getListarCanalDistribucion() {
    this.canalDistribucionService.getListarCanalDistribucion().then((data) => {
      this.listadoCanalDistribucionItem = data['lista'];
    })
  }

  getListarAlmacen(centro_codigo_sap: string) {
    this.almacenService.getListarAlmacen(centro_codigo_sap).then((data) => {
      this.listadoAlmacenItem = data['lista'];
    })
  }

  getListarClasificacion() {
    this.clasificacionService.getListarClasificacion().then((data) => {
      this.listadoClasificacionItem = data['lista'];
    })
  }


  async getListadoCampoReglas(id_escenario_nivel3: number, id_rol: number, id_tipo_solicitud: number) {
    let numCampos = 0;
    let lista: any[] = [];
    let jsonDescargaFormato: any[] = [];
    this.displayedColumns = [];
    this.solicitudService.getListadoCampoReglas(id_escenario_nivel3, id_rol, id_tipo_solicitud).then((data) => {
      let listadoCampoReglas: ReglasCampo[] = data['lista'];
      let columna: any = '"id_material_solicitud": "",';;
      if (data.resultado == 1) {
        for (let y = 0; y < listadoCampoReglas.length; y++) {
          if (listadoCampoReglas[y].tipo_objeto != null) {
            numCampos++;
            let campo: any = listadoCampoReglas[y].codigo_interno;
            ///ian - agregando campos para la tabla
            this.displayedColumns.push(listadoCampoReglas[y].codigo_interno)
            //ian - fin 
            if (numCampos == 1) {
              columna = columna + '"' + campo + '": 0';
            } else {
              columna = columna + ',"' + campo + '": 0';
            }
            lista.push(listadoCampoReglas[y]);
          }
        }
        this.displayedColumns.push('anexos');
        this.displayedColumns.push('equivalencias');
        //this.displayedColumns.push('acciones');
        columna = JSON.parse("[{" + columna + "}]");
        jsonDescargaFormato = columna;
        this.cantidadCampos = numCampos;
        this.listadoCampoReglas = lista;
        this.jsonDescargaFormato = jsonDescargaFormato;
        //console.log('#numCampos-->' + numCampos);
      }
      //console.log(' listado campos reglas vista-->' + JSON.stringify(this.listadoCampoReglas))
      //console.log(' lista vista-->' + JSON.stringify(lista))
      //console.log(' Json Descarga Formato-->' + JSON.stringify(jsonDescargaFormato));
    })
  }

  //----- Compartido con nuevo

  async getListarNivel3Solicitud() {
    this.nivel3Service.getListarNivel3Solicitud().then((data) => {
      if (data.resultado == 1) {
        this.listadoLineaNegocio = data['lista'];
      }

    });
  }

  comparaIdLineaNegocio(val1: any, val2: any) {
    return (val1.id == val2.id)

  }

  getListadoMateriales() {
    this.solicitudService.getListadoMateriales(this.id_solicitud, this.ROL_SOLICITANTE).then((data) => {
      this.listadoMateriales = data['lista'];
      //console.log('listadoMateriales-->' + this.listadoMateriales);

    })
  }

  mapearCamposMaterial(form: any) {
    let campos = [];
    if (form.denominacion)
      campos.push({ 'codigo_interno': this.CODIGO_INTERNO_DENOMINACION, 'valor': form.denominacion.toUpperCase().trim() });
    if (form.unidad_medida_base)
      campos.push({ 'codigo_interno': this.CODIGO_INTERNO_UNIDAD_MEDIDA_BASE, 'valor': form.unidad_medida_base.codigo_sap });
    if (form.peso_bruto)
      campos.push({ 'codigo_interno': this.CODIGO_INTERNO_PESO_BRUTO, 'valor': form.peso_bruto });
    if (form.unidad_medida_peso)
      campos.push({ 'codigo_interno': this.CODIGO_INTERNO_UNIDAD_MEDIDA_PESO, 'valor': form.unidad_medida_peso.codigo_sap });
    if (form[this.CODIGO_INTERNO_CENTRO])
      campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CENTRO, 'valor': form[this.CODIGO_INTERNO_CENTRO].codigo_sap });
    if (form[this.CODIGO_INTERNO_CENTRO].codigo_centro_beneficio)
      campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CENTRO_BENEFICIO, 'valor': form[this.CODIGO_INTERNO_CENTRO].codigo_centro_beneficio });
    if (form.organizacion_ventas)
      campos.push({ 'codigo_interno': this.CODIGO_INTERNO_ORGANIZACION_VENTAS, 'valor': form.organizacion_ventas.codigo_sap });
    if (form.canal_distribucion)
      campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CANAL_DISTRIBUCION, 'valor': form.canal_distribucion.codigo_sap });
    if (form[this.CODIGO_INTERNO_ALMACEN])
      campos.push({ 'codigo_interno': this.CODIGO_INTERNO_ALMACEN, 'valor': form[this.CODIGO_INTERNO_ALMACEN].codigo_sap });
    if (form[this.CODIGO_INTERNO_CLASE_TAB]) {
      let valores: any[] = [];
      form.clase.forEach((element: { codigo_sap: any; }) => {
        valores.push({ 'valor': element.codigo_sap })
      });
      campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CLASE_TAB, 'valores': valores });
    }
    if (form[this.CODIGO_INTERNO_SECTOR])
    campos.push({ 'codigo_interno': this.CODIGO_INTERNO_SECTOR, 'valor': form[this.CODIGO_INTERNO_SECTOR].toUpperCase().trim() });
    
    if (form[this.CODIGO_INTERNO_TEXTO_COMPRA])
    campos.push({ 'codigo_interno': this.CODIGO_INTERNO_TEXTO_COMPRA, 'valor': form[this.CODIGO_INTERNO_TEXTO_COMPRA].toUpperCase().trim() });

    if (form[this.CODIGO_INTERNO_IDIOMA])
    campos.push({ 'codigo_interno': this.CODIGO_INTERNO_IDIOMA, 'valor': form[this.CODIGO_INTERNO_IDIOMA].codigo_sap });

    if (form[this.CODIGO_INTERNO_GRUPO_ARTICULO])
    campos.push({ 'codigo_interno': this.CODIGO_INTERNO_GRUPO_ARTICULO, 'valor': form[this.CODIGO_INTERNO_GRUPO_ARTICULO].codigo_sap });

    if (form[this.CODIGO_INTERNO_TIPO_MATERIAL])
    campos.push({ 'codigo_interno': this.CODIGO_INTERNO_TIPO_MATERIAL, 'valor': form[this.CODIGO_INTERNO_TIPO_MATERIAL].codigo_sap });


    return campos;
  }


  filtroLlenar(form: any) {
    console.log(JSON.stringify(form));

  }

  descargarFormato() {
    this.excelGeneratorService.exportAsExcelFile(this.jsonDescargaFormato, 'sample');
  }


  compareLineaNegocio(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.id === o2.id;
  }

  compareUnidadMedidaBase(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareUnidadMedidaPeso(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareCentro(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareCentro_beneficio(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareOrganizacionVentas(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareCanalDistribucion(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareAlmacen(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareClase(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1 && o2 ? o1.codigo_sap === o2.codigo_sap : o1 === o2;
  }

  aprobarSolicitud() {
    let mensaje = Messages.warnig.MENSAJE_APROBAR_SOLICITUD;
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: mensaje
    });

    dialogRef.afterClosed().subscribe(result => {
      //vienen los datos del dialog
      //console.log('The dialog was closed'+JSON.stringify(result));
      if (result == "CONFIRM_DLG_YES") {

        let body = {
          "id_solicitud": this.id_solicitud,
          "id_rol": this.ROL_GESTOR,
          "motivo": ""
        }
        this.solicitudService.aprobarSolicitud(body).then(result => {
          this._snack.open(this.MENSAJE_APROBAR_SOLICITUD, 'cerrar', {
            duration: 1800,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
          console.log('escenrio nivel 1--->'+this.ESCENARIO_NIVEL1)
          this.router.navigate(['/productosTerminados',this.TIPO_SOLICITUD,'consultarSolicitudesPendientesSupervisor',this.ESCENARIO_NIVEL1]);
        })
        
      } else {
        
      }

    });
  }

  openDialogConfirmarRechazarSolicitud(form: any): void {

    let mensaje = Messages.warnig.MENSAJE_DIALOGO_MOTIVO_RECHAZO;
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
      //vienen los datos del dialog
      console.log("construyendo el envio : " + JSON.stringify(result))
      if (result.respuesta == "CONFIRM_DLG_YES") {

        console.log(" ha optado por rechazar la solicitud" );
        //agregar  id_rol segun lo que venga
        let item_rechazo = {

          "id_solicitud": this.id_solicitud,
          "id_rol": this.ROL_GESTOR,
          "motivo": result.motivo,
          "id_motivo_rechazo": result.id_motivo_rechazo
        }
        console.log("enviando : " + JSON.stringify(item_rechazo));
        //console.log('la data antes de enviar : ' + JSON.stringify(item_rechazo));
        this.solicitudService.rechazarSolicitud(item_rechazo).then(data => {
          //console.log("se rechazó la solicitud - " + JSON.stringify(data));
          if (data.resultado == 1) {

            this._snack.open(this.MENSAJE_RECHAZAR_SOLICITUD, 'cerrar', {
              duration: 1800,
              horizontalPosition: "end",
              verticalPosition: "top"
            });
            this.router.navigate(['/productosTerminados',this.TIPO_SOLICITUD,'consultarSolicitudesPendientesSupervisor',this.ESCENARIO_NIVEL1]);
          }
        });


      } else {
        console.log("no se rechazó la solicitud");
      }
    });
  }

  seguimientoSolicitud() {
    const dialogRef = this.matDialog.open(SeguimientoSolicitudComponent, {
      disableClose: false,
      data: this.id_solicitud,
      //height: '62%',
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
      this.ROL_GESTOR=this.estadoFlujoActualSolicitud.id_rol;
      this.obtenerSolicitud();
      //console.log('Flujo actual solicitud-->'+JSON.stringify(this.estadoFlujoActualSolicitud));
    })
  }

  descargarAnexoMaterial(element: any) {
    //console.log("anexo de : " + JSON.stringify(element));
    let id_material_solicitud = element.id_material_solicitud;
    this.solicitudService.obtenerUrlMaterial(id_material_solicitud).then(res => {
      if (res.resultado == 1) {
        window.open(res.url, '_blank');
      } else {
        this._snack.open(this.MSG_ERROR_NO_ANEXO, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });


        console.log("no se tiene un anexo cargado");
      }
    });

  }

  isErrorCampo(element: any, codigo_interno: string) {
    if (codigo_interno.substr(-4)=='_tab' && element[codigo_interno + '_error']) {
      if (element[codigo_interno + '_error'].split("true").length > 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return element[codigo_interno + '_error'];
    }
  }

  openDialogAnexosMaterial(material: any): void {

    let datos = {
      "id_material_solicitud": material.id_material_solicitud,
      "id_rol": GlobalSettings.ROL_SUPERVISOR,
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
      "id_rol": GlobalSettings.ROL_SUPERVISOR,
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
      "id_rol": GlobalSettings.ROL_SUPERVISOR
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





}
