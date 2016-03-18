function requestForChangedText(text, cb) {
    $.ajax({
        url: "/sentence-find-near",
        method: "POST",
        dataType: "text",
        data: text,
        success: cb
    })
}

$(document).ready(function() {
    $("#transform-btn").click(function() { requestForChangedText($("#main-text").val(), function(data) { $("#main-text").val(data) }) })
})

