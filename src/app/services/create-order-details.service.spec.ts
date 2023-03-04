import { TestBed } from '@angular/core/testing';

import { CreateOrderDetailsService } from './create-order-details.service';

describe('CreateOrderDetailsService', () => {
  let service: CreateOrderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateOrderDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
