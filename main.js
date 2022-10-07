// div size (frame)
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 700;
const MARGINS = {left: 100, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME = d3.select("#vis")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

d3.csv("data/data.csv").then((data) => {

	// scaling
	const MAX_VALUE_Y = d3.max(data, (d) => {return parseInt(d.Value);})

	const X_SCALE = d3.scaleBand()
						// map categories to be equally spaced on x-axis
						.domain(data.map((d) => {return d.Category;}))
						.range([0, VIS_WIDTH])
						.padding(0.4);

	const Y_SCALE = d3.scaleLinear()
						.domain([0, MAX_VALUE_Y + 10000])
						.range([VIS_HEIGHT, 0]);

	// add y-axis
	FRAME.append("g")
			.attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
			.call(d3.axisLeft(Y_SCALE).ticks(4))
				.attr("font-size", "20px");

	//add x-axis
	FRAME.append("g")
			.attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
			.call(d3.axisBottom(X_SCALE).ticks(4))
				.attr("font-size", "20px")

	// add bars for data
	FRAME.selectAll("bars")
			.data(data)
			.enter()
			.append("rect")
				.attr("x", (d) => {return (MARGINS.left + X_SCALE(d.Category));})
				.attr("y", (d) => {return (MARGINS.top + Y_SCALE(d.Value));})
				.attr("width", X_SCALE.bandwidth())
				.attr("height", (d) => {return (VIS_HEIGHT - Y_SCALE(d.Value));})
				.attr("fill", "dodgerblue")
				.attr("class", "bar");

})
