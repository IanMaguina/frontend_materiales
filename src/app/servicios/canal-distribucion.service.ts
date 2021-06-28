import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import {CanalDistribucion } from '../modelos/canal-distribucion.interface'; 

@Injectable({
  providedIn: 'root'
})
export class CanalDistribucionService {

  constructor(private resourceService: ResourceService) { }

  getListarCanalDistribucion(): Promise<any> {

    let listarCanalDistribucion:CanalDistribucion[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/canalDistribucion/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarCanalDistribucion= data;
            resolve(listarCanalDistribucion);
          } else {
            console.log("no Organizacion Ventas encontradas...");
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
