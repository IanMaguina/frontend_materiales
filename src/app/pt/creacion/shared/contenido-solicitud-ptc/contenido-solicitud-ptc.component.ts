import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReglasCampo } from 'src/app/modelos/reglas-campo.interface';
import { Rol } from 'src/app/modelos/rol.interface';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { GlobalSettings } from 'src/app/shared/settings';


@Component({
  selector: 'app-contenido-solicitud-ptc',
  templateUrl: './contenido-solicitud-ptc.component.html',
  styleUrls: ['./contenido-solicitud-ptc.component.css']
})
export class ContenidoSolicitudPtcComponent implements OnInit {
  tabs!: any[];
  material:any;
  tipo?:string;
  ROL_ADMINISTRADOR_MATERIAL: number = GlobalSettings.ROL_ADMINISTRADOR_MATERIAL;
  isAdministrador=false;
  existe_error_sap=false;
  constructor(public dialogRef: MatDialogRef<ContenidoSolicitudPtcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private solicitudService: SolicitudService) { 
      this.material=data.material;
      this.existe_error_sap=(this.material['existe_error_sap']==null?null:this.material['existe_error_sap']);
      this.tipo=(data.tipo?data.tipo:"");
      this.getRolesAnteriores();
      

    }

  ngOnInit(): void {
   
  }

  getRolesAnteriores(){
    this.solicitudService.getRolesAnteriores(this.data.id_solicitud,this.data.orden).then((resul)=>{
      if(resul.resultado==1){
        this.tabs=resul['lista'];
        this.tabs.forEach(rol=>{
          if(rol.id_rol==this.ROL_ADMINISTRADOR_MATERIAL){
            this.isAdministrador=true;
          }
        })
        console.log('this.tabs-->'+ ' --  '+JSON.stringify(this.tabs))
      }
      
    })
  }

}
