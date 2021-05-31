import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparativeQuotesComponent } from './comparative-quotes.component';

describe('ComparativeQuotesComponent', () => {
  let component: ComparativeQuotesComponent;
  let fixture: ComponentFixture<ComparativeQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparativeQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparativeQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
