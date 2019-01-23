$(function() {
	var paramsObj = {userNo: localStorage.getItem('userNo')};
	var payUrl = '';
	if(GetQueryString('id')){
		paramsObj.id = GetQueryString('id');
  		var signature = getSign(paramsObj);
          paramsObj.signature = signature;
    payUrl = '/mobile/gate/queryRepaymentOrderByIdAndUserNo';
	}else{
		paramsObj.orderNo = GetQueryString('orderNo');
  		var signature = getSign(paramsObj);
          paramsObj.signature = signature;
    payUrl = '/mobile/gate/queryPreRepaymentOrderByOrderNoAndUserNo';
	}
	
  getJson(
  	baseUrl + payUrl,
  	encrypt(paramsObj),
  	function(data) {
  		console.log(data);
  		if(data.code == '0000') {
  			console.log(data);
  		}else{
  			showInfo(data.msg);
  		}
  	});
  $(document).on("click", "#subContacts", function() {
  	window.location.href = 'repayAccount.html';
  });
});