import { TestBed } from '@angular/core/testing';

import { GrupoImputacionMaterialService } from './grupo-imputacion-material.service';

describe('GrupoImputacionMaterialService', () => {
  let service: GrupoImputacionMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoImputacionMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
