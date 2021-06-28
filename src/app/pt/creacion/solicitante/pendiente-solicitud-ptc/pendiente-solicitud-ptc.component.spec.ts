import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendienteSolicitudPtcComponent } from './pendiente-solicitud-ptc.component';

describe('PendienteSolicitudPtcComponent', () => {
  let component: PendienteSolicitudPtcComponent;
  let fixture: ComponentFixture<PendienteSolicitudPtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendienteSolicitudPtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendienteSolicitudPtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
