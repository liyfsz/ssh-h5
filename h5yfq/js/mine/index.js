$(function(){
	$.ajax({
	url: baseUrl + '/member/queryInfo',
	type: 'post',
	data: JSON.stringify({
		"sessionId": sessionStorage.getItem("sessionId")
	}),
	contentType: 'application/json',
	success: function(data) {
		if(data.resultCode == 'SUCCESS') {
			var myTemplate = Handlebars.compile($("#table-template").html());
			$('#html-section').html(myTemplate(data));
      
      //商品的图片路径
       $(".imgSrc").each(function(){
        	$(this).attr({
        		"src":picUrl+$(this).data('url')
        	});
        });
		}else if(data.errorCode == 'ERROR_NOAUTH'){
       window.location.href= '../login/login.html'
		}else{
			showInfo("查看失败")
		}

	}
});
});
