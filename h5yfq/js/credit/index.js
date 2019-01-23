$(function(){
	//获取信用额度
	$.ajax({
	url: baseUrl + '/member/queryInfo',
	type: 'post',
	data: JSON.stringify({
		"sessionId": sessionStorage.getItem("sessionId")
	}),
	contentType: 'application/json',
	success: function(data) {
		if(data.resultCode == 'SUCCESS') {
			$("#limit").text(data.limit);
			$("#zmxyAuth").click(function(){
				$.ajax({
					url: baseUrl + '/zmxyAuth',
					type: 'post',
					data: JSON.stringify({
						"loginName": sessionStorage.getItem("phone"),
		        "sessionId": sessionStorage.getItem("sessionId")
					}),
					contentType: 'application/json',
					success: function(data) {
						if(data.url) {
							window.location.href= data.url;
						} else if(data.errorCode == 'ERROR_NOAUTH') {
							window.location.href = '../login/login.html'
						} else {
							showInfo("芝麻分认证失败")
						}
					}
				});
			});
			
			$("#yysAuth").click(function(){
				$.ajax({
					url: baseUrl + '/yysAuth',
					type: 'post',
					data: JSON.stringify({
						"loginName": sessionStorage.getItem("phone"),
						"type": "mobile_crawl",
		        "sessionId": sessionStorage.getItem("sessionId")
						
					}),
					contentType: 'application/json',
					success: function(data) {
						if(data.url) {
							window.location.href= data.url;
						} else if(data.errorCode == 'ERROR_NOAUTH') {
							window.location.href = '../login/login.html'
						} else {
							showInfo("运营商认证失败")
						}

					}
				});
			});
		}else if(data.errorCode == 'ERROR_NOAUTH'){
       window.location.href= '../login/login.html'
		}else{
			showInfo("查看失败")
		}

	}
});

//信息是否可查看
$.ajax({
	url: baseUrl + '/getBtOrderData',
	type: 'post',
	data: JSON.stringify({
		"sessionId": sessionStorage.getItem("sessionId"),
		"loginName": sessionStorage.getItem("phone")
	}),
	contentType: 'application/json',
	success: function(data) {
		if(data.resultCode == 'SUCCESS') {
			if(!data.btResponse.adArCa){
				$(".noBaseAuth").css("display","block");
				$(".noBaseAuth").next("a").css("display","none !important");
			}
			if(!data.btResponse.woAdArCa){
				$(".noWorkAuth").css("display","block");
				$(".noWorkAuth").next().hide();
			}
			if(!data.btResponse.conNa){
				$(".noContAuth").css("display","block");
				$(".noContAuth").next().hide();
			}
		}else if(data.errorCode == 'ERROR_NOAUTH'){
       window.location.href= '../login/login.html'
		}else{
			showInfo("查看失败")
		}

	}
});

//是否认证
$.ajax({
	url: baseUrl + '/customerAuth',
	type: 'post',
	data: JSON.stringify({
		"sessionId": sessionStorage.getItem("sessionId"),
		"loginName": sessionStorage.getItem("phone")
	}),
	contentType: 'application/json',
	success: function(data) {
		if(data.resultCode == 'SUCCESS') {
			if(data.mobileAuth == '1'){
				$("#zmfText").css("display","block");
				$("#zmfText").next().css("display","none");
			}
			if(data.zmAuth == '1'){
				$("#mobileText").css("display","block");
				$("#mobileText").next().css("display","none");
			}
		}else if(data.errorCode == 'ERROR_NOAUTH'){
       window.location.href= '../login/login.html'
		}else{
			showInfo("查看失败")
		}

	}
});


});
