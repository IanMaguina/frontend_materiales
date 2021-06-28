import { Injectable } from '@angular/core';
import { GrupoCarga } from '../modelos/grupo-carga.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoCargaService {

  constructor(private resourceService:ResourceService) { }


  getListarGrupoCarga(): Promise<any> {

    let listarGrupoCarga:GrupoCarga[]=[];

    return new Promise( 
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/grupoCarga/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarGrupoCarga= data;
            resolve(listarGrupoCarga);
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
