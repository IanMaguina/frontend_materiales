import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendienteSolicitudMpcComponent } from './pendiente-solicitud-mpc.component';

describe('PendienteSolicitudMpcComponent', () => {
  let component: PendienteSolicitudMpcComponent;
  let fixture: ComponentFixture<PendienteSolicitudMpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendienteSolicitudMpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendienteSolicitudMpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
