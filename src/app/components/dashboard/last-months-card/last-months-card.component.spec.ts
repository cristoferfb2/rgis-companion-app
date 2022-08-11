import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMonthsCardComponent } from './last-months-card.component';

describe('LastMonthsCardComponent', () => {
  let component: LastMonthsCardComponent;
  let fixture: ComponentFixture<LastMonthsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastMonthsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMonthsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
