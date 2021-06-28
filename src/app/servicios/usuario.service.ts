import { Injectable } from '@angular/core';
import { ResourceService} from './resource.service'
import { Usuario } from '../modelos/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private resourceService:ResourceService
  ) { }

  getUsuarioPorCorreo(email:any):Promise<any>{
    let datosUsuario:any;
    return new Promise(
      (resolve, reject)=>{

          this.resourceService.getResource("/usuario/buscarDatosDeEstrategiaDeUsuario?correo="+email).toPromise().then( (data) => {
            if (data && Object.keys(data).length !== 0) {
              datosUsuario= data;
              resolve(datosUsuario);
            } else {
              console.log("no hay datos Usuario encontrado...");
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

  getListarUsuarios(): Promise<any> {
    let usuarios:Usuario[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/usuario/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            usuarios = data;
            resolve(usuarios);
          } else {
            console.log("no hay usuarios encontrados...");
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

  crearUsuario(usuario: Usuario): Promise<any> {

    console.log("adding Usuario..." + JSON.stringify(usuario));
    let respuesta: UserResponse;
    let item = {
      "usuario": usuario.usuario,
      "nombre": usuario.nombre,
      /* "id_perfil_usuario": usuario.perfil_usuario, */
      "id_area_usuario": usuario.area_usuario
    }

    console.log("sending Usuario..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/usuario/crear", item).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  getListarUsuarioPorFiltros(filtros:any): Promise<any> {

    let usuarios: Usuario[] = [];
    //console.log("adding filtros..." + JSON.stringify(filtros));
    // Get data from form
    let dataJson = {};
    let usuario = null;
    let nombre = null;
    let id_perfil_usuario = null;
    let id_area_usuario = null;

    if (filtros['usuario']){
      usuario=filtros['usuario'];
    }
    if (filtros['nombre']){
      nombre=filtros['nombre'];
    }
    if (filtros['id_perfil_usuario']){
      id_perfil_usuario=filtros['id_perfil_usuario'];
    }

    if (filtros['id_area_usuario']){
      id_area_usuario=filtros['id_area_usuario'];
    }

    dataJson={
      usuario:filtros.usuario,
      nombre:nombre,
      id_perfil_usuario:id_perfil_usuario,
      id_area_usuario:id_area_usuario
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/usuario/listarPorFiltros",dataJson).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
        let array: Usuario[];

          if (data && Object.keys(data).length !== 0) {
            array = data['lista'];

           // console.log("tabla json ..." + JSON.stringify(array));
            array.forEach((item) => {
              //console.log("usuarios encontrados..." + JSON.stringify(item));
              usuarios.push({
                id: item.id,
                usuario: item.usuario,
                nombre: item.nombre,
                area_usuario: item.area_usuario,
                perfil_usuario: item.perfil_usuario,
                activo: item.activo
              })

            })
            resolve(usuarios);
          } else {
            console.log("no hay usuarios encontrados...");
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

  actualizarUsuario(usuario: Usuario): Promise<any> {

    //console.log("update Usuario..." + JSON.stringify(usuario));
    let respuesta: UserResponse;
    let item = {
      "id_usuario": usuario.id,
      "usuario": usuario.usuario,
      "nombre": usuario.nombre,
      "id_perfil_usuario": usuario.perfil_usuario,
      "id_area_usuario": usuario.area_usuario
    }

    console.log("sending Usuario..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/usuario/actualizar", item).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  activarUsuario(usuario: Usuario): Promise<any> {

    console.log("activar/desactivar Usuario..." + JSON.stringify(usuario));
    let respuesta: UserResponse;
    let item = {
      "id_usuario": usuario.id,
      "activo": usuario.activo,
    }

    console.log("sending Usuario..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/usuario/actualizarActivo", item).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          respuesta = data;
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }

  

  





}



export interface UserResponse {
  resultado: number;
  mensaje: string;
  id?: number;
  lista?:Usuario[];
}
