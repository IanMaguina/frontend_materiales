import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteTiempoSolicitudComponent } from './reporte-tiempo-solicitud.component';

describe('ReporteTiempoSolicitudComponent', () => {
  let component: ReporteTiempoSolicitudComponent;
  let fixture: ComponentFixture<ReporteTiempoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteTiempoSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteTiempoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
