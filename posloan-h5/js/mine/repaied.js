$(function() {
  var paramsObj = {userNo: localStorage.getItem('userNo')};
  paramsObj.state = 'YES';
  var signature = getSign(paramsObj);
      paramsObj.signature = signature;
      console.log(paramsObj);
        getJson(
          baseUrl + '/mobile/gate/querRepaymentOrderByUserNoAndState',
          encrypt(paramsObj),
          function(data) {
            console.log(data);
            if(data.code == '0000') {
//            var listJson = JSON.parse(data.data);
//            if(listJson.length > 3){
//              $(".preBtn").removeClass("dis-none");
//            }
            } else {
              showInfo(data.msg);
            }
          }
        );
});