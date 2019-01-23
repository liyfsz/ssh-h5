var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
$("#agree").live("click",function(){
	
	$.ajax({
	url:baseUrl+'/contract/sign/h5HtSms.html',
	async:false,
	type:'post',
	data:"{\"htId\":\"" + $('#htId').val() + "\"}",
	contentType: 'application/json',
	success:function(data){
		if(data.errorCode == "ERROR_NOAUTH"){
			getSessionId();
		}else if(data.resultCode=="SUCCESS"){
			$("#form-title").text("请输入手机验证码");
	    $("#dialogs-form").show();
	    $("#accountId").val(data.accountId);
		}else{
			showInfo("发送失败");
		}
	}
});

	
});

var sendCode = function(inputVal){
	$.ajax({
	url:baseUrl+'/contract/sign/h5HtQy.html',
	type:'post',
	data:"{\"code\":\"" + inputVal + "\",\"accountId\":\"" + $("#accountId").val() + "\",\"htId\":\"" + $('#htId').val() + "\"}",
	contentType: 'application/json',
	success:function(data){
		if(data.errorCode == "ERROR_NOAUTH"){
			getSessionId();
		}else if(data.resultCode=="SUCCESS"){
			//缺少登录判断
			
			$("#form-title").text("恭喜您，签约成功！");
	    $(".inputs").hide();
	    $(".send-email-box").show();
			
		}else{
			showInfo("验证码输入错误");
			 $(".fake-box input").each(function(){
			 	$(this).val("");
			 });
			 $("#code").val("");
		}
	}
});
};
$("#code").keyup(function(ev){
	var inputVal = $("#code").val();
	var $input = $(".fake-box input");

	for(var i = 0, len = inputVal.length; i < len; i++) {
		$input.eq("" + i + "").val(inputVal[i]);
	}
	$input.each(function() {
		var index = $(this).index();
		if(index >= len) {
			$(this).val("");
		}
	});
	if(len == 6) {
		sendCode(inputVal);
	}
});




$("#sendEmail").click(function(){
	var htId = $('#htId').val() ;
	if(htId==null||htId==''||htId==undefined){
		showInfo("请选择要发送的合同");
		return ;
	}
	if(emailReg.test($("#email").val())){
		$(this).attr("disabled","disabled");
		$.ajax({
			url: baseUrl + '/contract/sign/h5SendMail.html',
			type: 'post',
			data: "{\"email\":\"" + $("#email").val() + "\",\"htId\":\"" + $('#htId').val() + "\"}",
			contentType: 'application/json',
			success: function(data) {
				$("#dialogs-form").hide();
				if(data.errorCode == "ERROR_NOAUTH") {
					getSessionId();
				} else if(data.resultCode == "SUCCESS") {
					showInfo("邮件发送成功");
					$("#dialogs").find(".repay").html('<a href="javascript:;" onclick="self.location=document.referrer;">返回</a>');
				} else {
					showInfo("邮件发送失败");
				}
			}
		});
	}else{
		$("#form-title").text("请输入正确的邮箱");
	}
});

