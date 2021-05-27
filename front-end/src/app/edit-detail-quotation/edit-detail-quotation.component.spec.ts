import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailQuotationComponent } from './edit-detail-quotation.component';

describe('EditDetailQuotationComponent', () => {
  let component: EditDetailQuotationComponent;
  let fixture: ComponentFixture<EditDetailQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
