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

	var spaceCircles = [
		{ "cx": 20, "cy": 20, "radius": 5, "color" : "green", "label": "pies" },
		{ "cx": 70, "cy": 70, "radius": 5, "color" : "purple", "label": "kot" }
	];

	var svgContainer = d3.select("#viz-container").append("svg")
		.attr("width", 200)
		.attr("height", 200);

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
		.attr("x", function(d) { return d.cx + d.radius; })
		.attr("y", function(d) { return d.cy + d.radius; })
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

