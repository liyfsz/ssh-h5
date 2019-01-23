$(function() {
  var paramsObj = {userNo: localStorage.getItem('userNo')};
  //var paramsObj = {userNo: '123456789'};
  var signature = getSign(paramsObj);
      paramsObj.signature = signature;
      getJson(
			baseUrl + '/mobile/gate/queryVerifyRateByUserNo',
			encrypt(paramsObj),
			function(data) {
			  if(data.code == '0000'){
				  var dataRes = JSON.parse(data.data);
				  if (dataRes.status == "07") {
					   paramsObj.state = 'NO';
					   delete paramsObj.signature;
					   var signature = getSign(paramsObj);
					   paramsObj.signature = signature;
					   getJson(
					          baseUrl + '/mobile/gate/querRepaymentOrderByUserNoAndState',
					          encrypt(paramsObj),
					          function(data) {
					            console.log(data);
					            if(data.code == '0000') {
					              if(JSON.parse(data.data).length > 0){
					                var listJsonFirst = JSON.parse(data.data)[0];
					                var preBtnFlag = listJsonFirst.lendNum;
					                console.log(preBtnFlag);
					                if(preBtnFlag > 3) {
					                  $(".preBtn").removeClass("dis-none");
					                  $(".preBtn").attr("href", 'prepayment.html?orderNo=' + listJsonFirst.orderNo);
					                }
					              }
					            } else {
					              showInfo(data.msg);
					            }
					          }
					   ); 
				  }else if(dataRes.status == "05"&&getDays(dataRes.verifyDate)<=checkYesDays){
					  $(".lendBtn").css('display','block');
					  var future  = getTime(dataRes.verifyDate) + checkYesDays * 24 * 3600 * 1000;
				      leftTime(future);
				  }
			  }
			}
	   );
      
      $(document).on("click","#subAuditSuccess",function(){
    	    window.location.href = '../loan/loan.html';
      });
});

/**倒计时*/
function  leftTime(future) {
  countDown(future, function(msg) {
     if(msg==true){
    	 $("#subAuditSuccess").attr("disabled",true);
     }else{
    	 $("#borrowTip").text("本次借款期限还剩 "+msg);
     }
  }); 
}