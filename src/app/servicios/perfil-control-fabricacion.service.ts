import { Injectable } from '@angular/core';
import { PerfilControlFabricacion } from '../modelos/perfil-control-fabricacion.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilControlFabricacionService {

  constructor(private resourceService:ResourceService) { }


  getListarTodoPerfilControlFabricacionListarTodo(): Promise<any> {

    let listarPerfilControlFabricacion:PerfilControlFabricacion[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/perfilControlFabricacion/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarPerfilControlFabricacion= data;
            resolve(listarPerfilControlFabricacion);
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

  getListarPerfilControlFabricacionxCentroSap(centro_codigo_sap:string): Promise<any> {

    let listarPerfilControlFabricacion:PerfilControlFabricacion[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/perfilControlFabricacion/listarPorCentro?centro_codigo_sap="+centro_codigo_sap).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarPerfilControlFabricacion= data;
            resolve(listarPerfilControlFabricacion);
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
