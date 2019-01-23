$(function() {
  var personData = JSON.parse(localStorage.getItem('waitLoan'));
  var template = Handlebars.compile($("#content-template").html());
      var html = template(personData);
      console.log(personData);
      $("#html-section").html(html);
});
