import { TestBed } from '@angular/core/testing';

import { CampoVistaService } from './campo-vista.service';

describe('CampoVistaService', () => {
  let service: CampoVistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampoVistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
