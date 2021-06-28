import { TestBed } from '@angular/core/testing';

import { PerfilControlFabricacionService } from './perfil-control-fabricacion.service';

describe('PerfilControlFabricacionService', () => {
  let service: PerfilControlFabricacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilControlFabricacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
