import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSolicitudAocComponent } from './nueva-solicitud-aoc.component';

describe('NuevaSolicitudAocComponent', () => {
  let component: NuevaSolicitudAocComponent;
  let fixture: ComponentFixture<NuevaSolicitudAocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaSolicitudAocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaSolicitudAocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
