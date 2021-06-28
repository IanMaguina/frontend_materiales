import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaSolicitudPendientePtcComponent } from './bandeja-solicitud-pendiente-ptc.component';

describe('BandejaSolicitudPendientePtcComponent', () => {
  let component: BandejaSolicitudPendientePtcComponent;
  let fixture: ComponentFixture<BandejaSolicitudPendientePtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaSolicitudPendientePtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaSolicitudPendientePtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
