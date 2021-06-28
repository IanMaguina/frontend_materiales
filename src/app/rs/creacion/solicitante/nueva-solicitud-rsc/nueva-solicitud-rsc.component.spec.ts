import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSolicitudRscComponent } from './nueva-solicitud-rsc.component';

describe('NuevaSolicitudRscComponent', () => {
  let component: NuevaSolicitudRscComponent;
  let fixture: ComponentFixture<NuevaSolicitudRscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaSolicitudRscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaSolicitudRscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
