$(".modalCon1 ul").on("click", "li", function() {
  var paramRel = $(this).data("code");
  console.log(paramRel);
  $.ajax({
    type: 'post',
    url: "/app/c360AssProdInfBList ",
    dataType: 'json',
    contentType: 'application/json',
    data: "{\"sessionId\":\"" + $.cookie("sessionId") + "\",\"coId\":\"" + paramRel + "\"}",
    success: function(data) {
      if (data.c360AssProdInfB.length > 0) {
        for (var i = 0; i < data.c360AssProdInfB.length; i++) {
          $(".courseName").append('<li data-code="' + data.c360AssProdInfB[i].prodId + '" data-text="' + data.c360AssProdInfB[i].prodNa + '">' + data.c360AssProdInfB[i].prodNa + '</li>');
        };
        $(".relInstu").css("display", "block");
      } else {
        $(".relInstu").css("display", "none");
        console.log("相关得课程数据库没数据");
      }

    }
  });

});