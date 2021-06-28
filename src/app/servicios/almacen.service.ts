import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Almacen } from '../modelos/almacen.interface';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  constructor(private resourceService: ResourceService) { }

  getListarAlmacen(centro_codigo_sap:string): Promise<any> {

    let listarAlmacen:Almacen[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/almacen/listar?centro_codigo_sap="+centro_codigo_sap).toPromise().then((data) => {
          //console.log("almacen data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarAlmacen= data;
            resolve(listarAlmacen);
          } else {
            console.log("no Almacen Ventas encontradas...");
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
