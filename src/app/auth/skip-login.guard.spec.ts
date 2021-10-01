import { TestBed } from '@angular/core/testing';

import { SkipLoginGuard } from './skip-login.guard';

describe('SkipLoginGuard', () => {
  let guard: SkipLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SkipLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
