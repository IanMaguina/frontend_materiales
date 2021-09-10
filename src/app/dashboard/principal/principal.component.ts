import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router,ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms'; 

import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ChartType, ChartOptions, ChartPluginsOptions, ChartDataSets, ChartXAxe, ChartData, ChartConfiguration, ChartArcOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
 
import { ReporteService } from 'src/app/servicios/reporte.service'; 
import { RolEstrategiaService } from 'src/app/servicios/rol-estrategia.service';
import { TipoSolicitudService } from 'src/app/servicios/tipo-solicitud.service';
import { AreaUsuarioService } from 'src/app/servicios/area-usuario.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})


export class PrincipalComponent implements OnInit {
  mySubscription: any;
  reload: Boolean = true;

  userInfo: any;
  //elementos
  filtroForm:any;
  listadoGestor: any[] = [];
  listadoProceso: any[] = [];
  listadoArea: any[] = [];
  submitted = false;
  //cardviews:
  solicitudPendiente!:number;
  tiempoPromedio!:number;
  porcentajeAvance!:number;
  public pieChartPlugins = [];
  // Pie : porcentaje de solicitudes por estado
  public pieChartOptions: ChartOptions = {
    responsive: true, 
    maintainAspectRatio: false,
    title:{ display: true,text:"Porcentaje de solicitudes por Status",fontSize:16},
    legend:{
      position:'bottom',
    },
  };
  
  public pieChartLabels!: Label[];
  public pieChartData!: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true; 

  //donut : cantidad de solicitudes por area
  public donutChartOptions: ChartOptions = {
    title:{ 
      display: true,text:"Cantidad de solicitudes por area",fontSize:16
    },
    legend:{
      position:'bottom',
    },
    aspectRatio:2.5,
    elements:{arc:{angle:35}}
    
  }
   
  public doughnutChartLabels!: Label[];// = ['Comercial', 'Mantenimiento', 'T.I', 'Asistentes Logísticos'];
  public doughnutChartData!: SingleDataSet; //= [   [25, 10, 9, 12 ]   ];
  public doughnutChartType: ChartType = 'doughnut';



  //donut : tiempo de atencion por gestor.
  public donutChartOptions2: ChartOptions = {
    title:{ 
      display: true,
      text:"Tiempo de atencion por gestor",
      fontSize:16
    },
    legend:{
      position:'bottom',
    }, 
  }
  public doughnutChartLabels2 !: Label[];// = ['borrador', 'En Supervisión', 'En Costos', 'En Calidad', 'En Control de Gestión', 'En Comercial', 'En Adm. de Materiales'];
  public doughnutChartData2 !: SingleDataSet;// = [ [24, 15, 10, 35, 60, 5, 2 ],  ];
  public doughnutChartType2: ChartType = 'doughnut';


  //bar :cantidad de motivos de rechazo
 

  public barChartOptions: ChartOptions = {
    
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{offset:true}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        
      }
    },
    
    title: {
      display:true,
      text:'Cantidad de motivos de rechazo',fontSize:16
    }, 
    
  };
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = false;
  
  public barChartLabels!: Label[]; // =['Datos Incompletos', 'Datos Errados', 'Codigo Existente'];
  public barChartData !: ChartDataSets[]; // = [ { data: [24, 15, 10 ], label: 'Cantidad de Motivos', backgroundColor: '#36a2eb'} ]
  
  //bar :cantidad de tipos de solicitudes

  public barChartOptions2: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{offset:true}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    title: {
      display:true,
      text:'Cantidad de tipos de solicitudes',fontSize:16
    }
  };
  public barChartLabels2!: Label[];
  public barChartType2: ChartType = 'bar';
  public barChartLegend2 = false;
  
 
  public barChartData2 !: ChartDataSets[];
  
  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService,
    private formBuilder: FormBuilder,
    private reporteService: ReporteService,
    private tSolicitudService: TipoSolicitudService,
    private rolService: RolEstrategiaService,
    private areaService: AreaUsuarioService
  ) {

    this.userInfo = autenticacionService.getUserInfo();
    
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
        /*     if (this.reload) {
          console.log('entro');
          this.reload = false;
          
          this.reloadCurrentRoute();
        } */
        this.initForm();

  }

  ngOnInit(): void {
    let request = {
      "id_rol":null,
      "id_tipo_solicitud":null,
      "id_area_usuario":null,
      "fecha_inicio":null,
      "fecha_fin":null
    }
    this.initForm();
    this.cantidadSolicitudesArea(request);
    this.loadCardViews(request);
    this.solicitudesPorEstado(request);
    this.tiempoAtencionPorGestor(request);
    this.CantidadSolicitudesPorMotivo(request);
    this.CantidadSolicitudesPorTipo(request);
    this.getRoles();
    this.getProcesos();
    this.getAreas();
  }
  loadCardViews(request:any){
      
     this.reporteService.getCantidadSolicitudesPendientes(request).then((data)=>{
      this.solicitudPendiente = data.total_solicitudes;
     });
     this.reporteService.getTiempoPromedioAtencion(request).then((data)=>{
      this.tiempoPromedio = data.promedio_atencion;
     });
     this.reporteService.getPorcentajeAvance(request).then((data)=>{
      this.porcentajeAvance = data.porcentaje;
     });

  }

  initForm() {
    this.filtroForm = this.formBuilder.group({
      gestor: [''],
      proceso: [''],
      area: [''],
      fecha_inicio: [''],
      fecha_fin: ['']
    })
  }

  getProcesos(){
    this.tSolicitudService.getListarTipoSolicitud().then(data=> {
      this.listadoProceso = data;
    });
  }

  getRoles(){
    this.rolService.getListarRoles().then(data => {
      this.listadoGestor = data;
    });
  }
  getAreas(){
    this.areaService.getListarAreasUsuario().then(data => {
      this.listadoArea = data;
    });
  }




  solicitudesPorEstado(request:any){
    this.reporteService.getPorcentajeSolicitudesPorEstadoDashboard(request).then((data)=>{
      //this.pieChartData = data.lista["porcentaje"];
//      console.log("data : "+ JSON.stringify(data.lista));

      let arrValue: SingleDataSet = [];
      let arrLabel: Label[] = [];
      let listaPorcentajes: any[] = data.lista;
        listaPorcentajes.forEach(data => {
        //console.log("data  : "+ data['porcentaje']);
        arrValue.push( data['porcentaje']);
        arrLabel.push(['', data['nombre']]);
        });
        //console.log(arrLabel);
        this.pieChartLabels =  arrLabel; 
        this.pieChartData =  arrValue;
    });    
  }
  cantidadSolicitudesArea(request:any){
    this.reporteService.getCantidadSolicitudesPorArea(request).then(data => {
      let arrValue:SingleDataSet=[];
      let arrLabel: Label[] = []; 
      let listaSolicitudes: any[] = data.lista;
        listaSolicitudes.forEach(data => {
        //console.log("data  : "+ data['porcentaje']);
        arrValue.push( data['count']);
        arrLabel.push(data['nombre']);
        
        });
        //objarr.push(arrValue);
        
      this.doughnutChartLabels = arrLabel ;// = ['Comercial', 'Mantenimiento', 'T.I', 'Asistentes Logísticos'];
      this.doughnutChartData = arrValue; //= [   [25, 10, 9, 12 ]   ];
    });
  }
  tiempoAtencionPorGestor(request:any){
    this.reporteService.getTiempoAtencionPorGestor(request).then(data => {
      let arrValue:SingleDataSet=[];
      let arrLabel: Label[] = []; 
      let listaTiempos: any[] = data.lista;
        listaTiempos.forEach(data => {
        //console.log("data  : "+ data['avg']);
        arrLabel.push(data['nombre_rol']);
        arrValue.push( data['avg']); 
        
        }); 

      this.doughnutChartLabels2 =arrLabel; 
      this.doughnutChartData2 =arrValue;
    });
  }
  CantidadSolicitudesPorMotivo(request:any){
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
      this.barChartData = [ { data: arrValue , label: 'Cantidad de Motivos', backgroundColor: '#36a2eb'} ]
  
    });
  }
  CantidadSolicitudesPorTipo(request:any){
    this.reporteService.getCantidadSolicitudesPorTipo(request).then(data => {
      let arrValue:SingleDataSet=[];
      let arrLabel: Label[] = []; 
      let listaTiempos: any[] = data.lista;
        listaTiempos.forEach(data => {
        //console.log("data  : "+ data['avg']);
        arrLabel.push(data['nombre']);
        arrValue.push( data['count']); 
        
        }); 
      this.barChartLabels2 = arrLabel;
      this.barChartData2 = [ { data: arrValue , label: 'Cantidad de Solicitudes', backgroundColor: '#36a2eb'} ]
  
    });
  }






  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    console.log(currentUrl);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  filtrarDatos(){
    let gestor = this.filtroForm.get('gestor').value;
    let proceso = this.filtroForm.get('proceso').value;
    let area = this.filtroForm.get('area').value;
    let fecha_inicio = this.filtroForm.get('fecha_inicio').value;
    let fecha_fin = this.filtroForm.get('fecha_fin').value;
    let request = {
      "id_rol":gestor,
      "id_tipo_solicitud":proceso,
      "id_area_usuario":area,
      "fecha_inicio":fecha_inicio,
      "fecha_fin":fecha_fin
    }
    //llamar a los graficos
    this.cantidadSolicitudesArea(request);
    this.loadCardViews(request);
    this.solicitudesPorEstado(request);
    this.tiempoAtencionPorGestor(request);
    this.CantidadSolicitudesPorMotivo(request);
    this.CantidadSolicitudesPorTipo(request);

  }
  limpiar(){
    this.filtroForm.get('gestor').setValue("");
    this.filtroForm.get('proceso').setValue("");
    this.filtroForm.get('area').setValue("");
    this.filtroForm.get('fecha_inicio').setValue("");
    this.filtroForm.get('fecha_fin').setValue("");
  }
}
