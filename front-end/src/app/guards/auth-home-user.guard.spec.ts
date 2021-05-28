import { TestBed } from '@angular/core/testing';

import { AuthHomeUserGuard } from './auth-home-user.guard';

describe('AuthHomeUserGuard', () => {
  let guard: AuthHomeUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthHomeUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
