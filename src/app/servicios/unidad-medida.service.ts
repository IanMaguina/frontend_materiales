import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { UnidadMedida } from '../modelos/unidad-medida.interface';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {

  constructor(private resourceService: ResourceService) { }

  getListarUnidadMedida(): Promise<any> {

    let listarUnidadMedida:UnidadMedida[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/unidadMedida/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarUnidadMedida= data;
            resolve(listarUnidadMedida);
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
