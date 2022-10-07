// div size (frame)
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
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
	const MAX_VALUE = d3.max(data, (d) => {return parseInt(d.Value);})

	const SCALE = d3.scaleLinear()
						.domain([0, MAX_VALUE + 10000])
						.range([0, VIS_WIDTH]);

	// add axis
	FRAME.append("g")
			.attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
			.call(d3.axisLeft(SCALE).ticks(4))
				.attr("font-size", "20px");

	// add bars for data
	FRAME.selectAll("bars")
			.data(data)
			.enter()
			.append("rect")
				.attr("x", MARGINS.left)
				.attr("y", (VIS_HEIGHT + MARGINS.top))
				.attr("height", (d) => {SCALE(d.Value);})
				.attr("width", 50)
				.attr("fill", "lightblue")
				.attr("class", "bar");
})
