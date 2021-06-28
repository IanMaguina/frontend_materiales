import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnexoMaterial } from 'src/app/modelos/anexo-material.interface';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { GlobalSettings } from '../settings';

@Component({
  selector: 'app-lista-anexos-material-dialog',
  templateUrl: './lista-anexos-material-dialog.component.html',
  styleUrls: ['./lista-anexos-material-dialog.component.css']
})
export class ListaAnexosMaterialDialogComponent implements OnInit {

  listadoAnexosMaterial:AnexoMaterial[]=[]
  displayedColumns:string[] = [
    
    'etiqueta',
    'rol',
    'acciones'
  ]
  dialogForm: any;
  id_material_solicitud:any;
  id_rol!:number;
  editarAnexo:boolean=false;


  FAKE_DATA:any[] = [
    {
      "id" : 1,
      "nombre": "material.docx",
      "rol": "solicitante",
      "url": ""
    },
    {
      "id" : 2,
      "nombre": "material.docx",
      "rol": "solicitante",
      "url": ""
    },
    {
      "id" : 3,
      "nombre": "material.docx",
      "rol": "solicitante",
      "url": ""
    },

  ] 

  MENSAJE_CARGAR_ANEXO_MATERIAL: string = GlobalSettings.MENSAJE_CARGAR_ANEXO_MATERIAL;
  MENSAJE_ELIMINAR_ANEXO_MATERIAL: string = GlobalSettings.MENSAJE_ELIMINAR_ANEXO_MATERIAL;

  constructor(public dialogRef: MatDialogRef<ListaAnexosMaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _snack:MatSnackBar,
    private solicitudService: SolicitudService,
    ) {
      this.id_material_solicitud = data.id_material_solicitud;
      this.id_rol = data.id_rol;
      if(this.id_rol != GlobalSettings.ROL_SUPERVISOR){
        this.editarAnexo = true;
      }

     }

  ngOnInit(): void {
    //tipo de anexo: solicitud o material
    //rol de quien lo subio

    this.dialogForm = this.formBuilder.group({
      fileAnexoMaterial: ['']
    })
    this.getListaAnexos(this.id_material_solicitud);
    //this.listadoAnexosMaterial = this.FAKE_DATA;

  }
  getListaAnexos(id_material_solicitud:string) {
    this.solicitudService.getListaAnexoMaterial(id_material_solicitud).then(res => {
     this.listadoAnexosMaterial = res;
      console.log("el listado es : "+JSON.stringify(this.listadoAnexosMaterial));
   });
  }
  async onSelectAnexoMaterial(event: any) {
    await this.selectFileAnexo(event);

  }

  async selectFileAnexo(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const name = event.target.files[0].name;
      this.grabarAnexo(file,name);
    }

  }
  async grabarAnexo(archivo: File,filename:string) {
    this.solicitudService.subirAnexoMaterial(archivo,this.id_material_solicitud, this.id_rol,filename)
      .then(result => {
        if (result.resultado == 1) {
          this._snack.open(this.MENSAJE_CARGAR_ANEXO_MATERIAL, 'cerrar', {
            duration: 1800,
            horizontalPosition: "end",
            verticalPosition: "top"
          });

          this.getListaAnexos(this.id_material_solicitud);
          this.dialogForm.get('fileAnexoMaterial').reset();
        }
      }).catch(error => {
        console.debug("errors when trying to add Document....");
      })
  }

  eliminarAnexo(element:AnexoMaterial) {
    let id_anexo_material = element.id;
    this.solicitudService.borrarAnexoMaterial(id_anexo_material).then(result => {
      if (result.resultado == 1) {
        this._snack.open(this.MENSAJE_ELIMINAR_ANEXO_MATERIAL, 'cerrar', {
          duration: 1800,
          horizontalPosition: "end",
          verticalPosition: "top"
        });
        this.getListaAnexos(this.id_material_solicitud);
      }
    })
  }

  descargarAnexo(anexo:AnexoMaterial){
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
