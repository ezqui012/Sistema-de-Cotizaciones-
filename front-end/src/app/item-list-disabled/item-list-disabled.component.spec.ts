import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListDisabledComponent } from './item-list-disabled.component';

describe('ItemListDisabledComponent', () => {
  let component: ItemListDisabledComponent;
  let fixture: ComponentFixture<ItemListDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListDisabledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
