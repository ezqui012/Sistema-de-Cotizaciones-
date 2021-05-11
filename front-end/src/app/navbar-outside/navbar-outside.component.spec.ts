import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOutsideComponent } from './navbar-outside.component';

describe('NavbarOutsideComponent', () => {
  let component: NavbarOutsideComponent;
  let fixture: ComponentFixture<NavbarOutsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarOutsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarOutsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
