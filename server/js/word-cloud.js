var svgContainer;
var color1 = "#17becf";
var color2 = "#9467bd";
var selectedPointColor = "#d62728";
var points = [];
var currentScale = 1.0;
var currentStartCoords = { x: 0.0, y: 0.0 };
var generalWidth = 1000;
var generalHeight = 400;

function requestPoints(word, k, cb) {
		$.ajax({
				url: "/get-points",
				method: "POST",
				dataType: "json",
				data: word + " " + k,
				success: cb
		})
}

function updatePoints(newPoints, newColor, requestWord) {
	var updatedPoints = [];
	var added = 0;
	for (var i = 0; i < points.length; i++) {
		if (points[i].color != newColor) {
			updatedPoints.push(points[i]);
			added++;
		}
	}
	console.log("added: " + added);
	for (var i = 0; i < newPoints.length; i++) {
		newPoints[i].color = newColor;
		if (newPoints[i].label == requestWord) newPoints[i].color = selectedPointColor;
		updatedPoints.push(newPoints[i]);
	}
	points = updatedPoints;
	console.log(points.length)
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


function makePoints() {

	var pointsDup = points.slice();

	$("#viz-container > svg").empty();

	vlx = pointsDup[0].x
	vly = pointsDup[0].y
	minx = vlx
	miny = vly
	maxx = vlx
	maxy = vly
	for (var i = 0; i < pointsDup.length; i++) {
		var curr = pointsDup[i];
		if (curr.x > maxx) {
			maxx = curr.x;
		}
		if (curr.x < minx) {
			minx = curr.x;
		}
		if (curr.y > maxy) {
			maxy = curr.y;
		}
		if (curr.y < miny) {
			miny = curr.y;
		}
	}

	rangex = (maxx - minx)*currentScale;
	rangey = (maxy - miny)*currentScale;

	for (var i = 0; i < pointsDup.length; i++) {
		pointsDup[i].x = (pointsDup[i].x - minx)/rangex*900 + 50 - currentStartCoords.x;
		pointsDup[i].y = (pointsDup[i].y - miny)/rangey*300 + 50 - currentStartCoords.y;
	}

	var labels = svgContainer.selectAll("text")
		.data(pointsDup)
		.enter()
		.append("text");

	var circles = svgContainer.selectAll("circle")
		.data(pointsDup)
		.enter()
		.append("circle");

	labels
		.text(function(d) {	return d.label; })
		.attr("x", function(d) { return d.x + 8; })
		.attr("y", function(d) { return d.y + 8; })
		.attr("font-size", 12)
		.attr("font-family", "serif")
		.style("fill", function(d) { return d.color; });

	var circleAttributes = circles
		.attr("cx", function (d) { return d.x; })
		.attr("cy", function (d) { return d.y; })
		.attr("r", function (d) { return 5; } )
		.style("fill", function(d) { return d.color; });
}

function move(f) {
	currentStartCoords = f(currentStartCoords);
	console.log(currentStartCoords);
	makePoints();
	console.log("ddd")
}

function zoom(f) {
	currentScale = f(currentScale);
	console.log(currentScale);
	makePoints();
}

$(document).ready(function() {

	var step = 10;

	document.addEventListener('keydown', function(event) {
		if (event.keyCode == 107) { //+
			zoom(function(x) { return x * 1.5 })
		} else if (event.keyCode == 109) { //-
			zoom(function(x) { return x / 1.5 })
		} else if (event.keyCode == 37) { //left
			move(function(coords) { coords.x = coords.x - step; return coords; });
		} else if (event.keyCode == 38) { //up
			move(function(coords) { coords.y = coords.y - step; return coords; });
		} else if (event.keyCode == 39) { //right
			move(function(coords) { coords.x = coords.x + step; return coords; });
		} else if (event.keyCode == 40) { //down
			move(function(coords) { coords.y = coords.y + step; return coords; });
		}
	}, true);

	$("#request-button-1").click(function() { 
		requestPoints($("#request-input-1").val(), 100, function(points) { 
			updatePoints(points, color1, $("#request-input-1").val());
			makePoints();
		})
	});
	$("#request-button-2").click(function() { 
		requestPoints($("#request-input-2").val(), 100, function(points) { 
			updatePoints(points, color2, $("#request-input-2").val());
			makePoints();
		})
	})
	//$("#request-button-2").click(function() { requestPoints($("#request-input-2").val(), 100, function(points) { makePoints(points, "#9467bd"); } )})

	svgContainer = d3.select("#viz-container").append("svg")
		.attr("width", 1000)
		.attr("height", 400);

	var dragStart = { x: 0.0, y: 0.0 };
	var flag = 0;
	var element = document.getElementById("viz-container");
	element.addEventListener("mousedown", function(event){
	    flag = 0;
	    dragStart.x = event.pageX;
	    dragStart.y = event.pageY;
	}, false);
	element.addEventListener("mousemove", function(){
	    flag = 1;
	}, false);
	element.addEventListener("mouseup", function(event){
	    if(flag === 0){
	        console.log("click");
	    }
	    else if(flag === 1){
	    		diffs = { x: dragStart.x - event.pageX, y: dragStart.y - event.pageY };
	    		move(function(coords) { coords.x += diffs.x; coords.y += diffs.y; return coords; })
	    		console.log(diffs);
	        console.log("drag");
	    }
	}, false);
})

