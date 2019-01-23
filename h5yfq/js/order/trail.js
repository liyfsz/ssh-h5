$.ajax({
    type:'post',
    url:baseUrl+"/member/getDetail",
    dataType:'json',
    contentType:'application/json',
    data:JSON.stringify({
    	"id":GetQueryString('id'),
    	"sessionId":GetQueryString('sessionId')
    }),
    success:function (data) {
       if(data.resultCode == 'SUCCESS'){
         //页面渲染
			   var template = Handlebars.compile($("#content-template").html());
			   var html = template(data);
			   $("#html-section").html(html);
       }else if(data.errorCode =="ERROR_NOAUTH"){
         getSessionId();
       }else{
         showInfo('查看物流失败');
       }
       
    }
});

