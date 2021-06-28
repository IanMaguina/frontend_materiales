import { Injectable } from '@angular/core';
import { GrupoMaterial2 } from '../modelos/grupo-material2.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoMaterial2Service {

  constructor(private resourceService:ResourceService) { }


  getListarGrupoMaterial2(): Promise<any> {

    let listarGrupoMaterial2:GrupoMaterial2[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/grupoMaterial2/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarGrupoMaterial2= data;
            resolve(listarGrupoMaterial2);
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
