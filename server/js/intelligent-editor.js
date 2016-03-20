var index = 0;
var startWord = "";

function resetIndex() {
	index = 0;
	startWord = "";
}

function isStopCharacter(chr) {
	return (chr == ' ' || chr == ',' || chr == '.' || chr == '?' || chr == ';' || chr == '!');
}

function requestForWord(text, index, cb) {
		$.ajax({
				url: "/word-find-near",
				method: "POST",
				dataType: "text",
				data: text + " " + index,
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
		if (isStopCharacter(text[i])) {
			break;
		} else {
			end = i;
		}
	}
	for (var i = pos; i >= 0; i--) {
		if (isStopCharacter(text[i])) {
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

function increase(num) { 
	if (num <= 20) return num + 1; 
	else return num;
}
function decrease(num) { 
	if (num > 0) return num - 1;
	else return num; 
}

function toggleWord(f) {
	if (startWord === "") {
		startWord = getCurrentlySelectedWord();
	}
	index = f(index);
	if (index > 0) requestForWord(startWord, index, replaceCurrentWordWith);
	else replaceCurrentWordWith(startWord);
}

$(document).ready(function() {

		document.addEventListener('keydown', function(event) {
			console.log(event.keyCode);
			if (event.keyCode == 145) {
				toggleWord(decrease);
			}
			else if (event.keyCode == 20) {
				toggleWord(increase);
			} else if (event.keyCode > 36 && event.keyCode < 41) {
				resetIndex();
			}
		}, true);
})

