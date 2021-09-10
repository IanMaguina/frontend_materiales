import { AreaPlanificacionService } from './../../../../servicios/area-planificacion.service';
import { AreaPlanificacion } from './../../../../modelos/area-planificacion.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Almacen } from 'src/app/modelos/almacen.interface';
import { CanalDistribucion } from 'src/app/modelos/canal-distribucion.interface';
import { CategoriaValoracion } from 'src/app/modelos/categoria-valoracion.interface';
import { Centro } from 'src/app/modelos/centro.interface';
import { Clasificacion } from 'src/app/modelos/clasificacion.interface';
import { GrupoCarga } from 'src/app/modelos/grupo-carga.interface';
import { GrupoCompra } from 'src/app/modelos/grupo-compra.interface';
import { GrupoEstadisticaMaterial } from 'src/app/modelos/grupo-estadistica-material.interface';
import { GrupoImputacionMaterial } from 'src/app/modelos/grupo-imputacion-material.interface';
import { GrupoMaterial1 } from 'src/app/modelos/grupo-material1.interface';
import { GrupoMaterial2 } from 'src/app/modelos/grupo-material2.interface';
import { GrupoTipoPosicion } from 'src/app/modelos/grupo-tipo-posicion.interface';
import { GrupoTransporte } from 'src/app/modelos/grupo-transporte.interface';
import { Idioma } from 'src/app/modelos/idioma.interface';
import { JerarquiaProducto } from 'src/app/modelos/jerarquia-producto.interface';
import { OrganizacionVenta } from 'src/app/modelos/organizacion-venta.interface';
import { PartidaArancelaria } from 'src/app/modelos/partida-arancelaria.interface';
import { PerfilControlFabricacion } from 'src/app/modelos/perfil-control-fabricacion.interface';
import { ReglasCampo } from 'src/app/modelos/reglas-campo.interface';
import { ResponsableControlProduccion } from 'src/app/modelos/responsable-control-produccion.interface';
import { Sociedad } from 'src/app/modelos/sociedad.interface';
import { UnidadMedida } from 'src/app/modelos/unidad-medida.interface';
import { AlmacenService } from 'src/app/servicios/almacen.service';
import { CanalDistribucionService } from 'src/app/servicios/canal-distribucion.service';
import { CategoriaValoracionService } from 'src/app/servicios/categoria-valoracion.service';
import { CentroService } from 'src/app/servicios/centro.service';
import { ClasificacionService } from 'src/app/servicios/clasificacion.service';
import { GrupoCargaService } from 'src/app/servicios/grupo-carga.service';
import { GrupoCompraService } from 'src/app/servicios/grupo-compra.service';
import { GrupoEstadisticaMaterialService } from 'src/app/servicios/grupo-estadistica-material.service';
import { GrupoImputacionMaterialService } from 'src/app/servicios/grupo-imputacion-material.service';
import { GrupoMaterial1Service } from 'src/app/servicios/grupo-material1.service';
import { GrupoMaterial2Service } from 'src/app/servicios/grupo-material2.service';
import { GrupoTipoPosicionService } from 'src/app/servicios/grupo-tipo-posicion.service';
import { GrupoTransporteService } from 'src/app/servicios/grupo-transporte.service';
import { IdiomaService } from 'src/app/servicios/idioma.service';
import { JerarquiaProductoService } from 'src/app/servicios/jerarquia-producto.service';
import { OrganizacionVentaService } from 'src/app/servicios/organizacion-venta.service';
import { PartidaArancelariaService } from 'src/app/servicios/partida-arancelaria.service';
import { PerfilControlFabricacionService } from 'src/app/servicios/perfil-control-fabricacion.service';
import { ResponsableControlProduccionService } from 'src/app/servicios/responsable-control-produccion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { UnidadMedidaService } from 'src/app/servicios/unidad-medida.service';
import { DenominacionSolicitudComponent } from 'src/app/shared/denominacion-solicitud/denominacion-solicitud.component';
import { Messages } from 'src/app/shared/messages';
import { GlobalSettings } from 'src/app/shared/settings';
import { FormValidatorService } from '../../../../servicios/form-validator.service'
import { DecimalPipe } from '@angular/common';
import { GrupoArticuloService } from '../../../../servicios/grupo-articulo.service';
import { TipoMaterialService } from 'src/app/servicios/tipo-material.service';
import { GrupoArticulo } from 'src/app/modelos/grupo-articulo.interface';
import { TipoMaterial } from 'src/app/modelos/tipo-material.interface';
import { CentroBeneficioService } from 'src/app/servicios/centro-beneficio.service';
import { CentroBeneficio } from 'src/app/modelos/centro-beneficio.interface';
import { ClaseInspeccionService } from 'src/app/servicios/clase-inspeccion.service';
import { ClaseInspeccion } from 'src/app/modelos/clase-Inspeccion.interface';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-material-ptc',
  templateUrl: './editar-material-ptc.component.html',
  styleUrls: ['./editar-material-ptc.component.css'],
  providers: [DecimalPipe]
})
export class EditarMaterialPtcComponent implements OnInit {
  @Input() data: any;
  @Input() rol: any;

  itemForm!: FormGroup;
  filtroForm!: FormGroup;
  itemMaterialOld: any;
  listadoCamposMaterialSAP: any[] = [];
  listadoCamposMaterialSAPTransformado: any;
  TIPO_SOLICITUD: number = GlobalSettings.TIPO_SOLICITUD_CREACION;
  TIPO_SOLICITUD_CREACION: number = GlobalSettings.TIPO_SOLICITUD_CREACION;
  TIPO_SOLICITUD_AMPLIACION: number = GlobalSettings.TIPO_SOLICITUD_AMPLIACION;
  TIPO_SOLICITUD_MODIFICACION: number = GlobalSettings.TIPO_SOLICITUD_MODIFICACION;
  TIPO_SOLICITUD_BLOQUEO: number = GlobalSettings.TIPO_SOLICITUD_BLOQUEO;
  //escenarios
  ESCENARIO_NIVEL1: string = GlobalSettings.ESCENARIO_NIVEL1_PRODUCTOS_TERMINADOS;

  ESCENARIO_NIVEL1_PT: string = GlobalSettings.ESCENARIO_NIVEL1_PRODUCTOS_TERMINADOS;
  ESCENARIO_NIVEL1_RS: string = GlobalSettings.ESCENARIO_NIVEL1_REPUESTOS_SUMINISTROS;
  ESCENARIO_NIVEL1_MP: string = GlobalSettings.ESCENARIO_NIVEL1_MATERIAS_PRIMAS;
  ESCENARIO_NIVEL1_AO: string = GlobalSettings.ESCENARIO_NIVEL1_ACTIVOS_OTROS;
  CODIGO_INTERNO_MATERIAL_CODIGO_MODELO: string = GlobalSettings.CODIGO_INTERNO_MATERIAL_CODIGO_MODELO;
  CODIGO_INTERNO_MATERIAL_CODIGO_SAP: string = GlobalSettings.CODIGO_INTERNO_MATERIAL_CODIGO_SAP;


  displayedColumns: any[] = [];
  listadoCampoReglas: ReglasCampo[] = [];
  jsonDescargaFormato: any[] = [];
  listadoReglasVista: any[] = [];

  id_solicitud!: number;
  id_material_solicitud!: number;
  id_escenario_nivel3!: number;
  id_rol!: number;
  id_tipo_solicitud!: number;
  sociedad!: Sociedad;
  //agregados 28/05
  selectedPartidaArancelaria: any;
  filteredPartidaArancelaria?: Observable<PartidaArancelaria[]>;
  myControl = new FormControl();
  //fin agregados 28/05
  listadoAlmacenItem: Almacen[] = [];
  listadoAlmacenProduccion: Almacen[] = [];
  listadoCentroItem: any[] = [];
  listadoUnidadMedidaBase: UnidadMedida[] = [];
  listadoUnidadMedidaPeso: UnidadMedida[] = [];
  listadoUnidadMedidaVenta: UnidadMedida[] = [];
  listadoUnidadMedidaPedido: UnidadMedida[] = [];

  listadoOrganizacionVentasItem: OrganizacionVenta[] = [];
  listadoCanalDistribucionItem: CanalDistribucion[] = [];
  listadoClasificacionItem: Clasificacion[] = [];
  listadoClaseInspeccionItem: ClaseInspeccion[] = [];

  //listados agregados - ian
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
  listadoIdioma: Idioma[] = [];
  //fin listados

  //otros
  listadoGrupoTipoPosicion: GrupoTipoPosicion[] = [];
  listadoPartidaArancelaria: PartidaArancelaria[] = [];
  listadoGrupoArticulo: GrupoArticulo[] = [];
  listadoTipoMaterial: TipoMaterial[] = [];
  listadoCentroBeneficio: CentroBeneficio[] = [];
  listadoAreaPlanificacion: AreaPlanificacion[] = [];

  listadoMoneda = GlobalSettings.LISTADO_MONEDA;
  CAMPOS_TAB = GlobalSettings.CAMPOS_TAB;
  listadoUMPVar = GlobalSettings.LISTADO_UMP_VAR;

  TIPO_OBJETO_INPUT_TEXT: string = GlobalSettings.TIPO_OBJETO_INPUT_TEXT;
  TIPO_OBJETO_INPUT_TEXTAREA: string = GlobalSettings.TIPO_OBJETO_INPUT_TEXTAREA;
  TIPO_OBJETO_COMBO: string = GlobalSettings.TIPO_OBJETO_COMBO;
  TIPO_OBJETO_CHECKBOX: string = GlobalSettings.TIPO_OBJETO_CHECKBOX;

  TIPO_DATO_NUM: string = GlobalSettings.TIPO_DATO_NUM;

  ROL_ADMINISTRADOR_MATERIAL: number = GlobalSettings.ROL_ADMINISTRADOR_MATERIAL;

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
  CODIGO_INTERNO_CLASE_INSPECCION_TAB: string = GlobalSettings.CODIGO_INTERNO_CLASE_INSPECCION_TAB;

  CODIGO_INTERNO_GRUPO_COMPRA: string = GlobalSettings.CODIGO_INTERNO_GRUPO_COMPRA;

  CODIGO_INTERNO_CRITICOS: string = GlobalSettings.CODIGO_INTERNO_CRITICOS;
  CODIGO_INTERNO_ESTRATEGICOS: string = GlobalSettings.CODIGO_INTERNO_ESTRATEGICOS;
  CODIGO_INTERNO_AREA_PLANIFICACION_TAB: string = GlobalSettings.CODIGO_INTERNO_AREA_PLANIFICACION_TAB;
  CODIGO_INTERNO_VISTA_PLANIFICACION: string = GlobalSettings.CODIGO_INTERNO_VISTA_PLANIFICACION;
  CODIGO_INTERNO_PRECIO_COTIZACION: string = GlobalSettings.CODIGO_INTERNO_PRECIO_COTIZACION;
  CODIGO_INTERNO_PERIODO_VIDA: string = GlobalSettings.CODIGO_INTERNO_PERIODO_VIDA;
  CODIGO_INTERNO_MOTIVO: string = GlobalSettings.CODIGO_INTERNO_MOTIVO;
  MENSAJE_ACTUALIZAR_MATERIAL: string = GlobalSettings.MENSAJE_ACTUALIZAR_MATERIAL;

  vistaDisabled = false;
  submitted = false;
  organizacionVentaCodigoSap: string = "";
  canalDistribucionCodigoSap: string = "";

  formErrorsItem = {
    //'denominacion': ""
  }

  validationMessages = {
    'selectecLineaNegocio': {
      'required': 'Línea de negocio es requerido.'
    },
    'descripcion_corta': {
      'required': 'Descripción corta de solicitud es requerida.',
    },
    'codigoModelo': {
      'required': 'Código de Modelo es requerido',
    },
  };
  existeDenominacion: any = false;
  constructor(
    private solicitudService: SolicitudService,
    private _snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private unidadMedidaService: UnidadMedidaService,
    private centroService: CentroService,
    private organizacionVentaService: OrganizacionVentaService,
    private canalDistribucionService: CanalDistribucionService,
    private almacenService: AlmacenService,
    private clasificacionService: ClasificacionService,
    //servicios agregados
    private responsableControlProduccionService: ResponsableControlProduccionService,
    private perfilControlFabricacionServiceService: PerfilControlFabricacionService,
    private grupoEstadisticaMaterialService: GrupoEstadisticaMaterialService,
    private categoriaValoracionService: CategoriaValoracionService,
    private grupoImputacionMaterialService: GrupoImputacionMaterialService,
    private jerarquiaProductoService: JerarquiaProductoService,
    private grupoMaterial1Service: GrupoMaterial1Service,
    private grupoMaterial2Service: GrupoMaterial2Service,
    private grupoTransporteService: GrupoTransporteService,
    private grupoCargaService: GrupoCargaService,
    private grupoCompraService: GrupoCompraService,
    private idiomaService: IdiomaService,
    public dialogRef: MatDialogRef<EditarMaterialPtcComponent>,
    private formValidatorService: FormValidatorService,
    private matDialog: MatDialog,
    private grupoTipoPosicionService: GrupoTipoPosicionService,
    private partidaArancelariaService: PartidaArancelariaService,
    private _decimalPipe: DecimalPipe,
    private grupoArticuloService: GrupoArticuloService,
    private tipoMaterialService: TipoMaterialService,
    private centroBeneficioService: CentroBeneficioService,
    private claseInspeccionService: ClaseInspeccionService,
    private areaPlanificacionService: AreaPlanificacionService,
    private rutaActiva: ActivatedRoute
  ) {

    this.initForm()
  }

  async ngOnInit() {
    ///console.log("ARSA MATERIAL-->" + JSON.stringify(this.data));
    this.ESCENARIO_NIVEL1 = this.data["id_escenario_nivel1"];
    this.TIPO_SOLICITUD = this.data["id_tipo_solicitud"];

    this.itemMaterialOld = this.data.material;
    this.id_solicitud = this.data.id_solicitud;
    this.id_material_solicitud = this.data.id_material_solicitud;
    this.id_escenario_nivel3 = this.data.id_escenario_nivel3;
    this.id_rol = this.rol.id_rol;
    this.id_tipo_solicitud = this.data.id_tipo_solicitud;
    this.sociedad = this.data.sociedad;
    await this.listarCamposReglasxEscenario3();
    await this.getVistaPortalReglas();
    await this.getListadoCampoReglas();

    this.getListarUnidadMedida();

    this.getListarCanalDistribucion();
    this.getListarClasificacion();
    this.getListarClaseInspeccion();
    this.getListarCentro();
    this.getListarGrupoEstadisticaMaterial();
    this.getListarResponsableControlProduccion();
    this.getListarPerfilControlFabricacion();
    this.getListarOrganizacionVentas();
    this.getListarCategoriaValoracionPorTipoMaterial(this.itemMaterialOld["tipo_material_valor"]);
    this.getListarGrupoImputacionMaterial();
    this.getListarJerarquiaProducto();
    this.getListarGrupoMaterial1();
    this.getListarGrupoMaterial2();
    this.getListarGrupoTransporte();
    this.getListarGrupoCarga();
    this.getListarGrupoCompra()
    this.getListarIdioma();

    this.getListarGrupoTipoPosicion();

    //this.listadoPartidaArancelaria = await this.partidaArancelariaService.getListarPartidaArancelaria();

    this.getListarGrupoArticulo();
    this.getListarTipoMaterial();
    this.getListarCentroBeneficioPorSociedad(this.sociedad.codigo_sap);

    this.filtrarPartidaArancelaria();
    this.getListarAreaPlanificacion(this.itemMaterialOld["centro_codigo_sap_valor"], this.itemMaterialOld["almacen_codigo_sap_valor"]);


  }

  async filtrarPartidaArancelaria() {


    this.filteredPartidaArancelaria = this.itemForm.get(this.CODIGO_INTERNO_PARTIDA_ARANCELARIA)?.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.codigo_sap),
        map(codigo_sap => codigo_sap ? this._filtrarPartidaArancelaria(codigo_sap) : this.listadoPartidaArancelaria.slice())
      );


  }

  async initForm() {

    this.itemForm = this.formBuilder.group({
      denominacion: "",
      unidad_medida_base: "",
      peso_bruto: "",
      unidad_medida_peso: "",
      centro_codigo_sap: "",
      [this.CODIGO_INTERNO_CENTRO_BENEFICIO]: [""],
      organizacion_ventas: "",
      canal_distribucion: [""],
      almacen_codigo_sap: [""],
      [this.CODIGO_INTERNO_CLASE_TAB]: [""],

      //calidad
      [this.CODIGO_INTERNO_ALMACEN_PRODUCCION]: [""],
      [this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION]: [""],
      [this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION]: [""],
      //costos
      [this.CODIGO_INTERNO_CATEGORIA_VALORACION]: [""],
      //Comercial
      [this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA]: "",
      [this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT]: "",
      [this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL]: "",
      [this.CODIGO_INTERNO_JERARQUIA_PRODUCTO]: "",
      [this.CODIGO_INTERNO_GRUPOS_MATERIAL1]: "",
      [this.CODIGO_INTERNO_GRUPOS_MATERIAL2]: "",
      [this.CODIGO_INTERNO_TEXTO_COMERCIAL]: "",
      //administrador  materiales
      [this.CODIGO_INTERNO_GRUPO_TRANSPORTE]: "",
      [this.CODIGO_INTERNO_GRUPO_CARGA]: "",
      [this.CODIGO_INTERNO_IDIOMA]: "",
      [this.CODIGO_INTERNO_TEXTO_COMPRA]: "",
      [this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO]: "",
      [this.CODIGO_INTERNO_UMP_VAR]: [{ value: ' ' }],
      //control de gestión
      [this.CODIGO_INTERNO_PRECIO_ESTANDAR]: "",
      //otros
      [this.CODIGO_INTERNO_CODIGO_EAN]: "",
      [this.CODIGO_INTERNO_GRUPO_TIPO_POSICION]: "",
      [this.CODIGO_INTERNO_PARTIDA_ARANCELARIA]: new FormControl(),
      [this.CODIGO_INTERNO_PRECIO_VARIABLE]: "",
      [this.CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD]: "",
      [this.CODIGO_INTERNO_FORMULA_CONCRETO]: "",

      [this.CODIGO_INTERNO_GRUPO_ARTICULO]: [""],
      [this.CODIGO_INTERNO_TIPO_MATERIAL]: [""],
      [this.CODIGO_INTERNO_SECTOR]: [""],
      [this.CODIGO_INTERNO_AMPLIACION]: [false],

      [this.CODIGO_INTERNO_LIMITE_EXCESO_SUM_ILIMITADO]: [""],
      [this.CODIGO_INTERNO_PRECIO_BASE]: [""],
      [this.CODIGO_INTERNO_MONEDA]: [""],
      [this.CODIGO_INTERNO_IND_PED_AUTOMA]: [false],
      [this.CODIGO_INTERNO_EXCESO_SUM_ILIMITADO]: [false],
      [this.CODIGO_INTERNO_CRITICOS]: [false],
      [this.CODIGO_INTERNO_ESTRATEGICOS]: [false],
      [this.CODIGO_INTERNO_RAMO]: [""],
      [this.CODIGO_INTERNO_CLASE_INSPECCION_TAB]: [""],
      [this.CODIGO_INTERNO_GRUPO_COMPRA]: [""],
      [this.CODIGO_INTERNO_AREA_PLANIFICACION_TAB]: [""],
      [this.CODIGO_INTERNO_VISTA_PLANIFICACION]: [""],
      [this.CODIGO_INTERNO_PRECIO_COTIZACION]: [""],
      [this.CODIGO_INTERNO_PERIODO_VIDA]: [""],
      [this.CODIGO_INTERNO_MOTIVO]: "",

    })
    this.itemForm.valueChanges.subscribe(() => {
      this.formErrorsItem = this.formValidatorService.handleFormChanges(this.itemForm, this.formErrorsItem, this.validationMessages, this.submitted);
    })

    this.filtroForm = this.formBuilder.group({
      codigoModelo: [""],
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

  getListarClasificacion() {
    this.clasificacionService.getListarClasificacion().then((data) => {
      this.listadoClasificacionItem = data['lista'];
    })
  }

  getListarClaseInspeccion() {
    this.claseInspeccionService.getLlistarClaseInspeccion().then((data) => {
      this.listadoClaseInspeccionItem = data['lista'];
    })
  }

  filtrarListasPorCentro() {
    //console.log("formControlName---->" + val);
    let centro: Centro = this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.value;
    this.getListarAlmacen(centro.codigo_sap);
    //console.log("centroItem---->" + JSON.stringify(this.centroItem));
  }

  async getVistaPortalReglas() {

    this.solicitudService.getVistaPortalReglas(this.id_escenario_nivel3, this.id_rol, this.id_tipo_solicitud).then(async (data) => {
      if (data.resultado == 1) {
        this.listadoReglasVista = await data['lista'];
      }
      await this.initCamposMateriales();
      await this.habilitarControles();
      await this.editarMaterial(this.itemMaterialOld);
    })
  }


  getListarAlmacen(centro_codigo_sap: string) {
    this.almacenService.getListarAlmacen(centro_codigo_sap).then((data) => {
      this.listadoAlmacenItem = data['lista'];
      this.listadoAlmacenProduccion = data['lista'];
    })
  }

  //los get agregados - ian

  getListarResponsableControlProduccion() {
    this.responsableControlProduccionService.getListarResponsableControlProduccionxCentroSap(this.itemMaterialOld[this.CODIGO_INTERNO_CENTRO + "_valor"]).then((data) => {
      //console.log("lista responsable control--->"+JSON.stringify(data['lista']))
      this.listadoResponsableControlProduccion = data['lista'];
    })
  }

  getListarPerfilControlFabricacion() {
    this.perfilControlFabricacionServiceService.getListarPerfilControlFabricacionxCentroSap(this.itemMaterialOld[this.CODIGO_INTERNO_CENTRO + "_valor"]).then((data) => {
      this.listadoPerfilControlFabricacion = data['lista'];
    })
  }

  getListarGrupoEstadisticaMaterial() {
    this.grupoEstadisticaMaterialService.getListarGrupoEstadisticaMaterial().then((data) => {
      this.listadoGrupoEstadisticaMaterial = data['lista'];
    })
  }

  getListarCategoriaValoracionPorTipoMaterial(tipo_material: string) {
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

  getListarIdioma() {
    this.idiomaService.getListarIdioma().then((data) => {
      this.listadoIdioma = data['lista'];
    })
  }

  getListarCentroBeneficioPorSociedad(sociedad_codigo_sap: string) {
    this.centroBeneficioService.getListarCentroBeneficioPorSociedad(sociedad_codigo_sap).then((data) => {
      this.listadoCentroBeneficio = data['lista'];
    })
  }
  getListarAreaPlanificacion(centro_codigo_sap: string, almacen_codigo_sap: string) {
    console.log(centro_codigo_sap + ' are-->' + almacen_codigo_sap);
    this.areaPlanificacionService.getListarAreaPlanificacionPorCentro(centro_codigo_sap, almacen_codigo_sap).then((data) => {
      this.listadoAreaPlanificacion = data['lista'];
      console.log('are-->' + JSON.stringify(this.listadoAreaPlanificacion));
    })
  }

  //fin get agregados

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
    console.log('compare Clase-->' + JSON.stringify(o1) + '------' + JSON.stringify(o2))
    return o1 && o2 ? o1.codigo_sap === o2.codigo_sap : o1 === o2;
  }

  compareAreaPlanificacion(o1: any, o2: any) {
    console.log('compare Clase-->' + JSON.stringify(o1) + '------' + JSON.stringify(o2))
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

  compareUMPVar(o1: any, o2: any) {
    //console.log('arsa-->'+JSON.stringify(o1)+'------'+JSON.stringify(o2))
    return o1.codigo_sap === o2.codigo_sap;
  }

  async editarMaterial(item: any) {
    await this.traerDatosSap(item);
    console.log("editar material-->" + JSON.stringify(item));
    this.filtroForm.get("codigoModelo")?.setValue((item["material_codigo_modelo"] ? item["material_codigo_modelo"] : ""));
    //console.log(" listadoReglasVista editarMaterial-->" + JSON.stringify(this.listadoReglasVista));
    this.itemMaterialOld = item;
    this.listadoReglasVista.forEach((vista: any) => {
      vista["campos"].forEach((campo: any) => {
        this.itemForm.get(campo["codigo_interno"])?.setValue("");
        let error = item[campo["codigo_interno"] + "_error"];//this.isErrorCampo(item, campo["codigo_interno"]);
        if (!error) {//!error
          let valor = (item[campo["codigo_interno"] + '_valor'] == null ? '' : item[campo["codigo_interno"] + '_valor'])

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
            if (campo["codigo_interno"].substr(-4) == '_tab') { //campo["codigo_interno"] == this.CODIGO_INTERNO_CLASE_TAB
              let valores: any[] = [];
              if (valor) {
                let toArray_valor: any[] = valor.split(",");
                let toArray_id: any[];
                if (item[campo["codigo_interno"] + '_id'] == null) {
                  toArray_id = item[campo["codigo_interno"] + '_valor'].split(",");
                } else {
                  toArray_id = item[campo["codigo_interno"] + '_id'].split(",");
                }
                let toArray_clase_descripcion = item[campo["codigo_interno"] + '_descripcion'].split(",");
                for (let x = 0; x < toArray_id.length; x++) {
                  valores.push({ "id_clasificacion": toArray_id[x], "codigo_sap": toArray_valor[x], "nombre": toArray_clase_descripcion[x] })
                  //console.log(JSON.stringify({ "id_clasificacion": toArray_id[x], "codigo_sap": toArray_valor[x], "nombre": toArray_clase_descripcion[x] }))
                }
              }
              console.log("editar tabs " + campo["codigo_interno"].substr(-4) + "--->" + JSON.stringify(valores));
              this.itemForm.get(campo["codigo_interno"])?.setValue(valores);
            } else {
              if (campo["codigo_interno"] == this.CODIGO_INTERNO_CENTRO) {
                this.getListarAlmacen(valor);
              }
              if (valor == '') {
                this.itemForm.get(campo["codigo_interno"])?.setValue('');
              } else {
                this.itemForm.get(campo["codigo_interno"])?.setValue({ codigo_sap: valor });
              }

            }
          }
        }
      })
    })
    if (item[this.CODIGO_INTERNO_AMPLIACION + '_valor'] == "X") {
      this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.disable();
      this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.disable();
      this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.disable();
    } else {
      await this.solicitudService.esPadre(this.id_solicitud, this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value).then(res => {
        if (res.existe && item[this.CODIGO_INTERNO_DENOMINACION + '_error'] == false) {
          this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.disable();
          this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.disable();
          this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.disable();
        }
      })
    }


  }


  actualizarMaterial(form: any) {
    let campos = this.mapearCamposMaterialActualizar(form, this.itemMaterialOld);
    let params = {
      'id_solicitud': this.id_solicitud,
      'id_material_solicitud': this.itemMaterialOld.id_material_solicitud,
      'id_rol': this.id_rol,
      'material': { "campos": campos }
    }
    console.log('material para actualizar--->' + JSON.stringify(campos));

    this.solicitudService.actualizarMaterial(params).then((data) => {
      //console.log('respuesta actualizar material-->' + JSON.stringify(data));
      this._snack.open(this.MENSAJE_ACTUALIZAR_MATERIAL, 'cerrar', {
        duration: 1800,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      this.dialogRef.close();
    })
  }

  mapearCamposMaterialActualizar(form: any, itemMaterialOld: any) {
    console.log('mapearCamposMaterialActualizar--->' + JSON.stringify(form));
    let campos: any[] = [];
    this.listadoReglasVista.forEach((vista: any) => {
      vista["campos"].forEach((campoRegla: any) => {
        if (this.itemForm.get(campoRegla['codigo_interno'])?.enabled) {
          if (campoRegla.tipo_objeto == this.TIPO_OBJETO_INPUT_TEXT) {
            let valor = (form[campoRegla['codigo_interno']] ? form[campoRegla['codigo_interno']] : "")
            valor = (valor == "null" ? "" : valor);
            campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
          }
          if (campoRegla.tipo_objeto == this.TIPO_OBJETO_INPUT_TEXTAREA) {
            let valor = (form[campoRegla['codigo_interno']] ? form[campoRegla['codigo_interno']] : "")
            valor = (valor == "null" ? "" : valor);
            campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
          }

          if (campoRegla.tipo_objeto == this.TIPO_OBJETO_CHECKBOX) {
            let valor = (form[campoRegla['codigo_interno']] ? "X" : "");
            campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
          }
          if (campoRegla['tipo_objeto'] == this.TIPO_OBJETO_COMBO) {
            if (campoRegla["codigo_interno"].substr(-4) == '_tab') {//if (campoRegla['codigo_interno'] == this.CODIGO_INTERNO_CLASE_TAB) {

              let valores: any[] = [];
              let valorTab: any[] = [];

              let valoresCadena = "";
              let c = 0;
              if (form[campoRegla['codigo_interno']].length) {
                //console.log("tmr")
                valorTab = form[campoRegla['codigo_interno']];
              }
              if (valorTab != []) {
                valorTab.forEach((element: { codigo_sap: any; }) => {
                  valores.push({ 'valor': element.codigo_sap })
                });
              }

/*               if (form[campoRegla['codigo_interno']]) {
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
 */              campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valores': valores });
            } else {
              let valor = "";
              if (form[campoRegla['codigo_interno']]) {
                valor = (form[campoRegla['codigo_interno']].codigo_sap ? form[campoRegla['codigo_interno']].codigo_sap : "");
              }
              //valor = (valor == "null" ? "" : valor);
              campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });

            }
          }
        }
      })
    })
    console.log('campos--->' + JSON.stringify(campos));
    return campos;
  }


  cerrarDialog(res: any): void {
    this.dialogRef.close(res);
  }

  async initCamposMateriales() {
    console.log(' initCamposMateriales listado reglas vista-->' + JSON.stringify(this.listadoReglasVista))
    this.listadoReglasVista.forEach((vista: any) => {
      vista["campos"].forEach((campo: any) => {
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
          if (campo["codigo_interno"] != this.CODIGO_INTERNO_CLASE_TAB) {
            if (campo["codigo_interno"] == this.CODIGO_INTERNO_CENTRO) {
              this.getListarAlmacen(campo['valor_defecto']);
            }
            this.itemForm.get(campo["codigo_interno"])?.setValue({ codigo_sap: valor });
          }
          this.itemForm.get(campo["codigo_interno"])?.setValue({ codigo_sap: valor });
          this.itemForm.get(campo["codigo_interno"])?.setValidators([Validators.maxLength(campo.longitud)]);
        }
        if (campo.regla_campo == "M") {
          if (campo["tipo_dato"] == this.TIPO_DATO_NUM) {
            this.itemForm.get(campo["codigo_interno"])?.setValidators([Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,' + campo["longitud_decimal"] + '}')]);
            this.itemForm.get(campo["codigo_interno"])?.updateValueAndValidity();
          } else {
            this.itemForm.get(campo["codigo_interno"])?.setValidators([Validators.required, Validators.maxLength(campo.longitud)]);
            this.itemForm.get(campo["codigo_interno"])?.updateValueAndValidity();
            console.log('entrando-->' + campo["codigo_interno"] + '  invalid-->' + this.itemForm.invalid);

          }
          //this.itemForm.get(campoRegla["codigo_interno"])?.disable();
        }
        this.itemForm.get(campo["codigo_interno"])?.updateValueAndValidity();
      })
    })
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
    if (this.itemForm.invalid) {
      this.submitted = true;
      this.formErrorsItem = this.formValidatorService.handleFormChanges(this.itemForm, this.formErrorsItem, this.validationMessages, this.submitted);
    }
    let denominacion = this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.value;
    denominacion = denominacion.toUpperCase().trim();
    if (this.cambioDenominacionActualizarMaterial(form)) { // SI cambio 
      await this.solicitudService.existeDenominacionSAP(denominacion).then(async res => {
        if (res == true) {
          this.existeDenominacion = res;
          this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_SAP, "", "mat-primary")
          return this.existeDenominacion;
        } else {
          await this.solicitudService.existeDenominacionDb(denominacion).then(res => {
            this.existeDenominacion = res.existe;
            //console.log('existe existeDenominacionDb-->' + JSON.stringify(this.existeDenominacion));
            if (res.existe) { //si existe
              this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_BD, "", "mat-primary")
              //this.limpiarMaterial();
            } else {
              this.actualizarMaterial(form)
            }
          })

        }
      })
    } else {
      this.actualizarMaterial(form)
    }

  }

  async actualizarAmpliacion(form: any) {

    this.actualizarMaterialAmpliacion(form)
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
          this.openSnackBarError(mensaje, "", "mat-primary")
        } else {
          this._snack.open(mensaje, 'cerrar', {
            duration: 1800,
            horizontalPosition: "end",
            verticalPosition: "top"
          });
          this.dialogRef.close();
        }
      })
    }
  }

  async actualizarModificacion(form: any) {

    this.actualizarMaterialModificacion(form)
  }

  async actualizarMaterialModificacion(form: any) {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    if (true) {//!this.existeDenominacion
      let campos: any[] = this.mapearCamposMaterialActualizar(form, this.itemMaterialOld);
      let params = {
        'material': { "campos": campos, [this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP]: codigoModelo }
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
          this.dialogRef.close();
        }
      })
    }
  }

  async actualizarBloqueo(form: any) {

    this.actualizarMaterialBloqueo(form)
  }

  async actualizarMaterialBloqueo(form: any) {
    let codigoModelo = (this.filtroForm.get("codigoModelo")?.value ? this.filtroForm.get("codigoModelo")?.value : "");
    if (true) {//!this.existeDenominacion
      let campos: any[] = this.mapearCamposMaterialActualizar(form, this.itemMaterialOld);
      let params = {
        'material': { "campos": campos, [this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP]: codigoModelo }
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
          this.dialogRef.close();
        }
      })
    }
  }

  cambioDenominacionActualizarMaterial(form: any) {
    //console.log("campos form-->" + JSON.stringify(this.itemMaterialOld))
    if (form.denominacion && form.denominacion != this.itemMaterialOld.denominacion_valor) {
      return true
    }
    return false
  }

  agregarMaterial(form: any) {
    throw new Error('Method not implemented.');
  }

  openSnackBarError(message: string, action: string, tema: string) {
    this._snack.open(message, action, {
      duration: 2000,
      panelClass: ['mat-toolbar', tema], //'mat-primary' to 'mat-accent' or 'mat-warn'
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'      
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

  getListarGrupoTipoPosicion() {
    this.grupoTipoPosicionService.getListarGrupoTipoPosicion().then((data) => {
      this.listadoGrupoTipoPosicion = data['lista'];
    })

  }

  private _filtrarPartidaArancelaria(codigosap: any): PartidaArancelaria[] {
    if (codigosap.length > 2) {
      let code = codigosap;
      this.partidaArancelariaService.getFiltrarPartidaArancelaria(code).then((data) => {
        this.listadoPartidaArancelaria = data;
      });

    } else {
      this.listadoPartidaArancelaria = [];
    }

    return this.listadoPartidaArancelaria;

  }
  displayFn(partida: PartidaArancelaria): string {
    return partida && partida.codigo_sap ? partida.codigo_sap : '';
  }

  /* private _filtrarPartidaArancelaria(codigosap: string): PartidaArancelaria[] {
    const filterValue = codigosap.toLowerCase();
    //return this.listadoPartidaArancelaria = this.partidaArancelariaService.getFiltrarPartidaArancelaria(codigosap);
    return this.listadoPartidaArancelaria.filter(option => option.codigo_sap.toLowerCase().indexOf(filterValue) === 0);
  } */
  //fin agregado 
  transformDecimal(num: number, formato: string) {
    return this._decimalPipe.transform(num, formato)?.toString();
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

  filtroLlenar(form: any) {
    let codigoModelo = (form.codigoModelo ? form.codigoModelo : "");
    let body = {
      "material": {
        "codigo": codigoModelo,
      }
    }
    let material = [{ codigo_interno: "", valor: "" }];
    this.solicitudService.getMaterialCodigoModelo(body).then(mat => {
      console.log(JSON.stringify(codigoModelo) + " material modelo-->" + JSON.stringify(mat));
      material = mat;
      material.forEach(campo => {
        if (campo.codigo_interno == this.CODIGO_INTERNO_GRUPO_ARTICULO) {
          //console.log("campo CODIGO_INTERNO_GRUPO_ARTICULO-->" + JSON.stringify({ codigo_sap: campo.valor }));
          this.itemForm.get(this.CODIGO_INTERNO_GRUPO_ARTICULO)?.setValue({ codigo_sap: campo.valor })
        }
        if (campo.codigo_interno == this.CODIGO_INTERNO_TIPO_MATERIAL) {
          this.itemForm.get(this.CODIGO_INTERNO_TIPO_MATERIAL)?.setValue({ codigo_sap: campo.valor })
          this.getListarCategoriaValoracionPorTipoMaterial(campo.valor);
        }

        if (campo.codigo_interno == this.CODIGO_INTERNO_SECTOR) {
          this.itemForm.get(this.CODIGO_INTERNO_SECTOR)?.setValue(campo.valor)
        }
        if (campo.codigo_interno == this.CODIGO_INTERNO_RAMO) {
          this.itemForm.get(this.CODIGO_INTERNO_RAMO)?.setValue(campo.valor);

        }

      })
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
  async habilitarControles() {
    console.log('entro a habilitarControles-->' + JSON.stringify(this.listadoReglasVista));
    this.listadoReglasVista.forEach((vista: any) => {
      vista["campos"].forEach((campo: any) => {
        if (campo["codigo_interno"] == this.CODIGO_INTERNO_AMPLIACION) {
          this.itemForm.get(campo["codigo_interno"])?.disable()
        }
        switch (this.TIPO_SOLICITUD) {
          case this.TIPO_SOLICITUD_CREACION:
            console.log("creacion");
            break;
          case this.TIPO_SOLICITUD_AMPLIACION:
            console.log("ampliacion");
            break;
          case this.TIPO_SOLICITUD_MODIFICACION:
            console.log("modificacion");
            if (vista["id_vista_portal"] == GlobalSettings.VISTA_PORTAL_BASICO && this.ROL_ADMINISTRADOR_MATERIAL == this.id_rol) {
              if (campo["codigo_interno"] != this.CODIGO_INTERNO_MOTIVO) {
                ///this.itemForm.get(campo["codigo_interno"])?.disable();
              }
            }
            this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.disable();
            this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.disable();
            break;
          case this.TIPO_SOLICITUD_BLOQUEO:
            console.log("bloqueo");
            if (campo["codigo_interno"] != this.CODIGO_INTERNO_MOTIVO) {
              this.itemForm.get(campo["codigo_interno"])?.disable();
            }
            break;
        }


      })

    })
    //this.setValorPorDefecto();
  }

  async traerDatosSap(item: any) {
    if (this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_MODIFICACION) {
      let centro = (item[this.CODIGO_INTERNO_CENTRO + "_valor"] ? item[this.CODIGO_INTERNO_CENTRO + "_valor"] : "");
      let almacen = (item[this.CODIGO_INTERNO_ALMACEN + "_valor"] ? item[this.CODIGO_INTERNO_ALMACEN + "_valor"] : "");
      let material_codigo_sap = (item[this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP] ? item[this.CODIGO_INTERNO_MATERIAL_CODIGO_SAP] : "");
      let organizacionVentas = (this.organizacionVentaCodigoSap ? this.organizacionVentaCodigoSap : "");
      let canalDistribucion = (this.canalDistribucionCodigoSap ? this.canalDistribucionCodigoSap : "");
      //{"id_solicitud":"1000024","id_material_solicitud":2309,"material_codigo_sap":"004-05305","denominacion":"LATEX MATE SUPERIOR TONO AZUL 4L-PRUEBA","denominacion_valor":"LATEX MATE SUPERIOR TONO AZUL 4L-PRUEBA","denominacion_id":null,"denominacion_descripcion":"LATEX MATE SUPERIOR TONO AZUL 4L-PRUEBA","denominacion_error":false,"denominacion_visible":true,"peso_bruto":"50.000","peso_bruto_valor":"50","peso_bruto_id":null,"peso_bruto_descripcion":"50.000","peso_bruto_error":false,"peso_bruto_visible":true,"centro_codigo_sap":"FPSA - Chemifabrik","centro_codigo_sap_valor":"3005","centro_codigo_sap_id":"3005","centro_codigo_sap_descripcion":"FPSA - Chemifabrik","centro_codigo_sap_error":false,"centro_codigo_sap_visible":true,"centro_beneficio_codigo_sap":"Lima Inventarios","centro_beneficio_codigo_sap_valor":"1030000310","centro_beneficio_codigo_sap_id":"1030000310","centro_beneficio_codigo_sap_descripcion":"Lima Inventarios","centro_beneficio_codigo_sap_error":false,"centro_beneficio_codigo_sap_visible":true,"almacen_codigo_sap":"Alm. P-Chemifabr","almacen_codigo_sap_valor":"3005","almacen_codigo_sap_id":"3005","almacen_codigo_sap_descripcion":"Alm. P-Chemifabr","almacen_codigo_sap_error":false,"almacen_codigo_sap_visible":true,"grupo_articulo":"OTROS: SOLUC. EMBOLS","grupo_articulo_valor":"PT-SE9900","grupo_articulo_id":"PT-SE9900","grupo_articulo_descripcion":"OTROS: SOLUC. EMBOLS","grupo_articulo_error":false,"grupo_articulo_visible":true,"unidad_medida_venta":null,"unidad_medida_venta_valor":"","unidad_medida_venta_id":null,"unidad_medida_venta_descripcion":null,"unidad_medida_venta_error":true,"unidad_medida_venta_visible":true,"grupo_tipo_posicion":"Posición normal","grupo_tipo_posicion_valor":"NORM","grupo_tipo_posicion_id":"NORM","grupo_tipo_posicion_descripcion":"Posición normal","grupo_tipo_posicion_error":false,"grupo_tipo_posicion_visible":true,"grupo_imputacion_material":"Vtas Pinturas","grupo_imputacion_material_valor":"5N","grupo_imputacion_material_id":"5N","grupo_imputacion_material_descripcion":"Vtas Pinturas","grupo_imputacion_material_error":false,"grupo_imputacion_material_visible":true,"jerarquia_producto":"Pinturas","jerarquia_producto_valor":"107500100010000010","jerarquia_producto_id":"107500100010000010","jerarquia_producto_descripcion":"Pinturas","jerarquia_producto_error":false,"jerarquia_producto_visible":true,"grupos_material1":"Cemento Pacasmayo","grupos_material1_valor":"CPS","grupos_material1_id":"CPS","grupos_material1_descripcion":"Cemento Pacasmayo","grupos_material1_error":false,"grupos_material1_visible":true,"grupos_material2":"Mater. más usados","grupos_material2_valor":"001","grupos_material2_id":"001","grupos_material2_descripcion":"Mater. más usados","grupos_material2_error":false,"grupos_material2_visible":true,"grupo_carga":"Grúa","grupo_carga_valor":"0001","grupo_carga_id":"0001","grupo_carga_descripcion":"Grúa","grupo_carga_error":false,"grupo_carga_visible":true,"unidad_medida_pedido":null,"unidad_medida_pedido_valor":"","unidad_medida_pedido_id":null,"unidad_medida_pedido_descripcion":null,"unidad_medida_pedido_error":true,"unidad_medida_pedido_visible":true,"vista_planificacion":"X","vista_planificacion_valor":"X","vista_planificacion_id":null,"vista_planificacion_descripcion":"X","vista_planificacion_error":false,"vista_planificacion_visible":true,"acciones":"","mensaje_error_sap":null,"existe_error_sap":null,"material_codigo_modelo":"004-05305","equivalencia_material_contador":0,"anexo_material_contador":0}
      console.log("entrando 3");
      let body = {
        "material": {
          "material_codigo_sap": material_codigo_sap,
          "centro_codigo_sap": (centro ? centro : ""),
          "almacen_codigo_sap": (almacen ? almacen : ""),
          "organizacion_ventas": (organizacionVentas ? organizacionVentas : ""),
          "canal_distribucion": (canalDistribucion ? canalDistribucion : "")
        }
      }
      this.solicitudService.getMaterialSAP(body).then(async mat => {
        if (mat.length > 0) {
          this.listadoCamposMaterialSAP = mat;
          await this.transformarListadoCamposMaterialSAP();
          console.log("material modelo-->" + material_codigo_sap + "......." + JSON.stringify(mat));
        }
      })
    }
  }

  getToolTip(campo: any) {
    if (this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_MODIFICACION) {
      if (this.listadoCamposMaterialSAPTransformado) {
        if (campo.codigo_interno == this.listadoCamposMaterialSAPTransformado["codigo_interno_" + campo.codigo_interno]) {
          return "Valor Inicial: " + this.listadoCamposMaterialSAPTransformado[campo.codigo_interno];
        }
      }
    }
    return "";
  }

  colorCampo(campo: any) {
    if (this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_MODIFICACION) {
      if (this.listadoCamposMaterialSAPTransformado) {
        if (campo.codigo_interno == this.listadoCamposMaterialSAPTransformado["codigo_interno_" + campo.codigo_interno]) {
          if (campo['tipo_objeto'] == this.TIPO_OBJETO_INPUT_TEXT) {
            let valor = this.itemForm.get(campo.codigo_interno)?.value;
            let valorSAP = this.listadoCamposMaterialSAPTransformado[campo.codigo_interno];
            if (campo['tipo_dato'] == this.TIPO_DATO_NUM) {
              valor = parseFloat(valor);
              valorSAP = parseFloat(valorSAP)
            }
            if (valorSAP != valor) {
              return "valorModificado";
            }
          }
          if (campo['tipo_objeto'] == this.TIPO_OBJETO_COMBO) {
            if (campo["codigo_interno"].substr(-4) == '_tab') {//if (campoRegla['codigo_interno'] == this.CODIGO_INTERNO_CLASE_TAB) {
              let valores: any[] = this.itemForm.get(campo.codigo_interno)?.value;
              let valorSAP = this.listadoCamposMaterialSAPTransformado[campo.codigo_interno];
              console.log(JSON.stringify(valores) + " color saooo-->" + JSON.stringify(campo) + " valorSAP" + valorSAP);
              let valoresCadena = "";
              let c = 0;
              if (valores) {
                valores.forEach(item => {
                  console.log("ahi madre-->" + item.codigo_sap);
                  c++;
                  if (c == 1) {
                    valoresCadena = item.codigo_sap;
                  } else {
                    valoresCadena = valoresCadena + "," + item.codigo_sap;
                  }
                });
              }
              if (valores && valorSAP != valoresCadena) {
                return "valorModificado";
              }
            } else {
              let valor = this.itemForm.get(campo.codigo_interno)?.value;
              if (valor && this.listadoCamposMaterialSAPTransformado[campo.codigo_interno] != valor.codigo_sap) {
                return "valorModificado";
              }
              if (!valor && this.listadoCamposMaterialSAPTransformado[campo.codigo_interno] != "") {
                return "valorModificado";
              }
            }
          }

        }
      }
    }
    return "";

  }

  async transformarListadoCamposMaterialSAP() {
    let listadoArray: any[] = [];
    let fila: any = "";
    let numCampos = 0;
    console.log("this.listadoCamposMaterialSAP-->" + JSON.stringify(this.listadoCamposMaterialSAP));
    this.listadoCamposMaterialSAP.forEach(reg => {
      this.listadoCampoReglas.forEach(campo => {
        if (campo["codigo_interno"] == reg["codigo_interno"]) {
          numCampos++;
          if (numCampos == 1) {
            if (campo["codigo_interno"].substr(-4) == '_tab') {
              console.log(numCampos + " antes del material modelo-->" + campo["codigo_interno"] + "---" + JSON.stringify(reg["valores"]))
              let valoresCadena = "";
              let valores: any[] = reg['valores'];
              let c = 0;
              if (valores) {
                valores.forEach(item => {
                  console.log("ahi madre-->" + item.valor);
                  c++;
                  if (c == 1) {
                    valoresCadena = item.valor;
                  } else {
                    valoresCadena = valoresCadena + "," + item.valor;
                  }
                });
              }
              fila = fila + '"' + reg["codigo_interno"] + '": "' + valoresCadena + '"';
              fila = fila + ',"codigo_interno_' + reg["codigo_interno"] + '": "' + reg["codigo_interno"] + '"';
              console.log(fila);
            } else {

              fila = fila + '"' + reg["codigo_interno"] + '": "' + reg["valor"] + '"';
              fila = fila + ',"codigo_interno_' + reg["codigo_interno"] + '": "' + reg["codigo_interno"] + '"';
            }
          } else {
            if (campo["codigo_interno"].substr(-4) == '_tab') {
              console.log(numCampos + " antes del material modelo-->" + campo["codigo_interno"] + "---" + JSON.stringify(reg["valores"]))
              let valoresCadena = "";
              let valores: any[] = reg['valores'];
              let c = 0;
              if (valores) {
                valores.forEach(item => {
                  console.log("ahi madre-->" + item.valor);
                  c++;
                  if (c == 1) {
                    valoresCadena = item.valor;
                  } else {
                    valoresCadena = valoresCadena + "," + item.valor;
                  }
                });
              }
              fila = fila + ',"' + reg["codigo_interno"] + '": "' + valoresCadena + '"';
              fila = fila + ',"codigo_interno_' + reg["codigo_interno"] + '": "' + reg["codigo_interno"] + '"';
              console.log(fila);
            } else {
              fila = fila + ',"' + reg["codigo_interno"] + '": "' + reg["valor"] + '"';
              fila = fila + ',"codigo_interno_' + reg["codigo_interno"] + '": "' + reg["codigo_interno"] + '"';
            }
          }
        }
      })
    })
    fila = JSON.parse("{" + fila + "}");
    this.listadoCamposMaterialSAPTransformado = fila;
    console.log("xx--->" + JSON.stringify(fila));
  }

  async getListadoCampoReglas() {
    if (this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_MODIFICACION) {
      let lista: any[] = [];
      this.solicitudService.getListadoCampoReglas(this.id_escenario_nivel3, this.id_rol, this.id_tipo_solicitud).then((data) => {
        let listadoCampoReglas: ReglasCampo[] = data['lista'];
        if (data.resultado == 1) {
          for (let y = 0; y < listadoCampoReglas.length; y++) {
            if (listadoCampoReglas[y].tipo_objeto != null) {
              lista.push(listadoCampoReglas[y]);
            }
          }
          this.listadoCampoReglas = lista;
        }
      })
    }
  }

  async listarCamposReglasxEscenario3() {
    this.solicitudService.listarCamposReglasxEscenario3(this.id_escenario_nivel3, this.TIPO_SOLICITUD).then(async (data) => {
      console.log("xxxxx--->" + JSON.stringify(data));
      if (data.resultado == 1) {
        let reglasPorescenario3: any[] = data['lista'];
        reglasPorescenario3.forEach(reg => {
          if (reg["codigo_interno"] == this.CODIGO_INTERNO_ORGANIZACION_VENTAS) {
            this.organizacionVentaCodigoSap = reg["valor_defecto"];
          }
          if (reg["codigo_interno"] == this.CODIGO_INTERNO_CANAL_DISTRIBUCION) {
            this.canalDistribucionCodigoSap = reg["valor_defecto"];
          }
        })
      }
    })
  }

  anchoCampo(campo: any) {
    if (this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_MODIFICACION || this.TIPO_SOLICITUD == this.TIPO_SOLICITUD_BLOQUEO) {
      if (campo.codigo_interno == this.CODIGO_INTERNO_MOTIVO) {
        return 2;
      }
    }
    return 1;
  }
}
