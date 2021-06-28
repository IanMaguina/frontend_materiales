import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { EstrategiaRol } from '../modelos/estrategia-rol.interface';
import { Estrategia } from '../modelos/estrategia.interface';
import { UsuarioRol } from '../modelos/usuario-rol.interface';
import { Rol } from '../modelos/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {

  constructor(private resourceService: ResourceService) { }




  getListarUsuarioConRolPorIdEstrategia(estrategia: Estrategia): Promise<any> {
        let roles: UsuarioRolResponse;
        return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/estrategia/listarUsuarioConRolPorIdEstrategia?id_estrategia=" + estrategia.id).toPromise().then((data) => {
          // console.log("roles asignados data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            roles= data;
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

  getListarUsuariosQueNoEstanAsignadosAUnaEstrategiaPorId(estrategia: Estrategia): Promise<any> {

    let roles: EstrategiaRol[] = [];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/estrategia/listarUsuariosQueNoEstanAsignadosAUnaEstrategiaPorId?id_estrategia=" + estrategia.id).toPromise().then((data) => {
          // console.log("roles asignados data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            //roles= data['lista'];
            resolve(data);
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

  crearUsuarioARolDeEstrategia(usuarioRol: UsuarioRol): Promise<any> {

    //console.log("adding Rol a Estrategia..." + JSON.stringify(estrategiaRol));

    let item = {
      "id_usuario": usuarioRol.usuario.id,
      "id_estrategia_rol": usuarioRol.estrategia_rol?.id
  }

    console.log("sending Rol a Estrategia..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/estrategia/agregarUsuarioARolDeEstrategia", item).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  actualizarActivoDeEstrategiaRolUsuario(usuarioRol: UsuarioRol): Promise<any> {

    //console.log("adding Rol a Estrategia..." + JSON.stringify(estrategiaRol));

    let item ={
      "id_usuario": usuarioRol.usuario.id,
      "id_estrategia_rol": usuarioRol.estrategia_rol?.id,
      "activo": null
  }

    console.log("sending Rol a Estrategia..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/estrategia/actualizarActivoDeEstrategiaRolUsuario", item).toPromise().then((data) => {
         /*  if(data.resultado) */
          console.log("response data=" + JSON.stringify(data));
         resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  getListarRolesAnteriores(id_solicitud: number, orden:number): Promise<any> {

    //let roles: any[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/rol/listarRolesAnteriores?id_solicitud="+id_solicitud+"&orden="+orden).toPromise().then((data) => {
          // console.log("roles data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            //roles= data['lista'];
            resolve(data);
          } else {
            console.log("no roles encontrados...");
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
export interface UsuarioRolResponse {
  resultado:number;
  mensaje:string;
  lista:UsuarioRol[];
}
