import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstrategiaCorreo } from 'src/app/modelos/estrategia-correo.interface';
import { EstrategiaService } from 'src/app/servicios/estrategia.service';
import { FormValidatorService } from 'src/app/servicios/form-validator.service';
import { Messages } from 'src/app/shared/messages';

@Component({
  selector: 'app-asignar-correos',
  templateUrl: './asignar-correos.component.html',
  styleUrls: ['./asignar-correos.component.css']
})
export class AsignarCorreosComponent implements OnInit {

  listadoCorreosEstrategia:EstrategiaCorreo[]=[]
  displayedColumns:string[] = [
    'correo',
    'acciones'
  ]
  formErrors = {
    'correo':''
  }
  validationMessages = {
    'correo':{
      'required':'el correo es requerido.'
    }
  };
  submitted = false;


  dialogForm: any;

  id_estrategia:any;


  FAKE_DATA:any[] = [
    {
      "id" : 1,
      "correo": "correo1@gmail.com"
    },
    {
      "id" : 2,
      "correo": "correo2@gmail.com"
    },
    {
      "id" : 3,
      "correo": "correo3@gmail.com"
    },

  ] 

  MENSAJE_CREAR_CORREO_ESTRATEGIA: string = Messages.confirmation.MENSAJE_CREAR_CORREO_ESTRATEGIA;
  MENSAJE_ELIMINAR_CORREO_ESTRATEGIA: string = Messages.confirmation.MENSAJE_ELIMINAR_CORREO_ESTRATEGIA;
 
  constructor(public dialogRef: MatDialogRef<AsignarCorreosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _snack:MatSnackBar,
    private formValidatorService:FormValidatorService,
    private estrategiaService: EstrategiaService,
    ) {
      this.id_estrategia = data.id_estrategia;


      this.dialogForm = this.formBuilder.group({
        correo: ['']
      })
      this.dialogForm.valueChanges.subscribe(() => {
        this.formErrors = this.formValidatorService.handleFormChanges(this.dialogForm,this.formErrors,this.validationMessages,this.submitted);
      })

     }

  ngOnInit(): void {
    //tipo de anexo: solicitud o material
    //rol de quien lo subio

    
    this.getListaCorreos(this.id_estrategia);
    //this.listadoAnexosMaterial = this.FAKE_DATA;

  }
  getListaCorreos(id_estrategia:any) {
    this.estrategiaService.getListarCorreoEstrategia(id_estrategia).then(res => {
     this.listadoCorreosEstrategia = res;
      console.log("el listado es : "+JSON.stringify(this.listadoCorreosEstrategia));
   });
  }

  grabarCorreo(form:any) {
    console.log("capturing correo : "+ JSON.stringify(form))
    let item = {
      "correo":form.correo,
      "id_estrategia":this.id_estrategia
    }

    this.estrategiaService.addCorreoEstrategia(item)
      .then(result => {
        if (result.resultado == 1) {
          this._snack.open(this.MENSAJE_CREAR_CORREO_ESTRATEGIA, 'cerrar', {
            duration: 1800,
            horizontalPosition: "end",
            verticalPosition: "top"
          });

          this.getListaCorreos(this.id_estrategia);
        }
      }).catch(error => {
        console.debug("errors when trying to add Document....");
      })
  }

  eliminarCorreo(element:EstrategiaCorreo) {
    let id_correo = element.id;
    this.estrategiaService.borrarCorreoEstrategia(id_correo).then(result => {
      if (result.resultado == 1) {
        this._snack.open(this.MENSAJE_ELIMINAR_CORREO_ESTRATEGIA, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.getListaCorreos(this.id_estrategia);
      }
    })
  }

 
  cerrarDialog(res:string){
    this.dialogRef.close(res);
  }

}
