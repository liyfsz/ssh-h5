$(function(){
  $("#subForm").click(function(){
  	if($("#agree").prop("checked") == true){
  	  if($("#mobile").val() == ''){
      showInfo("请填写手机号");
    }else if(!isMobilePhone($("#mobile").val())){
      showInfo("请填写正确格式手机号");
    }else if(!isSmsCode($("#smsCode").val())) {
      showInfo("请输入正确格式短信验证码！");
    } else {
      save($(this));
    }
  	}else{
  		showInfo("请勾选协议");
  	}
  });
  
    $(document).on("click","#getCode",function(event){
      var paramsObj = {};
//    paramsObj.userNo = localStorage.getItem('userNo');
        paramsObj.mobile = '13111111111';
      var signature = getSign(paramsObj);
      paramsObj.signature = signature;
      $("#getCode").prop("disabled", true);
      getJson(
        baseUrl + '/mobile/gate/sendSmsMsg',
        encrypt(paramsObj),
        function(data) {
          if(data.code == '0000'){
             timeCount($(event.target),120);
          }else{
          $("#getCode").prop("disabled", false);
            showInfo(data.msg);
          }
          
        },
        false
      );
  });
    
    
    
var save = function(event){
  var paramsObj = {};
    paramsObj.mobile = $("#mobile").val();
    
    paramsObj.captcha = $("#smsCode").val();
    
    var signature = getSign(paramsObj);
    paramsObj.signature = signature;
    $("#subForm").prop("disabled",true);
    submitForm(
      baseUrl + '/mobile/gate/createMerchantApply',
      encrypt(paramsObj),
      function(data) {
        if(data.code == '0000') {
          
        } else {
          $("#subForm").prop("disabled",false);
          showInfo(data.msg);
        }
      });
};

var timeCount = function(btn,wait) {
  var counts = setInterval(function() {
    if (wait > 0) {
      btn.text('重新发送(' + wait + ')');
      wait--;
    } else {
      clearInterval(counts);
      btn.prop("disabled", false);
      btn.text("获取验证码");
    }
  }, 1000);
};
});
