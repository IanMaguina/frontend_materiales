import {Sociedad } from './sociedad.interface';
import {Nivel1 } from './nivel1.interface';
export interface Nivel2 {
    id:number;
    codigo:string;
    nombre:string;
    //nivel1Id:number,
    nivel1?:Nivel1;
    //sociedad?:Sociedad,
}
