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
          { "name": "Nueva Solicitud", "link": "/productosTerminados/crearSolicitudPT/1000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/consultarProductosTerminados/1000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/pendientesProductosTerminados/1000" },
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
          { "name": "Nueva Solicitud", "link": "/productosTerminados/crearSolicitudRS/2000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/consultarRepuestosSuministros/2000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/pendientesRepuestosSuministros/2000" },
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
    "codigo": "3000",
    "name": "Materias Primas",
    "children": [
      {
        "id": 1,
        "name": "Creación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/crearSolicitudMP/3000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/consultarMateriasPrimas/3000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/pendientesMateriaPrimas/3000" },
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
    "codigo": "4000",
    "name": "Activos y Otros",
    "children": [
      {
        "id": 1,
        "name": "Creación",
        "children": [
          { "name": "Nueva Solicitud", "link": "/productosTerminados/crearSolicitudAF/4000" },
          { "name": "Consulta Solicitud", "link": "/productosTerminados/consultarActivos/4000" },
          { "name": "Bandeja Pendientes", "link": "/productosTerminados/pendientesActivos/4000" },
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
