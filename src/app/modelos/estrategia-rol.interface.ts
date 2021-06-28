import { Estrategia } from "./estrategia.interface";
import { Rol } from "./rol.interface";

export interface EstrategiaRol {
    id?:number;
    orden:number;
    rol:Rol;
    estrategia?:Estrategia;
    activo?:boolean;
}
