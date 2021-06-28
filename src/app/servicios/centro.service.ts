import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Centro } from '../modelos/centro.interface';


@Injectable({
  providedIn: 'root'
})
export class CentroService {

  constructor(private resourceService: ResourceService) { }

  getListarCentroPorSociedad(codigo_sociedad:string): Promise<any> {

    let listarCentro:Centro[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/centro/listar?codigo_sociedad="+codigo_sociedad).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarCentro= data;
            resolve(listarCentro);
          } else {
            console.log("no Centros encontradas...");
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
