export const resetStyle = (d3, element) => {
d3.selectAll(element)
.style("fill", "lightgray");
return d3;
}

export const mockedData = {
    "nodes": [
      {
        "name": "Node1 one",
        "label": "Node1",
        "id": 1
      },
      {
        "name": "Node2",
        "label": "Node2",
        "id": 2
      },
      {
        "name": "Node3",
        "label": "Node3",
        "id": 3
      },
      {
        "name": "Node4",
        "label": "Node4",
        "id": 4
      }
    ],
    "links": [
      {
        "source": 1,
        "target": 2,
        "type": "Foo",
        "since": 2010
      },
      {
        "source": 1,
        "target": 3,
        "type": "Bar"
      },
      {
        "source": 2,
        "target": 3,
        "type": "Baz"
      },
      {
        "source": 3,
        "target": 4,
        "type": "Foo2"
      }
    ]
  }