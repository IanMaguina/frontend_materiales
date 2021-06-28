import { Injectable } from '@angular/core';
import { GrupoEstadisticaMaterial } from '../modelos/grupo-estadistica-material.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoEstadisticaMaterialService {

  constructor(private resourceService:ResourceService) { }


  getListarGrupoEstadisticaMaterial(): Promise<any> {

    let listarGrupoEstadisticaMaterial:GrupoEstadisticaMaterial[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/grupoEstadisticaMat/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarGrupoEstadisticaMaterial= data;
            resolve(listarGrupoEstadisticaMaterial);
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
