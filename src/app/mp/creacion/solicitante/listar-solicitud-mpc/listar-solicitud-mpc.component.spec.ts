import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicitudMpcComponent } from './listar-solicitud-mpc.component';

describe('ListarSolicitudMpcComponent', () => {
  let component: ListarSolicitudMpcComponent;
  let fixture: ComponentFixture<ListarSolicitudMpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSolicitudMpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudMpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
