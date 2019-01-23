$(function() {
   
  if (isLogin()) {
   /*数据回显*/
  $.ajax({
      type: "POST",
      url: "/app/hrdBankCardInfoSee",
      data: "{\"sessionId\":\"" + $.cookie("sessionId") + "\",\"cuId\":\"" + $.cookie("custId") + "\"}",
      contentType: 'application/json',
      success: function(data) {
      	if(data.errorCode=='ERROR_NOAUTH'){
					window.location.href = "/login/login.html?link=JK";
		  }else if (data.code=='SUCCESS') {
          //解析数据
        var template = Handlebars.compile($("#form-template").html());
        var html    = template(data);
         $(".formSec").html(html);
           /*隐藏域赋值*/
         $("#cuId").val($.cookie("custId"));
         $("#sessionId").val($.cookie("sessionId"));
        } else{
          errorAlert("查看失败");
        }
      }
    });
  }else if(GetQueryString("custId")&&GetQueryString("sessionId")){
      $.ajax({
      type: "POST",
      url: "/app/hrdBankCardInfoSee",
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
         $(".formSec").html(html);
           /*隐藏域赋值*/
         $("#cuId").val(GetQueryString("custId"));
         $("#sessionId").val(GetQueryString("sessionId"));
         
        } else{
          errorAlert("查看失败");
        }
      }
    });
    }else{
    window.location.href = "/login/login.html?link=BANKCARD";
  }
  /*提交表单*/
  $(document).on('click', '#subBank',function() {
    if($("#bankCardNu").val()==''){
      errorAlert("请填写银行卡信息");
    }else if(!luhnCheck($("#bankCardNu").val())){
      errorAlert("请正确填写银行卡号");
    }else if($("#bank").val()==''){
      errorAlert("请选择开户行");
    }else{
    $.ajax({
      type: "POST",
      url: "/app/hrdBankCardInfoSave",
      contentType: 'application/json',
      data: JSON.stringify($("#messForm").serializeObject()),
      success: function(data) {
        if (data) {
        	if(isLogin()){
        		window.location.href = "perCenter.html";
        	}else{
          window.location.href = "perCenter.html?custId="+GetQueryString("custId")+"&sessionId="+GetQueryString("sessionId")+"&type="+GetQueryString("type");
        }
        	} else {
          errorAlert("提交失败");
        }
      }
    });
    }
  });
});

