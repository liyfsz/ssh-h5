$(function() {
  var paramsObj = {userNo: localStorage.getItem('userNo')};
  var signature = getSign(paramsObj);
      paramsObj.signature = signature;
	getJson(
		baseUrl + '/mobile/gate/queryVerifyRateByUserNo',
		encrypt(paramsObj),
		function(data) {
		  if(data.code == '0000'){
		      var dataRes = JSON.parse(data.data);
			  if (dataRes.status == "05") {
				  if(getDays(dataRes.verifyDate)<=checkYesDays){
					$("#qukLoan").prop("disabled",false);
			        var future  = getTime(dataRes.verifyDate) + checkYesDays * 24 * 3600 * 1000;
			        leftTime(future); 
				  }else{
					 $("#borrowTip").text("本次借款期限还剩  00天00小时00分00秒"); 
				  }
		      } else if (dataRes.status == "04") {
		    	  if(getDays(dataRes.verifyDate)<=checkNoDays){
		    		  $("#qukLoan").prop("disabled",false);
				      var future  =  getTime(dataRes.verifyDate)  + checkNoDays * 24 * 3600 * 1000;
				      leftTime(future);
		    	  }else{
		    		  $("#loanFailed").text("距离下次借款还剩  00天00小时00分00秒");
		    	      $("#loanFailed").show(); 
		    	  }
		      }
			  //设置利率和周期
		      if(dataRes.status == "05"){
		    	  var lendRate = dataRes.lendRate;
		    	  if(lendRate.indexOf('-') != -1){
		    		  lendRate = accMul(lendRate.split('-')[0],100)+'-'+accMul(lendRate.split('-')[1],100)+'%';
		    	  }else{
		    		  lendRate = accMul(lendRate.split('-')[0],100)+'%';
		    	  }
		    	  var lendPeriod = dataRes.lendPeriod.replace('-','/')+'个月';
		    	  var verifyQuota = formatmoney(dataRes.verifyQuota,2);
		    	  $("#lendRate").text(lendRate);
		    	  $("#verifyQuota").text(verifyQuota);
		    	  $("#lendPeriod").text(lendPeriod);
		      }
		      if(dataRes.status == "06"||dataRes.status == "07"||dataRes.status == "08"){
				  var lendRate = accMul(dataRes.lendRate,100)+'%';
				  var lendPeriod = dataRes.lendPeriod+'个月';
				  var verifyQuota = formatmoney(dataRes.verifyQuota,2);
				  $("#lendRate").text(lendRate);
				  $("#verifyQuota").text(verifyQuota);
		    	  $("#lendPeriod").text(lendPeriod);
			  }
		  }else {
		    showInfo(data.msg);
		  }
		}
	);
	//
	$(document).on("click","#qukLoan",function(){
	  window.location.href = '../../pages/loan/loan.html';
  });
  
  //
  $(document).on("click","#gorepay",function(){
    window.location.href = '../../pages/mine/repay.html';
  });
  $(document).on("click","#gorepay",function(){
    window.location.href = '../../pages/mine/repay.html';
  });
});
/**倒计时*/
function  leftTime(future) {
  countDown(future, function(msg) {
     if(msg==true){
    	 $("#qukLoan").attr("disabled",true);
     }else{
    	 $("#loanFailed").text("距离下次借款还剩 "+msg);
    	 $("#loanFailed").show();
    	 $("#borrowTip").text("本次借款期限还剩 "+msg);
     }
  }); 
}