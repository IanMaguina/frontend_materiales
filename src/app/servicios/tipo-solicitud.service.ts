import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { TipoSolicitud } from '../modelos/tipo-solicitud.interface';


@Injectable({
  providedIn: 'root'
})
export class TipoSolicitudService {

  constructor(
    private resourceService: ResourceService
  ) { }


  getListarTipoSolicitud(): Promise<any> {

    let listadoTipoSolicitud: TipoSolicitud[] = [];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/tipoSolicitud/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          let array: TipoSolicitud[];
          if (data && Object.keys(data).length !== 0) {
            array = data['lista'];
            array.forEach((item) => {
              console.log("sociedades encontradas..." + JSON.stringify(item));
              listadoTipoSolicitud.push({ id: item.id, nombre: item.nombre })
            })
            resolve(listadoTipoSolicitud);
          } else {
            console.log("no sociedaes encontradas...");
            resolve([]);
          }
        }).catch(
          (error) => {
            console.log("error status=" + error.status + ", msg=" + error.message);
            reject(error);
          }
        );

      }
    );

  }

}
