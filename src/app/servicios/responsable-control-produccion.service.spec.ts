import { TestBed } from '@angular/core/testing';

import { ResponsableControlProduccionService } from './responsable-control-produccion.service';

describe('ResponsableControlProduccionService', () => {
  let service: ResponsableControlProduccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsableControlProduccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
