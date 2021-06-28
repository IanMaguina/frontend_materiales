import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import {ClaseInspeccion } from '../modelos/clase-Inspeccion.interface';


@Injectable({
  providedIn: 'root'
})
export class ClaseInspeccionService {

  constructor(private resourceService: ResourceService) { }

  getLlistarClaseInspeccion(): Promise<any> {

    let llistarClaseInspeccion:ClaseInspeccion[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/claseInspeccion/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            llistarClaseInspeccion= data;
            resolve(llistarClaseInspeccion);
          } else {
            console.log("no ClaseInspeccion encontradas...");
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
