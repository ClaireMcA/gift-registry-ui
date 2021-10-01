import { TestBed } from '@angular/core/testing';

import { RegistryItemService } from './registry-item.service';

describe('RegistryItemService', () => {
  let service: RegistryItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistryItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
