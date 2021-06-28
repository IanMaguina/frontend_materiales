import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSolicitudGestorPtcComponent } from './editar-solicitud-gestor-ptc.component';

describe('EditarSolicitudGestorPtcComponent', () => {
  let component: EditarSolicitudGestorPtcComponent;
  let fixture: ComponentFixture<EditarSolicitudGestorPtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSolicitudGestorPtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSolicitudGestorPtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
