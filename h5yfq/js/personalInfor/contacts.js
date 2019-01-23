$(function() {
   
if (isLogin()) {
/*数据回显*/
$.ajax({
    type: "POST",
    url: "/app/hrdContactInfoSee",
    data: "{\"sessionId\":\"" + $.cookie("sessionId") + "\",\"cuId\":\"" + $.cookie("custId") + "\"}",
    contentType: 'application/json',
    success: function(data) {
      if (data.code=='SUCCESS') {
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
    url: "/app/hrdContactInfoSee",
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
  window.location.href = "/login/login.html";
}
  /*提交表单*/
  $(document).on('click', '#subContacts',function() {
    if($("#lName").val()==''){
      errorAlert("请填写直系亲属的姓名");
    }else if($("#lName").val().length > 20){
      errorAlert("直系亲属的姓名不能超过20个字符");
    }else if(!isChinese($("#lName").val())){
      errorAlert("直系亲属的姓名输入中文");
    }else if($("#lRelationship").val()==''){
      errorAlert("请选择直系亲属的关系");
    }else if($("#lPhone").val()==''){
      errorAlert("请填写直系亲属的电话");
    }else if(!isMobilePhone($("#lPhone").val())){
      errorAlert("直系亲属的电话格式不正确");
    }else if($("#fName").val()==''){
      errorAlert("请填写朋友的姓名");
    }else if($("#fName").val().length>20){
      errorAlert("朋友的姓名不能超过20个字符");
    }else if(!isChinese($("#fName").val())){
      errorAlert("朋友的姓名输入中文");
    }else if($("#fRelationship").val()==''){
      errorAlert("请选择与朋友的关系");
    }else if($("#fPhone").val()==''){
      errorAlert("请填写朋友的电话");
    }else if(!isMobilePhone($("#fPhone").val())){
      errorAlert("朋友的电话格式不正确");
    }else{
      $.ajax({
      type: "POST",
      url: "/app/hrdContactInfoSave",
      contentType: 'application/json',
      data: JSON.stringify($("#messForm").serializeObject()),
      success: function(data) {
        if (data.code=="SUCCESS") {
        	if(isLogin()){
        		window.location.href = "bankCard.html";
        	}else{
          window.location.href = "bankCard.html?custId="+GetQueryString("custId")+"&sessionId="+GetQueryString("sessionId")+"&type="+GetQueryString("type");
        }
        	} else {
          errorAlert("提交失败");
        }
      }
    });
    }
  });
});

