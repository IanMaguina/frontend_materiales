import { TestBed } from '@angular/core/testing';

import { JerarquiaProductoService } from './jerarquia-producto.service';

describe('JerarquiaProductoService', () => {
  let service: JerarquiaProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JerarquiaProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
