// Define SVG area
var svgWidth = 980;
var svgHeight = 600;

// Define margin
var margin = 100; 

// Define dimensions of chart area
var chartWidth = svgWidth - margin - margin;
var chartHeight = svgHeight - margin - margin;

// Use d3.select to append svg area and set dimensions
var svg = d3.select('#scatter')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

// Append a group area and set margins
var chartGroup = svg.append('g')
    .attr('transform', `translate(${margin},${margin})`);

// Load data from csv
d3.csv('assets/data/data.csv', function(error, data) {
    if (error) throw error;

    console.log(data);

    // Chart 1 - income vs obesity
    var xLinearScale1 = d3.scaleLinear()
        .domain(d3.extent(data, d => d.income))
        .range([0, chartWidth]);
    
    var yLinearScale1 = d3.scaleLinear()
        .domain([d3.max(data, d => d.obesity), d3.min(data, d => d.obesity)])
        .range([0, chartHeight]);

    var xIncome = d3.axisBottom(xLinearScale1);
    var yObesity = d3.axisLeft(yLinearScale1);

    chartGroup.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(xIncome);

    chartGroup.append('g')
        .call(yObesity);

    var circles = chartGroup.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .classed('stateCircle', true)
        .attr('cx', d => xLinearScale1(d.income))
        .attr('cy', d => yLinearScale1(d.obesity))
        .attr('r', '10')
        .attr('fill-opacity', 0.8);

    data.forEach((d,i) => 
        chartGroup.append('text')
            .data(data)
            .attr('x', d => xLinearScale1(d.income))
            .attr('y', d => yLinearScale1(d.obesity))
            .text(d => d.abbr)
    );

    svg.append('text')
        .attr('x', 65)
        .attr('y', 280)
        .style('writing-mode', 'tb')
        .classed('aText', true)
        .text('Obesity (%)');
    
    svg.append('text')
        .attr('x', 480)
        .attr('y', 530)
        .classed('aText', true)
        .text('Income (Median)');
})