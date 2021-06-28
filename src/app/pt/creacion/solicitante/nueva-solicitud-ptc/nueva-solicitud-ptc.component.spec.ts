import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSolicitudPtcComponent } from './nueva-solicitud-ptc.component';

describe('NuevaSolicitudPtcComponent', () => {
  let component: NuevaSolicitudPtcComponent;
  let fixture: ComponentFixture<NuevaSolicitudPtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaSolicitudPtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaSolicitudPtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
