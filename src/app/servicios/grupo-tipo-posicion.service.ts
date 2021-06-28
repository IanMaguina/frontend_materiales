import { Injectable } from '@angular/core';
import { GrupoTipoPosicion } from '../modelos/grupo-tipo-posicion.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoTipoPosicionService {

  constructor(private resourceService:ResourceService) { }


  getListarGrupoTipoPosicion(): Promise<any> {

    let listarGrupoTipoPosicion:GrupoTipoPosicion[]=[];

    return new Promise( 
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/grupoTipoPosicion/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarGrupoTipoPosicion= data;
            resolve(listarGrupoTipoPosicion);
          } else {
            console.log("no grupoTipoPosicion encontradas...");
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
