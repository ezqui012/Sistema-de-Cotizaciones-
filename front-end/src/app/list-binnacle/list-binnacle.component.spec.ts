import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBinnacleComponent } from './list-binnacle.component';

describe('ListBinnacleComponent', () => {
  let component: ListBinnacleComponent;
  let fixture: ComponentFixture<ListBinnacleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBinnacleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBinnacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
