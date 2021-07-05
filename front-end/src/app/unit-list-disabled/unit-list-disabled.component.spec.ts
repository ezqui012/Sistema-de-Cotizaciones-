import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitListDisabledComponent } from './unit-list-disabled.component';

describe('UnitListDisabledComponent', () => {
  let component: UnitListDisabledComponent;
  let fixture: ComponentFixture<UnitListDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitListDisabledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
