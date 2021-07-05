import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolListDisabledComponent } from './school-list-disabled.component';

describe('SchoolListDisabledComponent', () => {
  let component: SchoolListDisabledComponent;
  let fixture: ComponentFixture<SchoolListDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolListDisabledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolListDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
