export interface AprobadorSolicitud {
    id_solicitud:number,
    orden:number,
    id_usuario_aprobador:number,
    nombre_usuario_aprobador:string,
    correo_usuario:string,
    id_rol:number,
    nombre_rol:string,
    aprobar_enviar_correo:boolean,
    rechazar_enviar_correo:boolean,
    esta_aqui:boolean,
    id_estado:number,
    nombre_estado:string,
    id_estado_real:number,
    nombre_estado_real:string,
    id_rol_real:number,
    nombre_rol_real:string,
    id_usuario_real:number,
    nombre_usuario_real:string,
    correo_usuario_real:string,
    fecha_ingreso:Date,
    fecha_salida:Date,
    tipo:string,
    estado_completado:boolean,
    motivo:string,
    duracion:string
}
