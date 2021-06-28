import { PerfilUsuario } from './perfil.interface';
import { AreaUsuario } from './area.interface';
import { Nivel1 } from './nivel1.interface';
import { TipoSolicitud } from './tipo-solicitud.interface';
export interface Usuario {
    id:number;
    nombre:string;
    usuario:string;
    area_usuario:AreaUsuario;
    perfil_usuario:PerfilUsuario[];
    lista_nivel1?:[{codigo:string, 
                    nombre:string, 
                    tipo_solicitudes?:TipoSolicitud[]
                }];
  
    activo:boolean;
}
