import {Rol} from './rol.interface';
import {Estrategia} from './estrategia.interface';

export interface RolEstrategia {
    id:number;
    orden:number;
    estrategia?:Estrategia;
    rol:Rol;
    activo:boolean;
}
