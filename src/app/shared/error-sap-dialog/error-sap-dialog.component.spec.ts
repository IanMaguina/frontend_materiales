import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSapDialogComponent } from './error-sap-dialog.component';

describe('ErrorSapDialogComponent', () => {
  let component: ErrorSapDialogComponent;
  let fixture: ComponentFixture<ErrorSapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorSapDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
