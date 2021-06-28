import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoSolicitudPtcComponent } from './contenido-solicitud-ptc.component';

describe('ContenidoSolicitudPtcComponent', () => {
  let component: ContenidoSolicitudPtcComponent;
  let fixture: ComponentFixture<ContenidoSolicitudPtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoSolicitudPtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoSolicitudPtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
