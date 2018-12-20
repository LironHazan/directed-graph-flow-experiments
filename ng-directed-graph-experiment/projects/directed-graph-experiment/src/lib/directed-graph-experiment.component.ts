import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {DirectedGraphExperimentService} from './directed-graph-experiment.service';

@Component({
  selector: 'dge-directed-graph-experiment',
  template: `
      <svg #directedGraphExperiment width="900" height="600"></svg>
  `,
})
export class DirectedGraphExperimentComponent implements OnInit {

  @ViewChild('directedGraphExperiment') graphElement: ElementRef;

  constructor(private directedGraphExperimentService: DirectedGraphExperimentService) { }

  ngOnInit() {}

  @Input()
  set data (data: any) {
    this.directedGraphExperimentService.update(data, this.graphElement.nativeElement);
  }


}
