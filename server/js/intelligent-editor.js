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
	res = ""
	for (var i = 0; i < str.length; i++) {
		res += String.fromCharCode(func(str[i].charCodeAt(0)));
	}
	return res;
}

function increase(num) { return num + 1; }
function decrease(num) { return num - 1; }

$(document).ready(function() {

		document.addEventListener('keydown', function(event) {
			if (event.keyCode == 16) {
				replaceCurrentWordWith(asciiMod(getCurrentlySelectedWord(), increase));
			}
			else if (event.keyCode == 17) {
				replaceCurrentWordWith(asciiMod(getCurrentlySelectedWord(), decrease));
			}
		}, true);
})

