$(function() {
		/*数据回显*/
		$.ajax({
			type: "POST",
			url: baseUrl + "/getBtOrderData",
			data: "{\"sessionId\":\"" + getSessionVal() +  "\"}",
			contentType: 'application/json',
			success: function(data) {
				if(data.resultCode == 'SUCCESS') {
				  
					//解析数据
					var template = Handlebars.compile($("#form-template").html());
					var html = template(data.btResponse);
					$(".formSec").html(html);
					
				} else if(data.errorCode == 'ERROR_NOAUTH'){
          getSessionId();
				}else{
					showInfo("查看失败");
				}
			}
		});
});