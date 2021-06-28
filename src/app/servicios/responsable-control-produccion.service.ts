import { Injectable } from '@angular/core';
import { ResponsableControlProduccion } from '../modelos/responsable-control-produccion.interface';
import { ResourceService } from './resource.service'


@Injectable({
  providedIn: 'root'
})
export class ResponsableControlProduccionService {

  constructor(private resourceService:ResourceService) { }


  getListarTodoResponsableControlProduccion(): Promise<any> {

    let listarResponsableControlProduccion:ResponsableControlProduccion[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/responsableControlProduccion/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarResponsableControlProduccion= data;
            resolve(listarResponsableControlProduccion);
          } else {
            console.log("no Unidad de medida encontradas...");
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

  getListarResponsableControlProduccionxCentroSap(centro_codigo_sap:string): Promise<any> {

    let listarResponsableControlProduccion:ResponsableControlProduccion[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/responsableControlProduccion/listarPorCentro?centro_codigo_sap="+centro_codigo_sap).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarResponsableControlProduccion= data;
            resolve(listarResponsableControlProduccion);
          } else {
            console.log("no Unidad de medida encontradas...");
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
