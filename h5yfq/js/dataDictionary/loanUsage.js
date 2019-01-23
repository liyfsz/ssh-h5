$(function() {
  $.ajax({
    type: 'post',
    url: "/app/wordBooks",
    dataType: 'json',
    contentType: 'application/json',
    data: "{\"code\":\"" + "loanPurpose" + "\",\"sessionId\":\"" + $.cookie("sessionId") + "\"}",
    success: function(data) {
      for (var i = 0; i < data.wordBooksList.length; i++) {
        $(".loanUsage").append('<li data-code="' + data.wordBooksList[i].code + '" data-text="'+ data.wordBooksList[i].name +'">' + data.wordBooksList[i].name + '</li>');
      };
    }
  });
})