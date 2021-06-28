import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormValidatorService } from '../../../../servicios/form-validator.service';

@Component({
  selector: 'app-nueva-solicitud-aoc',
  templateUrl: './nueva-solicitud-aoc.component.html',
  styleUrls: ['./nueva-solicitud-aoc.component.css']
})
export class NuevaSolicitudAocComponent implements OnInit {

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
