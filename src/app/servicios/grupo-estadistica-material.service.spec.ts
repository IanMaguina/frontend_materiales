import { TestBed } from '@angular/core/testing';

import { GrupoEstadisticaMaterialService } from './grupo-estadistica-material.service';

describe('GrupoEstadisticaMaterialService', () => {
  let service: GrupoEstadisticaMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoEstadisticaMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
