$(function() {
  $.ajax({
    type: 'post',
    url: "/app/c360AssBaInfBList",
    dataType: 'json',
    contentType: 'application/json',
    data: "{\"sessionId\":\"" + $.cookie("sessionId") + "\"}",
    success: function(data) {
      for (var i = 0; i < data.c360AssBaInfB.length; i++) {
        $(".instiName").append('<li data-code="' + data.c360AssBaInfB[i].coId + '" data-text="'+ data.c360AssBaInfB[i].coNa +'">' + data.c360AssBaInfB[i].coNa + '</li>');
      };
    }
  });
})