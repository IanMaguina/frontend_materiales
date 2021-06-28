import { TestBed } from '@angular/core/testing';

import { GrupoCargaService } from './grupo-carga.service';

describe('GrupoCargaService', () => {
  let service: GrupoCargaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoCargaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
