import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendienteSolicitudAocComponent } from './pendiente-solicitud-aoc.component';

describe('PendienteSolicitudAocComponent', () => {
  let component: PendienteSolicitudAocComponent;
  let fixture: ComponentFixture<PendienteSolicitudAocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendienteSolicitudAocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendienteSolicitudAocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
