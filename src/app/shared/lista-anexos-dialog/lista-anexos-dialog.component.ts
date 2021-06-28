import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Anexo } from 'src/app/modelos/anexo.interface';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { Messages } from '../messages';
import { GlobalSettings } from '../settings';

@Component({
  selector: 'app-lista-anexos-dialog',
  templateUrl: './lista-anexos-dialog.component.html',
  styleUrls: ['./lista-anexos-dialog.component.css']
})





export class ListaAnexosDialogComponent implements OnInit {

  listadoAnexos:Anexo[]=[]
  displayedColumns:string[] = [
    'etiqueta',
    'rol',
    'acciones'
  ]
  dialogForm: any;
  id_solicitud:any;
  id_rol!:number;
  editarAnexo:boolean =false;
  FAKE_DATA:any[] = [
    {
      "id" : 1,
      "nombre": "manual.docx",
      "rol": "solicitante",
      "url": ""
    },
    {
      "id" : 2,
      "nombre": "manual2.docx",
      "rol": "solicitante",
      "url": ""
    },
    {
      "id" : 3,
      "nombre": "manual3.docx",
      "rol": "solicitante",
      "url": ""
    },

  ] 


  MENSAJE_CARGAR_ANEXO_SOLICITUD: string = GlobalSettings.MENSAJE_CARGAR_ANEXO_SOLICITUD;
  MENSAJE_ELIMINAR_ANEXO_SOLICITUD: string = GlobalSettings.MENSAJE_ELIMINAR_ANEXO_SOLICITUD;


  constructor(public dialogRef: MatDialogRef<ListaAnexosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _snack:MatSnackBar,
    private solicitudService: SolicitudService,
    ) {
      this.id_solicitud = data.id_solicitud;
      this.id_rol = data.id_rol;
      if(this.id_rol != GlobalSettings.ROL_SUPERVISOR){
        this.editarAnexo = true;
      }
     }

  ngOnInit(): void {
    

    this.dialogForm = this.formBuilder.group({
      fileAnexoSolicitud: ['']
    })

    this.getListaAnexos(this.id_solicitud);

    //this.listadoAnexos = this.FAKE_DATA;

  }

  getListaAnexos(id_solicitud:string) {
    this.solicitudService.getListaAnexoSolicitud(id_solicitud).then(res => {
     this.listadoAnexos = res;
      console.log("listado de anexos : "+JSON.stringify(this.listadoAnexos));
   });
  }


  async onSelectAnexoSolicitud(event: any) {
    await this.selectFileAnexo(event);

  }

  async selectFileAnexo(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const name = event.target.files[0].name;
      console.log("el nombre es : "+name);
      this.grabarAnexo(file,name);
    }

  }
  async grabarAnexo(archivo: File, filename: string) {
    this.solicitudService.subirAnexoSolicitud(archivo,this.id_solicitud, this.id_rol, filename)
      .then(result => {
        if (result.resultado == 1) {
          this._snack.open(this.MENSAJE_CARGAR_ANEXO_SOLICITUD, 'cerrar', {
            duration: 1800,
            horizontalPosition: "end",
            verticalPosition: "top"
          });

          this.getListaAnexos(this.id_solicitud);
          this.dialogForm.get('fileAnexoSolicitud').reset();
        }
      }).catch(error => {
        console.debug("errors when trying to add Document....");
      })
  }

  
  eliminarAnexo(element:Anexo) {
    this.solicitudService.borrarAnexoSolicitud(element.id).then(result => {
      if (result.resultado == 1) {
        this._snack.open(this.MENSAJE_ELIMINAR_ANEXO_SOLICITUD, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.getListaAnexos(this.id_solicitud);
      }
    })
  }

  descargarAnexo(anexo:Anexo){
    console.log("este es mi dato de anexo : "+JSON.stringify(anexo));
    let url = anexo.url[0];
    if (url.length > 1) {
      window.open(url, '_blank');
    } else {
      console.log("no se tiene un anexo cargado");
    }
  }

  
  cerrarDialog(res:string){
    this.dialogRef.close(res);
  }



}
