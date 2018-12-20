import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-testapp';

  public mockedData = {
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
      },
      {
        "name": "Node4",
        "label": "Node4",
        "id": 5,
        "links": [6]
      },
      {
        "name": "Node4",
        "label": "Node4",
        "id": 6,
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
      },
      {
        "id": 5,
        "source": 5,
        "target": 6,
        "type": "Baz"
      },
      {
        "id": 6,
        "source": 3,
        "target": 4,
        "type": "Foo2"
      }
    ]
  }
}
