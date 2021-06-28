import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service'
import {OrganizacionVenta } from '../modelos/organizacion-venta.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionVentaService {

  constructor(private resourceService: ResourceService) { }

  getListarTodoCentroOrganizacionVenta(): Promise<any> {

    let listarOrganizacionVenta:OrganizacionVenta[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/organizacionVenta/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarOrganizacionVenta= data;
            resolve(listarOrganizacionVenta);
          } else {
            console.log("no Organizacion Ventas encontradas...");
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

  getListarCentroOrganizacionVentaxSociedad(codigo_sociedad:String): Promise<any> {

    let listarOrganizacionVenta:OrganizacionVenta[]=[];

    return new Promise(
      (resolve, reject) => {
        this.resourceService.getResource("/organizacionVenta/listarPorSociedad?codigo_sociedad="+codigo_sociedad).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarOrganizacionVenta= data;
            resolve(listarOrganizacionVenta);
          } else {
            console.log("no Organizacion Ventas encontradas...");
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
