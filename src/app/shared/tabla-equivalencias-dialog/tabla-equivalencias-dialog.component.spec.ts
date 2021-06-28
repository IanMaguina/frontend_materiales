import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEquivalenciasDialogComponent } from './tabla-equivalencias-dialog.component';

describe('TablaEquivalenciasDialogComponent', () => {
  let component: TablaEquivalenciasDialogComponent;
  let fixture: ComponentFixture<TablaEquivalenciasDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaEquivalenciasDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEquivalenciasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
