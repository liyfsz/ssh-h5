$(function() {
  if (isLogin()) {
  	$("footer").removeClass("noBlock");
   /*数据回显*/
  $.ajax({
      type: "POST",
      url: "/app/hrdPersonInfoBinding",
      data: "{\"sessionId\":\"" + $.cookie("sessionId") + "\",\"cuId\":\"" + $.cookie("custId") + "\"}",
      contentType: 'application/json',
      success: function(data) {
      	if(data.errorCode=='ERROR_NOAUTH'){
					window.location.href = "/login/login.html";
				}else if (data.code=='SUCCESS') {
          //解析数据
        var template = Handlebars.compile($("#form-template").html());
        var html    = template(data);
         $(".formDiv").html(html);
         
        } else{
          errorAlert(data.errorMessage);
        }
      }
    });
  }else if(GetQueryString("custId")&&GetQueryString("sessionId")){
      //给每一个子页面加custid
      $.ajax({
      type: "POST",
      url: "/app/hrdPersonInfoBinding",
      data: "{\"sessionId\":\"" + GetQueryString("sessionId") + "\",\"cuId\":\"" + GetQueryString("custId") + "\"}",
      contentType: 'application/json',
      success: function(data) {
      	 if(data.errorCode=='ERROR_NOAUTH'){
        	//app端失效session重新取
        	if(GetQueryString("type")=='android'){
        		window.android.reLoad();
        	}else if(GetQueryString("type")=='ios'){
        		window.open("reLoad()"); 
        	}
					
				}else if (data.code=='SUCCESS') {
          //解析数据
        var template = Handlebars.compile($("#form-template").html());
        var html    = template(data);
         $(".formDiv").html(html);
        $("#messForm").find("a").each(function(){
          $(this).attr("href",$(this).attr("href")+"?custId="+GetQueryString("custId")+"&sessionId="+GetQueryString("sessionId")+"&type="+GetQueryString("type")+"&isGoBack="+GetQueryString("isGoBack"));
         });
         $(".normalBtn,.bottDiv").addClass("noBlock");
        } else{
          errorAlert(data.errorMessage);
        }
      }
    });
    }else{
    window.location.href = "/login/login.html";
  }
});
