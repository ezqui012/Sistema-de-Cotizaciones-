import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserAdministrativeComponent } from './register-user-administrative.component';

describe('RegisterUserAdministrativeComponent', () => {
  let component: RegisterUserAdministrativeComponent;
  let fixture: ComponentFixture<RegisterUserAdministrativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserAdministrativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserAdministrativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
