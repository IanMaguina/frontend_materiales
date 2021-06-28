import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AprobadorSolicitud } from 'src/app/modelos/aprobadorSolicitud.interface';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-flujo-solicitud',
  templateUrl: './flujo-solicitud.component.html',
  styleUrls: ['./flujo-solicitud.component.css']
})
export class FlujoSolicitudComponent implements OnInit {
  listadoFlujo!:AprobadorSolicitud[];
  displayedColumns: string[] = ['Completado','Proceso', 'Usuario'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(public dialogRef: MatDialogRef<FlujoSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitudService:SolicitudService
  ) { 
    
  }

  ngOnInit(): void {
    console.log(this.data);
    this.listarFlujo()
  }
  listarFlujo(){
    this.solicitudService.listarFlujo(this.data).then((res)=>{
      if (res.resultado==1){
        this.listadoFlujo=res['lista'];
/*         let ls:AprobadorSolicitud[]=res['lista'];
        ls.forEach(item=>{
          if(item.nombre_estado_real || item.nombre_usuario_real){
            this.listadoFlujo.push(item);
          }
        }) */
      }
      console.log(JSON.stringify(this.listadoFlujo));
    })
  }
}
