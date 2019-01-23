$(function() {
	//查看详情调用的接口返回的数据赋值
	var indexData = JSON.parse(localStorage.getItem('guideData')) || JSON.parse(localStorage.getItem('indexData'));
	var template = Handlebars.compile($("#content-template").html());
    var html = template(indexData);
    $("#html-section").html(html);
	
	$(document).on("click", "#subForm", function() {
	if($("#name").val()==''){
      showInfo("请填写姓名");
    }else if($("#telephone").val()==''){
      showInfo("请填写手机号");
    }else if(!isMobilePhone($("#telephone").val())){
      showInfo("请填写正确格式手机号");
    }else if($("#bankNum").val()==''){
      showInfo("请填写银行卡号");
    }else if(!luhnCheck($("#bankNum").val())){
      showInfo("请填写正确格式的银行卡号");
    }else if($("#bankName").val()==''){
      showInfo("请填写开户行名称");
    }else {
    	var paramsObj = $("form").serializeObject();
  		var signature = getSign(paramsObj);
        paramsObj.signature = signature;
        $("#subForm").prop("disabled",true);
    	submitForm(
			baseUrl + '/mobile/gate/creatAuthInfo',
			encrypt(paramsObj),
			function(data) {
				console.log(data);
				if(data.code == '0000') {
					window.location.href = 'detail.html';
				} else {
					$("#subForm").prop("disabled",false);
					showInfo(data.msg);
				}
			});
    }
		
	});
});