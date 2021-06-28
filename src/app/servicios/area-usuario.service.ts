import { Injectable } from '@angular/core';

import { AreaUsuario } from '../modelos/area.interface';
import { ResourceService } from './resource.service';


@Injectable({
  providedIn: 'root'
})
export class AreaUsuarioService {

  constructor(
    private resourceService: ResourceService
  ) { }


  getListarAreasUsuario(): Promise<any> {
    let areas:AreaUsuario[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/areaUsuario/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            areas= data['lista'];
            resolve(areas);
          } else {
            console.log("no hay areas encontradas...");
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

export interface AreaResponse{
  resultado:number;
  mensaje:string;
  lista:AreaUsuario[];
}
