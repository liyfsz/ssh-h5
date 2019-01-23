$(function() {
  $.ajax({
    type: 'post',
    url: "/app/wordBooks",
    dataType: 'json',
    contentType: 'application/json',
    data: "{\"code\":\"" + "tallest-education" + "\",\"sessionId\":\"" + getSessionVal() + "\"}",
    success: function(data) {
      for (var i = 0; i < data.wordBooksList.length; i++) {
        $(".degree").append('<li data-code="' + data.wordBooksList[i].code + '" data-text="'+ data.wordBooksList[i].name +'">' + data.wordBooksList[i].name + '</li>');
      };
    }
  });
})