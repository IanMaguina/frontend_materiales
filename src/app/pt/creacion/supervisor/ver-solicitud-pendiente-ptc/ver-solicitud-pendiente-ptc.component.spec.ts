import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSolicitudPendientePtcComponent } from './ver-solicitud-pendiente-ptc.component';

describe('VerSolicitudPendientePtcComponent', () => {
  let component: VerSolicitudPendientePtcComponent;
  let fixture: ComponentFixture<VerSolicitudPendientePtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerSolicitudPendientePtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSolicitudPendientePtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
