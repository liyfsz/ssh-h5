

/*全部订单*/
myOrder('');
myOrder(1);
myOrder(3);
myOrder(4);
myOrder(5);
myOrder(6);
function myOrder(state){
	$.ajax({
	    type:'post',
	    url:baseUrl+"/member/order",
	    dataType:'json',
	    contentType:'application/json',
	    data:JSON.stringify({
	      "orderState":state,
	      "cuId":GetQueryString('cuId'),
	      "sessionId":getSessionVal()
	    }),
	    success:function (data) {
	        if(data.resultCode == "SUCCESS"){
	          console.log(data)
	        	//刷新数据
	        	var template = Handlebars.compile($("#item-template").html());
	        	var html = template(data);
	        	$('.ul'+state).html(html);
	        	
	        	//图片获取加前缀
	        	$(".product_logo").each(function(){
	        		$(this).attr("src",picUrl+$(this).data('url'));
	        	});
	        	
	        	$(".trail").click( function() {
	        		window.location.href = "trail.html?id=" + $(this).data("id") + '&sessionId=' + getSessionVal();
	        	});
	        }else if(data.errorCode =="ERROR_NOAUTH"){
	           getSessionId();
	        }else{
	          showInfo('查看失败');
	        }
	        
	    }
	});
}
  $(".detail").live('click',function(){
    var id =$(this).parent('.payWay').parent('li').find('input').eq(0).val();
  	window.location.href="detail.html?id="+id+'&cuId='+GetQueryString('cuId')+'&sessionId='+getSessionVal();
});
$(".service").live('click',function(){
    var id =$(this).parent('.payWay').parent('li').find('input').eq(0).val();
    var proId =$(this).parent('.payWay').parent('li').find('input').eq(1).val();
    window.location.href="returnDetails.html?id="+id+"&proId="+proId+'&cuId='+GetQueryString('cuId')+'&sessionId='+GetQueryString('sessionId');
});

$(".ensureGet").live('click', function(event) {
	var dataId = $(event.target).data('id');
	showMask();
	$(".sure").click(function(){
		$.ajax({
		url: baseUrl + '/member/appGetGoods',
		type: 'POST',
		data: JSON.stringify({
			"oId": dataId,
			"sessionId": getSessionVal(),
			"cuId": GetQueryString('cuId')
		}),
		contentType: 'application/json',
		success: function(data) {
			if(data.success == true) {
				myOrder('');
				myOrder(1);
				myOrder(3);
				myOrder(4);
				myOrder(5);
				myOrder(6);
			} else if(data.message == '未登录') {
				getSessionId();
			} else {
				showInfo("确认失败");
			}
		}
	});
	
	hideMask();
	});
	
});
