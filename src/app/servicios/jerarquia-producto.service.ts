import { Injectable } from '@angular/core';
import { JerarquiaProducto } from '../modelos/jerarquia-producto.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class JerarquiaProductoService {

  constructor(private resourceService:ResourceService) { }


  getListarJerarquiaProducto(): Promise<any> {

    let listarJerarquiaProducto:JerarquiaProducto[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/jerarquiaProducto/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarJerarquiaProducto= data;
            resolve(listarJerarquiaProducto);
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
