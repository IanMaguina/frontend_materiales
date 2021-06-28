import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Sociedad } from '../modelos/sociedad.interface';
import {Nivel1 } from '../modelos/nivel1.interface';


@Injectable({
  providedIn: 'root'
})
export class Nivel1Service {

  constructor(
    private resourceService: ResourceService
  ) { }


  getListarNivel1(sociedad:Sociedad): Promise<any> {

    let listadoNivel1:Nivel1[]=[];

    return new Promise(
      
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/escenarioNivel1/listarPorIdSociedad?id_sociedad="+sociedad.id).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          let array:Nivel1[];
          if (data && Object.keys(data).length !== 0) {
            array= data['lista'];
            array.forEach((item)=>{
              console.log("Nivel1 encontradas..." + JSON.stringify(item));  
              listadoNivel1.push({id:item.id, codigo:item.codigo,nombre:item.nombre,sociedad:item.sociedad})
            })
            resolve(listadoNivel1);
          } else {
            console.log("no Nivel1 encontradas...");
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
