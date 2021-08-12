import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { RandomService } from 'src/app/servicios/random.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { LoaderService } from 'src/app/servicios/loader.service';



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
          { "name": "Nueva Solicitud", "link": "/productosTerminados/1/crearSolicitudPT/1000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/1/consultarProductosTerminados/1000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/1/pendientesProductosTerminados/1000" },
          /*{ "name": "Bandeja Pendientes Supervisor", "link": "/productosTerminados/consultarSolicitudesPendientesSupervisor" }, */
        ]
      },
      {
        "id": 2,
        "name": "Ampliación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/2/ampliarSolicitudPT/1000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/2/consultarProductosTerminados/1000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/2/pendientesProductosTerminados/1000" },
        ]
      },
      {
        "id": 3,
        "name": "Modificación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/3/modificarSolicitudPT/1000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/3/consultarProductosTerminados/1000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/3/pendientesProductosTerminados/1000" },
        ]
      },
      {
        "id": 4,
        "name": "Bloqueo",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/4/bloquearSolicitudPT/1000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/4/consultarProductosTerminados/1000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/4/pendientesProductosTerminados/1000" },
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
          { "name": "Nueva Solicitud", "link": "/productosTerminados/1/crearSolicitudRS/2000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/1/consultarRepuestosSuministros/2000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/1/pendientesRepuestosSuministros/2000" },
          /*{ "name": "Bandeja Pendientes Supervisor", "link": "/productosTerminados/consultarSolicitudesPendientesSupervisor" }, */
        ]
      },
      {
        "id": 2,
        "name": "Ampliación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/2/ampliarSolicitudRS/2000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/2/consultarProductosTerminados/2000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/2/pendientesRepuestosSuministros/2000" },
        ]
      },
      {
        "id": 3,
        "name": "Modificación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/3/modificarSolicitudRS/2000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/3/consultarProductosTerminados/2000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/3/pendientesRepuestosSuministros/2000" },
        ]
      },
      {
        "id": 4,
        "name": "Bloqueo",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/4/bloquearSolicitudRS/2000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/4/consultarProductosTerminados/2000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/4/pendientesRepuestosSuministros/2000" },
        ]
      }
    ]
  }, {
    "codigo": "3000",
    "name": "Materias Primas y Prod. en Proceso",
    "children": [
      {
        "id": 1,
        "name": "Creación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/1/crearSolicitudMP/3000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/1/consultarMateriasPrimas/3000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/1/pendientesMateriasPrimas/3000" },
        ]
      },
      {
        "id": 2,
        "name": "Ampliación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/2/ampliarSolicitudMP/3000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/2/consultarMateriasPrimas/3000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/2/pendientesMateriasPrimas/3000" },
        ]
      },
      {
        "id": 3,
        "name": "Modificación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/3/modificarSolicitudMP/3000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/3/consultarMateriasPrimas/3000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/3/pendientesMateriasPrimas/3000" },
        ]
      },
      {
        "id": 4,
        "name": "Bloqueo",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/4/bloquearSolicitudMP/3000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/4/consultarMateriasPrimas/3000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/4/pendientesMateriasPrimas/3000" },
        ]
      }
    ]
  }, {
    "codigo": "4000",
    "name": "Activos y Otros",
    "children": [
      {
        "id": 1,
        "name": "Creación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/1/crearSolicitudAF/4000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/1/consultarActivos/4000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/1/pendientesActivos/4000" },
          /*{ "name": "Bandeja Pendientes Supervisor", "link": "/productosTerminados/consultarSolicitudesPendientesSupervisor" }, */
        ]
      },
      {
        "id": 2,
        "name": "Ampliación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/2/ampliarSolicitudAF/4000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/2/consultarActivos/4000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/2/pendientesActivos/4000" },
        ]
      },
      {
        "id": 3,
        "name": "Modificación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/3/modificarSolicitudAF/4000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/3/consultarActivos/4000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/3/pendientesActivos/4000" },
        ]
      },
      {
        "id": 4,
        "name": "Bloqueo",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/4/bloquearSolicitudAF/4000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/4/consultarActivos/4000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/4/pendientesActivos/4000" },
        ]
      }
    ]
  },

  {
    "name": "Consulta Materiales",
    "children": [
      { "name": "Por Codigo/Denominacion", "link": "/shared/bandejaMaterialesSap" },
    ]
  },
  {
    "name": "Administración",
    "children": [
      { "name": "Estrategias", "link": "/admin/estrategias" },
      { "name": "Usuarios", "link": "/admin/usuarios" },
    ]
  },
];



@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input('userInfo') userInfo!: Usuario;
  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  //loggedIn: boolean = false;
  MENU_USUARIO: MenuNode[] = []
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public autenticacionService: AutenticacionService,
    public loaderService: LoaderService,
    private cd: ChangeDetectorRef
  ) {
    console.log('llamando Constructor')
    //this.mostrarMenu();
    this.dataSource.data = TREE_DATA;

  }

  ngOnInit(): void {
    console.log('llamando ngOnInit')
    if (this.userInfo == null) {
      this.userInfo = this.autenticacionService.getUserInfo();
      //this.mostrarMenu(this.userInfo);
      console.log("usuario ARSA-->" + JSON.stringify(this.userInfo));
      if (this.userInfo != null) {
        this.autenticacionService.loggedIn = true;
        //this.mostrarMenu(this.userInfo);
      }
    }
    
    this.treeControl.collapseAll();
    //this.loaderService.isLoading.next(true);
  }

  
  

  autoClear(val: any) {
    val.toggle();
    this.treeControl.collapseAll();
  }


  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;

  signOut() {
    this.autenticacionService.signout();

    //con esto desaparezco los botones de acceso al menu y el cerrar sesión
    this.autenticacionService.loggedIn = false;
    // con esto redirijo a la pantalla de login
    this.router.navigate(['account']);
  }

 mostrarMenu(userConfirm:Usuario) {
    let menu: any[] = [];
    TREE_DATA.forEach((item) => {
      userConfirm?.lista_nivel1?.forEach(n => {
        if (item.codigo == n.codigo) {
          n.tipo_solicitudes?.forEach(t => {
            if (item.children) {
              let children:any[]=[];
              item.children.forEach(ch => {
                if (ch.id == t.id) {
                  children.push(ch)
                }
              })
              menu.push({name: item.name,children:children})
            }
          })

        }
      })
    })
    this.dataSource.data = menu;
    console.log("menu--->" + JSON.stringify(menu));
  }

  ngAfterContentInit() {
    console.log('llamando ngAfterContentInit')
    this.cd.detectChanges();
  }


}
