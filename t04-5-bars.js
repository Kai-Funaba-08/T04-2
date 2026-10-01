//T04-5

//1 A)
// t04-5-bars.js
// const createBarChart = (data) => {
// };

//1 B)
// const createBarChart = (data) => {
//     const svg = d3.select(".responsive-svg-container")
//         .append("svg")
//             .attr("viewBox", "0 0 1200 400") // temporary; we’ll adjust layout soon
//             .style("border", "1px solid black"); // dev-only border so we see the canvas
//     svg
//         .selectAll("rect")
//         .data(data)
//         .join("rect");
// };

//1 C)
// const createBarChart = (data) => {
//     const svg = d3.select(".responsive-svg-container")
//         .append("svg")
//             .attr("viewBox", "0 0 1200 400")
//             .style("border", "1px solid black");
// svg
//     .selectAll("rect")
//     .data(data)
//     .join("rect")
//     .attr("class", d => {
//         console.log(d); //inspect each row in the Console
//         return `bar bar-${d.count}`; //"bar bar-859"
// });
// };

// // Step 2
// const createBarChart = (data) => {
//     const svg = d3.select(".responsive-svg-container")
//     .append("svg")
//         .attr("viewBox", "0 0 1200 400")
//         .style("border", "1px solid black");
// svg
//     .selectAll("rect")
//     .data(data)
//     .join("rect")
//         .attr("class", d => `bar bar-${d.count}`)
//         .attr("width", d => d.count) // uses your numeric column directly
//         .attr("height", 16); // constant bar height
// };


//T04-5 step 1
// t04-5-bars.js
// const createBarChart = (data) => {
//     // SVG internal coordinate system used to position and size chart elements
//     const viewW = 500; // logical width available for the chart
//     const viewH = 1600; // logical height available for all bars
//     // SVG rendered size displayed on the webpage
//     const displayW = 640; // visible width of the SVG
//     const displayH = 420; // visible height of the SVG
//     const svg = d3.select(".responsive-svg-container")
//         .append("svg")
//             .attr("viewBox", `0 0 ${viewW} ${viewH}`) // defines the internal coordinate system
//             .attr("width", displayW) // sets the displayed width
//             .attr("height", displayH) // sets the displayed height
//             .style("border", "1px solid black"); 
//     // … (we’ll add scales and bars next)
// };

// //T04-5 step 2
// const createBarChart = (data) => {
//     const viewW = 500, viewH = 1600;
//     const displayW = 640, displayH = 420;
//     const svg = d3.select(".responsive-svg-container")
//         .append("svg")
//             .attr("viewBox", `0 0 ${viewW} ${viewH}`)
//             .attr("width", displayW)
//             .attr("height", displayH)
//             .style("border", "1px solid black");
//     // x: numeric (e.g., count)
//     const xMax = d3.max(data, d => d.count); // Find the largest count value in the dataset
//     // Create a linear scale for the numerical x-axis
//     const xScale = d3.scaleLinear()
//         .domain([0, xMax]) // input: data values from 0 to the highest count
//         .range([0, viewW]); // output: pixel positions from 0 to the SVG's logical width
// // … (add y-scale next)
// };

//T04-5 step 3
const createBarChart = (data) => {

    const viewW = 500, viewH = 1600;

    const displayW = 640, displayH = 420;

    const svg = d3.select(".responsive-svg-container")

        .append("svg")

        .attr("viewBox", `0 0 ${viewW} ${viewH}`)

        .attr("width", displayW)

        .attr("height", displayH)

        .style("border", "1px solid black");

    // X scale (numeric)

    const xMax = d3.max(data, d => d.count);

    const xScale = d3.scaleLinear()

        .domain([0, xMax])

        .range([0, viewW]);

    // Create a band scale for the categorical y-axis

    const yScale = d3.scaleBand()

        // Extract all brand names and use them as categories

        .domain(data.map(d => d.brand))

        // Distribute the categories from the top to the bottom of the SVG

        .range([0, viewH])

        // Add space between neighbouring bars

        .paddingInner(0.2)

        // Add space before the first bar and after the last bar

        .paddingOuter(0.1);

    // Bars

    svg.selectAll("rect")

        // connect the dataset to the rectangles

        .data(data)

        // Create rectangles for data and update existing rectangles

        .join("rect")

        // Assign a general class and a count-specific class to each bar

        .attr("class", d => `bar bar-${d.count}`)

        // Start every bar from the left edge of the SVG

        .attr("x", 0)

        // Position each bar vertically according to its brand

        .attr("y", d => yScale(d.brand))

        // Convert each count into a scaled bar width

        .attr("width", d => xScale(d.count))

        // Use the height calculated by the band scale

        .attr("height", yScale.bandwidth())

        // Set the colour of the bars

        .attr("fill", "steelblue");

};

