import { Injectable } from '@angular/core';
import { GrupoTransporte } from '../modelos/grupo-transporte.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoTransporteService {

  constructor(private resourceService:ResourceService) { }


  getListarGrupoTransporte(): Promise<any> {

    let listarGrupoTransporte:GrupoTransporte[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/grupoTransporte/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarGrupoTransporte= data;
            resolve(listarGrupoTransporte);
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
