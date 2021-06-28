import { Injectable } from '@angular/core';
import { CategoriaValoracion } from '../modelos/categoria-valoracion.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaValoracionService {

  constructor(private resourceService:ResourceService) { }

  getListarCategoriaValoracionPorTipoMaterial(tipoMaterial:string): Promise<any> {

    let listarCategoriaValoracion:CategoriaValoracion[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/categoriaValoracion/listarPorTipoMaterial?tipo_material="+tipoMaterial).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarCategoriaValoracion= data;
            resolve(listarCategoriaValoracion);
          } else {
            console.log("no categoria de valoracion encontradas...");
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

  getListarCategoriaValoracion(): Promise<any> {

    let listarCategoriaValoracion:CategoriaValoracion[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/categoriaValoracion/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarCategoriaValoracion= data;
            resolve(listarCategoriaValoracion);
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
