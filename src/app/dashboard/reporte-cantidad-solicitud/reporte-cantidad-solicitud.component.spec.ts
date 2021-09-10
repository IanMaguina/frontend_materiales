import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCantidadSolicitudComponent } from './reporte-cantidad-solicitud.component';

describe('ReporteCantidadSolicitudComponent', () => {
  let component: ReporteCantidadSolicitudComponent;
  let fixture: ComponentFixture<ReporteCantidadSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCantidadSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCantidadSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
