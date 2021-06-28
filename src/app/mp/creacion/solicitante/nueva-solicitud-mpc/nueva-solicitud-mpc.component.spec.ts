import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSolicitudMpcComponent } from './nueva-solicitud-mpc.component';

describe('NuevaSolicitudMpcComponent', () => {
  let component: NuevaSolicitudMpcComponent;
  let fixture: ComponentFixture<NuevaSolicitudMpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaSolicitudMpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaSolicitudMpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
