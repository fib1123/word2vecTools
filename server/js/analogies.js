function requestForChangedText(text, cb) {
    $.ajax({
        url: "/find-analogy",
        method: "POST",
        dataType: "text",
        data: text,
        success: cb
    })
}

$(document).ready(function() {
    $("#analogy-btn").click(function() { requestForChangedText($("#word2prim").val(), function(data) { $("#word2prim").val(data) }) })
})

