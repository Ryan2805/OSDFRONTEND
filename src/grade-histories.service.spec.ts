import { TestBed } from '@angular/core/testing';

import { GradeHistoriesService } from './grade-histories.service';

describe('GradeHistoriesService', () => {
  let service: GradeHistoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeHistoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
