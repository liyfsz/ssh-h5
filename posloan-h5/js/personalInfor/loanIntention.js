$(function() {
  //查看详情调用的接口返回的数据赋值
  //$("#lexpectQuota").val(JSON.parse(localStorage.getItem('loanIntentionInfor')) || '');
  $(document).on("click", "#subLoanintention", function() {
	if($("#lexpectQuota").val() == "" || parseInt($("#lexpectQuota").val()) < 50000 || parseInt($("#lexpectQuota").val()) > 1000000) {
      showInfo("借款金额区间:5万-100万");
      return;
    }else if(!isMoney($("#lexpectQuota").val())){
      showInfo("金额只能为整数,允许两位小数");
      return;
    }
    save($(this));
  });
});

var save = function(event){
	var paramsObj = {};
    var expectQuota = $("#lexpectQuota").val();
    paramsObj.expectQuota = expectQuota;
    paramsObj.userNo = localStorage.getItem('userNo');
    //paramsObj.userNo = '123456789';
    
    var loanIntentionInfor = paramsObj;
    var signature = getSign(paramsObj);
    paramsObj.signature = signature;
    
    submitForm(
      baseUrl + '/mobile/gate/updateExpectquotByUserNo',
      encrypt(paramsObj),
      function(data) {
        if(data.code == '0000') {
        	localStorage.setItem('loanIntentionInfor',expectQuota);
        	window.location.href = 'sendCode.html';
        } else {
          showInfo(data.msg);
        }
      });
};


$(".goBack").click(function(){
	window.location.href = 'contacts.html';
});