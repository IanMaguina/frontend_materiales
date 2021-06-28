import { Injectable } from '@angular/core';
import { Motivo } from '../modelos/motivo.interface';


import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class MotivoService {

  constructor(
    private resourceService: ResourceService
  ) { }


  getListarMotivos(): Promise<any> {
    let motivos:Motivo[]=[];
    let respuesta: MotivoResponse;
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/motivoRechazo/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            respuesta = data;
            resolve(respuesta);
          } else {
            console.log("no hay perfiles encontrados...");
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
export interface MotivoResponse{
  resultado:number;
  mensaje:string;
  lista:Motivo[];
}