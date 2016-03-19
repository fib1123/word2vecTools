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

function zamien(element_p) {
    var text = element_p.innerText;
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
    splitted_text.forEach(function(element) {
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
}

function disinform(text) {
    var current = 0;
    var jump;
    var iterator = 0;
    var list = [];
    var splitted = text.split(" ");
    while (current <= splitted.length) {
        var newOne = requestForChangedText(splitted[current]);
        splitted[current] = newOne;
        list[iterator] = 
        jump = getRandomInt(2,10);
        current += jump;

    }
    return splitted.join(" ");
}

//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{
    console.log("ffff")
    GM_registerMenuCommand('Zdezinformuj!', function() {
        console.log("ffff2")
        $("p, div, h1, h2, h3, h4, h5, h6")
            .contents()
            .filter(function() 
                { return this.nodeType === 3; })
            .each(function (i, e) 
                {
                    console.log($(e).text()); 
                    disinform($(e).text(), function(newText) 
                        { $(e).text(newText); }); })
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
            onload: function(data) { return data; }
        });
    return res.responseText;
}
