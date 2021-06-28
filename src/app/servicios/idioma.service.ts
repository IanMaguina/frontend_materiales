import { Injectable } from '@angular/core';
import { Idioma } from '../modelos/idioma.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  constructor(private resourceService:ResourceService) { }


  getListarIdioma(): Promise<any> {

    let listarIdioma:Idioma[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/idioma/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarIdioma= data;
            resolve(listarIdioma);
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
