import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMaterialPtcComponent } from './ver-material-ptc.component';

describe('VerMaterialPtcComponent', () => {
  let component: VerMaterialPtcComponent;
  let fixture: ComponentFixture<VerMaterialPtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMaterialPtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMaterialPtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
