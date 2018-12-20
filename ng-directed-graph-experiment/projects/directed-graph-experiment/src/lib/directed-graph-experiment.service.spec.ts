import { TestBed } from '@angular/core/testing';

import { DirectedGraphExperimentService } from './directed-graph-experiment.service';

describe('DirectedGraphExperimentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectedGraphExperimentService = TestBed.get(DirectedGraphExperimentService);
    expect(service).toBeTruthy();
  });
});
