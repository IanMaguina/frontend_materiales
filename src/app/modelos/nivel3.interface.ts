import {Sociedad } from './sociedad.interface';
import {Nivel1 } from './nivel1.interface';
import {Nivel2 } from './nivel2.interface';
export interface Nivel3 {
    id:number;
    codigo?:string;
    nombre?:string;
    //nivel2Id:number,
    nivel2?:Nivel2;
    //nivel1?:Nivel1,
    //sociedad?:Sociedad
}
