import { TestBed } from '@angular/core/testing';

import { GrupoMaterial1Service } from './grupo-material1.service';

describe('GrupoMaterial1Service', () => {
  let service: GrupoMaterial1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoMaterial1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
