import { Injectable } from '@angular/core';
import * as d3 from "d3";
import "d3-selection-multi";

@Injectable({
  providedIn: 'root'
})
export class DirectedGraphExperimentService {

  constructor() { }

  private clearView(svg) {
    return svg.selectAll("*").remove();
  }

  private ticked(link, node, edgepaths, edgelabels) {
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

  private dragended(d3, d, simulation) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x;
    d.fy = d.y;
  }

  private initDefinitions(svg) {
    return svg.append('defs')
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
  }

  private forceSimulation(d3, {width, height}) {
    return d3.forceSimulation()
    .force("link", 
    d3.forceLink()
    .id(function (d) {return d.id;})
    .distance(200)
    .strength(2))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));
  }

  private _update(d3, svg, data) {
    let { links, nodes } = data;
    this.clearView(svg); // removes everything! 
    this.initDefinitions(svg);
    const simulation = this.forceSimulation(d3, {width: +svg.attr("width"),height: +svg.attr("height")});

    const link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .style("stroke", "#999")
        .style("stroke-opacity", ".6")
        .style("stroke-width", "2px")
        .attr("class", "link")
        .attr('marker-end','url(#arrowhead)')

    link.append("title")
        .text(function (d) {return d.type;});

    const edgepaths = svg.selectAll(".edgepath")
        .data(links)
        .enter()
        .append('path')
        .attrs({
            'class': 'edgepath',
            'fill-opacity': 0,
            'stroke-opacity': 0,
            'id': function (d, i) {return 'edgepath' + i}
        })
        .style("pointer-events", "none");

    const edgelabels = svg.selectAll(".edgelabel")
        .data(links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attrs({
            'class': 'edgelabel',
            'id': function (d, i) {return 'edgelabel' + i},
            'font-size': 10,
            'fill': '#aaa'
        });

    edgelabels.append('textPath')
        .attr('xlink:href', function (d, i) {return '#edgepath' + i})
        .style("text-anchor", "middle")
        .style("pointer-events", "none")
        .attr("startOffset", "50%")
        .text(function (d) {return d.type});

    const node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .call(d3.drag()
               .on("start", (d) => this.dragended(d3, d, simulation))
               .on("drag", function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            })
               .on("end", (d) => this.dragended(d3, d, simulation))
         );

    node.append('circle')
    .style("stroke", "black")
    .style("fill", "lightgray")
    .style("cursor", "pointer")
    .style("stroke-opacity", "0.5")
    .attr("r", 40); //radius
    
    svg.selectAll('circle')
    .on('click', function () { // arrow function will produce this = undefined
       d3.selectAll('circle')
       .style("fill", "lightgray");

       d3.select(this)
        .style("fill", "aliceblue");
     }).on('mouseover', function () {
        d3.selectAll('circle')
        .style("stroke", "black");
        
        d3.select(this)
        .style("stroke", "green");
    });

      // appand trash icons to all nodes
      node.append('svg:foreignObject')
      .attr("class", "delete-icon")
      .html('<div style="color:green;padding-left: 50px;">remove</div>');
  
      svg.selectAll('.delete-icon')
      .on('click', function ({id}) {
          // subject to notify delte
          console.log(id);
        })
    
    const nodeText = node.append("text")
        .style("text-anchor", "middle")
        .attr("dy", -3)
        .attr("y", -25);

    nodeText.selectAll("tspan.text")
    .data((d) =>  d.name.split(" "))
    .enter()
    .append("tspan")
    .attr("class", "text")
    .text(d => d)
    .attr("x", -10)
    .attr("dx", 10)
    .attr("dy", 22);

    node.append("title")
        .text(function (d) {return d.id;});

    simulation
        .nodes(nodes)
        .on("tick", () => { this.ticked(link, node, edgepaths, edgelabels)});

    simulation.force("link")
        .links(links);
  }

  public update(data, element) {
    const svg = d3.select(element);
    return this._update(d3, svg, data);
  }
}
