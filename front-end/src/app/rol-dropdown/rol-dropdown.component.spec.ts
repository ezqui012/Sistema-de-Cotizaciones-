import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolDropdownComponent } from './rol-dropdown.component';

describe('RolDropdownComponent', () => {
  let component: RolDropdownComponent;
  let fixture: ComponentFixture<RolDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
