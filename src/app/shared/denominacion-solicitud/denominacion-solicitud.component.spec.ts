import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenominacionSolicitudComponent } from './denominacion-solicitud.component';

describe('DenominacionSolicitudComponent', () => {
  let component: DenominacionSolicitudComponent;
  let fixture: ComponentFixture<DenominacionSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenominacionSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenominacionSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
