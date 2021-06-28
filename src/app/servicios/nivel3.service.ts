import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Nivel2 } from '../modelos/nivel2.interface';
import { Nivel3 } from '../modelos/nivel3.interface';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class Nivel3Service {
  userInfo: any;
  constructor(private autenticacionService: AutenticacionService,
    private resourceService: ResourceService,

  ) {
    this.userInfo = autenticacionService.getUserInfo();
  }


  getListarNivel3(nivel2: Nivel2): Promise<any> {
    let listadoNivel3: Nivel3[] = [];
    return new Promise(

      (resolve, reject) => {
        this.resourceService.getResource("/maestro/escenarioNivel3/listarPorIdEscenarioNivel2?id_escenario_nivel2=" + nivel2.id).toPromise().then((data) => {
          //console.log("nivel2 data=" + JSON.stringify(data));
          let array: any[];
          if (data && Object.keys(data).length !== 0) {
            array = data['lista'];
            array.forEach((item) => {
              console.log("Nivel1 encontradas..." + JSON.stringify(item));
              listadoNivel3.push({ id: item.id, codigo: item.codigo, nombre: item.nombre, nivel2: item.escenario_nivel2 })
            })
            resolve(listadoNivel3);
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

  getListarNivel3Solicitud(): Promise<any> {
    let listadoNivel3: any = {};
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/escenarioNivel3/listarTodo").toPromise().then((data) => {
          //console.log("nivel2 data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listadoNivel3 = data;
            resolve(listadoNivel3);
          } else {
            console.log("no Nivel 3 encontradas...");
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

  getListarNivel3SolicitudPorUsuario(params: any): Promise<any> {
    let id_usuario = this.userInfo.id;
    let id_rol = params.id_rol;
    let id_tipo_solicitud = params.id_tipo_solicitud;
    let codigo_escenario_nivel1=params.codigo_escenario_nivel1;
    console.log("nivel3 data URL =" + "/maestro/escenarioNivel3/listarPorFiltros?id_usuario=" + id_usuario + "&id_rol=" +id_rol +"&id_tipo_solicitud=" + id_tipo_solicitud+"&codigo_escenario_nivel1=" + codigo_escenario_nivel1);
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/escenarioNivel3/listarPorFiltros?id_usuario=" + id_usuario + "&id_rol=" +id_rol +"&id_tipo_solicitud=" + id_tipo_solicitud+"&codigo_escenario_nivel1=" + codigo_escenario_nivel1).toPromise().then((data) => {
          console.log("nivel3 data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no Nivel 3 encontradas...");
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

  getListarNivel3SolicitudPorId(id_nivel3: number): Promise<any> {
 
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/escenarioNivel3/listarPorIdEscenarioNivel3?id_escenario_nivel3=" + id_nivel3).toPromise().then((data) => {
          //console.log("nivel3 data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no Nivel 3 encontradas...");
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

  getListarNivel3SolicitudPorIdSociedad(id_sociedad: number): Promise<any> {
 
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/escenarioNivel3/listarPorIdSociedad?id_sociedad=" + id_sociedad).toPromise().then((data) => {
          //console.log("nivel3 data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            console.log("no Nivel 3 encontradas...");
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
