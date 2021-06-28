import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSolicitudPtcComponent } from './editar-solicitud-ptc.component';

describe('EditarSolicitudPtcComponent', () => {
  let component: EditarSolicitudPtcComponent;
  let fixture: ComponentFixture<EditarSolicitudPtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSolicitudPtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSolicitudPtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
