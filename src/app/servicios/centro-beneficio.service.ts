import { Injectable } from '@angular/core';
import { CentroBeneficio } from '../modelos/centro-beneficio.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class CentroBeneficioService {

  constructor(private resourceService: ResourceService) { }

  //http://127.0.0.1:8080/centroBeneficio/listarPorSociedad?codigo_sociedad=6012

  getListarCentroBeneficioPorSociedad(codigo_sociedad:string): Promise<any> {

    let listarCentro:CentroBeneficio[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/centroBeneficio/listarPorSociedad?codigo_sociedad="+codigo_sociedad).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarCentro= data;
            resolve(listarCentro);
          } else {
            console.log("no Centros Beneficios encontradas...");
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

  getListarCentroBeneficio(): Promise<any> {

    let listarCentro:CentroBeneficio[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/centroBeneficio/listarTodo").toPromise().then((data) => {
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
