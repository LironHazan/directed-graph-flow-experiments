import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectedGraphExperimentComponent } from './directed-graph-experiment.component';

describe('DirectedGraphExperimentComponent', () => {
  let component: DirectedGraphExperimentComponent;
  let fixture: ComponentFixture<DirectedGraphExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectedGraphExperimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectedGraphExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
