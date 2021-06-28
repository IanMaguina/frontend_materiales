import { Rol } from "./rol.interface";

export interface Anexo {
    id:number;
    id_solicitud:number;
    nombre:string;
    etiqueta:string;
    ruta_anexo:string;
    id_rol:number;
    rol:Rol;
    url:string;
}