import { Sociedad } from './sociedad.interface';
import { TipoMaterial } from './tipo-material.interface';
export interface LineaNegocio{
  //id_linea_negocio:number;
  id:number,
  id_escenario_nivel1:string,
  codigo:string,
  nombre:string,
  sociedad:Sociedad,
  tipo_material:TipoMaterial
}
