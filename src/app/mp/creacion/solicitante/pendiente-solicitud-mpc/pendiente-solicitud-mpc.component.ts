import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidatorService } from '../../../../servicios/form-validator.service';


@Component({
  selector: 'app-pendiente-solicitud-mpc',
  templateUrl: './pendiente-solicitud-mpc.component.html',
  styleUrls: ['./pendiente-solicitud-mpc.component.css']
})
export class PendienteSolicitudMpcComponent implements OnInit {

  filtroForm: any;

  displayedColumns: string[] = [
    'codigo',
    'descripcion_corta',
    'fecha_hora',
    'cantidad_materiales',
    'creador',
    'motivo_rechazo',
    'id',
  ];
  listadoSolicitudes: any[] = [];
  listadoEstados: any[] =[];
  listadoLineasNegocio:any[] = [];

  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private formValidatorService:FormValidatorService,
  ) {
    this.filtroForm = this.formBuilder.group({
      centro: [''],
      linea_negocio: [''],
      fecha_inicio: [''],
      fecha_fin: ['']
    })
   }

  ngOnInit(): void {
  }

  filtrarSolicitud(form:any){

  }
  verDetalleSolicitud(item:any){

  }

}
