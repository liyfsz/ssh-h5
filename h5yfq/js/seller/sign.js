var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
$("#agree").live("click",function(){
	
	$.ajax({
	url:baseUrl+'/appHtSms',
	async:false,
	type:'post',
	data:"{\"sessionId\":\"" + GetQueryString("sessionId") + "\"}",
	contentType: 'application/json',
	success:function(data){
		if(data.errorCode == "ERROR_NOAUTH"){
			getSessionId();
		}else if(data.resultCode=="SUCCESS"){
			$("#form-title").text("请输入手机验证码");
	    $("#dialogs-form").show();
	    $("#accountId").val(data.accountId);
		}else  if(data.errorCode=="getError"){
			showInfo(data.msg);
		}else{
			showInfo("发送失败");
		}
	}
});

	
});

var sendCode = function(inputVal){
	$.ajax({
	url:baseUrl+'/appHtQy',
	type:'post',
	data:"{\"sessionId\":\"" + GetQueryString("sessionId") + "\",\"code\":\"" + inputVal + "\",\"accountId\":\"" + $("#accountId").val() + "\",\"htId\":\"" + GetQueryString("htId") + "\"}",
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
	if(emailReg.test($("#email").val())){
		$(this).attr("disabled","disabled");
		$.ajax({
			url: baseUrl + '/appSendMail',
			type: 'post',
			data: "{\"sessionId\":\"" + GetQueryString("sessionId") + "\",\"email\":\"" + $("#email").val()+ "\",\"htId\":\"" + GetQueryString("htId") + "\"}",
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


$.ajax({
	url:baseUrl+'/appGetHt',
	type:'post',
	data:"{\"sessionId\":\"" + GetQueryString("sessionId") + "\",\"htId\":\"" + GetQueryString("htId") + "\"}",
	contentType: 'application/json',
	success:function(data){
		if(data.errorCode == "ERROR_NOAUTH"){
			getSessionId();
		}else if(data.resultCode=="SUCCESS"){
			var dataMap = data.dataMap ;
			var contractTemplate = dataMap.contractTemplate ;
			var tem = '';
			if(contractTemplate!=null&&contractTemplate!=undefined&&contractTemplate!=''){
				if(contractTemplate=="1"){
					tem = $("#YFQPTSHRZXY-template").html() ;
				}
			}
			var template = Handlebars.compile(tem);
			var html = template(data);
			$("#html-section").html(html);
			var htId = data.htId ;
			$('#htId').val(htId);
			//页面渲染
		}else{
			showInfo("查看失败");
		}
	}
});