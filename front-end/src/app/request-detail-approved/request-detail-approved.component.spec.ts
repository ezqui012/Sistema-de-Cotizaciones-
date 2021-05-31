import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailApprovedComponent } from './request-detail-approved.component';

describe('RequestDetailApprovedComponent', () => {
  let component: RequestDetailApprovedComponent;
  let fixture: ComponentFixture<RequestDetailApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDetailApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDetailApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
