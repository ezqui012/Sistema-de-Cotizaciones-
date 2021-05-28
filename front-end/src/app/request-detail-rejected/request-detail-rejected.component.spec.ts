import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailRejectedComponent } from './request-detail-rejected.component';

describe('RequestDetailRejectedComponent', () => {
  let component: RequestDetailRejectedComponent;
  let fixture: ComponentFixture<RequestDetailRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDetailRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDetailRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
