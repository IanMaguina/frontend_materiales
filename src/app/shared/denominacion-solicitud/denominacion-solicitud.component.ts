import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodigoMaterialSap } from 'src/app/modelos/codigoMaterialSap.interface';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
@Component({
  selector: 'app-denominacion-solicitud',
  templateUrl: './denominacion-solicitud.component.html',
  styleUrls: ['./denominacion-solicitud.component.css']
})
export class DenominacionSolicitudComponent implements OnInit {
  listadoDenominacion!:CodigoMaterialSap[];
  displayedColumns: string[] = ['Denominación','Codigo Material'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(public dialogRef: MatDialogRef<DenominacionSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitudService:SolicitudService
  ) { 
    
  }

  ngOnInit(): void {
    console.log(this.data);
    this.listarFlujo()
  }
  listarFlujo(){
    this.solicitudService.listadoDenominacion(this.data).then((res)=>{
      if (res.resultado==1){
        this.listadoDenominacion=res['lista'];
      }
      console.log(JSON.stringify(this.listadoDenominacion));
    })
  }
}
