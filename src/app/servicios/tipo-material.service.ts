import { Injectable } from '@angular/core';
import { TipoMaterial } from '../modelos/tipo-material.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class TipoMaterialService {

  constructor(private resourceService:ResourceService) { }


  getListarTipoMaterial(): Promise<any> {

    let listarTipoMaterial:TipoMaterial[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/tipoMaterial/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarTipoMaterial= data;
            resolve(listarTipoMaterial);
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
