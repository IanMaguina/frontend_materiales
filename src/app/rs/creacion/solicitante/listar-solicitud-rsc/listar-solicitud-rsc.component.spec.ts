import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicitudRscComponent } from './listar-solicitud-rsc.component';

describe('ListarSolicitudRscComponent', () => {
  let component: ListarSolicitudRscComponent;
  let fixture: ComponentFixture<ListarSolicitudRscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSolicitudRscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudRscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
