import { TestBed } from '@angular/core/testing';

import { GrupoTipoPosicionService } from './grupo-tipo-posicion.service';

describe('GrupoTipoPosicionService', () => {
  let service: GrupoTipoPosicionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoTipoPosicionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
