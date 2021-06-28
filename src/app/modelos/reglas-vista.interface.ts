import {ReglasCampo} from './reglas-campo.interface';
export interface ReglasVista {
    nombre:string,
    regla_vista:string,
    orden:number,
    campos:ReglasCampo[]
}
