import { TestBed } from '@angular/core/testing';

import { CategoriaValoracionService } from './categoria-valoracion.service';

describe('CategoriaValoracionService', () => {
  let service: CategoriaValoracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaValoracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
