import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteListFinalizedComponent } from './quote-list-finalized.component';

describe('QuoteListFinalizedComponent', () => {
  let component: QuoteListFinalizedComponent;
  let fixture: ComponentFixture<QuoteListFinalizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteListFinalizedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListFinalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
