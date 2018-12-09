import * as d3 from "d3";
import "d3-selection-multi";
import {mockedData, 
    clearView, 
    removeLinksRelations, 
    ticked, 
    dragended,
    initDefinitions,
    forceSimulation
} from './utils';

const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

export const render = (data) => {
    
    let { links, nodes } = data;
    clearView(svg); // removes everything! 
    initDefinitions(svg);
    const simulation = forceSimulation(d3, {width,height});

    const link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
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
               .on("start", (d) => dragended(d3, d, simulation))
               .on("drag", function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            })
               .on("end", (d) => dragended(d3, d, simulation))
         );

    node.append('circle').attr("r", 40); //radius
    svg.selectAll('circle')
    .on('click', function () { // arrow function will produce this = undefined
       d3.selectAll('circle')
       .style("fill", "lightgray");
       d3.select(this)
        .style("fill", "aliceblue");
     })
     .on('mouseover', function () {
        d3.selectAll('circle')
        .style("stroke", "black");
        
        d3.select(this)
        .style("stroke", "green");
    });
     
    // appand trash icons to all nodes
    node.append('svg:foreignObject')
    .attr("class", "delete-icon")
    .html('<i class="fa fa-trash"></i>');

    svg.selectAll('.delete-icon')
    .on('click', function ({id}) {
        links = removeLinksRelations(links, id);
        nodes = nodes.filter(node => id !== node.id);
        render({ links, nodes });
      })

    const nodeText = node.append("text")
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
        .on("tick", () => { ticked(link, node, edgepaths, edgelabels)});

    simulation.force("link")
        .links(links);
}

render(mockedData);

