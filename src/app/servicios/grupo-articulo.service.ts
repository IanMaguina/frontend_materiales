import { Injectable } from '@angular/core';
import { GrupoArticulo } from '../modelos/grupo-articulo.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoArticuloService {

  constructor(private resourceService:ResourceService) { }


  getListarGrupoArticulo(): Promise<any> {

    let listarGrupoArticulo:GrupoArticulo[]=[];

    return new Promise( 
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/grupoArticulo/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarGrupoArticulo= data;
            resolve(listarGrupoArticulo);
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
