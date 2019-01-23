$(function() {
  var personData = JSON.parse(localStorage.getItem('personData'));
  var template = Handlebars.compile($("#content-template").html());
      var html = template(personData);
      console.log(personData);
      $("#html-section").html(html);
  
      console.log(personData.applyTime);
      if(personData.status == "04") { //审批未通过
        //获取申请提交时间
         var future  = getTime(personData.verifyTime) + checkNoDays * 24 * 3600 * 1000;
         leftTime(future);
    
      } else if(personData.status == "05") { //完成审批
        var future  = getTime(personData.verifyTime) + checkYesDays * 24 * 3600 * 1000;
        leftTime(future);
      }
      //设置利率和周期
      if(personData.status == "05"){
    	  var lendRate = personData.lendRate;
    	  if(lendRate.indexOf('-') != -1){
    		  lendRate = accMul(lendRate.split('-')[0],100)+'-'+accMul(lendRate.split('-')[1],100)+'%';
    	  }else{
    		  lendRate = accMul(lendRate.split('-')[0],100)+'%';
    	  }
    	  var lendPeriod = personData.lendPeriod.replace('-','/')+'个月';
    	  $("#lendRate").text(lendRate);
    	  $("#lendPeriod").text(lendPeriod);
      }
      if(personData.status == "06"||personData.status == "07"){
		  var lendRate = accMul(personData.rate,100)+'%';
		  var lendPeriod = personData.period+'个月';
		  $("#lendRate").text(lendRate);
    	  $("#lendPeriod").text(lendPeriod);
	  }
  
   $(document).on("click","#subAuditSuccess",function(){
     window.location.href = 'loan.html';
  });
  
     $(document).on("click","#goReapy",function(){
     window.location.href = '../mine/repay.html';
  });
});
/**倒计时*/
function  leftTime(future) {
 countDown(future, function(msg) {
     if(msg==true){
    	$("#subAuditSuccess").attr("disabled",true);
     }else{
    	$("#subAuditFailed").text("距离下次借款还剩 "+msg);
    	$("#subAuditFailed").show();
        $("#auditTips").text("本次借款期限还剩 "+msg);
     }
  }); 
}