import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQuotationListComponent } from './request-quotation-list.component';

describe('RequestQuotationListComponent', () => {
  let component: RequestQuotationListComponent;
  let fixture: ComponentFixture<RequestQuotationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestQuotationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestQuotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
