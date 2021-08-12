import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { ClaseInspeccion } from 'src/app/modelos/clase-Inspeccion.interface';
import { ClaseInspeccionService } from 'src/app/servicios/clase-inspeccion.service';
import { AreaPlanificacion } from 'src/app/modelos/area-planificacion.interface';
import { AreaPlanificacionService } from 'src/app/servicios/area-planificacion.service';

@Component({
  selector: 'app-ver-material-ptc',
  templateUrl: './ver-material-ptc.component.html',
  styleUrls: ['./ver-material-ptc.component.css'],
  providers: [DecimalPipe]
})
export class VerMaterialPtcComponent implements OnInit {
  @Input() data: any;
  @Input() rol: any;

  itemForm!: FormGroup;
  itemMaterialOld: any;

  displayedColumns: any[] = [];
  listadoCampoReglas: ReglasCampo[] = [];
  jsonDescargaFormato: any[] = [];
  listadoReglasVista: any[] = [];
  listadoUMPVar = GlobalSettings.LISTADO_UMP_VAR;

  id_solicitud!: number;
  id_material_solicitud!: number;
  id_escenario_nivel3!: number;
  id_rol!: number;
  id_tipo_solicitud!: number;
  sociedad!: Sociedad;

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
  TIPO_DATO_NUM: string = GlobalSettings.TIPO_DATO_NUM;
  TIPO_OBJETO_INPUT_TEXT: string = GlobalSettings.TIPO_OBJETO_INPUT_TEXT;
  TIPO_OBJETO_INPUT_TEXTAREA: string = GlobalSettings.TIPO_OBJETO_INPUT_TEXTAREA;
  TIPO_OBJETO_COMBO: string = GlobalSettings.TIPO_OBJETO_COMBO;
  TIPO_OBJETO_CHECKBOX: string = GlobalSettings.TIPO_OBJETO_CHECKBOX;

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

  MENSAJE_ACTUALIZAR_MATERIAL: string = GlobalSettings.MENSAJE_ACTUALIZAR_MATERIAL;

  vistaDisabled = false;

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
    private categoriaValoracionService: CategoriaValoracionService,
    private grupoEstadisticaMaterialService: GrupoEstadisticaMaterialService,
    private grupoImputacionMaterialService: GrupoImputacionMaterialService,
    private jerarquiaProductoService: JerarquiaProductoService,
    private grupoMaterial1Service: GrupoMaterial1Service,
    private grupoMaterial2Service: GrupoMaterial2Service,
    private grupoTransporteService: GrupoTransporteService,
    private grupoCargaService: GrupoCargaService,
    private grupoCompraService: GrupoCompraService,
    private idiomaService: IdiomaService,
    public dialogRef: MatDialogRef<VerMaterialPtcComponent>,
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
  ) {
    this.initForm()
  }

  async ngOnInit() {
    console.log("MATERIAL-->" + JSON.stringify(this.data.material));
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
    await this.getVistaPortalReglas();

    this.getListarUnidadMedida();
    this.getListarCanalDistribucion();
    this.getListarClasificacion();
    this.getListarClaseInspeccion();
    this.getListarCentro();
    this.getListarOrganizacionVentas();
    //agregando los listados - ian
    this.getListarResponsableControlProduccion();
    this.getListarPerfilControlFabricacion();
    this.getListarCategoriaValoracionPorTipoMaterial(this.itemMaterialOld["tipo_material_valor"]);
    this.getListarGrupoEstadisticaMaterial();
    this.getListarGrupoImputacionMaterial();
    this.getListarJerarquiaProducto();
    this.getListarGrupoMaterial1();
    this.getListarGrupoMaterial2();
    this.getListarGrupoTransporte();
    this.getListarGrupoCarga();
    this.getListarGrupoCompra();
    this.getListarIdioma();

    this.getListarGrupoTipoPosicion();
    this.getListarPartidaArancelaria();

    this.getListarGrupoArticulo();
    this.getListarTipoMaterial();
    this.getListarCentroBeneficioPorSociedad(this.sociedad.codigo_sap);
    this.getListarAreaPlanificacion(this.data.material["centro_codigo_sap_valor"], this.data.material["almacen_codigo_sap_valor"]);

  }

  async initForm() {

    this.itemForm = this.formBuilder.group({
      denominacion: "",
      unidad_medida_base: "",
      peso_bruto: "",
      unidad_medida_peso: "",
      centro_codigo_sap: "",
      centro_beneficio: "",
      organizacion_ventas: "",
      [this.CODIGO_INTERNO_CENTRO_BENEFICIO]: [""],
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
      [this.CODIGO_INTERNO_UMP_VAR]: "",
      //control de gestión
      [this.CODIGO_INTERNO_PRECIO_ESTANDAR]: "",
      //otros
      [this.CODIGO_INTERNO_CODIGO_EAN]: "",
      [this.CODIGO_INTERNO_GRUPO_TIPO_POSICION]: "",
      [this.CODIGO_INTERNO_PARTIDA_ARANCELARIA]: "",
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
      [this.CODIGO_INTERNO_RAMO]: [""],
      [this.CODIGO_INTERNO_CLASE_INSPECCION_TAB]: [""],
      [this.CODIGO_INTERNO_GRUPO_COMPRA]: [""],
      [this.CODIGO_INTERNO_CRITICOS]: [false],
      [this.CODIGO_INTERNO_ESTRATEGICOS]: [false],
      [this.CODIGO_INTERNO_AREA_PLANIFICACION_TAB]: [""],
      [this.CODIGO_INTERNO_VISTA_PLANIFICACION]: [""],
      [this.CODIGO_INTERNO_PRECIO_COTIZACION]: [""],
      [this.CODIGO_INTERNO_PERIODO_VIDA]: [""]

    })
    this.itemForm.valueChanges.subscribe(() => {
      this.formErrorsItem = this.formValidatorService.handleFormChanges(this.itemForm, this.formErrorsItem, this.validationMessages, true);
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
      //await this.habilitarControles();
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


  getListarGrupoEstadisticaMaterial() {
    this.grupoEstadisticaMaterialService.getListarGrupoEstadisticaMaterial().then((data) => {
      this.listadoGrupoEstadisticaMaterial = data['lista'];
    })
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
    // console.log(centro_codigo_sap+' are-->'+almacen_codigo_sap);
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
    console.log('compare clase ver-->' + JSON.stringify(o1) + '------' + JSON.stringify(o2))
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
    return o1 && o2 ? o1.codigo_sap === o2.codigo_sap : o1 === o2;
  }

  async editarMaterial(item: any) {
    console.log("editar material-->" + JSON.stringify(item));
    //console.log(" listadoReglasVista editarMaterial-->" + JSON.stringify(this.listadoReglasVista));
    this.itemMaterialOld = item;
    this.listadoReglasVista.forEach((vista: any) => {
      vista["campos"].forEach((campo: any) => {
        //this.itemForm.get(campo["codigo_interno"])?.setValue("");
        let error = item[campo["codigo_interno"] + "_error"];//this.isErrorCampo(item, campo["codigo_interno"]);
        if (true) {//!error
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
              console.log("editar " + campo["codigo_interno"].substr(-4) + "--->" + JSON.stringify(valores));
              this.itemForm.get(campo["codigo_interno"])?.setValue(valores);
            } else {
              if (campo["codigo_interno"] == this.CODIGO_INTERNO_CENTRO) {
                this.getListarAlmacen(valor);
              }
              this.itemForm.get(campo["codigo_interno"])?.setValue({ codigo_sap: valor });
            }
          }
        }
      })
    })
  }

  async editarMaterialOLD(item: any) {
    //console.log('Editar material---->' + JSON.stringify(item));
    if (item.denominacion) {
      this.itemForm.get(this.CODIGO_INTERNO_DENOMINACION)?.setValue(item.denominacion);
    }
    if (item.unidad_medida_base) {
      this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_BASE)?.setValue({ codigo_sap: item.unidad_medida_base_valor });
    }
    if (item.peso_bruto) {
      this.itemForm.get(this.CODIGO_INTERNO_PESO_BRUTO)?.setValue(item.peso_bruto);
    }
    if (item.unidad_medida_peso) {
      this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_PESO)?.setValue({ codigo_sap: item.unidad_medida_peso_valor });
    }
    if (item[this.CODIGO_INTERNO_CENTRO]) {
      this.getListarAlmacen(item[this.CODIGO_INTERNO_CENTRO + '_valor']);
      this.itemForm.get(this.CODIGO_INTERNO_CENTRO)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_CENTRO + '_valor'] });
    }
    if (item.centro_beneficio) {
      this.itemForm.get(this.CODIGO_INTERNO_CENTRO_BENEFICIO)?.setValue({ codigo_sap: item.centro_beneficio_valor });
    }
    if (item.organizacion_ventas) {
      this.itemForm.get(this.CODIGO_INTERNO_ORGANIZACION_VENTAS)?.setValue({ codigo_sap: item.organizacion_ventas_valor });
    }
    if (item.canal_distribucion) {
      this.itemForm.get(this.CODIGO_INTERNO_CANAL_DISTRIBUCION)?.setValue({ codigo_sap: item.canal_distribucion_valor });
    }
    if (item[this.CODIGO_INTERNO_ALMACEN]) {
      this.itemForm.get(this.CODIGO_INTERNO_ALMACEN)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_ALMACEN + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_CLASE_TAB]) {
      let toArray_valor: any[] = item[this.CODIGO_INTERNO_CLASE_TAB + '_valor'].split(",");
      let toArray_id: any[] = item[this.CODIGO_INTERNO_CLASE_TAB + '_id'].split(",");
      let toArray_clase_descripcion = item[this.CODIGO_INTERNO_CLASE_TAB + '_descripcion'].split(",");
      let valores: any[] = [];
      for (let x = 0; x < toArray_id.length; x++) {
        valores.push({ "id_clasificacion": toArray_id[x], "codigo_sap": toArray_valor[x], "nombre": toArray_clase_descripcion[x] })
      }
      this.itemForm.get('clase')?.setValue(valores);
    }
    //Calidad
    this.itemForm.get(this.CODIGO_INTERNO_ALMACEN_PRODUCCION)?.setValue((item[this.CODIGO_INTERNO_ALMACEN_PRODUCCION + '_valor'] ? item[this.CODIGO_INTERNO_ALMACEN_PRODUCCION + '_valor'] : ""));

    if (item[this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION]) {
      this.itemForm.get(this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION]) {
      this.itemForm.get(this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION + '_valor'] });
    }
    //Costos
    if (item[this.CODIGO_INTERNO_CATEGORIA_VALORACION]) {
      this.itemForm.get(this.CODIGO_INTERNO_CATEGORIA_VALORACION)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_CATEGORIA_VALORACION + '_valor'] });
    }
    //Comercial
    if (item[this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA]) {
      this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT]) {
      this.itemForm.get(this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL]) {
      this.itemForm.get(this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_JERARQUIA_PRODUCTO]) {
      this.itemForm.get(this.CODIGO_INTERNO_JERARQUIA_PRODUCTO)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_JERARQUIA_PRODUCTO + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_GRUPOS_MATERIAL1]) {
      this.itemForm.get(this.CODIGO_INTERNO_GRUPOS_MATERIAL1)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_GRUPOS_MATERIAL1 + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_GRUPOS_MATERIAL2]) {
      this.itemForm.get(this.CODIGO_INTERNO_GRUPOS_MATERIAL2)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_GRUPOS_MATERIAL2 + '_valor'] });
    }
    let texto_comercial = (item[this.CODIGO_INTERNO_TEXTO_COMERCIAL + '_valor'] == "null" ||
      item[this.CODIGO_INTERNO_TEXTO_COMERCIAL + '_valor'] == null
      ? "" : item[this.CODIGO_INTERNO_TEXTO_COMERCIAL + '_valor'])
    this.itemForm.get(this.CODIGO_INTERNO_TEXTO_COMERCIAL)?.setValue(texto_comercial);

    //administrador  materiales
    if (item[this.CODIGO_INTERNO_GRUPO_TRANSPORTE]) {
      this.itemForm.get(this.CODIGO_INTERNO_GRUPO_TRANSPORTE)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_GRUPO_TRANSPORTE + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_GRUPO_CARGA]) {
      this.itemForm.get(this.CODIGO_INTERNO_GRUPO_CARGA)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_GRUPO_CARGA + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_IDIOMA]) {
      this.itemForm.get(this.CODIGO_INTERNO_IDIOMA)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_IDIOMA + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO]) {
      this.itemForm.get(this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO)?.setValue({ codigo_sap: item[this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO + '_valor'] });
    }
    if (item[this.CODIGO_INTERNO_UMP_VAR]) {
      this.itemForm.get(this.CODIGO_INTERNO_UMP_VAR)?.setValue(item[this.CODIGO_INTERNO_UMP_VAR + '_valor']);
    }
    let texto_compra = (item[this.CODIGO_INTERNO_TEXTO_COMPRA + '_valor'] == "null" ||
      item[this.CODIGO_INTERNO_TEXTO_COMPRA + '_valor'] == null
      ? "" : item[this.CODIGO_INTERNO_TEXTO_COMPRA + '_valor'])
    this.itemForm.get(this.CODIGO_INTERNO_TEXTO_COMPRA)?.setValue(texto_compra);


    //Control de gestiòn
    if (item[this.CODIGO_INTERNO_PRECIO_ESTANDAR]) {
      this.itemForm.get(this.CODIGO_INTERNO_PRECIO_ESTANDAR)?.setValue(item[this.CODIGO_INTERNO_PRECIO_ESTANDAR + '_valor']);
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
    //console.log('material--->' + JSON.stringify(campos));

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
              let valor = (form[campoRegla['codigo_interno']].codigo_sap ? form[campoRegla['codigo_interno']].codigo_sap : "")
              valor = (valor == "null" ? "" : valor);
              campos.push({ 'codigo_interno': campoRegla['codigo_interno'], 'valor': valor });
            }
          }
        }
      })
    })
    return campos;
  }

  mapearCamposMaterialActualizarOLD(form: any, itemMaterialOld: any) {
    let campos: any[] = [];
    this.listadoReglasVista.forEach((vista: any) => {
      vista["campos"].forEach((campoRegla: any) => {
        if (form.denominacion && form.denominacion != itemMaterialOld.denominacion_valor
          && this.CODIGO_INTERNO_DENOMINACION == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_DENOMINACION, 'valor': form.denominacion });

        if (form.unidad_medida_base && form.unidad_medida_base.codigo_sap != itemMaterialOld.unidad_medida_base_valor
          && this.CODIGO_INTERNO_UNIDAD_MEDIDA_BASE == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_UNIDAD_MEDIDA_BASE, 'valor': form.unidad_medida_base.codigo_sap });

        if (form.peso_bruto && form.peso_bruto != itemMaterialOld.peso_bruto
          && this.CODIGO_INTERNO_PESO_BRUTO == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_PESO_BRUTO, 'valor': form.peso_bruto });

        if (form.unidad_medida_peso && form.unidad_medida_peso.codigo_sap != itemMaterialOld.unidad_medida_peso_valor
          && this.CODIGO_INTERNO_UNIDAD_MEDIDA_PESO == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_UNIDAD_MEDIDA_PESO, 'valor': form.unidad_medida_peso.codigo_sap });

        if (form[this.CODIGO_INTERNO_CENTRO] && form[this.CODIGO_INTERNO_CENTRO].codigo_sap != itemMaterialOld[this.CODIGO_INTERNO_CENTRO + '_valor']
          && this.CODIGO_INTERNO_CENTRO == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CENTRO, 'valor': form[this.CODIGO_INTERNO_CENTRO].codigo_sap });

        if (form.centro && form.centro.codigo_centro_beneficio != itemMaterialOld.codigo_centro_beneficio_valor
          && this.CODIGO_INTERNO_CENTRO_BENEFICIO == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CENTRO_BENEFICIO, 'valor': form.centro.codigo_centro_beneficio });

        if (form.organizacion_ventas && form.organizacion_ventas.codigo_sap != itemMaterialOld.organizacion_ventas_valor
          && this.CODIGO_INTERNO_ORGANIZACION_VENTAS == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_ORGANIZACION_VENTAS, 'valor': form.organizacion_ventas.codigo_sap });

        if (form.canal_distribucion && form.canal_distribucion.codigo_sap != itemMaterialOld.canal_distribucion_valor
          && this.CODIGO_INTERNO_CANAL_DISTRIBUCION == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CANAL_DISTRIBUCION, 'valor': form.canal_distribucion.codigo_sap });

        if (form[this.CODIGO_INTERNO_ALMACEN] && form[this.CODIGO_INTERNO_ALMACEN].codigo_sap != itemMaterialOld[this.CODIGO_INTERNO_ALMACEN + '_valor']
          && this.CODIGO_INTERNO_ALMACEN == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_ALMACEN, 'valor': form[this.CODIGO_INTERNO_ALMACEN].codigo_sap });

        if (form[this.CODIGO_INTERNO_CLASE_TAB]
          && this.CODIGO_INTERNO_CLASE_TAB == campoRegla['codigo_interno']) {
          let valoresCadena = "";
          let valores: any[] = [];
          let c = 0;
          form.clase.forEach((element: { codigo_sap: any; }) => {
            c++;
            if (c == 1) {
              valoresCadena = element.codigo_sap;
            } else {
              valoresCadena = valoresCadena + "," + element.codigo_sap;
            }

            valores.push({ 'valor': element.codigo_sap })
          });
          //console.log(valoresCadena + '-------' + itemMaterialOld[this.CODIGO_INTERNO_CLASE_TAB + '_valor'])
          if (valoresCadena != itemMaterialOld[this.CODIGO_INTERNO_CLASE_TAB + '_valor']) {
            campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CLASE_TAB, 'valores': valores });
          }

        }

        // Calidad
        if (form[this.CODIGO_INTERNO_ALMACEN_PRODUCCION] && form[this.CODIGO_INTERNO_ALMACEN_PRODUCCION] != itemMaterialOld[this.CODIGO_INTERNO_ALMACEN_PRODUCCION + '_valor']
          && this.CODIGO_INTERNO_ALMACEN_PRODUCCION == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_ALMACEN_PRODUCCION, 'valor': form[this.CODIGO_INTERNO_ALMACEN_PRODUCCION] });

        if (form[this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION] && form[this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION] != itemMaterialOld[this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION + '_valor']
          && this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION, 'valor': form[this.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION].codigo_sap });

        if (form[this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION] && form[this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION] != itemMaterialOld[this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION + '_valor']
          && this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION, 'valor': form[this.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION].codigo_sap });

        //Costos
        if (form[this.CODIGO_INTERNO_CATEGORIA_VALORACION] && form[this.CODIGO_INTERNO_CATEGORIA_VALORACION] != itemMaterialOld[this.CODIGO_INTERNO_CATEGORIA_VALORACION + '_valor']
          && this.CODIGO_INTERNO_CATEGORIA_VALORACION == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CATEGORIA_VALORACION, 'valor': form[this.CODIGO_INTERNO_CATEGORIA_VALORACION].codigo_sap });

        //comercial

        if (form[this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA] && form[this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA].codigo_sap != itemMaterialOld[this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA + '_valor']
          && this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA, 'valor': form[this.CODIGO_INTERNO_UNIDAD_MEDIDA_VENTA].codigo_sap });

        if (form[this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT] && form[this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT] != itemMaterialOld[this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT + '_valor']
          && this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT, 'valor': form[this.CODIGO_INTERNO_GRUPO_ESTADISTICA_MAT].codigo_sap });

        if (form[this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL] && form[this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL] != itemMaterialOld[this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL + '_valor']
          && this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL, 'valor': form[this.CODIGO_INTERNO_GRUPO_IMPUTACION_MATERIAL].codigo_sap });

        if (form[this.CODIGO_INTERNO_JERARQUIA_PRODUCTO] && form[this.CODIGO_INTERNO_JERARQUIA_PRODUCTO] != itemMaterialOld[this.CODIGO_INTERNO_JERARQUIA_PRODUCTO + '_valor']
          && this.CODIGO_INTERNO_JERARQUIA_PRODUCTO == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_JERARQUIA_PRODUCTO, 'valor': form[this.CODIGO_INTERNO_JERARQUIA_PRODUCTO].codigo_sap });

        if (form[this.CODIGO_INTERNO_GRUPOS_MATERIAL1] && form[this.CODIGO_INTERNO_GRUPOS_MATERIAL1] != itemMaterialOld[this.CODIGO_INTERNO_GRUPOS_MATERIAL1 + '_valor']
          && this.CODIGO_INTERNO_GRUPOS_MATERIAL1 == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_GRUPOS_MATERIAL1, 'valor': form[this.CODIGO_INTERNO_GRUPOS_MATERIAL1].codigo_sap });

        if (form[this.CODIGO_INTERNO_GRUPOS_MATERIAL2] && form[this.CODIGO_INTERNO_GRUPOS_MATERIAL2] != itemMaterialOld[this.CODIGO_INTERNO_GRUPOS_MATERIAL2 + '_valor']
          && this.CODIGO_INTERNO_GRUPOS_MATERIAL2 == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_GRUPOS_MATERIAL2, 'valor': form[this.CODIGO_INTERNO_GRUPOS_MATERIAL2].codigo_sap });

        if (form[this.CODIGO_INTERNO_TEXTO_COMERCIAL] && form[this.CODIGO_INTERNO_TEXTO_COMERCIAL] != itemMaterialOld[this.CODIGO_INTERNO_TEXTO_COMERCIAL + '_valor']
          && this.CODIGO_INTERNO_TEXTO_COMERCIAL == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_TEXTO_COMERCIAL, 'valor': form[this.CODIGO_INTERNO_TEXTO_COMERCIAL] });

        //administrador  materiales

        if (form[this.CODIGO_INTERNO_GRUPO_TRANSPORTE] && form[this.CODIGO_INTERNO_GRUPO_TRANSPORTE] != itemMaterialOld[this.CODIGO_INTERNO_GRUPO_TRANSPORTE + '_valor']
          && this.CODIGO_INTERNO_GRUPO_TRANSPORTE == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_GRUPO_TRANSPORTE, 'valor': form[this.CODIGO_INTERNO_GRUPO_TRANSPORTE].codigo_sap });


        if (form[this.CODIGO_INTERNO_GRUPO_CARGA] && form[this.CODIGO_INTERNO_GRUPO_CARGA] != itemMaterialOld[this.CODIGO_INTERNO_GRUPO_CARGA + '_valor']
          && this.CODIGO_INTERNO_GRUPO_CARGA == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_GRUPO_CARGA, 'valor': form[this.CODIGO_INTERNO_GRUPO_CARGA].codigo_sap });


        if (form[this.CODIGO_INTERNO_IDIOMA] && form[this.CODIGO_INTERNO_IDIOMA] != itemMaterialOld[this.CODIGO_INTERNO_IDIOMA + '_valor']
          && this.CODIGO_INTERNO_IDIOMA == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_IDIOMA, 'valor': form[this.CODIGO_INTERNO_IDIOMA].codigo_sap });

        if (form[this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO] && form[this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO] != itemMaterialOld[this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO + '_valor']
          && this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO, 'valor': form[this.CODIGO_INTERNO_UNIDAD_MEDIDA_PEDIDO].codigo_sap });

        if (form[this.CODIGO_INTERNO_UMP_VAR] && form[this.CODIGO_INTERNO_UMP_VAR] != itemMaterialOld[this.CODIGO_INTERNO_UMP_VAR + '_valor']
          && this.CODIGO_INTERNO_UMP_VAR == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_UMP_VAR, 'valor': form[this.CODIGO_INTERNO_UMP_VAR] });

        if (form[this.CODIGO_INTERNO_TEXTO_COMPRA] && form[this.CODIGO_INTERNO_TEXTO_COMPRA] != itemMaterialOld[this.CODIGO_INTERNO_TEXTO_COMPRA + '_valor']
          && this.CODIGO_INTERNO_TEXTO_COMPRA == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_TEXTO_COMPRA, 'valor': form[this.CODIGO_INTERNO_TEXTO_COMPRA] });

        //Control de gestión
        if (form[this.CODIGO_INTERNO_PRECIO_ESTANDAR] && form[this.CODIGO_INTERNO_PRECIO_ESTANDAR] != itemMaterialOld[this.CODIGO_INTERNO_PRECIO_ESTANDAR + '_valor']
          && this.CODIGO_INTERNO_PRECIO_ESTANDAR == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_PRECIO_ESTANDAR, 'valor': form[this.CODIGO_INTERNO_PRECIO_ESTANDAR] });

        //otros
        if (form[this.CODIGO_INTERNO_CODIGO_EAN] && form[this.CODIGO_INTERNO_CODIGO_EAN] != itemMaterialOld[this.CODIGO_INTERNO_CODIGO_EAN + '_valor']
          && this.CODIGO_INTERNO_CODIGO_EAN == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_CODIGO_EAN, 'valor': form[this.CODIGO_INTERNO_CODIGO_EAN] });

        if (form[this.CODIGO_INTERNO_PRECIO_VARIABLE] && form[this.CODIGO_INTERNO_PRECIO_VARIABLE] != itemMaterialOld[this.CODIGO_INTERNO_PRECIO_VARIABLE + '_valor']
          && this.CODIGO_INTERNO_PRECIO_VARIABLE == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_PRECIO_VARIABLE, 'valor': form[this.CODIGO_INTERNO_PRECIO_VARIABLE] });

        if (form[this.CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD] && form[this.CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD] != itemMaterialOld[this.CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD + '_valor']
          && this.CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD, 'valor': form[this.CODIGO_INTERNO_VERIFICACION_DISPONIBILIDAD] });

        if (form[this.CODIGO_INTERNO_GRUPO_TIPO_POSICION] && form[this.CODIGO_INTERNO_GRUPO_TIPO_POSICION] != itemMaterialOld[this.CODIGO_INTERNO_GRUPO_TIPO_POSICION + '_valor']
          && this.CODIGO_INTERNO_GRUPO_TIPO_POSICION == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_GRUPO_TIPO_POSICION, 'valor': form[this.CODIGO_INTERNO_GRUPO_TIPO_POSICION].codigo_sap });

        if (form[this.CODIGO_INTERNO_PARTIDA_ARANCELARIA] && form[this.CODIGO_INTERNO_PARTIDA_ARANCELARIA] != itemMaterialOld[this.CODIGO_INTERNO_PARTIDA_ARANCELARIA + '_valor']
          && this.CODIGO_INTERNO_PARTIDA_ARANCELARIA == campoRegla['codigo_interno'])
          campos.push({ 'codigo_interno': this.CODIGO_INTERNO_PARTIDA_ARANCELARIA, 'valor': form[this.CODIGO_INTERNO_PARTIDA_ARANCELARIA].codigo_sap });

      })
    })
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
          }
          this.itemForm.get(campo["codigo_interno"])?.setValue({ codigo_sap: valor });
          this.itemForm.get(campo["codigo_interno"])?.setValidators([Validators.maxLength(campo.longitud)]);
        }
        if (campo.regla_campo == "M") {
          if (campo["tipo_dato"] == this.TIPO_DATO_NUM) {
            this.itemForm.get(campo["codigo_interno"])?.setValidators([Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,' + campo["longitud_decimal"] + '}')]);
          } else {
            this.itemForm.get(campo["codigo_interno"])?.setValidators([Validators.required, Validators.maxLength(campo.longitud)]);
          }
          //this.itemForm.get(campoRegla["codigo_interno"])?.disable();
        }
        this.itemForm.get(campo["codigo_interno"])?.disable();
        this.itemForm.get(campo["codigo_interno"])?.updateValueAndValidity();
      })
    })
  }




  async existeDenominacionSapYBdUpdate(form: any) {
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
            console.log('existe existeDenominacionDb-->' + JSON.stringify(this.existeDenominacion));
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

  cambioDenominacionActualizarMaterial(form: any) {
    console.log("campos form-->" + JSON.stringify(this.itemMaterialOld))
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
  getListarPartidaArancelaria() {
    this.partidaArancelariaService.getListarPartidaArancelaria().then((data) => {
      this.listadoPartidaArancelaria = data['lista'];
    })
  }

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
    console.log('entro a habilitarControles')
    this.listadoReglasVista.forEach((vista: any) => {
      vista["campos"].forEach((campo: any) => {
        if (campo["codigo_interno"] == this.CODIGO_INTERNO_AMPLIACION) {
          this.itemForm.get(campo["codigo_interno"])?.disable()
        }
      })

    })
    //this.setValorPorDefecto();
  }

}
