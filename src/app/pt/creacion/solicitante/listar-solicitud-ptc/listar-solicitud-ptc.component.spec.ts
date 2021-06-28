import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicitudPtcComponent } from './listar-solicitud-ptc.component';

describe('ListarSolicitudPtcComponent', () => {
  let component: ListarSolicitudPtcComponent;
  let fixture: ComponentFixture<ListarSolicitudPtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSolicitudPtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudPtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
