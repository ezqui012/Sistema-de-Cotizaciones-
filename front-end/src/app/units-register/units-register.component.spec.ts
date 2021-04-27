import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsRegisterComponent } from './units-register.component';

describe('UnitsRegisterComponent', () => {
  let component: UnitsRegisterComponent;
  let fixture: ComponentFixture<UnitsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
