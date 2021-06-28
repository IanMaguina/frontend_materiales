import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Estado } from '../modelos/estado.interface';


@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudService {

  constructor(private resourceService: ResourceService) { }

  getListarEstado(): Promise<any> {

    let listarEstado:Estado[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/estadoSolicitud/listar").toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            listarEstado= data;
            resolve(listarEstado);
          } else {
            console.log("no estados encontradas...");
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
