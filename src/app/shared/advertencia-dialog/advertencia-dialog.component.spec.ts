import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertenciaDialogComponent } from './advertencia-dialog.component';

describe('AdvertenciaDialogComponent', () => {
  let component: AdvertenciaDialogComponent;
  let fixture: ComponentFixture<AdvertenciaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertenciaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertenciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
