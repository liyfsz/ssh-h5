$(function(){
  var paramsObj = {userNo: localStorage.getItem('userNo')};
  var signature = getSign(paramsObj);
      paramsObj.signature = signature;
  getJson(
  	baseUrl + '/mobile/gate/queryRiskInfoByUserNo',
  	encrypt(paramsObj),
  	function(data) {
  		if(data.code == '0000') {
  			//查看详情调用的接口返回的数据赋值
  			var loanData = JSON.parse(data.data);
  			console.log(loanData);
  			var verifyQuota = loanData.verifyQuota;
  			//初始化值
  			var rateArr = loanData.lendRate.split('-');
  			var lendPeriod = loanData.lendPeriod;
  			loanData.lendRateRes = rateArr[0];
  			loanData.lendRatePer = accMul(rateArr[0],100)+'%';
            loanData.monthInterest = formatmoney((verifyQuota*rateArr[0]),2);
  			var template = Handlebars.compile($("#content-template").html());
  			var html = template(loanData);
  			$("#html-section").html(html);
  			if(lendPeriod.indexOf('-')==-1){
  				$("#lendPeriod").val(lendPeriod);
  				$("#lendPeriodTxt").html(lendPeriod+'个月');
  				$(".modalBox").css('display','none');
  			}
  			//不同的借款周期对应不同的利率和利息
  			$(".termUl li").click(function(){
  			  if($(this).text() == '6个月'){
  			    $("#lendRate").val(rateArr[0]);
  			    $("#lendRateTxt").text(accMul(rateArr[0],100)+'%');
  			    $("#monthInterest").text(formatmoney((verifyQuota*rateArr[0]),2));
  			  }else if($(this).text() == '12个月'){
  			    $("#lendRate").val(rateArr[1]);
  			    $("#lendRateTxt").text(accMul(rateArr[1],100)+'%');
                $("#monthInterest").text(formatmoney((verifyQuota*rateArr[1]),2));
  			  }
  			});
  			var channel = loanData.channel;
  			if(channel.indexOf('XD_1514')!=-1) $(".rxjk").show();
  			if(channel.indexOf('XD_1516')!=-1) $(".xhjk").show();
  			if(channel.indexOf('XD_1515')!=-1) $(".rxdk").show();
  		} else {
  			showInfo(data.msg);
  		}
  	},false
  );
  
  //勾选协议后按钮点亮
	$(document).on("change", "#agree", function(e){
      if($("#agree").prop("checked") == true){
      $("#loan").prop("disabled",false);
    }else{
      $("#loan").prop("disabled",true);
    }
   });
  $(document).on("click","#loan",function(){
  if ($("#lendRate").val()=='') {
    showInfo("借款利率不能为空"); 
//	 }else if ($("#lendPeriod").val()=='') {
//    showInfo("请您选择借款周期！");
  }else{
      var paramsObj = $("form").serializeObject();
      var waitLoan = paramsObj;
//    if(paramsObj.isPass === undefined){
//      paramsObj.isPass = '0';
//    }
      var signature = getSign(paramsObj);
      paramsObj.signature = signature;
      console.log(paramsObj);
      $("#loan").prop("disabled",true);
      submitForm(
        baseUrl + '/mobile/gate/createLendApply',
        encrypt(paramsObj),
        function(data) {
          if(data.code == '0000') {
            waitLoan.verifyQuota = $("#verifyQuota").val();
            localStorage.setItem("waitLoan",JSON.stringify(waitLoan));
            window.location.href = 'waitLoan.html';
          } else {
        	$("#loan").prop("disabled",false);
            showInfo(data.msg);
          }
        });
  }
    
  });
});