$(function() {
  //查看详情调用的接口返回的数据赋值
  var personData = JSON.parse(localStorage.getItem('personInfor')) || JSON.parse(localStorage.getItem('personData'));
  var template = Handlebars.compile($("#content-template").html());
      var html = template(personData);
      $("#html-section").html(html);
      	$("#city-picker").cityPicker({
      	  title: "选择省市区/县",
      	  onChange: function(picker, values, displayValues) {
      	    console.log(values, displayValues);
      	    $(this).text(displayValues[0]+displayValues[1]+displayValues[2]);
      	    $("#hjregion").val(displayValues[0]+displayValues[1]+displayValues[2]);
      	  }
      	});
      	$("#city-picker-part").cityPicker({
        	  title: "选择省市区/县",
        	  onChange: function(picker, values, displayValues) {
        	    console.log(values, displayValues);
        	    $(this).text(displayValues[0]+displayValues[1]+displayValues[2]);
        	    $("#domicile").val(displayValues[0]+displayValues[1]+displayValues[2]);
        	  }
        });
		
	
	$(document).on("click", "#subForm", function() {
	  //校验信息
	if($("#comName").val()==''){
      showInfo("请填写真实公司名称");
    }else if($("#invoiceSalesAmount").val() == ''){
      showInfo("请填写最近12个开票销售总额");
    }else if(!isMoney($("#invoiceSalesAmount").val())){
      showInfo("金额只能为整数,允许两位小数");
    }else if($("#enterpriseLendAmount").val() == ''){
      showInfo("请填写企业现有借款总额");
    }else if(!isMoney($("#enterpriseLendAmount").val())){
      showInfo("金额只能为整数,允许两位小数");
    }else if($("#telephone").val() == ''){
      showInfo("请填写手机号");
    }else if(!isMobilePhone($("#telephone").val())){
      showInfo("请填写正确格式手机号");
    }else if($("#wechatNum").val() == ''){
      showInfo("请填写微信号");
    }else if($("#marriage").val() == ''){
      showInfo("请选择婚姻状况");
    }else if($("#persionLendAmount").val() == ''){
      showInfo("请填写个人现有借款总额");
    }else if(!isMoney($("#persionLendAmount").val())){
      showInfo("金额只能为整数,允许两位小数");
    }else if($("#monthRepayAmount").val() == ''){
      showInfo("请填写每月应还款总额");
    }else if(!isMoney($("#monthRepayAmount").val())){
      showInfo("金额只能为整数,允许两位小数");
    }else if($("#hjregion").val() == ''){
      showInfo("请选择户籍地址所在地区");
    }else if($("#permanenDetail").val() == ''){
      showInfo("请选择户籍地址详细地址");
    }else if($("#domicile").val() == ''){
      showInfo("请选择常驻地址所在地区");
    }else if($("#domicileDetail").val() == ''){
      showInfo("请选择常驻地址详细地址");
    }else {
      save($(this));
    }
		
	});
});

var save = function(event){
	var paramsObj = $("form").serializeObject();
     
       paramsObj.userNo = localStorage.getItem('userNo');
      
      if(paramsObj.isChild === undefined){
        paramsObj.isChild = '0';
      }
      if(paramsObj.isResidence === undefined){
        paramsObj.isResidence = '0';
      }
      console.log(paramsObj);
      var personInfor = paramsObj;
      var signature = getSign(paramsObj);
          paramsObj.signature = signature;
      submitForm(
      baseUrl + '/mobile/gate/editUserInfo',
      encrypt(paramsObj),
      function(data) {
        console.log(data);
        if(data.code == '0000') {
        	localStorage.setItem('personInfor',JSON.stringify(personInfor));
        	window.location.href = 'assetsInfor.html';
        } else {
          showInfo(data.msg);
        }
      });
};