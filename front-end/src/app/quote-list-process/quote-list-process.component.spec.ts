import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteListProcessComponent } from './quote-list-process.component';

describe('QuoteListProcessComponent', () => {
  let component: QuoteListProcessComponent;
  let fixture: ComponentFixture<QuoteListProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteListProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
