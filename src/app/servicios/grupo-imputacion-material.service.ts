import { Injectable } from '@angular/core';
import { GrupoImputacionMaterial } from '../modelos/grupo-imputacion-material.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoImputacionMaterialService {

  constructor(private resourceService:ResourceService) { }


  getListarGrupoImputacionMaterial(): Promise<any> {

    let listarGrupoImputacionMaterial:GrupoImputacionMaterial[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/grupoImputacionMaterial/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarGrupoImputacionMaterial= data;
            resolve(listarGrupoImputacionMaterial);
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
