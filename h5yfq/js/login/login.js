$(function() {
	$("#phoneNumber").val(sessionStorage.getItem("phone"));
	$("#password").val(sessionStorage.getItem("password"));
	
	
	/*忘记密码---提交表单*/
	$(document).on('click', '#sub-btn', function() {
		if(!isMobilePhone($("#phoneNumber").val())) {
			return;
		}else if(!$("#password").val()) {
			showInfo("请填写密码");
		} else if(!isPassword($("#password").val())) {
			showInfo("请填写6-20字符密码");
		}else{
				$.ajax({
				type: "POST",
				url: baseUrl + "/appLogin",
				contentType: 'application/json',
				data: JSON.stringify($("#login-form").serializeObject()),
				success: function(data) {
					if(data.resultCode == "SUCCESS") {
						sessionStorage.setItem("phone", $("#phoneNumber").val());
						sessionStorage.setItem("password", $("#password").val());
						sessionStorage.setItem("sessionId", data.sessionId);
					  window.location.href = '../index.html'
					}else{
						showInfo(data.errorMessage);
					}
				}
			});
		}
		
	});
});