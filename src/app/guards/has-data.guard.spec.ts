import { TestBed } from '@angular/core/testing';

import { HasDataGuard } from './has-data.guard';

describe('HasDataGuard', () => {
  let guard: HasDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
