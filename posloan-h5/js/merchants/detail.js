$(function(){
  $("#goLoan").click(function(){
    var paramsObj = {
    	userNo: localStorage.getItem('userNo')
    };
    var signature = getSign(paramsObj);
    paramsObj.signature = signature;
    getJson(
    	baseUrl + '/mobile/gate/queryMerchantInfoByUserNo',
    	encrypt(paramsObj),
    	function(data) {
    		if (data.code == '0000') {
    		  localStorage.setItem("personData",data.data);
    		  var status = JSON.parse(data.data).status;
    		  if(status == '01'){
    			  localStorage.setItem('personInfor',null);
    			  localStorage.setItem('assetsInfor',null);
    			  localStorage.setItem('contactsInfor',null);
    			  localStorage.setItem('loanIntentionInfor',null);
    		     window.location.href = '../personalInfor/person.html';
    		  }
    		} else {
    		  showInfo(data.msg);
    		}
    	},
    	false
    );
  });
});
