import { TestBed } from '@angular/core/testing';

import { GrupoMaterial2Service } from './grupo-material2.service';

describe('GrupoMaterial2Service', () => {
  let service: GrupoMaterial2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoMaterial2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
