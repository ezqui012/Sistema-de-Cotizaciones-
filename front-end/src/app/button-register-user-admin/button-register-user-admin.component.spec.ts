import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRegisterUserAdminComponent } from './button-register-user-admin.component';

describe('ButtonRegisterUserAdminComponent', () => {
  let component: ButtonRegisterUserAdminComponent;
  let fixture: ComponentFixture<ButtonRegisterUserAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonRegisterUserAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRegisterUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
