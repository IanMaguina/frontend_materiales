import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { FormValidatorService } from 'src/app/servicios/form-validator.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { Messages } from '../messages';
import { GlobalSettings } from '../settings';

@Component({
  selector: 'app-bandeja-materiales',
  templateUrl: './bandeja-materiales.component.html',
  styleUrls: ['./bandeja-materiales.component.css']
})
export class BandejaMaterialesComponent implements OnInit {

  displayedColumns: string[] = [ 'denominacion', 'material_codigo_sap'];
  listadoMateriales: any[] = [];
  filtroForm!:FormGroup;
  //Validation
  formErrors = { 
    'codigoModelo':'',
    'denominacion': '',
  }
  formErrorsItem = { 
  }

  formErrorsFiltro = { 
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


  
  
  CODIGO_INTERNO_DENOMINACION: string = GlobalSettings.CODIGO_INTERNO_DENOMINACION;
  @ViewChild(MatTable) table!: MatTable<any> ;
  constructor(
    private solicitudService: SolicitudService,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private _snack: MatSnackBar,
    ) { 

    }
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.filtroForm = this.formBuilder.group({
      codigoModelo:[''],
      denominacion: [''],
    });
     this.filtroForm.valueChanges
      .subscribe(() => {
        this.formErrorsFiltro = this.formValidatorService.handleFormChanges(this.filtroForm, this.formErrorsFiltro, this.validationMessages, true);
      }); 

  }
  openSnackBarError(message: string, action: string, tema: string) {
    this._snack.open(message, action, {
      duration: 2000,
      panelClass: ['mat-toolbar', tema], //'mat-primary' to 'mat-accent' or 'mat-warn'
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'      
    });
  }

  async getAllMateriales(){
    this.listadoMateriales = [];
    let denominacion = this.filtroForm.get("denominacion")?.value;
    let codigoModelo = this.filtroForm.get("codigoModelo")?.value;
    if(denominacion == ""){
      //por codigo sap
      this.porCodigo(codigoModelo);
    }else{
      this.porDenominacion(denominacion);
    }

  }
  porDenominacion(denominacion:any){
    //por denominacion
    this.solicitudService.getCodigoMaterialSAP(denominacion).then(data =>{
    
    // console.log("immm list materiales : "+ JSON.stringify(data))
    if(data == []){
      this.openSnackBarError(Messages.error.MENSAJE_ERROR_DENOMINACION_NO_EXISTE_SAP, "", "mat-primary");
      this.listadoMateriales = [];
      this.table.renderRows();
    }else{
      this.listadoMateriales = data;
      this.table.renderRows();
    }
    });
  }

   async porCodigo(codigoModelo:any){
    let body = {
      "material":{
        "codigo": codigoModelo,
      }
    }

    let campo_denominacion:any;
    let material:any;
    await this.solicitudService.getMaterialCodigoModelo(body).then( datos => {
      if(datos.length > 0){

      

      datos.forEach((campo:any) => {
        if(campo["codigo_interno"] == this.CODIGO_INTERNO_DENOMINACION ){
          campo_denominacion = campo["valor"];
          material = {
            "denominacion":campo_denominacion,
            "material_codigo_sap":codigoModelo
          }
         
          this.listadoMateriales.push(material);
          this.table.renderRows();
          console.log("imm objeto material 2 : "+JSON.stringify(this.listadoMateriales));
        }
      })

    }else{
          this.listadoMateriales = [];
          this.table.renderRows();
    }
      
    });
    
    
    

    

  }

  



}

