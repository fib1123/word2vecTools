function requestForChangedText(text, cb) {
		$.ajax({
				url: "/sentence-find-near",
				method: "POST",
				dataType: "text",
				data: text,
				success: cb
		})
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

function getStartAndEndPosOfSelectedWord() {
	var text = $("#main-text").val();
	var pos = $("#main-text").prop("selectionStart");
	var end = pos;
	var start = pos;
	for (var i = pos; i < text.length; i++) {
		if (text[i] == ' ') {
			break;
		} else {
			end = i;
		}
	}
	for (var i = pos; i >= 0; i--) {
		if (text[i] == ' ') {
			break;
		} else {
			start = i;
		}
	}
	return { start: start, end: end };
}

function getCurrentlySelectedWord() {
	var selWord = getStartAndEndPosOfSelectedWord();
	return $("#main-text").val().slice(selWord.start, selWord.end + 1);
}

function replaceCurrentWordWith(str) {
	var oldPosition = $("#main-text").prop("selectionStart");
	var oldText = $("#main-text").val();
	var selWord = getStartAndEndPosOfSelectedWord();
	var before = oldText.slice(0, selWord.start);
	if (selWord.end < oldText.length) selWord.end = selWord.end + 1
	var after = oldText.slice(selWord.end, oldText.length);
	$("#main-text").val(before + str + after);
	setCaretToPos(document.getElementById("main-text"), oldPosition);
}

function asciiMod(str, func) {
	res = "";
	for (var i = 0; i < str.length; i++) {
		res += String.fromCharCode(func(str[i].charCodeAt(0)));
	}
	return res;
}

function increase(num) { return num + 1; }
function decrease(num) { return num - 1; }

function makeCircles() {

// 	var graph = {
// 	"nodes":[
// 		{"name":"1","rating":90,"id":2951,"weight":10,"x":14, "y": 43},
// 		{"name":"2","rating":80,"id":654654,"weight":10,"x":142, "y": 23},
// 		{"name":"3","rating":80,"id":6546544,"weight":10,"x":183, "y": 77},
// 		{"name":"4","rating":1,"id":68987978,"weight":10,"x":222, "y": 88},
// 		{"name":"5","rating":1,"id":9878933,"weight":10,"x":312, "y": 0},
// 		{"name":"6","rating":1,"id":6161,"weight":10,"x":112, "y": 33},
// 		{"name":"7","rating":1,"id":64654,"weight":10,"x":221, "y": 11}
// 	],
// 	"links":[
// 		{"source":6,"target":5,"value":6, "label":"publishedOn"},
// 		{"source":8,"target":5,"value":6, "label":"publishedOn"},
// 		{"source":7,"target":1,"value":4, "label":"containsKeyword"},
// 		{"source":8,"target":10,"value":3, "label":"containsKeyword"},
// 		{"source":7,"target":14,"value":4, "label":"publishedBy"},
// 		{"source":8,"target":15,"value":6, "label":"publishedBy"},
// 		{"source":9,"target":1,"value":6, "label":"depicts"},
// 		{"source":10,"target":1,"value":6, "label":"depicts"},
// 		{"source":16,"target":1,"value":6, "label":"manageWebsite"},
// 		{"source":16,"target":2,"value":5, "label":"manageWebsite"},     
// 		{"source":16,"target":3,"value":6, "label":"manageWebsite"},
// 		{"source":16,"target":4,"value":6, "label":"manageWebsite"},
// 		{"source":19,"target":18,"value":2, "label":"postedOn"},
// 		{"source":18,"target":1,"value":6, "label":"childOf"},
// 		{"source":17,"target":19,"value":8, "label":"describes"},
// 		{"source":18,"target":11,"value":6, "label":"containsKeyword"},
// 		{"source":17,"target":13,"value":3, "label":"containsKeyword"},
// 		{"source":20,"target":13,"value":3, "label":"containsKeyword"},
// 		{"source":20,"target":21,"value":3, "label":"postedOn"},
// 		{"source":22,"target":20,"value":3, "label":"postedOn"},
// 		{"source":23,"target":21,"value":3, "label":"manageWebsite"},
// 		{"source":23,"target":24,"value":3, "label":"manageWebsite"},
// 		{"source":23,"target":25,"value":3, "label":"manageWebsite"},
// 		{"source":23,"target":26,"value":3, "label":"manageWebsite"}
// 	]
// }


// var margin = {top: -5, right: -5, bottom: -5, left: -5};
//         var width = 500 - margin.left - margin.right,
// 	height = 400- margin.top - margin.bottom;

//         var color = d3.scale.category20();
	
// 	var force = d3.layout.force()
//             .charge(-200)
//             .linkDistance(50)
//             .size([width + margin.left + margin.right, height + margin.top + margin.bottom]);

//         var zoom = d3.behavior.zoom()
//             .scaleExtent([1, 10])
//             .on("zoom", zoomed);

//         var drag = d3.behavior.drag()
//             .origin(function(d) { return d; })
//             .on("dragstart", dragstarted)
//             .on("drag", dragged)
//             .on("dragend", dragended);


//         var svg = d3.select("#viz-container").append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
//             .call(zoom);

//         var rect = svg.append("rect")
//             .attr("width", width)
//             .attr("height", height)
//             .style("fill", "none")
//             .style("pointer-events", "all");

//         var container = svg.append("g");

// //d3.json('http://blt909.free.fr/wd/map2.json', function(error, graph) {
                
//                 // force
//                 //     .nodes(graph.nodes)
//                 //     .links(graph.links)
//                 //     .start();
                
      
	    
// 		// var link = container.append("g")
//   //                       .attr("class", "links")
//   //                       .selectAll(".link")
// 		// 	.data(graph.links)
//   //                       .enter().append("line")
// 		// 	.attr("class", "link")
// 		// 	.style("stroke-width", function(d) { return Math.sqrt(d.value); });
 
// 		var node = container.append("g")
//       .attr("class", "nodes")
//       .selectAll(".node")
// 			.data(graph.nodes)
// 			.enter().append("g")
// 			.attr("class", "node")
//       .attr("cx", function(d) { 
//       	console.log(d.x);
//       	return d.x; 
//       })
//       .attr("cy", function(d) { return d.y; })
//       //.call(drag);
		  
// 		node.append("circle")
// 			.attr("r", function(d) { return d.weight * 2+ 12; })
// 			.style("fill", function(d) { return color(1/d.rating); });
		 
                
//                 // force.on("tick", function() {
//                 //     link.attr("x1", function(d) { return d.source.x; })
//                 //         .attr("y1", function(d) { return d.source.y; })
//                 //         .attr("x2", function(d) { return d.target.x; })
//                 //         .attr("y2", function(d) { return d.target.y; });

//                 //     node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
//                 // });
                
//                 var linkedByIndex = {};
//                 // graph.links.forEach(function(d) {
//                 //     linkedByIndex[d.source.index + "," + d.target.index] = 1;
//                 // });

//                 function isConnected(a, b) {
//                     return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
//                 }

// 								node.on("mouseover", function(d){
                        
//                         node.classed("node-active", function(o) {
//                             thisOpacity = isConnected(d, o) ? true : false;
//                             this.setAttribute('fill-opacity', thisOpacity);
//                             return thisOpacity;
//                         });

//                         // link.classed("link-active", function(o) {
//                         //     return o.source === d || o.target === d ? true : false;
//                         // });
                        
//                         d3.select(this).classed("node-active", true);
//                         d3.select(this).select("circle").transition()
//                                 .duration(750)
//                                 .attr("r", (d.weight * 2+ 12)*1.5);
//                 })
		
// 		.on("mouseout", function(d){
                        
//                         node.classed("node-active", false);
//                         // link.classed("link-active", false);
                    
//                         d3.select(this).select("circle").transition()
//                                 .duration(750)
//                                 .attr("r", d.weight * 2+ 12);
//                 });


//         function dottype(d) {
//           d.x = +d.x;
//           d.y = +d.y;
//           return d;
//         }

//         function zoomed() {
//           container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//         }

//         function dragstarted(d) {
//           d3.event.sourceEvent.stopPropagation();
          
//           d3.select(this).classed("dragging", true);
//           force.start();
//         }

//         function dragged(d) {
          
//           d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
          
//         }

//         function dragended(d) {
          
//           d3.select(this).classed("dragging", false);
//         }

	var spaceCircles = [
		{ "cx": 44, "cy": 67, "radius": 5, "color" : "green", "label": "pies" },
		{ "cx": 356, "cy": 123, "radius": 5, "color" : "purple", "label": "kot" },
		{ "cx": 43, "cy": 110, "radius": 5, "color" : "purple", "label": "papuga" },
		{ "cx": 778, "cy": 430, "radius": 5, "color" : "purple", "label": "koń" }
	];

	var svgContainer = d3.select("#viz-container").append("svg")
		.attr("width", 1000)
		.attr("height", 500);

	var labels = svgContainer.selectAll("text")
		.data(spaceCircles)
		.enter()
		.append("text");

	var circles = svgContainer.selectAll("circle")
		.data(spaceCircles)
		.enter()
		.append("circle");

	labels
		.text(function(d) {	return d.label; })
		.attr("x", function(d) { return d.cx + d.radius + 3; })
		.attr("y", function(d) { return d.cy + d.radius + 3; })
		.attr("font-size", 12)
		.attr("font-family", "serif");

	var circleAttributes = circles
		.attr("cx", function (d) { return d.cx; })
		.attr("cy", function (d) { return d.cy; })
		.attr("r", function (d) { return d.radius; } )
		.style("fill", function(d) {
			var returnColor = d.color;
			return returnColor;
		});
}

$(document).ready(function() {
	makeCircles();
})

