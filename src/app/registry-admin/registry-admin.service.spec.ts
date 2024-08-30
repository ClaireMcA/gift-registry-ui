import { TestBed } from '@angular/core/testing';

import { RegistryAdminService } from './registry-admin.service';

describe('RegistryAdminService', () => {
  let service: RegistryAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistryAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
