import { TestBed } from '@angular/core/testing';

import { AuthApproveGuard } from './auth-approve.guard';

describe('AuthApproveGuard', () => {
  let guard: AuthApproveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthApproveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
