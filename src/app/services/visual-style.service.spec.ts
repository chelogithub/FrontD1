import { TestBed } from '@angular/core/testing';

import { VisualStyleService } from './visual-style.service';

describe('VisualStyleService', () => {
  let service: VisualStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
