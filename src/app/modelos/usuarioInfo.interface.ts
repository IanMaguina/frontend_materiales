import { PerfilUsuario } from './perfil.interface';
import { AreaUsuario } from './area.interface';
export interface UsuarioInfo {
    id:number;
    usuario:string;
    nombre:string;
    area_usuario:AreaUsuario;
    perfil_usuario:PerfilUsuario;
    activo:boolean;
}
