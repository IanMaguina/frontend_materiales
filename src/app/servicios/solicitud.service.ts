import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import { Sociedad } from '../modelos/sociedad.interface';
import { SolicitudCabecera } from '../modelos/solicitud-cabecera';
import { AutenticacionService } from './autenticacion.service';
import { AprobadorSolicitud } from '../modelos/aprobadorSolicitud.interface';
import { elementAt } from 'rxjs/operators';
import { CodigoMaterialSap } from '../modelos/codigoMaterialSap.interface';
import { Anexo } from '../modelos/anexo.interface';
import { AnexoMaterial } from '../modelos/anexo-material.interface';

export interface SolicitudResponse {
  resultado: number;
  mensaje: string;
  url?: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  userInfo: any;
  constructor(private resourceService: ResourceService,
    private autenticacionService: AutenticacionService
  ) {
    this.userInfo = autenticacionService.getUserInfo();

  }

  getVistaPortalReglas(id_escenario_nivel3: number, id_rol: number, id_tipo_solicitud: number): Promise<any> {
    let vistaPortalReglas: any[] = [];
    //console.log("getVistaPortalReglas--->"+"/vistaPortal/listar?id_escenario_nivel3=" + id_escenario_nivel3 + "&id_rol=" + id_rol + "&id_tipo_solicitud=" + id_tipo_solicitud)
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/vistaPortal/listar?id_escenario_nivel3=" + id_escenario_nivel3 + "&id_rol=" + id_rol + "&id_tipo_solicitud=" + id_tipo_solicitud).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            vistaPortalReglas = data;
            resolve(vistaPortalReglas);
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

  getListadoCampoReglas(id_escenario_nivel3: number, id_rol: number, id_tipo_solicitud: number): Promise<any> {
    let listadoCamposReglas: any[] = [];
    let url = "/campo/listar?id_escenario_nivel3=" + id_escenario_nivel3 + "&id_rol=" + id_rol + "&id_tipo_solicitud=" + id_tipo_solicitud;
    console.log(url);
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/campo/listar?id_escenario_nivel3=" + id_escenario_nivel3 + "&id_rol=" + id_rol + "&id_tipo_solicitud=" + id_tipo_solicitud).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            listadoCamposReglas = data;
            resolve(listadoCamposReglas);
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

  getListadoDiccionarioNombres(): Promise<any> {
    let listadoCamposReglas: any[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/campo/listarDiccionarioDeNombres?id_escenario_nivel3=1&id_rol=1&id_tipo_solicitud=1").toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            listadoCamposReglas = data;
            resolve(listadoCamposReglas);
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

  obtenerSolicitud(params: any): Promise<any> {
    let solicitud: any;
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/obtenerDatosDeSolicitud", params).toPromise().then((data) => {
          if (data) {
            solicitud = data;
            resolve(solicitud);
          } else {
            console.log("no sociedaes encontradas...");
            resolve({});
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

  agregarSolicitud(cabecera: any): Promise<any> {
    console.log("adding Cabecera Solicitud..." + JSON.stringify(cabecera));

    let item = {
      "id_usuario": this.userInfo.id,
      "descripcion_corta": cabecera.descripcion_corta,
      "id_escenario_nivel3": cabecera.id_escenario_nivel3,
      "id_tipo_solicitud": cabecera.id_tipo_solicitud,
      "id_rol": cabecera.id_rol,
    }

    console.log("sending Cabecera Solicitud..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/solicitud/crearCabecera", item).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  actualizarSolicitud(cabecera: any): Promise<any> {

    console.log("actualizando Cabecera Solicitud..." + JSON.stringify(cabecera));
    let usuarioId = 1;
    let body = {
      "id_usuario": this.userInfo.id,
      "descripcion_corta": cabecera.descripcion_corta,
      "id_escenario_nivel3": cabecera.id_escenario_nivel3,
      "id_solicitud": cabecera.id_solicitud
    }

    console.log("sending Cabecera Solicitud..." + JSON.stringify(body));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/solicitud/actualizarCabecera", body).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  aprobarSolicitud(data: any): Promise<any> {

    console.log("enviando Solicitud..." + JSON.stringify(data));
    let body = {
      "id_usuario": this.userInfo.id,
      "id_solicitud": data.id_solicitud,
      "id_rol": data.id_rol,
      "aprobado": true,
      "motivo": data.motivo
    }

    console.log("sending aprobacion Solicitud..." + JSON.stringify(body));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/solicitud/aprobacionRechazoSolicitud", body).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  agregarMaterial(params: any): Promise<any> {

    console.log("sending Item Detalle Solicitud..." + JSON.stringify(params));
    let id_solicitud = params.id_solicitud;
    let id_rol = params.id_rol;
    let data = { material: params.material };
    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/solicitud/" + id_solicitud + "/materialSolicitud/agregarMaterial?id_rol=" + id_rol, data).toPromise().then((data) => {

          console.log("response data arsa=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }


  eliminarMaterial(params: any): Promise<any> {

    console.log("sending Item para eliminar Material..." + JSON.stringify(params));
    let id_solicitud = params.id_solicitud;
    let id_material_solicitud = params.id_material_solicitud
    let data = {};
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.deleteResource("/solicitud/materialSolicitud/eliminarMaterial",id_material_solicitud).toPromise().then((res) => {
        this.resourceService.postResource("/solicitud/" + id_solicitud + "/materialSolicitud/" + id_material_solicitud + "/eliminarMaterial", data).toPromise().then((res) => {
          console.log("response data=" + JSON.stringify(res));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  actualizarMaterial(params: any): Promise<any> {

    console.log("sending Item actualizar material..." + JSON.stringify(params));
    let id_solicitud = params.id_solicitud;
    let id_material_solicitud = params.id_material_solicitud;
    let id_rol = params.id_rol;
    let data = { material: params.material };
    return new Promise(
      (resolve, reject) => {

        this.resourceService.putResource("/solicitud/" + id_solicitud + "/materialSolicitud/" + id_material_solicitud + "/actualizarMaterial?id_rol=" + id_rol, data).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  cargaMasiva(params: any): Promise<any> {
    let id_solicitud = params.id_solicitud;
    let id_rol = params.id_rol;
    let data = params.materiales;
    let id_usuario = this.userInfo.id
    //data = { "materiales": [{ "campos": [{ "codigo_interno": "denominacion", "valor": "nuevo 6" }, { "codigo_interno": "unidad_medida_base", "valor": "KG" }, { "codigo_interno": "peso_bruto", "valor": 111 }, { "codigo_interno": "unidad_medida_peso", "valor": "KG" }, { "codigo_interno": "centro", "valor": "2010" }, { "codigo_interno": "organizacion_ventas", "valor": "3000" }, { "codigo_interno": "canal_distribucion", "valor": "01" }, { "codigo_interno": "almacen", "valor": "2061" }, { "codigo_interno": "clase", "valores": [{ "valor": "00302" }] }] }] }
    console.log("sending data actualizar material..." + JSON.stringify(data));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + id_solicitud + "/materialSolicitud/agregarMateriales?id_usuario=" + id_usuario, data).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }


  devolverRolUsuario() {

  }
  getListadoMateriales(id_solicitud: number, id_rol: number): Promise<any> {
    let listadoMateriales: any[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/solicitud/" + id_solicitud + "/materialSolicitud/listarMateriales?id_rol=" + id_rol).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            listadoMateriales = data;
            resolve(listadoMateriales);
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

  contarMisPendientes(params: any): Promise<any> {

    let body: any = {
      "id_escenario_nivel1": params.id_escenario_nivel1,
      "id_usuario": this.userInfo.id,
      "id_estado_solicitud": params.id_estado_solicitud,
      "id_escenario_nivel3": params.id_escenario_nivel3,
      "id_tipo_solicitud": params.id_tipo_solicitud,
      "fecha_inicio": params.fecha_inicio,
      "fecha_fin": params.fecha_fin,
      "cantidad_filas": params.cantidad_filas,
      "pagina": params.pagina
    }
    console.log('SUPER BODY-->' + JSON.stringify(body));
    let contarFilasPorFiltros: any[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/contarMisPendientes", body).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            contarFilasPorFiltros = data;
            resolve(contarFilasPorFiltros);
          } else {
            console.log("no contarFilasPorFiltros encontradas...");
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

  contarMisSolicitudes(params: any): Promise<any> {

    let body: any = {
      "id_escenario_nivel1": params.id_escenario_nivel1,
      "id_usuario": this.userInfo.id,
      "id_estado_solicitud": params.id_estado_solicitud,
      "id_escenario_nivel3": params.id_escenario_nivel3,
      "id_tipo_solicitud": params.id_tipo_solicitud,
      "fecha_inicio": params.fecha_inicio,
      "fecha_fin": params.fecha_fin,
      "cantidad_filas": params.cantidad_filas,
      "pagina": params.pagina
    }
    console.log(JSON.stringify(body));
    let contarFilasPorFiltros: any[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/contarMisSolicitudes", body).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            contarFilasPorFiltros = data;
            resolve(contarFilasPorFiltros);
          } else {
            console.log("no contarFilasPorFiltros encontradas...");
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


  buscarMisPendientes(filtro: any): Promise<any> {

    let params: any = {
      "id_escenario_nivel1": filtro.id_escenario_nivel1,
      "id_usuario": this.userInfo.id,
      "id_estado_solicitud": filtro.id_estado_solicitud,
      "id_escenario_nivel3": filtro.id_escenario_nivel3,
      "id_tipo_solicitud": filtro.id_tipo_solicitud,
      "fecha_inicio": filtro.fecha_inicio,
      "fecha_fin": filtro.fecha_fin,
      "cantidad_filas": filtro.cantidad_filas,
      "pagina": filtro.pagina
    }
    let listadoSolicitudes: any[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/buscarMisPendientes", params).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            listadoSolicitudes = data;
            resolve(listadoSolicitudes);
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

  buscarMisSolicitudes(filtro: any): Promise<any> {

    let params: any = {
      "id_escenario_nivel1": filtro.id_escenario_nivel1,
      "id_usuario": this.userInfo.id,
      "id_estado_solicitud": filtro.id_estado_solicitud,
      "id_escenario_nivel3": filtro.id_escenario_nivel3,
      "id_tipo_solicitud": filtro.id_tipo_solicitud,
      "fecha_inicio": filtro.fecha_inicio,
      "fecha_fin": filtro.fecha_fin,
      "cantidad_filas": filtro.cantidad_filas,
      "pagina": filtro.pagina
    }
    let listadoSolicitudes: any[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/buscarMisSolicitudes", params).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            listadoSolicitudes = data;
            resolve(listadoSolicitudes);
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


  getRolesAnteriores(id_solicitud: any, orden: any): Promise<any> {
    let roles: any[] = [];
    console.log("id solicitud en el servicio : " + id_solicitud);
    console.log(" orden en el servicio : " + orden);
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/rol/listarRolesAnteriores?id_solicitud=" + id_solicitud + "&orden=" + orden).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            roles = data;
            resolve(roles);
          } else {
            console.log("no roles previos encontrados...");
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

  listarSeguimiento(id_solicitud: number): Promise<any> {
    let seguimiento: any[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/solicitud/listarSeguimiento?id_solicitud=" + id_solicitud).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            seguimiento = data;
            resolve(seguimiento);
          } else {
            console.log("no hay seguimiento...");
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

  listarFlujo(id_solicitud: number): Promise<any> {
    let flujo: any[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/solicitud/listarFlujo?id_solicitud=" + id_solicitud).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            flujo = data;
            resolve(flujo);
          } else {
            console.log("no hay flujo...");
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

  estadoActual(id_solicitud: number): Promise<any> {
    //let flujo: AprobadorSolicitud[] = [];
    console.log("url estadoactual-->" + "/solicitud/listarFlujo?id_solicitud=" + id_solicitud)
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/solicitud/listarFlujo?id_solicitud=" + id_solicitud).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            let flujo: AprobadorSolicitud[] = data['lista'];

            flujo.forEach((element: AprobadorSolicitud) => {
              if (element.esta_aqui) {
                resolve(element);
              }
            });
          } else {
            console.log("no hay flujo...");
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

  estadoADerivar(id_solicitud: number, id_rol_derivado: number): Promise<any> {
    //let flujo: AprobadorSolicitud[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/solicitud/listarFlujo?id_solicitud=" + id_solicitud).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            let flujo: AprobadorSolicitud[] = data['lista'];

            flujo.forEach((element: AprobadorSolicitud) => {
              if (element.id_rol_real == id_rol_derivado) {
                resolve(element);
              }
            });
          } else {
            console.log("no hay flujo...");
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

  ordenADerivar(id_solicitud: number, ordenActual: number): Promise<any> {
    let orden = ordenActual - 1;
    //let flujo: AprobadorSolicitud[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/solicitud/listarFlujo?id_solicitud=" + id_solicitud).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            let flujo: AprobadorSolicitud[] = data['lista'];

            flujo.forEach((element: AprobadorSolicitud) => {
              if (element.orden == orden) {
                resolve(element);
              }
            });
          } else {
            console.log("no hay flujo...");
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

  //agregado por ian 07/04

  anularSolicitud(params: any): Promise<any> {
    let res: any;
    console.log("enviando Solicitud..." + JSON.stringify(params));
    let body = {
      "id_usuario": this.userInfo.id,
      "id_solicitud": params.id_solicitud,
      "id_rol": params.id_rol,
    }

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/anularSolicitud", body).toPromise().then((data) => {
          if (data) {
            res = data;
            resolve(res);
          } else {
            console.log("s:no se anuló la solicitud...");
            resolve({});
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

  rechazarSolicitud(data: any): Promise<any> {
    let respuesta: SolicitudResponse;
    console.log("enviando Solicitud..." + JSON.stringify(data));
    let body = {
      "id_usuario": this.userInfo.id,
      "id_solicitud": data.id_solicitud,
      "id_rol": data.id_rol,
      "aprobado": false,
      "motivo": data.motivo,
      "id_motivo_rechazo": data.id_motivo_rechazo
    }

    console.log("sending aprobacion Solicitud..." + JSON.stringify(body));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/solicitud/aprobacionRechazoSolicitud", body).toPromise().then((data) => {
          respuesta = data;
          console.log("response data=" + JSON.stringify(data));
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  rechazarSolicitudADemanda(data: any): Promise<any> {
    let respuesta: SolicitudResponse;
    console.log("enviando Solicitud..." + JSON.stringify(data));
    let body = {
      "id_usuario": this.userInfo.id,
      "id_solicitud": data.id_solicitud,
      "id_rol": data.id_rol,
      "aprobado": false,
      "motivo": data.motivo,
      "id_motivo_rechazo": data.id_motivo_rechazo,
      "aprobador_derivado": data.aprobador_derivado
    }

    console.log("sending aprobacion Solicitud..." + JSON.stringify(body));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/solicitud/rechazoSolicitudADemanda", body).toPromise().then((data) => {
          respuesta = data;
          console.log("response data=" + JSON.stringify(data));
          resolve(respuesta);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  listadoDenominacion(denominacion: String): Promise<any> {
    let listadoDenominacion: any[] = [];
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/materialSolicitud/validarDenominacion?denominacion=" + denominacion).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            listadoDenominacion = data;
            resolve(listadoDenominacion);
          } else {
            console.log("no listado encontradas...");
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

  existeDenominacionSAP(denominacion: String): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/materialSolicitud/existeDenominacion?denominacion=" + denominacion).toPromise().then((data) => {
          resolve(data.existe);
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

  existeDenominacionDb(denominacion: String): Promise<any> {
    console.log("url-->" + "/materialSolicitud/existeDenominacionEnDb?denominacion=" + denominacion)
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/materialSolicitud/existeDenominacionEnDb?denominacion=" + denominacion).toPromise().then((data) => {
          console.log("existeDenominacionDb existe.-->" + data)
          resolve(data);
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

  existeDenominacionDbPadreAmpliacion(id_solicitud: number, denominacion: String, centro_codigo_sap: String, almacen_codigo_sap: String): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/materialSolicitud/existePadreAmpliacion?id_solicitud=" + id_solicitud + "&denominacion=" + denominacion + "&centro_codigo_sap=" + centro_codigo_sap + "&almacen_codigo_sap=" + almacen_codigo_sap).toPromise().then((data) => {
          console.log("existeDenominacionDbPadreAmpliacion existe.-->" + data)
          resolve(data);
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

  esPadre(id_solicitud: number, denominacion: String): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/materialSolicitud/esPadre?id_solicitud=" + id_solicitud + "&denominacion=" + denominacion).toPromise().then((data) => {
          console.log("esPadre existe.-->" + data)
          resolve(data);
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

  existeHijosAmpliacion(id_solicitud: number, denominacion: String, centro_codigo_sap: String, almacen_codigo_sap: String): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/materialSolicitud/existeHijosAmpliacion?id_solicitud=" + id_solicitud + "&denominacion=" + denominacion + "&centro_codigo_sap=" + centro_codigo_sap + "&almacen_codigo_sap=" + almacen_codigo_sap).toPromise().then((data) => {
          console.log("existeDenominacionDbPadreAmpliacion existe.-->" + data)
          resolve(data);
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

  enviarSAP(id_solicitud: number, tip_pm: string): Promise<any> {
    let envio: any;
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/solicitud/enviarSAP/" + id_solicitud + "/?tip_pm=" + tip_pm).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            envio = data;
            resolve(envio);
          } else {
            console.log("no se envio a SAP...");
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


  obtenerUrlMaterial(id_material_solicitud: any): Promise<any> {
    let solicitud: SolicitudResponse;

    let item = {
      "id_material_solicitud": id_material_solicitud
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/obtenerUrlAnexoMaterial", item).toPromise().then((data) => {
          if (data) {
            solicitud = data;
            resolve(solicitud);
          } else {
            console.log("anexo no encontrado...");
            resolve({});
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

  getListaAnexoSolicitud(id_solicitud: string): Promise<any> {
    let listadoAnexos: Anexo[] = [];
    let item = {
      "id_solicitud": id_solicitud
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/obtenerAllUrlAnexoSolicitud", item).toPromise().then((data) => {
          if (data.resultado !== 0) {
            listadoAnexos = data.lista;
            resolve(listadoAnexos);
          } else {
            console.log("no listado encontradas...");
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

  getListaAnexoMaterial(id_material_solicitud: any): Promise<any> {
    let listadoAnexos: AnexoMaterial[] = [];

    let item = {
      "id_material_solicitud": parseInt(id_material_solicitud)
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/obtenerAllUrlAnexoMaterial", item).toPromise().then((data) => {
          if (data.resultado !== 0) {
            listadoAnexos = data.lista;
            resolve(listadoAnexos);
          } else {
            console.log("no listado encontradas...");
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

  obtenerUrlSolicitud(id_solicitud: number): Promise<any> {
    let solicitud: SolicitudResponse;

    let item = {
      "id_solicitud": id_solicitud
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/obtenerUrlAnexoSolicitud", item).toPromise().then((data) => {
          if (data) {
            solicitud = data;
            resolve(solicitud);
          } else {
            console.log("anexo no encontrado...");
            resolve({});
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

  subirAnexoMaterial(archivo: File, id_material_solicitud: any, id_rol: any, filename: string): Promise<any> {
    let response: SolicitudResponse;
    //console.log("mi anexo material id es :"+id_material);
    let item = new FormData();
    // item.append("document",new Blob([JSON.stringify({"id_solicitud":id_sol})],{type:'text/xml'}));
    item.append("archivo", archivo);
    item.append("id_material_solicitud", id_material_solicitud.toString());
    item.append("id_rol", id_rol.toString());
    item.append("etiqueta", filename);

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postMultipartResource("/solicitud/subirAnexoMaterialxRol", item).toPromise().then((data) => {
          if (data.resultado != 0) {
            response = data;
            resolve(response);
          } else {
            console.log("anexo no enviado...");
            resolve({});
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
  subirAnexoSolicitud(archivo: File, id_solicitud: any, id_rol: any, filename: string): Promise<any> {
    let response: SolicitudResponse;

    let item = new FormData();
    // item.append("document",new Blob([JSON.stringify({"id_solicitud":id_sol})],{type:'text/xml'}));
    item.append("archivo", archivo);
    item.append("id_solicitud", id_solicitud.toString());
    item.append("id_rol", id_rol.toString());
    item.append("etiqueta", filename);
    console.log("vamos a enviar el archivo con el nombre " + filename);
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postMultipartResource("/solicitud/subirAnexoSolicitudxRol", item).toPromise().then((data) => {
          if (data.resultado != 0) {
            response = data;
            resolve(response);
          } else {
            console.log("anexo no enviado...");
            resolve({});
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

  borrarAnexoSolicitud(id_anexo_solicitud: any): Promise<any> {
    let solicitud: SolicitudResponse;
    console.log(" boorrar esta solicitud anexo :" + id_anexo_solicitud);

    let item = {
      "id_anexo_solicitud": parseInt(id_anexo_solicitud),
    }
    //let item= parseInt(id_anexo_solicitud);
    console.log(" json a borrar :" + JSON.stringify(item));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/borrarAnexoxIdAnexoSolicitud", item).toPromise().then((data) => {
          if (data.resultado == 1) {
            solicitud = data;
            resolve(data);
          } else {
            console.log("anexo solicitud no borrado...");
            resolve({});
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
  borrarAnexoMaterial(id_anexo_material: any): Promise<any> {
    let response: SolicitudResponse;
    console.log(" boorrar esta material anexo :" + id_anexo_material);

    let item = {
      "id_anexo_material": parseInt(id_anexo_material),
    }
    console.log(" json a borrar :" + JSON.stringify(item));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/borrarxIdMaterialAnexo", item).toPromise().then((data) => {
          if (data.resultado == 1) {
            response = data;
            resolve(data);
          } else {
            console.log("anexo no encontrado...");
            resolve({});
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

  finalizarSolicitud(id_solicitud: any, id_rol: number): Promise<any> {
    let solicitud: any;
    let dataSend = {
      "id_usuario": this.userInfo.id,
      "id_solicitud": id_solicitud,
      "id_rol": id_rol
    }
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/finalizarSolicitud", dataSend).toPromise().then((data) => {
          solicitud = data;
          resolve(data);
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

  getMaterialCodigoModelo(body: any): Promise<any> {
    let material: any;
    console.log("sending body consultar SAP..." + JSON.stringify(body));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/materialSolicitud/consultaCodigoMaterialSAP", body).toPromise().then((data) => {
          //this.resourceService.postResource("/materialSolicitud/consultarMaterialSAP", body).toPromise().then((data) => {
          if (data.resultado == 1) {
            material = data['lista'];
            resolve(material);
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

  getMaterialCodigoMaterialSapAmpliacion(body: any): Promise<any> {
    let material: any;
    console.log("sending body consultar SAP..." + JSON.stringify(body));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/materialSolicitud/consultaCodigoMaterialSAPAmpliacion", body).toPromise().then((data) => {
          //this.resourceService.postResource("/materialSolicitud/consultarMaterialSAP", body).toPromise().then((data) => {
          if (data.resultado == 1) {
            material = data['lista'];
            resolve(material);
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

  getMaterialSAP(body: any): Promise<any> {
    let material: any;
    console.log("sending body consultar SAP..." + JSON.stringify(body));
    return new Promise(
      (resolve, reject) => {
        //this.resourceService.postResource("/materialSolicitud/consultaCodigoMaterialSAP", body).toPromise().then((data) => {
        this.resourceService.postResource("/materialSolicitud/consultarMaterialSAP", body).toPromise().then((data) => {
          console.log("Recibe esto-->" + JSON.stringify(data));
          if (data.resultado == 1) {
            material = data['lista'];
            resolve(material);
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


  agregarMaterialAmpliacion(idSolicitud: number, body: any): Promise<any> {
    let material: any;
    console.log("sending agregarMaterialAmpliacion..." + JSON.stringify(body));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + idSolicitud + "/materialSolicitud/crearAmpliacion", body).toPromise().then((data) => {
          material = data;
          resolve(material);
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

  actualizarMaterialAmpliacion(idSolicitud: number, idmaterial: number, body: any): Promise<any> {
    let material: any;
    console.log("sending actualizarMaterialAmpliacion..." + JSON.stringify(body));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/solicitud/" + idSolicitud + "/materialSolicitud/" + idmaterial + "/actualizarAmpliacion", body).toPromise().then((data) => {
          material = data;
          resolve(material);
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

  /*   agregarMaterialAmpliaciónMasivo(idSolicitud:number,idmaterial:number,body: any): Promise<any> {
      let material: any;
      console.log("sending agregarMaterialAmpliaciónMasivo..." + JSON.stringify(body));
      return new Promise(
        (resolve, reject) => {
          this.resourceService.postResource("/solicitud/"+idSolicitud+"/materialSolicitud/agregarAmpliaciones", body).toPromise().then((data) => {
            material = data;
            resolve(material);
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
   */
  eliminarMaterialAmpliación(idSolicitud: number, idmaterial: number): Promise<any> {
    let material: any;
    console.log(idSolicitud + "------" + idmaterial + " sending eliminarMaterialAmpliación...");
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + idSolicitud + "/materialSolicitud/" + idmaterial + "/eliminarMaterial", {}).toPromise().then((data) => {
          material = data;
          resolve(material);
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

  cargaMasivaAmpliacion(params: any): Promise<any> {
    let id_solicitud = params.id_solicitud;
    let id_rol = params.id_rol;
    let data = params.materiales;
    let id_usuario = this.userInfo.id
    //data = { "materiales": [{ "campos": [{ "codigo_interno": "denominacion", "valor": "nuevo 6" }, { "codigo_interno": "unidad_medida_base", "valor": "KG" }, { "codigo_interno": "peso_bruto", "valor": 111 }, { "codigo_interno": "unidad_medida_peso", "valor": "KG" }, { "codigo_interno": "centro", "valor": "2010" }, { "codigo_interno": "organizacion_ventas", "valor": "3000" }, { "codigo_interno": "canal_distribucion", "valor": "01" }, { "codigo_interno": "almacen", "valor": "2061" }, { "codigo_interno": "clase", "valores": [{ "valor": "00302" }] }] }] }
    console.log("sending data actualizar material..." + JSON.stringify(data));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + id_solicitud + "/materialSolicitud/agregarAmpliaciones?id_usuario=" + id_usuario, data).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  // Modificacion

  agregarMaterialModificacion(idSolicitud: number, body: any): Promise<any> {
    let material: any;
    console.log("sending agregarMaterialModificación..." + JSON.stringify(body));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + idSolicitud + "/materialSolicitud/crearModificacion", body).toPromise().then((data) => {
          material = data;
          resolve(material);
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

  actualizarMaterialModificacion(idSolicitud: number, idmaterial: number, body: any): Promise<any> {
    let material: any;
    console.log("sending actualizarMaterialModificacion..." + JSON.stringify(body));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/solicitud/" + idSolicitud + "/materialSolicitud/" + idmaterial + "/actualizarModificacion", body).toPromise().then((data) => {
          material = data;
          resolve(material);
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

  /*   agregarMaterialModificacionMasivo(idSolicitud:number,idmaterial:number,body: any): Promise<any> {
      let material: any;
      console.log("sending agregarMaterialModificacionMasivo..." + JSON.stringify(body));
      return new Promise(
        (resolve, reject) => {
          this.resourceService.postResource("/solicitud/"+idSolicitud+"/materialSolicitud/agregarModificaciones", body).toPromise().then((data) => {
            material = data;
            resolve(material);
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
   */
  eliminarMaterialModificacion(idSolicitud: number, idmaterial: number): Promise<any> {
    let material: any;
    console.log(idSolicitud + "------" + idmaterial + " sending eliminarMaterialModificacion...");
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + idSolicitud + "/materialSolicitud/" + idmaterial + "/eliminarMaterial", {}).toPromise().then((data) => {
          material = data;
          resolve(material);
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

  cargaMasivaModificacion(params: any): Promise<any> {
    let id_solicitud = params.id_solicitud;
    let id_rol = params.id_rol;
    let data = params.materiales;
    let id_usuario = this.userInfo.id
    //data = { "materiales": [{ "campos": [{ "codigo_interno": "denominacion", "valor": "nuevo 6" }, { "codigo_interno": "unidad_medida_base", "valor": "KG" }, { "codigo_interno": "peso_bruto", "valor": 111 }, { "codigo_interno": "unidad_medida_peso", "valor": "KG" }, { "codigo_interno": "centro", "valor": "2010" }, { "codigo_interno": "organizacion_ventas", "valor": "3000" }, { "codigo_interno": "canal_distribucion", "valor": "01" }, { "codigo_interno": "almacen", "valor": "2061" }, { "codigo_interno": "clase", "valores": [{ "valor": "00302" }] }] }] }
    console.log("sending data actualizar Carga Masiva Modificacion material..." + JSON.stringify(data));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + id_solicitud + "/materialSolicitud/agregarModificaciones?id_usuario=" + id_usuario, data).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

  getCodigoMaterialSAP(denominacion: any): Promise<any> {

    console.log("imm retrieving denominacion" + JSON.stringify(denominacion));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/materialSolicitud/consultaNombreMaterialSAP?denominacion=" + denominacion).toPromise().then((data) => {

          if (data.resultado == 1) {
            // console.log("imm material encontrado : "+JSON.stringify(data));
            resolve(data.lista);
          } else {
            console.log("codigo material no encontrado...");
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




  listarCamposReglasxEscenario3(id_escenario_nivel3: number, id_tipo_solicitud: number): Promise<any> {
    let listadoCamposReglas: any[] = [];
    let url = "/campo/listarCamposReglasxEscenario3?id_escenario_nivel3=" + id_escenario_nivel3 + "&id_tipo_solicitud=" + id_tipo_solicitud;
    console.log(url);
    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/campo/listarCamposReglasxEscenario3?id_escenario_nivel3=" + id_escenario_nivel3 + "&id_tipo_solicitud=" + id_tipo_solicitud).toPromise().then((data) => {
          if (data && Object.keys(data).length !== 0) {
            listadoCamposReglas = data;
            resolve(listadoCamposReglas);
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


  // Bloqueo

  agregarMaterialBloqueo(idSolicitud: number, body: any): Promise<any> {
    let material: any;
    console.log("sending agregarMaterialBloqueo..." + JSON.stringify(body));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + idSolicitud + "/materialSolicitud/crearBloqueo", body).toPromise().then((data) => {
          material = data;
          resolve(material);
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

  actualizarMaterialBloqueo(idSolicitud: number, idmaterial: number, body: any): Promise<any> {
    let material: any;
    console.log("sending actualizarMaterialBloqueo..." + JSON.stringify(body));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.putResource("/solicitud/" + idSolicitud + "/materialSolicitud/" + idmaterial + "/actualizarBloqueo", body).toPromise().then((data) => {
          material = data;
          resolve(material);
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

/*   agregarMaterialBloqueoMasivo(idSolicitud: number, idmaterial: number, body: any): Promise<any> {
    let material: any;
    console.log("sending agregarMaterialBloqueoMasivo..." + JSON.stringify(body));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + idSolicitud + "/materialSolicitud/agregarBloqueos", body).toPromise().then((data) => {
          material = data;
          resolve(material);
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
 */
  eliminarMaterialBloqueo(idSolicitud: number, idmaterial: number): Promise<any> {
    let material: any;
    console.log(idSolicitud + "------" + idmaterial + " sending eliminarMaterialBloqueo...");
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + idSolicitud + "/materialSolicitud/" + idmaterial + "/eliminarMaterial", {}).toPromise().then((data) => {
          material = data;
          resolve(material);
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

  cargaMasivaBloqueo(params: any): Promise<any> {
    let id_solicitud = params.id_solicitud;
    let id_rol = params.id_rol;
    let data = params.materiales;
    let id_usuario = this.userInfo.id
    //data = { "materiales": [{ "campos": [{ "codigo_interno": "denominacion", "valor": "nuevo 6" }, { "codigo_interno": "unidad_medida_base", "valor": "KG" }, { "codigo_interno": "peso_bruto", "valor": 111 }, { "codigo_interno": "unidad_medida_peso", "valor": "KG" }, { "codigo_interno": "centro", "valor": "2010" }, { "codigo_interno": "organizacion_ventas", "valor": "3000" }, { "codigo_interno": "canal_distribucion", "valor": "01" }, { "codigo_interno": "almacen", "valor": "2061" }, { "codigo_interno": "clase", "valores": [{ "valor": "00302" }] }] }] }
    console.log("sending data actualizar Carga Masiva bloqueo material..." + JSON.stringify(data));
    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/" + id_solicitud + "/materialSolicitud/agregarBloqueos?id_usuario=" + id_usuario, data).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });

  }

}





