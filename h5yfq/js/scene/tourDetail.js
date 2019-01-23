$.ajax({
	url:baseUrl+'/appScList',
	type:'post',
	data:"{\"sellerId\":\"" + GetQueryString("sellerId") + "\"}",
	contentType: 'application/json',
	success:function(data){
		if(data.success==true){
			//缺少登录判断
			
			//页面渲染
			var template = Handlebars.compile($("#content-template").html());
			var html = template(data);
			$("#html-section").html(html);
			
			
			$(".product-item a").each(function(){
				$(this).attr("href",$(this).attr("href")+'&cuId='+GetQueryString("cuId")+'&sessionId='+GetQueryString("sessionId"));
			});
			
			$(".logo").prop("src",picUrl + $(".logo").data('url'));
			
		}else{
			showInfo("查看失败");
		}
	}
});