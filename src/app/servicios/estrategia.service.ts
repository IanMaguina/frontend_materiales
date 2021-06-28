import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Estrategia } from '../modelos/estrategia.interface';
import { EstrategiaCorreo } from '../modelos/estrategia-correo.interface';

@Injectable({
  providedIn: 'root'
})
export class EstrategiaService {

  constructor(
    private resourceService: ResourceService
  ) { }

  crearEstrategia(estrategia: Estrategia): Promise<any> {

    console.log("adding estrategia..." + JSON.stringify(estrategia));

    let item = {
      "id_escenario_nivel3": estrategia.escenario_nivel3?.id,
      "id_tipo_solicitud": estrategia.tipo_solicitud?.id
    }

    console.log("sending estrategia..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/estrategia/crear", item).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  getListarEstrategias(data:any): Promise<any> {

    let estrategias: Estrategia[] = [];

    // Get data from form
    let dataJson = {};
    let id_sociedad = null;
    let id_escenario_nivel1 = null;
    let id_escenario_nivel2 = null;
    let id_escenario_nivel3 = null;
    let id_tipo_solicitud = null;

    if (data['id_sociedad']){
      id_sociedad=data['id_sociedad'];
    }    
    if (data['id_escenario_nivel1']){
      id_escenario_nivel1=data['id_escenario_nivel1'];
    }  
    if (data['id_escenario_nivel2']){
      id_escenario_nivel2=data['id_escenario_nivel2'];
    }   
    
    if (data['id_escenario_nivel3']){
      id_escenario_nivel3=data['id_escenario_nivel3'];
    }   

    if (data['id_tipo_solicitud']){
      id_tipo_solicitud=data['id_tipo_solicitud'];
    }  

    dataJson={
      id_sociedad:id_sociedad,
      id_escenario_nivel1:id_escenario_nivel1,
      id_escenario_nivel2:id_escenario_nivel2,
      id_escenario_nivel3:id_escenario_nivel3,
      id_tipo_solicitud:id_tipo_solicitud
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/estrategia/listarPorFiltros",dataJson).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          let array: Estrategia[];
          if (data && Object.keys(data).length !== 0) {
            array = data['lista'];
            array.forEach((item) => {
              //console.log("Estrategias encontradas..." + JSON.stringify(item));
              estrategias.push({ id: item.id, escenario_nivel3: item.escenario_nivel3, tipo_solicitud: item.tipo_solicitud })
            })
            resolve(estrategias);
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

  

  getListarCorreoEstrategia(id_estrategia:any): Promise<any> {

    let correos: EstrategiaCorreo[] = [];

    let item = parseInt(id_estrategia);

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/estrategia/listarEstrategiaCorreo?id_estrategia="+item).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data.resultado == 1) {
            correos = data.lista;
            
            resolve(correos);
          } else {
            console.log("no correos encontrados...");
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
  addCorreoEstrategia(correo:any): Promise<any> {

    let response: EstrategiaCorreoResponse;

    let item = {
      "correo":correo.correo,
      "id_estrategia":parseInt(correo.id_estrategia)
    }
    console.log("sending data : "+JSON.stringify(item));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/estrategia/crearEstrategiaCorreo",item).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
            response = data;
            resolve(response);
           
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
  
  borrarCorreoEstrategia(id_correo:any): Promise<any> {

    let response: EstrategiaCorreoResponse;

    let item = {
      "id":parseInt(id_correo),
    }

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/estrategia/eliminarPorId",item).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          response = data;
          resolve(response);
           
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
export interface EstrategiaCorreoResponse{
  resultado:number;
  mensaje:string;
  id?:number;
}