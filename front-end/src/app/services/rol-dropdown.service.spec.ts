import { TestBed } from '@angular/core/testing';

import { RolDropdownService } from './rol-dropdown.service';

describe('RolDropdownService', () => {
  let service: RolDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
