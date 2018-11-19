// select t

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
        .attr('r', '12')
        .attr('fill-opacity', 0.8);

    chartGroup.append('text')
        .selectAll('tspan')
        .data(data)
        .enter()
        .append('tspan')
        .classed('stateText', true)
        .attr('x', function(d) {return xLinearScale1(d.income)})
        .attr('y', function(d) {return yLinearScale1(d.obesity)})
        .attr('dominant-baseline', 'middle')
        .text(d => d.abbr);

        // chartGroup.append('text')
        //     .classed('stateText', true)
        //     .attr('x', d => xLinearScale1(d.income))
        //     .attr('y', d => yLinearScale1(d.obesity))
        //     .text(d => d.abbr);

    // append axis labels
    svg.append('text')
        .attr('x', 65)
        .attr('y', 280)
        .style('writing-mode', 'tb')
        .classed('aText', true)
        .text('Obesity (%)');

    svg.append('text')
        .attr('x', 50)
        .attr('y', 280)
        .style('writing-mode', 'tb')
        .classed('aText', true)
        .text('Smokes (%)');
    
    svg.append('text')
        .attr('x', 35)
        .attr('y', 280)
        .style('writing-mode', 'tb')
        .classed('aText', true)
        .text('Lacks Healthcare (%)');

    svg.append('text')
        .attr('x', 480)
        .attr('y', 535)
        .classed('aText', true)
        .text('Household Income (Median)');

    svg.append('text')
        .attr('x', 480)
        .attr('y', 552)
        .classed('aText', true)
        .text('Age (Median)');

    svg.append('text')
        .attr('x', 480)
        .attr('y', 570)
        .classed('aText', true)
        .text('In Poverty (%)');

    // append tool tip to circles 
    var toolTip = d3.select('body').append('div')
        .attr('class', 'd3-tip');
    
    circles.on('mouseover', function (d, i) {
        toolTip.style('display', 'block');
        toolTip.html(`<h4>${d.state}</h4> <br> <h4> Household Income: ${d.income} </h4> <br> <h4> Obesity: ${d.obesity}</h4> `)
            .style('left', d3.event.pageX + 'px')
            .style('top', d3.event.pageY + 'px');
    })
        // .on('mouseout', function() {
        //     toolTip.style('display', 'none');
        // })
});
