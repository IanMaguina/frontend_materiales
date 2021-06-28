import { Injectable } from '@angular/core';
import { AreaPlanificacion } from '../modelos/area-planificacion.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class AreaPlanificacionService {

  constructor(private resourceService: ResourceService) { }

  getListarAreaPlanificacionPorCentro(centro_codigo_sap: string, almacen_codigo_sap: string): Promise<any> {

    let listarAreaPlanificacion: AreaPlanificacion[] = [];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/areaPlanificacion/listar?centro_codigo_sap=" + centro_codigo_sap + "&almacen_codigo_sap=" + almacen_codigo_sap).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarAreaPlanificacion = data;
            resolve(listarAreaPlanificacion);
          } else {
            console.log("no area planificacion encontradas...");
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
