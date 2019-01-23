$(function() {
	
  if (isLogin()) {
  /*隐藏域赋值*/
  $("#cuId").val($.cookie("custId"));
  $("#sessionId").val($.cookie("sessionId"));
  /*数据回显*/
  $.ajax({
      type: "POST",
      url: "/app/hrdIDCardSee",
      data: "{\"sessionId\":\"" + $.cookie("sessionId") + "\",\"cuId\":\"" + $.cookie("custId") + "\"}",
      contentType: 'application/json',
      success: function(data) {
      	if(data.errorCode=='ERROR_NOAUTH'){
					window.location.href='/login/login.html';
				}else if (data.code=='SUCCESS') {
        	if(data.seeYn=='N'){
            $(".normalBtn1").addClass("noBlock");
          }
          //解析数据
          
          if(data.frontIDUrl){
          	$(".rigFace").css("background-image","url(" + data.frontIDUrl + ")").find("img").attr("src",'');
          }
          if(data.negativeIDUrl){
            $(".backFace").css("background-image","url(" + data.negativeIDUrl + ")").find("img").attr("src",'');
          }

          
          $("#frontIDCardBase64").val(data.frontIDCard);
          $("#negativeIDCardBase64").val(data.negativeIDCard);
          $("#name").val(data.name).attr("readonly","readonly");
          $("#idNumber").val(data.idnumber).attr("readonly","readonly");
          $("#idTermBgn").val(data.idTermBgn);
          $("#idTermEnd").val(data.idTermEnd);
          
          
        } else{
          errorAlert("查看失败");
        }
      }
    });
  }else if(GetQueryString("custId")&&GetQueryString("sessionId")){
      $("#cuId").val(GetQueryString("custId"));
      $("#sessionId").val(GetQueryString("sessionId"));
      $.ajax({
      type: "POST",
      url: "/app/hrdIDCardSee",
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
          if(data.frontIDUrl){
          	$(".rigFace").css("background-image","url(" + data.frontIDUrl + ")").find("img").attr("src",'');
          }
          if(data.negativeIDUrl){
            $(".backFace").css("background-image","url(" + data.negativeIDUrl + ")").find("img").attr("src",'');
          
          }

          
          $("#frontIDCardBase64").val(data.frontIDCard);
          $("#negativeIDCardBase64").val(data.negativeIDCard);
          $("#name").val(data.name).attr("readonly","readonly");
          $("#idNumber").val(data.idnumber).attr("readonly","readonly");
          $("#idTermBgn").val(data.idTermBgn);
          $("#idTermEnd").val(data.idTermEnd);
        } else{
          errorAlert("查看失败");
        }
      }
    });
    }else{
    window.location.href = "/login/login.html?link=SFZ";
  }
  /*身份证正面上传*/
  $(".uploadPic").change(function(obj) {
    var objUrl;
    objUrl = getObjectURL(this.files[0]);
    $(this).siblings("span").css("background-image", "url(" + objUrl + ")").find("img").attr("src","");
    _create(objUrl,function(){},$(this).prop("id"));
  });

 

  function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  
  $(document).on('click',"#submitIdCard",function() {
  	if(!$("#frontIDCardBase64").val()){
      errorAlert("请上传身份证正面");
    }else if(!$("#negativeIDCardBase64").val()){
      errorAlert("请上传身份证反面");
    }else if($("#name").val()==''){
      errorAlert("请填写姓名");
    }else if($("#name").val().length > 20){
      errorAlert("姓名长度小于20");
    }else if(!idcardnoCheck($("#idNumber").val())){
      errorAlert("请输入正确格式的身份证号");
    }else if($("#idTermBgn").val()==''){
      errorAlert("请输入有效期限的起始时间");
    }else if($("#idTermEnd").val()==''){
      errorAlert("请输入有效期限的截止时间");
    }else{
    $.ajax({
      type: "POST",
      url: "/app/hrdIDCardSaved",
      data:JSON.stringify($("#messForm").serializeObject()),
      contentType: 'application/json',
      success: function(data) {
        if (data.code =="SUCCESS") {
        	if(isLogin()){
        		window.location.href = "person.html";
        	}else{
          window.location.href = "person.html?custId="+GetQueryString("custId")+"&sessionId="+GetQueryString("sessionId")+"&type="+GetQueryString("type");
        	}

        } else {
          errorAlert("上传失败");
        }
      }
    });
    }
  });
});


/*时间选择插件*/
$(function(){
  var currYear = (new Date()).getFullYear();
  var opt={};
  opt.date = {preset : 'date'};
  opt.datetime = {preset : 'datetime'};
  opt.time = {preset : 'time'};
  opt.default = {
    theme: 'android-ics light', //皮肤样式
    display: 'modal', //显示方式
    mode: 'scroller', //日期选择模式
    dateFormat: 'yyyy-mm-dd',
    lang: 'zh',
    showNow: true,
    nowText: "今天",
    startYear: currYear - 80, //开始年份
    endYear: currYear + 80 //结束年份
  };
  $("#idTermBgn").mobiscroll($.extend(opt['date'], opt['default']));
  $("#idTermEnd").mobiscroll($.extend(opt['date'], opt['default']));
});