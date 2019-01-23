$(function() {
  
  if (isLogin()) {
  /*数据回显*/
  $.ajax({
      type: "POST",
      url: "/app/hrdJobInfoSee",
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
         if(!data.adPrCa){
         	$(".mk_span4").html("请选择");
         }else{
         	$(".mk_span4").html(data.adPrCa+ data.adCiCa + data.adArCa);
         }
         
        } else{
          errorAlert("查看失败");
        }
      }
    });
  }else if(GetQueryString("custId")&&GetQueryString("sessionId")){
      $.ajax({
      type: "POST",
      url: "/app/hrdJobInfoSee",
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
    window.location.href = "/login/login.html?link=WORK";
  }
  /*提交表单*/
  $(document).on('click', '#submitWork',function() {
    if($("#name").val()==''){
      errorAlert("请输入单位名称");
    }else if($("#name").val().length>30){
      errorAlert("单位名称不能超过30个字符");
    }else if($("#disNo").val()==''){
      errorAlert("请输入区号");
    }else if(!isAreaCode($("#disNo").val())){
      errorAlert("请输入正确格式的区号");
    }else if($("#landLineNo").val()==''){
      errorAlert("请输入座机");
    }else if(!isHostNumber($("#landLineNo").val())){
      errorAlert("请输入正确格式的座机号");
    }else if(!isExtensioNumber($("#runNO").val())){
      errorAlert("请输入正确格式的分机号");
    }else if($("#year").val()==''){
      errorAlert("请选择工作年限");
    }else if($("#nature").val()==''){
      errorAlert("请选择单位性质");
    }else if($("#department").val()==''){
      errorAlert("请输入任职部门");
    }else if($("#department").val().length>30){
      errorAlert("任职部门不能超过30个字符");
    }else if($("#job").val()==''){
      errorAlert("请选择职务");
    }else if($("#income").val()==''){
      errorAlert("请选择个人月收入");
    }else if($("#adPrCd").val()==''){
      errorAlert("请选择单位地址");
    }else if($("#addressDetail").val()==''){
      errorAlert("请输入地址详情");
    }else if($("#addressDetail").val().length>50){
      errorAlert("地址详情不能超过50个字符");
    }else{
      $.ajax({
      type: "POST",
      url: "/app/hrdJobInfoSave",
      contentType: 'application/json',
      data: JSON.stringify($("#messForm").serializeObject()),
      success: function(data) {
        if (data.code=="SUCCESS") {
        	if(isLogin()){
        		window.location.href = "contacts.html";
        	}else{
          window.location.href = "contacts.html?custId="+GetQueryString("custId")+"&sessionId="+GetQueryString("sessionId")+"&type="+GetQueryString("type");
        }
        	} else {
          errorAlert("提交失败");
        }
      }
    });
    }
    
  });
});

