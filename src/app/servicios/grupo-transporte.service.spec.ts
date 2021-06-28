import { TestBed } from '@angular/core/testing';

import { GrupoTransporteService } from './grupo-transporte.service';

describe('GrupoTransporteService', () => {
  let service: GrupoTransporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoTransporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
