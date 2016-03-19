// ==UserScript==
// @name        Dezinformator
// @namespace   https://github.com/fib1123/word2vecTools/
// @version 1.0
// @description Wprowadza dezinformację
// @copyright 2016+, 31SDS14
// @include    *
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant      unsafeWindow
// @grant      GM_registerMenuCommand
// @grant      GM_xmlhttpRequest
// ==/UserScript==

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{
    GM_registerMenuCommand('Zdezinformuj!', function() { 
        $("p").each(function()
        {
            //alert("next <p> element: " + $(this)[0].innerText);
            var text = $(this)[0].innerText;
            text = text.replace("&nbsp", " ");
            text = text.replace("(", " ");
            text = text.replace(")", " ");
            text = text.replace("!", " ");
            text = text.replace("?", " ");
            text = text.replace(",", " ");
            text = text.replace(".", " ");
            text = text.replace("   ", " "); //nie wiem, czy potrzebne
            text = text.replace("  ", " ");
            var splitted_text = text.split(" ");
            var text_without_short_words = [];
            splitted_text.forEach(function(element)
            {
                if (element.length > 2) {
                    text_without_short_words.push(element);
                }
            });
            var obecny = 0;
            var przeskocz;
            while (obecny<=text_without_short_words.length) {
                requestForChangedText(text_without_short_words[obecny]);
                przeskocz = getRandomInt(2,10);
                obecny += przeskocz;
            }
        });
            
        text_without_short_words.forEach(function(element)
        {
            requestForChangedText(element);
        });
    }, 'r');
});
function requestForChangedText(text) {
    var res = GM_xmlhttpRequest({
            method: "POST",
            url: "http://172.27.0.103:8080/sentence-find-near",
            data: text,
            synchronous: false,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
                document.body.innerHTML = document.body.innerHTML.replace(text, response.responseText);
            }
        });
    return res.responseText;
}
