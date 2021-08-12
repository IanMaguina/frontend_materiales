import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaMaterialSapComponent } from './bandeja-material-sap.component';

describe('BandejaMaterialSapComponent', () => {
  let component: BandejaMaterialSapComponent;
  let fixture: ComponentFixture<BandejaMaterialSapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandejaMaterialSapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaMaterialSapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
