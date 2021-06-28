import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Sociedad } from '../modelos/sociedad.interface';

@Injectable({
  providedIn: 'root'
})
export class SociedadService {

  constructor(
    private resourceService: ResourceService
  ) { }


  getListarSociedades(): Promise<any> {

    let sociedades:Sociedad[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/sociedad/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            sociedades= data['lista'];
            resolve(sociedades);
          } else {
            console.log("no sociedaes encontradas...");
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
