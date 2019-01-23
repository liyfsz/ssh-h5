/**
 * Created by Administrator on 2018/2/27.
 */

$(function() {
	
  $("#phoneNumber").val(sessionStorage.getItem("phone"));
  $("#sessionId").val(sessionStorage.getItem("sessionId"));
  
	/*1. 倒计时 获取手机验证码 */
	var time;
	$('#getVerCode').click(function(eve) {
		
			var phoneNumber = $("#phoneNumber").val();
			$.ajax({
				type: "POST",
				url: baseUrl + "/getVerifySMS",
				data: "{\"mob\":\"" + phoneNumber + "\",\"type\":\"upPwd\",\"sessionId\":\""+sessionStorage.getItem("sessionId")+"\"}",
				contentType: 'application/json',
				dataType: 'json',
				success: function(data) {
					if(data.resultCode == 'SUCCESS') {
						console.log("发送成功");
						time = 60;
			      $(eve.target).html(time + "s后点击重发");
			      timeOut(); //$('#forget-pwd-form')
					} else {
						showInfo(data.errorMessage);
					}
				}
			});

	});

	/*2. 忘记密码---提交表单*/
	$(document).on('click', '#sub-btn', function() {
		if(!$("#vcode").val()) {
			showInfo("请填写验证码");
		}else if(!$("#password").val()) {
			showInfo("请填写密码");
		} else if(!isPassword($("#password").val())) {
			showInfo("请填写6-20字符密码");
		}else if($("#passwordCfm").val()!=$("#password").val()) {
			showInfo("确认密码不正确");
		}else {
			$.ajax({
				type: "POST",
				url: baseUrl + "/member/updatepassword",
				contentType: 'application/json',
				data: JSON.stringify($("#forget-pwd-form").serializeObject()),
				success: function(data) {
					if(data.resultCode == "SUCCESS") {
						sessionStorage.setItem("phone", $("#phoneNumber").val());
						sessionStorage.setItem("password", $("#password").val());
						window.location.href = "login.html"
					} else if(data.errorCode == 'ERROR_NOAUTH'){
						window.location.href = "login.html"
					}else{
						showInfo(data.errorMessage);
					}
				}
			});
		}
	});

	/*倒计时方法*/
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
});