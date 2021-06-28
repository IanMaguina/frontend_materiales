import {RolEstrategia} from './rol-estrategia.interface';
import {Usuario} from './usuario.interface';
export interface UsuarioRol {
    id?:number;
    usuario:Usuario;
    estrategia_rol:RolEstrategia;
    activo?:boolean;
}
