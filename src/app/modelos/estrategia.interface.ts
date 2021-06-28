import {Sociedad } from './sociedad.interface';
import {Nivel1 } from './nivel1.interface';
import {Nivel2 } from './nivel2.interface';
import {Nivel3 } from './nivel3.interface';
import {TipoSolicitud } from './tipo-solicitud.interface';
export interface Estrategia {
    id?:number;
    escenario_nivel3?:Nivel3;
    tipo_solicitud?:TipoSolicitud;
    usuario_enviar_correo?:string;
}
