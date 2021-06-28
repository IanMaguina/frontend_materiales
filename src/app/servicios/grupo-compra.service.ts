import { Injectable } from '@angular/core';
import { GrupoCompra } from '../modelos/grupo-compra.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoCompraService {

  constructor(private resourceService:ResourceService) { }


  getListarGrupoCompra(): Promise<any> {

    let listarGrupoCompra:GrupoCompra[]=[];

    return new Promise( 
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/grupoCompra/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarGrupoCompra= data;
            resolve(listarGrupoCompra);
          } else {
            console.log("no grupo de compra encontradas...");
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
