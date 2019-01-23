$(function(){
	
	var paramsObj = {userNo: localStorage.getItem('userNo')};
      var signature = getSign(paramsObj);
          paramsObj.signature = signature;
      getJson(
      baseUrl + '/mobile/gate/queryAuthInfo',
      encrypt(paramsObj),
      function(data) {
        console.log(data);
        if(data.code == '0000') {
        	window.location.href = '../merchants/detail.html';
        } else {
            showInfo(data.msg);
        }
      },false);
      
      $(".toAuthPage").click(function(){
    	    $("#dialogs").hide();
    		window.location.href = '../merchants/infor.html';
      });
});
