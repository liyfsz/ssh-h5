$(function(){
	
	/*倒计时 获取手机验证码*/
	var time;
	$('#getVerCode').click(function(eve) {
		//校验手机号是否通过
		
		if(!isMobilePhone($("#phoneNumber").val())) {
			return;
		} else {
			
			var phoneNumber = $("#phoneNumber").val();
			$.ajax({
				type: "POST",
				url: baseUrl + "/getVerifySMS",
				data: "{\"mob\":\"" + phoneNumber + "\",\"type\":\"reg\"}",
				contentType: 'application/json',
				dataType: 'json',
				success: function(data) {
					if(data.resultCode == 'SUCCESS') {
						console.log("发送成功");
						time = 60;
			      $(eve.target).html(time + "s后点击重发");
			      timeOut(); //$('#register-form')
					} else {
						showInfo(data.errorMessage);
					}
				}
			});
		}

	});

	function timeOut() {
		if(time == 0) {
			clearInterval(startTime);
			$('#getVerCode').html("获取验证码").attr("disabled", false);
		} else {
			$('#getVerCode').attr("disabled", true);
			var startTime = setTimeout(function() {
				time--;
				$('#getVerCode').html(time + "s后点击重发");
				timeOut();
			}, 1000)
		}
	}

  
	
	
	/*提交表单*/
$("#sub-btn").click(function() {
		if(!isMobilePhone($("#phoneNumber").val())) {
			return;
		}else if($("#vcode").val() == '') {
			showInfo("请填写验证码");
		}else if(!$("#password").val()) {
			showInfo("请填写密码");
		} else if(!isPassword($("#password").val())) {
			showInfo("请填写6-20字符密码");
		}else if($("#passwordCfm").val()!=$("#password").val()) {
			showInfo("确认密码不正确");
		}else if(!$("#isRead").prop("checked")) {
			showInfo("请阅读协议");
		}else {
			$.ajax({
				type: "POST",
				url: baseUrl + "/appSignupSubmit",
				contentType: 'application/json',
				data: JSON.stringify($("#register-form").serializeObject()),
				success: function(data) {
					if(data.resultCode == "SUCCESS") {
						sessionStorage.setItem("phone", $("#phoneNumber").val());
						sessionStorage.setItem("password", $("#password").val());
						window.location.href = "login/login.html";
					} else{
						showInfo(data.message);
					}
				}
			});
		}

});
});

