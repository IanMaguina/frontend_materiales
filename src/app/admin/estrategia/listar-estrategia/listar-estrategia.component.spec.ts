import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstrategiaComponent } from './listar-estrategia.component';

describe('ListarEstrategiaComponent', () => {
  let component: ListarEstrategiaComponent;
  let fixture: ComponentFixture<ListarEstrategiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEstrategiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEstrategiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
