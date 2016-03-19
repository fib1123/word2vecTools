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
// ==/UserScript==

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{
    GM_registerMenuCommand('Zdezinformuj!', function() { 
        $("p").each(function()
        {
            //alert("next <p> element: " + $(this)[0].innerText);
            var text = $(this)[0].innerText;
            var splitted_text = text.split(" ");
            splitted_text.forEach(function(element)
            {
                var text_without_short_words = [];
                //alert(element.length);
                if (element.length > 2) {
                    text_without_short_words.push(element);
                    alert(element);
                }
            });
            //splitted_text.length;
            //alert("first word: " + splitted_text[0]);
        });
    }, 'r');
});
