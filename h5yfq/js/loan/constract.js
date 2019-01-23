$.ajax({
	type: 'post',
	url: baseUrl + "/agreement",
	dataType: 'json',
	contentType: 'application/json',
	data: JSON.stringify({
		"orgId": GetQueryString('orgId'),
		"sessionId": GetQueryString('sessionId')

	}),
	success: function(data) {
		console.log(data)
		if(data.resultCode == 'SUCCESS') {
			//页面渲染
			var template = Handlebars.compile($("#content-template").html());
			var html = template(data);
			$("#html-section").html(html);
		} else if(data.errorCode == "ERROR_NOAUTH") {
			getSessionId();
		} else {
			showInfo('获取借款协议失败');
		}

	}
});