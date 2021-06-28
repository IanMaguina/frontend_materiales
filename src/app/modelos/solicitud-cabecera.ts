import { TipoSolicitud } from "./tipo-solicitud.interface";

export interface SolicitudCabecera {
    id?:number,
    correlativo?:string,
    id_usuario?: number,
    descripcion_corta: string,
    id_escenario_nivel3: number,
    id_tipo_solicitud?: number,

    creado_por?:{
        id: number,
        nombre: string
    },
    fecha_creacion?: Date,
    escenarioNivel3:{
        id:number
    }
    estadoSolicitud?:{
        id: number,
        nombre: string
    },

    tipoSolicitud?: TipoSolicitud,
}
