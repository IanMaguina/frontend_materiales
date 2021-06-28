import { TestBed } from '@angular/core/testing';

import { PartidaArancelariaService } from './partida-arancelaria.service';

describe('PartidaArancelariaService', () => {
  let service: PartidaArancelariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartidaArancelariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
