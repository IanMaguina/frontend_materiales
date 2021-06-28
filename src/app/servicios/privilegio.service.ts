import { Injectable } from '@angular/core';
import { GlobalSettings } from '../shared/settings';

@Injectable({
  providedIn: 'root'
})
export class PrivilegioService {
  userInfo: any;
  constructor(
    
  ) {
    
  }

  mostrarMenu(userConfirm:any){
    //let userConfirm = this.userInfo;
    let menu: any[] = [];

        TREE_DATA.forEach((item) => {
          userConfirm?.lista_nivel1?.forEach((n:any) => {
            if (item.codigo == n.codigo) {
              n.tipo_solicitudes?.forEach((t:any) => {
                if (item.children) {
                  let children: any[] = [];
                  item.children.forEach(ch => {
                    if (ch.id == t.id) {
                      children.push(ch)
                    }
                  })
                  menu.push({ name: item.name, children: children })
                }
              })
            }
          })
          if (this.userInfo && this.userInfo.perfil_usuario) {
            let perfil: any[] = this.userInfo.perfil_usuario;
            perfil.forEach(element => {
              if (element.id == GlobalSettings.PERFIL_ADMINISTRADOR) {
                if (item.children) {
                  let children: any[] = [];
                  item.children.forEach(ch => {
                    children.push(ch)
                  })
                  menu.push({ name: item.name, children: children })
                }
              }
            });
          }

        })
       // console.log("super menu-->"+JSON.stringify(menu));
        return menu;
  }

}

interface MenuNode {
  "id"?: number;
  "codigo"?: string;
  "name": string;
  "link"?: string;
  "children"?: MenuNode[];
}

const TREE_DATA: MenuNode[] = [
  {
    "codigo": "1000",
    "name": "Productos Terminados",
    "children": [
      {
        "id": 1,
        "name": "Creación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/crearSolicitud" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/consultarSolicitudes" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/consultarSolicitudesPendientesSupervisor" },
          /*{ "name": "Bandeja Pendientes Supervisor", "link": "/productosTerminados/consultarSolicitudesPendientesSupervisor" }, */
        ]
      },
      {
        "id": 2,
        "name": "Ampliación",
        "children": [
          { "name": "Nueva Solicitud", "link": "#" },
          { "name": "Consulta Solicitud", "link": "#" },
          { "name": "Bandeja Borradores", "link": "#" },
        ]
      },
      {
        "id": 3,
        "name": "Modificación",
        "children": [
          { "name": "Nueva Solicitud", "link": "#" },
          { "name": "Consulta Solicitud", "link": "#" },
          { "name": "Bandeja Borradores", "link": "#" },
        ]
      },
      {
        "id": 4,
        "name": "Bloqueo",
        "children": [
          { "name": "Nueva Solicitud", "link": "#" },
          { "name": "Consulta Solicitud", "link": "#" },
          { "name": "Bandeja Borradores", "link": "#" },
        ]
      }
    ]
  }, {
    "codigo": "2000",
    "name": "Repuestos y Suministros",
    "children": [
      {
        "id": 1,
        "name": "Creación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/repuestosSuministros/crearSolicitud" },
          { "name": "Consulta Solicitud", "link": "/repuestosSuministros/consultarSolicitudes" },
          { "name": "Bandeja Pendientes", "link": "/repuestosSuministros/consultarSolicitudesPendientes" },
          { "name": "Bandeja Borradores", "link": "#" },
        ]
      },
      { "id": 2, "name": "Ampliación" },
      { "id": 3, "name": "Modificación" },
      { "id": 4, "name": "Bloqueo" }
    ]
  }, {
    "codigo": "3000",
    "name": "Materias Primas",
    "children": [
      {
        "name": "Creación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/materiasPrimas/crearSolicitud" },
          { "name": "Consulta Solicitud", "link": "/materiasPrimas/consultarSolicitudes" },
          { "name": "Bandeja Pendientes", "link": "/materiasPrimas/consultarSolicitudesPendientes" },
          { "name": "Bandeja Borradores", "link": "#" },
        ]
      },
      { "id": 2, "name": "Ampliación" },
      { "id": 3, "name": "Modificación" },
      { "id": 4, "name": "Bloqueo" }
    ]
  }, {
    "codigo": "4000",
    "name": "Activos y Otros",
    "children": [
      {
        "name": "Creación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/activosOtros/crearSolicitud" },
          { "name": "Consulta Solicitud", "link": "/activosOtros/consultarSolicitudes" },
          { "name": "Bandeja Pendientes", "link": "/activosOtros/consultarSolicitudesPendientes" },
          { "name": "Bandeja Borradores", "link": "#" },
        ]
      },
      { "id": 2, "name": "Ampliación" },
      { "id": 3, "name": "Modificación" },
      { "id": 4, "name": "Bloqueo" }
    ]
  }, {
    "codigo": "admin",
    "name": "Administración",
    "children": [
      { "name": "Estrategias", "link": "/admin/estrategias" },
      { "name": "Usuarios", "link": "/admin/usuarios" },
    ]
  },
];
