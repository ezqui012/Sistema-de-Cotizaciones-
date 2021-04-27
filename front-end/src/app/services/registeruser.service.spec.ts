import { TestBed } from '@angular/core/testing';

import { RegisteruserService } from './registeruser.service';

describe('RegisteruserserviceService', () => {
  let service: RegisteruserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteruserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
