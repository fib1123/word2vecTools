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
            var splitted_text = text.split(" ");
            var text_without_short_words = [];
            splitted_text.forEach(function(element)
            {
                if (element.length > 2) {
                    element = element.replace(",", ""); //usuwanie przecinków
                    element = element.replace(".", ""); //usuwanie kropek
                    text_without_short_words.push(element);
                    //alert(element);
                }
            });
            var obecny = 5;
            var przeskocz;
            alert("length: "+text_without_short_words.length);
            //while (obecny<=text_without_short_words.length) {
                //przeskocz = getRandomInt(2,10);
                //obecny += przeskocz;
                //alert(document.getElementsByTagName('p').innerHTML);
                //$("p").each(function()
                //{
                    //alert("myk");
                    //$(this)[0].innerText = $(this)[0].innerText.replace(text_without_short_words[obecny], requestForChangedText(text_without_short_words[obecny]));
                //document.body.innerHTML = document.body.innerHTML.replace(text_without_short_words[obecny], requestForChangedText(text_without_short_words[obecny]));
                //});
            //}
            
            
            text_without_short_words.forEach(function(element)
            {
                alert("Slowo: " + element);
                requestForChangedText(element);
            });
            //splitted_text.length;
            //alert("first word: " + splitted_text[0]);
        });
    }, 'r');
});
function requestForChangedText(text) {
    var res = GM_xmlhttpRequest({
            method: "POST",
            url: "http://localhost:8080/sentence-find-near",
            data: text,
            synchronous: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function(response) {
                //alert("Response: " + response);
                //res = response.responseText;
                console.log("res: " + response.responseText);
                document.body.innerHTML = document.body.innerHTML.replace(text, response.responseText);
                //var json = $.parseJSON(response); 
            }
        });
    //alert("res: " + res);
    console.log(res);
    return res.responseText;
}

/*function requestForChangedText(text) {
    var res = "";
		$.ajax({
				url: "http://localhost:8080/sentence-find-near",
				method: "POST",
            async: true,
				dataType: "text",
				data: text,
				success: function(data) {
                    res = data;
                }
		});
        return res;
}*/
