import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet,monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import { AreaUsuarioService } from 'src/app/servicios/area-usuario.service';
import { CentroService } from 'src/app/servicios/centro.service';
import { EstadoSolicitudService } from 'src/app/servicios/estado-solicitud.service';
import { Nivel3Service } from 'src/app/servicios/nivel3.service';
import { ReporteService } from 'src/app/servicios/reporte.service';
import { SociedadService } from 'src/app/servicios/sociedad.service';
import { TipoSolicitudService } from 'src/app/servicios/tipo-solicitud.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-reporte-cantidad-solicitud',
  templateUrl: './reporte-cantidad-solicitud.component.html',
  styleUrls: ['./reporte-cantidad-solicitud.component.css']
})
export class ReporteCantidadSolicitudComponent implements OnInit {
//elementos
filtroForm:any;
listadoSociedad: any[] = [];
listadoAnhos: any[] = []; 
listadoLinea: any[] = [];
listadoEstado: any[] = [];
listadoArea: any[] = [];
listadoTipoSolicitud: any[] = [];
listadoCentros: any[] = [];
listadoUsuarios: any[] = [];
submitted = false;

// Pie : porcentaje de solicitudes por estado
public pieChartOptions: ChartOptions = {
  responsive: true, 
  maintainAspectRatio: false,
  title:{ display: true,text:"Porcentaje de solicitudes por Status"} 
};

public pieChartLabels!: Label[] ;
public pieChartData!: SingleDataSet ;
public pieChartType: ChartType = 'pie';
public pieChartLegend = true; 


//bar : Cantidad Solicitudes
public barChartOptions: ChartOptions = {
  responsive: true,
  scales: { xAxes: [{}], yAxes: [{offset:true}] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  },
  title: {
    display:true,
    text:'Cantidad de Solicitudes por Estado'
  }
};
public barChartType: ChartType = 'bar';
public barChartLegend = false;

public barChartLabels!: Label[];
public barChartData!: ChartDataSets[];


//tabla 
listadoSolicitudes: any[] = [];
displayedColumns: string[] = ['solicitante', 'codigo', 'descripcion','area', 'numerosolicitud', 'fecha', 'tipo', 'lineanegocio','estado','motivorechazo'];


constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private reporteService:ReporteService,
  private areaService:AreaUsuarioService,
  private sociedadService:SociedadService,
  private nivel3Service:Nivel3Service, 
  private estadoService:EstadoSolicitudService,
  private tSolicitudService:TipoSolicitudService,
  private centroService:CentroService,
  private usuarioService:UsuarioService,

) {
  monkeyPatchChartJsTooltip();
  monkeyPatchChartJsLegend();
  this.initForm();
 }

ngOnInit(): void {
  let request = {
    "anho":null,
    "id_sociedad":null,
    "id_usuario":null,
    "id_area_usuario":null,
    "id_tipo_solicitud":null,
    "id_escenario_nivel3":null,
    "centro_codigo_sap":null,
    "fecha_inicio":null,
    "fecha_fin":null
  }
  this.piePorcentajeSolicitudes(request);
  this.barCantidadSolicitudes(request);
  this.getlistadoAnhos();
  this.getAreas();
  //this.getEstadoSolicitud(); 
  this.getSociedades();
  this.getTipoSolicitudes();
  this.getUsuarios();

  
}
initForm() {
  this.filtroForm = this.formBuilder.group({
    anho: [''],
    sociedad: [''],
    usuario: [''],
    area: [''],
    tipo: [''],
    linea: [''],
    centro: [''],
    fecha_inicio: [''],
    fecha_fin: ['']
  })
}



getlistadoAnhos(){
  for(var i=1990;i<2022;i++){
    this.listadoAnhos.push(i);
  }
}
getAreas(){
  this.areaService.getListarAreasUsuario().then(data=>{
    this.listadoArea = data;
  });
}
getEstadoSolicitud(){
  this.estadoService.getListarEstado().then(data=>{
    this.listadoEstado = data.lista;
  });
}

filtrarSociedad() {
    let selectedSociedad = this.filtroForm.get('sociedad').value; 
    
    console.log("sociedad elegida : "+ JSON.stringify(selectedSociedad));
    this.nivel3Service.getListarNivel3SolicitudPorIdSociedad(selectedSociedad.id).then(data=>{
      this.listadoLinea = data.lista;
      //console.log("linea : "+ JSON.stringify(data));
    }); 
    this.centroService.getListarCentroPorSociedad(selectedSociedad.codigo_sap).then(data=>{
      console.log("centros : "+ JSON.stringify(data));
      this.listadoCentros = data.lista;
    }); 
}

getSociedades(){
  this.sociedadService.getListarSociedades().then(data=>{
    this.listadoSociedad = data;
    console.log("sociedades: "+JSON.stringify(data));
  });
}

getTipoSolicitudes(){
  this.tSolicitudService.getListarTipoSolicitud().then(data=>{
    this.listadoTipoSolicitud = data; 
  });
}
getUsuarios(){
  this.usuarioService.getListarUsuarios().then(data=>{
    this.listadoUsuarios = data.lista; 
  });
}


filtrarDatos(){
  let anho = this.filtroForm.get('anho').value;
  let sociedad = this.filtroForm.get('sociedad').value;
  let usuario = this.filtroForm.get('usuario').value;
  let area = this.filtroForm.get('area').value;
  let tipoSolicitud = this.filtroForm.get('tipo').value;
  let linea = this.filtroForm.get('linea').value;
  let centro = this.filtroForm.get('centro').value;
  let fecha_inicio = this.filtroForm.get('fecha_inicio').value;
  let fecha_fin = this.filtroForm.get('fecha_fin').value;

  let request = {
    "anho":anho,
    "id_sociedad":sociedad,
    "id_usuario":usuario,
    "id_area_usuario":area,
    "id_tipo_solicitud":tipoSolicitud,
    "id_escenario_nivel3":linea,
    "centro_codigo_sap":centro,
    "fecha_inicio":fecha_inicio,
    "fecha_fin":fecha_fin
  }

  this.piePorcentajeSolicitudes(request);
  this.barCantidadSolicitudes(request);
}

piePorcentajeSolicitudes(request:any){
  this.reporteService.getPorcentajeSolicitudesPorEstadoDashboard(request).then((data)=>{
 
    // console.log("data : "+ JSON.stringify(data.lista)); 
    let arrValue: SingleDataSet = [];
    let arrLabel: Label[] = [];
    let listaPorcentajes: any[] = data.lista;
      listaPorcentajes.forEach(data => {
      //console.log("data  : "+ data['porcentaje']);
      arrValue.push( data['porcentaje']);
      arrLabel.push(['', data['nombre']]);
      });
      this.pieChartLabels = arrLabel;
      this.pieChartData = arrValue; 
  });
 
}


barCantidadSolicitudes(request:any){
  this.reporteService.getCantidadSolicitudesPorMotivoRechazo(request).then(data => {
    let arrValue:SingleDataSet=[];
    let arrLabel: Label[] = []; 
    let listaTiempos: any[] = data.lista;
      listaTiempos.forEach(data => {
      //console.log("data  : "+ data['avg']);
      arrLabel.push(data['nombre']);
      arrValue.push( data['count']); 
      
      }); 
    this.barChartLabels = arrLabel;
    this.barChartData = [ { data: arrValue, label: 'Cantidad de Solicitudes por Motivo Rechazo', backgroundColor: '#36a2eb'}, ]

  });
}


limpiar(){
  this.filtroForm.get('anho').setValue("");
  this.filtroForm.get('sociedad').setValue("");
  this.filtroForm.get('usuario').setValue("");
  this.filtroForm.get('area').setValue("");
  this.filtroForm.get('tipo').setValue("");
  this.filtroForm.get('linea').setValue("");
  this.filtroForm.get('centro').setValue("");
  this.filtroForm.get('fecha_inicio').setValue("");
  this.filtroForm.get('fecha_fin').setValue("");
}
 

}