$(function(){
	$.ajax({
	url: baseUrl + '/usernews/list',
	type: 'post',
	data: JSON.stringify({
		"sessionId": sessionStorage.getItem("sessionId")
	}),
	contentType: 'application/json',
	success: function(data) {
		if(data.resultCode == 'SUCCESS') {
			var myTemplate = Handlebars.compile($("#table-template").html());
			$('#html-section').html(myTemplate(data));
      
		}else if(data.errorCode == 'ERROR_NOAUTH'){
       window.location.href= '../login/login.html'
		}else{
			showInfo("查看失败")
		}

	}
});
});
