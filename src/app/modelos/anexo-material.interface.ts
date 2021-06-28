import { Rol } from "./rol.interface";

export interface AnexoMaterial {
    id:number;
    id_material_solicitud:number;
    nombre:string;
    etiqueta:string;
    ruta_anexo:string;
    id_rol:number;
    url:string;
    rol?:Rol;
}