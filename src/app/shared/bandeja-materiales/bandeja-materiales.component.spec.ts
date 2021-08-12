import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaMaterialesComponent } from './bandeja-materiales.component';

describe('BandejaMaterialesComponent', () => {
  let component: BandejaMaterialesComponent;
  let fixture: ComponentFixture<BandejaMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
