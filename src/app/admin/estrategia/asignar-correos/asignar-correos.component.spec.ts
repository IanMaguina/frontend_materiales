import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCorreosComponent } from './asignar-correos.component';

describe('AsignarCorreosComponent', () => {
  let component: AsignarCorreosComponent;
  let fixture: ComponentFixture<AsignarCorreosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarCorreosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarCorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
