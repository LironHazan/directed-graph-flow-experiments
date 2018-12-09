export const resetStyle = (d3, element) => {
d3.selectAll(element)
.style("fill", "lightgray");
return d3;
}

export const clearView = (svg) => svg.selectAll("*").remove();

export const mockedData = {
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

export const removeLinksRelations = (links, nodeId) => {
  return links.reduce((_links, link) => {
    if (link.source.id !== nodeId && link.target.id !== nodeId) {
        _links.push(link);
    }
    return _links;
}, []);
}

export const ticked = (link, node, edgepaths, edgelabels) => {
  link
      .attr("x1", function (d) {return d.source.x;})
      .attr("y1", function (d) {return d.source.y;})
      .attr("x2", function (d) {return d.target.x;})
      .attr("y2", function (d) {return d.target.y;});

  node.attr("transform", 
  function (d) {return "translate(" + d.x + ", " + d.y + ")";});

  edgepaths.attr('d', function (d) {
      return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
  });

  edgelabels.attr('transform', function (d) {
      if (d.target.x < d.source.x) {
          let bbox = this.getBBox();

          let rx = bbox.x + bbox.width / 2;
          let ry = bbox.y + bbox.height / 2;
          return 'rotate(180 ' + rx + ' ' + ry + ')';
      }
      else {
          return 'rotate(0)';
      }
  });
}

export const dragended = (d3, d, simulation) => {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart()
  d.fx = d.x;
  d.fy = d.y;
}

export const initDefinitions = (svg) =>
    svg.append('defs')
    .append('marker')
    .attrs({'id':'arrowhead',
        'viewBox':'-0 -5 10 10',
        'refX':34,
        'refY':0,
        'orient':'auto',
        'markerWidth':8,
        'markerHeight':8,
        'xoverflow':'visible'})
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#999')
    .style('stroke','none');

export const forceSimulation = (d3, {width, height}) => d3.forceSimulation()
.force("link", 
d3.forceLink()
.id(function (d) {return d.id;})
.distance(200)
.strength(2))
.force("charge", d3.forceManyBody())
.force("center", d3.forceCenter(width / 2, height / 2));