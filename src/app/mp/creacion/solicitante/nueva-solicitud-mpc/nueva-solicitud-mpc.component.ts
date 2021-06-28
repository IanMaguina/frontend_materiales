import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormValidatorService } from '../../../../servicios/form-validator.service';

@Component({
  selector: 'app-nueva-solicitud-mpc',
  templateUrl: './nueva-solicitud-mpc.component.html',
  styleUrls: ['./nueva-solicitud-mpc.component.css']
})
export class NuevaSolicitudMpcComponent implements OnInit {

  SolicitudForm:any;
  listadoLineasNegocio:any[] = [];
  listadoMateriales:any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formValidatorService:FormValidatorService,
  ) {

    this.SolicitudForm = this.formBuilder.group({

      linea_negocio: [''],
      descripcion: [''],
      lista: {},
    })
  }

  ngOnInit(): void {
  }

  crearSolicitud(form:any){

  }
}
