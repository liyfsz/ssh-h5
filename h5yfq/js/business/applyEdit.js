$.ajax({
	url:baseUrl+'/seller/audit/appGetSeller',
	type:'post',
	data:"{\"sessionId\":\"" + GetQueryString("sessionId") + "\"}",
	contentType: 'application/json',
	success:function(data){
		if(data.resultCode=="SUCCESS"){
			
			//页面渲染
			var template = Handlebars.compile($("#content-template").html());
			var html = template(data);
			$("#html-section").html(html);
			
			timerInitial();
			$("#sessionId").val(GetQueryString("sessionId"));
			if(!(data.data.state == 6 || data.data.state == 10)){
				$("input").attr("disabled","disabled");
				$(".mytogRelate").removeClass("mytogRelate");
				$(".bigTogRelate").removeClass("bigTogRelate");
				$(".mytogRelate2").removeClass("mytogRelate2");
				$(".mytogRelate3").removeClass("mytogRelate3");
				$(".togRelate").removeClass("togRelate");
			}
		}else if(data.errorCode == "ERROR_NOAUTH"){
			getSessionId();
		}else{
			showInfo("查看失败");
		}
	}
});