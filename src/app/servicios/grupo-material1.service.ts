import { Injectable } from '@angular/core';
import { GrupoMaterial1 } from '../modelos/grupo-material1.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoMaterial1Service {

  constructor(private resourceService:ResourceService) { }


  getListarGrupoMaterial1(): Promise<any> {

    let listarGrupoMaterial1:GrupoMaterial1[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/grupoMaterial1/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarGrupoMaterial1= data;
            resolve(listarGrupoMaterial1);
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
