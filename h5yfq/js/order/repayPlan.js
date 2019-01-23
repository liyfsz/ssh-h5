$.ajax({
    type:'post',
    url:baseUrl+"/member/orderdetail",
    dataType:'json',
    contentType:'application/json',
    data:JSON.stringify({
    	"id":GetQueryString('id'),
    	"cuId":GetQueryString('cuId'),
    	"sessionId":GetQueryString('sessionId'),
    	
    }),
    success:function (data) {
       console.log(data)
       if(data.resultCode == 'SUCCESS'){
         var productLeadLittle =picUrl+data.myOrderDto.order.orderProductList[0].productLeadLittle;
         var productName =data.myOrderDto.order.orderProductList[0].productName;
         $(".pic").attr("src" , productLeadLittle);
         $(".proRight").text(productName);
         
         //页面渲染
			var template = Handlebars.compile($("#content-template").html());
			var html = template(data);
			$("#html-section").html(html);
       }else if(data.errorCode =="ERROR_NOAUTH"){
         getSessionId();
       }else{
         showInfo('获取订单详情失败');
       }
       
    }
});

