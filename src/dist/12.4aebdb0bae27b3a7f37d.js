(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{m1rA:function(t,i,c){"use strict";c.r(i),c.d(i,"CreacionModule",function(){return et});var o=c("ofXK"),a=c("tyNb"),e=c("fXoL"),b=c("3Pt+"),r=c("bUJT"),n=c("NFeN"),l=c("zkoq"),m=c("kmnG"),d=c("qFsG"),s=c("d3UM"),u=c("iadO"),f=c("bTqV"),S=c("+0xr"),p=c("FKr1");function T(t,i){if(1&t&&(e.Tb(0,"mat-option",34),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.kc("value",t),e.Cb(1),e.Dc("",t.nombre," ")}}function h(t,i){if(1&t&&(e.Tb(0,"mat-option",34),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.kc("value",t),e.Cb(1),e.Dc("",t.nombre," ")}}function C(t,i){if(1&t&&(e.Tb(0,"mat-option",34),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.kc("value",t),e.Cb(1),e.Dc("",t.nombre," ")}}function g(t,i){1&t&&(e.Tb(0,"th",35),e.Bc(1," C\xf3digo Solicitud "),e.Sb())}function B(t,i){if(1&t&&(e.Tb(0,"td",36),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.codigo," ")}}function k(t,i){1&t&&(e.Tb(0,"th",35),e.Bc(1," Descripci\xf3n Corta "),e.Sb())}function D(t,i){if(1&t&&(e.Tb(0,"td",36),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.descripcion_corta," ")}}function v(t,i){1&t&&(e.Tb(0,"th",35),e.Bc(1," Fecha y Hora "),e.Sb())}function A(t,i){if(1&t&&(e.Tb(0,"td",36),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.fecha_hora," ")}}function _(t,i){1&t&&(e.Tb(0,"th",35),e.Bc(1," # Materiales "),e.Sb())}function w(t,i){if(1&t&&(e.Tb(0,"td",36),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.cantidad_materiales," ")}}function O(t,i){1&t&&(e.Tb(0,"th",35),e.Bc(1," Creador "),e.Sb())}function F(t,i){if(1&t&&(e.Tb(0,"td",36),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.creador," ")}}function N(t,i){1&t&&(e.Tb(0,"th",35),e.Bc(1," Motivo Rechazo "),e.Sb())}function R(t,i){if(1&t&&(e.Tb(0,"td",36),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.perfil," ")}}function y(t,i){1&t&&(e.Tb(0,"th",35),e.Bc(1," Acciones "),e.Sb())}function L(t,i){if(1&t){const t=e.Ub();e.Tb(0,"td",36),e.Tb(1,"button",37,38),e.ac("click",function(){e.tc(t);const c=i.$implicit;return e.ec().verDetalleSolicitud(c)}),e.Bc(3," Ver "),e.Sb(),e.Sb()}}function $(t,i){1&t&&e.Ob(0,"tr",39)}function H(t,i){1&t&&e.Ob(0,"tr",40)}let Q=(()=>{class t{constructor(t,i,c){this.router=t,this.formBuilder=i,this.formValidatorService=c,this.displayedColumns=["codigo","descripcion_corta","fecha_hora","cantidad_materiales","creador","motivo_rechazo","id"],this.listadoSolicitudes=[],this.listadoEstados=[],this.listadoAreas=[],this.listadoLineasNegocio=[],this.submitted=!1,this.filtroForm=this.formBuilder.group({centro:[""],linea_negocio:[""],area:[""],fecha_inicio:[""],fecha_fin:[""],estado:[""]})}ngOnInit(){}filtrarSolicitud(t){}verDetalleSolicitud(t){}}return t.\u0275fac=function(i){return new(i||t)(e.Nb(a.b),e.Nb(b.d),e.Nb(r.a))},t.\u0275cmp=e.Hb({type:t,selectors:[["app-listar-solicitud-rsc"]],decls:85,vars:12,consts:[[1,"contentmain"],[1,"breadcumb"],["routerLink","/dashboard/principal"],["routerLink","#"],[1,"bread-item"],[1,"filtros"],[3,"formGroup","ngSubmit"],["cols","6","rowHeight","80px"],["appearance","outline"],["matInput","","placeholder","centro","formControlName","centro"],["formControlName","linea_negocio"],[3,"value",4,"ngFor","ngForOf"],["formControlName","area"],["matInput","","formControlName","fecha_inicio",3,"matDatepicker"],["matSuffix","",3,"for"],["color","primary"],["picker1",""],["matInput","","formControlName","fecha_fin",3,"matDatepicker"],["picker2",""],["formControlName","estado"],["mat-raised-button","","color","accent","type","submit",3,"disabled"],[1,"content-table"],["mat-table","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","codigo"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","descripcion_corta"],["matColumnDef","fecha_hora"],["matColumnDef","cantidad_materiales"],["matColumnDef","creador"],["matColumnDef","motivo_rechazo"],["matColumnDef","id"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"value"],["mat-header-cell",""],["mat-cell",""],["mat-flat-button","","color","accent",3,"click"],["asignar_rol",""],["mat-header-row",""],["mat-row",""]],template:function(t,i){if(1&t&&(e.Tb(0,"div",0),e.Tb(1,"div",1),e.Tb(2,"a",2),e.Tb(3,"mat-icon"),e.Bc(4,"home"),e.Sb(),e.Sb(),e.Tb(5,"a",3),e.Tb(6,"span",4),e.Bc(7," / Repuestos y Suministros "),e.Sb(),e.Sb(),e.Tb(8,"a",3),e.Tb(9,"span",4),e.Bc(10," / Creaci\xf3n "),e.Sb(),e.Sb(),e.Tb(11,"a",3),e.Tb(12,"span",4),e.Bc(13," / Consulta de Solicitudes "),e.Sb(),e.Sb(),e.Sb(),e.Ob(14,"br"),e.Tb(15,"div",5),e.Tb(16,"form",6),e.ac("ngSubmit",function(){return i.filtrarSolicitud(i.filtroForm.value)}),e.Tb(17,"mat-grid-list",7),e.Tb(18,"mat-grid-tile"),e.Tb(19,"mat-form-field",8),e.Tb(20,"mat-label"),e.Bc(21,"Centro"),e.Sb(),e.Ob(22,"input",9),e.Sb(),e.Sb(),e.Tb(23,"mat-grid-tile"),e.Tb(24,"mat-form-field",8),e.Tb(25,"mat-label"),e.Bc(26,"Linea de Negocio"),e.Sb(),e.Tb(27,"mat-select",10),e.Ac(28,T,2,2,"mat-option",11),e.Sb(),e.Sb(),e.Sb(),e.Tb(29,"mat-grid-tile"),e.Tb(30,"mat-form-field",8),e.Tb(31,"mat-label"),e.Bc(32,"Area"),e.Sb(),e.Tb(33,"mat-select",12),e.Ac(34,h,2,2,"mat-option",11),e.Sb(),e.Sb(),e.Sb(),e.Tb(35,"mat-grid-tile"),e.Tb(36,"mat-form-field",8),e.Tb(37,"mat-label"),e.Bc(38,"Fecha Inicio"),e.Sb(),e.Ob(39,"input",13),e.Ob(40,"mat-datepicker-toggle",14),e.Ob(41,"mat-datepicker",15,16),e.Sb(),e.Sb(),e.Tb(43,"mat-grid-tile"),e.Tb(44,"mat-form-field",8),e.Tb(45,"mat-label"),e.Bc(46,"Fecha Fin"),e.Sb(),e.Ob(47,"input",17),e.Ob(48,"mat-datepicker-toggle",14),e.Ob(49,"mat-datepicker",15,18),e.Sb(),e.Sb(),e.Tb(51,"mat-grid-tile"),e.Tb(52,"mat-form-field",8),e.Tb(53,"mat-label"),e.Bc(54,"Estado"),e.Sb(),e.Tb(55,"mat-select",19),e.Ac(56,C,2,2,"mat-option",11),e.Sb(),e.Sb(),e.Sb(),e.Tb(57,"mat-grid-tile"),e.Tb(58,"button",20),e.Bc(59,"Buscar"),e.Sb(),e.Sb(),e.Sb(),e.Sb(),e.Sb(),e.Tb(60,"div",21),e.Tb(61,"table",22),e.Rb(62,23),e.Ac(63,g,2,0,"th",24),e.Ac(64,B,2,1,"td",25),e.Qb(),e.Rb(65,26),e.Ac(66,k,2,0,"th",24),e.Ac(67,D,2,1,"td",25),e.Qb(),e.Rb(68,27),e.Ac(69,v,2,0,"th",24),e.Ac(70,A,2,1,"td",25),e.Qb(),e.Rb(71,28),e.Ac(72,_,2,0,"th",24),e.Ac(73,w,2,1,"td",25),e.Qb(),e.Rb(74,29),e.Ac(75,O,2,0,"th",24),e.Ac(76,F,2,1,"td",25),e.Qb(),e.Rb(77,30),e.Ac(78,N,2,0,"th",24),e.Ac(79,R,2,1,"td",25),e.Qb(),e.Rb(80,31),e.Ac(81,y,2,0,"th",24),e.Ac(82,L,4,0,"td",25),e.Qb(),e.Ac(83,$,1,0,"tr",32),e.Ac(84,H,1,0,"tr",33),e.Sb(),e.Sb(),e.Sb()),2&t){const t=e.rc(42),c=e.rc(50);e.Cb(16),e.kc("formGroup",i.filtroForm),e.Cb(12),e.kc("ngForOf",i.listadoLineasNegocio),e.Cb(6),e.kc("ngForOf",i.listadoAreas),e.Cb(5),e.kc("matDatepicker",t),e.Cb(1),e.kc("for",t),e.Cb(7),e.kc("matDatepicker",c),e.Cb(1),e.kc("for",c),e.Cb(8),e.kc("ngForOf",i.listadoEstados),e.Cb(2),e.kc("disabled",i.filtroForm.invalid),e.Cb(3),e.kc("dataSource",i.listadoSolicitudes),e.Cb(22),e.kc("matHeaderRowDef",i.displayedColumns),e.Cb(1),e.kc("matRowDefColumns",i.displayedColumns)}},directives:[a.c,n.a,b.w,b.p,b.h,l.a,l.c,m.c,m.g,d.b,b.c,b.o,b.g,s.a,o.l,u.b,u.d,m.h,u.a,f.a,S.j,S.c,S.e,S.b,S.g,S.i,p.l,S.d,S.a,S.f,S.h],styles:["mat-form-field[_ngcontent-%COMP%]{width:70%}"]}),t})();function I(t,i){if(1&t&&(e.Tb(0,"mat-option",32),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.kc("value",t),e.Cb(1),e.Dc("",t.nombre," ")}}function G(t,i){1&t&&(e.Tb(0,"th",33),e.Bc(1," C\xf3digo Solicitud "),e.Sb())}function z(t,i){if(1&t&&(e.Tb(0,"td",34),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.codigo," ")}}function M(t,i){1&t&&(e.Tb(0,"th",33),e.Bc(1," Descripci\xf3n Corta "),e.Sb())}function x(t,i){if(1&t&&(e.Tb(0,"td",34),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.descripcion_corta," ")}}function V(t,i){1&t&&(e.Tb(0,"th",33),e.Bc(1," Fecha y Hora "),e.Sb())}function j(t,i){if(1&t&&(e.Tb(0,"td",34),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.fecha_hora," ")}}function E(t,i){1&t&&(e.Tb(0,"th",33),e.Bc(1," # Materiales "),e.Sb())}function P(t,i){if(1&t&&(e.Tb(0,"td",34),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.cantidad_materiales," ")}}function K(t,i){1&t&&(e.Tb(0,"th",33),e.Bc(1," Creador "),e.Sb())}function U(t,i){if(1&t&&(e.Tb(0,"td",34),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.creador," ")}}function q(t,i){1&t&&(e.Tb(0,"th",33),e.Bc(1," Motivo Rechazo "),e.Sb())}function J(t,i){if(1&t&&(e.Tb(0,"td",34),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.Cb(1),e.Dc(" ",t.perfil," ")}}function X(t,i){1&t&&(e.Tb(0,"th",33),e.Bc(1," Acciones "),e.Sb())}function W(t,i){if(1&t){const t=e.Ub();e.Tb(0,"td",34),e.Tb(1,"button",35,36),e.ac("click",function(){e.tc(t);const c=i.$implicit;return e.ec().verDetalleSolicitud(c)}),e.Bc(3," Ver "),e.Sb(),e.Sb()}}function Y(t,i){1&t&&e.Ob(0,"tr",37)}function Z(t,i){1&t&&e.Ob(0,"tr",38)}let tt=(()=>{class t{constructor(t,i,c){this.router=t,this.formBuilder=i,this.formValidatorService=c,this.displayedColumns=["codigo","descripcion_corta","fecha_hora","cantidad_materiales","creador","motivo_rechazo","id"],this.listadoSolicitudes=[],this.listadoEstados=[],this.listadoLineasNegocio=[],this.submitted=!1,this.filtroForm=this.formBuilder.group({centro:[""],linea_negocio:[""],fecha_inicio:[""],fecha_fin:[""]})}ngOnInit(){}filtrarSolicitud(t){}verDetalleSolicitud(t){}}return t.\u0275fac=function(i){return new(i||t)(e.Nb(a.b),e.Nb(b.d),e.Nb(r.a))},t.\u0275cmp=e.Hb({type:t,selectors:[["app-pendiente-solicitud-rsc"]],decls:73,vars:10,consts:[[1,"contentmain"],[1,"breadcumb"],["routerLink","/dashboard/principal"],["routerLink","#"],[1,"bread-item"],[1,"filtros"],[3,"formGroup","ngSubmit"],["cols","6","rowHeight","80px"],["appearance","outline"],["matInput","","placeholder","centro","formControlName","centro"],["formControlName","linea_negocio"],[3,"value",4,"ngFor","ngForOf"],["matInput","","formControlName","fecha_inicio",3,"matDatepicker"],["matSuffix","",3,"for"],["color","primary"],["picker1",""],["matInput","","formControlName","fecha_fin",3,"matDatepicker"],["picker2",""],["mat-raised-button","","color","accent","type","submit",3,"disabled"],[1,"content-table"],["mat-table","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","codigo"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","descripcion_corta"],["matColumnDef","fecha_hora"],["matColumnDef","cantidad_materiales"],["matColumnDef","creador"],["matColumnDef","motivo_rechazo"],["matColumnDef","id"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[3,"value"],["mat-header-cell",""],["mat-cell",""],["mat-flat-button","","color","accent",3,"click"],["asignar_rol",""],["mat-header-row",""],["mat-row",""]],template:function(t,i){if(1&t&&(e.Tb(0,"div",0),e.Tb(1,"div",1),e.Tb(2,"a",2),e.Tb(3,"mat-icon"),e.Bc(4,"home"),e.Sb(),e.Sb(),e.Tb(5,"a",3),e.Tb(6,"span",4),e.Bc(7," / Repuestos y Suministros "),e.Sb(),e.Sb(),e.Tb(8,"a",3),e.Tb(9,"span",4),e.Bc(10," / Creaci\xf3n "),e.Sb(),e.Sb(),e.Tb(11,"a",3),e.Tb(12,"span",4),e.Bc(13," / Consulta de Solicitudes Pendientes"),e.Sb(),e.Sb(),e.Sb(),e.Ob(14,"br"),e.Tb(15,"div",5),e.Tb(16,"form",6),e.ac("ngSubmit",function(){return i.filtrarSolicitud(i.filtroForm.value)}),e.Tb(17,"mat-grid-list",7),e.Tb(18,"mat-grid-tile"),e.Tb(19,"mat-form-field",8),e.Tb(20,"mat-label"),e.Bc(21,"Centro"),e.Sb(),e.Ob(22,"input",9),e.Sb(),e.Sb(),e.Tb(23,"mat-grid-tile"),e.Tb(24,"mat-form-field",8),e.Tb(25,"mat-label"),e.Bc(26,"Linea de Negocio"),e.Sb(),e.Tb(27,"mat-select",10),e.Ac(28,I,2,2,"mat-option",11),e.Sb(),e.Sb(),e.Sb(),e.Tb(29,"mat-grid-tile"),e.Tb(30,"mat-form-field",8),e.Tb(31,"mat-label"),e.Bc(32,"Fecha Inicio"),e.Sb(),e.Ob(33,"input",12),e.Ob(34,"mat-datepicker-toggle",13),e.Ob(35,"mat-datepicker",14,15),e.Sb(),e.Sb(),e.Tb(37,"mat-grid-tile"),e.Tb(38,"mat-form-field",8),e.Tb(39,"mat-label"),e.Bc(40,"Fecha Fin"),e.Sb(),e.Ob(41,"input",16),e.Ob(42,"mat-datepicker-toggle",13),e.Ob(43,"mat-datepicker",14,17),e.Sb(),e.Sb(),e.Tb(45,"mat-grid-tile"),e.Tb(46,"button",18),e.Bc(47,"Buscar"),e.Sb(),e.Sb(),e.Sb(),e.Sb(),e.Sb(),e.Tb(48,"div",19),e.Tb(49,"table",20),e.Rb(50,21),e.Ac(51,G,2,0,"th",22),e.Ac(52,z,2,1,"td",23),e.Qb(),e.Rb(53,24),e.Ac(54,M,2,0,"th",22),e.Ac(55,x,2,1,"td",23),e.Qb(),e.Rb(56,25),e.Ac(57,V,2,0,"th",22),e.Ac(58,j,2,1,"td",23),e.Qb(),e.Rb(59,26),e.Ac(60,E,2,0,"th",22),e.Ac(61,P,2,1,"td",23),e.Qb(),e.Rb(62,27),e.Ac(63,K,2,0,"th",22),e.Ac(64,U,2,1,"td",23),e.Qb(),e.Rb(65,28),e.Ac(66,q,2,0,"th",22),e.Ac(67,J,2,1,"td",23),e.Qb(),e.Rb(68,29),e.Ac(69,X,2,0,"th",22),e.Ac(70,W,4,0,"td",23),e.Qb(),e.Ac(71,Y,1,0,"tr",30),e.Ac(72,Z,1,0,"tr",31),e.Sb(),e.Sb(),e.Sb()),2&t){const t=e.rc(36),c=e.rc(44);e.Cb(16),e.kc("formGroup",i.filtroForm),e.Cb(12),e.kc("ngForOf",i.listadoLineasNegocio),e.Cb(5),e.kc("matDatepicker",t),e.Cb(1),e.kc("for",t),e.Cb(7),e.kc("matDatepicker",c),e.Cb(1),e.kc("for",c),e.Cb(4),e.kc("disabled",i.filtroForm.invalid),e.Cb(3),e.kc("dataSource",i.listadoSolicitudes),e.Cb(22),e.kc("matHeaderRowDef",i.displayedColumns),e.Cb(1),e.kc("matRowDefColumns",i.displayedColumns)}},directives:[a.c,n.a,b.w,b.p,b.h,l.a,l.c,m.c,m.g,d.b,b.c,b.o,b.g,s.a,o.l,u.b,u.d,m.h,u.a,f.a,S.j,S.c,S.e,S.b,S.g,S.i,p.l,S.d,S.a,S.f,S.h],styles:[""]}),t})();function it(t,i){if(1&t&&(e.Tb(0,"mat-option",16),e.Bc(1),e.Sb()),2&t){const t=i.$implicit;e.kc("value",t),e.Cb(1),e.Dc("",t.nombre," ")}}const ct=[{path:"",redirectTo:"crearSolicitud",pathMatch:"full"},{path:"crearSolicitud",component:(()=>{class t{constructor(t,i){this.formBuilder=t,this.formValidatorService=i,this.listadoLineasNegocio=[],this.listadoMateriales=[],this.SolicitudForm=this.formBuilder.group({linea_negocio:[""],descripcion:[""],lista:{}})}ngOnInit(){}crearSolicitud(t){}}return t.\u0275fac=function(i){return new(i||t)(e.Nb(b.d),e.Nb(r.a))},t.\u0275cmp=e.Hb({type:t,selectors:[["app-nueva-solicitud-rsc"]],decls:39,vars:4,consts:[[1,"contentmain"],[1,"breadcumb"],["routerLink","/dashboard/principal"],["routerLink","#"],[1,"bread-item"],["routerLink","/repuestosSuministros/consultarSolicitudes"],[1,"cabecera"],[3,"formGroup","ngSubmit"],["cols","4","rowHeight","80px","formGroupName","cabecera_solicitud"],["appearance","outline"],["formControlName","linea_negocio"],[3,"value",4,"ngFor","ngForOf"],["colspan","2"],["matInput","","placeholder","Descripci\xf3n corta","formControlName","descripcion"],["mat-raised-button","","color","accent","type","submit",3,"disabled"],[1,"content-table"],[3,"value"]],template:function(t,i){1&t&&(e.Tb(0,"div",0),e.Tb(1,"div",1),e.Tb(2,"a",2),e.Tb(3,"mat-icon"),e.Bc(4,"home"),e.Sb(),e.Sb(),e.Tb(5,"a",3),e.Tb(6,"span",4),e.Bc(7," / Repuestos y Suministros "),e.Sb(),e.Sb(),e.Tb(8,"a",3),e.Tb(9,"span",4),e.Bc(10," / Creaci\xf3n "),e.Sb(),e.Sb(),e.Tb(11,"a",5),e.Tb(12,"span",4),e.Bc(13," / Consulta de Solicitudes Pendientes "),e.Sb(),e.Sb(),e.Tb(14,"a",3),e.Tb(15,"span",4),e.Bc(16," / Nueva Solicitud "),e.Sb(),e.Sb(),e.Sb(),e.Ob(17,"br"),e.Tb(18,"div",6),e.Tb(19,"form",7),e.ac("ngSubmit",function(){return i.crearSolicitud(i.SolicitudForm.value)}),e.Tb(20,"mat-grid-list",8),e.Tb(21,"mat-grid-tile"),e.Tb(22,"mat-form-field",9),e.Tb(23,"mat-label"),e.Bc(24,"Linea de Negocio"),e.Sb(),e.Tb(25,"mat-select",10),e.Ac(26,it,2,2,"mat-option",11),e.Sb(),e.Sb(),e.Sb(),e.Tb(27,"mat-grid-tile",12),e.Tb(28,"mat-form-field",9),e.Tb(29,"mat-label"),e.Bc(30,"Descripci\xf3n corta"),e.Sb(),e.Ob(31,"input",13),e.Sb(),e.Sb(),e.Tb(32,"mat-grid-tile"),e.Tb(33,"button",14),e.Bc(34,"Guardar"),e.Sb(),e.Bc(35," \xa0 "),e.Tb(36,"button",14),e.Bc(37,"Guardar y Enviar"),e.Sb(),e.Sb(),e.Sb(),e.Sb(),e.Sb(),e.Ob(38,"div",15),e.Sb()),2&t&&(e.Cb(19),e.kc("formGroup",i.SolicitudForm),e.Cb(7),e.kc("ngForOf",i.listadoLineasNegocio),e.Cb(7),e.kc("disabled",i.SolicitudForm.invalid),e.Cb(3),e.kc("disabled",i.SolicitudForm.invalid))},directives:[a.c,n.a,b.w,b.p,b.h,l.a,b.i,l.c,m.c,m.g,s.a,b.o,b.g,o.l,d.b,b.c,f.a,p.l],styles:[""]}),t})()},{path:"consultarSolicitudes",component:Q},{path:"consultarSolicitudesPendientes",component:tt}];let ot=(()=>{class t{}return t.\u0275mod=e.Lb({type:t}),t.\u0275inj=e.Kb({factory:function(i){return new(i||t)},imports:[[a.d.forChild(ct)],a.d]}),t})();var at=c("/1cH");let et=(()=>{class t{}return t.\u0275mod=e.Lb({type:t}),t.\u0275inj=e.Kb({factory:function(i){return new(i||t)},imports:[[o.c,ot,l.b,s.b,f.b,n.b,d.c,S.k,b.t,b.j,at.b,u.c,p.k,p.r]]}),t})()}}]);