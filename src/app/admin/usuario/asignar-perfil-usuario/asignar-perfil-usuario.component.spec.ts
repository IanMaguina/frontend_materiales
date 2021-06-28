import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPerfilUsuarioComponent } from './asignar-perfil-usuario.component';

describe('AsignarPerfilUsuarioComponent', () => {
  let component: AsignarPerfilUsuarioComponent;
  let fixture: ComponentFixture<AsignarPerfilUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarPerfilUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
