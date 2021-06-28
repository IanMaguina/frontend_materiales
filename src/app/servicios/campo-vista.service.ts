import { Injectable } from '@angular/core';
import { CampoVista } from '../modelos/campo-vista.interface';
import { ResourceService } from './resource.service';
@Injectable({
  providedIn: 'root'
})
export class CampoVistaService {
  constructor(private resourceService:ResourceService) { }


  getListarCampoVista(): Promise<any> {

    let listarCampoVista:CampoVista[]=[];

    return new Promise( 
      (resolve, reject) => {
        this.resourceService.getResource("/campo/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data.resultado==1) {
            listarCampoVista = data['lista'];
            resolve(listarCampoVista);
          } else {
            console.log("anexo no encontrado...");
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
