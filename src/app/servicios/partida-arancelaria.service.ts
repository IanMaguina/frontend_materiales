import { Injectable } from '@angular/core';
import { PartidaArancelaria } from '../modelos/partida-arancelaria.interface';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class PartidaArancelariaService {

  constructor(private resourceService:ResourceService) { }


  getListarPartidaArancelaria(): Promise<any> {

    let listarPartidaArancelaria:PartidaArancelaria[]=[];

    return new Promise( 
      (resolve, reject) => {
        this.resourceService.getResource("/maestro/partidaArancelaria/listarTodo").toPromise().then((data) => {
          //console.log("sociedad data=" + JSON.stringify(data));
          if (data && Object.keys(data).length !== 0) {
            listarPartidaArancelaria= data;
            resolve(listarPartidaArancelaria);
          } else {
            console.log("no partidaArancelaria encontradas...");
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
  getFiltrarPartidaArancelaria(codigo:any): Promise<any> {

    let listarPartidaArancelaria:PartidaArancelaria[]=[];
    console.log("imm ingresa al servicio: "+codigo);
    
      return new Promise( 
        (resolve, reject) => {
          this.resourceService.getResource("/maestro/partidaarancelaria/listarPorCodigo?codigo="+codigo).toPromise().then((data) => {
            //console.log("sociedad data=" + JSON.stringify(data));
            if (data.resultado !== 0) {
              listarPartidaArancelaria= data.lista;
              resolve(listarPartidaArancelaria);
            } else {
              console.log("partidas arancelarias no encontradas...");
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
