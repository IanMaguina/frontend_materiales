import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import {Clasificacion } from '../modelos/clasificacion.interface';


@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {

  constructor(private resourceService: ResourceService) { }

  getListarClasificacion(): Promise<any> {

    let listarClasificacion:Clasificacion[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/clasificacion/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarClasificacion= data;
            resolve(listarClasificacion);
          } else {
            console.log("no Clasificacion encontradas...");
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
