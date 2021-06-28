import { TestBed } from '@angular/core/testing';

import { UnidadPedidoService } from './unidad-pedido.service';

describe('UnidadPedidoService', () => {
  let service: UnidadPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
