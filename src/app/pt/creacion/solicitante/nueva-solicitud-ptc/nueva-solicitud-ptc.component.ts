import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidatorService } from '../../../../servicios/form-validator.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { DenominacionSolicitudComponent } from 'src/app/shared/denominacion-solicitud/denominacion-solicitud.component';
import { CodigoMaterialSap } from 'src/app/modelos/codigoMaterialSap.interface';
import { AprobadorSolicitud } from 'src/app/modelos/aprobadorSolicitud.interface';
import { AdvertenciaDialogComponent } from 'src/app/shared/advertencia-dialog/advertencia-dialog.component';
import { Messages } from 'src/app/shared/messages';
import { IdiomaService } from 'src/app/servicios/idioma.service';
import { TipoMaterialService } from 'src/app/servicios/tipo-material.service';

import { Idioma } from 'src/app/modelos/idioma.interface';
import { GrupoArticulo } from 'src/app/modelos/grupo-articulo.interface';
import { TipoMaterial } from 'src/app/modelos/tipo-material.interface';
import { GrupoArticuloService } from 'src/app/servicios/grupo-articulo.service';
import { CampoVistaService } from 'src/app/servicios/campo-vista.service';
import { CampoVista } from 'src/app/modelos/campo-vista.interface';
import { TablaEquivalenciasDialogComponent } from 'src/app/shared/tabla-equivalencias-dialog/tabla-equivalencias-dialog.component';
import { ListaAnexosMaterialDialogComponent } from 'src/app/shared/lista-anexos-material-dialog/lista-anexos-material-dialog.component';
import { ListaAnexosDialogComponent } from 'src/app/shared/lista-anexos-dialog/lista-anexos-dialog.component';
import { CategoriaValoracionService } from 'src/app/servicios/categoria-valoracion.service';
import { GrupoImputacionMaterialService } from 'src/app/servicios/grupo-imputacion-material.service';
import { JerarquiaProductoService } from 'src/app/servicios/jerarquia-producto.service';
import { GrupoMaterial1Service } from 'src/app/servicios/grupo-material1.service';
import { GrupoMaterial2Service } from 'src/app/servicios/grupo-material2.service';
import { ResponsableControlProduccion } from 'src/app/modelos/responsable-control-produccion.interface';
import { PerfilControlFabricacion } from 'src/app/modelos/perfil-control-fabricacion.interface';
import { CategoriaValoracion } from 'src/app/modelos/categoria-valoracion.interface';
import { GrupoEstadisticaMaterial } from 'src/app/modelos/grupo-estadistica-material.interface';
import { GrupoImputacionMaterial } from 'src/app/modelos/grupo-imputacion-material.interface';
import { JerarquiaProducto } from 'src/app/modelos/jerarquia-producto.interface';
import { GrupoMaterial1 } from 'src/app/modelos/grupo-material1.interface';
import { GrupoMaterial2 } from 'src/app/modelos/grupo-material2.interface';
import { GrupoTransporte } from 'src/app/modelos/grupo-transporte.interface';
import { GrupoCarga } from 'src/app/modelos/grupo-carga.interface';
import { CentroBeneficioService } from 'src/app/servicios/centro-beneficio.service';
import { CentroBeneficio } from 'src/app/modelos/centro-beneficio.interface';
import { ActivatedRoute } from '@angular/router';
import { PartidaArancelariaService } from 'src/app/servicios/partida-arancelaria.service';
import { Observable } from 'rxjs';
import { PartidaArancelaria } from 'src/app/modelos/partida-arancelaria.interface';
import { map, startWith } from 'rxjs/operators';
import { ErrorSapDialogComponent } from 'src/app/shared/error-sap-dialog/error-sap-dialog.component';
import { EquivalenciaService } from 'src/app/servicios/equivalencia.service';
import { isEmpty } from 'ngx-cookie';
import { Equivalencia } from 'src/app/modelos/equivalencia.interface';
import { GrupoTransporteService } from 'src/app/servicios/grupo-transporte.service';
import { GrupoCargaService } from 'src/app/servicios/grupo-carga.service';
import { GrupoCompraService } from 'src/app/servicios/grupo-compra.service';
import { GrupoCompra } from 'src/app/modelos/grupo-compra.interface';
@Component({
  selector: 'app-nueva-solicitud-ptc',
  templateUrl: './nueva-solicitud-ptc.component.html',
  styleUrls: ['./nueva-solicitud-ptc.component.css']
})
export class NuevaSolicitudPtcComponent implements OnInit {

  solicitudForm: any;
  filtroForm!: FormGroup;
  itemForm!: FormGroup;
  ROL_SOLICITANTE: number = GlobalSettings.ROL_SOLICITANTE;

  TIPO_SOLICITUD: number = GlobalSettings.TIPO_SOLICITUD_CREACION;
  TIPO_SOLICITUD_CREACION: number = GlobalSettings.TIPO_SOLICITUD_CREACION;
  TIPO_SOLICITUD_AMPLIACION: number = GlobalSettings.TIPO_SOLICITUD_AMPLIACION;
  TIPO_SOLICITUD_MODIFICACION: number = GlobalSettings.TIPO_SOLICITUD_MODIFICACION;
  TIPO_SOLICITUD_BLOQUEO: number = GlobalSettings.TIPO_SOLICITUD_BLOQUEO;

  //escenarios
  ESCENARIO_NIVEL1 = '';//GlobalSettings.ESCENARIO_NIVEL1_PRODUCTOS_TERMINADOS;
  ESCENARIO_NIVEL1_PT: string = GlobalSettings.ESCENARIO_NIVEL1_PRODUCTOS_TERMINADOS;
  ESCENARIO_NIVEL1_RS: string = GlobalSettings.ESCENARIO_NIVEL1_REPUESTOS_SUMINISTROS;
  ESCENARIO_NIVEL1_MP: string = GlobalSettings.ESCENARIO_NIVEL1_MATERIAS_PRIMAS;
  ESCENARIO_NIVEL1_AO: string = GlobalSettings.ESCENARIO_NIVEL1_ACTIVOS_OTROS;


  TIPO_OBJETO_INPUT_TEXT: string = GlobalSettings.TIPO_OBJETO_INPUT_TEXT;
  TIPO_OBJETO_INPUT_TEXTAREA: string = GlobalSettings.TIPO_OBJETO_INPUT_TEXTAREA;
  TIPO_OBJETO_COMBO: string = GlobalSettings.TIPO_OBJETO_COMBO;
  TIPO_OBJETO_CHECKBOX: string = GlobalSettings.TIPO_OBJETO_CHECKBOX;

  TIPO_DATO_CHAR: string = GlobalSettings.TIPO_DATO_CHAR;
  TIPO_DATO_NUM: string = GlobalSettings.TIPO_DATO_NUM;

  CODIGO_INTERNO_CLASE_INSPECCION_TAB: string = GlobalSettings.CODIGO_INTERNO_CLASE_INSPECCION_TAB;
  CODIGO_INTERNO_AREA_PLANIFICACION_TAB: string = GlobalSettings.CODIGO_INTERNO_AREA_PLANIFICACION_TAB;
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
  CODIGO_INTERNO_MATERIAL_CODIGO_MODELO: string = GlobalSettings.CODIGO_INTERNO_MATERIAL_CODIGO_MODELO;
  CODIGO_INTERNO_CRITICOS: string = GlobalSettings.CODIGO_INTERNO_CRITICOS;
  CODIGO_INTERNO_ESTRATEGICOS: string = GlobalSettings.CODIGO_INTERNO_ESTRATEGICOS;

  CODIGO_INTERNO_MATERIAL_CODIGO_SAP: string = GlobalSettings.CODIGO_INTERNO_MATERIAL_CODIGO_SAP;

  CODIGO_INTERNO_VISTA_PLANIFICACION: string = GlobalSettings.CODIGO_INTERNO_VISTA_PLANIFICACION;
  CODIGO_INTERNO_PRECIO_COTIZACION: string = GlobalSettings.CODIGO_INTERNO_PRECIO_COTIZACION;
  CODIGO_INTERNO_PERIODO_VIDA: string = GlobalSettings.CODIGO_INTERNO_PERIODO_VIDA;
  CODIGO_INTERNO_GRUPO_COMPRA: string = GlobalSettings.CODIGO_INTERNO_GRUPO_COMPRA;
  SOLICITUD_DETALLE_NUMERO_COLUMNAS: number = GlobalSettings.SOLICITUD_DETALLE_NUMERO_COLUMNAS;
  listadoMateriales: any[] = [];
  listadoUnidadMedidaBase: UnidadMedida[] = [];
  listadoUnidadMedidaPeso: UnidadMedida[] = [];
  listadoUnidadMedidaVenta: UnidadMedida[] = [];
  listadoUnidadMedidaPedido: UnidadMedida[] = [];

  listadoCentros: any[] = [];
  listadoOrganizaciones: any[] = [];


  listadoReglasVista: ReglasVista[] = [];
  listadoCampoReglas: ReglasCampo[] = [];
  listadoCentroItem: any[] = [];
  listadoOrganizacionVentasItem: OrganizacionVenta[] = [];
  listadoCanalDistribucionItem: CanalDistribucion[] = [];
  listadoAlmacenItem: Almacen[] = [];
  //cambios
  listadoClasificacionItem: Clasificacion[] = [];
  //fin cambios

  listadoLineaNegocio: LineaNegocio[] = [];

  listadoIdioma: Idioma[] = [];
  listadoGrupoArticulo: GrupoArticulo[] = [];
  listadoTipoMaterial: TipoMaterial[] = [];

  listadoResponsableControlProduccion: ResponsableControlProduccion[] = [];
  listadoPerfilControlFabricacion: PerfilControlFabricacion[] = [];
  listadoCategoriaValoracion: CategoriaValoracion[] = [];
  listadoGrupoEstadisticaMaterial: GrupoEstadisticaMaterial[] = [];
  listadoGrupoImputacionMaterial: GrupoImputacionMaterial[] = [];
  listadoJerarquiaProducto: JerarquiaProducto[] = [];
  listadoGrupoMaterial1: GrupoMaterial1[] = [];
  listadoGrupoMaterial2: GrupoMaterial2[] = [];
  listadoGrupoTransporte: GrupoTransporte[] = [];
  listadoGrupoCarga: GrupoCarga[] = [];
  listadoGrupoCompra: GrupoCompra[] = [];
  listadoCentroBeneficio: CentroBeneficio[] = [];

  listadoMoneda = GlobalSettings.LISTADO_MONEDA;

  jsonDescargaFormato: any[] = [];
  cantidadCampos: number = 0;

  sociedad: Sociedad = { id: 0, codigo_sap: "", nombre: "" };
  camposMaterialModelo: any[] = [];
  listadoCampoVista: CampoVista[] = [];

  //datos de cabecera Solicitud
  id_solicitud!: number;
  correlativo!: string;
  id_escenario_nivel3: number = 0;

  organizacionVentaCodigoSap:string="";
  canalDistribucionCodigoSap:string="";
  //Validation
  formErrors = {
    'selectecLineaNegocio': '',
    'descripcion_corta': '',
    'selectedCentro': '',
    'selectedAlmacen': '',
    'codigoModelo': ''
  }
  formErrorsItem = {
    //'denominacion': ""
  }
  validationMessages = {
    'selectecLineaNegocio': {
      'required': 'Línea de negocio es requerido.'
    },
    'descripcion_corta': {
      'required': 'Descripción corta de solicitud es requerida.',
    }

  };



  displayedColumns: string[] = [];

  submitted = false;
  cabeceraSolicitud!: SolicitudCabecera;
  itemMaterialOld: any;
  fileName: any = "";


  activarEditarMaterial: boolean = false;

  botonLlenarDatos: boolean = false;

  //globalCOnfig mensajes

  MENSAJE_GUARDAR_SOLICITUD: string = GlobalSettings.MENSAJE_GUARDAR_SOLICITUD;
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
  //fon global config


  EscenarioNivel3_Old!: any; //Nuevo    
  existeDenominacion: any = false;
  mensajeDenominacionExistente: string = "Existe coincidencia";
  estadoFlujoActualSolicitud!: AprobadorSolicitud;
  cantidadErrores = 0;
  camposErrores = '';

  selectedPartidaArancelaria: any;
  filteredPartidaArancelaria?: Observable<PartidaArancelaria[]>;
  myControl = new FormControl();
  listadoPartidaArancelaria: PartidaArancelaria[] = [];
  btnAdd = false;
  existeAnexoSolicitud: boolean = false;
  existeAnexoMaterial: boolean = false;
  existeEquivalencias: boolean = false;

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
    private matDialog: MatDialog,
    private router: Router,
    private _snack: MatSnackBar,
    private idiomaService: IdiomaService,
    private grupoArticuloService: GrupoArticuloService,
    private tipoMaterialService: TipoMaterialService,
    private campoVistaService: CampoVistaService,
    private categoriaValoracionService: CategoriaValoracionService,
    private grupoImputacionMaterialService: GrupoImputacionMaterialService,
    private jerarquiaProductoService: JerarquiaProductoService,
    private grupoMaterial1Service: GrupoMaterial1Service,
    private grupoMaterial2Service: GrupoMaterial2Service,
    private centroBeneficioService: CentroBeneficioService,
    private partidaArancelariaService: PartidaArancelariaService,
    private rutaActiva: ActivatedRoute,
    private equivalenciaService: EquivalenciaService,
    private grupoTransporteService: GrupoTransporteService,
    private grupoCargaService: GrupoCargaService,
    private grupoCompraService: GrupoCompraService,

  ) {
    this.ESCENARIO_NIVEL1 = this.rutaActiva.snapshot.params.nivelEscenario;
    this.TIPO_SOLICITUD = parseInt(this.rutaActiva.snapshot.params.tipoSolicitud);
    this.initForm();


  }

  ngOnInit() {
    this.getListarNivel3Solicitud();
    this.getListarUnidadMedida();
    //this.getListarOrganizacionVentas();
    this.getListarCanalDistribucion();
    //this.getListarAlmacen();
    this.getListarClasificacion();
    this.getListarIdioma();
    this.getListarGrupoArticulo();
    this.getListarTipoMaterial();
    this.getListarCampoVista();

    this.getListarCategoriaValoracion();
    this.getListarGrupoImputacionMaterial();
    this.getListarJerarquiaProducto();
    this.getListarGrupoMaterial1();
    this.getListarGrupoMaterial2();

    this.getListarGrupoTransporte();
    this.getListarGrupoCarga();
    this.getListarGrupoCompra()

    this.filtrarPartidaArnacelaria();

  }


  async filtrarPartidaArnacelaria() {
    this.filteredPartidaArancelaria = this.itemForm.get(this.CODIGO_INTERNO_PARTIDA_ARANCELARIA)?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.codigo_sap),
        map(codigo_sap => codigo_sap ? this._filtrarPartidaArancelaria(codigo_sap) : this.listadoPartidaArancelaria.slice())
      );
  }

  displayFn(partida: PartidaArancelaria): string {
    return partida && partida.codigo_sap ? partida.codigo_sap : '';
  }

  private _filtrarPartidaArancelaria(codigosap: string): PartidaArancelaria[] {
    if (codigosap.length > 2) {
      let code = codigosap;
      //console.log("imm ingresa a la condicion: "+code);
      this.partidaArancelariaService.getFiltrarPartidaArancelaria(code).then((data) => {
        this.listadoPartidaArancelaria = data;
      });

    } else {
      this.listadoPartidaArancelaria = [];
    }

    return this.listadoPartidaArancelaria;
  }


  initForm() {

    this.solicitudForm = this.formBuilder.group({
      selectecLineaNegocio: ['', Validators.required],
      descripcion_corta: ['', Validators.required],
      files: new FormControl(''),
      fileAnexoSolicitud: ['']
    })
    this.solicitudForm.valueChanges
      .subscribe(() => {
        this.formErrors = this.formValidatorService.handleFormChanges(this.solicitudForm, this.formErrors, this.validationMessages, this.submitted);
      });

    this.filtroForm = this.formBuilder.group({
      selectedCentro: [{ value: '', disabled: true }],
      selectedAlmacen: [{ value: '', disabled: true }],
      codigoModelo: [{ value: '', disabled: true }],
      fileAnexoMaterial: ['']
    })
    this.filtroForm.valueChanges
      .subscribe(() => {
        this.formErrors = this.formValidatorService.handleFormChanges(this.filtroForm, this.formErrors, this.validationMessages, this.submitted);
      });

    this.itemForm = this.formBuilder.group({
      denominacion: [{ value: '', disabled: true }],
      unidad_medida_base: [{ value: '', disabled: true }],
      peso_bruto: [{ value: '', disabled: true }],
      unidad_medida_peso: [{ value: '', disabled: true }],
      centro_codigo_sap: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_CENTRO_BENEFICIO]: [''],
      organizacion_ventas: [{ value: '', disabled: true }],
      canal_distribucion: [{ value: '', disabled: true }],
      almacen_codigo_sap: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_CLASE_TAB]: [{ value: '', disabled: true }],
      //calidad
      [this.CODIGO_INTERNO_ALMACEN_PRODUCCION]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION]: [{ value: '', disabled: true }],
      //costos
      [this.CODIGO_INTERNO_CATEGORIA_VALORACION]: [{ value: '', disabled: true }],
      //Comercial
      [this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_JERARQUIA_PRODUCTO]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_GRUPOS_MATERIAL1]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_GRUPOS_MATERIAL2]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_TEXTO_COMERCIAL]: [{ value: '', disabled: true }],
      //administrador  materiales
      [this.CODIGO_INTERNO_GRUPO_TRANSPORTE]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_GRUPO_CARGA]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_GRUPO_COMPRA]: [""],
      [this.CODIGO_INTERNO_IDIOMA]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_TEXTO_COMPRA]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_UMP_VAR]: [{ value: '', disabled: true }],
      //control de gestión
      [this.CODIGO_INTERNO_PRECIO_ESTANDAR]: [{ value: '', disabled: true }],
      //otros
      [this.CODIGO_INTERNO_CODIGO_EAN]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_GRUPO_TIPO_POSICION]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_PARTIDA_ARANCELARIA]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_PRECIO_VARIABLE]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_FORMULA_CONCRETO]: [{ value: '', disabled: true }],

      [this.CODIGO_INTERNO_GRUPO_ARTICULO]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_TIPO_MATERIAL]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_SECTOR]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_AMPLIACION]: [{ value: false, disabled: true }],


      [this.CODIGO_INTERNO_LIMITE_EXCESO_SUM_ILIMITADO]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_PRECIO_BASE]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_MONEDA]: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_IND_PED_AUTOMA]: [{ value: false, disabled: true }],
      [this.CODIGO_INTERNO_EXCESO_SUM_ILIMITADO]: [{ value: false, disabled: true }],
      [this.CODIGO_INTERNO_CRITICOS]: [""],
      [this.CODIGO_INTERNO_ESTRATEGICOS]: [""],

      [this.CODIGO_INTERNO_VISTA_PLANIFICACION]: [""],
      [this.CODIGO_INTERNO_PRECIO_COTIZACION]: [""],
      [this.CODIGO_INTERNO_PERIODO_VIDA]: [""]
    })
    this.itemForm.valueChanges.subscribe(() => {
      this.formErrorsItem = this.formValidatorService.handleFormChanges(this.itemForm, this.formErrorsItem, this.validationMessages, this.submitted);
    })
  }

  filtrarReglas() {
    let selectecLineaNegocio: LineaNegocio = this.solicitudForm.get('selectecLineaNegocio').value;
    this.sociedad = selectecLineaNegocio.sociedad;
    this.getListarCentro();
    this.getListarCentroBeneficioPorSociedad(this.sociedad.codigo_sap);
    this.getListarOrganizacionVentas();
    this.getListadoCampoReglas(selectecLineaNegocio.id, this.ROL_SOLICITANTE, this.TIPO_SOLICITUD);
    this.id_escenario_nivel3 = selectecLineaNegocio.id;
    this.getVistaPortalReglas();
    this.listarCamposReglasxEscenario3();
  }

  habilitarControles() {
    this.filtroForm.get('selectedCentro')?.enable();
    this.filtroForm.get('selectedAlmacen')?.enable();
    this.filtroForm.get('codigoModelo')?.enable();
    this.listadoCampoReglas.forEach(campo => {
      if (campo["codigo_interno"] != this.CODIGO_INTERNO_AMPLIACION) {
        this.itemForm.get(campo["codigo_interno"])?.enable()
      }
    })


  }

  getListarUnidadMedida() {
    this.unidadMedidaService.getListarUnidadMedida().then((data) => {
      this.listadoUnidadMedidaBase = data['lista'];
      this.listadoUnidadMedidaPeso = data['lista'];
      this.listadoUnidadMedidaVenta = data['lista'];
      this.listadoUnidadMedidaPedido = data['lista'];
    })
  }

  getListarCentro() {
    this.centroService.getListarCentroPorSociedad(this.sociedad.codigo_sap).then((data) => {
      this.listadoCentroItem = data['lista'];
      this.listadoCentros = data['lista'];

    })
  }

  getListarOrganizacionVentas() {
    this.organizacionVentaService.getListarCentroOrganizacionVentaxSociedad(this.sociedad.codigo_sap).then((data) => {
      this.listadoOrganizacionVentasItem = data['lista'];
      this.listadoOrganizaciones = data['lista'];

    })
  }

  getListarCategoriaValoracion() {
    let tipo_material = (this.itemForm.get(this.CODIGO_INTERNO_TIPO_MATERIAL)?.value ? this.itemForm.get(this.CODIGO_INTERNO_TIPO_MATERIAL)?.value : "")
    let valor = (tipo_material == null || tipo_material == "" ? false : true);
    if (valor) {
      this.categoriaValoracionService.getListarCategoriaValoracionPorTipoMaterial(tipo_material).then((data) => {
        this.listadoCategoriaValoracion = data['lista'];
      })
    } else {
      this.categoriaValoracionService.getListarCategoriaValoracion().then((data) => {
        this.listadoCategoriaValoracion = data['lista'];
      })
    }
  }


  getListarGrupoImputacionMaterial() {
    this.grupoImputacionMaterialService.getListarGrupoImputacionMaterial().then((data) => {
      this.listadoGrupoImputacionMaterial = data['lista'];
    })
  }

  getListarJerarquiaProducto() {
    this.jerarquiaProductoService.getListarJerarquiaProducto().then((data) => {
      this.listadoJerarquiaProducto = data['lista'];
    })
  }

  getListarGrupoMaterial1() {
    this.grupoMaterial1Service.getListarGrupoMaterial1().then((data) => {
      this.listadoGrupoMaterial1 = data['lista'];
    })
  }

  getListarGrupoMaterial2() {
    this.grupoMaterial2Service.getListarGrupoMaterial2().then((data) => {
      this.listadoGrupoMaterial2 = data['lista'];
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

  getListarCentroBeneficioPorSociedad(sociedad_codigo_sap: string) {
    this.centroBeneficioService.getListarCentroBeneficioPorSociedad(sociedad_codigo_sap).then((data) => {
      this.listadoCentroBeneficio = data['lista'];
    })
  }

  getListarGrupoTransporte() {
    this.grupoTransporteService.getListarGrupoTransporte().then((data) => {
      this.listadoGrupoTransporte = data['lista'];
    })
  }

  getListarGrupoCarga() {
    this.grupoCargaService.getListarGrupoCarga().then((data) => {
      this.listadoGrupoCarga = data['lista'];
    })
  }

  getListarGrupoCompra() {
    this.grupoCompraService.getListarGrupoCompra().then((data) => {
      this.listadoGrupoCompra = data['lista'];
    })
  }

  filtrarListasPorCentro() {
    //console.log("formControlName---->" + val);
    let centro: Centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value;
    switch (this.TIPO_SOLICITUD) {
      case this.TIPO_SOLICITUD_CREACION:
        centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value;
        break;
      case this.TIPO_SOLICITUD_AMPLIACION:
        centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value;
        break;
      case this.TIPO_SOLICITUD_MODIFICACION:
        centro = this.filtroForm.get("selectedCentro")?.value;
        break;
      case this.TIPO_SOLICITUD_BLOQUEO:
        centro = this.filtroForm.get("selectedCentro")?.value;
        break;
    }

    this.getListarAlmacen(centro.codigo_sap);
    //console.log("centroItem---->" + JSON.stringify(this.centroItem));
  }


  async getListadoCampoReglas(id_escenario_nivel3: number, id_rol: number, id_tipo_solicitud: number) {
    let numCampos = 0;
    let lista: any[] = [];
    let jsonDescargaFormato: any[] = [];
    this.displayedColumns = [];
    this.solicitudService.getListadoCampoReglas(id_escenario_nivel3, id_rol, id_tipo_solicitud).then((data) => {
      let listadoCampoReglas: ReglasCampo[] = data['lista'];
      let columna: any = '"id_material_solicitud": "", "';
      if (this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_CREACION) {
        columna = columna + this.CODIGO_INTERNO_MATERIAL_CODIGO_MODELO + '":""';
      } else {
        columna = columna + this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP + '":""';
        this.displayedColumns.push(this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP);
      }
      if (data.resultado == 1) {
        for (let y = 0; y < listadoCampoReglas.length; y++) {
          if (listadoCampoReglas[y].tipo_objeto != null) {
            numCampos++;
            let campo: any = listadoCampoReglas[y].codigo_interno;
            ///ian - agregando campos para la tabla
            this.displayedColumns.push(listadoCampoReglas[y].codigo_interno)
            //ian - fin 
            if ((this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_CREACION) || (this.TIPO_SOLICITUD != this.TIPO_SOLICITUD_CREACION && campo!=this.CODIGO_INTERNO_DENOMINACION)) {
              if (numCampos == 1) {
                columna = columna + ',"' + campo + '": ""';
              } else {
                if (campo != this.CODIGO_INTERNO_AMPLIACION) {
                  columna = columna + ',"' + campo + '": ""';
                }
              }
            }/* else {
              if (campo != this.CODIGO_INTERNO_DENOMINACION) {
                if (numCampos == 1) {
                  columna = columna + ',"' + campo + '": ""';
                } else {
                  if (campo != this.CODIGO_INTERNO_AMPLIACION) {
                    columna = columna + ',"' + campo + '": ""';
                  }
                }
              }
            } */
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
      console.log(' listado campos reglas vista-->' + JSON.stringify(this.listadoCampoReglas));
      this.habilitarControles();
      this.initCamposMateriales();
      //console.log(' lista vista-->' + JSON.stringify(lista))
      console.log(' Json Descarga Formato-->' + JSON.stringify(jsonDescargaFormato));
    })
  }

  agregarSolicitud(form: any) {
    //console.log(JSON.stringify(form));
    let cabecera: any = {
      "descripcion_corta": form.descripcion_corta,
      "id_escenario_nivel3": form.selectecLineaNegocio.id,
      "id_tipo_solicitud": this.TIPO_SOLICITUD,
      "id_rol": this.ROL_SOLICITANTE
    };
    this.solicitudService.agregarSolicitud(cabecera).then((data) => {
      if (data.resultado == 1) {
        this.limpiarMaterial();
        this.habilitarControles();
        this.EscenarioNivel3_Old = this.solicitudForm.get('selectecLineaNegocio').value;
        this.id_solicitud = data.id;
        this.correlativo = data.correlativo;
        this.estadoActualSolicitud(this.id_solicitud);
        this.habilitarControles();
        this.obtenerUrlSolicitud();
        this._snack.open(this.MENSAJE_GUARDAR_SOLICITUD, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        //JSON.stringify(data);
      }
    })
  }

  //----- Compartido con nuevo

  async agregarMaterialCreacion(form: any) {
    if (true) {//!this.existeDenominacion
      let campos = await this.mapearCamposMaterial(form);
      console.log("11111111111111111111");
      //let campos= await this.llenarDatos(this.camposMaterialModelo,camposAux);
      console.log("camposCodigoModelo-->" + JSON.stringify(this.camposMaterialModelo))

      let params = {
        'id_solicitud': this.id_solicitud,
        'id_rol': this.ROL_SOLICITANTE,
        'material': { "campos": campos }
      }
      console.log('material--->' + JSON.stringify(params));
      this.solicitudService.agregarMaterial(params).then((data) => {
        //console.log('resppuesta nueva solicitud-->' + JSON.stringify(data));
        this._snack.open(this.MENSAJE_AGREGAR_MATERIAL, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.getListadoMateriales();
        this.limpiarMaterial()
      })
    }

  }

  async getListarNivel3Solicitud() {
    let params: any = {
      "id_rol": this.ROL_SOLICITANTE,
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


  async openDialogConfirmarActualizarSolicitud(form: any) {

    let selectecLineaNegocio_Nuevo: LineaNegocio = this.solicitudForm.get('selectecLineaNegocio').value;
    let mensaje = "";
    if (this.comparaIdLineaNegocio(this.EscenarioNivel3_Old, selectecLineaNegocio_Nuevo)) {
      mensaje = "Grabar Cambios";
    } else {
      mensaje = "Se borraran el detalle de la solicitud. Confirmar";
    }

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: mensaje
    });

    dialogRef.afterClosed().subscribe(result => {
      //vienen los datos del dialog
      //console.log('The dialog was closed'+JSON.stringify(result));
      if (result == "CONFIRM_DLG_YES") {
        this.actualizarSolicitud(form)
      } else {
        this.solicitudForm.get('selectecLineaNegocio').setValue(this.EscenarioNivel3_Old ? this.EscenarioNivel3_Old : null);
        this.filtrarReglas();
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
        this.EscenarioNivel3_Old = form.selectecLineaNegocio; //nuevo
        this.estadoActualSolicitud(this.id_solicitud);
        this.limpiarMaterial();
        this.habilitarControles();
        this.getListadoMateriales();
        JSON.stringify(data);
        this._snack.open(this.MENSAJE_ACTUALIZAR_SOLICITUD, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
      }
    })
  }

  getListadoMateriales() {
    this.solicitudService.getListadoMateriales(this.id_solicitud, this.ROL_SOLICITANTE).then((data) => {
      this.listadoMateriales = data['lista'];
      console.log('imm listadoMateriales-->' + this.listadoMateriales);

    })
  }

  async mapearCamposMaterial(form: any) {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    let campos: any[] = [];
    if (codigoModelo != "") {
      if (this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_CREACION) {
        campos.push({ 'codigo_interno': GlobalSettings.CODIGO_INTERNO_MATERIAL_CODIGO_MODELO, 'valor': codigoModelo });
      } else {
/*         this.camposMaterialModelo.forEach((reg, x) => {
          if (reg["valor_defecto"]!=""){
            campos.push({ 'codigo_interno': reg['codigo_interno'], 'valor': reg["valor_defecto"] });
          }
        })
 */        //campos.push({ 'codigo_interno': GlobalSettings.CODIGO_INTERNO_MATERIAL_CODIGO_SAP, 'valor': codigoModelo });
      }
    }
    let camposAux: any[] = [];
    this.listadoCampoReglas.forEach((campoRegla, x) => {
      if (this.itemForm.get(campoRegla['codigo_interno'])?.enabled) {
        //console.log("campo Regla 0000->" + campoRegla['codigo_interno'] + " @@@  " + JSON.stringify(form[campoRegla['codigo_interno']]));
        if (campoRegla['tipo_objeto'] == this.TIPO_OBJETO_INPUT_TEXT) {
          let valor = (form[campoRegla['codigo_interno']] ? form[campoRegla['codigo_interno']] : "")
          valor = (valor == "null" ? "" : valor);
          if (campoRegla['tipo_dato'] == this.TIPO_DATO_CHAR){
            valor = (valor == "null" ? "" : valor.trim());
          }
          campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
        }
        if (campoRegla['tipo_objeto'] == this.TIPO_OBJETO_INPUT_TEXTAREA) {
          let valor = (form[campoRegla['codigo_interno']] ? form[campoRegla['codigo_interno']] : "")
          valor = (valor == "null" ? "" : valor);
          campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
        }

        if (campoRegla['tipo_objeto'] == this.TIPO_OBJETO_CHECKBOX) {
          let valor = (form[campoRegla['codigo_interno']] ? "X" : "");
          campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
        }

        if (campoRegla['tipo_objeto'] == this.TIPO_OBJETO_COMBO) {
          if (campoRegla["codigo_interno"].substr(-4) == '_tab') {//if (campoRegla['codigo_interno'] == this.CODIGO_INTERNO_CLASE_TAB) {
            //console.log("entrando a hola mundo" + JSON.stringify(form[campoRegla['codigo_interno']]));
            let valores: any[] = [];
            let valorTab: any[] = [];
            //console.log('xxxxxxxx-->'+form[campoRegla['codigo_interno']].length);
            if (form[campoRegla['codigo_interno']].length) {
              //console.log("tmr")
              valorTab = form[campoRegla['codigo_interno']];
            }
            if (valorTab != []) {
              valorTab.forEach((element: { codigo_sap: any; }) => {
                valores.push({ 'valor': element.codigo_sap })
              });
            }
            campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valores': valores });
            //campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CLASE_TAB, 'valores': valores });
          } else {
            let valor = "";
            if (form[campoRegla['codigo_interno']]) {
              valor = (form[campoRegla['codigo_interno']].codigo_sap ? form[campoRegla['codigo_interno']].codigo_sap : "");
            }
            campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
          }
        }
      }
    })
    return campos;
  }


  descargarFormato() {
    this.excelGeneratorService.exportAsExcelFile(this.jsonDescargaFormato, 'Solicitante');
  }


  descargarListado() {
    let fila: any = '';
    let columnaError: any[] = [];
    let posicion = 0;
    let filaError: any[] = [];
    let c = 0;;
    let filaArray: any[] = [];
    //console.log(this.listadoCampoReglas.length + ' listadoarsa-->' + JSON.stringify(this.listadoCampoReglas))
    this.listadoMateriales.forEach((element) => {
      posicion = 1;//empezara de 1, por que hay un campo delante que es id_material_solicitud
      columnaError = []
      c++;
      fila = '{"id_material_solicitud":' + element.id_material_solicitud + ', "';
      if (this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_CREACION) {
        fila = fila + this.CODIGO_INTERNO_MATERIAL_CODIGO_MODELO + '":"' + element[this.CODIGO_INTERNO_MATERIAL_CODIGO_MODELO] + '"';
      } else {
        fila = fila + this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP + '":"' + element[this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP] + '"';
      }
      this.listadoCampoReglas.forEach(campoRegla => {
        if (campoRegla['codigo_interno'] != this.CODIGO_INTERNO_AMPLIACION) {
          let valor = (element[campoRegla['codigo_interno'] + "_valor"] == "null"
            || element[campoRegla['codigo_interno'] + "_valor"] == null ? "" : element[campoRegla['codigo_interno'] + "_valor"]);
          //valor=valor.split(/\n/i).join(' ');
          valor = valor.split(/\n/i).join('@@@');
          valor = valor.split(/"/i).join('###');
          if ((this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_CREACION) || (this.TIPO_SOLICITUD != this.TIPO_SOLICITUD_CREACION && campoRegla['codigo_interno']!=this.CODIGO_INTERNO_DENOMINACION)) {
            posicion++;
            fila = fila + ', "' + [campoRegla['codigo_interno']] + '":"' + valor + '"';
            if (element[campoRegla['codigo_interno'] + "_error"]) {
              columnaError.push(posicion);
            }
          }/*  else {
            if (campoRegla['codigo_interno'] != this.CODIGO_INTERNO_DENOMINACION) {
              posicion++;
              fila = fila + ', "' + [campoRegla['codigo_interno']] + '":"' + valor + '"';
              if (element[campoRegla['codigo_interno'] + "_error"]) {
                columnaError.push(posicion);
              }
            }
          } */
        }
      })
      if (columnaError.length > 0) {
        //console.log('columnaError--->'+JSON.stringify(columnaError));
        filaError.push({ "fila": c, "posicion": columnaError });
      }
      fila = fila + '}';
      filaArray.push(JSON.parse(fila));
    })
    //console.log('filaError--->' + JSON.stringify(filaError));
    //fila = JSON.parse("[" + fila + "]");
    //console.log('FilaArray--->' + JSON.stringify(filaArray));
    this.jsonDescargaFormato = filaArray;
    this.excelGeneratorService.exportListadoAsExcelFile(filaArray, filaError, 'Solicitante-' + this.correlativo);
  }

  descargarListadoOLD() {
    //let ccc = {"resultado":1,"mensaje":"","lista":[{"id_solicitud":"32","id_material_solicitud":140,"denominacion":"material arsa 30","denominacion_valor":"material arsa 30","denominacion_id":null,"denominacion_descripcion":"material arsa 30","denominacion_error":true,"unidad_medida_base":"Kilogramo","unidad_medida_base_valor":"KG","unidad_medida_base_id":51,"unidad_medida_base_descripcion":"Kilogramo","unidad_medida_base_error":false,"peso_bruto":"33.000","peso_bruto_valor":"33.000","peso_bruto_id":null,"peso_bruto_descripcion":"33.000","peso_bruto_error":false,"unidad_medida_peso":"Kilogramo","unidad_medida_peso_valor":"KG","unidad_medida_peso_id":51,"unidad_medida_peso_descripcion":"Kilogramo","unidad_medida_peso_error":false,"centro":"2021 Proy Pt Bongará Pacasmayo","centro_valor":"9903","centro_id":"9903","centro_descripcion":"2021 Proy Pt Bongará Pacasmayo","centro_error":false,"centro_beneficio":"data de prueba arsa","centro_beneficio_valor":"DUMMY_GH00","centro_beneficio_id":"DUMMY_GH00","centro_beneficio_descripcion":"data de prueba arsa","centro_beneficio_error":false,"organizacion_ventas":"Org.Ventas DINO","organizacion_ventas_valor":"2000","organizacion_ventas_id":2,"organizacion_ventas_descripcion":"Org.Ventas DINO","organizacion_ventas_error":false,"canal_distribucion":"Canal distribución 1","canal_distribucion_valor":"1","canal_distribucion_id":1,"canal_distribucion_descripcion":"Canal distribución 1","canal_distribucion_error":false,"almacen":"Almac Pacasmayo","almacen_valor":"2022","almacen_id":"2022","almacen_descripcion":"Almac Pacasmayo","almacen_error":false,"clase":"OTROS,CALIZA","clase_valor":"002111,00301","clase_id":"3,4","clase_descripcion":"OTROS,CALIZA","clase_error":"true,true"},{"id_solicitud":"32","id_material_solicitud":141,"denominacion":"material arsa 31","denominacion_valor":"material arsa 31","denominacion_id":null,"denominacion_descripcion":"material arsa 31","denominacion_error":false,"unidad_medida_base":"Kilogramo","unidad_medida_base_valor":"KG","unidad_medida_base_id":51,"unidad_medida_base_descripcion":"Kilogramo","unidad_medida_base_error":false,"peso_bruto":"33.000","peso_bruto_valor":"33.000","peso_bruto_id":null,"peso_bruto_descripcion":"33.000","peso_bruto_error":false,"unidad_medida_peso":"Kilogramo","unidad_medida_peso_valor":"KG","unidad_medida_peso_id":51,"unidad_medida_peso_descripcion":"Kilogramo","unidad_medida_peso_error":false,"centro":"2021 Proy Pt Bongará Pacasmayo","centro_valor":"9903","centro_id":"9903","centro_descripcion":"2021 Proy Pt Bongará Pacasmayo","centro_error":false,"centro_beneficio":"data de prueba arsa","centro_beneficio_valor":"DUMMY_GH00","centro_beneficio_id":"DUMMY_GH00","centro_beneficio_descripcion":"data de prueba arsa","centro_beneficio_error":false,"organizacion_ventas":"Org.Ventas DINOSELVA","organizacion_ventas_valor":"3000","organizacion_ventas_id":3,"organizacion_ventas_descripcion":"Org.Ventas DINOSELVA","organizacion_ventas_error":false,"canal_distribucion":"Canal distribución 1","canal_distribucion_valor":"1","canal_distribucion_id":1,"canal_distribucion_descripcion":"Canal distribución 1","canal_distribucion_error":true,"almacen":"Almac Pacasmayo","almacen_valor":"2022","almacen_id":"2022","almacen_descripcion":"Almac Pacasmayo","almacen_error":false,"clase":"OTROS,CALIZA","clase_valor":"002111,00301","clase_id":"3,4","clase_descripcion":"OTROS,CALIZA","clase_error":"false,false"},{"id_solicitud":"32","id_material_solicitud":142,"denominacion":"material arsa 32","denominacion_valor":"material arsa 32","denominacion_id":null,"denominacion_descripcion":"material arsa 32","denominacion_error":false,"unidad_medida_base":"Kilogramo","unidad_medida_base_valor":"KG","unidad_medida_base_id":51,"unidad_medida_base_descripcion":"Kilogramo","unidad_medida_base_error":false,"peso_bruto":"33.000","peso_bruto_valor":"33.000","peso_bruto_id":null,"peso_bruto_descripcion":"33.000","peso_bruto_error":false,"unidad_medida_peso":"Kilogramo","unidad_medida_peso_valor":"KG","unidad_medida_peso_id":51,"unidad_medida_peso_descripcion":"Kilogramo","unidad_medida_peso_error":false,"centro":"2021 Proy Pt Bongará Pacasmayo","centro_valor":"9903","centro_id":"9903","centro_descripcion":"2021 Proy Pt Bongará Pacasmayo","centro_error":false,"centro_beneficio":"data de prueba arsa","centro_beneficio_valor":"DUMMY_GH00","centro_beneficio_id":"DUMMY_GH00","centro_beneficio_descripcion":"data de prueba arsa","centro_beneficio_error":false,"organizacion_ventas":"Org.Ventas DINOSELVA","organizacion_ventas_valor":"3000","organizacion_ventas_id":3,"organizacion_ventas_descripcion":"Org.Ventas DINOSELVA","organizacion_ventas_error":false,"canal_distribucion":"Canal distribución 1","canal_distribucion_valor":"1","canal_distribucion_id":1,"canal_distribucion_descripcion":"Canal distribución 1","canal_distribucion_error":false,"almacen":"Almac Pacasmayo","almacen_valor":"2022","almacen_id":"2022","almacen_descripcion":"Almac Pacasmayo","almacen_error":false,"clase":"OTROS,CALIZA","clase_valor":"002111,00301","clase_id":"3,4","clase_descripcion":"OTROS,CALIZA","clase_error":"false,false"}]};
    //this.listadoMateriales=ccc['lista'];

    let fila: any = '';
    let columnaError: any[] = [];
    let posicion = 0;
    let filaError: any[] = [];
    let c = 0;;
    let filaArray: any[] = [];
    this.listadoMateriales.forEach((element) => {
      posicion = 1;//empezara de 1, por que hay un campo delante que es id_material_solicitud
      columnaError = []
      c++;
      //fila=fila+'"id_material_solicitud":'+element.id_material_solicitud+","
      fila = '{"id_material_solicitud":' + element.id_material_solicitud;
      if (element.denominacion) {
        posicion++;
        fila = fila + ', "' + this.CODIGO_INTERNO_DENOMINACION + '":"' + element.denominacion_valor + '"';
        if (element.denominacion_error) {
          columnaError.push(posicion);
        }
      }
      if (element.unidad_medida_base) {
        posicion++;
        fila = fila + ',"' + this.CODIGO_INTERNO_UNIDAD_MEDIDA_BASE + '":"' + element.unidad_medida_base_valor + '"';
        if (element.unidad_medida_base_error) {
          columnaError.push(posicion);
        }
      }
      if (element.peso_bruto) {
        posicion++;
        fila = fila + ',"' + this.CODIGO_INTERNO_PESO_BRUTO + '":"' + element.peso_bruto_valor + '"';
        if (element.peso_bruto_error) {
          columnaError.push(posicion);
        }
      }
      if (element.unidad_medida_peso) {
        posicion++;
        fila = fila + ',"' + this.CODIGO_INTERNO_UNIDAD_MEDIDA_PESO + '":"' + element.unidad_medida_peso_valor + '"';
        if (element.unidad_medida_peso_error) {
          columnaError.push(posicion);
        }
      }
      if (element[this.CODIGO_INTERNO_CENTRO]) {
        posicion++;
        fila = fila + ',"' + this.CODIGO_INTERNO_CENTRO + '":"' + element[this.CODIGO_INTERNO_CENTRO + '_valor'] + '"';
        if (element[this.CODIGO_INTERNO_CENTRO + '_error']) {
          columnaError.push(posicion);
        }
      }
      if (element.organizacion_ventas) {
        posicion++;
        fila = fila + ',"' + this.CODIGO_INTERNO_ORGANIZACION_VENTAS + '":"' + element.organizacion_ventas_valor + '"';
        if (element.organizacion_ventas_error) {
          columnaError.push(posicion);
        }
      }
      if (element.canal_distribucion) {
        posicion++;
        fila = fila + ',"' + this.CODIGO_INTERNO_CANAL_DISTRIBUCION + '":"' + element.canal_distribucion_valor + '"';
        if (element.canal_distribucion_error) {
          columnaError.push(posicion);
        }
      }
      if (element[this.CODIGO_INTERNO_ALMACEN]) {
        posicion++;
        fila = fila + ',"' + this.CODIGO_INTERNO_ALMACEN + '":"' + element[this.CODIGO_INTERNO_ALMACEN + '_valor'] + '"';
        if (element[this.CODIGO_INTERNO_ALMACEN + '_error']) {
          columnaError.push(posicion);
        }
      }
      if (element[this.CODIGO_INTERNO_CLASE_TAB]) {
        posicion++;
        fila = fila + ',"' + this.CODIGO_INTERNO_CLASE_TAB + '":"' + element[this.CODIGO_INTERNO_CLASE_TAB + '_valor'] + '"';
        //console.log('valor--->'+element.clase_error.search("true"))
        if (element[this.CODIGO_INTERNO_CLASE_TAB + '_error'] && element[this.CODIGO_INTERNO_CLASE_TAB + '_error'].search("true") >= 0) {
          columnaError.push(posicion);
        }
      }

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

    this.excelGeneratorService.exportListadoAsExcelFile(filaArray, filaError, 'sample');
  }

  onFileSelected(event: any) {
    let tabs = [this.CODIGO_INTERNO_CLASE_TAB, this.CODIGO_INTERNO_CLASE_INSPECCION_TAB, this.CODIGO_INTERNO_AREA_PLANIFICACION_TAB]
    this.excelGeneratorService.onFileSeleted(this.TIPO_SOLICITUD, event, tabs).then((data) => {
      this.cargaMasiva(data);
      this.solicitudForm.get('files').reset();
    });
  }

  cargaMasiva(materiales: any) {
    switch (this.TIPO_SOLICITUD) {
      case this.TIPO_SOLICITUD_CREACION:
        console.log("creacion");
        this.cargaMasivaCreacion(materiales);
        break;
      case this.TIPO_SOLICITUD_AMPLIACION:
        console.log("ampliacion");
        this.cargaMasivaAmpliacion(materiales);
        break;
      case this.TIPO_SOLICITUD_MODIFICACION:
        console.log("modificacion");
        this.cargaMasivaModificacion(materiales);
        break;
      case this.TIPO_SOLICITUD_BLOQUEO:
        console.log("bloqueo");
        this.cargaMasivaBloqueo(materiales);
        break;
    }
  }

  cargaMasivaCreacion(materiales: any) {
    let params = {
      'id_solicitud': this.id_solicitud,
      'id_rol': this.ROL_SOLICITANTE,
      'materiales': materiales
    }
    //console.log('materiales front end--->' + JSON.stringify(params));
    this.solicitudService.cargaMasiva(params).then((data) => {
      console.log('resultado--->' + JSON.stringify(data));
      this._snack.open(this.MENSAJE_CARGA_MASIVA, 'cerrar', {
        duration: 1800,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      this.getListadoMateriales();
    })

  }

  cargaMasivaAmpliacion(materiales: any) {
    let params = {
      'id_solicitud': this.id_solicitud,
      'id_rol': this.ROL_SOLICITANTE,
      'materiales': materiales
    }
    //console.log('materiales front end--->' + JSON.stringify(params));
    this.solicitudService.cargaMasivaAmpliacion(params).then((data) => {
      console.log('resultado--->' + JSON.stringify(data));
      if (data.resultado == 1) {
        this._snack.open(this.MENSAJE_CARGA_MASIVA, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
      } else {
        this.openDialogErrorSap(data.mensaje);
      }
      this.getListadoMateriales();
    })

  }

  cargaMasivaModificacion(materiales: any) {
    let params = {
      'id_solicitud': this.id_solicitud,
      'id_rol': this.ROL_SOLICITANTE,
      'materiales': materiales
    }
    //console.log('materiales front end--->' + JSON.stringify(params));
    this.solicitudService.cargaMasivaModificacion(params).then((data) => {
      console.log('resultado--->' + JSON.stringify(data));
      if (data.resultado == 1) {
        this._snack.open(this.MENSAJE_CARGA_MASIVA, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
      } else {
        this.openDialogErrorSap(data.mensaje);
      }
      this.getListadoMateriales();
    })
  }  

  cargaMasivaBloqueo(materiales: any) {
    let params = {
      'id_solicitud': this.id_solicitud,
      'id_rol': this.ROL_SOLICITANTE,
      'materiales': materiales
    }
    //console.log('materiales front end--->' + JSON.stringify(params));
    this.solicitudService.cargaMasivaBloqueo(params).then((data) => {
      console.log('resultado--->' + JSON.stringify(data));
      if (data.resultado == 1) {
        this._snack.open(this.MENSAJE_CARGA_MASIVA, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
      } else {
        this.openDialogErrorSap(data.mensaje);
      }
      this.getListadoMateriales();
    })
  }  
  
  async editarMaterial(item: any) {
    console.log("imm editar material-->" + JSON.stringify(item));
    this.habilitarControles();

    this.obtenerEquivalencias(item.id_material_solicitud);
    this.obtenerUrlMaterial(item.id_material_solicitud);


    this.btnAdd = false;
    //console.log(" listadoCampoReglas-->" + JSON.stringify(this.listadoCampoReglas));
    this.itemMaterialOld = item;
    this.activarEditarMaterial = true;
    let codigoModelo = (item[this.CODIGO_INTERNO_MATERIAL_CODIGO_MODELO] ? item[this.CODIGO_INTERNO_MATERIAL_CODIGO_MODELO] : "");
    this.filtroForm.get("codigoModelo")?.setValue(codigoModelo);
    this.listadoCampoReglas.forEach((campo: any) => {
      this.itemForm.get(campo["codigo_interno"])?.setValue("");
      let error = item[campo["codigo_interno"] + "_error"];//this.isErrorCampo(item, campo["codigo_interno"]);
      if (!error) {//!error
        let valor = (item[campo["codigo_interno"] + "_valor"] == null ? '' : item[campo["codigo_interno"] + "_valor"])

        if (campo["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_INPUT_TEXT) {
          this.itemForm.get(campo["codigo_interno"])?.setValue(valor);
        }
        if (campo["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_INPUT_TEXTAREA) {
          this.itemForm.get(campo["codigo_interno"])?.setValue(valor);
        }
        if (campo["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_CHECKBOX) {
          let check = false;
          if (item[campo["codigo_interno"] + "_valor"] == "X") {
            check = true;
          }
          this.itemForm.get(campo["codigo_interno"])?.setValue(check);
        }
        if (campo["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_COMBO) {
          if (campo["codigo_interno"] == this.CODIGO_INTERNO_CLASE_TAB) {
            let valores: any[] = [];
            if (item[this.CODIGO_INTERNO_CLASE_TAB + '_valor']) {
              let toArray_valor: any[] = item[this.CODIGO_INTERNO_CLASE_TAB + '_valor'].split(",");
              let toArray_id: any[] = item[this.CODIGO_INTERNO_CLASE_TAB + '_id'].split(",");
              let toArray_clase_descripcion = item[this.CODIGO_INTERNO_CLASE_TAB + '_descripcion'].split(",");
              for (let x = 0; x < toArray_id.length; x++) {
                valores.push({ "id_clasificacion": toArray_id[x], "codigo_sap": toArray_valor[x], "nombre": toArray_clase_descripcion[x] })
              }
            }
            this.itemForm.get(this.CODIGO_INTERNO_CLASE_TAB)?.setValue(valores);
          } else {
            if (campo["codigo_interno"] == this.CODIGO_INTERNO_CENTRO) {
              if (item[this.CODIGO_INTERNO_CENTRO + '_error'] == true || item[this.CODIGO_INTERNO_ALMACEN + '_error'] == true) {
                this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.disable();
                this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.disable();
              }
              this.getListarAlmacen(valor);
            }
            this.itemForm.get(campo["codigo_interno"])?.setValue({ codigo_sap: valor });
          }
        }
      }
    })
    this.deshabilitarControles(item);
    /*     if (item[this.CODIGO_INTERNO_AMPLIACION + '_valor'] == "X") {
          this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.disable();
          this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.disable();
          this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.disable();
          this.btnAdd=true;
        }else{
          await this.solicitudService.esPadre(this.id_solicitud,this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value).then(res=>{
            if (res.existe && item[this.CODIGO_INTERNO_DENOMINACION + '_error']==false){
              this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.disable();
              this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.disable();
              this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.disable();
              this.btnAdd=true;
            }
          })
        }
     */


  }

  eliminarMaterial(item: any) {
    switch (this.TIPO_SOLICITUD) {
      case this.TIPO_SOLICITUD_CREACION:
        console.log("creacion");
        this.eliminarCreacion(item);
        break;
      case this.TIPO_SOLICITUD_AMPLIACION:
        console.log("ampliacion");
        this.eliminarAmpliacion(item);
        break;
      case this.TIPO_SOLICITUD_MODIFICACION:
        break;
      case this.TIPO_SOLICITUD_BLOQUEO:
        break;
    }
  }

  eliminarCreacion(item: any) {
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

  eliminarAmpliacion(item: any) {
    this.itemMaterialOld = item;
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
        this.solicitudService.eliminarMaterialAmpliación(this.id_solicitud, this.itemMaterialOld["id_material_solicitud"]).then((res) => {
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

  compareUnidadMedidaBase(o1: any, o2: any) {
    //console.log('compareUnidadMedidaBase-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
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
  compareAlmacenProduccion(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareClase(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1 && o2 ? o1.codigo_sap === o2.codigo_sap : o1 === o2;
  }

  compareUnidadMedidaVenta(o1: any, o2: any) {
    //console.log('compareUnidadMedidaVenta-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareUnidadMedidaPedido(o1: any, o2: any) {
    //console.log('compareUnidadMedidaPedido-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  //compares agregados - ian
  compareResponsableControlProduccion(o1: any, o2: any) {
    //console.log('compareResponsableControlProduccion-->' + JSON.stringify(o1) + '------' + JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;

  }
  comparePerfilControlFabricacion(o1: any, o2: any) {
    //console.log('comparePerfilControlFabricacion-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareCategoriaValoracion(o1: any, o2: any) {
    //console.log('compareCategoriaValoracion-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareGrupoEstadisticaMaterial(o1: any, o2: any) {
    //console.log('compareGrupoEstadisticaMaterial-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareGrupoImputacionMaterial(o1: any, o2: any) {
    //console.log('compareGrupoImputacionMaterial-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareJerarquiaProducto(o1: any, o2: any) {
    //console.log('compareJerarquiaProducto-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareGrupoMaterial1(o1: any, o2: any) {
    //console.log('compareGrupoMaterial1-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareGrupoMaterial2(o1: any, o2: any) {
    //console.log('compareGrupoMaterial2-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareGrupoTransporte(o1: any, o2: any) {
    //console.log('compareGrupoTransporte-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareGrupoCarga(o1: any, o2: any) {
    //console.log('compareGrupoCarga-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareGrupoCompra(o1: any, o2: any) {
    //console.log('compareGrupoCarga-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareIdioma(o1: any, o2: any) {
    //console.log('compareIdioma-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareGrupoTipoPosicion(o1: any, o2: any) {
    //console.log('compareIdioma-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  comparePartidaArancelaria(o1: any, o2: any) {
    //console.log('compareIdioma-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareGrupoArticulo(o1: any, o2: any) {
    //console.log('arsa compareAlmacen-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }
  compareTipoMaterial(o1: any, o2: any) {
    //console.log('arsa compareAlmacen-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareMoneda(o1: any, o2: any) {
    //console.log('arsa compareAlmacen-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  compareClaseInspeccion(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1 && o2 ? o1.codigo_sap === o2.codigo_sap : o1 === o2;
  }

  mapearCamposMaterialActualizar(form: any, itemMaterialOld: any) {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    let campos: any[] = [];
    if (codigoModelo != "") {
      if (this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_CREACION) {
        campos.push({ 'codigo_interno': GlobalSettings.CODIGO_INTERNO_MATERIAL_CODIGO_MODELO, 'valor': codigoModelo });
      } else {
        //campos.push({ 'codigo_interno': GlobalSettings.CODIGO_INTERNO_MATERIAL_CODIGO_SAP, 'valor': codigoModelo });
      }
    }
    this.listadoCampoReglas.forEach((campoRegla, x) => {
      if (this.itemForm.get(campoRegla['codigo_interno'])?.enabled) {
        if (campoRegla['tipo_objeto'] == this.TIPO_OBJETO_INPUT_TEXT) {
          let valor = (form[campoRegla['codigo_interno']] ? form[campoRegla['codigo_interno']] : "")
          valor = (valor == "null" ? "" : valor);
          if (campoRegla['tipo_dato'] == this.TIPO_DATO_CHAR){
            valor = (valor == "null" ? "" : valor.trim());
          }
          campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
        }
        if (campoRegla['tipo_objeto'] == this.TIPO_OBJETO_INPUT_TEXTAREA) {
          let valor = (form[campoRegla['codigo_interno']] ? form[campoRegla['codigo_interno']] : "")
          valor = (valor == "null" ? "" : valor);
          campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
        }

        if (campoRegla['tipo_objeto'] == this.TIPO_OBJETO_CHECKBOX) {
          let valor = (form[campoRegla['codigo_interno']] ? "X" : "");
          campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
        }
        if (campoRegla['tipo_objeto'] == this.TIPO_OBJETO_COMBO) {
          if (campoRegla["codigo_interno"].substr(-4) == '_tab') {//if (campoRegla['codigo_interno'] == this.CODIGO_INTERNO_CLASE_TAB) {
            let valoresCadena = "";
            let valores: any[] = [];
            let c = 0;
            if (form[campoRegla['codigo_interno']]) {
              form[campoRegla['codigo_interno']].forEach((element: { codigo_sap: any; }) => {
                c++;
                if (c == 1) {
                  valoresCadena = element.codigo_sap;
                } else {
                  valoresCadena = valoresCadena + "," + element.codigo_sap;
                }

                valores.push({ 'valor': element.codigo_sap })
              });
            }
            campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valores': valores });
          } else {
            let valor = "";
            if (form[campoRegla['codigo_interno']]) {
              valor = (form[campoRegla['codigo_interno']].codigo_sap ? form[campoRegla['codigo_interno']].codigo_sap : "");
            }
            campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
          }
        }
      }
    })
    console.log("campos-->" + JSON.stringify(campos));
    return campos;
  }

  async openDialogConfirmarEnviarActualizarSolicitud(form: any) {
    this.cantidadErrores = 0;
    await this.existeErrores();
    let mensaje = "";

    if (this.cantidadErrores > 0) {
      mensaje = Messages.warnig.MENSAJE_EXISTE_ERRORES_AL_GRABAR_SOLICITUD + this.camposErrores;
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
        //vienen los datos del dialog
        //console.log('The dialog was closed'+JSON.stringify(result));
        if (result == "CONFIRM_DLG_YES") {
          this.actualizarEnviarSolicitud(form)
        } else {
          this.solicitudForm.get('selectecLineaNegocio').setValue(this.EscenarioNivel3_Old ? this.EscenarioNivel3_Old : null);
        }

      });


    }
  }

  async openDialogConfirmarEnviarActualizarSolicitud33(form: any) {
    let selectecLineaNegocio_Nuevo: LineaNegocio = this.solicitudForm.get('selectecLineaNegocio').value;
    let mensaje = "";
    this.cantidadErrores = 0
    await this.existeErrores()
    if (this.cantidadErrores == 0 && this.listadoMateriales.length > 0) {
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
  }

  async actualizarEnviarSolicitud(form: any) {
    let cabecera = {
      "descripcion_corta": form.descripcion_corta,
      "id_escenario_nivel3": form.selectecLineaNegocio.id,
      "id_solicitud": this.id_solicitud

    };
    this.solicitudService.actualizarSolicitud(cabecera).then(async (data) => {
      if (data.resultado == 1) {
        this.EscenarioNivel3_Old = form.selectecLineaNegocio; //nuevo

        this._snack.open(this.MENSAJE_ENVIO_SOLICITUD, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.aprobarSolicitud()

        /*         this.habilitarControles();
                this.getListadoMateriales(); */

      }
    })
  }

  aprobarSolicitud() {
    let body = {
      "id_solicitud": this.id_solicitud,
      "id_rol": this.ROL_SOLICITANTE,
      "motivo": ""
    }
    this.solicitudService.aprobarSolicitud(body).then(result => {
      this.router.navigate(['/productosTerminados', this.TIPO_SOLICITUD, 'consultarSolicitudesPendientesSupervisor', this.ESCENARIO_NIVEL1]);
    })
  }

  limpiarMaterial() {
    this.btnAdd = false;
    this.listadoCampoReglas.forEach(campoRegla => {
      this.itemForm.get(campoRegla['codigo_interno'])?.setValue("");
      this.itemForm.get(campoRegla['codigo_interno'])?.enable();
      if (campoRegla["codigo_interno"] == this.CODIGO_INTERNO_AMPLIACION) {
        this.itemForm.get(campoRegla["codigo_interno"])?.disable();
      }
    })

    this.initCamposMateriales();
    this.itemMaterialOld = null;
    this.camposMaterialModelo = [];
  }

  //agregado ian 07/04/2021

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
            this.router.navigate(['/productosTerminados', this.TIPO_SOLICITUD, 'consultarSolicitudesPendientesSupervisor', this.ESCENARIO_NIVEL1]);
          }

        })

      } else {
        console.log("no se anuló la solicitud");
      }

    });
  }


  listadoDenominacion() {
    let denominacion = this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value;
    //console.log('numero de solicitud-->'+this.id_solicitud)
    denominacion = denominacion.toUpperCase().trim();
    if (denominacion != "") {
      const dialogRef = this.matDialog.open(DenominacionSolicitudComponent, {
        disableClose: false,
        data: denominacion.toUpperCase().trim(),
        width: '50%',
        height: '50%'
      });

      dialogRef.afterClosed().subscribe(result => {
        //vienen los datos del dialog
        //console.log('The dialog was closed'+JSON.stringify(result));
      });
    }
  }

  estadoActualSolicitud(id_solicitud: number) {
    this.solicitudService.estadoActual(id_solicitud).then(sol => {
      this.estadoFlujoActualSolicitud = sol;
    })
  }

  initCamposMaterialesOLD() {
    this.listadoCampoReglas.forEach(campoRegla => {
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_DENOMINACION) {
        this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_UNIDAD_MEDIDA_BASE) {
        this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_BASE)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_PESO_BRUTO) {
        this.itemForm.get(this.CODIGO_INTERNO_PESO_BRUTO)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_UNIDAD_MEDIDA_PESO) {
        this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_PESO)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_CENTRO) {
        this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_CENTRO_BENEFICIO) {
        this.itemForm.get(this.CODIGO_INTERNO_CENTRO_BENEFICIO)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_ORGANIZACION_VENTAS) {
        this.itemForm.get(this.CODIGO_INTERNO_ORGANIZACION_VENTAS)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_CANAL_DISTRIBUCION) {
        this.itemForm.get(this.CODIGO_INTERNO_CANAL_DISTRIBUCION)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_ALMACEN) {
        this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }

      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_CLASE_TAB) {
        this.itemForm.get(this.CODIGO_INTERNO_CLASE_TAB)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }

      //Calidad
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_ALMACEN_PRODUCCION) {
        this.itemForm.get(this.CODIGO_INTERNO_ALMACEN_PRODUCCION)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION) {
        this.itemForm.get(this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION) {
        this.itemForm.get(this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }

      //Costos
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_CATEGORIA_VALORACION) {
        this.itemForm.get(this.CODIGO_INTERNO_CATEGORIA_VALORACION)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      //Comercial

      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA) {
        this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT) {
        this.itemForm.get(this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL) {
        this.itemForm.get(this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_JERARQUIA_PRODUCTO) {
        this.itemForm.get(this.CODIGO_INTERNO_JERARQUIA_PRODUCTO)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_GRUPOS_MATERIAL1) {
        this.itemForm.get(this.CODIGO_INTERNO_GRUPOS_MATERIAL1)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_GRUPOS_MATERIAL2) {
        this.itemForm.get(this.CODIGO_INTERNO_GRUPOS_MATERIAL2)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_TEXTO_COMERCIAL) {
        this.itemForm.get(this.CODIGO_INTERNO_TEXTO_COMERCIAL)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }

      //administrador  materiales
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_GRUPO_TRANSPORTE) {
        this.itemForm.get(this.CODIGO_INTERNO_GRUPO_TRANSPORTE)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_GRUPO_CARGA) {
        this.itemForm.get(this.CODIGO_INTERNO_GRUPO_CARGA)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_IDIOMA) {
        this.itemForm.get(this.CODIGO_INTERNO_IDIOMA)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO) {
        this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_UMP_VAR) {
        this.itemForm.get(this.CODIGO_INTERNO_UMP_VAR)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_TEXTO_COMPRA) {
        this.itemForm.get(this.CODIGO_INTERNO_TEXTO_COMPRA)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }

      //Control de gestiòn
      if (campoRegla.codigo_interno == this.CODIGO_INTERNO_PRECIO_ESTANDAR) {
        this.itemForm.get(this.CODIGO_INTERNO_PRECIO_ESTANDAR)?.setValidators([Validators.required, Validators.maxLength(campoRegla.longitud)]);
      }
    })
  }

  async existeErrores() {
    //console.log("arsa2-->" + JSON.stringify(this.listadoMateriales))
    //console.log("arsa3-->" + JSON.stringify(this.listadoCampoReglas))
    this.camposErrores = '';
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
          // console.log("caraxo")
          let campoVista = campoRegla['codigo_interno'];
          if (element[campoVista + "_valor"] == null || element[campoVista + "_valor"] == '') {
            vacio++;
            campoVacio = campoVacio + campoRegla['codigo_interno'] + " ";
            columnaVacio.push(vacio);
          }
          if (element[campoVista + "_error"] == true) {//if (this.isErrorCampo(element, campoVista) == true) {
            error++;
            campoError = campoError + campoRegla['codigo_interno'] + ". ";
            columnaError.push(error);
          }
        }
      })
      //filaError.push({ "fila": c, "error": error, "vacio": vacio });
      this.cantidadErrores = error + vacio;
      this.camposErrores = campoError;
      console.log({ "error": error, "vacio": vacio });
    })
  }


  openSnackBarError(message: string, action: string, tema: string) {
    this._snack.open(message, "Cerrar", {
      duration: 8000,
      panelClass: ['mat-toolbar', tema], //'mat-primary' to 'mat-accent' or 'mat-warn'
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'      
    });
  }

  cambioDenominacionActualizarMaterial(form: any) {
    console.log("campos form-->" + JSON.stringify(this.itemMaterialOld))
    if (form.denominacion && form.denominacion != this.itemMaterialOld.denominacion_valor) {
      return true
    }
    return false
  }

  async existeDenominacionSapYBdAdd(form: any) {
    switch (this.TIPO_SOLICITUD) {
      case this.TIPO_SOLICITUD_CREACION:
        console.log("creacion");
        this.agregarCreacion(form);
        break;
      case this.TIPO_SOLICITUD_AMPLIACION:
        console.log("ampliacion");
        this.agregarAmpliacion(form);
        break;
      case this.TIPO_SOLICITUD_MODIFICACION:
        console.log("Modificacion");
        this.agregarModificacion(form);
        break;
      case this.TIPO_SOLICITUD_BLOQUEO:
        console.log("Bloqueo");
        this.agregarBloqueo(form);
        break;
    }
  }

  async agregarCreacion(form: any) {
    let centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value
    let almacen = this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value
    let denominacion = this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value;
    let ampliacion = (this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value ? this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value : false);
    let centro_codigo_sap = (centro.codigo_sap ? centro.codigo_sap : "")
    let almacen_codigo_sap = (almacen.codigo_sap ? almacen.codigo_sap : "")
    denominacion = denominacion.toUpperCase().trim();
    await this.solicitudService.existeDenominacionSAP(denominacion).then(async res => {
      if (res) {
        this.existeDenominacion = res;
        this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_SAP, "", "mat-primary")
        return this.existeDenominacion;
      }
      if (!res) {
        await this.solicitudService.existeDenominacionDb(denominacion).then(res => {
          this.existeDenominacion = res.existe;
          this.agregarMaterialCreacion(form)
        })
      }
    })

  }

  async agregarAmpliacion(form: any) {
    let centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value
    let almacen = this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value
    let denominacion = this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value;
    let ampliacion = (this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value ? this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value : false);
    let centro_codigo_sap = (centro.codigo_sap ? centro.codigo_sap : "")
    let almacen_codigo_sap = (almacen.codigo_sap ? almacen.codigo_sap : "")
    denominacion = denominacion.toUpperCase().trim();
    this.agregarMaterialAmpliacion(form);
    /*     let res = await this.existeDenominacionCentroAlmacenSAP();
        if (res) {
    
        } else {
          this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_NO_EXISTE_SAP, "", "mat-primary")
        } */
  }

  async existeDenominacionSapYBdUpdate(form: any) {
    switch (this.TIPO_SOLICITUD) {
      case this.TIPO_SOLICITUD_CREACION:
        console.log("creacion");
        this.actualizarCreacion(form);
        break;
      case this.TIPO_SOLICITUD_AMPLIACION:
        console.log("ampliacion");
        this.actualizarAmpliacion(form);
        break;
      case this.TIPO_SOLICITUD_MODIFICACION:
        console.log("modificacion");
        this.actualizarModificacion(form);
        break;
      case this.TIPO_SOLICITUD_BLOQUEO:
        console.log("bloqueo");
        this.actualizarBloqueo(form);
        break;
    }

  }

  async actualizarCreacion(form: any) {
    let centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value
    let almacen = this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value
    let denominacion = this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value;
    //let ampliacion = (this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value ? true : false);
    let ampliacion = (this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value ? this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value : false);
    let centro_codigo_sap = (centro.codigo_sap ? centro.codigo_sap : "")
    let almacen_codigo_sap = (almacen.codigo_sap ? almacen.codigo_sap : "")
    let centroOld = this.itemMaterialOld[this.CODIGO_INTERNO_CENTRO + "_valor"];
    let almacenOld = this.itemMaterialOld[this.CODIGO_INTERNO_ALMACEN + "_valor"];
    denominacion = denominacion.toUpperCase().trim();
    if (this.cambioDenominacionActualizarMaterial(form)) { // SI cambio decripcion de denominación
      await this.solicitudService.existeDenominacionSAP(denominacion).then(async resSAP => {
        if (resSAP) {
          this.existeDenominacion = resSAP;
          this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_SAP, "", "mat-primary")
          this.limpiarMaterial();
          return this.existeDenominacion;
        }
        if (!resSAP) {
          await this.solicitudService.existeDenominacionDb(denominacion).then(async resDB => {
            this.existeDenominacion = resDB.existe;
            this.actualizarMaterial(form)
          })
        }
      })
    } else {
      this.actualizarMaterial(form)
    }

  }

  async actualizarAmpliacion(form: any) {
    let centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value
    let almacen = this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value
    let denominacion = this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value;
    //let ampliacion = (this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value ? true : false);
    let ampliacion = (this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value ? this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value : false);
    let centro_codigo_sap = (centro.codigo_sap ? centro.codigo_sap : "")
    let almacen_codigo_sap = (almacen.codigo_sap ? almacen.codigo_sap : "")
    let centroOld = this.itemMaterialOld[this.CODIGO_INTERNO_CENTRO + "_valor"];
    let almacenOld = this.itemMaterialOld[this.CODIGO_INTERNO_ALMACEN + "_valor"];
    denominacion = denominacion.toUpperCase().trim();
    this.actualizarMaterialAmpliacion(form)
  }

  actualizarMaterial(form: any) {
    let campos = this.mapearCamposMaterialActualizar(form, this.itemMaterialOld);
    let params = {
      'id_solicitud': this.id_solicitud,
      'id_material_solicitud': this.itemMaterialOld.id_material_solicitud,
      'id_rol': this.ROL_SOLICITANTE,
      'material': { "campos": campos }
    }
    //console.log('material--->' + JSON.stringify(params));

    this.solicitudService.actualizarMaterial(params).then((data) => {
      // console.log('resppuesta actualizar material-->' + JSON.stringify(data));
      this._snack.open(this.MENSAJE_ACTUALIZAR_MATERIAL, 'cerrar', {
        duration: 1800,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      this.activarEditarMaterial = false;
      console.log("lo que hay en el file " + this.filtroForm.get('fileAnexoMaterial')?.value);
      /* if (this.filtroForm.get('fileAnexoMaterial')?.value) {

        this.grabarAnexoMaterial(this.itemMaterialOld.id_material_solicitud);
      } */
      this.getListadoMateriales();
      this.limpiarMaterial();
      //this.limpiarCargaMaterial();
    })
  }

  async initCamposMateriales() {
    console.log(' initCamposMateriales listado reglas vista-->' + JSON.stringify(this.listadoCampoReglas))
    this.listadoCampoReglas.forEach((campo: any) => {
      if (campo["tipo_dato"] == this.TIPO_DATO_NUM) {
        this.itemForm.get(campo["codigo_interno"])?.setValidators([Validators.pattern('\\-?\\d*\\.?\\d{1,' + campo["longitud_decimal"] + '}')]);
      } else {
        this.itemForm.get(campo["codigo_interno"])?.setValidators([Validators.maxLength(campo.longitud)]);
      }
      if (campo["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_INPUT_TEXT) {
        this.itemForm.get(campo["codigo_interno"])?.setValue(campo['valor_defecto']);
      }
      if (campo["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_CHECKBOX) {
        let valor = false;
        if (campo["valor_defecto"] == "X") {
          valor = true;
        }
        this.itemForm.get(campo["codigo_interno"])?.setValue(valor);
      }
      if (campo["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_COMBO) {
        let valor = (campo['valor_defecto'] == null ? '' : campo['valor_defecto']);
        if (campo["codigo_interno"] == this.CODIGO_INTERNO_CLASE_TAB) {
          this.itemForm.get(campo["codigo_interno"])?.setValue([]);
        } else {
          if (campo["codigo_interno"] == this.CODIGO_INTERNO_CENTRO) {
            this.getListarAlmacen(campo['valor_defecto']);
          }
          if (valor==''){
            this.itemForm.get(campo["codigo_interno"])?.setValue("");
          }else{
            this.itemForm.get(campo["codigo_interno"])?.setValue({ codigo_sap: valor });
          }
        }
        //this.itemForm.get(campo["codigo_interno"])?.setValue({ codigo_sap: valor });
      }
      if (campo.regla_campo == "M") {
        if (campo["tipo_dato"] == this.TIPO_DATO_NUM) {
          this.itemForm.get(campo["codigo_interno"])?.setValidators([Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,' + campo["longitud_decimal"] + '}')]);
        } else {
          this.itemForm.get(campo["codigo_interno"])?.setValidators([Validators.required, Validators.maxLength(campo.longitud)]);
        }
      }
      this.itemForm.get(campo["codigo_interno"])?.updateValueAndValidity();
    })
  }

  getListarGrupoArticulo() {
    this.grupoArticuloService.getListarGrupoArticulo().then((data) => {
      this.listadoGrupoArticulo = data['lista'];

    })
  }

  getListarTipoMaterial() {
    this.tipoMaterialService.getListarTipoMaterial().then((data) => {
      this.listadoTipoMaterial = data['lista'];
    })
  }

  getListarIdioma() {
    this.idiomaService.getListarIdioma().then((data) => {
      this.listadoIdioma = data['lista'];
    })
  }

  llenarCentroyAlmacen() {
    //    console.log("formControlName---->" + JSON.stringify(this.filtroForm.get('selectedCentro')?.value));
    let centro: Centro = this.filtroForm.get('selectedCentro')?.value;
    this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.setValue({ codigo_sap: centro.codigo_sap });
    this.getListarAlmacen(centro.codigo_sap);
    //console.log("centroItem---->" + JSON.stringify(this.centroItem));
  }

  filtroLlenar() {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    let centro = (this.filtroForm.get("selectedCentro")?.value ? this.filtroForm.get("selectedCentro")?.value : "");
    let almacen = (this.filtroForm.get("selectedAlmacen")?.value ? this.filtroForm.get("selectedAlmacen")?.value : "");
    let body = {};

    switch (this.TIPO_SOLICITUD) {
      case this.TIPO_SOLICITUD_CREACION:
        console.log("entrando 1");
        body={
          "material": {
            "codigo": codigoModelo,
            "centro": (centro ? centro.codigo_sap : ""),
            "almacen": (almacen ? almacen.codigo_sap : ""),
            "organizacionVentas":(this.organizacionVentaCodigoSap?this.organizacionVentaCodigoSap:""),
            "canalDistribucion":(this.canalDistribucionCodigoSap?this.canalDistribucionCodigoSap:"")
          }
        }
        this.solicitudService.getMaterialCodigoModelo(body).then(mat => {
          this.camposMaterialModelo = mat;
          if (this.camposMaterialModelo.length > 0) {
            console.log("material modelo-->" + codigoModelo + "......." + JSON.stringify(mat));
            this.llenarDatosCodigoModelo(this.camposMaterialModelo);
          } else {
            this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_NO_EXISTE_SAP, "", "mat-primary")
          }
        })

        break;
      case this.TIPO_SOLICITUD_AMPLIACION:
        console.log("entrando 2");
        body={
          "material": {
            "material_codigo_sap": codigoModelo,
            "centro_codigo_sap": (centro ? centro.codigo_sap : ""),
            "almacen_codigo_sap": (almacen ? almacen.codigo_sap : ""),
            "organizacion_ventas":(this.organizacionVentaCodigoSap?this.organizacionVentaCodigoSap:""),
            "canal_distribucion":(this.canalDistribucionCodigoSap?this.canalDistribucionCodigoSap:"")
          }
        }
        this.solicitudService.getMaterialCodigoMaterialSapAmpliacion(body).then(mat => {
          this.camposMaterialModelo = mat;
          if (this.camposMaterialModelo.length > 0) {
            console.log("material modelo-->" + codigoModelo + "......." + JSON.stringify(mat));
            this.llenarDatosCodigoModelo(this.camposMaterialModelo);
          } else {
            this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_NO_EXISTE_SAP, "", "mat-primary")
          }
        })

        break;
      case this.TIPO_SOLICITUD_MODIFICACION:
        console.log("entrando 3");
        body={
          "material": {
            "codigo": codigoModelo,
            "centro": (centro ? centro.codigo_sap : ""),
            "almacen": (almacen ? almacen.codigo_sap : ""),
            "organizacionVentas":(this.organizacionVentaCodigoSap?this.organizacionVentaCodigoSap:""),
            "canalDistribucion":(this.canalDistribucionCodigoSap?this.canalDistribucionCodigoSap:"")
          }
        }

        this.solicitudService.getMaterialSAP(body).then(mat => {
          this.camposMaterialModelo = mat;
          if (this.camposMaterialModelo.length > 0) {
            console.log("material modelo-->" + codigoModelo + "......." + JSON.stringify(mat));
            this.llenarDatosCodigoModelo(this.camposMaterialModelo);
          } else {
            this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_NO_EXISTE_SAP, "", "mat-primary")
          }
        })

        break;
      case this.TIPO_SOLICITUD_BLOQUEO:
        console.log("entrando 4");
        body={
          "material": {
            "codigo": codigoModelo,
            "centro": (centro ? centro.codigo_sap : ""),
            "almacen": (almacen ? almacen.codigo_sap : ""),
            "organizacionVentas":(this.organizacionVentaCodigoSap?this.organizacionVentaCodigoSap:""),
            "canalDistribucion":(this.canalDistribucionCodigoSap?this.canalDistribucionCodigoSap:"")
          }
        }

        this.solicitudService.getMaterialSAP(body).then(mat => {
          this.camposMaterialModelo = mat;
          if (this.camposMaterialModelo.length > 0) {
            console.log("material modelo-->" + codigoModelo + "......." + JSON.stringify(mat));
            this.llenarDatosCodigoModelo(this.camposMaterialModelo);
          } else {
            this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_NO_EXISTE_SAP, "", "mat-primary")
          }
        })

        break;
    }
  }


  async llenarDatos(datosCodigoModelo: any[], campos: any[]) {
    datosCodigoModelo.forEach((campo: any, i) => {
      if (campo.codigo_interno == this.CODIGO_INTERNO_DENOMINACION) {
        this.itemForm.get(campo.codigo_interno)?.setValue(campo.valor)
        //console.log(i+"-->arriba peru"+ this.itemForm.get(campo.codigo_interno)?.);
      }

      if (this.itemForm.get(campo["codigo_interno"])?.valid) {
        this.itemForm.get(campo.codigo_interno)?.setValue(campo.valor);
        console.log(i + "-->" + campo.codigo_interno);
      }

/*       if (campo.codigo_interno == this.CODIGO_INTERNO_GRUPO_ARTICULO) {
        //console.log("campo CODIGO_INTERNO_GRUPO_ARTICULO-->" + JSON.stringify({ codigo_sap: campo.valor }));
        this.itemForm.get(this.CODIGO_INTERNO_GRUPO_ARTICULO)?.setValue({ codigo_sap: campo.valor })
        campos.push({ 'codigo_interno': this.CODIGO_INTERNO_GRUPO_ARTICULO, 'valor': campo.valor });
      }
      if (campo.codigo_interno == this.CODIGO_INTERNO_TIPO_MATERIAL) {
        this.itemForm.get(this.CODIGO_INTERNO_TIPO_MATERIAL)?.setValue({ codigo_sap: campo.valor })
        campos.push({ 'codigo_interno': this.CODIGO_INTERNO_TIPO_MATERIAL, 'valor': campo.valor });
      }
      if (campo.codigo_interno == this.CODIGO_INTERNO_SECTOR) {
        //console.log("campo CODIGO_INTERNO_GRUPO_ARTICULO-->" + JSON.stringify({ codigo_sap: campo.valor }));
        this.itemForm.get(this.CODIGO_INTERNO_SECTOR)?.setValue(campo.valor)
        campos.push({ 'codigo_interno': this.CODIGO_INTERNO_SECTOR, 'valor': campo.valor });
      }
      if (campo.codigo_interno == this.CODIGO_INTERNO_RAMO) {
        this.itemForm.get(this.CODIGO_INTERNO_RAMO)?.setValue(campo.valor);
        campos.push({ 'codigo_interno': this.CODIGO_INTERNO_RAMO, 'valor': campo.valor });
      }
 */    });
    return campos;
  }

  async llenarDatosCodigoModelo(datosCodigoModelo: any[]) {
    this.listadoCampoReglas.forEach((campoRegla: any) => {
      datosCodigoModelo.forEach((campo: any, i) => {
        if (campo.codigo_interno == this.CODIGO_INTERNO_TIPO_MATERIAL) {
          this.itemForm.get(this.CODIGO_INTERNO_TIPO_MATERIAL)?.setValue(campo.valor);
          this.getListarCategoriaValoracion();
        }
        if (campoRegla["codigo_interno"] == campo["codigo_interno"]) {
          this.itemForm.get(campoRegla["codigo_interno"])?.setValue("");
          let valor = (campo["valor"] == null || campo["valor"] == "0" || campo["valor"] == "0.00" || campo["valor"] == "0.000" ? '' : campo["valor"]);

          if (campoRegla["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_INPUT_TEXT) {
            if (campoRegla["codigo_interno"] == this.CODIGO_INTERNO_DENOMINACION) {
              this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.disable();
            }
            this.itemForm.get(campo["codigo_interno"])?.setValue(valor);
          }
          if (campoRegla["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_INPUT_TEXTAREA) {
            this.itemForm.get(campo["codigo_interno"])?.setValue(valor);
          }
          if (campoRegla["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_CHECKBOX) {
            let check = false;
            if (campo["codigo_interno"] == "X") {
              check = true;
            }
            this.itemForm.get(campoRegla["codigo_interno"])?.setValue(check);
          }
          if (campoRegla["tipo_objeto"] == GlobalSettings.TIPO_OBJETO_COMBO) {
            if (campoRegla["codigo_interno"] == this.CODIGO_INTERNO_CENTRO) {
              this.getListarAlmacen(valor);
            }
            if (valor == '') {
              this.itemForm.get(campoRegla["codigo_interno"])?.setValue('');
            } else {
              this.itemForm.get(campoRegla["codigo_interno"])?.setValue({ codigo_sap: valor });
            }
          }
        }
      })
    })
  }

  getListarCampoVista() {
    this.campoVistaService.getListarCampoVista().then((data) => {
      this.listadoCampoVista = data;
    })
  }

  /*   isErrorCampo(element: any, codigo_interno: string) {
      if (codigo_interno.substr(-4) == '_tab' && element[codigo_interno + '_error']) {
        if (element[codigo_interno + '_error'].split("true").length > 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return element[codigo_interno + '_error'];
      }
    }
   */
  isErrorCampoOLD(element: any) {
    if (element[this.CODIGO_INTERNO_CLASE_TAB + '_error']) {
      if (element[this.CODIGO_INTERNO_CLASE_TAB + '_error'].split("true").length > 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  setearUnidadMedida() {
    let umb = this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_BASE)?.value;
    if (umb) {
      //this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_PESO)?.setValue({ codigo_sap: umb.codigo_sap })
      this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA)?.setValue({ codigo_sap: "" })
      this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO)?.setValue({ codigo_sap: "" })
    }
  }

  openDialogAnexosSolicitud(): void {

    let datos = {
      "id_solicitud": this.id_solicitud,
      "id_rol": this.ROL_SOLICITANTE,
    }
    const dialogRef2 = this.matDialog.open(ListaAnexosDialogComponent, {
      disableClose: true,
      data: datos,
      width: '50%'
    });
    dialogRef2.afterClosed().subscribe(result => {
      if (result.respuesta != "CONFIRM_DLG_YES") {
        console.log("no se rechazó la solicitud");
      }
      this.obtenerUrlSolicitud();
    });
  }
  openDialogAnexosMaterial(material: any): void {

    let datos = {
      "id_material_solicitud": material.id_material_solicitud,
      "id_rol": this.ROL_SOLICITANTE,
    }
    const dialogRef3 = this.matDialog.open(ListaAnexosMaterialDialogComponent, {
      disableClose: true,
      data: datos
    });
    dialogRef3.afterClosed().subscribe(result => {
      if (result.respuesta != "CONFIRM_DLG_YES") {
        console.log("no se rechazó la solicitud");
      }
      this.getListadoMateriales();
      this.obtenerUrlMaterial(this.itemMaterialOld.id_material_solicitud);
    });
  }

  selectOpenAnexosMaterial() {
    let material = {
      "id_material_solicitud": this.itemMaterialOld.id_material_solicitud
    }
    this.openDialogAnexosMaterial(material);
  }
  onSelectEquivalencias() {
    let item = {
      "id_material_solicitud": this.itemMaterialOld.id_material_solicitud,
    }
    this.openDialogEquivalencias(item);
  }

  openDialogEquivalencias(element: any): void {

    let data = {
      "id_material_solicitud": element.id_material_solicitud,
      "id_rol": this.ROL_SOLICITANTE
    }


    const dialogRef4 = this.matDialog.open(TablaEquivalenciasDialogComponent, {
      disableClose: true,
      data: data,
      width: '80%'
    });
    dialogRef4.afterClosed().subscribe(result => {
      if (result.respuesta != "CONFIRM_DLG_YES") {
        console.log("se cerró el dialog de equivalencias");
      }
      this.getListadoMateriales();
      console.log("imm env. mate sol : " + element.id_material_solicitud);
      this.obtenerEquivalencias(element.id_material_solicitud);
    });
  }

  async existeDenominacionCentroAlmacenSAP() {
    let existe = false;
    let codigoModelo = this.filtroForm.get("codigoModelo")?.value;
    let centro = (this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value ? this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value : "");
    let almacen = (this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value ? this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value : "");
    let body = {
      "material": {
        "codigo": codigoModelo,
        "centro": centro,
        "almacen": almacen,
      }
    }
    this.solicitudService.getMaterialCodigoModelo(body).then((mat: any[]) => {
      if (mat.length > 0) {
        existe = true;
        return existe;
      } else {
        existe = false;
        return existe;
      }
    })
    return existe;
  }

  async agregarMaterialAmpliacion(form: any) {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    if (true) {//!this.existeDenominacion
      let campos: any[] = await this.mapearCamposMaterial(form);
      let params = {
        'material': { "campos": campos, [this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP]: codigoModelo }
      }
      //console.log('material Ampliacion--->' + JSON.stringify(params));
      this.solicitudService.agregarMaterialAmpliacion(this.id_solicitud, params).then((data) => {
        console.log('resppuesta al agregar material amplicacion-->' + JSON.stringify(data));
        let mensaje = this.MENSAJE_AGREGAR_MATERIAL;
        if (data["resultado"] == 0) {
          mensaje = data["mensaje"];
          
          if (data["lista"]){
            this.solicitudService.estadoActual(data["lista"]["id_solicitud"]).then(sol => {
              this.openSnackBarError(mensaje+ ".\nSe encuentra en trámite por el usuario "+ sol["nombre_usuario_aprobador"], "", "mat-primary")
            })
          }else{
            this.openSnackBarError(mensaje, "", "mat-primary")
          }
        } else {
          this._snack.open(mensaje, 'cerrar', {
            duration: 1800,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        this.getListadoMateriales();
        this.limpiarMaterial()
      })
    }
  }

  async actualizarMaterialAmpliacion(form: any) {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    if (true) {//!this.existeDenominacion
      let campos: any[] = this.mapearCamposMaterialActualizar(form, this.itemMaterialOld);
      let params = {
        'material': { "campos": campos, [this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP]: codigoModelo }
      }
      //console.log('material Ampliacion--->' + JSON.stringify(params));
      this.solicitudService.actualizarMaterialAmpliacion(this.id_solicitud, this.itemMaterialOld["id_material_solicitud"], params).then((data) => {
        console.log('resppuesta al agregar material amplicacion-->' + JSON.stringify(data));
        let mensaje = this.MENSAJE_ACTUALIZAR_MATERIAL;
        if (data["resultado"] == 0) {
          mensaje = data["mensaje"];
          if (data["lista"]){
            this.solicitudService.estadoActual(data["lista"]["id_solicitud"]).then(sol => {
              this.openSnackBarError(mensaje+ ".\nSe encuentra en trámite por el usuario "+ sol["nombre_usuario_aprobador"], "", "mat-primary")
            })
          }else{
            this.openSnackBarError(mensaje, "", "mat-primary")
          }
        } else {
          this._snack.open(mensaje, 'cerrar', {
            duration: 1800,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
        }
        this.getListadoMateriales();
        this.limpiarMaterial()
      })
    }
  }

  async agregarModificacion(form: any) {
    let centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value
    let almacen = this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value
    let denominacion = this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value;
    denominacion = denominacion.toUpperCase().trim();
    this.agregarMaterialModificacion(form);
  }

  async agregarMaterialModificacion(form: any) {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    let campos: any[] = await this.mapearCamposMaterial(form);
    let centro = (this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value?this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value["codigo_sap"]:"");
    let almacen = (this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value?this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value["codigo_sap"]:"");
    let params = {
      'material': { "campos": campos, 
                  [this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP]: codigoModelo,
                  [this.CODIGO_INTERNO_CENTRO]:centro,
                  [this.CODIGO_INTERNO_ALMACEN]:almacen
                }
    }
    //console.log('material Ampliacion--->' + JSON.stringify(params));
    this.solicitudService.agregarMaterialModificacion(this.id_solicitud, params).then((data) => {
      console.log('resppuesta al agregar material modificacion-->' + JSON.stringify(data));
      let mensaje = this.MENSAJE_AGREGAR_MATERIAL;
      if (data["resultado"] == 0) {
        mensaje = data["mensaje"];
        this.openSnackBarError(mensaje, "", "mat-primary")
      } else {
        this._snack.open(mensaje, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
      }
      this.getListadoMateriales();
      this.limpiarMaterial()
    })
  }

  async actualizarModificacion(form: any) {
    let centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value
    let almacen = this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value
    let denominacion = this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value;
    //let ampliacion = (this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value ? true : false);
    let ampliacion = (this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value ? this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value : false);
    let centro_codigo_sap = (centro.codigo_sap ? centro.codigo_sap : "")
    let almacen_codigo_sap = (almacen.codigo_sap ? almacen.codigo_sap : "")
    let centroOld = this.itemMaterialOld[this.CODIGO_INTERNO_CENTRO + "_valor"];
    let almacenOld = this.itemMaterialOld[this.CODIGO_INTERNO_ALMACEN + "_valor"];
    denominacion = denominacion.toUpperCase().trim();
    this.actualizarMaterialModificacion(form)
  }

  async actualizarMaterialModificacion(form: any) {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    let campos: any[] = this.mapearCamposMaterialActualizar(form, this.itemMaterialOld);
    let centro = (this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value?this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value["codigo_sap"]:"");
    let almacen = (this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value?this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value["codigo_sap"]:"");
    let params = {
      'material': { "campos": campos, 
                  [this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP]: codigoModelo,
                  [this.CODIGO_INTERNO_CENTRO]:centro,
                  [this.CODIGO_INTERNO_ALMACEN]:almacen
                }
    }
    //console.log('material Ampliacion--->' + JSON.stringify(params));
    this.solicitudService.actualizarMaterialModificacion(this.id_solicitud, this.itemMaterialOld["id_material_solicitud"], params).then((data) => {
      console.log('resppuesta al agregar material Modificacion-->' + JSON.stringify(data));
      let mensaje = this.MENSAJE_ACTUALIZAR_MATERIAL;
      if (data["resultado"] == 0) {
        mensaje = data["mensaje"];
        this.openSnackBarError(mensaje, "", "mat-primary")
      } else {
        this._snack.open(mensaje, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
      }
      this.getListadoMateriales();
      this.limpiarMaterial()
    })
  }

  // Inicio
  async agregarBloqueo(form: any) {
    let centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value
    let almacen = this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value
    let denominacion = this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value;
    denominacion = denominacion.toUpperCase().trim();
    this.agregarMaterialBloqueo(form);
  }

  async agregarMaterialBloqueo(form: any) {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    let campos: any[] = await this.mapearCamposMaterial(form);
    let centro = (this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value?this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value["codigo_sap"]:"");
    let almacen = (this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value?this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value["codigo_sap"]:"");
    let params = {
      'material': { "campos": campos, 
                  [this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP]: codigoModelo,
                  [this.CODIGO_INTERNO_CENTRO]:centro,
                  [this.CODIGO_INTERNO_ALMACEN]:almacen
                }
    }
    //console.log('material Ampliacion--->' + JSON.stringify(params));
    this.solicitudService.agregarMaterialBloqueo(this.id_solicitud, params).then((data) => {
      console.log('resppuesta al agregar material bloqueo-->' + JSON.stringify(data));
      let mensaje = this.MENSAJE_AGREGAR_MATERIAL;
      if (data["resultado"] == 0) {
        mensaje = data["mensaje"];
        this.openSnackBarError(mensaje, "", "mat-primary")
      } else {
        this._snack.open(mensaje, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
      }
      this.getListadoMateriales();
      this.limpiarMaterial()
    })
  }

  async actualizarBloqueo(form: any) {
    let centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value
    let almacen = this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value
    let denominacion = this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value;
    //let ampliacion = (this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value ? true : false);
    let ampliacion = (this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value ? this.itemForm.get(this.CODIGO_INTERNO_AMPLIACION)?.value : false);
    let centro_codigo_sap = (centro.codigo_sap ? centro.codigo_sap : "")
    let almacen_codigo_sap = (almacen.codigo_sap ? almacen.codigo_sap : "")
    let centroOld = this.itemMaterialOld[this.CODIGO_INTERNO_CENTRO + "_valor"];
    let almacenOld = this.itemMaterialOld[this.CODIGO_INTERNO_ALMACEN + "_valor"];
    denominacion = denominacion.toUpperCase().trim();
    this.actualizarMaterialBloqueo(form)
  }

  async actualizarMaterialBloqueo(form: any) {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    let campos: any[] = this.mapearCamposMaterialActualizar(form, this.itemMaterialOld);
    let centro = (this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value?this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value["codigo_sap"]:"");
    let almacen = (this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value?this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.value["codigo_sap"]:"");
    let params = {
      'material': { "campos": campos, 
                  [this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP]: codigoModelo,
                  [this.CODIGO_INTERNO_CENTRO]:centro,
                  [this.CODIGO_INTERNO_ALMACEN]:almacen
                }
    }
    //console.log('material Ampliacion--->' + JSON.stringify(params));
    this.solicitudService.actualizarMaterialBloqueo(this.id_solicitud, this.itemMaterialOld["id_material_solicitud"], params).then((data) => {
      console.log('resppuesta al agregar material Bloqueo-->' + JSON.stringify(data));
      let mensaje = this.MENSAJE_ACTUALIZAR_MATERIAL;
      if (data["resultado"] == 0) {
        mensaje = data["mensaje"];
        this.openSnackBarError(mensaje, "", "mat-primary")
      } else {
        this._snack.open(mensaje, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
      }
      this.getListadoMateriales();
      this.limpiarMaterial()
    })
  }

  //Fin de bloqueo

  openDialogErrorSap(errorSap: any): void {
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

  obtenerUrlSolicitud() {
    this.solicitudService.obtenerUrlSolicitud(this.id_solicitud).then(data => {
      //  console.log("imm tengo anexo ? : "+ JSON.stringify(data));
      //  console.log("imm id_solicitud anexo ? : "+ JSON.stringify(this.id_solicitud));
      if (data['resultado'] == 1) {
        this.existeAnexoSolicitud = true;
      } else {
        this.existeAnexoSolicitud = false;
      }
    })
  }
  obtenerUrlMaterial(id_material: any) {
    this.solicitudService.obtenerUrlMaterial(id_material).then(data => {
      //  console.log("imm tengo anexo ? : "+ JSON.stringify(data));
      if (data['resultado'] == 1) {
        this.existeAnexoMaterial = true;
      } else {
        this.existeAnexoMaterial = false;
      }
    })
  }
  obtenerEquivalencias(id_material: any) {

    let material: number = id_material;

    //console.log("imm envio el material ? : "+ id_material);
    this.equivalenciaService.getListaEquivalencias(material).then(data => {
      //console.log("imm tengo anexo ? : "+ JSON.stringify(data));
      let lista: Equivalencia[] = data;
      if (lista.length > 0) {
        this.existeEquivalencias = true;
      } else {
        this.existeEquivalencias = false;
      }
    })
  }

  async getVistaPortalReglas() {
    this.solicitudService.getVistaPortalReglas(this.id_escenario_nivel3, this.ROL_SOLICITANTE, this.TIPO_SOLICITUD).then(async (data) => {
      if (data.resultado == 1) {
        this.listadoReglasVista = await data['lista'];
      }
    })
  }


  async deshabilitarControles(item: any) {
    //console.log("Deshabilitar campos del material-->" + JSON.stringify(item));
    this.itemMaterialOld = item;
    this.listadoReglasVista.forEach((vista: any) => {
      if (vista["id_vista_portal"] == GlobalSettings.VISTA_PORTAL_BASICO) {
        vista["campos"].forEach((campo: any) => {
          let error = item[campo["codigo_interno"] + "_error"];//this.isErrorCampo(item, campo["codigo_interno"]);
          if (!error) {//!error
            switch (this.TIPO_SOLICITUD) {
              case this.TIPO_SOLICITUD_CREACION:
                if (item[this.CODIGO_INTERNO_AMPLIACION + '_valor'] == "X") {
                  this.itemForm.get(campo["codigo_interno"])?.disable();
                  this.btnAdd = true;
                  /*                 this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.disable();
                                  this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.disable();
                                  this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.disable(); */
                } else {
                  this.solicitudService.esPadre(this.id_solicitud, this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value).then(res => {
                    if (res.existe && item[this.CODIGO_INTERNO_DENOMINACION + '_error'] == false) {
                      this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.disable();
                      this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.disable();
                      this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.disable();
                      this.btnAdd = true;
                    }
                  })
                }
                break;
              case this.TIPO_SOLICITUD_AMPLIACION:
                this.itemForm.get(campo["codigo_interno"])?.disable();
                this.btnAdd = true;
                //this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.disable();
                this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.enable();
                this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.enable();
                break;
              case this.TIPO_SOLICITUD_MODIFICACION:
                break;
              case this.TIPO_SOLICITUD_BLOQUEO:
                break;
            }
          }
        })
      }
    })
  }

  async listarCamposReglasxEscenario3() {
    this.solicitudService.listarCamposReglasxEscenario3(this.id_escenario_nivel3, this.TIPO_SOLICITUD).then(async (data) => {
      if (data.resultado == 1) {
        let reglasPorescenario3:any[]=data['lista'];
        reglasPorescenario3.forEach(reg=>{
          if (reg["codigo_interno"]==this.CODIGO_INTERNO_ORGANIZACION_VENTAS){
            this.organizacionVentaCodigoSap=reg["valor_defecto"];
          }
          if (reg["codigo_interno"]==this.CODIGO_INTERNO_CANAL_DISTRIBUCION){
            this.canalDistribucionCodigoSap=reg["valor_defecto"];
          }
        })
      }
    })
  }


}
