import { TestBed } from '@angular/core/testing';

import { AuthRequestGuard } from './auth-request.guard';

describe('AuthRequestGuard', () => {
  let guard: AuthRequestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthRequestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
