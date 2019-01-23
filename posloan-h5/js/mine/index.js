$(function() {
  var personData = JSON.parse(localStorage.getItem('personData'));
  $("#telephone").text(personData.phone);
});