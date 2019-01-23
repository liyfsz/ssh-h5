$.ajax({
	url:baseUrl+'/appGetHtList',
	type:'post',
	data:"{\"sessionId\":\"" + GetQueryString("sessionId") + "\"}",
	contentType: 'application/json',
	success:function(data){
		if(data.resultCode=="SUCCESS"){
			//缺少登录判断
			
			//页面渲染
			var template = Handlebars.compile($("#content-template").html());
			var html = template(data);
			$("#html-section").html(html);
			
			$(".list").find("a").each(function(event){
				if($(this).attr("href")!=""){
					$(this).attr("href",$(this).attr("href")+"&sessionId="+GetQueryString("sessionId"));
				}else{
					$(this).removeAttr('href');     
				}
	    });
		}else if(data.errorCode == "ERROR_NOAUTH"){
			getSessionId();
		}else{
			showInfo("查看失败");
		}
	}
});