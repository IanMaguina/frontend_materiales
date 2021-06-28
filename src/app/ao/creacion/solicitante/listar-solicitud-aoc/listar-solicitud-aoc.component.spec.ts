import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicitudAocComponent } from './listar-solicitud-aoc.component';

describe('ListarSolicitudAocComponent', () => {
  let component: ListarSolicitudAocComponent;
  let fixture: ComponentFixture<ListarSolicitudAocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSolicitudAocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudAocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
