'use strict'

const COUNT = 500;
const DIST = 40;
const RADIUS_MAX = 10;
const RADIUS_MIN = 5;

const svg = document.querySelector('svg');
let width = svg.clientWidth;
let height = svg.clientHeight;

// Create random nodes
const nodes = randomPtsGenerator();
function randomPtsGenerator() {
  const nodes = [];
  for (let i = 0; i < COUNT; i++) {
    const node = {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * (RADIUS_MAX - RADIUS_MIN) + RADIUS_MIN
    }
    nodes.push(node);
  }
  return nodes;
}

// Bind data and draw nodes
const circles = d3.select('svg')
  .selectAll('circle')
  .data(nodes)
  .join('circle')
  .attr('r', d => d.r)
  .attr('cx', d => d.x)
  .attr('cy', d => d.y)
  .style('fill', 'orange');

// Radial force simulation
const simulation = d3.forceSimulation(nodes)
  .force('radial', d3.forceRadial(50, width / 2, height / 2));

  simulation.on('tick', () => {
    circles
      attr('cx', d => d.x)
      attr('cy', d => d.y);
  });


// // Create force simulation
// const simulation = d3.forceSimulation(nodes)
//   .force('charge', d3.forceManyBody().strength(-2));

// // Indicate how to update the graph for each tick
// simulation.on('tick', () => {
//   circles
//     .attr('cx', d => d.x)
//     .attr('cy', d => d.y);
// })
