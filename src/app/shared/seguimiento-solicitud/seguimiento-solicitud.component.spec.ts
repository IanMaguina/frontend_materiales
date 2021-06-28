import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoSolicitudComponent } from './seguimiento-solicitud.component';

describe('SeguimientoSolicitudComponent', () => {
  let component: SeguimientoSolicitudComponent;
  let fixture: ComponentFixture<SeguimientoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
