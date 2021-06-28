import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Sociedad } from '../modelos/sociedad.interface';
import {Nivel1 } from '../modelos/nivel1.interface';
import { Nivel2 } from '../modelos/nivel2.interface';


@Injectable({
  providedIn: 'root'
})
export class Nivel2Service {

  constructor(
    private resourceService: ResourceService
  ) { }


  getListarNivel2(nivel1:Nivel1): Promise<any> {

    let listadoNivel2:Nivel2[]=[];

    return new Promise(
      
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/escenarioNivel2/listarPorIdEscenarioNivel1?id_escenario_nivel1="+nivel1.id).toPromise().then((data) => {
          //console.log("nivel2 data=" + JSON.stringify(data));
          let array:any[];
          if (data && Object.keys(data).length !== 0) {
            array= data['lista'];
            array.forEach((item)=>{
              console.log("Nivel1 encontradas..." + JSON.stringify(item));  
              listadoNivel2.push({id:item.id, codigo:item.codigo,nombre:item.nombre,nivel1:item.escenario_nivel1})
            })
            resolve(listadoNivel2);
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
