import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCreateComponent } from './school-create.component';

describe('SchoolCreateComponent', () => {
  let component: SchoolCreateComponent;
  let fixture: ComponentFixture<SchoolCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
