import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastInventoriesCardComponent } from './last-inventories-card.component';

describe('LastInventoriesCardComponent', () => {
  let component: LastInventoriesCardComponent;
  let fixture: ComponentFixture<LastInventoriesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastInventoriesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastInventoriesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
