import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Equivalencia } from 'src/app/modelos/equivalencia.interface';
import { UnidadMedida } from 'src/app/modelos/unidad-medida.interface';
import { EquivalenciaService } from 'src/app/servicios/equivalencia.service';
import { FormValidatorService } from 'src/app/servicios/form-validator.service';
import { UnidadMedidaService } from 'src/app/servicios/unidad-medida.service';
import { Messages } from '../messages';
import { GlobalSettings } from '../settings';

@Component({
  selector: 'app-tabla-equivalencias-dialog',
  templateUrl: './tabla-equivalencias-dialog.component.html',
  styleUrls: ['./tabla-equivalencias-dialog.component.css']
})
export class TablaEquivalenciasDialogComponent implements OnInit {

  comboListadoUnidadesMedida:UnidadMedida[] = [];

  material_id!:number;
  id_rol!:number;

  carga:boolean = false;
  
  selectedPerfil:any;

  listadoEquivalencias:Equivalencia[] = [];
  listadoUnidadMedida:UnidadMedida[] = [];
  editarTabla:boolean =false;


  editarFormDialog:any;
  formErrors = {
    'valor1':'',
    'unidad_medida1':'',
    'valor2':'',
    'unidad_medida2':''
  }
  validationMessages = {
    'valor1':{
      'required':'el valor 1 es requerido.'
    },
    'unidad_medida1':{
      'required':'la unidad de medida 1 es requerida.',
    },
    'valor2':{
      'required':'el valor 2 es requerido.',
    },
    'unidad_medida2':{
      'required':'el unidad de medida 2 es requerida.',
    }
  };
  submitted = false;

  displayedColumns:string[] = [
    'valor1',
    'unidad_medida1',
    'equivalencia',
    'valor2',
    'unidad_medida2',
    'acciones'
  ];

  //mensajes 
  MENSAJE_CREAR_EQUIVALENCIA = Messages.confirmation.MENSAJE_CREAR_EQUIVALENCIA;
  MENSAJE_QUITAR_EQUIVALENCIA = Messages.confirmation.MENSAJE_QUITAR_EQUIVALENCIA;
  

  //fin mensajes

  constructor(public dialogRef4: MatDialogRef<TablaEquivalenciasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private equivalenciaService:EquivalenciaService,
    private unidadMedida: UnidadMedidaService,
    private formBuilder: FormBuilder,
    private formValidatorService: FormValidatorService,
    private _snack: MatSnackBar
    ) { 
      console.log(JSON.stringify(data))
      this.material_id = data.id_material_solicitud;
      this.id_rol = data.id_rol;

      if(this.id_rol == GlobalSettings.ROL_SOLICITANTE || this.id_rol == GlobalSettings.ROL_ADMINISTRADOR_MATERIAL ){
        this.editarTabla = true;
      }else{
        this.editarTabla = false;
      }

      this.editarFormDialog = this.formBuilder.group({
        valor1: ['', Validators.required],
        unidad_medida1: ['', Validators.required],
        valor2: ['' ,Validators.required],
        unidad_medida2: ['', Validators.required],
      })
      this.editarFormDialog.valueChanges.subscribe(() => {
        this.formErrors = this.formValidatorService.handleFormChanges(this.editarFormDialog,this.formErrors,this.validationMessages,this.submitted);
      })



    }

  ngOnInit(): void {
    this.getUnidadesMedida();
    this.listarEquivalencias();
  }

  listarEquivalencias(){
    this.equivalenciaService.getListaEquivalencias(this.material_id).then( data => {
      console.log("los perfiles son :"+JSON.stringify(data));
      this.listadoEquivalencias = data;

    })
  }

  getUnidadesMedida(){
    this.unidadMedida.getListarUnidadMedida().then( unidadMed => {
      //console.log("los perfiles son :"+JSON.stringify(unidadMed));
      this.listadoUnidadMedida = unidadMed.lista;
    })
  }
  registrarEquivalencia(equivalencia:any){
    let item = {
      "id_material_solicitud": this.material_id,
      "valor1": equivalencia.valor1,
      "unidad_medida1": equivalencia.unidad_medida1,
      "valor2": equivalencia.valor2,
      "unidad_medida2": equivalencia.unidad_medida2,
      "id_rol":this.id_rol
    }
     this.equivalenciaService.registrarEquivalencia(item).then( result => {

      this._snack.open(this.MENSAJE_CREAR_EQUIVALENCIA,'cerrar', {
        duration: 2000,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      this.listarEquivalencias();
    }) 

  }
  eliminarEquivalencia(equivalencia:any){
    let id_equivalencia_material = parseInt(equivalencia.id);
    
    this.equivalenciaService.eliminarEquivalencia(id_equivalencia_material).then( data => {
      console.log("se desasignó el usuario"+JSON.stringify(data));
      if(data){

        this._snack.open(this.MENSAJE_QUITAR_EQUIVALENCIA,'cerrar', {
          duration: 2000,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.listarEquivalencias();
      }else{
        console.log("no se eliminó la equivalencia")
      }

    }) 
    
  }
  onNoClick(res:string): void {

    this.dialogRef4.close(res);
  }

}
