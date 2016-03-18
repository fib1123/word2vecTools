function requestForChangedText(text) {
    $.ajax({
        url: "/sentence-find-near",
        method: "POST",
        dataType: "text",
        data: text
    })
}

$(document).ready(function() {
    $("#transform-btn").click(function() { requestForChangedText($("#main-text").val()) })
})

