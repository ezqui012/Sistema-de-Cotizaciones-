import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListDisabledComponent } from './user-list-disabled.component';

describe('UserListDisabledComponent', () => {
  let component: UserListDisabledComponent;
  let fixture: ComponentFixture<UserListDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListDisabledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
