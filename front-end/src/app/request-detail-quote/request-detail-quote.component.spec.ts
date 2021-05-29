import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailQuoteComponent } from './request-detail-quote.component';

describe('RequestDetailQuoteComponent', () => {
  let component: RequestDetailQuoteComponent;
  let fixture: ComponentFixture<RequestDetailQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDetailQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDetailQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
