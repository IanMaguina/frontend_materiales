import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import {EstrategiaRol } from '../modelos/estrategia-rol.interface';
import { Estrategia } from '../modelos/estrategia.interface';


@Injectable({
  providedIn: 'root'
})
export class RolEstrategiaService {

  constructor(
    private resourceService: ResourceService
  ) { }


  getListarRolesQueFaltanEnEstrategia(estrategia:Estrategia): Promise<any> {

    let roles:EstrategiaRol[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/estrategia/listarRolesQueFaltanEnEstrategia?id_estrategia="+estrategia.id).toPromise().then((data) => {
          //console.log("roles data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            roles= data['lista'];
            resolve(roles);
          } else {
            console.log("no roles encontradss...");
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

  getListarRolesAsignadosxEstrategia(estrategia:Estrategia): Promise<any> {

    let roles:EstrategiaRol[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/estrategia/listarEstrategiaRolYRolPorId?id_estrategia="+estrategia.id).toPromise().then((data) => {
         // console.log("roles asignados data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            roles= data['lista'];
            resolve(roles);
          } else {
            console.log("no roles asignados encontradss...");
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

  crearRolEstrategia(estrategiaRol: EstrategiaRol): Promise<any> {

    console.log("adding Rol a Estrategia..." + JSON.stringify(estrategiaRol));

    let item = {
      "orden": estrategiaRol.orden,
      "id_rol": estrategiaRol.rol.id,
      "id_estrategia": estrategiaRol.estrategia?.id
  }

    console.log("sending Rol a Estrategia..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/estrategia/crearEstrategiaRol", item).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  actualizarListadoRolAsignadoxEstrategia(estrategiaRol: any): Promise<any> {

    console.log("adding Rol a Estrategia..." + JSON.stringify(estrategiaRol));


    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/estrategia/actualizarRolesDeEstrategia", estrategiaRol).toPromise().then((data) => {

          //console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  actualizarActivoDeEstrategiaRol(item: any): Promise<any> {

    console.log("sending Rol a Estrategia..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/estrategia/actualizarActivoDeEstrategiaRol", item).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  getListarRolesActivosDeEstrategiaSinUsuarioExceptoSolicitantePorId(estrategia: Estrategia): Promise<any> {

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/estrategia/listarRolesActivosDeEstrategiaSinUsuarioExceptoSolicitantePorId?id_estrategia=" + estrategia.id).toPromise().then((data) => {
          //console.log("roles data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            resolve(data);
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
