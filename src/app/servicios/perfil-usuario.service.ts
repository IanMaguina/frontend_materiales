import { Injectable } from '@angular/core';

import { PerfilUsuario } from '../modelos/perfil.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {

  constructor(
    private resourceService: ResourceService
  ) { }

  getListarPerfilesUsuario(): Promise<any> {
    let perfiles:PerfilUsuario[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/perfilUsuario/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            perfiles= data['lista'];
            resolve(perfiles);
          } else {
            console.log("no hay perfiles encontrados...");
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

  getListarPerfilesUsuarioPendientes(id_usuario:any): Promise<any> {
    let perfiles:PerfilUsuario[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/usuario/listarPerfilesPendientes?id_usuario="+id_usuario).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            perfiles= data['lista'];
            resolve(perfiles);
          } else {
            console.log("no hay perfiles encontrados...");
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


  asignarPerfilUsuario(form: any): Promise<any> {

    console.log("adding Usuario..." + JSON.stringify(form));
    let respuesta: PerfilUsuarioResponse;
    let item = {
      "id_usuario": form.id_usuario,
      "id_perfil_usuario": form.id_perfil_usuario
    }

    console.log("sending Perfil..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/usuario/asignarPerfilAUsuario", item).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }


  getListaPerfilesUsuario(id_usuario:any):Promise<any>{
    let perfiles:PerfilUsuario[]=[];
    return new Promise(
      (resolve, reject)=>{

          this.resourceService.getResource("/usuario/listarPerfiles?id_usuario="+id_usuario).toPromise().then( (data) => {
            if (data && Object.keys(data).length !== 0) {
              perfiles= data;
              resolve(perfiles);
            } else {
              console.log("no hay perfiles de Usuario encontrados...");
              resolve([]);
            }
          }
        ).catch(
          (error)=>{
            console.log("error status=" + error.status +", msg="+error.message);
            reject(error);
          }
        );

      }
    );

  }

  desasignarPerfilUsuario(form: any): Promise<any> {

    console.log("sending Item para eliminar Perfil..." + JSON.stringify(form));
    let respuesta: PerfilUsuarioResponse;
    let item = {
      "id_usuario": form.id_usuario,
      "id_perfil_usuario": form.id_perfil_usuario
    }
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.deleteResource("/solicitud/materialSolicitud/eliminarMaterial",id_material_solicitud).toPromise().then((res) => {
        this.resourceService.postResource("/usuario/eliminarPerfilDeUsuario", item).toPromise().then((res) => {
          console.log("response data=" + JSON.stringify(res));
          respuesta = res;
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }



}
export interface PerfilUsuarioResponse{
  resultado:number;
  mensaje:string;
  lista:PerfilUsuario[];
}
