import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendienteSolicitudRscComponent } from './pendiente-solicitud-rsc.component';

describe('PendienteSolicitudRscComponent', () => {
  let component: PendienteSolicitudRscComponent;
  let fixture: ComponentFixture<PendienteSolicitudRscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendienteSolicitudRscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendienteSolicitudRscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
