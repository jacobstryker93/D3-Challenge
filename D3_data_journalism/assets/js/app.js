// @TODO: YOUR CODE HERE!
function interactiveGraphs() {

    let svgWidth = 800;
    let svgHeight = 400;

    let margin = {
        top: 10,
        right: 20,
        bottom: 40,
        left: 50
    };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    let svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    let chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("assets/data/data.csv")
        .then(function (calcData) {

            calcData.forEach(function (data) {
                data.age = +data.age;
                data.smokes = +data.smokes;
                data.healthcare = +data.healthcare;
                data.poverty = +data.poverty;
                data.abbr = data.abbr;
                data.income = +data.income;
            });

            let xLinearScale = d3.scaleLinear()
                .domain([8.5, d3.max(calcData, d => d.poverty)])
                .range([0, width]);

            let yLinearScale = d3.scaleLinear()
                .domain([3.5, d3.max(calcData, d => d.healthcare)])
                .range([height, 0]);


            let xAxis = d3.axisBottom(xLinearScale);
            let yAxis = d3.axisLeft(yLinearScale);

            chartGroup.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);

            chartGroup.append("g")
                .call(yAxis);


            chartGroup.selectAll("circle")
                .data(calcData)
                .enter()
                .append("circle")
                .attr("cx", d => xLinearScale(d.poverty))
                .attr("cy", d => yLinearScale(d.healthcare))
                .attr("r", 10)
                .attr("fill", "pink")
                .attr("opacity", ".7")
                .attr("stroke-width", ".5")
                .attr("stroke", "black");

            chartGroup.select("g")
                .selectAll("circle")
                .data(calcData)
                .enter()
                .append("text")
                .text(d => d.abbr)
                .attr("x", d => xLinearScale(d.poverty))
                .attr("y", d => yLinearScale(d.healthcare))
                .attr("dy", -395)
                .attr("text-anchor", "middle")
                .attr("font-size", "10px")
                .attr("fill", "black");

            console.log(calcData);
            chartGroup.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - 50)
                .attr("x", 0 - 250)
                .attr("dy", "1em")
                .attr("class", "axis-Text")
                .text("No Healthcare (%)");

            chartGroup.append("text")
                .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
                .attr("class", "axis-Text")
                .text("Poverty (%)");



        });
}
interactiveGraphs();