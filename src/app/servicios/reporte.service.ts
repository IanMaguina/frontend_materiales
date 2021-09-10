import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';



export interface ReportServiceResponse {
  resultado:number;
  mensaje:string;
  lista?:any[];
  total_solicitudes?:string;
  promedio_atencion?:number;
  porcentaje?:number;
}

 

@Injectable({
  providedIn: 'root'
})

export class ReporteService {

  constructor(private resourceService: ResourceService) { }




  //dashboard
  
  getPorcentajeSolicitudesPorEstadoDashboard(request: any): Promise<any> {
    let dataResponse: ReportServiceResponse;






    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/reporte/porcentajeSolicitudesPorEstadoDashboard",request ).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            dataResponse = data;
            resolve(dataResponse);
          } else {
            console.log("datos no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }
  
  getCantidadSolicitudesPendientes(request: any): Promise<any> {
    let dataResponse: ReportServiceResponse;

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/reporte/cantidadSolicitudesPendientes",request ).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            dataResponse = data;
            resolve(dataResponse);
          } else {
            console.log("datos no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }
  
  getTiempoPromedioAtencion(request: any): Promise<any> {
    let dataResponse: ReportServiceResponse;

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/reporte/tiempoPromedioAtencion",request ).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            dataResponse = data;
            resolve(dataResponse);
          } else {
            console.log("datos no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }
  
  getPorcentajeAvance(request: any): Promise<any> {
    let dataResponse: ReportServiceResponse;

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/reporte/porcentajeAvance",request ).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            dataResponse = data;
            resolve(dataResponse);
          } else {
            console.log("datos no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }
  
  getCantidadSolicitudesPorArea(request: any): Promise<any> {
    let dataResponse: ReportServiceResponse;

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/reporte/cantidadSolicitudesPorArea",request ).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            dataResponse = data;
            resolve(dataResponse);
          } else {
            console.log("datos no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }
  
  getTiempoAtencionPorGestor(request: any): Promise<any> {
    let dataResponse: ReportServiceResponse;

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/reporte/tiempoAtencionPorGestor",request ).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            dataResponse = data;
            resolve(dataResponse);
          } else {
            console.log("datos no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }
  
  getCantidadSolicitudesPorMotivoRechazo(request: any): Promise<any> {
    let dataResponse: ReportServiceResponse;

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/reporte/cantidadSolicitudesPorMotivoRechazo",request ).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            dataResponse = data;
            resolve(dataResponse);
          } else {
            console.log("datos no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }
  
  getCantidadSolicitudesPorTipo(request: any): Promise<any> {
    let dataResponse: ReportServiceResponse;

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/reporte/cantidadSolicitudesPorTipo",request ).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            dataResponse = data;
            resolve(dataResponse);
          } else {
            console.log("datos no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }
  
  getPorcentajeSolicitudesPorEstadoReporte(request: any): Promise<any> {
    let dataResponse: ReportServiceResponse;

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/reporte/porcentajeSolicitudesPorEstadoReporte",request ).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            dataResponse = data;
            resolve(dataResponse);
          } else {
            console.log("datos no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }
  
  getCantidadSolicitudesPorEstado(request: any): Promise<any> {
    let dataResponse: ReportServiceResponse;

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/reporte/cantidadSolicitudesPorEstado",request ).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            dataResponse = data;
            resolve(dataResponse);
          } else {
            console.log("datos no encontrados...");
            resolve([]);
          }
        }
        ).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );
      }
    );
  }








}
