import { Injectable } from '@angular/core';
import { Equivalencia } from '../modelos/equivalencia.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class EquivalenciaService {

  constructor(private resourceService:ResourceService) { }


  getListaEquivalencias(id_material_solicitud:number): Promise<any> {

    let listaEquivalencias:Equivalencia[]=[];

    let item = {
      "id_material_solicitud":id_material_solicitud
    }

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/obtenerAllEquivalenciaMaterial", item).toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data.resultado == 1) {
            listaEquivalencias= data.lista;
            resolve(listaEquivalencias);
          } else {
            console.log("Equivalencia no encontrada...");
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
  registrarEquivalencia(equivalencia:any){
    
    console.log("adding equivalencia..." + JSON.stringify(equivalencia));

    let item = {
      "id_material_solicitud": equivalencia.id_material_solicitud,
      "valor1": equivalencia.valor1,
      "unidad_medida1": equivalencia.unidad_medida1,
      "valor2": equivalencia.valor2,
      "unidad_medida2": equivalencia.unidad_medida2,
      "id_rol":equivalencia.id_rol
    }

    console.log("sending equivalencia..." + JSON.stringify(item));

    return new Promise(
      (resolve, reject) => {

        this.resourceService.postResource("/solicitud/agregarEquivalenciaMaterialxRol", item).toPromise().then((data) => {

          console.log("response data=" + JSON.stringify(data));
          resolve(data);

        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }
  eliminarEquivalencia(id_equivalencia_material:number){
    
    console.log("deleting equivalencia..." + JSON.stringify(id_equivalencia_material));
    let response: AnexoResponse;
    let item = {
      "id_equivalencia_material":id_equivalencia_material
    }

    return new Promise(
      (resolve, reject) => {
        this.resourceService.postResource("/solicitud/borrarxIdEquivalenciaMaterial", item).toPromise().then((data) => {
          console.log("response data=" + JSON.stringify(data));
            response = data;
            resolve(response);
          
        }).catch((error) => {
          console.log("error status=" + error.status + ", msg=" + error.message);
          reject(error);
        });

      });
  }
}


export interface AnexoResponse{
  resultado?:number;
  mensaje?:string;
}
