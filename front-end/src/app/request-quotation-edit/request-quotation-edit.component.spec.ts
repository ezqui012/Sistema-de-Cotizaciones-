import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQuotationEditComponent } from './request-quotation-edit.component';

describe('RequestQuotationEditComponent', () => {
  let component: RequestQuotationEditComponent;
  let fixture: ComponentFixture<RequestQuotationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestQuotationEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestQuotationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
