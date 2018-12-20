import { Component, OnInit } from '@angular/core';
import {DirectedGraphExperimentService} from './directed-graph-experiment.service';
import "d3-selection-multi";

@Component({
  selector: 'dge-directed-graph-experiment',
  template: `
    <p>
      directed-graph-experiment works!
      <svg id="directed-graph-experiment" width=960 height=600></svg>
    </p>
  `,
  styles: []
})
export class DirectedGraphExperimentComponent implements OnInit {

  constructor(private directedGraphExperimentService: DirectedGraphExperimentService) { }
  mockedData = {
    "nodes": [
      {
        "name": "Node1 one",
        "label": "Node1",
        "id": 1,
        "links": [1, 2]
      },
      {
        "name": "Node2",
        "label": "Node2",
        "id": 2,
        "links": [2, 3]
      },
      {
        "name": "Node3",
        "label": "Node3",
        "id": 3,
        "links": [2, 3, 4]
      },
      {
        "name": "Node4",
        "label": "Node4",
        "id": 4,
        "links": [4]
      }
    ],
    "links": [
      {
        "id": 1,
        "source": 1,
        "target": 2,
        "type": "Foo",
        "since": 2010
      },
      {
        "id": 2,
        "source": 1,
        "target": 3,
        "type": "Bar"
      },
      {
        "id": 3,
        "source": 2,
        "target": 3,
        "type": "Baz"
      },
      {
        "id": 4,
        "source": 3,
        "target": 4,
        "type": "Foo2"
      }
    ]
  }
  ngOnInit() {
    this.directedGraphExperimentService.update(this.mockedData);
  }

}
