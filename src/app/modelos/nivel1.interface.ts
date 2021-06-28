import {Sociedad } from './sociedad.interface';
export interface Nivel1 {
    id:number;
    codigo:string;
    nombre:string;
    //sociedadId:number,
    sociedad?:Sociedad;
}
