import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoSolicitudComponent } from './flujo-solicitud.component';

describe('FlujoSolicitudComponent', () => {
  let component: FlujoSolicitudComponent;
  let fixture: ComponentFixture<FlujoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlujoSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
