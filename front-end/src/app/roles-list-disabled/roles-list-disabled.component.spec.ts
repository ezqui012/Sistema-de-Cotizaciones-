import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesListDisabledComponent } from './roles-list-disabled.component';

describe('RolesListDisabledComponent', () => {
  let component: RolesListDisabledComponent;
  let fixture: ComponentFixture<RolesListDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesListDisabledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesListDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
