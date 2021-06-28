import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidatorService } from 'src/app/servicios/form-validator.service';
import { MotivoService } from 'src/app/servicios/motivo.service';
import { Motivo } from 'src/app/modelos/motivo.interface';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { GlobalSettings } from '../settings';


@Component({
  selector: 'app-motivo-solicitud',
  templateUrl: './motivo-solicitud.component.html',
  styleUrls: ['./motivo-solicitud.component.css']
})
export class MotivoSolicitudComponent implements OnInit {
  
  mensaje:any;
  id_solicitud:number;
  id_rol_gestor: any;
  orden!:number;
  motivoForm!:FormGroup;
  ROL_ADMINISTRADOR_MATERIAL=GlobalSettings.ROL_ADMINISTRADOR_MATERIAL
  listadoMotivos:Motivo[] = [];
  listadoRolesAnteriores:any[] = [];
  estadoFlujoADerivarSolicitud:any;


  //Validation
  formErrors = {
    "motivo_rechazo": '',
    "texto_adicional": '',
    "area_derivacion":  ''
  }

  validationMessages = {
    "motivo_rechazo": {
      'required': 'motivo de rechazo es requerido.'
    },
    "area_derivacion":{
      'required': 'area de derivación es requerido.'
    }

  };
  submitted = false;
  constructor(public dialogRef: MatDialogRef<MotivoSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private motivoService:MotivoService,
    private solicitudService:SolicitudService,
    private formValidatorService: FormValidatorService
    ) {
      this.mensaje=data.mensaje;
      this.id_rol_gestor= data.id_rol;
      this.id_solicitud = data.id_solicitud;
      this.orden=data.orden
     }

  ngOnInit(): void {
    this.initForm();
    this.getlistaMotivos();
    
    this.getListaRolesAnteriores(this.id_solicitud, this.orden);
  }

  initForm(){
    this.motivoForm = this.formBuilder.group({
      motivo_rechazo: ['', Validators.required],
      texto_adicional: [''],
      area_derivacion: [''],
    })

    this.motivoForm.valueChanges
    .subscribe(() => {
      this.formErrors = this.formValidatorService.handleFormChanges(this.motivoForm, this.formErrors, this.validationMessages, this.submitted);
    });
  }

  getlistaMotivos(){
    this.motivoService.getListarMotivos().then( data => {
      this.listadoMotivos = data.lista;
    });
  }

  getListaRolesAnteriores(id_solicitud:any, orden:number){
    this.solicitudService.getRolesAnteriores(id_solicitud, orden).then(data=>{
      console.log("lista de roles cargados desde el servicio : "+JSON.stringify(data));
      data.lista.forEach((element:any) => {
        if (element.id_rol!=this.id_rol_gestor){
          this.listadoRolesAnteriores.push(element)
        }
      });
    })
  }

  confirmar(res:string,motivoItem:any): void {
    //console.log("el resultado es : "+res+" y el objeto es"+JSON.stringify(motivoItem));
    let id_rol_derivado=this.id_rol_gestor;
    if (this.id_rol_gestor==this.ROL_ADMINISTRADOR_MATERIAL){
      id_rol_derivado=this.estadoFlujoADerivarSolicitud.id_rol;
    }
    //se debe mostrar un mensaje de error en caso se cancele o acepte sin cumplir con los datos.
    let itemMotivo = {
      "respuesta":res,
      "id_motivo_rechazo": motivoItem.motivo_rechazo,
      "motivo":motivoItem.texto_adicional,
      "id_rol_derivado":id_rol_derivado,
      "aprobador_derivado":this.estadoFlujoADerivarSolicitud
    }
    this.dialogRef.close(itemMotivo);
  }
  cerrar(res:string,motivoItem:any): void {
    //console.log("el resultado es : "+res+" y el objeto es"+JSON.stringify(motivoItem));
    
    let itemMotivo = {
      "respuesta":res,
      "id_motivo_rechazo": 0,
      
    }
    this.dialogRef.close(itemMotivo);
  }

  ordenADerivar(ordenPrevio:number) {
    let id_rol_derivado=this.motivoForm.get("area_derivacion")?.value;
    this.solicitudService.ordenADerivar(this.id_solicitud,ordenPrevio).then(sol => {
      console.log('orden-->' + JSON.stringify(sol));

      //this.estadoFlujoADerivarSolicitud=sol;
    })
  }

  estadoADerivar() {
    let id_rol_derivado=this.motivoForm.get("area_derivacion")?.value;
    this.solicitudService.estadoADerivar(this.id_solicitud,id_rol_derivado).then(sol => {
      console.log('elegi en el combo-->' + JSON.stringify(sol));
      this.estadoFlujoADerivarSolicitud=sol;
      return sol;
    })
  }  
  estadoActual(id_solicitud: number) {

    this.solicitudService.estadoActual(id_solicitud).then(sol => {
      console.log('Estado solicitud-->' + JSON.stringify(sol));
      return sol;
    })
  }  


}
