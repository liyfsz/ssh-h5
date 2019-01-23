$(function() {
  var paramsObj = {userNo: localStorage.getItem('userNo')};
  paramsObj.state = 'NO';
  var signature = getSign(paramsObj);
      paramsObj.signature = signature;
	getJson(
		baseUrl + '/mobile/gate/querRepaymentOrderByUserNoAndState',
		encrypt(paramsObj),
		function(data) {
		  if(data.code == '0000'){
		    console.log(JSON.parse(data.data));
		    var total = 0;
		    var data = JSON.parse(data.data);
		    if(data!=null&&data.length>0){
		    	data.forEach(function(val, index ) {
			    	total = total + val.amount;
			    });	
		    }
		    $("#total").text(formatmoney(total,2));
		    $("#goRepay").attr("href",'repayInfo.html?orderNo='+GetQueryString('orderNo'));
		  }else{
		    showInfo(data.msg);
		  }
		}
	);
});