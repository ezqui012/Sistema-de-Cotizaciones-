import { TestBed } from '@angular/core/testing';

import { AuthQuoteGuard } from './auth-quote.guard';

describe('AuthQuoteGuard', () => {
  let guard: AuthQuoteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthQuoteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
