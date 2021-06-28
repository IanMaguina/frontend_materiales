import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnexosDialogComponent } from './lista-anexos-dialog.component';

describe('ListaAnexosDialogComponent', () => {
  let component: ListaAnexosDialogComponent;
  let fixture: ComponentFixture<ListaAnexosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAnexosDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAnexosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
