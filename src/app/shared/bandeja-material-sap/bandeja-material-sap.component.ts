import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

import { GlobalSettings } from 'src/app/shared/settings'
import { Almacen } from 'src/app/modelos/almacen.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Messages } from 'src/app/shared/messages';
import { AdvertenciaDialogComponent } from 'src/app/shared/advertencia-dialog/advertencia-dialog.component';
import { FormValidatorService } from 'src/app/servicios/form-validator.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { ReglasCampo } from 'src/app/modelos/reglas-campo.interface';
import { DenominacionSolicitudComponent } from '../denominacion-solicitud/denominacion-solicitud.component';



@Component({
  selector: 'app-bandeja-material-sap',
  templateUrl: './bandeja-material-sap.component.html',
  styleUrls: ['./bandeja-material-sap.component.css']
})
export class BandejaMaterialSapComponent implements OnInit {

  listadoMateriales:any[] = [];
  filtroForm!:FormGroup;
  itemForm!: FormGroup;
  listadoCampoReglas: ReglasCampo[] = [];
  camposMaterialModelo: any[] = [];

 

    //Validation
    formErrors = {
      'codigoModelo': '',
      'denominacion': '',
    }
    formErrorsItem = {
      //[this.CODIGO_INTERNO_DENOMINACION]:"ERROR EN DENOMINACION"
    }
  
    formErrorsFiltro = {
      //[this.CODIGO_INTERNO_DENOMINACION]:"ERROR EN DENOMINACION"
    }
  
    validationMessages = {
      'codigoModelo': {
        'required': 'codigoModelo es requerido.',
      },
      'denominacion': {
        'required': 'denominacion es requerida.',
      },
  
    };
    submitted = false;

  TIPO_OBJETO_INPUT_TEXT: string = GlobalSettings.TIPO_OBJETO_INPUT_TEXT;
  TIPO_OBJETO_INPUT_TEXTAREA: string = GlobalSettings.TIPO_OBJETO_INPUT_TEXTAREA;
  TIPO_OBJETO_COMBO: string = GlobalSettings.TIPO_OBJETO_COMBO;
  TIPO_OBJETO_CHECKBOX: string = GlobalSettings.TIPO_OBJETO_CHECKBOX;
  TIPO_DATO_CHAR: string = GlobalSettings.TIPO_DATO_CHAR;
  TIPO_DATO_NUM: string = GlobalSettings.TIPO_DATO_NUM;

  CODIGO_INTERNO_UNIDAD_MEDIDA_BASE: string = GlobalSettings.CODIGO_INTERNO_UNIDAD_MEDIDA_BASE;
  CODIGO_INTERNO_ALMACEN: string = GlobalSettings.CODIGO_INTERNO_ALMACEN;
  CODIGO_INTERNO_CANAL_DISTRIBUCION: string = GlobalSettings.CODIGO_INTERNO_CANAL_DISTRIBUCION;
  CODIGO_INTERNO_ORGANIZACION_VENTAS: string = GlobalSettings.CODIGO_INTERNO_ORGANIZACION_VENTAS;
  CODIGO_INTERNO_UNIDAD_MEDIDA_PESO: string = GlobalSettings.CODIGO_INTERNO_UNIDAD_MEDIDAD_PESO;


  CODIGO_INTERNO_RAMO: string = GlobalSettings.CODIGO_INTERNO_RAMO;
  CODIGO_INTERNO_PESO_BRUTO: string = GlobalSettings.CODIGO_INTERNO_PESO_BRUTO;
  
  CODIGO_INTERNO_CENTRO: string = GlobalSettings.CODIGO_INTERNO_CENTRO;
  CODIGO_INTERNO_AMPLIACION: string = GlobalSettings.CODIGO_INTERNO_AMPLIACION;
  CODIGO_INTERNO_DENOMINACION: string = GlobalSettings.CODIGO_INTERNO_DENOMINACION;
  CODIGO_INTERNO_CENTRO_BENEFICIO: string = GlobalSettings.CODIGO_INTERNO_CENTRO_BENEFICIO;
  CODIGO_INTERNO_CLASE_TAB: string = GlobalSettings.CODIGO_INTERNO_CLASE_TAB;
  //calidad
  CODIGO_INTERNO_ALMACEN_PRODUCCION: string = GlobalSettings.CODIGO_INTERNO_ALMACEN_PRODUCCION;
  CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION: string = GlobalSettings.CODIGO_INTERNO_RESPONSABLE_CONTROL_PRODUCCION;
  CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION: string = GlobalSettings.CODIGO_INTERNO_PERFIL_CONTROL_FABRICACION;
  //costos
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
  CODIGO_INTERNO_GRUPO_ARTICULO: string = GlobalSettings.CODIGO_INTERNO_GRUPO_ARTICULO;
  CODIGO_INTERNO_TIPO_MATERIAL: string = GlobalSettings.CODIGO_INTERNO_TIPO_MATERIAL;
  CODIGO_INTERNO_SECTOR: string = GlobalSettings.CODIGO_INTERNO_SECTOR;
  CODIGO_INTERNO_LIMITE_EXCESO_SUM_ILIMITADO: string = GlobalSettings.CODIGO_INTERNO_LIMITE_EXCESO_SUM_ILIMITADO;
  CODIGO_INTERNO_PRECIO_BASE: string = GlobalSettings.CODIGO_INTERNO_PRECIO_BASE;
  CODIGO_INTERNO_MONEDA: string = GlobalSettings.CODIGO_INTERNO_MONEDA;
  CODIGO_INTERNO_IND_PED_AUTOMA: string = GlobalSettings.CODIGO_INTERNO_IND_PED_AUTOMA;
  CODIGO_INTERNO_EXCESO_SUM_ILIMITADO: string = GlobalSettings.CODIGO_INTERNO_EXCESO_SUM_ILIMITADO;
  CODIGO_INTERNO_CRITICOS: string = GlobalSettings.CODIGO_INTERNO_CRITICOS;
  CODIGO_INTERNO_ESTRATEGICOS: string = GlobalSettings.CODIGO_INTERNO_ESTRATEGICOS;
  CODIGO_INTERNO_VISTA_PLANIFICACION: string = GlobalSettings.CODIGO_INTERNO_VISTA_PLANIFICACION;
  CODIGO_INTERNO_PRECIO_COTIZACION: string = GlobalSettings.CODIGO_INTERNO_PRECIO_COTIZACION;
  CODIGO_INTERNO_PERIODO_VIDA: string = GlobalSettings.CODIGO_INTERNO_PERIODO_VIDA;


  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private _snack: MatSnackBar,
    private solicitudService: SolicitudService

  ) { 
    
  }

  initForm(){


    this.filtroForm = this.formBuilder.group({
      codigoModelo: [''],
      denominacion: [''],
    });
    /* this.filtroForm.valueChanges
      .subscribe(() => {
        this.formErrorsFiltro = this.formValidatorService.handleFormChanges(this.filtroForm, this.formErrorsFiltro, this.validationMessages, true);
      }); */

    this.itemForm = this.formBuilder.group({
      [this.CODIGO_INTERNO_DENOMINACION]: [{ value: '', disabled: true }],
      unidad_medida_base: [{ value: '', disabled: true }],
      peso_bruto: [{ value: '', disabled: true }],
      unidad_medida_peso: [{ value: '', disabled: true }],
      centro_codigo_sap: [{ value: '', disabled: true }],
      [this.CODIGO_INTERNO_CENTRO_BENEFICIO]: [{ value: '', disabled: true }],
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
    /* this.itemForm.valueChanges.subscribe(() => {
      this.formErrorsItem = this.formValidatorService.handleFormChanges(this.itemForm, this.formErrorsItem, this.validationMessages, true);
    }) */


  }
  ngOnInit(): void {
    this.initForm();
  }

   filtrarSolicitud() {
    
    let codigoModelo = this.filtroForm.get("codigoModelo")?.value;

    if (codigoModelo == ""){
      this.porDenominacion();
    }else{

      let body = {
        "material": {
          "codigo": codigoModelo,
        }
      }
      this.solicitudService.getMaterialCodigoModelo(body).then( datos => {
        this.camposMaterialModelo = datos;
  
        if (this.camposMaterialModelo.length>0){
          this.llenarDatosCodigoModelo(this.camposMaterialModelo);
        }else{
          this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_NO_EXISTE_SAP, "", "mat-primary")
        }
      }); 

    }
    

  
  }

  porDenominacion(){
    let denominacion = this.filtroForm.get("denominacion")?.value;
    let codigo:any;
    this.solicitudService.getCodigoMaterialSAP(denominacion).then( data => {
      if(data == []){
        console.log("esta vacio");
      }
      codigo = data['material_codigo_sap'];
      console.log("imm el codigo de material es : "+ codigo);
      let body = {
        "material": {
          "codigo": codigo,
        }
      }
      this.solicitudService.getMaterialCodigoModelo(body).then( datos => {
        this.camposMaterialModelo = datos;
  
        if (this.camposMaterialModelo.length>0){
          this.llenarDatosCodigoModelo(this.camposMaterialModelo);
        }else{
          this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_NO_EXISTE_SAP, "", "mat-primary")
        }
      }); 



    })  
  }
  openSnackBarError(message: string, action: string, tema: string) {
    this._snack.open(message, action, {
      duration: 2000,
      panelClass: ['mat-toolbar', tema], //'mat-primary' to 'mat-accent' or 'mat-warn'
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'      
    });
  }
  habilitarControles(datosCodigoModelo: any[]) {
    
    this.filtroForm.get('codigoModelo')?.enable();

    datosCodigoModelo.forEach(campo => {
      if (campo["codigo_interno"] != this.CODIGO_INTERNO_AMPLIACION) {
        this.itemForm.get(campo["codigo_interno"])?.enable();
      }
      
    })
    //this.setValorPorDefecto();
    
  }

  async llenarDatosCodigoModelo(datosCodigoModelo: any[]) {
    console.log("imm datos del codigo material : "+JSON.stringify(datosCodigoModelo));


  
      datosCodigoModelo.forEach((campo: any, i) => {
        if (campo["codigo_interno"]  ) {
          this.itemForm.get(campo["codigo_interno"])?.setValue("");
          let valor = (campo["valor"] == null ? '' : campo["valor"]);
          //console.log("imm valor : "+valor);
          this.itemForm.get(campo["codigo_interno"])?.setValue(valor);
       
        }
      })
  } 
}


