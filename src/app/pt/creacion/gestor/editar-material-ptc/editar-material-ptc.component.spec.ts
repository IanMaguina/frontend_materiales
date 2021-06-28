import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMaterialPtcComponent } from './editar-material-ptc.component';

describe('EditarMaterialPtcComponent', () => {
  let component: EditarMaterialPtcComponent;
  let fixture: ComponentFixture<EditarMaterialPtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMaterialPtcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMaterialPtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
