$(function(){
  //调用接口获取手机号
  var sendCodeData = JSON.parse(localStorage.getItem('personData'));
  console.log(sendCodeData);
  $("#phone").text(sendCodeData.phone);
  $(document).on("click", "#subForm", function() {
  	if($("#captcha").val() == '') {
  		showInfo("请输入短信验证码！");
  	} else if(!isSmsCode($("#captcha").val())) {
  		showInfo("请输入正确格式短信验证码！");
  	} else {
      save($(this));
  	}

  });
  
  if($("#agree").prop("checked")== true){
	   $("#subForm").prop("disabled",false);
  }
  $(document).on("change", "#agree", function(e){
	 if($("#agree").prop("checked") == true){
	   $("#subForm").prop("disabled",false);
	 }else{
	   $("#subForm").prop("disabled",true);
	 }
  });
  
  $(document).on("click","#sendCode",function(event){
      var paramsObj = {};
      paramsObj.userNo = localStorage.getItem('userNo');
      //paramsObj.userNo = '123456789';
      var signature = getSign(paramsObj);
      paramsObj.signature = signature;
      $("#sendCode").prop("disabled", true);
      getJson(
        baseUrl + '/mobile/gate/sendSmsMsg',
        encrypt(paramsObj),
        function(data) {
          if(data.code == '0000'){
             timeCount($(event.target),120);
          }else{
        	$("#sendCode").prop("disabled", false);
            showInfo(data.msg);
          }
          
        },
        false
      );
  })
});


var save = function(event){
	var paramsObj = {userNo: localStorage.getItem('userNo')};
    paramsObj.userNo = localStorage.getItem('userNo');
    
    paramsObj.captcha = $("#captcha").val();
    
    var signature = getSign(paramsObj);
    paramsObj.signature = signature;
    $("#subForm").prop("disabled",true);
    submitForm(
      baseUrl + '/mobile/gate/createMerchantApply',
      encrypt(paramsObj),
      function(data) {
        if(data.code == '0000') {
        	if($(event).attr("id") == 'subForm'){
        		window.location.href = 'submitSuccess.html';
        	}else{
        		window.location.href = 'loanIntention.html';
        	}
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
			btn.css("background", '#fff');
			btn.text("获取验证码");
		}
	}, 1000);
};