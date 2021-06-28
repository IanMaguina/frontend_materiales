import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAnexosMaterialDialogComponent } from './lista-anexos-material-dialog.component';

describe('ListaAnexosMaterialDialogComponent', () => {
  let component: ListaAnexosMaterialDialogComponent;
  let fixture: ComponentFixture<ListaAnexosMaterialDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAnexosMaterialDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAnexosMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
