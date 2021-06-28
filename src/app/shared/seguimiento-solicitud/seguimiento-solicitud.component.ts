import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AprobadorSolicitud } from 'src/app/modelos/aprobadorSolicitud.interface';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-seguimiento-solicitud',
  templateUrl: './seguimiento-solicitud.component.html',
  styleUrls: ['./seguimiento-solicitud.component.css']
})
export class SeguimientoSolicitudComponent implements OnInit {
  listadoSeguimiento!:AprobadorSolicitud[];
  displayedColumns: string[] = ['Acción','Usuario','Fecha/Hora Inicio', 'Fecha/Hora Fin','Demora (Hrs)','Motivo'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(public dialogRef: MatDialogRef<SeguimientoSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitudService:SolicitudService
  ) { 
    
  }

  ngOnInit(): void {
    console.log(this.data);
    this.listarFlujo()
  }
  listarFlujo(){
    this.solicitudService.listarSeguimiento(this.data).then((res)=>{
      if (res.resultado==1){
        this.listadoSeguimiento=res['lista'];

      }
      console.log(JSON.stringify(this.listadoSeguimiento));
    })

  }
}
